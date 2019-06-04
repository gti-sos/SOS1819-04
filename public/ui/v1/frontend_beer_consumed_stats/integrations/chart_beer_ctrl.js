/*global angular */
/*global Highcharts */
/*global google */
/*global Chart */

angular
    .module("FrontEnd")
    .controller("ChartBeerConsumedCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Beeeeeer grafica ctrl Initialized!");

        var API = "/api/v1/beer-consumed-stats";


        var countries = [];
        var years = [];
        var rating = [];
        var variation = [];
        var countryConsumition = [];

        var data = [];

        $http.get(API).then(function(response) {

            countries = response.data.map(function(d) { return d.country });
            years = response.data.map(function(d) { return d.year });
            rating = response.data.map(function(d) { return d.rating });
            variation = response.data.map(function(d) { return d.variation });
            countryConsumition = response.data.map(function(d) { return d.countryConsumition });

            data = response.data;
            var chardata = [];
            //console.log(countryConsumition)
            var dataset_geochart_bc = [
                ['País', 'Consumo de Cerveza']
            ];
            var countryDiccionary = {
                    "Germany": "Germany",
                    "Spain": "Spain",
                    "France": "France",
                    "Georgia": "Georgia",
                    "United States": "United States"

                };

            var i = 0;
            var j = 0;
            for (i; i < countries.length; i++) {
                var dato = [countries[i], countryConsumition[i]];

                var inputGeoData = [countryDiccionary[dato[0]], dato[1]];
                dataset_geochart_bc.push(inputGeoData);
                if (dato[0] != undefined && dato[1] != undefined) {
                    chardata[j] = dato;
                    j++;
                }
            }



            //HIGHCHARTS-3D DONUT
            Highcharts.chart('container', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: 'Ranking de consumo mundial de cerveza'
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                series: [{
                    name: 'beer-consumed-score',
                    data: chardata

                }]
            });


            //GEOCHARTS     
            $http.get(API).then(function(response) {
                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });

                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {


                    console.log(dataset_geochart_bc);
                    var data = google.visualization.arrayToDataTable(dataset_geochart_bc);

                    var options = {
                        colorAxis: {
                            minValue: 0,
                            maxValue: 10
                        }
                    };

                    var chart = new google.visualization.GeoChart(document.getElementById('beer-consumed-stats-geochart'));

                    chart.draw(data, options);
                }
            });

            //  -----------------------



            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['France', 'United States', 'Germany', 'Spain', 'Georgia'],
                    datasets: [{
                        label: '# CountryConsumition',
                        data: [countryConsumition[0], countryConsumition[1], countryConsumition[2], countryConsumition[3], countryConsumition[4]],
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



        });
    }]);
