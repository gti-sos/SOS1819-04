/* global browser element by expect*/
describe("Check if a new data beer is loaded: ",function (){
        
        it("should show a bunch of data", function(){
            browser.get("https://sos1819-04.herokuapp.com/#!/ui/v1/beer-consumed-stats")
              .then(function() {
                    element.all(by.repeater('beer_stat in beer_stats')).then(function(initialStats) {

                        element(by.model('initBeerStat.country')).sendKeys(1);
                        element(by.model('initBeerStat.year')).sendKeys(1);
                        element(by.model('initBeerStat.rating')).sendKeys(1);
                        element(by.model('initBeerStat.variation')).sendKeys(1);
                        element(by.model('initBeerStat.countryConsumition')).sendKeys(1);
                        
                        element(by.buttonText('Add')).click().then(function() {
                                    expect(0).toBeGreaterThanOrEqual(initialStats.length);
                        });
                    
                });
                
            });
        });
    }
);