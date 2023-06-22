const canUpload = (state = false, action) => {
  switch (action.type) {
    case "SET_CAN_UPLOAD":
      return action.payload;
    default:
      return state;
  }
};

export default canUpload;
