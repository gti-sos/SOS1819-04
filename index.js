//CREACIÓN DEL SERVIDOR WEB
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

//USO DEL PAQUETE BODY-PARSER PARA MOSTRAR CORRECTAMENTE EL JSON
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//REFERENCIADO A LA CARPETA 'public' DEL NODO RAÍZ DEL SERVIDOR
app.use("/",
    //dir name es la carpeta donde se esta ejecutando node
    express.static(__dirname+"/public"));

//CREACIÓN DEL RECURSO '/time' QUE DEVUELVE LA HORA DEL SERVIDOR
app.get("/time",(request,respone)=>{
    respone.send("Hello");
});









/*
  ======================
 |  API REST DE ADRIÁN  |
  ======================
*/
//CREACIÓN DEL OBJETO "stat"
var Stat = {
    initStat: function(country, year, noSuicidesMan, noSuicidesWoman, rank) {
        this.country = country;
        this.year = year;
        this.noSuicidesMan = noSuicidesMan;
        this.noSuicidesWoman = noSuicidesWoman;
        this.rank = rank;
    }
}

var stats = [];

//GET /api/v1/suicide-rates/loadInitialData
app.get("/api/v1/suicide-rates/loadInitialData", (req, res) => {
    
        var stat1 = Object.create(Stat);
        var stat2 = Object.create(Stat);
        var stat3 = Object.create(Stat);
        var stat4 = Object.create(Stat);
        
        stat1.initStat("hong kong", 2011, 10.6, 13.8, 39);
        stat2.initStat("lituania", 2012, 54.7, 10.8, 3);
        stat3.initStat("corea del sur", 2012, 38.2, 18, 6);
        stat4.initStat("groenlandia", 2011, 116.9, 45.0, 1);
        
        stats.push(stat1);
        stats.push(stat2);
        stats.push(stat3);
        stats.push(stat4);
        
        res.send("<h1>Initial Data Succesfuly Loaded</h1>");
        res.sendStatus("201");
    
    }
);


//GET /api/v1/suicide-rates (DEVUELVE UNA LISTA CON TODOS LOS RECURSOS)
app.get("/api/v1/suicide-rates", (req, res) => {
    
        res.send(stats);
    
    }
);

//POST /api/v1/suicide-rates (CREA UN NUEVO RECURSO)
app.post("/api/v1/suicide-rates", (req, res) => {
        
        var newStat = req.body;
        stats.push(newStat);
        
        res.send("<h1>Resource created successfully.</h1>");
        res.sendStatus("201");
        
    }
);

//GET /api/v1/suicide-rates/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        
        var filteredStats = stats.filter( (s) => { return s.country == country; } );
        
        if(filteredStats.length >= 1){
            
            res.send(filteredStats);
            res.sendStatus("200");
            
        } else {
            
            res.send("<h1>ERROR: Resource not Found.</h1>");
            res.sendStatus("404");
            
        }
        
    }
);

//DELETE /api/v1/suicide-rates/--reurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        var updatedStats = stats.filter( (s) => { 
            
                if(s.country == country) found = true;
                return s.country != country 
            
            } 
        );
        
        if(found){
            stats = updatedStats;
            res.send("<h1>Resource successfully deleted.</h1>");
            res.sendStatus("200");
        } else {
            res.send("<h1>ERROR: Resource not Found.</h1>");
            res.sendStatus("404");
        }
        
    }
);

//PUT /api/v1/suicide-rates/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        var found = false;
        
        var updatedStats = stats.map( (s) => {
            
                if(s.country == country){
                    found = true;
                    return updatedStat;
                } else {
                    return s;
                }
            
            }
        );
        
        if(found){
            stats = updatedStats;
            res.send("<h1>Resource successfully updated.</h1>");
            res.sendStatus("200");
        } else {
            res.send("<h1>ERROR: Resource not Found.</h1>");
            res.sendStatus("404");
        }
        
    }
);

//POST /api/v1/suicide-rates/--reurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/suicide-rates/:country", (req, res) => {
        
        res.send("<h1>ERROR. Method 'post' not Allowed on a Particular Resource.</h1>")
        res.sendStatus("405");
        
    }
);

//PUT /api/v1/suicide-rates (ERROR METODO NO PERMITIDO)
app.put("/api/v1/suicide-rates", (req, res) => {
        
        res.send("<h1>ERROR. Method 'put' not Allowed on Base Route.</h1>")
        res.sendStatus("405");
        
    }
);

//DELETE /api/v1/suicide-rates (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/suicide-rates", (req, res) => {
        
        stats = [];
        res.send("<h1>All resources successfully deleted.</h1>");
        res.sendStatus("200");
        
    }
);

//SERVIDOR A LA ESCUCHA DE PETICIONES
app.listen(port, () => { console.log("Server Ready and Listen in port", port); });