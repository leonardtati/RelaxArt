const users = [];

const addIOUser = ({ id, roomId }) => {
  const existingUser = users.find((user) => user.roomId === roomId);

  const user = { id, roomId };

  users.push(user);

  return { user };
};

const removeIOUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getIOUser = (id) => users.find((user) => user.id === id);

const getIOUsersInRoom = (roomId) => {
  users.filter((user) => user.roomId === roomId);
};

module.exports = { addIOUser, removeIOUser, getIOUser, getIOUsersInRoom };
