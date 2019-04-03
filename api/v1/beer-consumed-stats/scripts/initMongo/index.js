//CONECTARSE A LA BASE DE DATOS
module.exports = function() {
    
//Base de datos beer-stats
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

    
    return beer_stats;
    
}