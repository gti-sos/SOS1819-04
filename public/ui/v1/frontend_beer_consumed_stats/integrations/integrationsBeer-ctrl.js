/*global angular, Highcharts*/

angular.module("FrontEnd").
controller("integrationsBeerCtrl", ["$scope", "$http", "$httpParamSerializer", function($scope, $http, $httpParamSerializer) {

    //API Companies - tengo que elegir si esto (uso) o la gráfica de abajo.
    /*
    $http.get("https://sos1819-03.herokuapp.com/api/v1/companies").then(function(response) {
        $scope.datosCompanies = response.data;
        $scope.status = response.status;
        console.log($scope.datosCompanies);
    }, function(response) {
        $scope.datosCompanies = response.data || 'Request failed';
        $scope.status = response.status;
    })
    */
    
    //API Uefa Club Rankings

    $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings").then(function(response) {
        $scope.datosUefa = response.data;
        $scope.status = response.status;
        console.log($scope.datosUefa);
    }, function(response) {
        $scope.datosUefa = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
    //API Suicide Rates

    $http.get("https://sos1819-04.herokuapp.com/api/v1/suicide-rates").then(function(response) {
        $scope.datosSuicide = response.data;
        $scope.status = response.status;
        console.log($scope.datosSuicide);
    }, function(response) {
        $scope.datosSuicide = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
    //API Public Expend Education

    $http.get("https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations").then(function(response) {
        $scope.datosEducation = response.data;
        $scope.status = response.status;
        console.log($scope.datosEducation);
    }, function(response) {
        $scope.datosEducation = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
    //API deceaseds

    $http.get("https://sos1819-14.herokuapp.com/api/v1/deceaseds").then(function(response) {
        $scope.datosdece = response.data;
        $scope.status = response.status;
        console.log($scope.datosdece);
    }, function(response) {
        $scope.datosdece = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
    //API Climate Stats

    $http.get("https://sos1819-09.herokuapp.com/api/v2/climate-stats").then(function(response) {
        $scope.datosclimate = response.data;
        $scope.status = response.status;
        console.log($scope.datosclimate);
    }, function(response) {
        $scope.datosclimate = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
    //API Climate Stats 

    $http.get("https://sos1819-02.herokuapp.com/api/v1/companies-stats/").then(function(response) {
        $scope.datoscomp = response.data;
        $scope.status = response.status;
        console.log($scope.datoscomp);
    }, function(response) {
        $scope.datoscomp = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
    //API Tourist By Countries (proxy, en index.js de api/v1)
    
    
    $http.get("/api/v1/beer-consumed-stats/proxy-api-tourists").then(function(response) {
        $scope.datostourist = response.data;
        $scope.status = response.status;
        console.log($scope.datostourist);
    }, function(response) {
        $scope.datostourist = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
    //API publica
    
    $http.get("https://restcountries.eu/rest/v2/all").then(function(response) {
        $scope.datosCountrs = response.data;
        $scope.status = response.status;
        console.log($scope.datosCountrs);
    }, function(response) {
        $scope.datosCountrs = response.data || 'Request failed';
        $scope.status = response.status;
    })
    
    //API Publica Brewery db
    
    $http.get("https://api.openbrewerydb.org/breweries").then(function(response) {
        $scope.datosBrewery = response.data;
        $scope.status = response.status;
        console.log($scope.datosBrewery);
    }, function(response) {
        $scope.datosBrewery = response.data || 'Request failed';
        $scope.status = response.status;
    })
    


    //HIGHCHARTS API Companies
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
                text: 'API Companies, G03 Jesus Dominguez Tristancho:'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Número de compañías'
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
