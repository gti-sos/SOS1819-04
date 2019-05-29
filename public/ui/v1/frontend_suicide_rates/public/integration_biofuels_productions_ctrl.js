/* global angular */

angular
    .module("FrontEnd")
    .controller("IntegrationBiofuelProductionsCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Biofuel Productions Integration] INTEGRATION Biofuel Productions Main Controller initialized.");
                
                $scope.page = 1;
                var limit = 10;
                var offset = 0;
                
                var URL = "/api/v1/suicide-rates/proxy-biofuel-productions";
                var URL_BASE = "/api/v1/suicide-rates/proxy-biofuel-productions";
                
                refresh(URL_BASE);
                
                //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA MOSTRAR LO QUE SE ENCUENTRA ACTUALMENTE EN LA BASE DE DATOS
                function refresh(URL){
                    
                    $http.get(URL+"?offset="+offset+"&limit="+limit).then(function(res){
                        
                            console.log("[Biofuel Productions Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                            
                            if(Array.isArray(res.data)) {
                                $scope.biofuel_productions = res.data;
                            } else {
                                $scope.biofuel_productions = [res.data];
                            }
                            
                            
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
                    );
                    
                }
                
                
                //PROGRAMACIÓN DE LOS BOTONES DE PAGINACIÓN "previusPage()" y "nextPage()"
                $scope.previusPage = function(){
                    
                    if(offset!=0){
                        $scope.page-=1;
                        limit-=10;
                        offset-=10;
                    }
                    
                    refresh(URL);
                    
                }
                
                $scope.nextPage = function(){
                    
                    $scope.page = $scope.page + 1;
                    limit = limit + 10;
                    offset = offset + 10;
                    refresh(URL);
                    
                }
            }
        ]
    );