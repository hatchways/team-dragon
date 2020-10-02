const uploadImage = require("../middleware/uploadImage");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.postAddImage = async (req, res, next) => {
  const userId = req.params.id;
  uploadImage(req, res, (err) => {
    if (err) {
      return res.json(err);
    }

    // Successful
    const imageLocation = req.file.location;

    User.findOneAndUpdate(
      { _id: userId },
      { profileImageLocation: imageLocation },
      { upsert: true, new: true },
    )
      .then((user) => {
        if (!user) {
          return res.json({ err: "User not found" });
        }
        res.json({
          location: imageLocation,
        });
      })
      .catch((err) => console.log(err));
  });
};

exports.updateName = (req, res, next) => {
  const userId = req.params.id;
  const name = req.body.name;

  User.findOneAndUpdate(
    { _id: userId },
    { name: name },
    { upsert: true, new: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ err: "User not found" });
      }
      res.json({ name: user.name });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProfile = (req, res, next) => {
  const userId = req.params.id;
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new Error("User does not found!");
      }
      const { id, name, profileImageLocation } = user;
      res.json({ id, name, profileImageLocation });
    })
    .catch((err) => {
      console.log(err);
    });
};
