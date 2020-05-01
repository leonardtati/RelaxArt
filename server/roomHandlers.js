const { MongoClient } = require("mongodb");

const createRoom = async (req, res, err) => {
  if (err) {
    res.send("ERRROR: " + err);
  }
  console.log("REQ.FILE", req);
  console.log("RES.FILE", res);
  // console.log("REQ.FILE", file);
  // console.log("REQ.BODY", req.body.myImages);
  // console.log("REQ.FILES", req.files);
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    const db = client.db("RELAXART");

    let r = await db.collection("room").insertMany(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({
      status: 201,
      data: req.body,
      message: "Room succesfully created!",
    });
  } catch (err) {
    res.status(500).json({
      data: req.body,
      message: "Something went wrong",
      err: "WHOOPS",
      err,
    });
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
