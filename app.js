var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');


var index_routes = require('./routes/index');

var app = express();

var hbs = exphbs.create({defaultLayout: 'main'});
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', index_routes);



module.exports = app;