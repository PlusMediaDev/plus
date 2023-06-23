const never = require("../../utils/never");

/**
 * @typedef {import("pg").ClientBase} ClientBase
 * @typedef {import("pg").Pool} Pool
 */

/**
 * @template T
 * @param {ClientBase} client
 * @param {(client: ClientBase) => Promise<["commit" | "rollback", T]>} fn
 * @returns {Promise<T>}
 */
const runTransaction = async (client, fn) => {
  client.query("BEGIN");
  try {
    const [status, res] = await fn(client);
    if (status === "commit") {
      client.query("COMMIT");
    } else if (status === "rollback") {
      client.query("ROLLBACK");
    } else {
      never(status);
    }
    client.query("COMMIT");
    return res;
  } catch (err) {
    client.query("ROLLBACK");
    throw err;
  }
};

module.exports = runTransaction;
