/*global angular*/
angular.module("FrontEnd").
controller("IntegrationKayneCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    var URL = "https://sos1819-04-sos1819amma.c9users.io/#!/ui/v1/happiness-stats/integrations-kayne";
    refresh(URL);
    
    function refresh(URL){
        $http.get("https://api.kanye.rest").then(function(response) {
        $scope.datosKayne = response.data;
        $scope.status = response.status;
        console.log($scope.datosKayne.quote);
    }, function(response) {
        $scope.datosKayne = response.data || 'Request failed';
        $scope.status = response.status;
        
        
    });
    }
    
    $scope.anotherkayne = function(){
                    refresh(URL);
                }
}]);