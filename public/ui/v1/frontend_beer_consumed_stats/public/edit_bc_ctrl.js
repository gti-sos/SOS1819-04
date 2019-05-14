/*global angular*/

angular
    .module("FrontEnd")
    .controller("EditBeerConsumedStatsCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("[Beer] Edit Beer initialized!");

        var API = "/api/v1/beer-consumed-stats" + $routeParams.country + "/" + $routeParams.year;


        $http.get(API).then(function(response) {
                console.log("Datos recibidos:  " + JSON.stringify(response.data, null, 2));
                $scope.beer_consumed = response.data;
            },
            function(error) {
                $scope.status = error.status;
                $scope.data = "";
            });

        $scope.updateBeer = function() {
            if (confirm("¿Desea actualizar los datos?")) {
                $http.put(API, $scope.beer_consumed).then(function(response) {
                    $location.path("/ui/v1/beer-consumed-stats");
                }, function(error) {
                    $scope.status = error.status;
                    $scope.data = "Los campos no estan rellenos correctamente";
                });
            };
        }
    }]);
