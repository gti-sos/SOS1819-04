exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TCSR01-loadSuicideRates.js",
                "e2e/TCSR02-createSuicideRate.js",
                "e2e/TCSR03-deleteSuicideRate.js"
           ]
    
};