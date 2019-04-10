/* global angular $scope*/

var app = angular.module("MiniPostmanApp");
console.log("MiniPostmanApp initialized!");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("MainCtrl initialized!");
    $scope.url = "/api/v1/beer-consumed-stats";

    $scope.send = function() {
        $http.get($scope.url).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    }
    $scope.loadInitial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    }
    $scope.delete = function() {
        $http.delete($scope.url).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
        });
    }
    
}]);
