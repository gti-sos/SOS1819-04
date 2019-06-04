/* global angular */

angular
    .module("FrontEnd", ["ngRoute","n3-line-chart"])
    .config(function($routeProvider){
            
            $routeProvider
                //Ruta Base, FrontEnd de nuestro grupo
                .when("/",
                    {
                        controller: "FrontEndCtrl",
                        templateUrl: "frontend.html"
                    }
                )
                
                //Integraciones
                .when("/integrations",
                    {
                        controller: "IntegrationsCtrl",
                        templateUrl: "integrations.html"
                    }
                )
                
                //Gráficas Grupales
                .when("/analytics",
                    {
                        controller: "AnalyticsCtrl",
                        templateUrl: "analytics.html"
                    }
                )
                
                //Suicide-Rates
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
                .when("/ui/v1/suicide-rates/charts",
                    {
                        controller: "ChartSuicideRatesCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/chart_suicide_rates.html"
                    }
                )
                .when("/integrations/biofuel-productions",
                    {
                        controller: "IntegrationBiofuelProductionsCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_biofuels_production.html"
                    }
                )
                .when("/integrations/api-scorers",
                    {
                        controller: "IntegrationApiScorersCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_api_scorers.html"
                    }
                )
                .when("/integrations/happiness-stats",
                    {
                        controller: "IntegrationHappinessStatsCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_happiness_stats.html"
                    }
                )
                .when("/integrations/uefa-country-rankings",
                    {
                        controller: "IntegrationUefaCountryRankingsCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_uefa_country_rankings.html"
                    }
                )
                .when("/integrations/populationstats",
                    {
                        controller: "IntegrationPopulationStatsCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_populationstats.html"
                    }
                )
                .when("/integrations/general-public-expenses",
                    {
                        controller: "IntegrationGeneralPublicExpensesCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_general_public_expenses.html"
                    }
                )
                .when("/integrations/elements",
                    {
                        controller: "IntegrationElementsCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_elements.html"
                    }
                )
                .when("/integrations/life-expectancy-stats",
                    {
                        controller: "IntegrationLifeExpectancyStatsCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_life_expectancy_stats.html"
                    }
                )
                .when("/integrations/chuck-norris",
                    {
                        controller: "IntegrationChuckNorrisCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_chuck_norris.html"
                    }
                )
                .when("/integrations/random-facts",
                    {
                        controller: "IntegrationRandomFactsCtrl",
                        templateUrl: "./ui/v1/frontend_suicide_rates/public/integration_random_facts.html"
                    }
                )
                
                //HAPPINESS-STATS
                .when("/ui/v1/happiness-stats", 
                    {
                        controller: "ListHappinessStatsCtrl",
                        templateUrl: "./ui/v1/frontend_happiness_stats/public/list_hs.html"
                    }
                )
                .when("/ui/v1/happiness-stats/edit/:country/:year",
                    {
                        controller: "EditHappinessStatsCtrl",
                        templateUrl: "./ui/v1/frontend_happiness_stats/public/edit_hs.html"
                    }
                )
                    
                .when("/ui/v1/happiness-stats/graficas",
                    {
                        controller: "GraphHappinessStats",
                        templateUrl: "./ui/v1/frontend_happiness_stats/public/Graph_hs.html"
                    }
                )
                .when("/ui/v1/happiness-stats/integrations",
                    {
                        controller: "integrationsHSCtrl",
                        templateUrl: "./ui/v1/frontend_happiness_stats/public/integrations_hs.html"
                    }
                )
                
                .when("/ui/v1/happiness-stats/integrations-dioxid",
                    {
                        controller: "DioxidIntegrationsHSCtrl",
                        templateUrl: "./ui/v1/frontend_happiness_stats/public/integrations_dioxid.html"
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
                    
                )
                .when("/integrations/AllIntegrations",
                    {
                        controller: "integrationsBeerCtrl",
                        templateUrl: "./ui/v1/frontend_beer_consumed_stats/integrations/integrationsBeer.html"
                    }
                    
                );
            
        }
    );


console.log("Front-End is initialized and Ready to Use !!.");