const express = require("express");
const pool = require("../../modules/pool");
const ratingRouter = require("./rating.router");
const matchingRouter = require("./matching.router");
const {
  rejectUnauthenticated,
} = require("../../modules/authentication-middleware");

const router = express.Router();

router.use("/rating", ratingRouter);
router.use("/matching", matchingRouter);

/*
 * Upload content
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  try {
    const query = `
      INSERT INTO "uploads_for_rating"
        ("user_id", "content_url", "uploaded_at")
      VALUES
        ($1, $2, TO_TIMESTAMP($3));
    `;
    // Postgres TO_TIMESTAMP expects seconds
    await pool.query(query, [
      req.user.id,
      req.body.contentUrl,
      Date.now() / 1000.0,
    ]);
    res.send(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
