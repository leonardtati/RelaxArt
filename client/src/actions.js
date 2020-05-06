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
