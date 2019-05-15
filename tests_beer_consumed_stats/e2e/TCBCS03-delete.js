/* global browser element by expect*/
describe("Check if a new data beer is loaded: ", function() {

    it("should show a bunch of data", function() {
        browser.get("https://sos1819-04.herokuapp.com/#!/ui/v1/beer-consumed-stats")
        //browser.get("https://sos1819-04-sos1819jpcc.c9users.io/#!/ui/v1/beer-consumed-stats")
            .then(function() {
                element.all(by.repeater('beer_consumed in beer_consumeds')).then(function(initialBeer) {
                    element.all(by.id("borrar1")).last().click();

                    element.all(by.repeater("beer_consumed in beer_consumeds"))
                        .then(function(finalBeer) {
                            expect(finalBeer.length).toEqual(initialBeer.length - 1);
                        });
                });
            });
    });
});
