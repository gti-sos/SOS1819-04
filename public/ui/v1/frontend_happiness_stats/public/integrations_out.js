/*global angular*/
angular.module("FrontEnd").
controller("IntegrationOutCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {
    
    var URL = "https://sos1819-04-sos1819amma.c9users.io/#!/ui/v1/happiness-stats/integrations-out";
    refresh(URL);
    
    function refresh(URL){
        $http.get("https://dog.ceo/api/breeds/image/random").then(function(response) {
        $scope.datosdogs = response.data;
        $scope.status = response.status;
        console.log($scope.datosdogs.message);
    }, function(response) {
        $scope.datosdogs = response.data || 'Request failed';
        $scope.status = response.status;
        
        
    });
    }
    
    $scope.anotherdogs = function(){
                    refresh(URL);
                }
}]);