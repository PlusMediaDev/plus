const express = require("express");
const {
  rejectUnauthenticated,
} = require("../../modules/authentication-middleware");
const pool = require("../../modules/pool");

const router = express.Router();

/*
 * Hi -Japheth
 * Rate content
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  try {
    const { rows: previousRatings } = await pool.query(
      `
        SELECT * FROM "ratings"
        WHERE "user_id" = $1
          AND "upload_id" = $2;
      `,
      [req.user.id, req.body.id]
    );

    /* Prevent a user from rating a post multiple times
     *
     * The Postgres table also has a unique contraint in
     * case concurrent requests manage to bypass this check
     */
    if (previousRatings.length !== 0) {
      res.sendStatus(400);
      return;
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      // Insert new row
      await client.query(
        `
          INSERT INTO "ratings"
            ("user_id", "upload_id", "rating")
          VALUES
            ($1, $2, $3)
        `,
        [req.user.id, req.body.id, req.body.rating]
      );
      // Increment rating count
      await client.query(
        `
          UPDATE "uploads_for_rating"
          SET "total_ratings" = "total_ratings" + 1
          WHERE "id" = $1
        `,
        [req.body.id]
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

module.exports = router;
