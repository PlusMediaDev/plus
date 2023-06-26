/**
 * @param {number} a Start of range (inclusive)
 * @param {number} b End of range (inclusive)
 * @returns {number[]}
 */
export default (a, b) => {
  const backwards = a > b;
  return [...Array(Math.abs(b - a) + 1).keys()].map((index) =>
    backwards ? a - index : a + index
  );
};
