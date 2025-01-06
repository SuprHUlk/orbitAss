const mongoose = require("mongoose");

const connect = async () => {
  try {
    mongoose.connect(process.env.DB_URI);
    console.log("Database Connected");
  } catch (e) {
    console.log("Database Connection Failed");
    console.log(e);
  }
};

module.exports = connect;
