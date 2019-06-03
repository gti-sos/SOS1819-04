/* global angular Morris*/

angular
    .module("FrontEnd")
    .controller("IntegrationHappinessStatsCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Happiness Stats Integration] INTEGRATION Biofuel Productions Main Controller initialized.");
                
                const URL1 = "/api/v1/suicide-rates/proxy-happiness-stats";
                const URL2 = "/api/v1/suicide-rates";
                
                var suicide_rates;
                var happiness_stats;
                var chart_countries = new Set();
                var chart_countries_dataset = [];
                
                var dataset_integration = [{ciudad: 0,  promedio_suicidios: 0.0, felicidad: 0.0}];
                
                    
                $http.get(URL1).then(function(res){
                    
                        console.log("[Happiness Stats Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                        
                        if(Array.isArray(res.data)) {
                            $scope.happiness_stats = res.data;
                        } else {
                            $scope.happiness_stats = [res.data];
                        }
                        
                        happiness_stats = $scope.happiness_stats
                        
                        
                    }, function(err){
                        
                        switch(err.status){
                            
                            case 404:
                                console.log("[Happiness Stats Integration] FATAL ERROR !! " 
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
                                console.log("[Happiness Stats Integration] FATAL ERROR !! " 
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
                                for (var j=0; j<happiness_stats.length; j++){
                                    chart_countries.add(happiness_stats[j].country);
                                }
                                
                                chart_countries.forEach( (c) => {
                                        chart_countries_dataset.push(c);
                                    }
                                );
                                
                                //CREACIÓN DEL DATASET PARA LA GRÁFICA
                                
                                for(var k=0; k<chart_countries_dataset.length; k++){
                                    
                                    var inputChartData = {
                                        ciudad: k+1,
                                        promedio_suicidios: 0.0,
                                        felicidad: 0.0
                                    };
                                    
                                    for (var i=0; i<suicide_rates.length; i++){
                                        
                                        if(chart_countries_dataset[k] === suicide_rates[i].country){
                                            var average1 = (suicide_rates[i].noSuicidesMan+suicide_rates[i].noSuicidesWoman)/2;
                                            inputChartData.promedio_suicidios = average1;
                                            break;
                                        }
                                                
                                    }
                                    
                                    for (var j=0; j<happiness_stats.length; j++){
                                        
                                        if(chart_countries_dataset[k] === happiness_stats[j].country){
                                            var ratio_felicidad = parseInt(happiness_stats[j].happinessScore);
                                            inputChartData.felicidad = ratio_felicidad;
                                            break;
                                        }
                                                
                                    }
                                    
                                    dataset_integration.push(inputChartData);
                                    
                                }
                                
                                console.log(dataset_integration);
                                
                            }
                        ).then(function(){
                            
                                //GRÁFICA MORRIS.JS
                                new Morris.Line({
                                        // ID del elemento dond se va a dibujar la Gráfica
                                        element: 'chart-integration',
                                        // Dataset usado por la Gráfica
                                        data: dataset_integration,
                                        // Nombre del Eje x en el Dataset
                                        xkey: 'ciudad',
                                        // Nombre del Eje y en el Dataset
                                        ykeys: ['promedio_suicidios','felicidad'],
                                        // Nombre del Eje x en el Dataset que se mostrará al ponerse sobre el dato
                                        labels: ['promedio_suicidios','felicidad']
                                    }
                                );
                                
                                
                            }
                        );
                    
                    }
                );
                
                
            }
        ]
    );