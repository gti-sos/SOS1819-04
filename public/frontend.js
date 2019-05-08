/* global angular */

angular
    .module("FrontEnd", ["ngRoute"])
    .config(function($routeProvider){
            
            $routeProvider
                .when("/",
                    {
                        controller: "FrontEndCtrl",
                        templateUrl: "frontend.html"
                    }
                )
                .when("/suicide-rates", 
                    {
                        controller: "ListSuicideRatesCtrl",
                        templateUrl: "list_suicide_rates.html"
                    }
                )
                .when("/suicide-rates/edit/:country/:year",
                    {
                        controller: "EditSuicideRatesCtrl",
                        templateUrl: "edit_suicide_rates.html"
                    }
                );
            
        }
    );


console.log("Front-End is initialized and Ready to Use !!.");