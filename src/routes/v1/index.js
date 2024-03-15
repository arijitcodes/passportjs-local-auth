const express = require("express");
const router = express.Router();

// Setup the Route Handler
router.use("/auth", require("./auth"));

module.exports = router;
