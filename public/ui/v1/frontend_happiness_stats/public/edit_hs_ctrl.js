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
            
            
            
            
              
            
        }]);

