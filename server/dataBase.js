const { MongoClient } = require("mongodb");

const fetch = require("node-fetch");

const request = require("request-promise");

//const fs = require("file-system");

///REQUEST-PROMISE -MODULE

const dbFunction = async (dbName) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });

  await client.connect();
  console.log("connected!");
  const db = client.db(dbName);

  const getIds = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data.ObjectIDs;
    });
  console.log("IDS");
  console.log("IDS", getIds);

  await db.collection("MetObjectIds").insertOne({ data: getIds });
  await db.collection("Rooms");

  await client.close();
  console.log("disconnected!");
};

dbFunction("RELAXART");
