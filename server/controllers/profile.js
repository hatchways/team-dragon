const uploadImage = require("../middleware/uploadImage");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.postUpdateProfile = (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).json({ err: "Please Sign in!" });
  }
  // If name update request is sent
  if (req.body.name) {
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
        return res.status(200).json({ name: user.name });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // If profile picture request is sent
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
  }
};

exports.getProfile = (req, res, next) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).json({ err: "Please Sign in!" });
  }
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new Error("User does not found!");
      }
      const { id, name, profileImageLocation,email } = user;
      res.json({ id, name, profileImageLocation,email });
    })
    .catch((err) => {
      console.log(err);
    });
};
