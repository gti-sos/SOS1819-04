/*global angular*/

angular
        .module("BeerConsumedStatsFrontEnd")
        .controller("MainCtrl",["$scope","$http", function ($scope,$http){
            console.log("[Beer] Main Controller initialized!");
            
            $scope.page = 1;
            var limit = 9;
            var offset = 0;
            var paginationString = "";
            $scope.currentPage = 1;
            
            var API = "/api/v1/beer-consumed-stats";
            
            refresh(API);
            
            function refresh(API){
                paginationString = "&limit=" + limit + "&offset=" + offset;
                $http.get(API  + paginationString).then(function(response) {
                        
                        console.log("GET Request revived to " + "<" + API + ">");
                        console.log("Data Received: " + JSON.stringify(response.data, null,2));
                        $scope.beer_consumeds = response.data;
                    }
                );
                
            }
            
            //PROGRAMACIÓN DE LOS BOTONES DE PAGINACIÓN "previusPage()" y "nextPage()"
                $scope.previusPage = function(){
                    
                    if(offset!=0){
                        $scope.page-=1;
                        limit-=10;
                        offset-=10;
                    }
                    refresh(API);
                }
                
                $scope.nextPage = function(){
                    
                    $scope.page = $scope.page + 1;
                    limit = limit + 10;
                    offset = offset + 10;
                    refresh(API);
                }
            
            $scope.postData = function(){
                    var newBeer = $scope.newBeer;
                    newBeer.year = parseInt($scope.newBeer.year);
                    console.log(newBeer);
                    console.log("Nuevo Recurso de Cerveza");
                    $http.post(API ,newBeer).then(function(response){
                        console.log("POST Response: "+ response.status +" "+ response.data);
                        refresh(API);
                        $scope.status = "Recurso creado";
                    }, function (error){
                        $scope.status = error.status;
                        if($scope.status == 405){
                            $scope.status = $scope.status + " - No se puede realizar la acción";
                    }
                        if($scope.status == 409){
                            $scope.status = $scope.status + " - El recurso ya existe";
                    }
                        if($scope.status == 400){
                            $scope.status = $scope.status + " - No puede haber campos en blanco";
                    }
                        $scope.data = "";
                        });
                };
                
            $scope.get = function(){
                $http.get(API).then(function(response){
                    $scope.status = response.status;
                    $scope.data = JSON.stringify(response.data,null,2);
                }, function (error){
                    $scope.status = error.status;
                    $scope.data = "";
                    });
                };
            
            $scope.busqueda = function(country, year){
                var search = "/?";
                if ($scope.consulta.country) {
                    search += ("country=" + $scope.consulta.country);
                }
                if ($scope.consulta.year) {
                    search += ("year=" + $scope.consulta.year);
                }
                refresh(API + search);
                search = "/?";
                $scope.status = "Busqueda realizada";
                };

            $scope.deleteAll = function() {
                $http.delete(API).then(function(response) {
                    console.log("Response : " + response.status + response.data);
                    refresh(API);
                    $scope.status = "Recursos eliminados";
                }, function(error) {
                    $scope.status = error.status;
                    $scope.data = "";
                });
            };
            
            $scope.deleteOne = function(country, year) {
                $http.delete(API +"/" +country + "/"+year).then(function(response) {
                    console.log("Borrando: " + country + " - " + year);
                    console.log("Response : " + response.status + response.data);
                    refresh(API);
                    $scope.status = country +"ha sido eliminado";
                }, function(error) {
                    $scope.status = error.status;
                    if($scope.status == 404){
                        $scope.status = $scope.status + " - El recurso elegido no existe";
                    }
                    $scope.data = "";
                });
            };
            
            $scope.loadInitialData = function() {
                $http.get(API + "/loadInitialData").then(function(response) {
                console.log("Respuesta : " + response.status + response.data);
                $scope.status = "Restauracion realizada con exito";
                refresh(API);
            }).catch(function(response) {
                $scope.status = response.status;
                if($scope.status == 409){
                        $scope.status = $scope.status + " - La base de datos debe estar vacia, borre todo antes de restaurar";
                }
                $scope.statusInfo = JSON.stringify(response.status, null, 2);
                });
            };
              
            
        }]);