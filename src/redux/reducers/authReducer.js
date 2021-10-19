const init_state = {
  username: "",
  email: "",
  role: "",
  user_status: "",
  fullname: "",
  address: "",
  city: "",
  phone_number: "",
  age: "",
  gender: "",
  img_profile: "",
  message: "",
  isChecked: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    case "USER_LOGOUT":
      return init_state;
    case "LOAD_DATA":
      return { ...state, isChecked: true };
    case "REMOVE_MESSAGE":
      return { ...state, message: "" };
    default:
      return state;
  }
};
