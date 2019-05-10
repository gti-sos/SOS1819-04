describe("Check if a Suicide-Rate can be deleted: ", function(){
    
        it("List should be wane after the Suicide-Rate deletion.", function(){
                
                browser.get("https://sos1819-04.herokuapp.com/#!/");
                
                check();
                
                function check(){
                    
                    element
                        .all(by.repeater("suicide_rate in suicide_rates"))
                        .then(function(initial_suicide_rates){
                                
                                if(initial_suicide_rates.length<10){
                                    
                                    element(by.css('[value="ELIMINAR testCountry/8888"]')).click();
                                    
                                    element
                                        .all(by.repeater("suicide_rate in suicide_rates"))
                                        .then(function(final_suicide_rates){
                                                
                                                expect(initial_suicide_rates.length).toBeGreaterThan(final_suicide_rates.length);
                                                
                                            }
                                        );
                                    
                                } else if(initial_suicide_rates.length==0){
                                    
                                    element(by.css('[value="Página Anterior"]')).click();
                                    
                                    element(by.css('[value="ELIMINAR testCountry/8888"]')).click();
                                    
                                    element
                                        .all(by.repeater("suicide_rate in suicide_rates"))
                                        .then(function(final_suicide_rates){
                                                
                                                expect(initial_suicide_rates.length).toBeGreaterThan(final_suicide_rates.length);
                                                
                                            }
                                        );
                                    
                                } else {
                                    
                                    element(by.css('[value="Siguiente Página"]')).click().then(check());
                                    
                                }
                                
                            }
                        );
                    
                }
                
                
            }
        );
    
    }
);