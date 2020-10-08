const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const passport = require("passport");

router.post(
  "/edit-profile/:id",
  passport.authenticate("jwt", { session: false }),
  profileController.postUpdateProfile,
);

router.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  profileController.getProfile,
);

module.exports = router;
