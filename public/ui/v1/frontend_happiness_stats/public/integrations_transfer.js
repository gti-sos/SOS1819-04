/*global angular*/

angular.module("FrontEnd").
controller("TransferIntegrationsHSCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    

        $http.get("/api/v1/happiness-stats/proxy-integrations-transfer").then(function(response) {
        $scope.datosTransfer= response.data;
        $scope.status = response.status;
        console.log($scope.Transfer);
    }, function(response) {
        $scope.datosTransfer = response.data || 'Request failed';
        $scope.status = response.status;
    });
}]);