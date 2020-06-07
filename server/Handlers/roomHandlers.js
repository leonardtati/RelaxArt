const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const uri = process.env.MONGO_URI;

//THIS HANDLER CREATES THE ROOM IN MONGO AND ADDS THE BASIC INFO
const createRoom = async (req, res) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const roomDetails = req.body;

  console.log("INCREATEROOM", roomDetails);

  const pictures = [];

  try {
    await client.connect();
    const db = client.db("RELAXART");
    const stuff = await db
      .collection("room")
      .insertOne({ roomDetails, pictures });
    res.status(201).json({
      status: 201,
      _id: stuff.insertedId,
      roomDetails: roomDetails,
    });
  } catch (err) {
    res.status(500).json({
      data: roomDetails,
      message: "Something went wrong",
      err,
    });
  }
};

//THIS HANDLER UPDATES THE ROOM-DOCUMENT IN MONGO WITH PICTURES

const createRoomPictures = async (req, res, err) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const files = req.files;
  const roomId = req.body.roomId;

  try {
    await client.connect();
    const db = client.db("RELAXART");

    const newValues = { $set: { pictures: files } };

    const r = await db
      .collection("room")
      .findOneAndUpdate({ _id: ObjectId(roomId) }, newValues);
    client.close();
    res.status(201).send(files);
  } catch (err) {
    client.close();
    res.status(500).json({
      data: files,
      message: err.message,
      err: "WHOOPS",
      err,
    });
  }
};

const getRooms = async (req, res) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    const db = client.db("RELAXART");
    const array = await db.collection("room").find().toArray();
    let rooms = {};
    array.forEach((room) => {
      rooms = { ...rooms, [room._id]: room };
    });
    res.status(200).json({ rooms: rooms });
  } catch (err) {
    res.status(400).json({ message: "sorry that room doesn't exist" });
  }
};

const getPassword = async (req, res) => {
  const { roomId } = req.params;
  const { submittedPassword } = req.body;
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("RELAXART");
    const roomPassword = await db
      .collection("room")
      .findOne({ _id: ObjectId(roomId) });

    if (roomPassword.roomDetails.password === submittedPassword) {
      res.status(200).json({ satus: 200, message: "Open da Gates" });
    } else {
      res.status(200).json({ satus: 200, message: "you shall not" });
    }
    client.close();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = {
  createRoom,
  createRoomPictures,
  getRooms,
  getPassword,
};
