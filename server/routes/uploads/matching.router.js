const { Router } = require("express");
const { runSingleMatch } = require("../../modules/database/matching");

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

module.exports = router;
