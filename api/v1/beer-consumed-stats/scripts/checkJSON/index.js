var Type = require('../../../../../node_modules/type-of-is');

module.exports =  function(statJSON){
        
    if (Object.keys(statJSON).length != 5) {
        console.log("[beeeer-stats] FATAL ERROR !! Bad Length of JSON");
        return false;
    }
    
    var check = true;
    var keys = ["country", "year", "rating", "variation", "countryConsumition"];  
    
    for (var param in statJSON){
        if(!keys.includes(param)){
            console.log("[beeeer-stats] FATAL ERROR !! JSON's Params not valid.");
            console.log('\t', '\t', "Error: Param '", param, "' is not valid.");
            check = false;
            break;
        }
    }
    
    if(check){
        
        var check_country = Type.is(statJSON["country"], String);
        var check_year = Type.is(statJSON["year"], Number);
        var check_rating = Type.is(statJSON["rating"], Number);
        var check_variation = Type.is(statJSON["variation"], Number);
        var check_countryConsumition = Type.is(statJSON["countryConsumition"], Number);
        check = check_country && check_year && check_rating && check_variation && check_countryConsumition;
        
        if(!check){
            console.log("[beeeer-stats] FATAL ERROR !! JSON's Params's Values are not valid.");
            if(!check_country) console.log('\t', '\t', "Error: Param's Value of country is not valid. Must be a String.");
            if(!check_year) console.log('\t', '\t', "Error: Param's Value of country is not valid. Must be a Number.");
            if(!check_rating) console.log('\t', '\t', "Error: Param's Value of rating is not valid. Must be a Number.");
            if(!check_variation) console.log('\t', '\t', "Error: Param's Value of variation is not valid. Must be a Number.");
            if(!check_countryConsumition) console.log('\t', '\t', "Error: Param's Value of countryConsumition is not valid. Must be a Number.");
        }
    }
    
    return check;
    
}