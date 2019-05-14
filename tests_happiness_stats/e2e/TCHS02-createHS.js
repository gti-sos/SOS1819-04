/* global browser element by expect*/
describe("Check if a new Happiness-stats can be created: ", function(){
    
        it("List should be grow after the Happiness-Stats creation.", function(){
            
                browser.get("https://sos1819-04.herokuapp.com/#!/suicide-rates");
                
                check();
                
                function check(){
                   
                    element
                        .all(by.repeater("happiness-stats in happiness-stats"))
                        .then(function (initial_happiness_stats){
                                
                                if(initial_happiness_stats.length==10){
                                    
                                    element(by.css('[value="Siguiente Página"]')).click().then(check());
                                    
                                } else {
                                
                                    element(by.model('inputHS.country')).sendKeys('testCountry');
                                    element(by.model('inputHS.year')).sendKeys(8888);
                                    element(by.model('inputHS.happinessScore')).sendKeys(8.8);
                                    element(by.model('inputHS.lowerLimitTrust')).sendKeys(8.8);
                                    element(by.model('inputHS.upperLimitTrust')).sendKeys(88);
                                    element(by.css('[value="AÑADIR NUEVO RECURSO"]')).click();
                                    
                                    element
                                        .all(by.repeater("happiness_stat in happiness_stats"))
                                        .then(function(final_happiness_stats){
                                            
                                                expect(final_happiness_stats.length).toEqual(initial_happiness_stats.length+1);
                                            
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