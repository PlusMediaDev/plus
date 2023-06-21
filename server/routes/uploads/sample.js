const PutObjectCommand = require("@aws-sdk/client-s3").PutObjectCommand;
const S3Client = require("@aws-sdk/client-s3").S3Client;
require('dotenv').config();
// const s3Client = require('./sampleClient');

const uploadToAWS = async (params) => {

  const bucketRegion = process.env.AWS_BUCKET_REGION;
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  const s3Client = new S3Client({
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    },
    region: bucketRegion,
  });

  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully created " +
      params.Key +
      " and uploaded it to " +
      params.Bucket +
      "/" +
      params.Key
    );
    return results; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = uploadToAWS;