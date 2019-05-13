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
                $scope.beer_consumed = response.data;
            });
        }

        $scope.loadInitialData = function() {
            $http.get(API + "/loadInitialData").then(function(response) {
                console.log("Respuesta : " + response.status + response.data);
                $scope.status = "Restauracion realizada con exito";
                refresh();
            }).catch(function(response) {
                $scope.status = response.status;
                if ($scope.status == 409) {
                    $scope.status = $scope.status + " - La base de datos debe estar vacia, borre todo antes de restaurar";
                }
                $scope.statusInfo = JSON.stringify(response.status, null, 2);
            });
        };

        $scope.postData = function() {
            var nBeer = $scope.nBeer;
            console.log("Nuevo Recurso de Cerveza");
            $http.post(API, nBeer).then(function(response) {
                console.log("POST Response: " + response.status + " " + response.data);
                refresh();
                $scope.status = "Recurso creado";
            }, function(error) {
                $scope.status = error.status;
                if ($scope.status == 405) {
                    $scope.status = $scope.status + " - No se puede realizar la acción";
                }
                if ($scope.status == 409) {
                    $scope.status = $scope.status + " - El recurso ya existe";
                }
                if ($scope.status == 400) {
                    $scope.status = $scope.status + " - El recurso ya existe";
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
                    $scope.status = $scope.status + " - Lo que busca no existe";
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
        
          $scope.busqueda = function(country, year){
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

    }]);
