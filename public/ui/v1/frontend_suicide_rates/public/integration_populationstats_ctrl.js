/* global angular */

angular
    .module("FrontEnd")
    .controller("IntegrationPopulationStatsCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Population Stats Integration] INTEGRATION Biofuel Productions Main Controller initialized.");
                
                var URL = "/api/v1/suicide-rates/proxy-populationstats";
                var URL_BASE = "/api/v1/suicide-rates/proxy-populationstats";
                
                refresh(URL_BASE);
                
                //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA MOSTRAR LO QUE SE ENCUENTRA ACTUALMENTE EN LA BASE DE DATOS
                function refresh(URL){
                    
                    $http.get(URL).then(function(res){
                        
                            console.log("[Population Stats Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                            
                            if(Array.isArray(res.data)) {
                                $scope.populationstats = res.data;
                            } else {
                                $scope.populationstats = [res.data];
                            }
                            
                            
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
                    );
                    
                }
                
                
            }
        ]
    );