/*global angular*/

angular
        .module("HappinessApp")
        .controller("MainCtrl",["$scope","$http", function ($scope,$http){
            console.log("Main Controller initialized.");
            
            $scope.page = 1;
            var limit = 10;
            var offset = 0;
            var API = "/api/v1/happiness-stats";
            var URL = "/api/v1/happiness-stats";
            
            refresh(URL);
            
            function refresh(API){
                
                $http.get(API +"?limit="+limit+"&offset="+offset).then(function(response) {
                        
                        console.log("GET Request revived to " + "<" + API + ">");
                        console.log("Data Received: " + JSON.stringify(response.data, null,2));
                        $scope.happiness_stats = response.data;
                        
                    }, function(error) {
                    $scope.status = error.status;
                    if($scope.status == 404){
                        $scope.status = $scope.status + " - Algo no va bien, intentalo de nuevo";
                    }
                    $scope.data = "";
                });
                
            }
            
            $scope.addHappiness = function(){
                    var newHappiness = $scope.newHappiness;
                    newHappiness.year = parseInt($scope.newHappiness.year);
                    console.log(newHappiness);
                    console.log("Nuevo Recurso de felicidad");
                    $http.post(API ,newHappiness).then(function(response){
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
                            $scope.status = $scope.status + " - No se pueden quedar campos en blanco";
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
                    search += "country=" + $scope.consulta.country + "&";
                }
                if ($scope.consulta.year) {
                    search += "year=" + $scope.consulta.year;
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
            
             $scope.edit = function() {
               
               var editHS = {};
                editHS.country= inputHS.country;
                editHS.year = parseInt(inputHS.year);
                editHS.noSuicidesMan = parseFloat(inputHS.noSuicidesMan);
                editHS.noSuicidesWoman = parseFloat(inputHS.noSuicidesWoman);
                editHS.rank = parseInt(inputHS.rank);
                    
                $http.put(URL+"/"+inputHS.country+"/"+inputHS.year, editHS).then(function(response) {
                    console.log("Response : " + response.status + response.data);
                    refresh(API);
                    $scope.status = "Recursos eliminados";
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
            
            
            //PAGINACION
            $scope.next = function() {
               
                    $scope.page+=1;
                    limit+=10;
                    offset+=10;
                    $scope.status = " ";

                    refresh(API);
            };
            
            $scope.previous = function() {
                
                    
                    if(offset!=0){
                        $scope.page-=1;
                        limit-=10;
                        offset-=10;
                        $scope.status = " ";
                    }
                    else{
                        $scope.status = "Se encuentra en la primera página, no puede retroceder mas";
                    }
                    
                    refresh(API);
            };
            
              
            
        }]);

