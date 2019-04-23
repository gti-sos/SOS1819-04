/* global angular */

angular
    .module("SuicideRatesFrontEnd")
    .controller("MainCtrl",["$scope","$http", function ($scope,$http){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL "MainCtrl"
                console.log("[Suicide Rates] Suicide Rates Main Controller initialized.");
                
                $scope.page = 1;
                var limit = 9;
                var offset = 0;
                
                var URL = "/api/v1/suicide-rates";
                var URL_BASE = "/api/v1/suicide-rates";
                
                refresh(URL_BASE);
                
                //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA MOSTRAR LO QUE SE ENCUENTRA ACTUALMENTE EN LA BASE DE DATOS
                function refresh(URL){
                    
                    $http.get(URL+"?limit="+limit+"&offset="+offset).then(function(res){
                        
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
                    
                }
                
                //PROGRAMACIÓN DEL BOTÓN DE CARGAR DATOS INICIALES "loadinitialDataSuicideRate()"
                $scope.loadinitialDataSuicideRate = function(){
                    
                    console.log("[Suicide Rates] GET LOADINITIALDATA Request Received.");
                    $scope.systemRequest = "[CARGAR DATOS INICIALES]"+'\n'+
                                            "Se ha realizado una petición para cargar un conjunto de recursos iniciales.";
                     
                    $http.get(URL_BASE+"/loadInitialData").then(function(){
                        
                            console.log("[Suicide Rates] Creating DataBase Resources");
                            $scope.systemResponse = "[CARGAR DATOS INICIALES]"+'\n'+
                                                    "Los recursos se han creado satisfactoriamente."
                            refresh();
                         
                        }, function(err){
                            
                            switch(err.status){
                                
                                case 409:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + "You can not do a 'loadInitialData' if DataBase not empty.");
                                    
                                    $scope.systemResponse = "[CARGAR DATOS INICIALES]"+'\n'+
                                                            "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                            '\t'+"La tabla de recursos no estaba vacía cuando se intentó cargar el conjunto de datos iniciales."+'\n'+
                                                            '\t'+"Por favor, asegurese de que ésto no vuelva a ocurrir pulsando previamente el botón 'ELIMINAR TODOS LOS DATOS'.";
                                    break;
                                    
                                default:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + err);
                                    $scope.systemResponse = "[CARGAR DATOS INICIALES]"+'\n'+
                                                            "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                            '\t'+"Ha ocurrido un error interno de la API."+'\n'+
                                                            '\t'+"Por favor, contacte con el administrador del sitio."+'\n'+
                                                            '\t'+'\t'+"·)Código de Error:"+err.status;
                                    break;
                                    
                            }
                            
                        }
                     );
                    
                }
                
                
                //PROGRAMACIÓN DEL BOTÓN DE DELETE "delSuicideRateS(----)"
                $scope.delSuicideRates = function(country, year){
                    
                    console.log("[Suicide Rates] DELETE Request Received.");
                    
                    if(country && year){
                        
                        
                        $scope.systemRequest = "[ELIMINAR]"+'\n'+
                                                "Se ha realizado una petición para elimiar un recurso con los siguientes identificadores:"+'\n'+
                                                '\t'+"País: "+country+"."+'\n'+
                                                '\t'+"Año: "+year+".";
                                                
                        $http.delete(URL_BASE+"/"+country+"/"+year).then(function(){
                                
                                console.log("[Suicide Rates] Deleting DataBase Resource with id:" +
                                                '\n' + '\t' + "Country: " + country +
                                                '\n' + '\t' + "Year: " + year);
                                $scope.systemResponse = "[ELIMINAR]"+'\n'+
                                                        "El recurso se ha eliminado satisfactoriamente."
                                refresh(URL);
                                
                            }, function(err){
                                
                                switch(err.status){
                                    
                                    case 404:
                                        console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + "Resource not found in DataBase.");
                                        $scope.systemResponse = "[CARGAR DATOS INICIALES]"+'\n'+
                                                                "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                                '\t'+"El recurso que estás intentando eliminar no existe."+'\n'+
                                                                '\t'+"Por favor, prueba a recargar la página para obtener el estado actual de la tabla de recursos. Si el problema persiste, contacte con el administrador del sitio.";
                                        break;
                                        
                                    default:
                                        console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + err);
                                        $scope.systemResponse = "[CARGAR DATOS INICIALES]"+'\n'+
                                                    "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                    '\t'+"Ha ocurrido un error interno de la API."+'\n'+
                                                    '\t'+"Por favor, contacte con el administrador del sitio."+'\n'+
                                                    '\t'+'\t'+"·)Código de Error:"+err.status;
                                        break;
                                    
                                }
                                
                            }
                        );
                    
                    } else {
                        
                        $http.delete(URL_BASE).then(function(){
                            
                            console.log("[Suicide Rates] DELETE Request Received.");
                            $scope.systemRequest = "[ELIMINAR TODOS LOS DATOS]"+'\n'+
                                                "Se ha realizado una petición para elimiar todos los recursos de la tabla de recursos.";
                            console.log("[Suicide Rates] Deleting all DataBase Resources.");
                            $scope.systemResponse = "[ELIMINAR TODOS LOS DATOS]"+'\n'+
                                                    "Todos los recursos se han eliminado satisfactoriamente."
                            
                            refresh(URL);
                            
                        });
                        
                    }
                    
                }
                
                
                //PROGRAMACIÓN DEL BOTON DE BÚSQUEDA PERSONALIZADA "customSearchSuicideRates(searchSuicideRate)"
                $scope.customSearchSuicideRates = function(inputSuicideRate){
                    
                    console.log("[Suicide Rates] GET of CUSTOM SEARCH Request Received.");
                    $scope.systemRequest = "[BÚSQUEA PERSONALIZADA]"+'\n'+
                                            "Se ha realizado una petición para realizar una búsqueda personalizada en la tabla de recursos a través de unos parámetros específicos.";
                    
                    var search_params = "";
                    if(Object.keys(inputSuicideRate).length>0){
                        search_params += "/?";
                        if(inputSuicideRate.country) search_params += "country="+inputSuicideRate.country+"&";
                        if(inputSuicideRate.year) search_params += "year="+inputSuicideRate.year+"&";
                        if(inputSuicideRate.noSuicidesMan) search_params += "noSuicidesMan="+inputSuicideRate.noSuicidesMan+"&";
                        if(inputSuicideRate.noSuicidesWoman) search_params += "noSuicidesWoman="+inputSuicideRate.noSuicidesWoman+"&";
                        if(inputSuicideRate.rank) search_params += "rank="+inputSuicideRate.rank+"&";
                        search_params = search_params.slice(0,-1);
                     
                    }
                    
                    URL = URL_BASE+search_params;
                    
                    $scope.systemResponse = "[BÚSQUEA PERSONALIZADA]"+'\n'+
                                            "Búsqueda personalizada realizada satisfactoriamente."+'\n'+
                                            "Se están mostrando todos los recursos cuyos parámetros coinciden con los indicados."+'\n'+
                                            '\t'+"NOTA 1: Si no se especificó ningún parámetro, se están mostrando todos los recursos."+'\n'+
                                            '\t'+"NOTA 2: Si no aparece ningún reurso en la tabla de recursos, es que no existe ningún reursos con los valores de los parámetros especificados.";
                    
                    refresh(URL);
                    
                }
                
                
                //PROGRAMCIÓN DEL BOTON DE BÚSQUEA POR IDENTIFICADOR "idSearchSuicideRates(inputSuicideRate)"
                $scope.idSearchSuicideRates = function(inputSuicideRate){
                    
                    console.log("[Suicide Rates] GET of ID SEARCH Request Received.");
                    
                    if(inputSuicideRate){
                    
                        if(inputSuicideRate.country){
                            
                            if(inputSuicideRate.year){
                                
                                $scope.systemRequest = "[BÚSQUEA POR IDENTIFICADOR]"+'\n'+
                                                            "Se ha realizado una petición para realizar una búsqueda en la tabla de recursos a través de los identificadores siguientes:"+'\n'+
                                                            '\t'+"·)País: "+inputSuicideRate.country+"."+'\n'+
                                                            '\t'+"·)Año: "+inputSuicideRate.year+".";
                                
                                var identificadores = "/"+inputSuicideRate.country+"/"+inputSuicideRate.year
                                URL = URL_BASE+identificadores;
                                $scope.systemResponse = "[BÚSQUEA POR IDENTIFICADOR]"+'\n'+
                                                        "Búsqueda por identificador realizada satisfactoriamente."+'\n'+
                                                        "Se están mostrando todos los recursos cuyos parámetros coinciden con los indicados.";
                            } else {
                                
                                $scope.systemRequest = "[BÚSQUEA POR IDENTIFICADOR]"+'\n'+
                                                            "Se ha realizado una petición para realizar una búsqueda en la tabla de recursos a través de los identificadores siguientes:"+'\n'+
                                                            '\t'+"·)País: "+inputSuicideRate.country+"."+'\n'+
                                                            '\t'+"·)Año: No Especificado.";

                                $scope.systemResponse = "[BÚSQUEA POR IDENTIFICADOR]"+'\n'+
                                                        "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                        '\t'+"Para la búsqueda por identificador es necesario indicar el valor de los identificadores."+'\n'+
                                                        '\t'+"Por favor, rellena el campo del identificador 'Año'.";
                            }
                        } else {
                            
                            var año = "No Especificado";
                            if(inputSuicideRate.year) año = inputSuicideRate.year;
                            
                            $scope.systemRequest = "[BÚSQUEA POR IDENTIFICADOR]"+'\n'+
                                                            "Se ha realizado una petición para realizar una búsqueda en la tabla de recursos a través de los identificadores siguientes:"+'\n'+
                                                            '\t'+"·)País: No Especificado."+'\n'+
                                                            '\t'+"·)Año: "+año+".";
                                                            
                            $scope.systemResponse = "[BÚSQUEA POR IDENTIFICADOR]"+'\n'+
                                                    "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                    '\t'+"Para la búsqueda por identificador es necesario indicar el valor de los identificadores."+'\n'+
                                                    '\t'+"Por favor, rellena el campo del identificador 'País'.";
                            
                        }
                        
                    } else {
                        $scope.systemRequest = "[BÚSQUEA POR IDENTIFICADOR]"+'\n'+
                                                            "Se ha realizado una petición para realizar una búsqueda en la tabla de recursos a través de los identificadores siguientes:"+'\n'+
                                                            '\t'+"·)País: No Especificado."+'\n'+
                                                            '\t'+"·)Año: No Especificado.";
                                                            
                        $scope.systemResponse = "[BÚSQUEA POR IDENTIFICADOR]"+'\n'+
                                                "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                '\t'+"Para la búsqueda por identificador es necesario indicar el valor de los identificadores."+'\n'+
                                                '\t'+"Por favor, rellena los campos del identificador 'País' y 'Año' si quieres realizar una búsqueda por identificador."+'\n'+
                                                '\t'+"NOTA: Si no se especificó ningún parámetro de los identificadores, se están mostrando todos los recursos.";
                        
                    }
                    
                    refresh(URL);
                    
                }
                
                
                //PROGRAMACIÓN DEL BOTÓN RESTABLECER BÚSQUEDA "restoreSearchSuicideRates()"
                $scope.restoreSearchSuicideRates = function(){
                    
                    console.log("[Suicide Rates] GET of RESTORE SEARCH Request Received.");
                    $scope.systemRequest = "[RESTABLECER BÚSQUEA]"+'\n'+
                                            "Se ha realizado una petición para eliminar todas las búsquedas y restablecer los valores de los campos de búsquedas.";
                                                
                    $scope.inputSuicideRate = {};
                    $scope.systemResponse = "[RESTABLECER BÚSQUEA]"+'\n'+
                                            "Se han eliminado todas las búsquedas satisfactoriamente."+'\n'+
                                            "Se están mostrando todos los recursos.";
                    URL = URL_BASE,
                    refresh(URL);
                    
                }
                
                //PROGRAMACIÓN DEL BOTÓN AÑADIR NUEVO RECURSO "addSuicideRates(inputSuicideRate)"
                $scope.addSuicideRates = function(inputSuicideRate){
                    
                    console.log("[Suicide Rates] POST Request Received.");
                    $scope.systemRequest = "[AÑADIR NUEVO RECURSO]"+'\n'+
                                            "Se ha realizado una petición para insertar un nuevo recurso en la tabla de recursos con los siguientes valores:"+'\n'+
                                            '\t'+"·)País: "+inputSuicideRate.country+"."+'\n'+
                                            '\t'+"·)Año: "+inputSuicideRate.year+"."+'\n'+
                                            '\t'+"·)No. Suidicios Masculinos: "+inputSuicideRate.noSuicidesMan+"."+'\n'+
                                            '\t'+"·)No. Suidicios Femeninos: "+inputSuicideRate.noSuicidesWoman+"."+'\n'+
                                            '\t'+"·)Ranking: "+inputSuicideRate.rank+".";
                    var newSuicideRate = {};
                    newSuicideRate.country = inputSuicideRate.country;
                    newSuicideRate.year = parseInt(inputSuicideRate.year);
                    newSuicideRate.noSuicidesMan = parseFloat(inputSuicideRate.noSuicidesMan);
                    newSuicideRate.noSuicidesWoman = parseFloat(inputSuicideRate.noSuicidesWoman);
                    newSuicideRate.rank = parseInt(inputSuicideRate.rank);
                    
                    $http.post(URL_BASE, newSuicideRate).then(function(){
                        
                            console.log("[Suicide Rates] Creeating new DataBase Resource." + '\n' +JSON.stringify(newSuicideRate, null, 2));
                            $scope.systemResponse = "[AÑADIR NUEVO RECURSO]"+'\n'+
                                                    "Se ha insetado en la tabla de recursos el nuevo recurso satisfactoriamente."+'\n'+
                                                    "Salvo que haya una búsqueda activa que lo impida, el nuevo recurso ya se está mostrando en la tabla de recursos.";
                            refresh(URL);
                        
                        }, function(err){
                            
                            switch(err.status){
                                
                                case 400:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + "Incorrect input data, can not create new DataBase Resource.");
                                    $scope.systemResponse = "[AÑADIR NUEVO RECURSO]"+'\n'+
                                        "¡Ops, algo no ha ido como debería!:"+'\n'+
                                        '\t'+"Has introducido los datos para insertar el nuevo recurso en la tabla con un formato incorrecto."+'\n'+
                                        '\t'+"Por favor, verifica que se cumplen las siguientes condiciones:"+'\n'+
                                        '\t'+'\t'+"·)Se han rellenado todos los campos requeridos."+'\n'+
                                        '\t'+'\t'+"·)El campo 'País' es una cadena de letras (a-z, A-Z) y con guiones (-) en vez de espacios."+'\n'+
                                        '\t'+'\t'+"·)El campo 'Año' es un número entero (sin decimales)."+'\n'+
                                        '\t'+'\t'+"·)El campo 'No. Suidicios Masculinos' es un número entero o decimal (no se recomienda más de 2 cifras decimales)."+'\n'+
                                        '\t'+'\t'+"·)El campo 'No. Suidicios Femeninos' es un número entero o decimal (no se recomienda más de 2 cifras decimales)."+'\n'+
                                        '\t'+'\t'+"·)El campo 'Año' es un número entero (sin decimales).";
                                    break;
                                
                                case 409:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + "Resource already exists in DataBase.");
                                    $scope.systemResponse = "[AÑADIR NUEVO RECURSO]"+'\n'+
                                        "¡Ops, algo no ha ido como debería!:"+'\n'+
                                        '\t'+"El recurso que estás intentando incluir en la tabla de recursos ya existe, luego no es posible si inserción."+'\n'+
                                        '\t'+"Recuerda, el sistema considera iguales a dos recursos con los mismos identificadores ('País', 'Año').";
                                    break;
                                
                                default:
                                    console.log("[Suicide Rates] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + err);
                                    $scope.systemResponse = "[AÑADIR NUEVO RECURSO]"+'\n'+
                                        "¡Ops, algo no ha ido como debería!:"+'\n'+
                                        '\t'+"Ha ocurrido un error interno de la API."+'\n'+
                                        '\t'+"Por favor, contacte con el administrador del sitio."+'\n'+
                                        '\t'+'\t'+"·)Código de Error:"+err.status;
                                    break;
                                
                            }
                            
                        }
                    );
                    
                }
                
                
                //PROGRAMACIÓN DEL BOTÓN EDITAR RECURSO EXISTENTE "editSuicideRates(newSuicideRate)"
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
                            refresh(URL);
                            
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
                                    $scope.systemResponse = "[AÑADIR NUEVO RECURSO]"+'\n'+
                                                            "¡Ops, algo no ha ido como debería!:"+'\n'+
                                                            '\t'+"Ha ocurrido un error interno de la API."+'\n'+
                                                            '\t'+"Por favor, contacte con el administrador del sitio."+'\n'+
                                                            '\t'+'\t'+"·)Código de Error:"+err.status;
                                    break;
                                
                            }
                            
                        }
                    );
                    
                    
                }
                
                
                //PROGRAMACIÓN DEL BOTÓN LIMPIAR CAMPOS "cleanNewSuicideRates()"
                $scope.cleanNewSuicideRates = function(){
                    
                    console.log("[Suicide Rates] CLEAN PARAMETERS Request Received.");
                    $scope.systemRequest = "[LIMPIAR CAMPOS]"+'\n'+
                                            "Se ha realizado una petición para borrar todos los campos de la herramienta de edición de recursos.";
                    $scope.inputSuicideRate = {};
                    $scope.systemResponse = "[LIMPIAR CAMPOS]"+'\n'+
                                            "Se han borrado todos los campos de la herramienta de edición de recursos satisfactoriamente.";
                    refresh(URL);
                    
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