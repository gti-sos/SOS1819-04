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
                .when("/ui/v1/suicide-rates", 
                    {
                        controller: "ListSuicideRatesCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/list_suicide_rates.html"
                    }
                )
                .when("/ui/v1/suicide-rates/edit/:country/:year",
                    {
                        controller: "EditSuicideRatesCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/edit_suicide_rates.html"
                    }
                );
            
        }
    );


console.log("Front-End is initialized and Ready to Use !!.");