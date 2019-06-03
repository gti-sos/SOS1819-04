/* global angular */

angular
    .module("FrontEnd")
    .controller("IntegrationBiofuelProductionsCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Biofuel Productions Integration] INTEGRATION Biofuel Productions Main Controller initialized.");
                
                const URL1 = "/api/v1/suicide-rates/proxy-biofuel-productions";
                const URL2 = "/api/v1/suicide-rates";
                
                var suicide_rates;
                var biofuel_productions;
                var chart_countries = new Set();
                var chart_countries_dataset = [];
                
                var dataset_integration = [{x: 0,  promedio_suicidios: 0.0, biodiesel: 0.0}];
                    
                $http.get(URL1).then(function(res){
                    
                        console.log("[Biofuel Productions Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                        
                        if(Array.isArray(res.data)) {
                            $scope.biofuel_productions = res.data;
                        } else {
                            $scope.biofuel_productions = [res.data];
                        }
                        
                        biofuel_productions = $scope.biofuel_productions;
                        
                    }, function(err){
                        
                        switch(err.status){
                            
                            case 404:
                                console.log("[Biofuel Productions Integration] FATAL ERROR !! " 
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
                                console.log("[Biofuel Productions Integration] FATAL ERROR !! " 
                                            + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                            + '\n' + '\t' + err);
                                break;
                            
                        }
                        
                    }
                ).then(function(){
                    
                        $http.get(URL2).then(function(res){
        
                                console.log("[Suicide Rates] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                                
                                if(Array.isArray(res.data)) {
                                    $scope.suicide_rates = res.data;
                                } else {
                                    $scope.suicide_rates = [res.data];
                                }
                                
                                suicide_rates = $scope.suicide_rates;
                                
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
                        
                                //CREACIÓN DE LEYENDA DE PAÍSES PARA LA GRÁFICA
                                //Suicide-Rates
                                for (var i=0; i<suicide_rates.length; i++){
                                    chart_countries.add(suicide_rates[i].country);
                                }
                                //Api-Scorers
                                for (var j=0; j<biofuel_productions.length; j++){
                                    chart_countries.add(biofuel_productions[j].country);
                                }
                                
                                chart_countries.forEach( (c) => {
                                        chart_countries_dataset.push(c);
                                    }
                                );
                                
                                //CREACIÓN DEL DATASET PARA LA GRÁFICA
                                
                                for(var k=0; k<chart_countries_dataset.length; k++){
                                    
                                    var inputChartData = {
                                        x: k+1,
                                        promedio_suicidios: 0.0,
                                        biodiesel: 0.0
                                    };
                                    
                                    for (var i=0; i<suicide_rates.length; i++){
                                        
                                        if(chart_countries_dataset[k] === suicide_rates[i].country){
                                            var average1 = (suicide_rates[i].noSuicidesMan+suicide_rates[i].noSuicidesWoman)/2;
                                            inputChartData.promedio_suicidios = average1;
                                            break;
                                        }
                                                
                                    }
                                    
                                    for (var j=0; j<biofuel_productions.length; j++){
                                        
                                        if(chart_countries_dataset[k] === biofuel_productions[j].country){
                                            var biodiesel_production = parseInt(biofuel_productions[j].biodiesel);
                                            inputChartData.biodiesel = biodiesel_production;
                                            break;
                                        }
                                                
                                    }
                                    
                                    dataset_integration.push(inputChartData);
                                    
                                }
                                
                                console.log(dataset_integration);
                                
                            }
                        ).then(function(){
                            
                                //GRÁFICA D3-CHARTS
                                $scope.integration_data = {
                                    dataset0: dataset_integration
                                };
                                
                                $scope.integration_options = {
                                    margin: {top: 5},
                                    series: [
                                        {
                                            axis: "y",
                                            dataset: "dataset0",
                                            key: "promedio_suicidios",
                                            label: "Promedio de Suicidios",
                                            color: "hsla(104, 73%, 42%, 1)",
                                            type: ["dot", "line", "area"],
                                            id: 'seriePromedioSuicidios'
                                        },
                                        {
                                            axis: "y",
                                            dataset: "dataset0",
                                            key: "biodiesel",
                                            label: "Prducción de Biodiesel",
                                            color: "hsla(306, 48%, 48%, 1)",
                                            type: ["dot", "line", "area"],
                                            id: 'seriePromedioGoles',
                                            defined: function(value) {
                                                return value.y1 !== undefined;
                                            }
                                        }
                                    ],
                                    axes: {x: {key: "x"}}
                                };

                            }
                        );
                    
                    }
                );
                    
                
                
                
            }
        ]
    );