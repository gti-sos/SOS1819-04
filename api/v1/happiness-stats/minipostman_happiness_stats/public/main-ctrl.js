
/* global angular $scope*/

var app = angular.module("MiniPostmanApp");


app.controller("MainCtrl", ["$scope","$http", function ($scope, $http){
                    console.log("MainCtrl Initialized!");
                    $scope.url = "/api/v1/happiness-stats/";
                    console.log("out get");
                    
        $scope.send = function() {
            console.log("in get");
            
            $http.get($scope.url).then(function(response) {
                $scope.status = response.status;
                $scope.data = JSON.stringify(response.data, null, 2);
            }, function(error) {
                $scope.status = error.status;
                $scope.data = "";
            });
        };
            
        /*
        }
        $scope.loadInitial = function() {
            $http.get($scope.url + "./loadInitialData").then(function(response) {
                $scope.data = JSON.stringify(response.data, null, 2);
            });
        }
        $scope.delete = function() {
            $http.delete($scope.url).then(function(response) {
                $scope.data = JSON.stringify(response.data, null, 2);
            });
        }
        */
        /*
        $scope.post = function() {
            $http.post($scope.url, {
                country: $scope.country,
                year: parseInt($scope.year),
                happinessScore: parseFloat($scope.happinessScore),
                lowerLimitTrust: parseFloat($scope.lowerLimitTrust),
                upperLimitTrust: parseFloat($scope.upperLimitTrust)
            }).then(function(response) {
                console.log("exito");
                $scope.status = response.status;
            }, function(error) {
                console.log("fallo");
                $scope.status = error.status;
            });
           
        };
        

        $scope.put = function() {
            $http.put($scope.url, {
                country: $scope.country,
                year: parseInt($scope.year),
                happinessScore: parseFloat($scope.happinessScore),
                lowerLimitTrust: parseFloat($scope.lowerLimitTrust),
                upperLimitTrust: parseFloat($scope.upperLimitTrust)
            }).then(function(response) {
                $scope.status = response.status;
            }, function(error) {
                $scope.status = error.status;
            });
        };*/
        
        $scope.post = function() {
            $http.post($scope.url,$scope.data 
            ).then(function(response) {
                console.log("exito");
                $scope.data = "";
                $scope.status = response.status;
            }, function(error) {
                console.log("fallo");
                $scope.status = error.status;
            });
           
        };
        

        $scope.put = function() {
            $http.put($scope.url,$scope.data 
            ).then(function(response) {
                $scope.data = "";
                $scope.status = response.status;
            }, function(error) {
                $scope.status = error.status;
            });
        };
        

        $scope.delete = function() {
            $http.delete($scope.url).then(function(response) {
                $scope.status = response.status;
                $scope.data = "";
            }, function(error) {
                $scope.status = error.status;
                $scope.data = "";
            });
        };

        $scope.loadInitialData = function() {
            $http.get($scope.url + "/loadInitialData").then(function(response) {
                $scope.status = response.status;
                $scope.data = JSON.stringify(response.data, null, 2);
                $scope.statusInfo = JSON.stringify(response.status, null, 2);
            }).catch(function(response) {
                $scope.status = response.status;
                $scope.statusInfo = JSON.stringify(response.status, null, 2);
            });
        };
              
  
                    
}]);