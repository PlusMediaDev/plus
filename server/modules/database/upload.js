const pool = require("../pool");

/**
 * @typedef NewUpload
 * @property {string} contentUrl
 * @property {string} [s3Key]
 */

/**
 * @param {NewUpload} upload
 * @param {number} userId
 */
const newUpload = async (upload, userId) => {
  await pool.query(
    `
      INSERT INTO "uploads_for_rating" (
        "user_id",
        "content_url",
        "s3_key",
        "uploaded_at"
      )
      VALUES
        ($1, $2, $3, CURRENT_TIMESTAMP);
    `,
    [userId, upload.contentUrl, upload.s3Key]
  );
};

module.exports = {
  newUpload,
};
