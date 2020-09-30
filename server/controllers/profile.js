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
    const imageLocation = req.file.location;

    User.findOneAndUpdate(
      { _id: userId },
      { profileImageLocation: imageLocation },
      { upsert: true },
    )
      .then((user) => {
        
      })
      .catch((err) => console.log(err));

    res.json({
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
      const {id,name,profileImageLocation} = user;
      res.json({id,name,profileImageLocation});
    })
    .catch((err) => {
      console.log(err);
    });
};
