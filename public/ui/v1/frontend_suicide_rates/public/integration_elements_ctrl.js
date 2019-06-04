/* global angular  FusionCharts*/

angular
    .module("FrontEnd")
    .controller("IntegrationElementsCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Elements Integration] INTEGRATION Elements Main Controller initialized.");
                
                const URL1 = "/api/v1/suicide-rates/proxy-elements";
                const URL2 = "/api/v1/suicide-rates";
                
                var suicide_rates;
                var elements;
                var chart_countries = new Set();
                var chart_countries_dataset = [];
                var countries_categories = [];
                var dataset_integration = [
                    {
                        seriesname: "PromedioSuicidios", 
                        data: []
                        
                    }, {
                        seriesname: "NumeroEquipos", 
                        data: []
                        
                    }
                ];
                    
                $http.get(URL1).then(function(res){
                    
                        console.log("[Elements Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                        
                        if(Array.isArray(res.data)) {
                            $scope.elements = res.data;
                        } else {
                            $scope.elements = [res.data];
                        }
                        
                        elements = $scope.elements;
                        
                        
                    }, function(err){
                        
                        switch(err.status){
                            
                            case 404:
                                console.log("[Elements Integration] FATAL ERROR !! " 
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
                                console.log("[Elements Integration] FATAL ERROR !! " 
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
                                for (var j=0; j<elements.length; j++){
                                    chart_countries.add(elements[j].province);
                                }
                                
                                chart_countries.forEach( (c) => {
                                        var category = {label: c};
                                        countries_categories.push(category);
                                        chart_countries_dataset.push(c);
                                    }
                                );
                                
                                //CREACIÓN DEL DATASET PARA LA GRÁFICA
                                var space = true;
                                for(var k=0; k<chart_countries_dataset.length; k++){
                                    
                                    space = true;
                                    for (var i=0; i<suicide_rates.length; i++){
                                        
                                        if(chart_countries_dataset[k] === suicide_rates[i].country){
                                            var average = (suicide_rates[i].noSuicidesMan+suicide_rates[i].noSuicidesWoman)/2;
                                            dataset_integration[0].data.push({"value": average});
                                            space = false;
                                            break;
                                        }
                                                
                                    }
                                    if(space) dataset_integration[0].data.push(0);
                                    
                                    space = true;
                                    for (var j=0; j<elements.length; j++){
                                        
                                        if(chart_countries_dataset[k] === elements[j].province){
                                            dataset_integration[1].data.push({"value": elements[j].accidentswithvictims});
                                            space = false;
                                            break;
                                        }
                                                
                                    }
                                    if(space) dataset_integration[1].data.push(0);
                                    
                                }
                                console.log(dataset_integration);
                                
                            }
                        ).then(function(){
                            
                                //GRÁFICA FUSION-CHARTS
                                const dataSource = {
                                    chart: {
                                        caption: "Promedio de Suicidios - Ranking de Países con Equipos en la Uefa.",
                                        yaxisname: "Suicidios - Número de Equipos",
                                        subcaption: "",
                                        showhovereffect: "1",
                                        numbersuffix: "Uds",
                                        drawcrossline: "1",
                                        plottooltext: "<b>$dataValue</b> Unidades en $seriesName",
                                        theme: "fusion"
                                    },
                                    categories: [
                                        {
                                            category: countries_categories
                                        }
                                    ],
                                    
                                    dataset: dataset_integration
                                };
                                
                                FusionCharts.ready(function() {
                                        var myChart = new FusionCharts({
                                                type: "msarea",
                                                renderAt: "chart-integration",
                                                width: "100%",
                                                height: "100%",
                                                dataFormat: "json",
                                                dataSource
                                            }
                                        ).render();
                                    }
                                );

                                
                            }
                        );
                    
                    }
                );
                
            }
        ]
    );