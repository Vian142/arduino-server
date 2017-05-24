var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')

var app = express();
var PORT = 4444;


///////////////////////////////////////////////////////////

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())
///////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    console.log('Запрос на главную страницу');
    let fileContent = fs.readFileSync('data.txt', 'utf8');
    fileContent = JSON.parse(fileContent);
    
    res.sendStatus(200);
});

///////////////////////////////////////////////////////////
app.post('/add', function(req, res) {
    let nowDate = new Date();
    let inputContent = req.body;
    inputContent['date'] = nowDate;
    let fileContent = fs.readFileSync('data.txt', 'utf8');
    fileContent = JSON.parse(fileContent);
    fileContent.push(inputContent);
    fs.writeFileSync('data.txt', JSON.stringify(fileContent));
    console.log('Сохранено');
    res.sendStatus(200);
})


///////////////////////////////////////////////////////////
app.listen(PORT, function(err) {
    if(err) {
        console.log('Ошибка');
    }
    console.log('Сервер запущен на ' + 'localhost:' + PORT)
})