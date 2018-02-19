var express = require('express');
var bodyParser = require('body-parser'); //post 처리

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session');
var flash = require('connect-flash');

var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var router  =express.Router();

// mysql set
var conn = mysql.createConnection(dbconfig); //Connection Setting 
conn.connect(); //connection

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); //post moduel use


//login process
router.use(cookieSession({
    keys: ['storage_Key'],
    cookie: {
      maxAge: 1000 * 60 * 60 // 유효기간 1시간
    }
  }));
router.use(flash());
router.use(passport.initialize());
router.use(passport.session());
  

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: true,
    passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
  }, function (req, username, password, done) {

    // var sql = 'SELECT * FROM user WHERE name=? AND password=?'
    // var value =[username, passsword];
    // conn.query(sql,value, function(err, rows, fields){
    //     if(err){
    //         console.log(err);
    //    }else{}
    // })
    if(username === 'store' && password === 'password'){
      return done(null, {
        'user_id': username,
      });
    }else{
      return done(false, null)
    }
}));

passport.serializeUser(function (user, done) {
   done(null, user)    
});

passport.deserializeUser(function (user, done) {
    done(null, user);

});

//checkLogin
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};


router.get('/', isAuthenticated, function (req, res) {
    conn.query('SELECT count(*) from data', function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(rows[0]));
            res.render('view', { count: JSON.stringify(rows[0]) });
            console.log('MainPageLoad');
        }
    });
});


router.get('/login',function(req,res){
    res.render('login');
});

router.post('/loginProcess', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}),
function(req,res){
    console.log('LogIn OK');
    res.redirect('/');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});


router.get(['/:box', '/:box/:block'], isAuthenticated, function (req, res) {
    var box = req.params.box;
    var block = req.params.block;
    if (block) {
        var sql = 'SELECT * FROM data WHERE box=? AND block=? order by number';
        var value = [box, block];
        conn.query(sql, value, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log(rows);
                res.render('block', { box: box, block: block, rows: rows });
            }
        });
    } else {
        console.log(box);
        res.render('box', { box: box });
    }

});

module.exports = router;
