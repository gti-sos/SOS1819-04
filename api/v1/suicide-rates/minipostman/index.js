//MÓDULOS PRINCIPALES PARA ROUTER Y LA RUTA BASE
const express = require("../../../../node_modules/express");
const router = express.Router();
var path = require("path");
var BASE_PATH = "/api/v1/suicide-rates/minipostman";


var suicide_stats = []

//MÓDULO PARA USAR JSON
var bodyParser = require("../../../../node_modules/body-parser");
router.use(bodyParser.json());


//MÓDULO PARA CHECKEAR EL JSON
var checkSuicideStatJSON = require("../scripts/checkJSON");


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


//DIRECCIONAMIENTO A index.html COMO PÁGINA PRINCIPAL
router.use("/", express.static(path.join(__dirname,"public")));


//GET ladInitialData. Inicialización del Array de Suicide-Stats
    //GET .../api/v1/suicide-rates/loadInitialData
    router.get(BASE_PATH + "/loadInitialData", (req,res) => {
        
            if(suicide_stats.length == 0){
                
                
                var suicideStat1 = Object.create(SuicideStat);
                var suicideStat2 = Object.create(SuicideStat);
                var suicideStat3 = Object.create(SuicideStat);
                var suicideStat4 = Object.create(SuicideStat);
                var suicideStat5 = Object.create(SuicideStat);
                
                suicideStat1.initStat("hong-kong", 2011, 10.6, 13.8, 39);
                suicideStat2.initStat("lituania", 2012, 54.7, 10.8, 3);
                suicideStat3.initStat("corea del sur", 2012, 38.2, 18, 6);
                suicideStat4.initStat("groenlandia", 2011, 116.9, 45.0, 1);
                suicideStat5.initStat("hugria", 2009, 44.4, 10.5, 8);
                
                suicide_stats.push(suicideStat1);
                suicide_stats.push(suicideStat2);
                suicide_stats.push(suicideStat3);
                suicide_stats.push(suicideStat4);
                suicide_stats.push(suicideStat5);
                
                console.log("[Suicide-Rates] Request accepted, creating new resources in database.");
                res.sendStatus(201);
                        
            } else {
                
                console.log("[Suicide-Rates] FATAL ERROR !!: Data Base is not empty.");
                res.sendStatus(409);
                
            }
        }
    );


//GET A LA RUTA BASE
    //GET .../api/v1/suicide-rates
    router.get(BASE_PATH, (req,res)=>{
            
            /*
            //Implementación de Paginación
            var limit = parseInt(req.query.limit, 10);
            var offset = parseInt(req.query.offset, 10);
            
            //Implementación de Búsquedas
            var search = {}
            if(req.query.country) search["country"] = req.query.country;
            if(req.query.year) search["year"] = parseInt(req.query.year);
            if(req.query.noSuicidesMan) search["noSuicidesMan"] = parseInt(req.query.noSuicidesMan);
            if(req.query.noSuicidesWoman) search["noSuicidesWoman"] = parseInt(req.query.noSuicidesWoman);
            if(req.query.rank) search["rank"] = parseInt(req.query.rank);
            
            //Implementación de Vistas Personalizadas
            var fields = {"_id": 0};
            
            if(req.query.fields){
                
                req.query.fields.split(",").forEach( (f) => {
                    fields[f] = 1;
                    }
                );
            
            }
            */
            //Implementación de la solicitud GET
            console.log("[Suicide-Rates] (" + Date() + ") Request accepted, sending resources from database.");
            res.send(suicide_stats);
        }
    );


//GET A UN RECURSO CONCRETO
    //GET /api/v1/suicide-rates/:country/:year
    router.get(BASE_PATH+"/:country/:year", (req, res) => {
        
            var country = req.params.country;
            var year = req.params.year;
            
            var filteredSuicideStats = suicide_stats.filter( (s) =>{
                    console.log(s.country==country && s.year==year);
                    return (s.country == country && s.year==year);
                }
            );
            
            if(filteredSuicideStats.length > 0){
                console.log("[Suicide-Rates] (" + Date() + ") Request accepted, sending resource from database.");
                res.send(filteredSuicideStats[0]);
            } else {
                console.log("[Suicide-Rates] (" + Date() + ") FATAL ERROR !!: Resource not found in database.");
                res.sendStatus(404);
            }
        
        }
    );


//POST A LA RUTA BASE
    //../api/v1/suicide-rates
    router.post(BASE_PATH, (req,res)=>{
            
            var newStat = req.body;
            
            if(checkSuicideStatJSON(newStat)){
                
                var filteredSuicideStats = suicide_stats.filter( (s) =>{
                        return (s.country==newStat.country && s.year == newStat.year);
                    }
                );
                
                if(filteredSuicideStats.length == 0){
                    
                    suicide_stats.push(newStat);
                    console.log("[Suicide-Rates] (" + Date() + ") Request accepted, creating new resource in database.");
                    res.sendStatus(201);
                    
                } else {
                    
                    console.log("[Suicide-Rates] (" + Date() + ") FATAL ERROR !!: Resource already exists in the database.");
                    res.sendStatus(409);
                    
                }
                
            } else {
                res.sendStatus(400);
            }
        
        }
    );


//POST A UN RECURSO CONCRETO
    //POST /api/v1/suicide-rates/:country/:year
    router.post(BASE_PATH+"/:country/:year", (req, res) => {
            console.log("[Suicide-Rates] (" + Date() + ") FATAL ERROR !!: Method not Allowed.");
            res.sendStatus(405);
        }
    );


//PUT A LA RUTA BASE
    //POST /api/v1/suicide-rates
    
    router.put(BASE_PATH, (req, res) => {
            console.log("[Suicide-Rates] (" + Date() + ") FATAL ERROR !!: Method not Allowed.");
            res.sendStatus(405);
        }
    );
        

//PUT A UN RECURSO CONCRETO
    //PUT /api/v1/suicide-rates/:country/:year
    router.put(BASE_PATH+"/:country/:year", (req,res)=>{
            
            var country = req.params.country;
            var year = req.params.year;
            var updatedStat = req.body;
            
            if(checkSuicideStatJSON(updatedStat)){
                if(country==updatedStat.country && year==updatedStat.year){
                    
                    var filteredSuicideStats = suicide_stats.filter( (s) =>{
                            return (s.country==updatedStat.country && s.year == updatedStat.year);
                        }
                    );
                    
                    if(filteredSuicideStats.length > 0){
                        
                        suicide_stats.map( (s) => {
                            
                                if(s.country==country && s.year==year){
                                    s.noSuicidesMan = updatedStat.noSuicidesMan;
                                    s.noSuicidesWoman = updatedStat.noSuicidesWoman
                                    s.rank = updatedStat.rank;
                                }
                                
                                    return s;
                            
                            }
                        );
                        
                        console.log("[Suicide-Rates] (" + Date() + ") Request accepted, updating resource from database.");
                        res.sendStatus(200);
                        
                    } else {
                        console.log("[Suicide-Rates] (" + Date() + ") FATAL ERROR !!: Resource not found from database.");
                        res.sendStatus(404);
                    }
                    
                } else {
                    console.log("[Suicide-Rates] (" + Date() + ") FATAL ERROR !!: Hack Attempt. Cannot Modify ID params.");
                    res.sendStatus(409);
                }
                
            } else {
                res.sendStatus(400);
            }
        
        }
    );


//DELETE A LA RUTA BASE
    //DELETE /api/v1/suicide-rates
    router.delete(BASE_PATH, (req,res)=>{
            suicide_stats = [];
            console.log("[Suicide-Rates] Request accepted, removing all resources of database.");
            res.sendStatus(200);
        }
    );


//DELETE A UN RECURSO CONCRETO
    //DELETE .../api/v1/suicide-rates/:country/:year
    router.delete(BASE_PATH+"/:country/:year", (req, res) => {
            
            var country = req.params.country;
            var year = req.params.year;
            var found = false;
            
            var filteredSuicideStats = suicide_stats.filter( (s) => {
                
                    if(s.country==country && s.year==year){
                        found = true;
                    } else {
                        return s;    
                    }
                    
                }
            );

            if(found){
                console.log("[Suicide-Rates] Request accepted, removing resource from database.");
                suicide_stats = filteredSuicideStats;
                res.sendStatus(200);
            } else {
                console.log("[Suicide-Rates FATAL ERROR !!: Resource not found in database.");
                res.sendStatus(404);
            }
            
        }
    );

module.exports = router;