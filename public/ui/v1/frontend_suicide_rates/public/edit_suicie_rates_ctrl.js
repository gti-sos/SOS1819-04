/* global angular */

angular
    .module("FrontEnd")
    .controller("EditSuicideRatesCtrl",["$scope","$http", "$routeParams", "$location", function ($scope,$http,$routeParams,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA VISTA DE EDICIÓN "edit_suicide_rates_ctrl"
                console.log("[Suicide Rates] EDIT Suicide Rates Main Controller initialized.");
                
                var URL_BASE = "/api/v1/suicide-rates";
                
                $scope.page = 1;
                var limit = 10;
                var offset = 0;
                
                var country = $routeParams.country;
                var year = $routeParams.year;
                
                //CARGA DEL RECURSO QUE SE QUIERE EDITAR
                $http.get(URL_BASE+"/"+country+"/"+year).then(function(res){
                        
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
                    );
                
                //PROGRAMACIÓN DEL BOTÓN ACTUALIZAR RECURSO EXISTENTE "editSuicideRates(newSuicideRate)"
                $scope.editSuicideRates = function(inputSuicideRate){
                    
                    console.log("[Suicide Rates] PUT Request Received.");
                    $scope.systemRequest = "[EDITAR RECURSO EXISTENTE]"+'\n'+
                                            "Se ha realizado una petición para editar el recurso en la tabla de recursos con los siguientes identificadores:"+'\n'+
                                            '\t'+"·)País: "+inputSuicideRate.country+"."+'\n'
                                            '\t'+"·)Año: "+inputSuicideRate.year+"."+'\n'+
                                            "Los nuevos valores para las propiedades secundarias son:"+'\n'+
                                            '\t'+"·)No. Suidicios Masculinos: "+inputSuicideRate.noSuicidesMan+"."+'\n'
                                            '\t'+"·)No. Suidicios Femeninos: "+inputSuicideRate.noSuicidesWoman+"."+'\n'
                                            '\t'+"·)Ranking: "+inputSuicideRate.rank+".";
                    
                    var newSuicideRate = {};
                    newSuicideRate.country= inputSuicideRate.country;
                    newSuicideRate.year = parseInt(inputSuicideRate.year);
                    newSuicideRate.noSuicidesMan = parseFloat(inputSuicideRate.noSuicidesMan);
                    newSuicideRate.noSuicidesWoman = parseFloat(inputSuicideRate.noSuicidesWoman);
                    newSuicideRate.rank = parseInt(inputSuicideRate.rank);
                    
                    $http.put(URL_BASE+"/"+inputSuicideRate.country+"/"+inputSuicideRate.year, newSuicideRate).then(function(){
                            
                            console.log("[Suicide Rates] Editing DataBase Resource with following data." + '\n' +JSON.stringify(newSuicideRate, null, 2));
                            $scope.systemResponse = "[EDITAR RECURSO EXISTENTE]"+'\n'+
                                                    "Se ha editado el recurso solicitado satisfactoriamente."+'\n'+
                                                    "Salvo que haya una búsqueda activa que lo impida, el recurso editado ya se está mostrando en la tabla de recursos.";
                            $location.path("/ui/v1/suicide-rates");
                            
                        }, function(err){
                            
                            switch(err.status){
                                
                                case 400:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + "Incorrect input data, can not edit DataBase Resource.");
                                    $scope.systemResponse = "[EDITAR RECURSO EXISTENTE]"+'\n'+
                                                            "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                            '\t'+"Has introducido los datos para editar el recurso en la tabla con un formato incorrecto."+'\n'+
                                                            '\t'+"Por favor, verifica que se cumplen las siguientes condiciones:"+'\n'+
                                                            '\t'+'\t'+"·)Se han rellenado todos los campos requeridos."+'\n'+
                                                            '\t'+'\t'+"·)El campo 'País' es una cadena de letras (a-z, A-Z) y con guiones (-) en vez de espacios."+'\n'+
                                                            '\t'+'\t'+"·)El campo 'Año' es un número entero (sin decimales)."+'\n'+
                                                            '\t'+'\t'+"·)El campo 'No. Suidicios Masculinos' es un número entero o decimal (no se recomienda más de 2 cifras decimales)."+'\n'+
                                                            '\t'+'\t'+"·)El campo 'No. Suidicios Femeninos' es un número entero o decimal (no se recomienda más de 2 cifras decimales)."+'\n'+
                                                            '\t'+'\t'+"·)El campo 'Año' es un número entero (sin decimales).";
                                    break;
                                    
                                case 404:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + "Resource not found in DataBase.");
                                    $scope.systemResponse = "[EDITAR RECURSO EXISTENTE]"+'\n'+
                                                            "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                            '\t'+"El recurso que estás intentando editar no existe."+'\n'+
                                                            '\t'+"Por favor, prueba a recargar la página para obtener el estado actual de la tabla de recursos. Si el problema persiste, contacte con el administrador del sitio.";
                                    break;
                                
                                case 409:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + "Resource Bad Addressed.");
                                    $scope.systemResponse = "[EDITAR RECURSO EXISTENTE]"+'\n'+
                                                            "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                            '\t'+"Se está intentando editar un recurso con un identificador distinto al que se está referenciando."+'\n'+
                                                            '\t'+"Por favor, prueba a intentarlo de nuevo. Si el problema persiste, contacte con el administrador del sitio.";
                                    break;
                                
                                default:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + err);
                                    $scope.systemResponse = "[EDITAR NUEVO RECURSO]"+'\n'+
                                                            "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                            '\t'+"Ha ocurrido un error interno de la API."+'\n'+
                                                            '\t'+"Por favor, contacte con el administrador del sitio."+'\n'+
                                                            '\t'+'\t'+"·)Código de Error:"+err.status;
                                    break;
                                
                            }
                            
                        }
                    );
                    
                    
                }
            }
        ]
    );