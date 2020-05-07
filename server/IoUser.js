const users = [];

const addIOUser = ({ id, roomId }) => {
  console.log("ROOMIDINADDIOUSER", roomId);
  const existingUser = users.find((user) => user.roomId === roomId);

  // if (!roomId ) return { error: "Username and room are required." };
  // if (existingUser) return { error: "Username is taken." };

  const user = { id, roomId };

  console.log("INADDIOUSER", user);

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
  console.log("GETIOUSERINROOM", roomId);
};

module.exports = { addIOUser, removeIOUser, getIOUser, getIOUsersInRoom };
