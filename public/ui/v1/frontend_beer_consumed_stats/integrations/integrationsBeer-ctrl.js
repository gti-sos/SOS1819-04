/*global angular, Highcharts*/

angular.module("FrontEnd").
controller("integrationsBeerCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //API Companies

    $http.get("https://sos1819-03.herokuapp.com/api/v1/companies").then(function(response) {
        $scope.datosCompanies = response.data;
        $scope.status = response.status;
        console.log($scope.datosCompanies);
    }, function(response) {
        $scope.datosCompanies = response.data || 'Request failed';
        $scope.status = response.status;
    })

    $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings").then(function(response) {
        $scope.datosUefa = response.data;
        $scope.status = response.status;
        console.log($scope.datosUefa);
    }, function(response) {
        $scope.datosUefa = response.data || 'Request failed';
        $scope.status = response.status;
    })


    //HIGHCHARTS
    $http.get("https://sos1819-03.herokuapp.com/api/v1/companies").then(function(response) {

        var paisesApi = response.data.map(function(d) { return d.country });
        var añosApi = response.data.map(function(d) { return d.year });
        var companiesApi = response.data.map(function(d) { return d.numberOfCompanies });

        var tabla = [];

        for (var i = 0; i < paisesApi.length; i++) {
            if (añosApi[i] == 2017) {
                tabla.push({ name: paisesApi[i], y: companiesApi[i] });
            }
        }

        // Create the chart
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Browser market shares. January, 2018'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
            },

            series: [{
                name: "Companies",
                colorByPoint: true,
                data: tabla
            }]
        });

    })

}]);
