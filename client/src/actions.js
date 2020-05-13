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

export const requestUserInfo = () => ({
  type: "REQUEST_USER_INFO",
});

export const receiveUserInfo = (user) => ({
  type: "RECEIVE_USER_INFO",
  user,
});

export const addUserInfo = (user) => ({
  type: "ADD_USER_INFO",
  user,
});
