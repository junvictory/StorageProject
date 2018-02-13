var express = require('express');
var index = require('./routes/index.js');
var ajax = require('./routes/ajax.js')

//express templete set
var app = express();
app.set('view engine', 'jade'); // templeate engine jada use
app.set('views', './views'); //views Folder
app.use(express.static('images')); //images정적 파일 사용
app.use(express.static('scripts')); //scripts정적 파일 사용
app.use(express.static('css')); //scripts정적 파일 사용

app.locals.pretty = true;

//router index
app.use('/',index);
//roter ajax
app.use('/ajax',ajax);

app.use((req, res, next) => { // 404 처리 부분
    
    res.status(404).send('Not Found');
    
});
app.use((err, req, res, next) => { // 에러 처리 부분
    console.error(err.stack); // 에러 메시지 표시
    res.status(500).send('Server Error'); // 500 상태 표시 후 에러 메시지 전송
});


app.listen(4000, function () {
    console.log('connection');
});


