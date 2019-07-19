var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.writeHead(301,
        {Location: 'http://mercurialminds.com/'}
    );
    res.end();

});

module.exports = router;
