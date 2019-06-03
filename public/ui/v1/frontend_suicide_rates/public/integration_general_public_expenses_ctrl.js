/* global angular am4core am4charts am4themes_animated*/

angular
    .module("FrontEnd")
    .controller("IntegrationGeneralPublicExpensesCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[General Public Expenses Integration] INTEGRATION Biofuel Productions Main Controller initialized.");
                
                const URL1 = "/api/v1/suicide-rates/proxy-general-public-expenses";
                const URL2 = "/api/v1/suicide-rates";
                
                var suicide_rates;
                var general_public_expenses;
                var chart_countries = new Set();
                var chart_countries_dataset = [];
                
                var dataset_integration = [
                    {
                      "pais": "",
                      "promedio_suicidios": 0,
                      "gasto_salud": 0
                    }
                ];
                    
                $http.get(URL1).then(function(res){
                    
                        console.log("[General Public Expenses Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                        
                        if(Array.isArray(res.data)) {
                            $scope.general_public_expenses = res.data;
                        } else {
                            $scope.general_public_expenses = [res.data];
                        }
                        
                        general_public_expenses = $scope.general_public_expenses;
                        
                    }, function(err){
                        
                        switch(err.status){
                            
                            case 404:
                                console.log("[General Public Expenses Integration] FATAL ERROR !! " 
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
                                console.log("[General Public Expenses Integration] FATAL ERROR !! " 
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
                                
                                //DICCIONARIO DE PAÍSES
                                var countriesEnEs = {
                                    "spain": "españa",
                                    "france": "francia",
                                    "italy": "italia",
                                    "united kingdom": "reino-unido"
                                }
                                
                                //CREACIÓN DEL DATASET PARA LA GRÁFICA
                                //CREACIÓN DE LEYENDA DE PAÍSES PARA LA GRÁFICA
                                //Suicide-Rates
                                for (var i=0; i<suicide_rates.length; i++){
                                    chart_countries.add(suicide_rates[i].country);
                                }
                                //General-Public-Expenses
                                for (var j=0; j<general_public_expenses.length; j++){
                                    chart_countries.add(countriesEnEs[general_public_expenses[j].country]);
                                }
                                
                                chart_countries.forEach( (c) => {
                                        chart_countries_dataset.push(c);
                                    }
                                );
                                
                                //CREACIÓN DEL DATASET PARA LA GRÁFICA
                                for(var k=0; k<chart_countries_dataset.length; k++){
                                    
                                    var inputChartData = {
                                        pais: chart_countries_dataset[k],
                                        promedio_suicidios: 0.0,
                                        promedio_goles: 0.0
                                    };
                                    
                                    for (var i=0; i<suicide_rates.length; i++){
                                        
                                        if(chart_countries_dataset[k] === suicide_rates[i].country){
                                            var average1 = (suicide_rates[i].noSuicidesMan+suicide_rates[i].noSuicidesWoman)/2;
                                            inputChartData.promedio_suicidios = average1;
                                            break;
                                        }
                                                
                                    }
                                    
                                    for (var j=0; j<general_public_expenses.length; j++){
                                        
                                        if(chart_countries_dataset[k] === countriesEnEs[general_public_expenses[j].country]){
                                            inputChartData.gasto_salud = general_public_expenses[j].healthExpense;
                                            break;
                                        }
                                                
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
                                        var chart = am4core.create("chart-integration", am4charts.XYChart);
                                        
                                        // Add data
                                        chart.data = dataset_integration;
                                        
                                        // Create axes
                                        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                                        categoryAxis.dataFields.category = "pais";
                                        categoryAxis.numberFormatter.numberFormat = "#";
                                        categoryAxis.renderer.inversed = true;
                                        categoryAxis.renderer.grid.template.location = 0;
                                        categoryAxis.renderer.cellStartLocation = 0.1;
                                        categoryAxis.renderer.cellEndLocation = 0.9;
                                        
                                        var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
                                        valueAxis.renderer.opposite = true;
                                        
                                        // Create series
                                        function createSeries(field, name) {
                                            var series = chart.series.push(new am4charts.ColumnSeries());
                                            series.dataFields.valueX = field;
                                            series.dataFields.categoryY = "pais";
                                            series.name = name;
                                            series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
                                            series.columns.template.height = am4core.percent(100);
                                            series.sequencedInterpolation = true;
                                            
                                            var valueLabel = series.bullets.push(new am4charts.LabelBullet());
                                            valueLabel.label.text = "{valueX}";
                                            valueLabel.label.horizontalCenter = "left";
                                            valueLabel.label.dx = 10;
                                            valueLabel.label.hideOversized = false;
                                            valueLabel.label.truncate = false;
                                            
                                            var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
                                            categoryLabel.label.text = "{name}";
                                            categoryLabel.label.horizontalCenter = "right";
                                            categoryLabel.label.dx = -10;
                                            categoryLabel.label.fill = am4core.color("#fff");
                                            categoryLabel.label.hideOversized = false;
                                            categoryLabel.label.truncate = false;
                                        }
                                        
                                        createSeries("promedio_suicidios", "Promedio de Suicidios");
                                        createSeries("gasto_salud", "Gasto en Salud");
                                        
                                    }
                                );
                                
                            }
                            
                        );
                    
                    }
                    
                );
                
                
            }
        ]
    );