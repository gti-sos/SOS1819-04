/*global angular response Highcharts $*/
angular
        .module("FrontEnd")
        .controller("GraphHappinessStats",["$scope","$http", function ($scope,$http){
            console.log("Graph controller initialized.");
            
            var API = "/api/v1/happiness-stats";
            
            var countries = [];
            var years = [];
            var happinessScore = [];
            var lowerLimitTrust = [];
            var upperLimitTrust = [];
            var data = [];
            
            $http.get(API).then(function(res){ 
                countries = res.data.map(function(d) { return d.country });
                years = res.data.map(function(d) { return d.year }); 
                happinessScore = res.data.map(function(d) { return d.happinessScore });
                lowerLimitTrust = res.data.map(function(d) { return d.lowerLimitTrust});
                upperLimitTrust = res.data.map(function(d) { return d.upperLimitTrust });
                
                
                data = res.data;
                
                var chardata = res.data.map(function(hs){
	                   var Valor = hs.countries ;
                     var Valor1 = parseFloat(hs.happinessScore) ;

                    return [Valor , Valor1];
                      });
                
                  Highcharts.chart('container', {
                              chart: {
                                type: 'pie',
                                options3d: {
                                  enabled: true,
                                  alpha: 45
                                }
                              },
                              title: {
                                text: 'Ranking de felicidad mundial'
                              },
                              subtitle: {
                                text: '3D donut in Highcharts'
                              },
                              plotOptions: {
                                pie: {
                                  innerSize: 100,
                                  depth: 45
                                }
                              },
                              series: [{
                                name: 'happiness-Score',
                                data: chardata
                                
                              }]
                            });
                  });
                            
                
                
           
                
           
            
        }
    ]);