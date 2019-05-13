exports.config = {
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [ 
        
            "e2e/TCBCS01-loadData.js"    ,
            "e2e/TCBCS02-create.js"   ,
            "e2e/TCBCS03-delete.js"
        
        ]
};