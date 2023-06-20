const never = require("../../../utils/never");

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
 * @param {Upload} first
 * @param {Upload} second
 */
const addMatch = async (client, first, second) => {
  await client.query(
    `
      INSERT INTO "matches"
        ("upload_1_id", "upload_2_id")
      VALUES
        ($1, $2)
    `,
    [first.id, second.id]
  );
};

/**
 * @param {Upload} first
 * @param {Upload} second
 * @returns {"first" | "second" | "none"}
 */
const determineWinner = (first, second) => {
  const cmp = Math.sign(first.averageRating - second.averageRating);
  switch (cmp) {
    case 1:
      return "first";
    case -1:
      return "second";
    case 0:
    default:
      return "none";
  }
};

/**
 * @param {ClientBase} client
 * @param {Upload} first
 * @param {Upload} second
 * @param {"first" | "second" | "none"} winner
 * @param {number} transferAmount
 */
const resolve = async (client, first, second, winner, transferAmount) => {
  switch (winner) {
    case "none": {
      const query = `
        UPDATE "uploads_for_matching"
        SET
          "total_matches" = "total_matches" + 1,
          "last_matched_at" = CURRENT_TIMESTAMP
        WHERE "id" = $1
      `;

      await client.query(query, [first.id]);
      await client.query(query, [second.id]);

      return;
    }
    case "first":
    case "second": {
      const loser = winner === "first" ? first : second;
      const cappedTransfer = Math.min(loser.tokens, transferAmount);

      const query = `
        UPDATE "uploads_for_matching"
        SET
          "tokens" = "tokens" + $2,
          "total_matches" = "total_matches" + 1,
          "last_matched_at" = CURRENT_TIMESTAMP
        WHERE
          "id" = $1
      `;
      await client.query(query, [
        first.id,
        winner === "first" ? cappedTransfer : -cappedTransfer,
      ]);
      await client.query(query, [
        second.id,
        winner === "second" ? cappedTransfer : -cappedTransfer,
      ]);

      return;
    }
    default:
      never(winner);
  }
};

/**
 * @param {ClientBase} client
 * @param {Upload} first
 * @param {Upload} second
 * @param {number} transferAmount
 */
const runMatch = async (client, first, second, transferAmount) => {
  await addMatch(client, first, second);

  const winner = determineWinner(first, second);
  await resolve(client, first, second, winner, transferAmount);
};

module.exports = runMatch;
