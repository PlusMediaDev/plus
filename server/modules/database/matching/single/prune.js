/**
 * @typedef {import("pg").ClientBase} ClientBase
 */

/**
 * @template {import("pg").QueryResultRow} [R=any]
 * @typedef {import("pg").QueryResult<R>} QueryResult
 */

/**
 * @param {ClientBase} client
 * @param {{ id: number, tokens: number }} upload
 * @returns {Promise<boolean>}
 */
const pruneLosing = async (client, upload) => {
  if (upload.tokens < 1) {
    await client.query(
      `
        DELETE FROM "uploads_for_matching"
        WHERE "id" = $1
      `,
      [upload.id]
    );
    return true;
  } else {
    return false;
  }
};

/**
 * @param {ClientBase} client
 * @param {{ id: number, tokens: number, totalMatches: number, userId: number }} upload
 * @param {number} matchLimit
 * @returns {Promise<boolean>}
 */
const pruneWinning = async (client, upload, matchLimit) => {
  if (upload.totalMatches < matchLimit) {
    return false;
  }

  await client.query(
    `
      DELETE FROM "uploads_for_matching"
      WHERE "id" = $1
    `,
    [upload.id]
  );
  await client.query(
    `
      UPDATE "users"
      SET "tokens" = "tokens" + $2
      WHERE "id" = $1
    `,
    [upload.userId, upload.tokens]
  );
  return true;
};

/**
 * @param {ClientBase} client
 * @param {number} id
 * @param {number} matchLimit
 * @returns {Promise<boolean>}
 */
const prune = async (client, id, matchLimit) => {
  /**
   * @typedef Upload
   * @property {number} totalMatches
   * @property {number} tokens
   * @property {number} userId
   */

  /** @type {QueryResult<Upload>} */
  const { rows: uploads } = await client.query(
    `
      SELECT
        "total_matches" AS "totalMatches",
        "tokens",
        "user_id" AS "userId"
      FROM "uploads_for_matching"
      WHERE "id" = $1
    `,
    [id]
  );
  const upload = uploads[0] || null;

  if (!upload) {
    return false;
  }

  if (await pruneLosing(client, { ...upload, id })) {
    return true;
  }

  if (await pruneWinning(client, { ...upload, id }, matchLimit)) {
    return true;
  }

  return false;
};

module.exports = prune;
