const express = require("../../node_modules/express");
const router = express.Router();

const suicide_rates = require("./suicide-rates");

router.use("/suicide-rates", suicide_rates);

module.exports = router;