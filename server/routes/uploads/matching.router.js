const { Router } = require("express");
const { runMatch } = require("../../modules/database/matching/single");
const { runAllMatches } = require("../../modules/database/matching/batch");
const pool = require("../../modules/pool");
const { matchLimit } = require("../../constants/matching");
const {
  rejectUnauthenticated,
} = require("../../modules/authentication-middleware");

const router = Router();

router.post("/match-one", async (_, res) => {
  res.sendStatus(200);

  try {
    console.log("Running match . . .")
    const matchCompleted = await runMatch();
    console.log(matchCompleted ? "Match completed" : "No match");
  } catch (err) {
    console.error(err);
  }
});

router.post("/match-all", async (_, res) => {
  res.sendStatus(200);

  try {
    console.log("Running matches . . .")
    const start = performance.now();
    const matchesRun = await runAllMatches();
    const duration = performance.now() - start;
    console.log(
      "Ran %o %s in %o ms",
      matchesRun,
      matchesRun === 1 ? "match" : "matches",
      Math.floor(duration * 1000) / 1000
    );
  } catch (err) {
    console.error(err);
  }
});

router.get("/status", rejectUnauthenticated, async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  try {
    const { rows: uploads } = await pool.query(
      `
        SELECT
          "id",
          "total_matches" AS "totalMatches"
        FROM "uploads_for_matching"
        WHERE "user_id" = $1
      `,
      [req.user.id]
    );

    res.send({ matchLimit, uploads: uploads });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
