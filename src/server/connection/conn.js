require("dotenv").config();
const conn = require("mongoose");
const DB = process.env.CONNECTION;
console.log(DB)
conn
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection success!!!");
  })
  .catch((err) => {
    throw err;
  });
module.exports = conn;
