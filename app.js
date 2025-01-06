const loader = require("./loaders");
const express = require("express");

require("dotenv").config();

async function startServer() {
  const app = express();

  await loader({ expressApp: app });

  console.log(process.env.PORT);

  app.listen(3000, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();
