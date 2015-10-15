var express = require('../node_modules/express');
var parser = require('../node_modules/body-parser');
var db = require('./db.js');

var app = express();
var port = process.env.PORT || 8000;

app.use(parser.json());

app.use(express.static('client'));

//Routes go here
app.get('/', function(req, res) {
  res.send('helllllooooooooo woooorld! :D');
});

app.listen(port, function() {
  console.log('Listening on port: ', port);
});

exports.app = app; 
