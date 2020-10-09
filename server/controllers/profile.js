const uploadImage = require("../middleware/uploadImage");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

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

        // update the token
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          profileImageLocation: user.profileImageLocation,
        };
        const token = jwt.sign(payload, config.secret);

        return res.status(200).json({
          name: user.name,
          token,
        });
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

          // update the roken
          const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            profileImageLocation: user.profileImageLocation,
          };
          const token = jwt.sign(payload, config.secret);

          res.json({
            location: imageLocation,
            token,
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
      const { id, name, profileImageLocation, email } = user;
      res.json({ id, name, profileImageLocation, email });
    })
    .catch((err) => {
      console.log(err);
    });
};
