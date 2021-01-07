var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();
var bodyparser = require('body-parser');
app.use(express.static("./app"));

var pool = mysql.createConnection({
    host: '108.61.9.11',
    user: 'theyellowlight_reads',
    password: 'Rjisr@r48439',
    database: 'theyellowlight_reads'
});
pool.connect();
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/users', function (req, res) {
        var sql = mysql.format("SELECT * FROM users");
        pool.query(sql, function (error, results, fields) {
            if (error) {
                res.send(error);
            }
            res.send(results);
             pool.end();
        });
});

app.listen(app.get('port'));
console.log('Server Runnign on port localhost:' + app.get('port'));