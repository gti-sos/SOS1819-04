/* global angular $scope*/

var app = angular.module("MiniPostmanApp");
console.log("MiniPostmanApp initialized!");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Scorers MainCtrl Initialized!");
    $scope.url = "https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats";

    $scope.send = function() {
        $http.get($scope.url).then(function(response) {
            $scope.status = response.status;
            $scope.data = JSON.stringify(response.data, null, 2);
        }, function(error) {
            $scope.status = error.status;
            $scope.data = "";
        });
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

        $scope.post = function() {
            $http.post($scope.url, $scope.data).then(function(response) {
                $scope.status = response.status;
                $scope.data = "";
            }, function(error) {
                $scope.status = error.status;
                $scope.data = "";
            });
        };

        $scope.put = function() {
            $http.put($scope.url, $scope.data).then(function(response) {
                $scope.status = response.status;
                $scope.data = "";
            }, function(error) {
                $scope.status = error.status;
                $scope.data = "";
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
    }
}]);
