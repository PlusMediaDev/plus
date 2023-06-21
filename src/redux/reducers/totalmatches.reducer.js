const allMatches = (state = null, action) => {
    switch (action.type) {
      case 'TOTAL_MATCHES':
        return action.payload;
      default:
        return state;
    }
  };
export default allMatches;