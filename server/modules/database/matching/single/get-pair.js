/**
 * @typedef {import("pg").ClientBase} ClientBase
 */

/**
 * @template {import("pg").QueryResultRow} [R=any]
 * @typedef {import("pg").QueryResult<R>} QueryResult
 */

/**
 * @typedef Upload
 * @property {number} id
 * @property {number} averageRating
 * @property {number} tokens
 */

/**
 * @param {ClientBase} client
 * @returns {Promise<Upload | null>}
 */
const getFirst = async (client) => {
  /** @type {QueryResult<Upload>} */
  const { rows: first } = await client.query(
    `
      SELECT
        "id",
        "average_rating" AS "averageRating",
        "tokens"
      FROM "uploads_for_matching"
      ORDER BY
        "last_matched_at" NULLS FIRST,
        "uploaded_at"
      LIMIT 1
    `
  );

  return first[0] || null;
};

/**
 * @param {ClientBase} client
 * @param {Upload} first
 * @returns {Promise<Upload | null>}
 */
const getSecond = async (client, first) => {
  /** @type {QueryResult<Upload>} */
  const { rows: second } = await client.query(
    `
      SELECT
        "uploads_for_matching"."id" AS "id",
        "uploads_for_matching"."average_rating" AS "averageRating",
        "uploads_for_matching"."tokens"
      FROM "uploads_for_matching"
      LEFT JOIN "matches" "matches_left"
        ON "uploads_for_matching"."id" = "matches_left"."upload_1_id"
      LEFT JOIN "matches" "matches_right"
        ON "uploads_for_matching"."id" = "matches_right"."upload_2_id"
      WHERE
        "uploads_for_matching"."id" != $1
      GROUP BY "uploads_for_matching"."id"
      HAVING
        COUNT(CASE WHEN "matches_left"."upload_2_id" = $1 THEN 1 END) < 1
      AND
        COUNT(CASE WHEN "matches_right"."upload_1_id" = $1 THEN 1 END) < 1
      ORDER BY RANDOM()
      LIMIT 1
    `,
    [first.id]
  );

  return second[0] || null;
};

/**
 * @param {ClientBase} client
 * @returns {Promise<{ first: Upload, second: Upload } | null>}
 */
const getPair = async (client) => {
  const first = await getFirst(client);
  if (!first) {
    return null;
  }

  const second = await getSecond(client, first);
  if (!second) {
    return null;
  }

  return { first, second };
};

module.exports = getPair;
