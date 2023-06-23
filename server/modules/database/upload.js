const pool = require("../pool");
const runTransaction = require("./utils/run-transaction");
const withPoolClient = require("./utils/with-pool-client");

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
  await withPoolClient(
    () => pool.connect(),
    async (client) => {
      await runTransaction(client, async () => {
        await client.query(
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

        await client.query(
          `
            UPDATE "users"
            SET "last_uploaded_at" = CURRENT_TIMESTAMP
            WHERE "id" = $1
          `,
          [userId]
        );

        return ["commit", (() => {})()];
      });
    }
  );
};

module.exports = {
  newUpload,
};
