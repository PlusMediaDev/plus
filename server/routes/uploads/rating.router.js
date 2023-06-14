const express = require("express");
const {
  rejectUnauthenticated,
} = require("../../modules/authentication-middleware");
const pool = require("../../modules/pool");

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
   * @returns {RequestBody}
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

  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  const client = await pool.connect();
  try {
    try {
      await client.query("BEGIN");
      // Insert or update row
      const { command } = await client.query(
        `
          INSERT INTO "ratings"
            ("user_id", "upload_id", "rating")
          VALUES
            ($1, $2, $3)
          ON CONFLICT ("user_id", "upload_id")
            DO UPDATE SET "rating" = EXCLUDED."rating"
        `,
        [req.user.id, body.id, body.rating]
      );

      if (command === "INSERT") {
        // Increment rating count
        await client.query(
          `
          UPDATE "uploads_for_rating"
          SET "total_ratings" = "total_ratings" + 1
          WHERE "id" = $1
        `,
          [body.id]
        );
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");

      const foreignKeyViolationCode = 23503;
      if (Number(err.code) === foreignKeyViolationCode) {
        res.sendStatus(422);
        return;
      }

      throw err;
    }

    /** @type {import("pg").QueryResult<{ totalRatings: number }>} */
    const { rows: uploads } = await pool.query(
      `
        SELECT
          "total_ratings" AS "totalRatings"
        FROM "uploads_for_rating"
        WHERE "id" = $1
      `,
      [body.id]
    );
    const upload = uploads[0] || undefined;
    const maxRatings = 50;
    if (upload && upload.totalRatings < maxRatings) {
      res.sendStatus(200);
      return;
    }

    try {
      await client.query("BEGIN");

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

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }

    res.sendStatus(201);
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
    /** @type {import("pg").QueryResult<Upload>} */
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
      const resBody = { data: null }
      res.send(resBody);
      return;
    }

    /** @type {ResponseBody} */
    const resBody = { data: upload }
    res.send(resBody);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
