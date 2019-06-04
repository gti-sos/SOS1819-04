/*global angular*/
angular
    .module("FrontEnd")
    .controller("IntegrationMemeCtrl",["$scope","$http", "$location", function ($scope,$http,$location){
                
                //MENSAJE DE BIENVENIDA DEL CONTROLADOR PRINCIPAL DE LA LISTA DE RECURSOS "list_suicide_rates_ctrl"
                console.log("[Meme Integration] INTEGRATION Api Scorers Main Controller initialized.");
                
                var URL = "https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=Top+text&bottom=Bottom+text";
                var URL_BASE = "https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=Top+text&bottom=Bottom+text";
                
                refresh(URL_BASE);
                
                //FUNCIÓN QUE HACE GET A LA RUTA BASE PARA MOSTRAR LO QUE SE ENCUENTRA ACTUALMENTE EN LA BASE DE DATOS
                function refresh(URL){
                    
                    var config = {
                        headers: {
                            "X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
                            "X-RapidAPI-Key": "59af1948f2mshf52cf1a1ca2e16cp1276fbjsnf62b940bb28b",
                            "accept": "application/json"
                        },
                        qs: { 
                            "meme": "Condescending-Wonka",
                            "top": "Top text",
                            "bottom": "Bottom text"
                         }
                    };
                    
                    $http
                        .get(URL, config)
                        .then(function(res){
                            
                                console.log("[Memes generator Integration] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                                
                                var jsonMeme = res.data;
                                $scope.jokes = jsonMeme.value;
                                
                            }, function(err){
                                
                                console.log("Meme Integration] FATAL ERROR !! " 
                                            + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                            + '\n' + '\t' + err);
                                
                            }
                        );
                    
                }
                
                //PROGRAMACIÓN DEL BOTÓN OTRA FRASE "anotherMeme()"
                $scope.anotherMeme = function(){
                    refresh(URL);
                };
                
                
            }
        ]
    );