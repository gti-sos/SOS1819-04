exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TCSR01-loadHS.js",
                "e2e/TCSR02-createHS.js",
                "e2e/TCSR03-deleteHS.js"
           ]
    
};