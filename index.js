//CREACIÓN DEL SERVIDOR WEB
var moment = require("moment");
var express = require("express");
var app = express();
const port = process.env.PORT || 8080;


//USO DEL PAQUETE BODY-PARSER PARA MOSTRAR CORRECTAMENTE EL JSON
var bodyParser = require("body-parser");
app.use(bodyParser.json());


//REFERENCIADO A LA CARPETA 'public' DEL NODO RAÍZ DEL SERVIDOR
app.use("/",
    //dir name es la carpeta donde se esta ejecutando node
    express.static(__dirname+"/public"));


//DIRECCIONAMIENTO HACIA /api
const api = require("./api");
app.use("/api", api);




//CREACIÓN DEL RECURSO '/time' QUE DEVUELVE LA HORA DEL SERVIDOR
app.get("/time",(req,res)=>{
    
    var hour = moment().format('LLLL');
    var message = "<html><body><h2>Server Date and Hour:</h2></br><h1>" + hour.toString() + "</h1></body></html>";
    res.send(message);
    
});


//SERVIDOR A LA ESCUCHA DE PETICIONES
app.listen(port, () => { console.log("Server Ready and Listen in port " + port.toString() + " !!. Please wait until it establishes a connection with the database."); });
