const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const passportStrategy = require("./config/passport");
const config = require("./config");
const gameRouter = require("./routes/game");
const authRouter = require("./routes/auth");
const emailRouter = require("./routes/email");
const profileRouter = require('./routes/profile');
const User = require("./models/User");

// app configuration
var app = express();

// // create session in database
// const store = new MongoDBStore({
//   uri: config.db,
//   collection: "sessions",
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(cookieParser());
app.use(logger("dev"));
app.use(passport.initialize());
passport.use(passportStrategy);

// // Session for the user
// app.use(
//   session({
//     name: config.sessionName,
//     secret: config.sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   }),
// );

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

// database connection using Mongoose
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
