const { Router } = require("express");
const user = require("./userRoutes");
const transaction = require("./transactionRoutes");

const index = () => {
  const app = Router();

  user(app);
  transaction(app);
  return app;
};

module.exports = index;
