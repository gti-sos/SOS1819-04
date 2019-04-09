const express = require("../../../../node_modules/express");
const router = express.Router();
var path = require("path");
var BASE_PATH = "/api/v1/beer-consumed-stats/minipostman";

router.use("/", express.static(path.join(__dirname,"public")));
module.exports = router;