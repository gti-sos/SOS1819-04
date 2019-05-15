/*global browser element by expect*/
describe("Check if a happiness_stat can be deleted: ", function(){
    
        it("List should be wane after the Happiness-stats deletion.", function(){
                
                browser.get("https://sos1819-04.herokuapp.com/#!/happiness-stats");
                
                check();
                
                function check(){
                    
                    element
                        .all(by.repeater("happiness_stat in happiness_stats"))
                        .then(function(initial_happiness_stats){
                                
                                if(initial_happiness_stats.length<10){
                                    
                                    element(by.css('[value="deleteOne testCountry/8888"]')).click();
                                    
                                    element
                                        .all(by.repeater("happiness_stat in happiness_stats"))
                                        .then(function(final_happiness_stats){
                                                
                                                expect(initial_happiness_stats.length).toBeGreaterThan(final_happiness_stats.length);
                                                
                                            }
                                        );
                                    
                                } else if(initial_happiness_stats.length==0){
                                    
                                    element(by.css('[value="previous"]')).click();
                                    
                                    element(by.css('[value="deleteOne testCountry/8888"]')).click();
                                    
                                    element
                                        .all(by.repeater("happiness_stat in happiness_stats"))
                                        .then(function(final_happiness_stats){
                                                
                                                expect(initial_happiness_stats.length).toBeGreaterThan(final_happiness_stats.length);
                                                
                                            }
                                        );
                                    
                                } else {
                                    
                                    element(by.css('[value="next"]')).click().then(check());
                                    
                                }
                                
                            }
                        );
                    
                }
                
                
            }
        );
    
    }
);