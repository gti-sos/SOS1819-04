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
                
            }
        );
        
                
                
                
                
            }
        ]
    );

