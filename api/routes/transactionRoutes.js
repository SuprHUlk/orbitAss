const { Router } = require("express");
const controllers = require("../controllers/controllers");

const transaction = (app) => {
  const router = Router();
  app.use("/transaction", router);

  router.get(
    "/getTransactionByUserId/:userId",
    controllers.transactionController.getTransactionByUserId
  );

  router.get(
    "/getTransactionsWithUserDetails",
    controllers.transactionController.getTransactionsWithUserDetails
  );
};

module.exports = transaction;
