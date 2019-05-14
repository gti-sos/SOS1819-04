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
                )
                //beer-consumed-stats
                .when("/ui/v1/beer-consumed-stats", 
                    {
                        controller: "ListBeerConsumedStatsCtrl",
                        templateUrl: "./ui/v1/frontend_beer_consumed_stats/public/list_bc.html"
                    }
                )
                .when("/ui/v1/beer-consumed-stats/edit/:country/:year",
                    {
                        controller: "EditBeerConsumedStatsCtrl",
                        templateUrl: "./ui/v1/frontend_beer_consumed_stats/public/edit_bc.html"
                    }
                );
            
        }
    );


console.log("Front-End is initialized and Ready to Use !!.");