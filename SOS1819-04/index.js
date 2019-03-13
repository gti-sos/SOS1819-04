var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

app.use("/",
    //dir name es la carpeta donde se esta ejecutando node
    express.static(__dirname+"/public"));


app.get("/time",(request,respone)=>{
    respone.send(new Date());
});


app.listen(port, () =>
{
    console.log("Magic is happening in port "+port)
});