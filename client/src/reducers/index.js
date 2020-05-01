import { combineReducers } from "redux";

import room from "./room-reducer";
import user from "./user-reducer";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  firebase: firebaseReducer,
  room,
  user,
});
