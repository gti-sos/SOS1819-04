/*global angular*/

angular.module("FrontEnd").
controller("DioxidIntegrationsHSCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    //JP- Cerveza
        $http.get("/proxy-integrations-dioxid").then(function(response) {
        $scope.datosDioxid= response.data;
        $scope.status = response.status;
        console.log($scope.Dioxid);
    }, function(response) {
        $scope.datosDioxid = response.data || 'Request failed';
        $scope.status = response.status;
    });
}]);