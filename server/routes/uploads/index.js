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

//readStream:
// const readStream = require('fs').ReadStream;
//require multer stuff:
const multer = require('multer');
const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/hengyang/pictures')
  },
  filename: function (t, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix + '.jpeg')
  }
})

const upload = multer({ storage: storage })

//s3 stuff 
const S3Client = require("@aws-sdk/client-s3").S3Client;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;




//For AWS post:
router.post('/aws', upload.single('uploaded_media'), (req, res) => {

  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  console.log('Req.file ->', req.file)


  //Media file:
  const mediaFile = req.file

  // Set the parameters
  const params = {
    Bucket: bucketName, // The name of the bucket. For example, 'sample-bucket-101'.
    Key: mediaFile.filename, // The name of the object. For example, 'sample_upload.txt'.
    Body: Buffer.from(JSON.stringify(mediaFile)), // The content of the object. For example, 'Hello world!".
  };

  uploadToAWS(params).then(() => res.send(`${mediaFile.filename}`), () => {console.log("ERROR IN ADDING OBJECT TO AWS S3");})

  console.log('req.file ->', req.file);

});

// {imagePath: `api/uploads/aws/${mediaFile.filename}` }


//********* FIGURE OUT GET REQUEST ********/
// For AWS Get:
router.get('/aws/:key', (req, res) => {

  console.log("I AM IN THE GET ROUTE FOR AWS S3")
  const key = req.params.key;
  console.log('This is the key:', key);
 
  getFileStream(key).then((result) => {console.log("RESULTS OF FILE STREAM", result)});

  res.sendStatus(200);
})

//download file from s3:
function getFileStream(fileKey) {

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    },
    region: bucketRegion,
  });

  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  }
  return s3Client.send(new GetObjectCommand(downloadParams));
}

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
