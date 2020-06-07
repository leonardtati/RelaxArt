"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const multer = require("multer");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// const router = require("./router");
const router = express.Router();

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

const {
  getUser,
  createUser,
  createMongoUser,
} = require("./Handlers/userHandlers");
const {
  getRooms,
  createRoomPictures,
  createRoom,
  getPassword,
} = require("./Handlers/roomHandlers");

const {
  addIOUser,
  removeIOUser,
  getIOUser,
  getIOUsersInRoom,
} = require("./IoUser");

app.use(router);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    AccessControlAllowOrigin: "*",
  })
);

//MULTER

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  dest: "uploads/",
});

///SOCKET IO

router.get("/", (req, res) => {
  res.send("server is running");
});

io.on("connection", (socket) => {
  console.log("WE DID IT");
  socket.on("join", ({ id, roomId }, callback) => {
    const { error, user } = addIOUser({ id: socket.id, roomId });

    if (error) return callback(error);
    socket.join(user.roomId);

    socket.broadcast.to(user.roomId).emit("message", {
      user: "admin",
      text: `${user.roomId}, has joined!`,
    });

    io.to(user.roomId).emit("roomData", {
      roomId: user.roomId,
      users: getIOUsersInRoom(user.roomId),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getIOUser(socket.id);

    io.to(user.roomId).emit("message", {
      user: user.name,
      text: message,
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeIOUser(socket.id);
    if (user) {
      io.to(user.roomId).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
    }
  });
});

//FIREBASE USERS-ENDPOINTS

//THIS VERIFIES THAT USER ALREADY EXISTS BEFORE ADDING TO THE DATABASES
app.get("/users", getUser);

//CREATE A NEW USER IN THE FBDB
app.post("/users", createUser);

//MONGO-USER ENPOINTS

//POPULATE THE MONGODB WITH NEW USERS
app.post("/mongoUser", createMongoUser);

//--ROOM-ENDPOINTS//

//-GET- the list of rooms//
app.get("/rooms", getRooms);

app.post("/rooms/:roomId", getPassword);

//-POST-RoomDetails
app.post("/roomDetails", createRoom);
//  Room Pictures
app.post("/uploadmultiple", upload.array("myImages", 12), createRoomPictures);

server.listen(PORT, () => console.log(`Server has started.`));
