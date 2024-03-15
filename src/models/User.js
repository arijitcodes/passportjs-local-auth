const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      required: [true, "Auth Type is Required"],
      lowercase: true,
      trim: true,
      default: "local",
      enum: ["local", "google", "github"], // enum means string objects
    },
    authService: {
      id: {
        type: String,
        //   required: [true, "Auth Service ID is Required"],
      },
      accessToken: {
        type: String,
        //   required: [true, "Auth Service Access Token is Required"],
      },
      refreshToken: {
        type: String,
        //   required: [true, "Auth Service Refresh Token is Required"],
      },
      tokenExpiry: {
        type: Date,
        //   required: [true, "Auth Service Token Expiry is Required"],
      },
      tokenExpiry: {
        type: Date,
        //   required: [true, "Auth Service Token Expiry is Required"],
      },
      tokenExpiry: {
        type: Date,
        //   required: [true, "Auth Service Token Expiry is Required"],
      },
    },
    name: {
      type: String,
      required: [true, "Name is Required"],
      minlength: 3,
      maxlength: 50,
    },
    emails: {
      type: [String],
      lowercase: true,
      required: [true, "Email List is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: 8,
      maxlength: 1024,
    },
    photos: {
      type: [String],
      required: [true, "Photo List is Required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
