const tokenWon = (state = [], action) => {
    switch (action.type) {
      case 'TOKENS_WON':
        return action.payload;
      default:
        return state;
    }
  };
export default tokenWon;