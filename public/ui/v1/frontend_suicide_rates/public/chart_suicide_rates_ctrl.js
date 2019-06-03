/*global angular Highcharts google*/

angular
    .module("FrontEnd")
    .controller("ChartSuicideRatesCtrl",["$scope","$http", function($scope,$http){
        //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA CARGAR LOS DATOS ACTUALMENTE EN LA BASE DE DATOS
        const URL = "/api/v1/suicide-rates";
        
        $http.get(URL).then(function(res){
            
                console.log("[Suicide Rates] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                
                if(Array.isArray(res.data)) {
                    $scope.suicide_rates = res.data;
                } else {
                    $scope.suicide_rates = [res.data];
                }
                
            }, function(err){
                
                switch(err.status){
                    
                    case 404:
                        console.log("[Suicide Rates] FATAL ERROR !! " 
                                    + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                    + '\n' + '\t' + "Resource not found in DataBase.");
                        $scope.systemResponse = "[CARGAR DATOS INICIALES]"+'\n'+
                                                    "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                    '\t'+"No se puede actualizar la tabla de recursos correctamente."+'\n'+
                                                    '\t'+"Si estas intantado acceder a algún/os recurso/s, éste/os no se encuentra/n en la tabla de recursos actual."+'\n'+
                                                    '\t'+"Por favor, prueba a recargar la página para obtener el estado actual de la tabla de recursos."+'\n'+
                                                    '\t'+"Si el problema persiste, contacte con el administrador del sitio.";
                        break;
                    
                    default:
                        console.log("[Suicide Rates] FATAL ERROR !! " 
                                    + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                    + '\n' + '\t' + err);
                        break;
                    
                }
                
            }
        ).then(function(){
                
                var countriesHighChart = [];
                var dataset_highcharts_suicide_rates = 
                    [
                        {
                        name: 'Suicidios Masculinos',
                        data: []
                        },
                        {
                        name: 'Suicidios Femeninos',
                        data: []
                        },
                        {
                        name: 'Promedio de Suicidios',
                        data: []
                        }
                    ];
                var dataset_d3charts_suicide_rates = [{x: 0, promedio: 0, suicidios_masculinos: 0, suicidios_femeninos: 0}];
                var dataset_geochart_suicide_rates = [['País', 'Promedio de Suicidios']];
                var suicide_rates = $scope.suicide_rates;
                var country_leyend = [];
                
                var countryDiccionary = {
                    "hong-kong": "Hong Kong",
                    "groenlandia": "Greenland",
                    "corea-del-sur": "South Korea",
                    "hungria": "Hungary",
                    "paraguay": "Paraguay",
                    "guatemala": "Guatemala",
                    "mexico": "Mexico",
                    "cuba": "Cuba",
                    "republica-dominicana": "Dominican Republic",
                    "republica-checa": "Czech Republic",
                    "suiza": "Switzerland",
                    "bulgaria": "Bulgaria",
                    "suecia": "Sweden",
                    "rumania": "Romania"
                }


                //GENERACIÓN DE DATASETS Y LEYANDA PARA D3-CHARTS
                for (var i=0; i<suicide_rates.length; i++){
                    
                    var average = (suicide_rates[i].noSuicidesMan+suicide_rates[i].noSuicidesWoman)/2;
                    
                    //Modelado para HighCharts
                    countriesHighChart.push(suicide_rates[i].country);
                    dataset_highcharts_suicide_rates[0].data.push(suicide_rates[i].noSuicidesMan);
                    dataset_highcharts_suicide_rates[1].data.push(suicide_rates[i].noSuicidesWoman);
                    dataset_highcharts_suicide_rates[2].data.push(average);
                    
                    //Modelado de datos para Geochart
                    var inputGeoData = [countryDiccionary[suicide_rates[i].country], average];
                    dataset_geochart_suicide_rates.push(inputGeoData);
                    
                    //Modelado de datos para d3-charts
                    var inputD3Data = {
                        x: i,
                        promedio: average,
                        suicidios_masculinos: suicide_rates[i].noSuicidesMan,
                        suicidios_femeninos:suicide_rates[i].noSuicidesWoman
                    };
                    dataset_d3charts_suicide_rates.push(inputD3Data);
                    
                    //Modelado de datos para la Leyenda
                    country_leyend.push({id: i, country: suicide_rates[i].country});
                }
                
                $scope.country_leyend = country_leyend;
                
                
                //GRAFICA HIGHCHARTS
                Highcharts.chart('suicide-rates-highcharts', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Tasa de Suicidios por Países'
                    },
                    subtitle: {
                        text: 'Source: <a href="https://sos1819-04.herokuapp.com/#!/ui/v1/suicide-rates">' + 'Suicide Rates API</a>'
                    },
                    xAxis: {
                        categories: countriesHighChart,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Número de Suicidios'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                     '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: dataset_highcharts_suicide_rates
                });
                
                
                //GRÁFICA GEOCHARTS
                google.charts.load('current', {
                    'packages':['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyCMxXpbiaAO25fbCtjFW3OQk4PsQ7nWTx8'
                    }
                );
                
                google.charts.setOnLoadCallback(drawRegionsMap);
            
                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable(
                        dataset_geochart_suicide_rates
                    );
            
                    var options = {};
            
                    var chart = new google.visualization.GeoChart(document.getElementById('suicide-rates-geochart'));
            
                    chart.draw(data, options);
                  }
                
                
                //GRÁFICA D3-CHARTS
                $scope.suicide_rates_data = {
                    dataset0: dataset_d3charts_suicide_rates
                };
        
                $scope.suicide_rates_options = {
                    margin: {top: 5},
                    
                    series: [
                        {
                            axis: "y",
                            dataset: "dataset0",
                            key: "suicidios_masculinos",
                            label: "Suicidios Masculinos",
                            color: "hsla(104, 73%, 42%, 1)",
                            type: ["dot", "line"],
                            id: 'serieSuicidiosMasculinos'
                        },
                        {
                            axis: "y",
                            dataset: "dataset0",
                            key: "suicidios_femeninos",
                            label: "Suicidios Femeninos",
                            color: "hsla(306, 48%, 48%, 1)",
                            type: ["dot", "line"],
                            id: 'serieSuicidiosFemeninos'
                        },
                        {
                            axis: "y",
                            dataset: "dataset0",
                            key: "promedio",
                            label: "Promedio de Suicidios",
                            color: "hsla(190, 73%, 42%, 1)",
                            type: ["dot", "line", "area"],
                            id: 'seriePromedioSuicidios'
                        }
                    ],
                    
                    //No Mostrar los valores de los ejes reptidos
                    grid: {
                        x: false,
                        y: false
                    },
                    
                    //Márgenes de la Gráfica
                    margin: {
                        bottom: 40,
                        left: 40
                    },
                    
                    //Formatero de Ejes
                    axes: {
                        x: {
                            key: "x",
                            padding: {min:10, max:10}
                        },
                        y: {
                            min: 0,
                            max: 120,
                            padding: {min:1, max: 10},
                          }
                    },
                    
                    //Resetear Zoom con Doble Click
                    doubleClickEnabled: false
                };
            }
        );
        
                
                
                
                
            }
        ]
    );

