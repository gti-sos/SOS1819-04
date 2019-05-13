/*global angular*/

    angular
        .module("FrontEnd")
        .controller("FrontEndCtrl", ["$scope", "$location", function($scope,$location){
                
                    //PROGRAMACIÓN DEL BOTÓN ACCEDER A LA APLICACIÓN "goAplication(n)"
                    $scope.goAplication = function(n){
                        
                        switch (n) {
                            case 1:
                                console.log("Redirecting to Suicide-Rates FrontEnd.");
                                $location.path("/ui/v1/suicide-rates");
                                break;
                                
                            case 2:
                                console.log("Redirecting to Happiness-Stats FrontEnd.");
                                $location.path("/");
                                break;
                                
                            case 3:
                                console.log("Redirecting to Beer-Consumed-Stats FrontEnd.");
                                $location.path("/beer-consumed-stats");
                                break;
                                
                            default:
                                break;
                        }
                        
                    }
                
                }
            ]
        );