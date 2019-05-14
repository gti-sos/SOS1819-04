/* global browser element by expect*/
describe("Check if data is Loaded: ", function(){
        
        it("List should show some items.", function(){
                
                browser.get("https://sos1819-04.herokuapp.com/#!/happiness-stats");
                
                element(by.css('[value="CARGAR DATOS INICIALES"]')).click().then(function(){
                        
                                var happiness_stats = element.all(by.repeater("happiness_stat in happiness_stats"));
                                expect(happiness_stats.count()).toBeGreaterThan(0);
                                
                        }
                ); 
            }
        );
        
    }
);