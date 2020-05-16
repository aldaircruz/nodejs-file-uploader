require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', require('./uploadHandler'));

var server = app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
