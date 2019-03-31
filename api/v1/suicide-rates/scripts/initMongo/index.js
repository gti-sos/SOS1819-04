//CONECTARSE A LA BASE DE DATOS
module.exports = function() {
    
    var suicide_stats;
    const MongoClient = require("../../../../../node_modules/mongodb").MongoClient;
    const uri_suicide_stats = "mongodb+srv://test:test@sos1819-04-afg-ysoip.mongodb.net/test?retryWrites=true";
    const client_suicide_stats = new MongoClient(uri_suicide_stats, { useNewUrlParser: true });
    
    client_suicide_stats.connect(err => {
    
        if(err) console.log("FATAL ERROR !!:", err);
        //Aquí se realiza la conexión con la BBDD, nuestro suicide_stats toma el valor de las tablas que tengamos en la BBDD
        suicide_stats = client_suicide_stats.db("SOS1819-04-suicide-rates").collection("suicide-rates");
        console.log("Successfully connected to Suicide-Rates DataBase !!");
        
        }
    );
    
    return suicide_stats;
    
}