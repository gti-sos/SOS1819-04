/*global angular*/

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
                
                //$scope.systemResponse = "¡SE HAN ACTUALIZADO LOS DATOS DE LA TABLA DE RECURSOS SATISFACTORIAMENTE!.";
                
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
                
                var dataset_suicide_rates = [{x: 0, promedio: 0, suicidios_masculinos: 0, suicidios_femeninos: 0}];
                var suicide_rates = $scope.suicide_rates;
                var country_leyend = [];
                for (var i=0; i<suicide_rates.length; i++){
                    var average = (suicide_rates[i].noSuicidesMan+suicide_rates[i].noSuicidesWoman)/2;
                    var inputData = {
                        x: i,
                        promedio: average,
                        suicidios_masculinos: suicide_rates[i].noSuicidesMan,
                        suicidios_femeninos:suicide_rates[i].noSuicidesWoman
                    };
                    
                    country_leyend.push({id: i, country: suicide_rates[i].country});
                    $scope.country_leyend = country_leyend;
                    dataset_suicide_rates.push(inputData);
                }
                
                console.log(dataset_suicide_rates);
                
                $scope.suicide_rates_data = {
                    dataset0: dataset_suicide_rates
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
                    
                    //Permitir Zoom
                    zoom: {
                        x: true,
                        y: true
                    },
                    
                    //Resetear Zoom con Doble Click
                    doubleClickEnabled: false
                };
                
                Highcharts.chart('suicide-rates-highcharts', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'US and USSR nuclear stockpiles'
                    },
                    subtitle: {
                        text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
                            'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
                            'armscontrol.org</a>'
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
                
            }
        );
        
                
                
                
                
            }
        ]
    );

