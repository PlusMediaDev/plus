const express = require("express");
const ratingRouter = require("./rating.router");
const matchingRouter = require("./matching.router");
const {
  rejectUnauthenticated,
} = require("../../modules/authentication-middleware");
const { newUpload } = require("../../modules/database/upload");

/**
 * @typedef {import("../../@types")}
 */

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

  /**
   * @typedef NewUpload
   * @property {string} contentUrl
   */

  /**
   * @param {*} body
   * @returns {NewUpload | null}
   */
  const validate = (body) => {
    const contentUrl = body["contentUrl"];

    if (typeof contentUrl !== "string") {
      return null;
    }

    return {
      contentUrl,
    };
  };

  const body = validate(req.body);
  // Malformed request
  if (!body) {
    res.sendStatus(400);
    return;
  }

  try {
    await newUpload({ contentUrl: body.contentUrl }, req.user.id);
    res.send(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
