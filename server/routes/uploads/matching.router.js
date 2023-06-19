const { Router } = require("express");
const { runSingleMatch } = require("../../modules/database/matching/single");
const { runAllMatches } = require("../../modules/database/matching/batch");

const router = Router();

router.post("/match-one", async (_, res) => {
  try {
    const matchCompleted = await runSingleMatch();
    console.log(matchCompleted ? "Match completed" : "No match");
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/match-all", async (_, res) => {
  try {
    const start = performance.now();
    const matchesRun = await runAllMatches();
    const duration = performance.now() - start;
    console.log(
      "Ran %o %s in %o ms",
      matchesRun,
      matchesRun === 1 ? "match" : "matches",
      Math.floor(duration * 1000) / 1000
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
