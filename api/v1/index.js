const express = require("../../node_modules/express");
const router = express.Router();


//ENRUTADO SUICIDE-RATES
const suicide_rates = require("./suicide-rates");
router.use("/suicide-rates", suicide_rates);


//ENRUTADO HAPPYNESS-STATS
const happiness_stats = require("./happiness-stats");
router.use("/happiness-stats", happiness_stats);


//ENRUTADO BEER-CONSUMED-STATS
const beer_stats = require("./beer-consumed-stats");
router.use("/beer-consumed-stats", beer_stats);

module.exports = router;