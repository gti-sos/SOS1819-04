/* global browser element by expect*/
describe("Check if a new data beer is loaded: ", function() {

    it("should show a bunch of data", function() {
        browser.get("https://sos1819-04.herokuapp.com/#!/ui/v1/beer-consumed-stats")
            .then(function() {
                element.all(by.repeater('beer_stat in beer_stats')).then(function(initialBeer) {
                    element.all(by.id("borrar1")).last().click();

                    element.all(by.repeater("beer_stat in beer_stats"))
                        .then(function(finalBeer) {
                            expect(finalBeer.length).toEqual(initialBeer.length - 1);
                        });
                });
            });
    });
});
