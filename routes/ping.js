var express = require('express');
var router = express.Router();
const https = require('https');
var to_json = require('xmljson').to_json;
const STATUS_ERROR = "ERROR";
var db = require('../db');
var ipAddress ='';
var reqTimeStamp='';
var request='';
var resTimeStamp='';
var response='';
var status='';

/* GET home page. */
router.get('/', function (req, res, next) {

    reqTimeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    ipAddress = req.connection.remoteAddress;
    request = req.originalUrl.toString().toString().replace("'","''");

    var index = req.url.indexOf('?');
    var query = req.url.substr(index);
    //?msisdn=923408500060&password=Hajra123
    https.get('https://telenorcsms.com.pk:27677/corporate_sms2/api/ping.jsp' + query, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });


        resp.on('end', () => {
            resTimeStamp =  new Date().toISOString().slice(0, 19).replace('T', ' ');
            console.log(data);
            to_json(data, function (error, result) {
                response = JSON.stringify(result).replace("'","''");
                status = result.corpsms.response;
                db.insert(ipAddress, reqTimeStamp, request, resTimeStamp, response, status, res);
                console.log(result);
                res.send(JSON.stringify(result));

            });

        });

    }).on("error", (err) => {
        resTimeStamp =  new Date().toISOString().slice(0, 19).replace('T', ' ');
        response = err;
        status = "Error";
        db.insert(ipAddress, reqTimeStamp, request, resTimeStamp, response, status, res);

        console.log("Error: " + err.message);
    });

});

module.exports = router;
