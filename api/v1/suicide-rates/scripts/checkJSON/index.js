var Type = require('../../../../../node_modules/type-of-is');

module.exports =  function(statJSON){
        
    if (Object.keys(statJSON).length != 5) {
        
        console.log("[suicide-rates] FATAL ERROR: Bad Length of JSON");
        return false;
        
    }
    
    var check = true;
    var keys = ["country", "year", "noSuicidesMan", "noSuicidesWoman", "rank"];  
    
    for (var param in statJSON){
    
        if(!keys.includes(param)){
            console.log("[suicide-rates] FATAL ERROR: JSON's Params not valid.");
            console.log('\t', '\t', "Error: Param '", param, "' is not valid.");
            check = false;
            break;
        }
    }
    
    if(check){
        
        var check_country = Type.is(statJSON["country"], String);
        var check_year = Type.is(statJSON["year"], Number);
        var check_noSuicidesMan = Type.is(statJSON["noSuicidesMan"], Number);
        var check_noSuicidesWoman = Type.is(statJSON["noSuicidesWoman"], Number);
        var check_rank = Type.is(statJSON["rank"], Number);
        
        check = check_country && check_year && check_noSuicidesMan && check_noSuicidesWoman && check_rank;
        
        if(!check){
            console.log("[suicide-rates] FATAL ERROR: JSON's Params's Values are not valid.");
            if(!check_country) console.log('\t', '\t', "Error: Param's Value of country is not valid. Must be a String.");
            if(!check_year) console.log('\t', '\t', "Error: Param's Value of country is not valid. Must be a Number.");
            if(!check_noSuicidesMan) console.log('\t', '\t', "Error: Param's Value of noSuicidesMan is not valid. Must be a Number.");
            if(!check_noSuicidesWoman) console.log('\t', '\t', "Error: Param's Value of noSuicidesWoman is not valid. Must be a Number.");
            if(!check_rank) console.log('\t', '\t', "Error: Param's Value of rank is not valid. Must be a Number.");
        }
    }
    
    return check;
    
}