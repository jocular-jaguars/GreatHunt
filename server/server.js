var express = require('express');
var parser = require('body-parser');
var db = require('./db.js');

var app = express();
var port = process.env.PORT || 8000;

app.use(parser.json());

// Serve static files in our client folder
app.use(express.static(__dirname + '/../client'));

//Routes go here
app.get('/', function(req, res) {
  res.send('helllllooooooooo woooorld! :D');
});

app.listen(port, function() {
  console.log('Listening on port: ', port);
});

exports.app = app;
