var mysql = require('mysql');
var db_host = "localhost";
var db_user = "root";
var db_password = "root";
var db_database = "corporate_sms";


this.insert = function (ipAddress, reqTimeStamp, request, resTimeStamp, response, status, res) {

    var query = "INSERT INTO corporate_sms.api_log (ip_address, req_timestamp, request, res_timestamp, response, status) VALUES ('"+ipAddress+"','"+reqTimeStamp+"','"+request+"','"+resTimeStamp+"','"+response+"','"+status+"');";
    var con = mysql.createConnection({
        host: db_host,
        user: db_user,
        password: db_password,
        database: db_database
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query(query, function (err, result, fields) {
            if (err) throw err;


            //console.log(result);
        });
    });
}



module.exports = this;