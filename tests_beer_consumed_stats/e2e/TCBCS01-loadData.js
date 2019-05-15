/* global browser element by expect*/
describe("Check if data is loaded: ",function (){
        
        it("should show a bunch of data", function(){
                
                browser.get("https://sos1819-04.herokuapp.com/#!/ui/v1/beer-consumed-stats");
                //browser.get("https://sos1819-04-sos1819jpcc.c9users.io/#!/ui/v1/beer-consumed-stats");
                element(by.css('[value="Restaurar"]')).click().then(function(){
                                var beer_stats = element.all(by.repeater("beer_consumed in beer_consumeds"));
                                expect(beer_stats.count()).toBeGreaterThan(0);
                                
                        });
            });
    }
);