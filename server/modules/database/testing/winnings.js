const winnings = [];

/**
 * @param {number} tokens
 */
const addWinner = (tokens) => {
  winnings.push(tokens);
};

const totalWinners = () => winnings.length;

const averageWinnings = () =>
  winnings.reduce((total, winnings) => total + winnings, 0) / winnings.length;

const clearWinnings = () => {
  winnings.splice(0);
};

module.exports = {
  addWinner,
  totalWinners,
  averageWinnings,
  clearWinnings,
};
