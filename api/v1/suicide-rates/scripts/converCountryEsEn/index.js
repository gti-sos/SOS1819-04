module.exports =  function(inputCountry){
    
    let csvToJson = require('../../../../../node_modules/convert-csv-to-json');
    
    const fileInputName = 'paises.csv'
    csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName); 
    
    let json = csvToJson.getJsonFromCsv(fileInputName);

        
    for (var j=0; j<json.length; j++){
        
        var paisEs = json[j].nombre.slice(1,-1).toLowerCase();
        
        if(paisEs === inputCountry){
            return json[j].name.slice(1,-1).toLowerCase();
        }
        
    }
}