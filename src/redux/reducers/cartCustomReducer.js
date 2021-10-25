const init_state = {
  itemList: [],
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "ADD_CUSTOM_ITEM":
      // return [...state, action.payload].filter((ev) => {
      //   if (ev.product_id !== action.payload.product_id) {
      //     return ev;
      //   }
      // });
      return {
        ...state,
        itemList: [...state.itemList, action.payload],
      };

    case "DELETE_CUSTOM_ITEM":
      return init_state;
    default:
      return state;
  }
};
