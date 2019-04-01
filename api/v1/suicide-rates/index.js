const express = require("../../../node_modules/express");
const router = express.Router();


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
        suicide_stats.find(search, {"fields": fields}).skip(offset).limit(limit).toArray( (err, suicide_stats_array) => {
                
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
        
        var country = req.params.country;
        var year = parseInt(req.params.year);
        console.log(country, year);
        
        suicide_stats.find( {"country": country, "year": year}, {"_id":0} ).toArray( (err, suicide_stats_array) => {
            
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
                res.sendStatus(400);
                
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

module.exports = router;