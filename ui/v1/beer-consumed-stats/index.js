const express = require("../../../node_modules/express");
const router = express.Router();
var path = require("path");

router.use("/", express.static(path.join(__dirname,"public")));
module.exports = router;