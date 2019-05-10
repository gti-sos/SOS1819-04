describe("Check if data is Loaded: ", function(){
        
        it("List should show some items.", function(){
                
                browser.get("https://sos1819-04.herokuapp.com/#!/suicide-rates");
                
                element(by.css('[value="CARGAR DATOS INICIALES"]')).click().then(function(){
                        
                                var suicide_rates = element.all(by.repeater("suicide_rate in suicide_rates"));
                                expect(suicide_rates.count()).toBeGreaterThan(0);
                                
                        }
                );
                
                
                
            }
        );
        
    }
);