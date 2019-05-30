const express = require("../../../node_modules/express");
const router = express.Router();
var request = require('../../../node_modules/request');


//MÓDULO PARA REDIRECCIONAR AL MINIPOSTMAN
const minipostman_suicide_rates = require("./minipostman_suicide_rates");
router.use("/minipostman_ss", minipostman_suicide_rates);

//MÓDULO PARA REDIRECCIONAR AL FRONTEND
//const frontend_suicide_rates = require("./frontend_suicide_rates");
//router.use("/frontend_ss", frontend_suicide_rates);


/*           ======================
            |  API REST DE ADRIÁN  |
             ======================                 */


/*//MÓDULO QUE CONECTA CON LA BASE DE DATOS
var initMongo = require("./scripts/initMongo");
var suicide_stats = initMongo();
*/

//CONECTARSE A LA BASE DE DATOS
var suicide_stats;
const MongoClient = require("../../../node_modules/mongodb").MongoClient;
const uri_suicide_stats = "mongodb+srv://test:test@sos1819-04-afg-ysoip.mongodb.net/test?retryWrites=true";
const client_suicide_stats = new MongoClient(uri_suicide_stats, { useNewUrlParser: true });

client_suicide_stats.connect(err => {

    if(err) console.log("FATAL ERROR !!:", err);
    //Aquí se realiza la conexión con la BBDD, nuestro suicide_stats toma el valor de las tablas que tengamos en la BBDD
    suicide_stats = client_suicide_stats.db("SOS1819-04-suicide-rates").collection("suicide-rates");
    console.log("Successfully connected to Suicide-Rates DataBase !!");
    
    }
);

//MÓDULO QUE COMPRUEBA LOS DATOS DE LOS JSON
var checkSuicideStatsJSON = require("./scripts/checkJSON");


//DOCUMENTACION /api/v1/suicide-rates/docs (REDIRIGE A LA DOCUMENTACIÓN DE LA API REST)
const suicide_rates_docs_URL = "https://documenter.getpostman.com/view/6964339/S17wPmNr";
router.get("/docs", (req, res) => {

        res.redirect(suicide_rates_docs_URL);
            
    }
);


//MÓDULO PARA USAR JSON
var bodyParser = require("../../../node_modules/body-parser");
router.use(bodyParser.json());

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
router.get("/loadInitialData", (req, res) => {
    
        var suicideStat1 = Object.create(SuicideStat);
        var suicideStat2 = Object.create(SuicideStat);
        var suicideStat3 = Object.create(SuicideStat);
        var suicideStat4 = Object.create(SuicideStat);
        var suicideStat5 = Object.create(SuicideStat);
        
        var suicideStat6 = Object.create(SuicideStat);
        var suicideStat7 = Object.create(SuicideStat);
        var suicideStat8 = Object.create(SuicideStat);
        var suicideStat9 = Object.create(SuicideStat);
        var suicideStat10 = Object.create(SuicideStat);
        
        var suicideStat11 = Object.create(SuicideStat);
        var suicideStat12 = Object.create(SuicideStat);
        var suicideStat13 = Object.create(SuicideStat);
        var suicideStat14 = Object.create(SuicideStat);
        var suicideStat15 = Object.create(SuicideStat);
        
        suicideStat1.initStat("hong-kong", 2011, 10.6, 13.8, 39);
        suicideStat2.initStat("lituania", 2012, 54.7, 10.8, 3);
        suicideStat3.initStat("corea-del-sur", 2012, 38.2, 18, 6);
        suicideStat4.initStat("groenlandia", 2011, 116.9, 45.0, 1);
        suicideStat5.initStat("hungria", 2009, 44.4, 10.5, 8);
        
        suicideStat6.initStat("guatemala", 2008, 5.6, 1.7 , 84);
        suicideStat7.initStat("paraguay", 2008, 5.1, 2.0, 85);
        suicideStat8.initStat("republica-dominicana", 2008, 3.9, 0.7, 87);
        suicideStat9.initStat("cuba", 2008, 19.0, 5.5, 38);
        suicideStat10.initStat("mexico", 2008, 6.8, 1.3, 79);
        
        suicideStat11.initStat("suiza", 2009, 23.0, 7.0, 25);
        suicideStat12.initStat("republica-checa", 2009, 25.8, 4.4, 27);
        suicideStat13.initStat("suecia", 2009, 20.0, 7.7, 29);
        suicideStat14.initStat("rumania", 2009, 23.1, 3.8, 34);
        suicideStat15.initStat("bulgaria", 2009, 19.7, 5.3, 46);
        
        suicide_stats.find({}).toArray( (err, suicide_stats_array) => {
                
                if (err) console.log("[suicide-stats] FATAL ERROR !!: ", err);
                
                if (suicide_stats_array.length == 0) {
                    
                    suicide_stats.insert(suicideStat1);
                    suicide_stats.insert(suicideStat2);
                    suicide_stats.insert(suicideStat3);
                    suicide_stats.insert(suicideStat4);
                    suicide_stats.insert(suicideStat5);
                    suicide_stats.insert(suicideStat6);
                    suicide_stats.insert(suicideStat7);
                    suicide_stats.insert(suicideStat8);
                    suicide_stats.insert(suicideStat9);
                    suicide_stats.insert(suicideStat10);
                    suicide_stats.insert(suicideStat11);
                    suicide_stats.insert(suicideStat12);
                    suicide_stats.insert(suicideStat13);
                    suicide_stats.insert(suicideStat14);
                    suicide_stats.insert(suicideStat15);
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
router.get("/", (req, res) => {
        
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
        
        //Implementación de la solicitud GET
        suicide_stats.find(search, {"projection": fields}).skip(offset).limit(limit).toArray( (err, suicide_stats_array) => {
                
                if (err) {
                    console.log("[suicide-stats] FATAL ERROR !! : ", err);
                } else {
                    console.log("[suicide-stats] Request accepted, sending resources from database.");
                }
                
                if(suicide_stats_array.length == 1){
                    res.send(suicide_stats_array[0]);
                } else {
                    res.send(suicide_stats_array);    
                }
                
            }
        );
        
    }
);

//POST /api/v1/suicide-rates (CREA UN NUEVO RECURSO)
router.post("/", (req, res) => {
        
        var newStat = req.body;
        
        if(checkSuicideStatsJSON(newStat)){
            
            suicide_stats.find({"country": newStat["country"], "year": newStat["year"]}).toArray( (err, suicide_stats_array) => {
                
                    if(err) console.log("[suicide-stats] FATAL ERROR !!: ", err);
                
                    if(suicide_stats_array.length ==0 ){
                        
                        suicide_stats.insert(newStat);
                        console.log("[suicide-stats] Request accepted, creating new resource in database.");
                        res.sendStatus(201);
                        
                    } else {
                        console.log("[suicide-stats] FATAL ERROR !!: Resource already exists in the database.");
                        res.sendStatus(409);
                        
                    }
                    
                }
            );
            
        } else {
            
            res.sendStatus(400);
            
        }
        
    }
);

//GET /api/v1/suicide-rates/--recurso-- (DEVUELVE UN RECURSO CONCRETO)
router.get("/:country/:year", (req, res) => {
        
        //Implementación de Paginación
        var limit = parseInt(req.query.limit, 10);
        var offset = parseInt(req.query.offset, 10);
        
        //Implementación de Vistas Personalizadas
        var fields = {"_id": 0};
        
        if(req.query.fields){
            
            req.query.fields.split(",").forEach( (f) => {
                fields[f] = 1;
                }
            );
        
        }
        
        //Implementación de la Solicitud de GET
        var country = req.params.country;
        var year = parseInt(req.params.year);
        
        suicide_stats.find( {"country": country, "year": year}, {"projection": fields}).skip(offset).limit(limit).toArray( (err, suicide_stats_array) => {
            
                if(err) console.log("[suicide-stats] FATAL ERROR !!: ", err);
                
                if(suicide_stats_array.length  > 0){
                    
                    console.log("[suicide-stats] Request accepted, sending resource from database.");
                    res.send(suicide_stats_array[0]);
                    
                } else {
                    
                    console.log("[suicide-stats] FATAL ERROR !!: Resource not found in database.");
                    res.sendStatus(404);
                    
                }
            
            }
        );
        
    }
);

//DELETE /api/v1/suicide-rates/--recurso-- (BORRA UN RECURSO CONCRETO)
router.delete("/:country/:year", (req, res) => {
        
        var country = req.params.country;
        var year = parseInt(req.params.year);
        var found = false;
        
        suicide_stats.find( {"country": country, "year": year} ).toArray( (err, suicide_stats_array) =>{
            
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
router.put("/:country/:year", (req, res) => {
        
        var country = req.params.country;
        var year = parseInt(req.params.year);
        var updatedStat = req.body;
        
        if(checkSuicideStatsJSON(updatedStat)){
        
            if(country == updatedStat["country"] && year == updatedStat["year"]){
            
                suicide_stats.find( {"country": country, "year": year} ).toArray( (err, suicide_stats_array) => {
                        
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
                res.sendStatus(409);
                
            }
        } else {
            
            res.sendStatus(400);
            
        }
        
    }
);

//POST /api/v1/suicide-rates/--recurso-- (ERROR METODO NO PERMITIDO)
router.post("/:country/:year", (req, res) => {
        
        console.log("[suicide-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
        
    }
);

//PUT /api/v1/suicide-rates (ERROR METODO NO PERMITIDO)
router.put("/", (req, res) => {
        
        console.log("[suicide-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
        
    }
);

//DELETE /api/v1/suicide-rates (BORRA TODOS LOS RECURSOS)
router.delete("/", (req, res) => {
        
        suicide_stats.remove({});
        console.log("[suicide-stats] Request accepted, removing all resources of database.");
        res.sendStatus(200);

        
    }
);


//INTEGRACIONES
//Api-Scorers
var api_scorers_URL='https://sos1819-02.herokuapp.com/api/v1/scorers-stats';
var proxyAE = '/proxy-api-scorers';

router.use(proxyAE, function(req, res) {
  console.log('piped: '+api_scorers_URL);
  req.pipe(request(api_scorers_URL)).pipe(res);
});

//Biofuel-Productions
var biofuel_productions_URL='https://sos1819-10.herokuapp.com/api/v2/biofuels-production';
var proxyBP = '/proxy-biofuel-productions';

router.use(proxyBP, function(req, res) {
  console.log('piped: '+biofuel_productions_URL);
  req.pipe(request(biofuel_productions_URL)).pipe(res);
});

//Happiness-Stats
var happiness_stats_URL='https://sos1819-04.herokuapp.com/api/v1/happiness-stats';
var proxyHS = '/proxy-happiness-stats';

router.use(proxyHS, function(req, res) {
  console.log('piped: '+happiness_stats_URL);
  req.pipe(request(happiness_stats_URL)).pipe(res);
});

//Uefa-Country-Rankings
var uefa_country_rankings_URL='https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings';
var proxyUCR = '/proxy-uefa-country-rankings';

router.use(proxyUCR, function(req, res) {
  console.log('piped: '+uefa_country_rankings_URL);
  req.pipe(request(uefa_country_rankings_URL)).pipe(res);
});

//PopulationStats
var populationstats_URL='https://sos1819-09.herokuapp.com/api/v1/populationstats';
var proxyP = '/proxy-populationstats';

router.use(proxyP, function(req, res) {
  console.log('piped: '+populationstats_URL);
  req.pipe(request(populationstats_URL)).pipe(res);
});

//General Public Expenses
var general_public_expenses_URL='https://sos1819-11.herokuapp.com/api/v1/populationstats';
var proxyP = '/proxy-general-public-expenses';

router.use(proxyP, function(req, res) {
  console.log('piped: '+general_public_expenses_URL);
  req.pipe(request(general_public_expenses_URL)).pipe(res);
});


module.exports = router;