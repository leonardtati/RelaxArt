"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fetch = require("isomorphic-fetch");
const _ = require("lodash");
require("dotenv").config();

const { getMetObjects, getRooms, createRoom } = require("./MET-handlers");
const { getUser, createUser, createMongoUser } = require("./userHandlers");
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
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  // REST endpoints

  //FIREBASE USERS-ENDPOINTS

  //THIS VERIFIES THAT USER ALREADY EXISTS BEFORE ADDING TO THE FIREBASEDB
  .get("/users", getUser)

  //CREATE A NEW USER IN THE FBDB
  .post("/users", createUser)

  //MONGO-USER ENPOINTS

  //POPULATE THE MONGODB WITH NEW USERS
  .post("/mongoUser", createMongoUser)

  //--MET-ENDPOINTS//

  //returns a listing of all valid Object IDs available to use

  //.get("/public/collection/v1/objects", getMetObjects)

  //--ROOM-ENDPOINTS//

  //-GET-a list of rooms//

  //.get("/rooms", getRooms)

  //-POST a new room

  //.post("/room", createRoom)

  //---Gets Country List in an Array---//

  /*.get("/countries", getCountries)

  //DO NOT USE THIS ENDPOINT.... YET. Could be used for a company page...

  .get("/companies/:country", (req, res) => {
    const { country } = req.params;
    const companiesByCountry = companyData.filter((company) => {
      return (
        company.country.replace(" ", "").toLowerCase() === country.toLowerCase()
      );
    });
    return simulateProblems(res, { companies: companiesByCountry });
  })

  //----Gets the Products by each country----//
  .get("/products/:country", getProductByCountry)

  .get("/products/detail/:productId", getProductDetail)

  //---A countries Featured Products, Sorted By Lowest Price---//

  .get("/countries/:country/featuredproducts", getFeaturedProducts)
  //Order-Form Validation

  .post("/order", getOrder)

  //---Gets Categories, Organized by Country---//

  .get("/categories/:country", (req, res) => {
    const { country } = req.params;
    const companiesIdByCountry = companyData
      .map((company) => {
        if (
          company.country.replace(" ", "").toLowerCase() ===
          country.toLowerCase()
        ) {
          return company.id;
        }
      })
      .filter((id) => id !== undefined);
    const productsByCountry = companiesIdByCountry.map((id) => {
      return productData.filter((product) => {
        return product.companyId === id;
      });
    });
    const productsByCategories = _.flatten(productsByCountry).map((product) => {
      return product.category;
    });
    return simulateProblems(res, {
      categories: Array.from(new Set(productsByCategories)),
    });
  }) */

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
