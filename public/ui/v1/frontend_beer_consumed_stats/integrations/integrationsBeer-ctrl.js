/*global angular, Highcharts*/
/*global Chart */

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

    /*
    $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings").then(function(response) {
        $scope.datosUefa = response.data;
        $scope.status = response.status;
        console.log($scope.datosUefa);
    }, function(response) {
        $scope.datosUefa = response.data || 'Request failed';
        $scope.status = response.status;
    })
*/

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
            /*
            title: {
                text: 'API Companies, G03 Jesus Dominguez Tristancho:'
            },
            */
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



    // Google
    //API Uefa Club Rankings (Geochart)


    $http.get("https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats").then(function(response) {
        $http.get("https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings").then(function(response2) {
            var coun;
            var countryConsumition = [];
            var points = [];
            var googleChartData = [
                ["Region", "countryConsumition", "Points"]
            ];
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].year == 2017) { //año
                    coun = response2.data[i].country;
                    countryConsumition = response.data[i].countryConsumition; //consumo
                    for (var j = 0; j < response2.data.length; j++) {
                        if (response2.data[j].season == 2017) {
                            if (response.data[i].country == response2.data[j].country) {
                                points = response2.data[j].points;
                                googleChartData.push([coun, countryConsumition, points]);
                            }
                        }
                    }
                }
            }
            console.log(googleChartData);

            google.charts.load('current', {
                'packages': ['geochart'],
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);


            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable(googleChartData);
                var options = {
                    colorAxis: {
                        minValue: 0,
                        maxValue: 10
                    }
                };
                var chart = new google.visualization.GeoChart(document.getElementById('countryBeerMap'));
                chart.draw(data, options);
            }
        });
    });




    //HIGHCHARTS PIE

    $http.get("https://restcountries.eu/rest/v2/all").then(function(response) {

        var nameApi = response.data.map(function(d) { return d.name });
        var populationApi = response.data.map(function(d) { return d.population });
        //var companiesApi = response.data.map(function(d) { return d.numberOfCompanies });

        var tabla = [];

        for (var i = 0; i < nameApi.length; i++) {

            tabla.push({ name: nameApi[i], y: populationApi[i] });

        }
        Highcharts.chart('containerPublic', {
            chart: {
                type: 'area',

            },
            title: {
                text: 'API Public rest-countries:'
            },
            yAxis: {
                title: {
                    text: '(Millones)'
                },
                labels: {}
            },
            plotOptions: {
                area: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: 'Población',
                data: tabla

            }]
        });
    })


    /*
    $http.get("https://api.openbrewerydb.org/breweries").then(function(response) {


        var stateApi = [];
        var nameApi = [];

        for (var i = 0; i < response.data.length; i++) {
            if (!stateApi.includes(response.data[i].country)) {
                stateApi.push(response.data[i].country);
            }
        }

        for (var i = 0; i < stateApi.length; i++) {
            var num = 0;
            for (var j = 0; j < response.data.length; j++) {
                if (stateApi[i] == response.data[j].country) {
                    num = num + 1;
                }
            }
            nameApi.push(num);
        }

        /
            var stateApi = response.data.map(function(d) { return d.state });
            var nameApi = response.data.map(function(d) { return d.name });
            //var companiesApi = response.data.map(function(d) { return d.numberOfCompanies });
        /
        var tabla = [];

        for (var i = 0; i < stateApi.length; i++) {

            tabla.push({ name: stateApi[i], weight: nameApi[i] });

        }

        console.log(tabla);
        /  
        for (var i = 0; i < nameApi.length; i++) {
            var num = 0;
            for (var j = 0; j < response.data.length; j++) {
                if (nameApi[i] == response.data[j].stateApi) {
                    num = num + 1;
                }
            }
            stateApi.push(num);
        }
/
        //CHART.js
        var ctx = document.getElementById('APIPublicBrewery');
        var APIPublicBrewery = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
                datasets: [{
                    label: '# Nombre',
                    data: [nameApi[0],nameApi[1],nameApi[2],nameApi[3]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 4)',
                        'rgba(54, 162, 235, 4)',
                        'rgba(255, 206, 86, 4)',
                        'rgba(75, 192, 192, 4)',
                        'rgba(153, 102, 255, 4)',
                        'rgba(255, 159, 64, 4)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })
    */


    //API Public
    /*
    Highcharts.chart('containerArea', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'US and USSR nuclear stockpiles'
    },
    xAxis: {
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        }
    },
    yAxis: {
        title: {
            text: 'Nuclear weapon states'
        },
        labels: {
            formatter: function () {
                return this.value / 1000 + 'k';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    plotOptions: {
        area: {
            pointStart: 1940,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'USA',
        data: [
            null, null, null, null, null, 6, 11, 32, 110, 235,
            369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
            20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
            26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
            21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
            10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
            5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
        ]
    }, {
        name: 'USSR/Russia',
        data: [null, null, null, null, null, null, null, null, null, null,
            5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
            1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
            11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
            30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
            37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
            21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
            12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
        ]
    }]
});
*/
}]);
