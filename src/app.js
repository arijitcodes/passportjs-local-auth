const express = require("express");
const expressSessions = require("express-session");
const passport = require("passport");

const { errorHandler } = require("./middlewares/errorHandlers/errorHandler");
require("./middlewares/passportStrategies/localAuth");

const app = express();

// Setup Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSessions({
    secret:
      "SomeRandomSecretThatIsNotThisWeakAndHasBeenGeneratedUsingSomeRandomKeyGenerator",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Setup Routes
app.get("/", (_, res) => {
  return res.json({ message: "🦄🌈✨👋🏻🌎🌍🌏👋🏻✨🌈🦄" });
});

// API Healthcheck Route
app.get("/healthcheck", (_, res) => {
  return res.status(200).json({ message: "API is healthy ✨" });
});

// Routes
app.use("/api/v1", require("./routes/v1"));

// Error Handler
app.use(errorHandler);

// Export the App from this Module
module.exports = app;
