const express = require("../../../node_modules/express");
const router = express.Router();

//CONECTARSE A LA BASE DE DATOS

/*//MÓDULO QUE CONECTA CON LA BASE DE DATOS
var initMongo = require("./scripts/initMongo");
var beer_stats = initMongo();
*/

//Base de datos /beer-consumed-stats
var beer_stats;
const MongoClient = require("../../../node_modules/mongodb").MongoClient;
const uri_beer_stats = "mongodb+srv://test:test@sosjpcc-usex1.mongodb.net/test?retryWrites=true";
const client_beer_stats = new MongoClient(uri_beer_stats, { useNewUrlParser: true });


client_beer_stats.connect(err => {
  if(err) console.log("error: " , err);
  //tengo que cambiar la direccion de "sos-jpcc"
  beer_stats = client_beer_stats.db("sos-jpcc").collection("beers");
  // perform actions on the collection object
  console.log("Connected the beer!");
});


/* JP
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~  API REST DE JUAN PEDRO  ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

//MÓDULO QUE COMPRUEBA LOS DATOS DE LOS JSON
var checkBeerStatsJSON = require("./scripts/checkJSON");

//DOCUMENTACION /api/v1/beer-consumed-stats/docs (REDIRIGE A LA DOCUMENTACIÓN DE LA API REST)
const beer_consumed_stats_URL = "https://documenter.getpostman.com/view/7063342/S17usmpE";
router.get("/docs", (req, res) => {
        res.redirect(beer_consumed_stats_URL);
    });

//MÓDULO PARA USAR JSON
var bodyParser = require("../../../node_modules/body-parser");
router.use(bodyParser.json());

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
router.get("/loadInitialData", (req, res) => {
    
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
router.get("/", (req, res) => {
    
     //Paginación
        var limit = parseInt(req.query.limit, 10);
        var offset = parseInt(req.query.offset, 10);
    
      //Búsquedas
        var search = {}
        if(req.query.country) search["country"] = req.query.country;
        if(req.query.year) search["year"] = parseInt(req.query.year);
        if(req.query.rating) search["rating"] = parseInt(req.query.rating);
        if(req.query.variation) search["variation"] = parseInt(req.query.variation);
        if(req.query.countryConsumition) search["countryConsumition"] = parseInt(req.query.countryConsumition);
        
        //Vistas Personalizadas
        var fields = {"_id": 0};
        
        if(req.query.fields){
            req.query.fields.split(",").forEach((f) => {
                fields[f] = 1;
                });
        }
       //GET 
        beer_stats.find(search, {"fields": fields}).skip(offset).limit(limit).toArray( (err, beer_stats_array) => {
                
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
router.post("/", (req, res) => {
        
        var newStat = req.body;
        if(checkBeerStatsJSON(newStat)){
        
        
            beer_stats.find({"country": newStat["country"],"year": newStat["year"]}).toArray( (err, beer_stats_array) => {
            
                    if(err) console.log("FATAL ERROR !!: ", err);
                
                    if(beer_stats_array == 0){
                    
                        beer_stats.insert(newStat);
                        console.log("[beeeer-stats] Request accepted, creating new resource in database.");
                        res.sendStatus(201);
                    
                     } else {
                    
                        console.log("[beeeer-stats] FATAL ERROR !!: Resource already exists in the database.");
                        res.sendStatus(409);
                }
                });
        } else {
                    //console.log("[beeeer-stats] FATAL ERROR !!: The input fields are not expected.");
                    res.sendStatus(400);
        }
    }
);

//GET /api/v1/beer-consumed-stats/--reurso-- (DEVUELVE UN RECURSO CONCRETO)
router.get(":country/:year", (req, res) => {
        
        //Paginación
        var limit = parseInt(req.query.limit, 10);
        var offset = parseInt(req.query.offset, 10);
        
        //Vistas Personalizadas
        var fields = {"_id": 0};
        
        if(req.query.fields){
            req.query.fields.split(",").forEach((f) => {
                fields[f] = 1;
                });
        }
        
        //GET
        var country = req.params.country;
        var year = parseInt(req.params.year);
        console.log(country, year);
        
        beer_stats.find( {"country": country, "year": year},{"fields": fields}).skip(offset).limit(limit).toArray( (err, beer_stats_array) => {
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
router.delete("/:country/:year", (req, res) => {
        
        var country = req.params.country;
        var year = parseInt(req.params.year);
        var found = false;
        
        beer_stats.find( {"country": country, "year": year} ).toArray( (err, beer_stats_array) =>{
            
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
router.put("/:country/:year", (req, res) => {
        
       var country = req.params.country;
        var year = parseInt(req.params.year);
        var updatedBeerStat = req.body;
        
        if(checkBeerStatsJSON(updatedBeerStat)){
        
            if(country == updatedBeerStat["country"] && year == updatedBeerStat["year"]){
                beer_stats.find( {"country": country, "year": year} ).toArray( (err, beer_stats_array) => {
                
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
        } else {
            
            res.sendStatus(400);
        }
        
    }
);

//POST /api/v1/beer-consumed-stats/--reurso-- (ERROR METODO NO PERMITIDO)
router.post("/:country/:year", (req, res) => {
        
        console.log("[beeeer-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//PUT /api/v1/beer-consumed-stats (ERROR METODO NO PERMITIDO)
router.put("/", (req, res) => {
    
        console.log("[beeeer-stats] FATAL ERROR !!: Method not Allowed.");
        res.sendStatus(405);
    }
);

//DELETE /api/v1/beer-consumed-stats (BORRA TODOS LOS RECURSOS)
router.delete("/", (req, res) => {
        
        beer_stats.remove({});
        console.log("[beeeer-stats] Request accepted, removing all resources of database.");
        res.sendStatus(200);
    }
);

module.exports = router;