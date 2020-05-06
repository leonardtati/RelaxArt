// const { MongoClient } = require("mongodb");
// const assert = require("assert");
// const fs = require("fs");

// const createRoomDetails = async (req, res) => {
//   const client = new MongoClient("mongodb://localhost:27017", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });

//   const roomDetails = req.body;

//   console.log(roomDetails);

//   try {
//     await client.connect();
//     const db = client.db("RELAXART");
//     await db.collection("room").insertOne({ roomDetails });
//     res.status(201).json({ status: 201, roomDetails: roomDetails });
//   } catch (err) {
//     res.status(500).json({
//       data: files,
//       message: "Something went wrong",
//       err,
//     });
//   }
// };

// const createRoom = async (req, res, err) => {
//   const client = new MongoClient("mongodb://localhost:27017", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });

//   const files = req.files;
//   console.log(files);
//   try {
//     await client.connect();
//     const db = client.db("RELAXART");

//     await db
//       .collection("room")
//       .updateOne({}, { $set: { pictures: files } }, { upsert: true });
//     res.status(201).send(files);
//   } catch (err) {
//     res.status(500).json({
//       data: files,
//       message: "Something went wrong",
//       err: "WHOOPS",
//       err,
//     });
//   }
// };

// const getRooms = async (req, res) => {
//   const client = new MongoClient("mongodb://localhost:27017", {
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();
//     const db = client.db("RELAXART");
//     const array = await db.collection("room").find().toArray();
//     let rooms = {};
//     array.forEach((room) => {
//       rooms = { ...rooms, [room._id]: room };
//     });
//     res.status(200).json({ rooms: rooms });
//   } catch (err) {
//     res.status(400).json({ message: "sorry that room doesn't exist" });
//   }
// };

// const getRoomDetail = async (req, res) => {
//   const client = new MongoClient("mongodb://localhost:27017", {
//     useUnifiedTopology: true,
//   });
// };

// module.exports = {
//   createRoomDetails,
//   createRoom,
//   getRooms,
//   getRoomDetail,
// };
