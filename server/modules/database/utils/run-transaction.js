/**
 * @typedef {import("pg").ClientBase} ClientBase
 * @typedef {import("pg").Pool} Pool
 */

/**
 * @param {never} never
 * @returns {never}
 */
const never = (never) => {
  throw new Error("Code should be unreachable");
}

/**
 * @template T
 * @template {ClientBase | Pool} C
 * @param {C} client
 * @param {(client: C) => Promise<["commit" | "rollback", T]>} fn
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
