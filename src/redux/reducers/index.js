import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from './user';

export default combineReducers({
  userGlobal: authReducer,
  user: userReducer
});
