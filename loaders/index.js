const expressLoader = require("./express");
const connect = require("./mongoose");

const index = async ({ expressApp }) => {
  await connect();
  await expressLoader({ app: expressApp });
};

module.exports = index;
