// get the packages needed
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 1111;
var session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

require('./route.js')(app);

app.listen(port);
console.log('Parking API is running on port:' + port);
