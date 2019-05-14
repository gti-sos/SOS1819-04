/* global browser element by expect*/
describe("Check if a new Suicide-Rate can be created: ", function(){
    
        it("List should be grow after the Suicide-Rate creation.", function(){
            
                browser.get("https://sos1819-04.herokuapp.com/#!/suicide-rates");
                
                check();
                
                function check(){
                   
                    element
                        .all(by.repeater("suicide_rate in suicide_rates"))
                        .then(function (initial_suicide_rates){
                                
                                if(initial_suicide_rates.length==10){
                                    
                                    element(by.css('[value="Siguiente Página"]')).click().then(check());
                                    
                                } else {
                                
                                    element(by.model('inputSuicideRate.country')).sendKeys('testCountry');
                                    element(by.model('inputSuicideRate.year')).sendKeys(8888);
                                    element(by.model('inputSuicideRate.noSuicidesMan')).sendKeys(8.8);
                                    element(by.model('inputSuicideRate.noSuicidesWoman')).sendKeys(8.8);
                                    element(by.model('inputSuicideRate.rank')).sendKeys(88);
                                    element(by.css('[value="AÑADIR NUEVO RECURSO"]')).click();
                                    
                                    element
                                        .all(by.repeater("suicide_rate in suicide_rates"))
                                        .then(function(final_suicide_rates){
                                            
                                                expect(final_suicide_rates.length).toEqual(initial_suicide_rates.length+1);
                                            
                                            }
                                        );
                                        
                                }
                                
                            }
                        );
                        
                }
                
            }
        );
    
    }
);