const allReviews = (state = null, action) => {
    switch (action.type) {
      case 'TOTAL_REVIEWS':
        return action.payload;
      default:
        return state;
    }
  };
export default allReviews;