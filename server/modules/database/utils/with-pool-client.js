/**
 * @typedef {import("pg").PoolClient} PoolClient
 */

/**
 * @template T
 * @param {() => Promise<PoolClient>} createClient
 * @param {(client: PoolClient) => Promise<T>} fn
 * @returns {Promise<T>}
 */
const withPoolClient = async (createClient, fn) => {
  const client = await createClient();
  try {
    const res = await fn(client);
    client.release();
    return res;
  } catch (err) {
    client.release();
    throw err;
  }
};

module.exports = withPoolClient;
