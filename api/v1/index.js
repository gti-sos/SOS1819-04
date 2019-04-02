const express = require("../../node_modules/express");
const router = express.Router();

const suicide_rates = require("./suicide-rates");

router.use("/suicide-rates", suicide_rates);

//para happiness-stats
const happiness_stats = require("./happiness-stats");
router.use("/happiness-stats", happiness_stats);


module.exports = router;