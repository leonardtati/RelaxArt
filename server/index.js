"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//const fetch = require("isomorphic-fetch");
const _ = require("lodash");
const multer = require("multer");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { getUser, createUser, createMongoUser } = require("./userHandlers");
const {
  getRooms,
  // getRoomDetail,
  createRoomPictures,
  createRoom,
} = require("./roomHandlers");

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

// SOCKET IO ENDPOINTS
// const socket = io.connect({
//   transportOptions: {
//     polling: {
//       extraHeaders: {
//         "x-clientid": "abc",
//       },
//     },
//   },
// });
// io.use((socket, next) => {
//   let clientId = socket.handshake.headers["x-clientid"];
//   if (isValid(clientId)) {
//     return next();
//   }
//   return next(new Error("authentication error"));
// });
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user has left");
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

//
//.get("/mongoUser", getMongoUser)

//--ROOM-ENDPOINTS//

//-GET- the list of rooms//
app.get("/rooms", getRooms);
//-GET- the details of a room
// .get("/rooms/:roomId", getRoomDetail)
// .get("/rooms/uploads/myImages", getRoomDetail)
//-POST- Room Pictures
app.post("/roomDetails", createRoom);
app.post("/uploadmultiple", upload.array("myImages", 12), createRoomPictures);

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
