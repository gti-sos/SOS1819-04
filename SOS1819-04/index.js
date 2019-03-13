var express = require("express");
var app = express();

var moment = require("moment");
var port = process.env.PORT || 8080;

app.use("/", express.static("/home/ubuntu/workspace/Servidor_Web/public"));

app.get("/time", (request, response) => 
            {
                var hora = moment().format('MMMM Do YYYY, h:mm:ss a');
                response.send(hora);
            }
        );

app.listen(port, () => {console.log("Server Ready and Listen in port", port);});