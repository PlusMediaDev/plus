const multerS3 = require("multer-s3");
const s3Client = require("./client");
const dotenv = require("dotenv");

dotenv.config();

const bucketName = process.env["AWS_BUCKET_NAME"];

const mediaStorage = multerS3({
  s3: s3Client,
  bucket: (_req, _file, callback) => {
    callback(null, bucketName);
  },
  metadata: (_req, file, callback) => {
    callback(null, { fieldname: file.fieldname });
  },
  key: (_req, file, callback) => {
    const filename = `${Date.now()}_${file.fieldname}_${file.originalname}`;
    callback(null, filename);
  },
});

module.exports = mediaStorage;
