/* global angular */

var app = angular.module("BeerConsumedStatsFrontEnd");
app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("[Beer] Main Controller initialized!");
    var API = "/api/v1/beer-consumed-stats";
    refresh();

    function refresh() {
        $http.get(API).then(function(response) {
            console.log("GET Request revived to " + "<" + API + ">");
            console.log("Data Received: " + JSON.stringify(response.data, null, 2));
            $scope.beer_consumeds = response.data;
        });
    }

    $scope.loadInitialData = function() {
        $http.get(API + "/loadInitialData").then(function(response) {
            console.log("Respuesta : " + response.status + response.data);
            $scope.status = "Restauracion realizada con exito";
            $scope.data = JSON.stringify(response.data, null, 2);
            refresh();
        }).catch(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
            if ($scope.status == 409) {
                $scope.status = $scope.status + " - La base de datos debe estar vacia, borre todo antes de restaurar";
            }
            $scope.statusInfo = JSON.stringify(response.status, null, 2);
        });
    };

    $scope.postData = function(country, year, rating, variation, countryConsumition) {
        console.log("Nuevo Recurso de Cerveza");
        $http.post(API, { country: country, year: parseInt(year), rating: parseFloat(rating), variation: parseFloat(variation), countryConsumition: parseInt(countryConsumition) }).then(function(response) {
            console.log("POST Response: " + response.status);
            refresh();
            $scope.status = "Recurso creado";
            $scope.data = JSON.stringify(response.data, null, 2);
        }, function(error) {
            console.log("POST Response: " + error.status);
            $scope.status = error.status;
            if ($scope.status == 405) {
                $scope.status = $scope.status + " - No se puede realizar la acción";
            }
            if ($scope.status == 409) {
                $scope.status = $scope.status + " - El recurso ya existe";
            }
            if ($scope.status == 400) {
                $scope.status = $scope.status + " - Datos insertados en la tabla con un formato incorrecto.";
            }
            $scope.data = "";
        });
    };

    $scope.get = function() {
        $http.get(API).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    /*
    $scope.busqueda = function(country, year) {
        $http.get(API + "/" + country + "/" + year).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        }, function(error) {
            $scope.status = error.status;
            if ($scope.status == 404) {
                $scope.status = $scope.status + " - no existe";
            }
            $scope.data = "";
        });
    };
    */

    $scope.delAll = function() {
        $http.delete(API).then(function(response) {
            console.log("Response : " + response.status + response.data);
            refresh();
            $scope.status = "Recursos eliminados";
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
    };

    $scope.delData = function(country, year) {
        $http.delete(API + "/" + country + "/" + year).then(function(response) {
            console.log("Borrando: " + country + " - " + year);
            console.log("Response : " + response.status + response.data);
            refresh();
            $scope.status = country + "ha sido eliminado";
        }, function(error) {
            $scope.status = error.status;
            if ($scope.status == 404) {
                $scope.status = $scope.status + " - El recurso elegido no existe";
            }
            $scope.data = "";
        });
    };


    $scope.busqueda = function(country, year) {
        var search = "/?";
        if ($scope.consulta.country) {
            search += ("&country=" + $scope.consulta.country);
        }
        if ($scope.consulta.year) {
            search += ("&year=" + $scope.consulta.year);
        }
        refresh(API + search);
        search = "/?";
        $scope.status = "Busqueda realizada";
    };

    /*
    $scope.Busqueda2 = function() {
        var search = "?";
        if ($scope.searchForm.from) {
            search += ("&from=" + $scope.searchForm.from);
        }
        if ($scope.searchForm.to) {
            search += ("&to=" + $scope.searchForm.to);
        }
        console.log(search);
        refresh();


    };
    */

}]);
