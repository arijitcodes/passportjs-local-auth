const bcrypt = require("bcrypt");

// Auth Route Controllers

const createHttpError = require("http-errors");
const User = require("../models/User");

// /auth controller
const login = (req, res) => {
  /* if (!req.user) {
      console.log("LALA");
      throw new createHttpError.Unauthorized("Failed Login");
    } */
  //   res.redirect("/");

  res.status(200).json({
    user: req.user,
  });
};

const register = async (req, res, next) => {
  try {
    const user = new User(req.body);
    user.emails.push(req.body.email);
    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      //   TODO: FIX WHY THIS ERROR ISNT GETTING CAUGHT BY ERROR HANDLER
      /* throw new createHttpError.BadRequest(
        "Login Input is Invalid! Please fill in all the fields properly!"
      ); */
      // throw new createHttpError.BadRequest(JSON.stringify(errors));
      return next(new createHttpError.BadRequest(JSON.stringify(errors)));
    }
    return next(new createHttpError.BadRequest("failed to create user"));
  }
  /* User.create(req.body, (err, user) => {
    if (err) return res.status(500).json(err);
    res.status(201).json(user);
  }); */
};

module.exports = { login, register };
