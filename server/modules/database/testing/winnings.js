const winnings = [];

/**
 * @param {number} tokens
 */
const addWinner = (tokens) => {
  winnings.push(tokens);
};

const totalWinners = () => winnings.length;

const averageWinnings = () => {
  if (winnings.length < 1) {
    return null;
  }

  return (
    winnings.reduce((total, winnings) => {
      return total + winnings;
    }, 0) / winnings.length
  );
};

const medianWinnings = () => {
  if (winnings.length < 1) {
    return null;
  }

  const middle = Math.floor(winnings.length / 2);
  return winnings[middle];
};

const clearWinnings = () => {
  winnings.splice(0);
};

module.exports = {
  addWinner,
  totalWinners,
  averageWinnings,
  medianWinnings,
  clearWinnings,
};
