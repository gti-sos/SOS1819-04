const express = require("../../../node_modules/express");
const router = express.Router();
var request = require('../../../node_modules/request');

const minipostman_happiness_stats = require("./minipostman_happiness_stats");
router.use("/minipostman_hs", minipostman_happiness_stats);

const frontend_happiness_stats = require("./frontend_happiness_stats");
router.use("/frontend_hs", frontend_happiness_stats);

/*
  ======================
 |  API REST DE ANA  |
  ======================
*/





//CONECTARSE A LA BASE DE DATOS
var happiness_stats;
const MongoClient = require("mongodb").MongoClient;
const uri_happiness_stats = "mongodb+srv://sos:sos@sos-d5gvg.mongodb.net/sos?retryWrites=true";
const client_happiness_stats = new MongoClient(uri_happiness_stats, { useNewUrlParser: true });


client_happiness_stats.connect(err => {
    
    if(err) console.log("Error:", err);
    happiness_stats = client_happiness_stats.db("sos1819").collection("happiness-stats");
    console.log("Connected to happiness stats DataBase!");
  
});

//DOCUMENTACION /api/v1/happiness-stats/docs
router.get("/docs", (req, res) =>{
    
    res.redirect("https://documenter.getpostman.com/view/6900250/S1EH31rh");
    
});

//BODY-PARSER PARA PODER USAR JSON
var bodyParser = require("../../../node_modules/body-parser");
router.use(bodyParser.json());

//CREACION DEL OBJETO "Stat_h"
var Stat_h = {
    initStat: function(country, year, happinessScore, lowerLimitTrust, upperLimitTrust) {
        this.country = country;
        this.year = year;
        this.happinessScore = happinessScore;
        this.lowerLimitTrust = lowerLimitTrust;
        this.upperLimitTrust = upperLimitTrust;
    }
};


//GET /api/v1/happiness-stats/loadInitialData
router.get("/loadInitialData", (req, res) => {
    
        var happinessStat1 = Object.create(Stat_h);
        var happinessStat2 = Object.create(Stat_h);
        var happinessStat3 = Object.create(Stat_h);
        var happinessStat4 = Object.create(Stat_h);
        var happinessStat5 = Object.create(Stat_h);
        var happinessStat6 = Object.create(Stat_h);
        var happinessStat7 = Object.create(Stat_h);
        var happinessStat8 = Object.create(Stat_h);
        var happinessStat9 = Object.create(Stat_h);
        var happinessStat10 = Object.create(Stat_h);
        var happinessStat11 = Object.create(Stat_h);
        var happinessStat12 = Object.create(Stat_h);
        
        happinessStat1.initStat("argelia", 2002, 5.7, 5.5, 5.8);
        happinessStat2.initStat("españa", 2008, 7.3, 7.2, 7.4);
        happinessStat3.initStat("arabia saudita", 2003, 7.3, 7.2, 7.4);
        happinessStat4.initStat("ucrania", 2008, 6.1, 6, 6.2);
        happinessStat5.initStat("francia", 2008, 7.1, 7, 7.2);
        happinessStat6.initStat("indonesia", 2006, 6.9, 6.8, 7.0);
        happinessStat7.initStat("macedonia", 2009, 6.9, 6.7, 7.0);
        happinessStat8.initStat("zimbabwe", 2001, 3.9, 3.8, 4.1);
        happinessStat9.initStat("mexico", 2005, 8.2, 8.1, 8.3);
        happinessStat10.initStat("noruega", 2008, 8.0, 8.0, 8.1);
        happinessStat11.initStat("jordania", 2007, 7.1, 7.0, 7.3);
        happinessStat12.initStat("italia", 2009, 7.1, 7.0, 7.3);
        
    happiness_stats.find({}).toArray((err,happinessArray)=>{
        
        if(err) console.log("Error: ",err);
            
        if(happinessArray.length == 0){
            happiness_stats.insert(happinessStat1);
            happiness_stats.insert(happinessStat2);
            happiness_stats.insert(happinessStat3);
            happiness_stats.insert(happinessStat4);
            happiness_stats.insert(happinessStat5);
            happiness_stats.insert(happinessStat6);
            happiness_stats.insert(happinessStat7);
            happiness_stats.insert(happinessStat8);
            happiness_stats.insert(happinessStat9);
            happiness_stats.insert(happinessStat10);
            happiness_stats.insert(happinessStat11);
            happiness_stats.insert(happinessStat12);
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
router.get("/", (req, res) => {
    
        //Paginacion
        var limit = parseInt(req.query.limit, 10);
        var offset = parseInt(req.query.offset, 10);
        
        //Busquedas
        var search = {};
        if(req.query.country) search["country"] = req.query.country;
        if(req.query.year) search["year"] = parseInt(req.query.year, 10);
        if(req.query.happinessScore) search["happinessScore"] = parseInt(req.query.happinessScore,10);
        if(req.query.lowerLimitTrust) search["lowerLimitTrust"] = parseInt(req.query.lowerLimitTrust,10);
        if(req.query.upperLimitTrust) search["upperLimitTrust"] = parseInt(req.query.upperLimitTrust, 10);
        
        //Implementacion de vistas personalizadas
         var fields = {"_id": 0};
         
        
        
        if(req.query.fields){
            
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        
        }
        
        
        
        happiness_stats.find(search, {"fields": fields}).skip(offset).limit(limit).toArray( (err, happinessArray) => {
                
                if (err) {
                    console.log("[happiness_stats] Error : ", err);
                } else {
                    console.log("[happiness_stats] Request accepted, sending resources from database.");
                }
                
                res.send(happinessArray);
                
            }
            
        );
    }
    
);


//POST /api/v1/happiness-stats (CREA UN NUEVO RECURSO)
router.post("/", (req, res) => {
    
        var newStat = req.body;
        
        happiness_stats.find({"country":newStat["country"],"year":newStat["year"]}).toArray((err, happinessArray) =>{
            if(err) console.log("Error: ",err);
            
            
            if(Object.keys(newStat).length == 5){
                if(happinessArray == 0){
                    
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
router.get("/:country/:year", (req, res) => {
        
        //Paginación
        var limit = parseInt(req.query.limit, 10);
        var offset = parseInt(req.query.offset, 10);
        
        //Vistas Personalizadas
        var fields = {"_id": 0};
        
        if(req.query.fields){
            
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        
        }
        
        //Implementación de la Solicitud de GET
        var country = req.params.country;
        var year = parseInt(req.params.year, 10);
        
         happiness_stats.find({"country":country, "year": year}, {"fields": fields}).skip(offset).limit(limit).toArray( (err, happinessArray) =>{
            
            if(err) console.log("Error: ",err);
            
            if(happinessArray.length > 0){
                console.log("[happiness-stats] Request accepted, sending resource from database");
                res.send(happinessArray[0]);
            }else{
                console.log("[happiness_stats] Error, Resource not found in database");
                    res.sendStatus(404);
            }
            }
        );
        
    }
);

        
//DELETE /api/v1/happiness-stats/--recurso-- (BORRA UN RECURSO CONCRETO)
router.delete("/:country/:year", (req, res) => {
        
        var country = req.params.country;
        var year = parseInt(req.params.year, 10);
        
        
        happiness_stats.find({"country":country, "year":year}).toArray((err, happinessArray) =>{
            
            if(err) console.log("Error: ",err);
            
            if(happinessArray.length > 0){
                happiness_stats.remove(happinessArray[0]);
                console.log("Request accepted, removing resource from database");
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
router.put("/:country/:year", (req, res) => {
        
        var country = req.params.country;
        var updatedStat = req.body;
        var year = parseInt(req.params.year, 10);
        
        if(country == updatedStat["country"] && year == updatedStat["year"]){
        
            happiness_stats.find( {"country": country, "year":year} ).toArray( (err, happinessArray) => {
                    
                    if(err) console.log("[happiness_stats] FATAL ERROR: ", err);
                    
                    if(happinessArray.length > 0){
                        
                        happiness_stats.update( {"country": country, "year":year}, updatedStat );
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
router.post("/api/v1/happiness-stats/:country", (req, res) => {
        
        console.log("[happiness-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//PUT /api/v1/happiness-stats (ERROR METODO NO PERMITIDO)
router.put("/", (req, res) => {
        
        console.log("[happiness-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//DELETE /api/v1/happiness-stats (BORRA TODOS LOS RECURSOS)
router.delete("/", (req, res) => {
        
        happiness_stats.remove({});
        console.log("[happiness_stats] Request accepted, removing all resources of database.");
        res.sendStatus(200);
        
    }
);


//Api-tranfers (Alfonso)
var api_transfer_URL='https://sos1819-06.herokuapp.com/api/v1/transfers-stats';
var proxy1 = '/integrations-transfer';

router.use(proxy1, function(req, res) {
  console.log('piped: '+api_transfer_URL);
  req.pipe(request(api_transfer_URL)).pipe(res);
});


//API ISSUE-DIOXID (FRANCISCO PARDILLO)
var api_dioxid_URL='https://sos1819-10.herokuapp.com/api/v1/issue-dioxid';
var proxy2 = '/integrations-dioxid';

router.use(proxy2, function(req, res) {
  console.log('piped: '+api_dioxid_URL);
  req.pipe(request(api_dioxid_URL)).pipe(res);
});

//API healh (JOAQUIN MORILLO)
var api_health_URL='https://sos1819-11.herokuapp.com/api/v1/public-health-expenses';
var proxy3 = '/integrations-health';

router.use(proxy3, function(req, res) {
  console.log('piped: '+api_health_URL);
  req.pipe(request(api_health_URL)).pipe(res);
});

module.exports = router;