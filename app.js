var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.23:3000');
  res.setHeader('Access-Control-Allow-Origin', 'http://geatz:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/media', function (req, res) {
  console.log('dirname ' + __dirname);
  res.sendFile(path.join(__dirname, 'views/media.html'));
});

app.post('/upload', function (req, res) {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../../../tray1/root/media');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function (field, file) {
    // specialId produces "WeekDay-Month-Day-Year-Hour"
    var date = new Date(),
      specialId = date.toString().split(':')[0].split(' ').join('-'),
      theFile = path.join(form.uploadDir, specialId + '-' + file.name );
    console.log('uploading: ', theFile);
    fs.rename(file.path, theFile);
  });

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

app.get('/mediaFiles', function (req, res) {
  var mediaFolder = path.join(__dirname, '/public/tray1/root/media'),
    mediaArray = [];

  fs.readdir(mediaFolder, (err, files) => {
    files.forEach((file) => {
    console.log('/tray1/root/media/', file);
    mediaArray.push('/tray1/root/media/' + file);
  });
  res.send(JSON.stringify({media: mediaArray}, null, 3));
  console.log('mediaArray ', mediaArray);

});


});

app.get('/files', function (req, res) {
  res.sendFile(path.join(__dirname, 'myfiles.json'));
});

app.get('/refreshFiles', function (req, res) {

  var jsonObj = [], time = new Date(), loc = path.join(__dirname, '../../../../tray1/root/media/');
  console.log('Refresh myfiles.json file at ' + time);
  fs.readdir(loc, function (err, files) {
    if (err) return;
    files.forEach(function (f, index) {
      console.log('Files: ' + f);
      if (index === 0) {
        jsonObj.push('{"' + index + '":"' + loc + f + '"');
      } else if (index === files.length - 1) {
        jsonObj.push('"' + index + '":"' + loc + f + '"}');
      } else {
        jsonObj.push('"' + index + '":"' + loc + f + '"');
      }
    });
  });

  fs.writeFile(path.join(__dirname, 'myfiles.json'), jsonObj, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  res.send(JSON.stringify({refresh: 'myfile.json'}, null, 3));

});

var jsonObj = []

fs.readdir(path.join(__dirname, '../../../../tray1/root/media'), function (err, files) {
  if (err) return;
  files.forEach(function (f, index) {
    console.log('Files: ' + f);
    if (index === 0) {
      jsonObj.push('{"' + index + '":"' + f + '"');
    } else if (index === files.length - 1) {
      jsonObj.push('"' + index + '":"' + f + '"}');
    } else {
      jsonObj.push('"' + index + '":"' + f + '"');
    }
  });
});

fs.writeFile(path.join(__dirname, 'myfiles.json'), jsonObj, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});


var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
