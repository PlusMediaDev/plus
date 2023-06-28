const dotenv = require("dotenv");

dotenv.config();

const matchLimitKey = "MATCH_LIMIT";
const matchTransferAmountKey = "MATCH_TRANSFER_AMOUNT";
const matchLimit = Number(process.env[matchLimitKey]) || undefined;
const matchTransferAmount =
  Number(process.env[matchTransferAmountKey]) || undefined;

const missingMatchLimit = () => {
  throw new Error(`Missing '${matchLimitKey}' environmental variable!`);
};

const missingMatchTransferAmount = () => {
  throw new Error(
    `Missing '${matchTransferAmountKey}' environmental variable!`
  );
};

module.exports = {
  matchLimit: matchLimit === undefined ? missingMatchLimit() : matchLimit,
  matchTransferAmount:
    matchTransferAmount === undefined
      ? missingMatchTransferAmount()
      : matchTransferAmount,
};
