const express = require("../../node_modules/express");
const router = express.Router();

router.get("/", (req, res) => {
        
        res.send("<html><body><h1>There is nothing here yet...</h1></body></html>");
        
    }
);

module.exports = router;