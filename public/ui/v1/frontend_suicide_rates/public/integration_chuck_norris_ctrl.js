/* global angular */

angular
    .module("FrontEnd")
    .controller("IntegrationChuckNorrisCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Chuck Norris Integration] INTEGRATION Api Scorers Main Controller initialized.");
                
                var URL = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";
                var URL_BASE = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";
                
                refresh(URL_BASE);
                
                //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA MOSTRAR LO QUE SE ENCUENTRA ACTUALMENTE EN LA BASE DE DATOS
                function refresh(URL){
                    
                    var config = {
                        headers: {
                            "X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
                            "X-RapidAPI-Key": "6904208c4cmsh2f274f4bf01e87fp1d6c25jsncbdf204c1b63",
                            "accept": "application/json"
                        }
                    };
                    
                    $http
                        .get(URL, config)
                        .then(function(res){
                            
                                console.log("[Chuck Norris Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                                
                                var jsonChuckNorris = res.data;
                                $scope.jokes = jsonChuckNorris.value;
                                
                            }, function(err){
                                
                                console.log("Chuck Norris Integration] FATAL ERROR !! " 
                                            + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                            + '\n' + '\t' + err);
                                
                            }
                        );
                    
                }
                
                //PROGRAMACIÓN DEL BOTÓN OTRA FRASE "anotherChuckNorrisPhrase()"
                $scope.anotherChuckNorrisPhrase = function(){
                    refresh(URL);
                }
                
                
            }
        ]
    );