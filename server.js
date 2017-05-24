var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
var moment = require('moment');

var app = express();
var PORT = 4444;

var nowDate = moment();
nowDate.localeData('ru');
nowDate.format('DD MMMM YYYY, h:mm:ss');

app.use('/views', express.static('views'));
///////////////////////////////////////////////////////////
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
///////////////////////////////////////////////////////////
 
// parse application/json 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//// Запрос главной страницы
///////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    var fileContent = fs.readFileSync('data.txt', 'utf8');
    fileContent = JSON.parse(fileContent);
    console.log('Запрос Главной Страницы');
    res.render('index', {title: 'Главная', listLog: fileContent});
});


//// Обработка запроса
///////////////////////////////////////////////////////////
app.post('/add', function(req, res) {
    var inputContent = req.body;
    var date = nowDate.format('DD MMMM YYYY, h:mm:ss');
    date = date.toString();
    inputContent['date'] = date;
    var fileContent = fs.readFileSync('data.txt', 'utf8');
    fileContent = JSON.parse(fileContent);
    fileContent.push(inputContent);
    fs.writeFileSync('data.txt', JSON.stringify(fileContent));
    console.log('Сохранено');
    res.sendStatus(200);
})


///////////////////////////////////////////////////////////
app.listen(PORT, function(err) {
    if(err) {
        console.log('Ошибка запуска сервера');
    }
    console.log('Сервер запущен на ' + 'localhost:' + PORT)
})