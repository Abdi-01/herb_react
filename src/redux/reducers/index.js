import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./user";
import cartReducer from "./cartReducer";

export default combineReducers({
  userGlobal: authReducer,
  user: userReducer,
  cartGlobal: cartReducer,
});
