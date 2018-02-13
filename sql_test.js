var mysql = require('mysql');
var dbconfig = require('./config/database.js');
var conn = mysql.createConnection(dbconfig); //Connection Setting 
conn.connect(); //connection

conn.query('SELECT count(*) from data',function(err,rows,fields){
    if(err){
        console.log(err);
    }else{
        console.log(rows[0]);
    }
});
//conn.end(); //connection exit
