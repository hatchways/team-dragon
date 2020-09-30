const uploadImage = require("../middleware/uploadImage");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.postAddPhoto = async (req, res, next) => {
  const userId = req.params.id;
  uploadImage(req, res, (err) => {
    if (err) {
      return res.json(err);
    }

    // Successful
    const imageName = req.file.key;
    const imageLocation = req.file.location;
    const profileImage = {
      imageName,
      imageLocation,
    };

    User.findOneAndUpdate(
      { _id: userId },
      { profileImage: profileImage },
      { upsert: true },
    )
      .then((user) => {
        console.log(user);
      })
      .catch((err) => console.log(err));

    res.json({
      image: imageName,
      location: imageLocation,
    });
  });
};

exports.getProfile = (req, res, next) => {
  const userId = req.params.id;
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        throw new Error("User does not found!");
      }
      res.json({ user: user });
    })
    .catch((err) => {
      console.log(err);
    });
};
