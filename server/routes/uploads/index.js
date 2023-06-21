/**
 * @typedef {import("../../server")}
 */

const express = require("express");
const ratingRouter = require("./rating.router");
const {
  rejectUnauthenticated,
} = require("../../modules/authentication-middleware");
const multer = require("multer");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const s3Client = require("../../modules/s3/client");
const uploadMedia = require("../../modules/s3/upload-media");
const matchingRouter = require("./matching.router");
const { newUpload } = require("../../modules/database/upload");

// Load .env
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;

const router = express.Router();

router.use("/rating", ratingRouter);
router.use("/matching", matchingRouter);

// {imagePath: `api/uploads/aws/${mediaFile.filename}` }

//********* FIGURE OUT GET REQUEST ********/
// For AWS Get:
router.get("/aws/:key", (req, res) => {
  const key = req.params.key;

  getFileStream(key).then((result) => {
    console.log("RESULTS OF FILE STREAM", result);
  });

  res.sendStatus(200);
});

//download file from s3:
function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };
  return s3Client.send(new GetObjectCommand(downloadParams));
}

/*
 * Upload content
 */
router.post("/", rejectUnauthenticated, uploadMedia.single("uploaded_media"), async (req, res) => {
  if (!req.user) {
    res.sendStatus(500);
    return;
  }

  try {
    if (!req.file) {
      res.sendStatus(500);
      return;
    }

    await newUpload({ contentUrl: req.file.location, s3Key: req.file.key }, req.user.id);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
