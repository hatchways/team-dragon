const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");

router.post("/edit-profile/image/:id", profileController.postAddImage);

router.post("/edit-profile/name/:id",profileController.updateName);

router.get("/profile/:id", profileController.getProfile);

module.exports = router;
