//CREACIÓN DEL SERVIDOR WEB
var express = require("express");
var app = express();
const port = process.env.PORT || 8080;

//USO DEL PAQUETE BODY-PARSER PARA MOSTRAR CORRECTAMENTE EL JSON
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//CONECTARSE A LA BASE DE DATOS
var suicide_stats;

const MongoClient = require("mongodb").MongoClient;
const uri_suicide_stats = "mongodb+srv://test:test@sos1819-04-afg-ysoip.mongodb.net/test?retryWrites=true";
const client_suicide_stats = new MongoClient(uri_suicide_stats, { useNewUrlParser: true });

client_suicide_stats.connect(err => {

    if(err) console.log("FATAL ERROR !!:", err);
    //Aquí se realiza la conexión con la BBDD, nuestro suicide_stats toma el valor de las tablas que tengamos en la BBDD
    suicide_stats = client_suicide_stats.db("SOS1819-04-suicide-rates").collection("suicide-rates");
    console.log("Successfully connected to DataBase !!");
    
    }
);

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



//GET /api/v1/suicide-rates/loadInitialData
app.get("/api/v1/suicide-rates/loadInitialData", (req, res) => {
    
        var suicideStat1 = Object.create(SuicideStat);
        var suicideStat2 = Object.create(SuicideStat);
        var suicideStat3 = Object.create(SuicideStat);
        var suicideStat4 = Object.create(SuicideStat);
        var suicideStat5 = Object.create(SuicideStat);
        
        suicideStat1.initStat("hong kong", 2011, 10.6, 13.8, 39);
        suicideStat2.initStat("lituania", 2012, 54.7, 10.8, 3);
        suicideStat3.initStat("corea del sur", 2012, 38.2, 18, 6);
        suicideStat4.initStat("groenlandia", 2011, 116.9, 45.0, 1);
        suicideStat5.initStat("hugria", 2009, 44.4, 10.5, 8);
        
        suicide_stats.find({}).toArray( (err, suicide_stats_array) => {
                
                if (err) console.log("FATAL ERROR !!: ", err);
                
                if (suicide_stats_array.length == 0) {
                    
                    suicide_stats.insert(suicideStat1);
                    suicide_stats.insert(suicideStat2);
                    suicide_stats.insert(suicideStat3);
                    suicide_stats.insert(suicideStat4);
                    suicide_stats.insert(suicideStat5);
                    console.log("Request accepted, creating new resources in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("FATAL ERROR !!: Data Base is not empty.");
                    res.sendStatus(409);
                    
                }
                
            }
        );
        
    }
);


//GET /api/v1/suicide-rates (DEVUELVE UNA LISTA CON TODOS LOS RECURSOS)
app.get("/api/v1/suicide-rates", (req, res) => {
    
        suicide_stats.find({}).toArray( (err, suicide_stats_array) => {
                
                if (err) {
                    console.log("FATAL ERROR !! : ", err);
                } else {
                    console.log("Request accepted, sending resources from database.");
                }
                
                res.send(suicide_stats_array);
                
            }
        );
        
    }
);

//POST /api/v1/suicide-rates (CREA UN NUEVO RECURSO)
app.post("/api/v1/suicide-rates", (req, res) => {
        
        var newStat = req.body;
        
        suicide_stats.find(newStat).toArray( (err, suicide_stats_array) => {
            
                if(err) console.log("FATAL ERROR !!: ", err);
                
                if(suicide_stats_array == 0){
                    
                    suicide_stats.insert(newStat);
                    console.log("Request accepted, creating new resource in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("FATAL ERROR !!: Resource already exists in the database.");
                    res.sendStatus(409);
                    
                }
            
            }
        );

        
    }
);

//GET /api/v1/suicide-rates/--recurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        
        suicide_stats.find( {"country": country} ).toArray( (err, suicide_stats_array) => {
            
                if(err) console.log("FATAL ERROR !!: ", err);
                
                if(suicide_stats_array.length  > 0){
                    
                    console.log("Request accepted, sending resource from database.");
                    res.send(suicide_stats_array);
                    
                } else {
                    
                    console.log("Request accepted, removing resource of database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        
    }
);

//DELETE /api/v1/suicide-rates/--recurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        suicide_stats.find( {"country": country} ).toArray( (err, suicide_stats_array) =>{
            
                if(err) console.log("FATAL ERROR: ", err);
                
                if(suicide_stats_array.length > 0){
                    
                    suicide_stats.remove(suicide_stats_array[0]);
                    console.log("Request accepted, removing resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
 
    }
);

//PUT /api/v1/suicide-rates/--recurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        
        suicide_stats.find( {"country": country} ).toArray( (err, suicide_stats_array) => {
                
                if(err) console.log("FATAL ERROR: ", err);
                
                if(suicide_stats_array.length > 0){
                    
                    suicide_stats.update( {"country": country}, updatedStat );
                    console.log("Request accepted, updating resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("FATAL ERROR : Resource not found in database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        
    }
);

//POST /api/v1/suicide-rates/--recurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/suicide-rates/:country", (req, res) => {
        
        console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
        
    }
);

//PUT /api/v1/suicide-rates (ERROR METODO NO PERMITIDO)
app.put("/api/v1/suicide-rates", (req, res) => {
        
        console.log("FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
        
    }
);

//DELETE /api/v1/suicide-rates (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/suicide-rates", (req, res) => {
        
        suicide_stats.remove({});
        console.log("Request accepted, removing all resources of database.");
        res.sendStatus(200);

        
    }
);

//DOCUMENTACION /api/v1/suicide-rates/docs (REDIRIGE A LA DOCUMENTACIÓN DE LA API REST)
app.get("/api/v1/suicide-rates/docs", (req, res) => {
        
        res.redirect(301, 'https://documenter.getpostman.com/view/6964339/S17nVBQh');
            
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

var suicide_stats1 = [];

//GET /api/v1/happiness-suicide_stats/loadInitialData
app.get("/api/v1/happiness-suicide_stats/loadInitialData", (req, res) => {
    
        var stat5 = Object.create(Stat_h);
        var stat6 = Object.create(Stat_h);
        var stat7 = Object.create(Stat_h);
        var stat8 = Object.create(Stat_h);
        
        stat5.initStat("argelia", 2002, 5.7, 5.5, 5.8);
        stat6.initStat("españa", 2008, 7.3, 7.2, 7.4);
        stat7.initStat("arabia saudita", 2003, 7.3, 7.2, 7.4);
        stat8.initStat("Ucrania", 2008, 6.1, 6, 6.2);
        
        suicide_stats1.push(stat5);
        suicide_stats1.push(stat6);
        suicide_stats1.push(stat7);
        suicide_stats1.push(stat8);
        
        res.sendStatus(201);
        res.send("<h1>Initial Data Succesfuly Loaded</h1>");
    
    }
);


//GET /api/v1/happiness.suicide_stats 
app.get("/api/v1/happiness-suicide_stats", (req, res) => {
    
        res.send(suicide_stats1);
    
    }
    
);

//POST /api/v1/happiness-suicide_stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/happiness-suicide_stats", (req, res) => {
        
        var newStat = req.body;
        suicide_stats.push(newStat);
        
        res.sendStatus(201);
        res.send("<h1>Resource created successfully.</h1>");
        
    }
);

//GET /api/v1/happiness-suicide_stats/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/happiness-suicide_stats/:country", (req, res) => {
        
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

        
//DELETE /api/v1/happiness-suicide_stats/--recurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/happiness-suicide_stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        var updatedStats = suicide_stats.filter( (s) => { 
            
                if(s.country == country) found = true;
                return s.country != country 
            
            } 
        );
        
        if(found){
            suicide_stats1 = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully deleted.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//PUT /api/v1/happiness-suicide_stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/happiness-suicide_stats/:country", (req, res) => {
        
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
            suicide_stats1 = updatedStats;
            res.sendStatus(200);
            res.send("<h1>Resource successfully updated.</h1>");
        } else {
            res.sendStatus(404);
            res.send("<h1>ERROR: Resource not Found.</h1>");
        }
        
    }
);

//POST /api/v1/happiness-suicide_stats/--recurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/happiness-suicide_stats/:country", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'post' not Allowed on a Particular Resource.</h1>")
        
    }
);

//PUT /api/v1/happiness-suicide_stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/happiness-suicide_stats", (req, res) => {
        
        res.sendStatus(405);
        res.send("<h1>ERROR. Method 'put' not Allowed on Base Route.</h1>")
        
    }
);

//DELETE /api/v1/happiness-suicide_stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/happiness-suicide_stats", (req, res) => {
        
        suicide_stats1 = [];
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