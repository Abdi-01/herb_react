const init_state = {
  cartList: [],
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "FILL_CART":
      return { ...state, cartList: action.payload };
    case "DELETE_CART":
      return init_state;
    default:
      return state;
  }
};
