const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const isAuth = require("../middleware/isAuth");

router.post("/edit-profile/:id",isAuth, profileController.postUpdateProfile);

router.get("/profile/:id",isAuth, profileController.getProfile);

module.exports = router;
