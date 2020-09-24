const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validateRegister = require("../validations/register");
const validateLogin = require("../validations/login");
const config = require("../config");

module.exports = {
  async register(req, res, next) {
    try {
      const { errors, isValid } = validateRegister(req.body);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          errors,
        });
      }

      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: false,
          errors: { email: "Email already exists" },
        });
      }

      const newUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });

      // Creating user session
      if (req.session) {
        req.session.isLoggedIn = true;
        req.session.user = newUser;
        const result = await req.session.save();
        console.log(req.session.user.name, " logged in");
      }

      const payload = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };
      const token = jwt.sign(payload, config.secret);

      return res.status(201).json({
        user: payload,
        token: token,
      });
    } catch (e) {
      return next(e);
    }
  },

  async login(req, res, next) {
    try {
      const { errors, isValid } = validateLogin(req.body);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          errors,
        });
      }

      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          success: false,
          errors: { email: "Email does not exist" },
        });
      }

      const isMatch = await user.comparePassword(req.body.password);
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
        const token = jwt.sign(payload, config.secret);

        // Creating user session
        if (req.session) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          const result = await req.session.save();
          console.log(req.session.user.name, " logged in");
        }

        return res.status(200).json({
          user: payload,
          token: token,
        });
      }

      return res.status(400).json({
        success: false,
        errors: { password: "Incorrect password" },
      });
    } catch (e) {
      return next(e);
    }
  },
};
