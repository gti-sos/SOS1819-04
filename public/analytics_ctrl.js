/*global angular Highcharts*/

angular
    .module("FrontEnd")
    .controller("AnalyticsCtrl", ["$scope", "$http", "$location", function($scope,$http,$location){
            
            //URLs DE LAS APIs PARA CARGAR LOS DATOS
            const suicideURL = "/api/v1/suicide-rates";
            const happinessURL = "/api/v1/happiness-stats";
            const beerURL = "/api/v1/beer-consumed-stats";
            
            //DATOS DE LAS APIS
            var suicide_rates;
            var happiness_stats;
            var beer_consumed_stats;
            var countriesAnalytics = new Set();
            var countriesAnalyticsDataSet = [];
            var dataset_analytics = 
                    [
                        {
                        name: 'Promedio de Suicidios',
                        data: []
                        },
                        {
                        name: 'Ratio de Felicidad',
                        data: []
                        },
                        {
                        name: 'Hectolitros de Cerveza',
                        data: []
                        }
                    ];
            
            //DICCIONARIO DE PAISES
            var diccionaryEnEs = {
                "France": "francia",
                "Germany": "alemania",
                "Spain": "españa",
                "Georgia": "georgia",
                "United States": "estados unidos"
            }
            
            //GET A LA API SUICIDE RATES PARA CARGAR SUS DATOS    
            $http.get(suicideURL).then(function(res){
            
                    console.log("[ANALYTICS] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                    
                    if(Array.isArray(res.data)) {
                        suicide_rates = res.data;
                    } else {
                        suicide_rates = [res.data];
                    }
                    
                }, function(err){
                    
                    switch(err.status){
                        
                        case 404:
                            console.log("[ANALYTICS] FATAL ERROR !! " 
                                        + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                        + '\n' + '\t' + "Resource not found in DataBase.");
                                        
                        default:
                            console.log("[ANALYTICS] FATAL ERROR !! " 
                                        + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                        + '\n' + '\t' + err);
                            break;
                            
                    }
                    
                }
                
            ).then(function(){
                    
                    
                    //GET A LA API HAPPINESS STATS PARA CARGAR SUS DATOS
                    $http.get(happinessURL).then(function(res){
            
                            console.log("[ANALYTICS] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                            
                            if(Array.isArray(res.data)) {
                                happiness_stats = res.data;
                            } else {
                                happiness_stats = [res.data];
                            }
                            
                        }, function(err){
                            
                            switch(err.status){
                                
                                case 404:
                                    console.log("[ANALYTICS] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + "Resource not found in DataBase.");
                                                
                                default:
                                    console.log("[ANALYTICS] FATAL ERROR !! " 
                                                + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                + '\n' + '\t' + err);
                                    break;
                                    
                            }
                            
                        }
                        
                    ).then(function(){
                    
                                //GET A LA API BEER CONSUMED STATS PARA CARGAR SUS DATOS
                                $http.get(beerURL).then(function(res){
                        
                                        console.log("[ANALYTICS] GET Request Received:" + '\n' + JSON.stringify(res.data, null, 2));
                                        
                                        if(Array.isArray(res.data)) {
                                            beer_consumed_stats = res.data;
                                        } else {
                                            beer_consumed_stats = [res.data];
                                        }
                                        
                                    }, function(err){
                                        
                                        switch(err.status){
                                            
                                            case 404:
                                                console.log("[ANALYTICS] FATAL ERROR !! " 
                                                            + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                            + '\n' + '\t' + "Resource not found in DataBase.");
                                                            
                                            default:
                                                console.log("[ANALYTICS] FATAL ERROR !! " 
                                                            + '\n' + '\t' + "STATUS CODE:" + err.status + " " + err.statusText
                                                            + '\n' + '\t' + err);
                                                break;
                                                
                                        }
                                        
                                    }
                                    
                                ).then(function(){
                                    
                                        //MODELADO DE LOS DATOS DE LA GRÁFICA
                                        
                                        //RECOPILACIÓN DE TODOS LOS PAISES DE LAS 3 APIs
                                        for (var i=0; i<suicide_rates.length; i++){
                                            var average = (suicide_rates[i].noSuicidesMan+suicide_rates[i].noSuicidesWoman)/2;
                                            countriesAnalytics.add(suicide_rates[i].country);
                                        }
                                        for (var i=0; i<happiness_stats.length; i++){
                                            countriesAnalytics.add(happiness_stats[i].country);
                                        }
                                        for (var i=0; i<beer_consumed_stats.length; i++){
                                            countriesAnalytics.add(diccionaryEnEs[beer_consumed_stats[i].country]);
                                        }
                                        
                                        //CREADION DEL DATASER PARA LA GRÁFICA
                                        countriesAnalytics.forEach( ( country ) =>{
                                                
                                                //Array de la Gráfica
                                                countriesAnalyticsDataSet.push(country);
                                                
                                                //Suicide-Rates
                                                var space = true;
                                                for (var j=0; j<suicide_rates.length; j++){
                                                    if(suicide_rates[j].country === country){
                                                        average = (suicide_rates[j].noSuicidesMan+suicide_rates[j].noSuicidesWoman)/2;
                                                        dataset_analytics[0].data.push(average);
                                                        space = false;
                                                        break;
                                                    }
                                                }
                                                if(space) dataset_analytics[0].data.push(0);
                                                
                                                //Happiness-Stats
                                                space = true;
                                                for (var j=0; j<happiness_stats.length; j++){
                                                    if(happiness_stats[j].country === country){
                                                        dataset_analytics[1].data.push(happiness_stats[j].happinessScore);
                                                        space = false;
                                                        break;
                                                    }
                                                }
                                                if(space) dataset_analytics[1].data.push(0);
                                                
                                                //Beer-Consumed-Stats
                                                space = true;
                                                for (var j=0; j<beer_consumed_stats.length; j++){
                                                    if(diccionaryEnEs[beer_consumed_stats[j].country] === country){
                                                        dataset_analytics[2].data.push(beer_consumed_stats[j].countryConsumition/100);
                                                        space = false;
                                                        break;
                                                    }
                                                }
                                                if(space) dataset_analytics[2].data.push(0);
                                                
                                            }
                                        );
                                        
                                    }
                                ).then(function(){
                                    
                                        //GRAFICA HIGHCHARTS
                                        Highcharts.chart('analytics-highcharts', 
                                            {
                                                chart: {
                                                    type: 'column',
                                                    //height: 100 + '%'
                                                },
                                                title: {
                                                    text: 'Tasa de Suicidios por Países - Tasa de Felicidad por Países - Consumo de Cerveza por Países'
                                                },
                                                subtitle: {
                                                    text: 'Source: <a href="https://sos1819-04.herokuapp.com/#!> SOS1819-04 API</a>'
                                                },
                                                xAxis: {
                                                    categories: countriesAnalyticsDataSet,
                                                    crosshair: true
                                                },
                                                yAxis: {
                                                    min: 0,
                                                    title: {
                                                        text: 'Suicidios - Felicidad - Cerveza'
                                                    }
                                                },
                                                tooltip: {
                                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                 '<td style="padding:0"><b>{point.y:.1f} Unidades </b></td></tr>',
                                                    footerFormat: '</table>',
                                                    shared: true,
                                                    useHTML: true,
                                                },
                                                plotOptions: {
                                                    column: {
                                                        pointPadding: 0,
                                                        borderWidth: 0,
                                                        groupPadding: 0,
                                                        shadow: false
                                                    }
                                                },
                                                series: dataset_analytics
                                            }
                                        );
                                    
                                    }
                                );
                                
                            }
                        )
                    
                }
            );
            
            
            
            
            
        }
    ]
);