const { Router } = require("express");
const controllers = require("../controllers/controllers");

const user = (app) => {
  const router = Router();
  app.use("/user", router);

  router.get("/getUser/:id", controllers.userController.getUser);
};

module.exports = user;
