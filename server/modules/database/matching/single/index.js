const pool = require("../../../pool");
const withPoolClient = require("../../utils/with-pool-client");
const runTransaction = require("../../utils/run-transaction");
const {
  matchLimit,
  matchTransferAmount,
} = require("../../../../constants/matching");
const runMatch = require("./match");
const getPair = require("./get-pair");
const prune = require("./prune");

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
 * @returns {Promise<["commit" | "rollback", boolean]>}
 */
const runSingleMatchWithClient = async (client) => {
  // Lock existing rows
  await client.query(
    `
      SELECT * FROM "uploads_for_matching"
      FOR UPDATE
    `
  );

  const pair = await getPair(client);

  // No pair found
  if (!pair) {
    return ["commit", false];
  }

  const { first, second } = pair;

  await runMatch(client, first, second, matchTransferAmount);

  await prune(client, first.id, matchLimit);
  await prune(client, second.id, matchLimit);

  return ["commit", true];
};

/**
 * @returns {Promise<boolean>} True if a match was performed
 */
const runSingleMatch = async () => {
  const res = await withPoolClient(
    () => pool.connect(),
    (client) => runTransaction(client, runSingleMatchWithClient)
  );
  return res;
};

module.exports = {
  runMatch: runSingleMatch,
};
