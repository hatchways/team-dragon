require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db:
    process.env.NODE_ENV == "test"
      ? process.env.TEST_DB_URI
      : process.env.DB_URI,
  secret: process.env.SECRET_KEY || "shh",
};
