"use strict";

const getMetObjects = async (req, res) => {
  const MetObjects = req.params;

  res.send(MetObjects);
};

//upsertTO UPDATE THE DATABASE N MAKE SURE IT'S NOT ALREAY IN THERE

/*await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    }); */

module.exports = {
  getMetObjects,
};
