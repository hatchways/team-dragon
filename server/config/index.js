require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db:
    process.env.NODE_ENV == "test"
      ? process.env.TEST_DB_URI
      : // : process.env.DB_URI,
        "mongodb+srv://teamDragon:7NU9jVwvKDx2KDws@cluster0.cgtav.mongodb.net/<dbname>?retryWrites=true&w=majority",
  secret: process.env.SECRET_KEY || "shh",
};
