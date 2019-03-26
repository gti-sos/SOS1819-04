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
var SuicideStat = {
    initStat: function(country, year, noSuicidesMan, noSuicidesWoman, rank) {
        this.country = country;
        this.year = year;
        this.noSuicidesMan = noSuicidesMan;
        this.noSuicidesWoman = noSuicidesWoman;
        this.rank = rank;
    }
}

var suicide_stats = [];

//GET /api/v1/suicide-rates/loadInitialData
app.get("/api/v1/suicide-rates/loadInitialData", (req, res) => {
    
        var suicideStat1 = Object.create(SuicideStat);
        var suicideStat2 = Object.create(SuicideStat);
        var suicideStat3 = Object.create(SuicideStat);
        var suicideStat4 = Object.create(SuicideStat);
        
        suicideStat1.initStat("hong kong", 2011, 10.6, 13.8, 39);
        suicideStat2.initStat("lituania", 2012, 54.7, 10.8, 3);
        suicideStat3.initStat("corea del sur", 2012, 38.2, 18, 6);
        suicideStat4.initStat("groenlandia", 2011, 116.9, 45.0, 1);
        
        suicide_stats = [suicideStat1, suicideStat2, suicideStat3, suicideStat4];
        
        res.sendStatus(201);
        res.send("<h1>Initial Data Succesfuly Loaded</h1>");
    
    }
);


//GET /api/v1/suicide-rates (DEVUELVE UNA LISTA CON TODOS LOS RECURSOS)
app.get("/api/v1/suicide-rates", (req, res) => {
    
        res.send(suicide_stats);
    
    }
);

//POST /api/v1/suicide-rates (CREA UN NUEVO RECURSO)
app.post("/api/v1/suicide-rates", (req, res) => {
        
        var newStat = req.body;
        
        if(suicide_stats.includes(newStat)){
            
            res.sendStatus(409);
            res.send("<h1>Resource Already Exists. If you want edit it, please, run PUT order.</h1>");
            
        } else {
            
            suicide_stats.push(newStat);
        
            res.sendStatus(201);
            res.send("<h1>Resource created successfully.</h1>");
            
        }
        
    }
);

//GET /api/v1/suicide-rates/--recurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        
        var filteredStats = suicide_stats.filter( (s) => { return s.country == country; } );
        
        if(filteredStats.length >= 1){
            
            res.send(filteredStats);
            res.sendStatus(200);
            
        } else {
            
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
            
        }
        
    }
);

//DELETE /api/v1/suicide-rates/--recurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        var updatedStats = suicide_stats.filter( (s) => { 
            
                if(s.country == country) found = true;
                return s.country != country 
            
            } 
        );
        
        if(found){
            suicide_stats = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully deleted.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//PUT /api/v1/suicide-rates/--recurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        var found = false;
        
        var updatedStats = suicide_stats.map( (s) => {
            
                if(s.country == country){
                    found = true;
                    return updatedStat;
                } else {
                    return s;
                }
            
            }
        );
        
        if(found){
            suicide_stats = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully updated.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//POST /api/v1/suicide-rates/--recurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/suicide-rates/:country", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'post' not Allowed on a Particular Resource.</h1>")
        
    }
);

//PUT /api/v1/suicide-rates (ERROR METODO NO PERMITIDO)
app.put("/api/v1/suicide-rates", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'put' not Allowed on Base Route.</h1>")
        
    }
);

//DELETE /api/v1/suicide-rates (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/suicide-rates", (req, res) => {
        
        suicide_stats = [];
        res.sendStatus(200);
        res.send("<h1>All resources successfully deleted.</h1>");

        
    }
);





/*
  ======================
 |  API REST DE ANA  |
  ======================
*/
//CREACIÓN DEL OBJETO "stat"
var Stat_h = {
    initStat: function(country, year, happinessScore, lowerLimitTrust, UpperLimitTrust) {
        this.country = country;
        this.year = year;
        this.happinessScore = happinessScore;
        this.lowerLimitTrust = lowerLimitTrust;
        this.UpperLimitTrust = UpperLimitTrust;
    }
}

var happiness_stats = [];

//GET /api/v1/happiness-stats/loadInitialData
app.get("/api/v1/happiness-stats/loadInitialData", (req, res) => {
    
        var stat5 = Object.create(Stat_h);
        var stat6 = Object.create(Stat_h);
        var stat7 = Object.create(Stat_h);
        var stat8 = Object.create(Stat_h);
        
        stat5.initStat("argelia", 2002, 5.7, 5.5, 5.8);
        stat6.initStat("españa", 2008, 7.3, 7.2, 7.4);
        stat7.initStat("arabia saudita", 2003, 7.3, 7.2, 7.4);
        stat8.initStat("Ucrania", 2008, 6.1, 6, 6.2);
        
        happiness_stats.push(stat5);
        happiness_stats.push(stat6);
        happiness_stats.push(stat7);
        happiness_stats.push(stat8);
        
        res.sendStatus(201);
        res.send("<h1>Initial Data Succesfuly Loaded</h1>");
    
    }
);


//GET /api/v1/happiness-stats 
app.get("/api/v1/happiness-stats", (req, res) => {
    
        res.send(happiness_stats);
    
    }
    
);

//POST /api/v1/happiness-stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/happiness-stats", (req, res) => {
        
        var newStat = req.body;
        happiness_stats.push(newStat);
        
        res.sendStatus(201);
        res.send("<h1>Resource created successfully.</h1>");
        
    }
);

//GET /api/v1/happiness-stats/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        
        var filteredStats = happiness_stats.filter( (s) => { return s.country == country; } );
        
        if(filteredStats.length >= 1){
            
            res.send(filteredStats);
            res.sendStatus(200);
            
        } else {
            
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
            
        }
        
    }
);

        
//DELETE /api/v1/happiness-stats/--recurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        var updatedStats = happiness_stats.filter( (s) => { 
            
                if(s.country == country) found = true;
                return s.country != country 
            
            } 
        );
        
        if(found){
            happiness_stats = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully deleted.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//PUT /api/v1/happiness-stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        var found = false;
        
        var updatedStats = happiness_stats.map( (s) => {
            
                if(s.country == country){
                    found = true;
                    return updatedStat;
                } else {
                    return s;
                }
            
            }
        );
        
        if(found){
            happiness_stats = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully updated.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//POST /api/v1/happiness-stats/--recurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/happiness-stats/:country", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'post' not Allowed on a Particular Resource.</h1>")
        
    }
);

//PUT /api/v1/happiness-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/happiness-stats", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'put' not Allowed on Base Route.</h1>")
        
    }
);

//DELETE /api/v1/happiness-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/happiness-stats", (req, res) => {
        
        happiness_stats = [];
        res.sendStatus(200);
        res.send("<h1>All resources successfully deleted.</h1>");

        
    }
);



/* JP
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~  API REST DE JUAN PEDRO  ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
//CREACIÓN DEL OBJETO "stati"
var Stati = {
    initStat: function(country, year, rating, variation, countryConsumition) {
        this.country = country;
        this.year = year;
        this.rating = rating;
        this.variation = variation;
        this.countryConsumition = countryConsumition;
    }
}

var statis = [];

//GET /api/v1/beer-consumed-suicide_stats/loadInitialData
app.get("/api/v1/beer-consumed-suicide_stats/loadInitialData", (req, res) => {
    
        var stati1 = Object.create(Stati);
        var stati2 = Object.create(Stati);
        var stati3 = Object.create(Stati);
        var stati4 = Object.create(Stati);
        
        stati1.initStat("spain", 2016, 84.8, 2, 3909);
        stati2.initStat("germany", 2016, 104.2, -0.5, 8412);
        stati3.initStat("lithuania", 2016, 88.7, -8.4, 257);
        stati4.initStat("south korea", 2016, 42.8, 0.3, 2160);
        
        statis.push(stati1);
        statis.push(stati2);
        statis.push(stati3);
        statis.push(stati4);
        
        res.sendStatus(201);
        res.send("<h1>Initial Data Succesfuly Loaded</h1>");
    
    }
);


//GET /api/v1/beer-consumed-suicide_stats (DEVUELVE UNA LISTA CON TODOS LOS RECURSOS)
app.get("/api/v1/beer-consumed-suicide_stats", (req, res) => {
    
        res.send(statis);
    
    }
);

//POST /api/v1/beer-consumed-suicide_stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/beer-consumed-suicide_stats", (req, res) => {
        
        var newStati = req.body;
        statis.push(newStati);
        
        res.sendStatus(201);
        res.send("<h1>Resource created successfully.</h1>");
        
    }
);

//GET /api/v1/beer-consumed-suicide_stats/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/beer-consumed-suicide_stats/:country", (req, res) => {
        
        var country = req.params.country;
        
        var filteredStats = statis.filter( (s) => { return s.country == country; } );
        
        if(filteredStats.length >= 1){
            
            res.send(filteredStats);
            res.sendStatus(200);
            
        } else {
            
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
            
        }
        
    }
);

//DELETE /api/v1/beer-consumed-suicide_stats/--reurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/beer-consumed-suicide_stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        var updatedStats = statis.filter( (s) => { 
            
                if(s.country == country) found = true;
                return s.country != country 
            
            } 
        );
        
        if(found){
            statis = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully deleted.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//PUT /api/v1/beer-consumed-suicide_stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/beer-consumed-suicide_stats/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        var found = false;
        
        var updatedStats = statis.map( (s) => {
            
                if(s.country == country){
                    found = true;
                    return updatedStat;
                } else {
                    return s;
                }
            
            }
        );
        
        if(found){
            statis = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully updated.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//POST /api/v1/beer-consumed-suicide_stats/--reurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/beer-consumed-suicide_stats/:country", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'post' not Allowed on a Particular Resource.</h1>")
        
    }
);

//PUT /api/v1/beer-consumed-suicide_stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/beer-consumed-suicide_stats", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'put' not Allowed on Base Route.</h1>")
        
    }
);

//DELETE /api/v1/beer-consumed-suicide_stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/beer-consumed-suicide_stats", (req, res) => {
        
        statis = [];
        res.sendStatus(200);
        res.send("<h1>All resources successfully deleted.</h1>");

        
    }
);

     
//SERVIDOR A LA ESCUCHA DE PETICIONES
app.listen(port, () => 
    { console.log("Server Ready and Listen in port", port);  
}
);