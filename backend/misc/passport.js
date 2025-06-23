const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const { user } = require("../models");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    user
      .findOne({
        where: {
          id: jwt_payload.id,
        },
      })
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

module.exports = passport.authenticate("jwt", { session: false });