/*global angular Highcharts RGraph google*/
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
                //console.log(countries)
                var dataset_geochart_hs = [['País', 'Ranking de Felicidad']];
                
                  var countryDiccionary = {
                    "argelia": "Algeria",
                    "españa": "Spain",
                    "arabia saudita": "Saudi Arabia",
                    "indonesia": "Indonesia",
                    "ucrania": "Ukraine",
                    "zimbabwe": "Zimbabwe",
                    "francia": "France",
                    "mexico": "Mexico",
                    "macedonia": "Macedonia",
                    "noruega": "Norway",
                    "jordania": "Jordan",
                    "italia": "Italy"
                };
                  
                
                var i =0;
                var j = 0;
                for(i; i < countries.length; i++){
                   var dato = [countries[i], happinessScore[i]];
                   
                    var inputGeoData = [countryDiccionary[dato[0]], dato[1]];
                    dataset_geochart_hs.push(inputGeoData);
                   if(dato[0] != undefined &&  dato[1] != undefined){
                     chardata[j] = dato;
                     j++;
                   }
                }
                
                
                  
                
                //console.log(chardata)
                  
                //HIGHCHARTS-3D DONUT
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
                            
                  //GEOCHARTS     
                       
                       google.charts.load('current', {
                    'packages':['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyCMxXpbiaAO25fbCtjFW3OQk4PsQ7nWTx8'
                    }
                );
                
                google.charts.setOnLoadCallback(drawRegionsMap);
            
                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable(dataset_geochart_hs);
                    var options = {};
            
                    var chart = new google.visualization.GeoChart(document.getElementById('happiness-stats-geochart'));
            
                    chart.draw(data, options);
                  }
                       
                  //RGRAPH - LIBRERIA INDIVIDUAL
                      console.log(happinessScore);
                      new RGraph.SVG.Line({
                      id: 'chart-container',
                      data: happinessScore,
                      options: {
                          backgroundGridVlinesCount: 11,
                          marginInner: 0,
                          textColor: 'white',
                          textSize: 14,
                          textFont: 'Verdana',
                          filled: true,
                          filledColors: ['rgba(25,51,74,0.75)'],
                          colors: ['#5AF'],
                          marginLeft: 65,
                          marginRight: 40,
                          marginBottom: 50,
                          marginTop: 20,
                          xaxis: false,
                          yaxis: false,
                          yaxisScaleUnitsPost: '',
                          yaxisScaleUnitsPre: '',
                          tickmarksStyle: 'circle',
                          tickmarksFill: 'black',
                          tickmarksLinewidth: 2,
                          tickmarksSize: 6,
                          linewidth: 4,
                          spline: true,
                          xaxisLabels: countries
                      }
                  }).trace();
                  });
                  
                  
                  
                
        }
    ]);