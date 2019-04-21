//MÓDULOS PRINCIPALES PARA ROUTER Y LA RUTA BASE
const express = require("../../../../node_modules/express");
const router = express.Router();
var path = require("path");
var BASE_PATH = "/api/v1/suicide-rates/frontend";


//DIRECCIONAMIENTO A index.html COMO PÁGINA PRINCIPAL
router.use("/", express.static(path.join(__dirname,"public")));

module.exports = router;