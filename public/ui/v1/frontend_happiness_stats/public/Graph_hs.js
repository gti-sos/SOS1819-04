/*global angular Highcharts RGraph*/
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
                var chardata = []; 
                console.log(countries)
      
                
                var i =0;
                var j = 0;
                for(i; i < countries.length; i++){
                   var dato = [countries[i], happinessScore[i]];
                   if(dato[0] != undefined &&  dato[1] != undefined){
                     chardata[j] = dato;
                     j++;
                   }
                }
                  
                
                  console.log(chardata)
                  
                
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
                  
                  
              $http.get(API).then(function(res){ 
                  countries = res.data.map(function(d) { return d.country });
                  years = res.data.map(function(d) { return d.year }); 
                  happinessScore = res.data.map(function(d) { return d.happinessScore });
                  lowerLimitTrust = res.data.map(function(d) { return d.lowerLimitTrust});
                  upperLimitTrust = res.data.map(function(d) { return d.upperLimitTrust });
                  
                  data = res.data;
                  
                    RGraph.SVG.Line({
                      id: 'cc',
                      data: res.happinessScore,
                      options: {
                          linewidth: 7,
                          colors: ['white'],
                          filled: true,
                          filledColors: ['Gradient(red:rgba(255,0,0,0.75):rgba(255,0,0,0.35):rgba(0,0,0,0.25))'],
                          backgroundGridColor: '#666',
                          textColor: 'white',
                          yaxisColor: 'gray',
                          xaxisColor: 'gray',
                          xaxisLabels: res.countries,
                          textSize: 16
                        }
                      }).trace();
                  
                  
                  });
        }
    ]);