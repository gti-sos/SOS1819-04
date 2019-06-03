/*global angular*/

angular.module("FrontEnd").
controller("integrationsHSCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    //JP- Cerveza
        $http.get("https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats").then(function(response) {
        $scope.datosBeer = response.data;
        $scope.status = response.status;
        console.log($scope.Beer);
    }, function(response) {
        $scope.datosBeer = response.data || 'Request failed';
        $scope.status = response.status;
    });
    
    //ALEJANDRO MARTIN - PELIS
    $http.get("https://sos1819-02.herokuapp.com/api/v1/movies-stats").then(function(response) {
        $scope.datosMovies = response.data;
        $scope.status = response.status;
        console.log($scope.datosMovies);
    }, function(response) {
        $scope.datosMovies = response.data || 'Request failed';
        $scope.status = response.status;
    });
    
    //JOAQUIN PUERTO - ATAQUES INFORMATICOS
        $http.get("https://sos1819-03.herokuapp.com/api/v1/computers-attacks-stats").then(function(response) {
        $scope.datosAttacks = response.data;
        $scope.status = response.status;
        console.log($scope.datosAttacks);
    }, function(response) {
        $scope.datosAttacks = response.data || 'Request failed';
        $scope.status = response.status;
    });
        
    //CRISTIAN JIMENEZ - EMIGRACION
        $http.get("https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries").then(function(response) {
        $scope.datosEmigrations = response.data;
        $scope.status = response.status;
        console.log($scope.Emigrations);
    }, function(response) {
        $scope.datosEmigrations = response.data || 'Request failed';
        $scope.status = response.status;
    });
        
    
    
    
}]);