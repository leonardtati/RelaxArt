"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fetch = require("isomorphic-fetch");
const _ = require("lodash");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

const upload = multer({
  dest: "uploads/",
});

//const { getMetObjects, getRooms, createRoom } = require("./MET-handlers");
const { getUser, createUser, createMongoUser } = require("./userHandlers");
const { getRooms, createRoom } = require("./roomHandlers");
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
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", express.static(__dirname + "/"))
  .use("/uploads", express.static(__dirname + "/uploads"))
  // REST endpoints

  //FIREBASE USERS-ENDPOINTS

  //THIS VERIFIES THAT USER ALREADY EXISTS BEFORE ADDING TO THE FIREBASEDB
  .get("/users", getUser)

  //CREATE A NEW USER IN THE FBDB
  .post("/users", createUser)

  //MONGO-USER ENPOINTS

  //POPULATE THE MONGODB WITH NEW USERS
  .post("/mongoUser", createMongoUser)

  //
  //.get("/mongoUser", getMongoUser)

  //--ROOM-ENDPOINTS//

  //-GET-a list of rooms//

  //.get("/rooms", getRooms)

  //-POST a new room

  .post("/room", upload.single("myImages"), createRoom)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
