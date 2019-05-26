/* global angular */

var apiBCS = "https://sos181903-sos1819jdt.c9users.io/api/v1/companies";

    //API JSON

    $http.get(apiBCS).then(function(response) {
        $scope.data = JSON.stringify(response.data, null, 2);
        $scope.status = response.status;
    }, function(response) {
        $scope.data = response.data || 'Request failed';
        $scope.status = response.status;
    })