"use strict";

const passportJwt = require("passport-jwt");
const config = require("../config");
const User = require("../models/User");

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};

const jwtStrategy = new JwtStrategy(opts, (payload, done) => {
  User.findById(payload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
    })
    .catch((err) => {
      console.log(err);
      return done(null, false);
    });
});

module.exports = jwtStrategy;
