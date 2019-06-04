/*global angular*/

angular.module("FrontEnd").
controller("HealthIntegrationsHSCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
        $http.get("/api/v1/happiness-stats/proxy-integrations-health").then(function(response) {
        $scope.datosHealth= response.data;
        $scope.status = response.status;
        console.log($scope.datosHealth);
    }, function(response) {
        $scope.datosHealth = response.data || 'Request failed';
        $scope.status = response.status;
    });
}]);