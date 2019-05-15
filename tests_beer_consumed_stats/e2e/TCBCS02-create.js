/* global browser element by expect*/
describe("Check if a new data beer is loaded: ", function() {

    it("should show a bunch of data", function() {
        browser.get("https://sos1819-04.herokuapp.com/#!/ui/v1/beer-consumed-stats")
        //browser.get("https://sos1819-04-sos1819jpcc.c9users.io/#!/ui/v1/beer-consumed-stats")
            .then(function() {
                element.all(by.repeater('beer_consumed in beer_consumeds')).then(function(initialStats) {

                    element(by.model('newBeer.country')).sendKeys('testCountry');
                    element(by.model('newBeer.year')).sendKeys(1);
                    element(by.model('newBeer.rating')).sendKeys(1.1);
                    element(by.model('newBeer.variation')).sendKeys(1.1);
                    element(by.model('newBeer.countryConsumition')).sendKeys(1);

                    //element(by.buttonText('Add')).click();
                    element(by.css('[value="Añadir"]')).click();
                                    
                    element
                        .all(by.repeater("beer_consumed in beer_consumeds"))
                        .then(function(finalBeer) {

                            expect(finalBeer.length).toEqual(initialStats.length + 1);

                        });
                });

            });
    });
});
