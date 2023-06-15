const express = require("express");
const pool = require("../../modules/pool");
const ratingRouter = require("./rating.router");
const { rejectUnauthenticated } = require("../../modules/authentication-middleware");

const router = express.Router();

router.use("/rating", ratingRouter);


// require .env file for getting bucket name:
require('dotenv').config();
const bucketName = process.env.AWS_BUCKET_NAME;

//require function for uploading object to AWS
const uploadToAWS = require('./sample');


//For AWS post:
router.post('/aws', (req, res) => {

  //Media file:
  const mediaFile = req.body.media

  // Set the parameters
  const params = {
    Bucket: bucketName, // The name of the bucket. For example, 'sample-bucket-101'.
    Key: "mediaFile1", // The name of the object. For example, 'sample_upload.txt'.
    Body: mediaFile, // The content of the object. For example, 'Hello world!".
  };

  uploadToAWS(params);

  console.log('req.body.media ->', req.body.media);

  res.sendStatus(200);
});


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
