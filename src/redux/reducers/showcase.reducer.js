const memeStorage = (state = [], action) => {
    switch (action.type) {
      case 'RANDOM_MEME':
        return action.payload;
      default:
        return state;
    }
  };
export default memeStorage;