/* global angular */

angular
    .module("FrontEnd")
    .controller("EditHappinessStatsCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Happiness Stats initialized!");

        var API = "/api/v1/happiness-stats/" + $routeParams.country + "/" + $routeParams.year;


        $http.get(API).then(function(response) {
                console.log("Datos recibidos:  " + JSON.stringify(response.data, null, 2));
                $scope.happiness_stats = response.data;
            },
            function(error) {
                $scope.status = error.status;
                $scope.data = "";
            });

        $scope.editar = function() {
            if (confirm("¿Desea actualizar los datos?")) {
                
                $http.put(API, {country:$scope.happiness_stat.country, year:parseInt($scope.happiness_stat.year), 
                happinessScore:parseFloat($scope.happiness_stat.happinessScore),
                lowerLimitTrust:parseFloat($scope.happiness_stat.lowerLimitTrust),
                upperLimitTrust:parseFloat($scope.happiness_stat.upperLimitTrust)
                    
                }).then(function(response) {
                   
                    $location.path("/ui/v1/happiness-stats");
                }, function(error) {
                     console.log($scope.happiness_stats);
                    $scope.status = error.status + "Los campos no se han completado correctamente";
                    $scope.data = "Los campos no se han completado conrrectamente";
                });
            }
        };
    }]);























/*
angular
    .module("FrontEnd")
    .controller("ListHappinessStatsCtrl",["$scope","$http", "$routeParams", "$location", function ($scope,$http,$routeParams,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA VISTA DE EDICIÓN
                console.log("[Suicide Rates] EDIT Happiness Stats Main Controller initialized.");
                
                var URL = "/api/v1/suicide-rates";
                
                $scope.page = 1;
                var limit = 10;
                var offset = 0;
                
                var country = $routeParams.country;
                var year = $routeParams.year;
                
                //CARGA DEL RECURSO QUE SE QUIERE EDITAR
                $http.get(URL+"/"+country+"/"+year).then(function(res){
                        
                            console.log("[Suicide Rates] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                            
                            if(Array.isArray(res.data)) {
                                $scope.suicide_rates = res.data;
                            } else {
                                $scope.suicide_rates = [res.data];
                            }
                            
                            //$scope.systemResponse = "¡SE HAN ACTUALIZADO LOS DATOS DE LA TABLA DE RECURSOS SATISFACTORIAMENTE!.";
                            
                        }, function(err){
                            
                            
                            
                        }
                    );

             $scope.edit = function() {
               
               var editHS = {};
                editHS.country= inputHS.country;
                editHS.year = parseInt(inputHS.year);
                editHS.noSuicidesMan = parseDouble(inputHS.happinessScore);
                editHS.noSuicidesWoman = parseFloat(inputHS.lowerLimitTrust);
                editHS.rank = parseInt(inputHS.upperLimitTrust);
                    
                $http.put(URL+"/"+inputHS.country+"/"+inputHS.year, editHS).then(function(response) {
                    console.log("Response : " + response.status + response.data);
                    $location.path("/ui/v1/happiness_stats");
                    
                }, function(error) {
                    $scope.status = error.status;
                        if($scope.status == 400){
                            $scope.status = $scope.status + " - Los datos introducidos no son correctos, \n comprueba que estan todos los campos completos";
                    }
                        if($scope.status == 404){
                            $scope.status = $scope.status + " - El recurso que intenta editar no existe";
                    }
                        if($scope.status == 409){
                            $scope.status = $scope.status + " - el recurso que tratas de editar tiene otro identificador";
                    }
                        $scope.data = "";
                    
                    
                    
                });
                
            };
            
            
            
            
              
            
        }]);
*/

