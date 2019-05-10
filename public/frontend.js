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
                        templateUrl: "./frontend_suicide_rates/list_suicide_rates.html"
                    }
                )
                .when("/suicide-rates/edit/:country/:year",
                    {
                        controller: "EditSuicideRatesCtrl",
                        templateUrl: "./frontend_suicide_rates/edit_suicide_rates.html"
                    }
                );
            
        }
    );


console.log("Front-End is initialized and Ready to Use !!.");