require('dotenv').config();

var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

const port = process.env.PORT;
const uploadDir = path.resolve(process.env.UPLOAD_DIR);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

function onError(res, err) {
  console.log('An error has occured: \n' + err);
  return res.status(500);
}

app.post('/upload', function (req, res) {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = uploadDir;

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name), function (error) {

      if (error) {
        return onError(res, error);
      }

      console.log('done');
    });
  });

  // log any errors that occur
  form.on('error', function(error) {
    return onError(res, error);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

var server = app.listen(port, function(){
  console.log(`Server listening on port ${port}`);
});
