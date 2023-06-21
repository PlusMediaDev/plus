const express = require("express");
const pool = require("../../modules/pool");
const ratingRouter = require("./rating.router");
const {
  rejectUnauthenticated,
} = require("../../modules/authentication-middleware");
const multer = require("multer");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const mediaStorage = require("../../modules/s3/media-storage");
const s3Client = require("../../modules/s3/client");
const uploadMedia = require("../../modules/s3/upload-media");

// Load .env
dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;

const router = express.Router();

router.use("/rating", ratingRouter);

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
    /** @type {any} */
    const file = req.file
    /** @type {Express.MulterS3.File | undefined} */
    const mS3File = file;

    if (!mS3File) {
      res.sendStatus(500);
      return;
    }

    const query = `
      INSERT INTO "uploads_for_rating"
        ("user_id", "content_url", "uploaded_at")
      VALUES
        ($1, $2, TO_TIMESTAMP($3));
    `;
    // Postgres TO_TIMESTAMP expects seconds
    await pool.query(query, [
      req.user.id,
      mS3File.location,
      Date.now() / 1000.0,
    ]);
    res.send(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
