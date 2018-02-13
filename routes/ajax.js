var express = require('express');
var bodyParser = require('body-parser'); //post 처리
var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var router = express.Router();

// mysql set
var conn = mysql.createConnection(dbconfig); //Connection Setting 
conn.connect(); //connection

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); //post moduel use

//New_Item
router.post('/item', function (req, res) {
    console.log("newAjax");
    var title = req.body.title;
    var box = req.body.box;
    var block = req.body.block;
    var number = req.body.number;
    console.log(req.body);
    var sql = 'INSERT INTO data (title,box,block,number,wdt) values (?,?,?,?,NOW())';
    var value = [title, box, block, number];
    conn.query(sql, value, function (err, rows, fields) {
        if (err) {
            res.send({ result: false, error: err });
            console.log(err);
        } else {
            res.send({ result: true, row: rows });
            console.log(rows);
        }
    });
});


//Item_Text_Search
router.get('/item/:search', function (req, res) {
    console.log("searchAjax");
    var search = req.params.search;
    console.log(search);
    var sql = 'SELECT * FROM data WHERE title LIKE "' + search + '%"';
    conn.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send({ result: true, rows: rows });
            console.log(rows);
        }
    });
});

//Item_Id_Search
router.get('/item/id/:id', function (req, res) {
    console.log("idAjax");
    var id = req.params.id;
    console.log(id);
    var sql = 'SELECT * FROM data WHERE id=?';
    conn.query(sql,id, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.send({ result: true, rows: rows });
            console.log(rows);
        }
    });
});


//Item_Duplicate_Search
router.get('/item/:box/:block/:number', function (req, res) {
    console.log("duplicateAjax");
    var box = req.params.box;
    var block = req.params.block;
    var number = req.params.number;
    console.log(req.params);
    var sql = 'SELECT * FROM data WHERE box=? AND block=? AND number=?';
    value = [box, block, number];
    conn.query(sql, value, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows[0]);
            if (rows[0] == null) {
                console.log("Null");
                res.send({ result: true });
            } else {
                console.log("NumberDuplicate");
                res.send({ result: false });
            }
        }
    });
});

//Item_Delete
router.delete('/item/:id', function (req, res) {
    console.log("Item_Delete");
    var id = req.params.id;
    console.log(id);
    var sql = 'DELETE FROM data WHERE id=?';
    conn.query(sql, id, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            if (rows.affectedRows == 1) {
                res.send({ result: true, rows: rows });
            } else {
                res.send({ result: false, rows: rows });
            }
        }
    }); 
});
//Item_Modify
router.put('/item/:id', function (req, res) {
    console.log("Item_Modify");
    var title = req.body.title;
    var box = req.body.box;
    var block = req.body.block;
    var number = req.body.number;
    var id = req.params.id;

    var sql = 'UPDATE data SET title=? ,box=? ,block=? ,number=?,edt=NOW() WHERE id=?';
    var value = [title,box,block,number,id];
    conn.query(sql, value, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
            if(rows.affectedRows == 1){
                res.send({result: true, rows: rows})
            }else{
                res.send({ result: false, rows: rows });
            }
        }
    });
});

module.exports = router;
