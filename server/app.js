const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const Game = require("./gameEngine/Game");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));


// Temporary route for gameEngine algorithm
app.use("/game", (req, res, next) => {

  // Hard coded data to be replaced by real users
  const players = ["John", "Derrick", "Lisa", "Samson"];

  // Initializing the match
  const match = new Game();
  match.assignTeams(players);
  match.assignRoles(match.redTeam.players);
  match.assignRoles(match.blueTeam.players);
  match.start();
  console.log(match);

  if(!match){
    res.status(404).send({response: "Match not found!"})
  }
  res.json({match});
});

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json({ error: err });
// });

// Database connection using Mongoose
mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

module.exports = app;
