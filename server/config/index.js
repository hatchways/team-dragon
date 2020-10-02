require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  redis: process.env.REDIS_URI,
  db:
    process.env.NODE_ENV == "test"
      ? process.env.TEST_DB_URI
      : process.env.DB_URI,
  secret: process.env.SECRET_KEY || "shh",
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecret: process.env.AWS_SECRET,
  // sessionName: process.env.SESSION_NAME,
<<<<<<< HEAD
  // sessionSecret: process.env.SESSION_SECRET
=======
  // sessionSecret: process.env.SESSION_SECRET,
>>>>>>> index fix
};
