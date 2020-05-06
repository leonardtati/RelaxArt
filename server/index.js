"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fetch = require("isomorphic-fetch");
const _ = require("lodash");
const multer = require("multer");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
require("dotenv").config();

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

//const { getMetObjects, getRooms, createRoom } = require("./MET-handlers");
const { getUser, createUser, createMongoUser } = require("./userHandlers");
const {
  getRooms,
  // getRoomDetail,
  createRoomPictures,
  createRoom,
} = require("./roomHandlers");
const PORT = 4000;
express()
  .use(function (req, res, next) {
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
  })
  // const app = express();
  // const server = http.createServer(app);
  // const io = socketio(server);

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use("/uploads", express.static(__dirname + "/uploads"))
  //.use(cors({ credentials: true, origin: "http://localhost:3000" }))
  // REST endpoints

  //SOCKET IO ENDPOINTS
  // io.on("connection", (socket) => {
  //   console.log("a user connected");
  //   socket.on("disconnect", () => {
  //     console.log("user has left");
  //   });
  // })

  //FIREBASE USERS-ENDPOINTS

  //THIS VERIFIES THAT USER ALREADY EXISTS BEFORE ADDING TO THE DATABASES
  .get("/users", getUser)

  //CREATE A NEW USER IN THE FBDB
  .post("/users", createUser)

  //MONGO-USER ENPOINTS

  //POPULATE THE MONGODB WITH NEW USERS
  .post("/mongoUser", createMongoUser)

  //
  //.get("/mongoUser", getMongoUser)

  //--ROOM-ENDPOINTS//

  //-GET- the list of rooms//
  .get("/rooms", getRooms)
  //-GET- the details of a room
  // .get("/rooms/:roomId", getRoomDetail)
  // .get("/rooms/uploads/myImages", getRoomDetail)
  //-POST- Room Pictures
  .post("/roomDetails", createRoom)
  .post("/uploadmultiple", upload.array("myImages", 12), createRoomPictures)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
