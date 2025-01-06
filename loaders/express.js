const cors = require("cors");
const routes = require("../api/routes/routes");
const bodyParser = require("body-parser");

const express = async ({ app }) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/api/v1", routes());

  app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });
};

module.exports = express;
