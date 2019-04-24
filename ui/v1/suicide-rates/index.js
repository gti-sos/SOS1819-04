//MÓDULOS PRINCIPALES PARA ROUTER Y LA RUTA BASE
const express = require("../../../node_modules/express");
const router = express.Router();
var path = require("path");


//DIRECCIONAMIENTO A index.html COMO PÁGINA PRINCIPAL
router.use("/", express.static(path.join(__dirname,"public")));

module.exports = router;