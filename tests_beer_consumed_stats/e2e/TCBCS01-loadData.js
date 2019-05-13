/* global browser element by expect*/
describe("Check if data is loaded: ",function (){
        
        it("should show a bunch of data", function(){
                
                browser.get("https://sos1819-04.herokuapp.com/#!/ui/v1/beer-consumed-stats");
                element(by.css('[value="CARGAR DATOS INICIALES"]')).click().then(function(){
                                var beer_stats = element.all(by.repeater("beer_stat in beer_stats"));
                                expect(beer_stats.count()).toBeGreaterThan(0);
                                
                        });
            });
    }
);