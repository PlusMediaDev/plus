const express = require("express");
const {
  rejectUnauthenticated,
} = require("../../modules/authentication-middleware");
const pool = require("../../modules/pool");
const { runAllMatches } = require("../../modules/database/matching/batch");
const { requiredRatings } = require("../../constants/rating");
const s3Client = require("../../modules/s3/client");
const dotenv = require("dotenv");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const withPoolClient = require("../../modules/database/utils/with-pool-client");
const runTransaction = require("../../modules/database/utils/run-transaction");

dotenv.config();

const awsBucket = process.env["AWS_BUCKET_NAME"];

/**
 * @template {import("pg").QueryResultRow} [R=any]
 * @typedef {import("pg").QueryResult<R>} QueryResult
 */

const router = express.Router();

/*
 * Rate content
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  /**
   * @typedef RequestBody
   * @property {number} id
   * @property {number} rating
   */

  /**
   * @param {*} body
   * @returns {RequestBody | null}
   */
  const validate = (body) => {
    const id = body["id"];
    const rating = body["rating"];

    if (
      (typeof id !== "number" && typeof id !== "string") ||
      (typeof rating !== "number" && typeof rating !== "string")
    ) {
      return null;
    }

    return {
      id: Number(id),
      rating: Number(rating),
    };
  };

  const body = validate(req.body);
  if (!body) {
    res.sendStatus(400);
    return;
  }

  try {
    const status = await withPoolClient(
      () => pool.connect(),
      async (client) => {
        await runTransaction(client, async (client) => {
          if (!req.user) {
            return ["rollback", (() => {})()];
          }

          try {
            // Insert row
            const { rowCount: rowsInserted } = await client.query(
              `
                INSERT INTO "ratings"
                  ("user_id", "upload_id", "rating")
                VALUES
                  ($1, $2, $3)
                ON CONFLICT ("user_id", "upload_id")
                  DO NOTHING
              `,
              [req.user.id, body.id, body.rating]
            );

            // Upload already rated by user
            if (rowsInserted === 0) {
              await client.query(
                `
                  UPDATE "ratings"
                  SET "rating" = $3
                  WHERE
                    "user_id" = $1 AND "upload_id" = $2
                `,
                [req.user.id, body.id, body.rating]
              );

              return ["commit", (() => {})()];
            }

            // Increment rating count
            await client.query(
              `
                UPDATE "uploads_for_rating"
                SET "total_ratings" = "total_ratings" + 1
                WHERE "id" = $1
              `,
              [body.id]
            );

            return ["commit", (() => {})()];
          } catch (err) {
            const foreignKeyViolationCode = 23503;
            // Upload doesn't exist
            if (Number(err.code) === foreignKeyViolationCode) {
              // res.sendStatus(422);
              return ["rollback", (() => {})()];
            }

            throw err;
          }
        });

        /** @type {QueryResult<{ totalRatings: number, s3Key: string? }>} */
        const { rows: uploads } = await client.query(
          `
            SELECT
              "total_ratings" AS "totalRatings",
              "s3_key" AS "s3Key"
            FROM "uploads_for_rating"
            WHERE "id" = $1
          `,
          [body.id]
        );
        const upload = uploads[0] || undefined;
        if (!upload || upload.totalRatings < requiredRatings) {
          return;
        }

        if (upload.s3Key) {
          const params = { Bucket: awsBucket, Key: upload.s3Key };
          await s3Client.send(new DeleteObjectCommand(params));
        }

        await runTransaction(client, async (client) => {
          // Transfer data for matching
          await client.query(
            `
              INSERT INTO "uploads_for_matching"
                ("user_id", "average_rating", "uploaded_at")
              SELECT
                "uploads_for_rating"."user_id",
                AVG ("ratings"."rating"),
                "uploads_for_rating"."uploaded_at"
              FROM "uploads_for_rating"
              JOIN "ratings"
                ON "uploads_for_rating"."id" = "ratings"."upload_id"
              WHERE "uploads_for_rating"."id" = $1
              GROUP BY "uploads_for_rating"."id"
            `,
            [body.id]
          );

          // Remove from rating
          await client.query(
            `
              DELETE FROM "uploads_for_rating"
              WHERE "id" = $1
            `,
            [body.id]
          );

          return ["commit", (() => {})()];
        });
      }
    );

    res.sendStatus(200);

    // Run matching
    const start = performance.now();
    const matchesRun = await runAllMatches();
    console.log(`Ran %o matches in %o`, matchesRun, performance.now() - start);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

/*
 * Get random upload to rate
 */
router.get("/random", rejectUnauthenticated, async (req, res) => {
  /**
   * @typedef Upload
   * @property {number} id
   * @property {string} contentUrl
   */

  /**
   * @typedef ResponseBody
   * @property {Upload | null} data
   */

  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  try {
    /** @type {QueryResult<Upload>} */
    const { rows: uploads } = await pool.query(
      `
        SELECT
          "uploads_for_rating"."id",
          "uploads_for_rating"."content_url" AS "contentUrl"
        FROM "uploads_for_rating"
        FULL OUTER JOIN "ratings"
        ON "uploads_for_rating"."id" = "ratings"."upload_id"
        WHERE "uploads_for_rating"."user_id" != $1
        GROUP BY "uploads_for_rating"."id"
        HAVING COUNT (CASE WHEN "ratings"."user_id" = $1 THEN 1 END) < 1
        ORDER BY RANDOM ()
        LIMIT 1;
      `,
      [req.user.id]
    );
    const upload = uploads[0] || undefined;

    if (upload === undefined) {
      /** @type {ResponseBody} */
      const resBody = { data: null };
      res.send(resBody);
      return;
    }

    /** @type {ResponseBody} */
    const resBody = { data: upload };
    res.send(resBody);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/status", rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  /**
   * @typedef Upload
   * @property {number} id
   * @property {number} totalRatings
   */

  try {
    /** @type {QueryResult<Upload>} */
    const { rows: uploads } = await pool.query(
      `
        SELECT
          "id",
          "total_ratings" AS "totalRatings"
        FROM "uploads_for_rating"
        WHERE "user_id" = $1
      `,
      [req.user.id]
    );
    res.send({ ratingsNeeded: requiredRatings, uploads });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
