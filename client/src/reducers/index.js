import { combineReducers } from "redux";

import rooms from "./room-reducer";
import user from "./user-reducer";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
  firebase: firebaseReducer,
  rooms,
  user,
});
