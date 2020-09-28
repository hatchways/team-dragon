// const User = require("../models/User");
// const Email = require("../models/Email");

exports.sendEmail = async (req, res, next) => {
  try {
    console.log("req", req.body);
  } catch (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  }
};
