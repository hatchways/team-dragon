const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const redis = require("redis");
const passport = require("passport");
const passportStrategy = require("./config/passport");
const config = require("./config");
const gameRouter = require("./routes/game");
const authRouter = require("./routes/auth");
const emailRouter = require("./routes/email");
const profileRouter = require("./routes/profile");

// app configuration
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(cookieParser());
app.use(logger("dev"));
app.use(passport.initialize());
passport.use(passportStrategy);

// redis connection
redis
  .createClient(config.redis)
  .on("connect", () => {
    console.log("Redis connected");
  })
  .on("error", (err) => {
    throw err;
  });

// database connection using Mongoose
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

// setup routes
app.use("/users", authRouter);
app.use(gameRouter);
app.use(emailRouter);
app.use(profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
