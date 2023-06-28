const dotenv = require("dotenv");

dotenv.config();

const requiredRatingsKey = "REQUIRED_RATINGS";
const requiredRatings = Number(process.env[requiredRatingsKey]) || undefined;

const missingRequiredRatings = () => {
  throw new Error(`Missing '${requiredRatingsKey}' environmental variable!`);
};

module.exports = {
  requiredRatings:
    requiredRatings === undefined ? missingRequiredRatings() : requiredRatings,
};
