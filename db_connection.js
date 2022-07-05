var sqlite3 = require("sqlite3");
let connectdb = () =>
  new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Failed to connect to DB: ", err.message);
      return;
    }
    console.log("Successfully Connected to DB!");
  });

module.exports = connectdb;
