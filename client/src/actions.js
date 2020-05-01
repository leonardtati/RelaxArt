export const requestLogin = () => ({
  type: "LOGIN_REQUEST",
});

export const receiveLogin = (user) => ({
  type: "LOGIN_SUCCESS",
  user,
});

export const loginError = () => ({
  type: "LOGIN_FAILURE",
});

export const requestLogout = () => ({
  type: "LOGOUT_REQUEST",
});
export const receiveLogout = () => ({
  type: "LOGOUT_SUCCESS",
});
export const logoutError = () => ({
  type: "LOGOUT_ERROR",
});
export const verifyRequest = () => ({
  type: "VERIFY_REQUEST",
});
export const verifySuccess = () => ({
  type: "VERIFY_SUCCESS",
});

export const requestRoomInfo = () => ({
  type: "REQUEST_ROOM_INFO",
});

export const receiveRoomInfo = (room) => ({
  type: "RECEIVE_ROOM_INFO",
  room,
});

export const addRoomInfo = (room) => ({
  type: "ADD_ROOM_INFO",
  room,
});
