/**
 * A little type checking trick to enforce an exhaustive check on a value
 *
 * Any argument passed to this function must have been narrowed
 * to the never type for it to type check successfully
 * @param {never} _ A value that cannot exist
 * @returns {never}
 */
const never = (_) => {
  throw new Error("Code should be unreachable");
};

module.exports = never;
