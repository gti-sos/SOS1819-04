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


var happiness_stats;
const uri_happiness_stats = "mongodb+srv://sos:sos@sos-d5gvg.mongodb.net/sos?retryWrites=true";
const client_happiness_stats = new MongoClient(uri_happiness_stats, { useNewUrlParser: true });

client_happiness_stats.connect(err => {
    
    if(err) console.log("Error:", err);
    happiness_stats = client_happiness_stats.db("sos1819").collection("happiness-stats");
    console.log("Connected!");
  
});

client_suicide_stats.connect(err => {

    if(err) console.log("FATAL ERROR !!:", err);
    //Aquí se realiza la conexión con la BBDD, nuestro suicide_stats toma el valor de las tablas que tengamos en la BBDD
    suicide_stats = client_suicide_stats.db("SOS1819-04-suicide-rates").collection("suicide-rates");
    console.log("Successfully connected to DataBase !!");
    
    }
);

//Base de datos beer-stats
var beer_stats;
const uri_beer_stats = "mongodb+srv://test:test@sosjpcc-usex1.mongodb.net/test?retryWrites=true";
const client_beer_stats = new MongoClient(uri_beer_stats, { useNewUrlParser: true });


client_beer_stats.connect(err => {
  if(err) console.log("error: " , err);
  beer_stats = client_beer_stats.db("sos-jpcc").collection("beers");
  // perform actions on the collection object
  console.log("Connected the beer!");
});

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

//DOCUMENTACION /api/v1/suicide-rates/docs (REDIRIGE A LA DOCUMENTACIÓN DE LA API REST)
const suicide_rates_docs_URL = "https://documenter.getpostman.com/view/6964339/S17nVBQh";
app.get("/api/v1/suicide-rates/docs", (req, res) => {

        res.redirect(suicide_rates_docs_URL);
            
    }
);

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
                
                if (err) console.log("[suicide-stats] FATAL ERROR !!: ", err);
                
                if (suicide_stats_array.length == 0) {
                    
                    suicide_stats.insert(suicideStat1);
                    suicide_stats.insert(suicideStat2);
                    suicide_stats.insert(suicideStat3);
                    suicide_stats.insert(suicideStat4);
                    suicide_stats.insert(suicideStat5);
                    console.log("[suicide-stats] Request accepted, creating new resources in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("[suicide-stats] FATAL ERROR !!: Data Base is not empty.");
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
                    console.log("[suicide-stats] FATAL ERROR !! : ", err);
                } else {
                    console.log("[suicide-stats] Request accepted, sending resources from database.");
                }
                
                res.send(suicide_stats_array);
                
            }
        );
        
    }
);

//POST /api/v1/suicide-rates (CREA UN NUEVO RECURSO)
app.post("/api/v1/suicide-rates", (req, res) => {
        
        var newStat = req.body;
        
        suicide_stats.find({"country": newStat["country"],"year": newStat["year"]}).toArray( (err, suicide_stats_array) => {
            
                if(err) console.log("[suicide-stats] FATAL ERROR !!: ", err);
                
                if(Object.keys(newStat).length == 5){
                
                    if(suicide_stats_array == 0){
                        
                        suicide_stats.insert(newStat);
                        console.log("[suicide-stats] Request accepted, creating new resource in database.");
                        res.sendStatus(201);
                        
                    } else {
                        
                        console.log("[suicide-stats] FATAL ERROR !!: Resource already exists in the database.");
                        res.sendStatus(409);
                        
                    }
                    
                } else {
                    
                    console.log("[suicide-stats] FATAL ERROR !!: The input fields are not expected.");
                    res.sendStatus(400);
                    
                }
            
            }
        );

        
    }
);

//GET /api/v1/suicide-rates/--recurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/suicide-rates/:country", (req, res) => {
        
        var country = req.params.country;
        
        suicide_stats.find( {"country": country} ).toArray( (err, suicide_stats_array) => {
            
                if(err) console.log("[suicide-stats] FATAL ERROR !!: ", err);
                
                if(suicide_stats_array.length  > 0){
                    
                    console.log("[suicide-stats] Request accepted, sending resource from database.");
                    res.send(suicide_stats_array[0]);
                    
                } else {
                    
                    console.log("[suicide-stats] Request accepted, removing resource of database.");
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
            
                if(err) console.log("[suicide-stats] FATAL ERROR: ", err);
                
                if(suicide_stats_array.length > 0){
                    
                    suicide_stats.remove(suicide_stats_array[0]);
                    console.log("[suicide-stats] Request accepted, removing resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("[suicide-stats] FATAL ERROR !!: Resource not found in database.");
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
        
        if(country == updatedStat["country"]){
        
            suicide_stats.find( {"country": country} ).toArray( (err, suicide_stats_array) => {
                    
                    if(err) console.log("[suicide-stats] FATAL ERROR: ", err);
                    
                    if(suicide_stats_array.length > 0){
                        
                        suicide_stats.update( {"country": country}, updatedStat );
                        console.log("[suicide-stats] Request accepted, updating resource of database.");
                        res.sendStatus(200);
                        
                    } else {
                        
                        console.log("[suicide-stats] FATAL ERROR : Resource not found in database.");
                        res.sendStatus(404);
                        
                    }
                
                }
            );
            
        } else {
            
            console.log("[suicide-stats] FATAL ERROR : Resource addressed is not the same as resouced trying to modify.");
            res.sendStatus(400);
            
        }
        
    }
);

//POST /api/v1/suicide-rates/--recurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/suicide-rates/:country", (req, res) => {
        
        console.log("[suicide-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
        
    }
);

//PUT /api/v1/suicide-rates (ERROR METODO NO PERMITIDO)
app.put("/api/v1/suicide-rates", (req, res) => {
        
        console.log("[suicide-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
        
    }
);

//DELETE /api/v1/suicide-rates (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/suicide-rates", (req, res) => {
        
        suicide_stats.remove({});
        console.log("[suicide-stats] Request accepted, removing all resources of database.");
        res.sendStatus(200);

        
    }
);






/*
  ======================
 |  API REST DE ANA  |
  ======================
*/
app.get("/api/v1/happiness-stats/docs", (req, res) =>{
    
    res.redirect("https://documenter.getpostman.com/view/6900250/S17usmpJ");
    
});


//CREACION DEL OBJETO "Stat_h"
var Stat_h = {
    initStat: function(country, year, happinessScore, lowerLimitTrust, UpperLimitTrust) {
        this.country = country;
        this.year = year;
        this.happinessScore = happinessScore;
        this.lowerLimitTrust = lowerLimitTrust;
        this.UpperLimitTrust = UpperLimitTrust;
    }
};


//GET /api/v1/happiness-stats/loadInitialData
app.get("/api/v1/happiness-stats/loadInitialData", (req, res) => {
    
        var happinessStat1 = Object.create(Stat_h);
        var happinessStat2 = Object.create(Stat_h);
        var happinessStat3 = Object.create(Stat_h);
        var happinessStat4 = Object.create(Stat_h);
        var happinessStat5 = Object.create(Stat_h);
        
        happinessStat1.initStat("argelia", 2002, 5.7, 5.5, 5.8);
        happinessStat2.initStat("españa", 2008, 7.3, 7.2, 7.4);
        happinessStat3.initStat("arabia saudita", 2003, 7.3, 7.2, 7.4);
        happinessStat4.initStat("ucrania", 2008, 6.1, 6, 6.2);
        happinessStat5.initStat("indonesia", 2006, 6.9, 6.8, 7.0);
        
    happiness_stats.find({}).toArray((err,hapinessArray)=>{
        
        if(err) console.log("Error: ",err);
            
        if(hapinessArray.length == 0){
            happiness_stats.insert(happinessStat1);
            happiness_stats.insert(happinessStat2);
            happiness_stats.insert(happinessStat3);
            happiness_stats.insert(happinessStat4);
            happiness_stats.insert(happinessStat5);
            console.log("Created new resources in database");
            res.sendStatus(201);
        }
        else{
            console.log("[happiness-stats] FATAL ERROR !!: Data Base is not empty.");
            res.sendStatus(409);
        }
               
    });
    }
);


//GET /api/v1/happiness-stats 
app.get("/api/v1/happiness-stats", (req, res) => {
    
    happiness_stats.find({}).toArray((err,hapinessArray)=>{
        
        if(err) console.log("Error: ",err);
        
            console.log("sending resources from database");
        
            res.send(hapinessArray);
            
        }
        );
    }
    
);


//POST /api/v1/happiness-stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/happiness-stats", (req, res) => {
    
        var newStat = req.body;
        
        happiness_stats.find({"country":newStat["country"],"year":newStat["year"]}).toArray((err, hapinessArray) =>{
            
            if(err) console.log("Error: ",err);
            
            
            if(Object.keys(newStat).length == 5){
                if(hapinessArray == 0){
                    
                    happiness_stats.insert(newStat);
                    console.log("[happiness-stats] Created new resources in database");
                    res.sendStatus(201);
                    
                }
                else{
                    console.log("[happiness-stats] FATAL ERROR !!: Resource already exists in the database");
                    res.sendStatus(409);
                }
            }
            else{
                console.log("[happiness-stats] FATAL ERROR !!: Resource already exists in the database");
                res.sendStatus(400);
            }
        });
    }
);

//GET /api/v1/happiness-stats/--recurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        
         happiness_stats.find({"country":country}).toArray((err, hapinessArray) =>{
            
            if(err) console.log("Error: ",err);
            
            if(hapinessArray.length > 0){
                console.log("Request accepted, sending resource from database");
                res.send(hapinessArray[0]);
            }else{
                console.log("Request accepted, removing resource of database.");
                    res.sendStatus(404);
            }
            }
        );
        
    }
);

        
//DELETE /api/v1/happiness-stats/--recurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        happiness_stats.find({"country":country}).toArray((err, hapinessArray) =>{
            
            if(err) console.log("Error: ",err);
            
            if(hapinessArray.length > 0){
                happiness_stats.remove(hapinessArray[0]);
                console.log("Request accepted, sending resource from database");
                res.sendStatus(200);
            }
            else{
                console.log("[happiness-stats] FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
            }
            
            }
        );
 
    }
);

//PUT /api/v1/happiness-stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/happiness-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        
        if(country == updatedStat["country"]){
        
            happiness_stats.find( {"country": country} ).toArray( (err, happinessArray) => {
                    
                    if(err) console.log("[happiness_stats] FATAL ERROR: ", err);
                    
                    if(happinessArray.length > 0){
                        
                        suicide_stats.update( {"country": country}, updatedStat );
                        console.log("[happiness_stats] Request accepted, updating resource of database.");
                        res.sendStatus(200);
                        
                    } else {
                        
                        console.log("[happiness_stats] FATAL ERROR : Resource not found in database.");
                        res.sendStatus(404);
                        
                    }
                
                }
            );
            
        } else {
            
            console.log("[happiness_stats] FATAL ERROR : Resource addressed is not the same as resouced trying to modify.");
            res.sendStatus(400);
            
        }
        
    }
);


//POST /api/v1/happiness-stats/--recurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/happiness-stats/:country", (req, res) => {
        
        console.log("[happiness-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//PUT /api/v1/happiness-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/happiness-stats", (req, res) => {
        
        console.log("[happiness-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//DELETE /api/v1/happiness-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/happiness-stats", (req, res) => {
        
        happiness_stats.remove({});
        console.log("[happiness_stats] Request accepted, removing all resources of database.");
        res.sendStatus(200);
        
    }
);



/* JP
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~  API REST DE JUAN PEDRO  ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

//DOCUMENTACION /api/v1/beer-consumed-stats/docs (REDIRIGE A LA DOCUMENTACIÓN DE LA API REST)
const beer_consumed_stats_URL = "https://documenter.getpostman.com/view/7063342/S17usmpE";
app.get("/api/v1/beer-consumed-stats/docs", (req, res) => {

        res.redirect(beer_consumed_stats_URL);
            
    }
);

//CREACIÓN DEL OBJETO "BeerStat"
var BeerStat = {
    initBeerStat: function(country, year, rating, variation, countryConsumition) {
        this.country = country;
        this.year = year;
        this.rating = rating;
        this.variation = variation;
        this.countryConsumition = countryConsumition;
    }
}

//GET /api/v1/beer-consumed-stats/loadInitialData
app.get("/api/v1/beer-consumed-stats/loadInitialData", (req, res) => {
    
  var beerStat1 = Object.create(BeerStat);
        var beerStat2 = Object.create(BeerStat);
        var beerStat3 = Object.create(BeerStat);
        var beerStat4 = Object.create(BeerStat);
        var beerStat5 = Object.create(BeerStat);
        
        beerStat1.initBeerStat("espania", 2016, 84.8, 2, 3909);
        beerStat2.initBeerStat("alemania", 2016, 104.2, -0.5, 8412);
        beerStat3.initBeerStat("lituania", 2016, 88.7, -8.4, 257);
        beerStat4.initBeerStat("corea del sur", 2016, 42.8, 0.3, 2160);
        beerStat5.initBeerStat("reino unido", 2016, 67.7, 1.6, 4373);
        
        beer_stats.find({}).toArray( (err, beer_stats_array) => {
                
                if (err) console.log("[beeeer-stats] FATAL ERROR !!: ", err);
                
                if (beer_stats_array.length == 0) {
                    
                    beer_stats.insert(beerStat1);
                    beer_stats.insert(beerStat2);
                    beer_stats.insert(beerStat3);
                    beer_stats.insert(beerStat4);
                    beer_stats.insert(beerStat5);
                    console.log("[beeeer-stats] Request accepted, creating new resources in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR !!: Data Base is not empty.");
                    res.sendStatus(409);
                    
                }
                
            }
        );
    
    }
);


//GET /api/v1/beer-consumed-stats (DEVUELVE UNA LISTA CON TODOS LOS RECURSOS)
app.get("/api/v1/beer-consumed-stats", (req, res) => {
    
       beer_stats.find({}).toArray( (err, beer_stats_array) => {
                
                if (err) {
                    console.log("[beeeer-stats] FATAL ERROR !! : ", err);
                } else {
                    console.log("[beeeer-stats] Request accepted, sending resources from database.");
                }
                
                res.send(beer_stats_array);
                
            }
        );
    
    }
);

//POST /api/v1/beer-consumed-stats (CREA UN NUEVO RECURSO)
app.post("/api/v1/beer-consumed-stats", (req, res) => {
        
        var newStat = req.body;
        
       beer_stats.find({"country": newStat["country"],"year": newStat["year"]}).toArray( (err, beer_stats_array) => {
            
                if(err) console.log("FATAL ERROR !!: ", err);
                
        if(Object.keys(newStat).length == 5){
                
                if(beer_stats_array == 0){
                    
                    beer_stats.insert(newStat);
                    console.log("[beeeer-stats] Request accepted, creating new resource in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR !!: Resource already exists in the database.");
                    res.sendStatus(409);
                    
                }
        } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR !!: The input fields are not expected.");
                    res.sendStatus(400);
                    
                }
            
            }
        );
    }
);

//GET /api/v1/beer-consumed-stats/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
app.get("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
       var country = req.params.country;
        
         beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) => {
            
                if(err) console.log("FATAL ERROR !!: ", err);
                
                if(beer_stats_array.length  > 0){
                    
                    console.log("[beeeer-stats] Request accepted, sending resource from database.");
                    res.send(beer_stats_array[0]);
                    
                } else {
                    
                    console.log("[beeeer-stats] Request accepted, removing resource of database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        
    }
);

//DELETE /api/v1/beer-consumed-stats/--reurso-- (BORRA UN RECURSO CONCRETO)
app.delete("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
        var country = req.params.country;
        var found = false;
        
        beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) =>{
            
                if(err) console.log("[beeeer-stats] FATAL ERROR: ", err);
                
                if(beer_stats_array.length > 0){
                    
                    beer_stats.remove(beer_stats_array[0]);
                    console.log("[beeeer-stats] Request accepted, removing resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
                    
                }
   
            }
        );
        
    }
);

//PUT /api/v1/beer-consumed-stats/--reurso-- (ACTUALIZA UN RECURSO CONCRETO)
app.put("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
       var country = req.params.country;
        var updatedBeerStat = req.body;
        
        if(country == updatedBeerStat["country"]){
        beer_stats.find( {"country": country} ).toArray( (err, beer_stats_array) => {
                
                if(err) console.log("[beeeer-stats] FATAL ERROR: ", err);
                
                if(beer_stats_array.length > 0){
                    
                    beer_stats.update( {"country": country}, updatedBeerStat );
                    console.log("[beeeer-stats] Request accepted, updating resource of database.");
                    res.sendStatus(200);
                    
                } else {
                    
                    console.log("[beeeer-stats] FATAL ERROR : Resource not found in database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        } else {
            
            console.log("[beeeer-stats] FATAL ERROR : Resource addressed is not the same as resouced trying to modify.");
            res.sendStatus(400);
        }
        
    }
);

//POST /api/v1/beer-consumed-stats/--reurso-- (ERROR METODO NO PERMITIDO)
app.post("/api/v1/beer-consumed-stats/:country", (req, res) => {
        
        console.log("[beeeer-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//PUT /api/v1/beer-consumed-stats (ERROR METODO NO PERMITIDO)
app.put("/api/v1/beer-consumed-stats", (req, res) => {
    
        console.log("[beeeer-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//DELETE /api/v1/beer-consumed-stats (BORRA TODOS LOS RECURSOS)
app.delete("/api/v1/beer-consumed-stats", (req, res) => {
        
        beer_stats.remove({});
        console.log("[beeeer-stats] Request accepted, removing all resources of database.");
        res.sendStatus(200);
    }
);

     
//SERVIDOR A LA ESCUCHA DE PETICIONES
app.listen(port, () => 
    { console.log("Server Ready and Listen in port", port);  
}
);