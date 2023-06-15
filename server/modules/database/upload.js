const pool = require("../pool");

/**
 * @typedef NewUpload
 * @property {string} contentUrl
 */

/**
 * @param {NewUpload} upload
 * @param {number} userId
 */
export const newUpload = async (upload, userId) => {
  await pool.query(
    `
      INSERT INTO "uploads_for_rating"
        ("user_id", "content_url", "uploaded_at")
      VALUES
        ($1, $2, CURRENT_TIMESTAMP);
    `,
    [userId, upload.contentUrl]
  );
};
