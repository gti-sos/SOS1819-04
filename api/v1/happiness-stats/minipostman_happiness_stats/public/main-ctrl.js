
/* global angular*/
var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$htpp", function($scope. $http){
    
        console.log("MainCtrl Initializated");
        $scope.url = "/api/v1/happiness-stats";
        
        $scope.send = function(){
            switch($scope.dataMethod){
                
                case "get":
                    $http.get($scope.url).then(function(response){
                        
                        var res;
                        if(response.status == 200) res = JSON.stringify(response.data, null, 2);
                        $scope.dataResponse = "RES: " + response.status + ": " + response.statusText + '\n' + '\n' + res;
                                        
                    }, function(err){
                        
                        var msn;
                        
                        if(err.status == 404){
                            msn = "Required happiness-stats not in Data Base";
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else if(err.status == 409){
                            msn = "DataBase is not Empty":
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }else{
                            msn = "ERROOOOOOOOOR" + err;
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                    }
                    
                );
                break;
                case "post":
                    $http.post($scope.url, $scope.dataRequest).then(function(response){
                       var res = "ACCEPTED, new resource in data Base"
                       $scope.dataResponse = "RES -> " + response.status + ": " + response.statusText + '\n' + '\n' + res;
                    }, function(err){
                        
                        var msn;
                        
                        if(err.status == 405){
                            msn = "Method not Allowed";
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else if(err.status == 400){
                            msn = "BAD JSON in request":
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else if(err.status == 409){
                            msn = "ALREADY EXITS IN DATABASE":
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else{
                            msn = "ERROOOOOOOOOR" + err;
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                    }
                    );
                    break;
            }
            case "put":
                    $http.put($scope.url, $scope.dataRequest).then(function(response){
                       var res = "ACCEPTED, updating resource in database"
                       $scope.dataResponse = "RES -> " + response.status + ": " + response.statusText + '\n' + '\n' + res;
                    }, function(err){
                        
                        var msn;
                        
                        if(err.status == 405){
                            msn = "Method not Allowed";
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else if(err.status == 400){
                            msn = "BAD JSON in request":
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else if(err.status == 409){
                            msn = "bad data introduction":
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else if(err.status == 404){
                            msn = "Not exists in Database":
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else{
                            msn = "ERROOOOOOOOOR" + err;
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                    }
                    );
                    break;
            }
            case "del":
                    $http.delete($scope.url).then(function(response){
                       var res = "Remove resouce in Database"
                       $scope.dataResponse = "RES -> " + response.status + ": " + response.statusText + '\n' + '\n' + res;
                    }, function(err){
                        
                        var msn;
                        
                        if(err.status == 404){
                            msn = "Not exists in Database":
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                        else{
                            msn = "ERROOOOOOOOOR" + err;
                            $scope.dataResponse = "RES: " + err.status + ": " + err.statusText + '\n' + '\n' + msn;
                        }
                    }
                    );
                    break;
                    
                default:
                    $scope.dataResponse = "Please, select a method to send a Request to Server.";
            }
        }  
        $scope.get = function(){
            $scope.dataMethod = "get";
        };
                        
        $scope.post = function(){
            $scope.dataMethod = "post";
        }
                        
        $scope.put = function(){
            $scope.dataMethod = "put";
        }
                        
        $scope.del = function(){
            $scope.dataMethod = "del";
        }
}]);
            