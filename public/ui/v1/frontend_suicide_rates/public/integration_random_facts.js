/* global angular */

angular
    .module("FrontEnd")
    .controller("IntegrationRandomFactsCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Random Facts Integration] INTEGRATION Api Scorers Main Controller initialized.");
                
                var URL = "https://numbersapi.p.rapidapi.com/2019/year";
                var URL_BASE = "https://numbersapi.p.rapidapi.com/2019/year";
                
                refresh(URL_BASE);
                
                //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA MOSTRAR LO QUE SE ENCUENTRA ACTUALMENTE EN LA BASE DE DATOS
                function refresh(URL){
                    
                    var config = {
                        headers: {
                            "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
                            "X-RapidAPI-Key": "6904208c4cmsh2f274f4bf01e87fp1d6c25jsncbdf204c1b63",
                            "accept": "application/json"
                        }
                    };
                    
                    $http
                        .get(URL, config)
                        .then(function(res){
                            
                                console.log("[Ramdom Facts Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                                
                                $scope.fact = res.data;
                                
                            }, function(err){
                                
                                console.log("Ramdom Facts Integration] FATAL ERROR !! " 
                                            + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                            + '\n' + '\t' + err);
                                
                            }
                        );
                    
                }
                
                //PROGRAMACIÓN DEL BOTÓN OTRA FRASE "anotherChuckNorrisPhrase()"
                $scope.anotherFact = function(){
                    var year = Math.floor(Math.random() * (12 - 1)) + 1;
                    URL = "https://numbersapi.p.rapidapi.com/"+year.toString()+"/year";
                    refresh(URL);
                }
                
                
            }
        ]
    );