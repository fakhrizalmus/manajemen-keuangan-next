const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const { User } = require("../models");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    User
      .findOne({
        where: {
          id: jwt_payload.id,
        },
      })
      .then((User) => done(null, User))
      .catch((err) => done(err, false));
  })
);

module.exports = passport.authenticate("jwt", { session: false });