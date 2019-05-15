/* global browser element by expect*/
describe("Check if a new Happiness-stats can be created: ", function(){
    
        it("List should be grow after the Happiness-Stats creation.", function(){
            
                browser.get("https://sos1819-04.herokuapp.com/#!/ui/v1/happiness-stats");
                
                check();
                
                function check(){
                   
                    element
                        .all(by.repeater("happiness_stat in happiness_stats"))
                        .then(function (initial_happiness_stats){
                                
                                if(initial_happiness_stats.length==10){
                                    
                                    element(by.css('[value="next"]')).click().then(check());
                                    
                                } else {
                                
                                    element(by.model('newHappiness.country')).sendKeys('testCountry');
                                    element(by.model('newHappiness.year')).sendKeys(8888);
                                    element(by.model('newHappiness.happinessScore')).sendKeys(8.8);
                                    element(by.model('newHappiness.lowerLimitTrust')).sendKeys(8.8);
                                    element(by.model('newHappiness.upperLimitTrust')).sendKeys(88);
                                    element(by.css('[value="addHappiness"]')).click();
                                    
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