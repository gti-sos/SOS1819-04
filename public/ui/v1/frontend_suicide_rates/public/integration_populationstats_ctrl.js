/* global angular am4core am4charts am4themes_animated*/

angular
    .module("FrontEnd")
    .controller("IntegrationPopulationStatsCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Population Stats Integration] INTEGRATION Biofuel Productions Main Controller initialized.");
                
                const URL1 = "/api/v1/suicide-rates/proxy-populationstats";
                const URL2 = "/api/v1/suicide-rates";
                
                var suicide_rates;
                var populationstats;
                var chart_countries = new Set();
                var chart_countries_dataset = [];
                
                var dataset_integration = [
                    {
                        "country": "Dummy",
                        "disabled": true,
                        "litres": 1000,
                        "color": am4core.color("#dadada"),
                        "opacity": 0.3,
                        "strokeDasharray": "4,4"
                    }
                ];
                    
                $http.get(URL1).then(function(res){
                    
                        console.log("[Population Stats Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                        
                        if(Array.isArray(res.data)) {
                            $scope.populationstats = res.data;
                        } else {
                            $scope.populationstats = [res.data];
                        }
                        
                        populationstats = $scope.populationstats;
                        
                        
                    }, function(err){
                        
                        switch(err.status){
                            
                            case 404:
                                console.log("[Population Stats Integration] FATAL ERROR !! " 
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
                                console.log("[Population Stats Integration] FATAL ERROR !! " 
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
                                for (var j=0; j<populationstats.length; j++){
                                    chart_countries.add(populationstats[j].country);
                                }
                                
                                chart_countries.forEach( (c) => {
                                        chart_countries_dataset.push(c);
                                    }
                                );
                                
                                //CREACIÓN DEL DATASET PARA LA GRÁFICA
                                for (var i=0; i<suicide_rates.length; i++){
                                    
                                    var average = (suicide_rates[i].noSuicidesMan+suicide_rates[i].noSuicidesWoman)/2;
                                    var inputChartData = {
                                        "country": "S: " + suicide_rates[i].country,
                                        "litres": average
                                            
                                    }
                                    
                                    dataset_integration.push(inputChartData);
                                    
                                }
                                
                                for (var j=0; j<populationstats.length; j++){
                                    
                                    var inputChartData = {
                                        "country": "P: " + populationstats[j].country,
                                        "litres": populationstats[j].accesstoelectricity
                                    }
                                    
                                    dataset_integration.push(inputChartData);
                                            
                                }
                                
                                console.log(dataset_integration);
                                
                            }
                        ).then(function(){
                            
                                //GRÁFICA AMCHARTS
                                am4core.ready(function() {
                                
                                        // Themes begin
                                        am4core.useTheme(am4themes_animated);
                                        // Themes end
                                        
                                        // Create chart instance
                                        var chart = am4core.create("chart-integration", am4charts.PieChart);
                                        
                                        // Add data
                                        chart.data = dataset_integration;
                                        
                                        // Set inner radius
                                        chart.innerRadius = am4core.percent(50);
                                        
                                        // Add and configure Series
                                        var pieSeries = chart.series.push(new am4charts.PieSeries());
                                        pieSeries.dataFields.value = "litres";
                                        pieSeries.dataFields.category = "country";
                                        pieSeries.slices.template.stroke = am4core.color("#fff");
                                        pieSeries.slices.template.strokeWidth = 2;
                                        pieSeries.slices.template.strokeOpacity = 1;
                                        
                                        // This creates initial animation
                                        pieSeries.hiddenState.properties.opacity = 1;
                                        pieSeries.hiddenState.properties.endAngle = -90;
                                        pieSeries.hiddenState.properties.startAngle = -90;
                                        
                                        }
                                );
                                
                            }
                            
                        );
                    
                    }
                );
                    
                
                
                
            }
        ]
    );