const express = require("../../node_modules/express");
const router = express.Router();


//ENRUTADO SUICIDE-RATES
const suicide_rates = require("./frontend_suicide_rates");
router.use("/suicide-rates", suicide_rates);

/*
//ENRUTADO HAPPYNESS-STATS
const happiness_stats = require("./frontend_happiness_stats");
router.use("/happiness-stats", happiness_stats);


//ENRUTADO BEER-CONSUMED-STATS
const beer_stats = require("./frontend_beer-consumed_stats");
router.use("/beer-consumed-stats", beer_stats);
*/
module.exports = router;