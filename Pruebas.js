/*let csvToJson = require('convert-csv-to-json');

const fileInputName = 'paises.csv'
csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName); 

let json = csvToJson.getJsonFromCsv(fileInputName);

var paisesEs = ["alemania", "afganistán", "lituania", "brasil", "españa", "argelia", "zimbabue"];
var paisesEn = []

for (var i=0; i<paisesEs.length; i++){
    
    console.log("País en Español: ",paisesEs[i]);
    
    for (var j=0; j<json.length; j++){
        
        var paisEs = json[j].nombre.slice(1,-1).toLowerCase();
        
        if(paisEs === paisesEs[i]){
            paisesEn.push(json[j].name.slice(1,-1));
            console.log('\t', "País en Inglés: ",json[j].name.slice(1,-1));
        }
        
    }
}*/

var convertCountryEsEn = require("./api/v1/suicide-rates/scripts/converCountryEsEn");

var paisesEs = [
    "hong kong",
    "groenlandia",
    "corea del sur",
    "hungría",
    "paraguay",
    "guatemala",
    "méxico",
    "cuba",
    "república dominicana",
    "república checa",
    "suiza",
    "bulgaria",
    "suecia",
    "rumanía"
];

for (var i=0; i<paisesEs.length;i++){
    
    console.log(paisesEs[i], "--> ", convertCountryEsEn(paisesEs[i]));
    
}

var conjunto = new Set();
conjunto.add("Hola");
conjunto.add("Hola");
conjunto.add("Hola");
conjunto.add("Adios");
console.log("conjunto --> ", conjunto);