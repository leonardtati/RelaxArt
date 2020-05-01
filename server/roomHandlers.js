const { MongoClient } = require("mongodb");

const createRoom = async (req, res) => {
  console.log("CREATEROOM", req.file, req.body, req.files);
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    const db = client.db("RELAXART");

    let r = await db.collection("room").insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({
      status: 201,
      data: req.body,
      message: "Room succesfully created!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, data: req.body, message: "Something went wrong" });
  }
};

const getRooms = async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db("RELAXART");
    const result = await db.collection("rooms").find({ _id });
    res.status(200).json({ rooms: result });
  } catch (err) {
    res.status(400).json({ message: "sorry that room doesn't exist" });
  }
};

module.exports = {
  createRoom,
  getRooms,
};
