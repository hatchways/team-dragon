require("dotenv").config();

module.exports = {
  db: process.env.NODE_ENV == "test" ? process.env.TEST_DB_URI  : process.env.DB_URI,
  secret: process.env.SECRET_KEY || "shh",
}
