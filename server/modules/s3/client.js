const { S3Client } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");

dotenv.config();

const bucketRegion = process.env["AWS_BUCKET_REGION"];
const accessKeyId = process.env["AWS_ACCESS_KEY"];
const secretAccessKey = process.env["AWS_SECRET_KEY"];

const credentials =
  accessKeyId && secretAccessKey
    ? {
        accessKeyId,
        secretAccessKey,
      }
    : null;

const s3Client = new S3Client({
  ...(credentials && { credentials }),
  ...(bucketRegion && { region: bucketRegion }),
});

module.exports = s3Client;
