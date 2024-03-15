const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../../models/User");
const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    User.findOne({ emails: { $in: [email] } })
      .then((user) => {
        /* if (err) {
        return done(err);
      } */
        if (!user) {
          throw new createHttpError.Unauthorized("User not found");
          //   return done(null, false);
        }

        if (!bcrypt.compareSync(password, user.password)) {
          throw new createHttpError.Unauthorized("Wrong password");
          //   return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user._id,
      email: user?.emails[0],
      //   picture: user?.pictures[0],
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
