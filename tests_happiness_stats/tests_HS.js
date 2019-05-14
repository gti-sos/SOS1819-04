exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TCHS01-loadHS.js",
                "e2e/TCHS02-createHS.js",
                "e2e/TCHS03-deleteHS.js"
           ]
    
};