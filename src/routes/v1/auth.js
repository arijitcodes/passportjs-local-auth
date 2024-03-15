const express = require("express");
const passport = require("passport");
const router = express.Router();

// Controllers
const { login, register } = require("../../controllers/auth");

// Auth Routes

// Login Route using PassportJS Local Auth Strategy
/* router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    // if (!user) res.send("No User Exists");
    if (!user) throw new createHttpError.Unauthorized("Wrong Credentials!");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
}); */

router.post("/register", register);

router.post("/login", passport.authenticate("local"), login);

module.exports = router;
