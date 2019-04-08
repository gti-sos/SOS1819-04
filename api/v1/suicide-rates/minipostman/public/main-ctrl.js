/*global angular*/

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http){
                        
                        console.log("[Suicide-Rates] MainCtrl Initializated !!.");
                        $scope.url = "/api/v1/suicide-rates";
                        
                        
                        $scope.send = function(){
                            
                            switch($scope.dataMethod){
                                
                                case "get":
                                    $http.get($scope.url).then(function(response){
                                        
                                            var res;
                                            if(response.status == 200) res = JSON.stringify(response.data, null, 2);
                                            $scope.dataResponse = "STATUS -> " + response.status + ": " + response.statusText + '\n' + '\n' + res;
                                        
                                        }, function(err){
                                            
                                            var res;
                                            
                                            switch(err.status){
                                                
                                                case 404:
                                                    res = "Required Suicide-Stat not in Data Base."
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                
                                                case 409:
                                                    res ="If you are trying to do a 'loadInitialData', that is not posible because DataBase is not empty.";
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                
                                                default:
                                                    res = "Something is bad..." + err;
                                                    $scope.dataResponse = $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                
                                            }
                                        }
                                    );
                                    break;
                                    
                                case "post":
                                    $http.post($scope.url, $scope.dataRequest).then(function(response){
                                            var res = "Request accepted, creating new resource in Database."
                                            $scope.dataResponse = "STATUS -> " + response.status + ": " + response.statusText + '\n' + '\n' + res;
                                        }, function(err){
                                            
                                            var res;
                                            
                                            switch(err.status){
                                                
                                                case 400:
                                                    res = "Bad JSON in Request. Rlease, check it and try again."
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                
                                                case 405:
                                                    res = "Method not Allowed. Please do not try again this method"
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                
                                                case 409:
                                                    res = "Suicide-Rate you are trying to create already exists in Database. Rlease, check it and try again."
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                    
                                                default:
                                                    res = "Something is bad..." + err;
                                                    $scope.dataResponse = $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                    
                                            }
                                            
                                        }
                                    );
                                    break;
                                    
                                case "put":
                                    $http.put($scope.url, $scope.dataRequest).then(function(response){
                                            var res = "Request accepted, updating resource in Database.";
                                            $scope.dataResponse = "STATUS -> " + response.status + ": " + response.statusText + '\n' + '\n' + res;
                                        }, function(err){
                                            
                                            var res;
                                            
                                            switch(err.status){
                                                
                                                case 400:
                                                    res = "Bad JSON in Request. Please, check it and try again."
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                
                                                case 404:
                                                    res = "Suicide-Rate you are trying to modify not extists in Database. Please check it and try again.";
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                
                                                case 405:
                                                    res = "Method not Allowed. Please do not try again this method"
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                    
                                                case 409:
                                                    res = "Suicide-Rate you are trying to modify is not the same as you are referencd at URL. Please, check it and try again."
                                                    $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                    
                                                default:
                                                    res = "Something is bad..." + err;
                                                    $scope.dataResponse = $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                                    break;
                                                    
                                            }
                                            
                                        }
                                    );
                                    break;
                                    
                                case "del":
                                    $http.delete($scope.url).then(function(response){
                                            var res = "Request accepted. Removing resource/s in Database.";
                                            $scope.dataResponse = "STATUS -> " + response.status + ": " + response.statusText + '\n' + '\n' + res;
                                        }, function(err){
                                            
                                            var res;
                                            
                                            if(err.status==404){
                                                res = "Suicide-Rate you are trying to delete not extists in Database. Please check it and try again.";
                                                $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                            } else {
                                                res = "Something is bad..." + err;
                                                $scope.dataResponse = $scope.dataResponse = "STATUS -> " + err.status + ": " + err.statusText + '\n' + '\n' + res;
                                            }
                                            
                                        }
                                    );
                                    break;
                                
                                default:
                                    $scope.dataResponse = "Please, select a method to send a Request to Server."
                                
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
                        
                        
                    }
                ]
            );