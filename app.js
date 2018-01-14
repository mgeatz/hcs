let express = require('express'),
  app = express(),
  path = require('path'),
  formidable = require('formidable'),
  fs = require('fs'),
  git = require('git-rev'),
  config = require('config'),
  api = config.get('api');

app.use(express.static(path.join(__dirname, 'public')));

// ***** WHITELIST ***** //

app.use(function (req, res, next) {
  let whitelist = config.get('whitelist'),
    clientIpFull = req.ip.split(':'),
    clientIp = clientIpFull[clientIpFull.length - 1];

  console.log('ip ', clientIp);
  if (whitelist.indexOf(clientIp) !== -1) {
    next();
  } else {
    console.log('Non-whitelist IP address attempted access', clientIp);
    return false;
  }
});

// ******* ROUTES ****** //

/**
 * @ROUTE home
 * @Description Transition the user to index
 */
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

/**
 * @ROUTE other routes
 * @Description Transition the user to some other page
 */
app.get('/:routePath', function (req, res) {
  console.log('req.params.routePath', req.params.routePath);
  let routePath = req.params.routePath;

  res.sendFile(path.join(__dirname, 'views/' + routePath + '.html'));
});

// ******** API ******** //

/**
 * @API upload file to tray1
 * @Method POST
 */
app.post(api.v1.upload, function (req, res) {
  // create an incoming form object
  let form = new formidable.IncomingForm(),
    tray1 = config.get('diskLocations.tray1');

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, tray1);
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function (field, file) {
    // specialId produces "WeekDay-Month-Day-Year-Hour"
    let date = new Date(),
      specialId = date.toString().split(':')[0].split(' ').join('-'),
      theFile = path.join(form.uploadDir, specialId + '-BTAG_New_TAGE-' + file.name);

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

/**
 * @API
 * @METHOD GET
 * @params
 *  /:routePath - tray identifier - Integer - required
 *  /:resourceType - media type identifier - String - optional (i.e., '?')
 *  /:tag - media tag - String - optional (i.e., '?')
 * @description fetch files from a tray, optionally return files by resource type and tag
 */
app.get(api.v1.mediaFiles + '/:routePath' + '/:resourceType?' + '/:tag?', function (req, res) {
  let routePath = req.params.routePath,
    resourceType = req.params.resourceType,
    tag = req.params.tag,
    mediaFolder = path.join(__dirname, '/public/tray' + routePath + '/root/media'),
    mediaArray = [];

  console.log('req.params.routePath ', req.params);

  fs.readdir(mediaFolder, (err, files) => {

    switch (resourceType) {

      case 'photo':
        files.forEach((file) => {
          let mediaType = file.toLowerCase().substr(file.length - 4);
          // Sun-Jan-14-2018-15-BTAG_New_TAGE-1_wizard.jpg

          if (tag === 'tag_less') {

            if (mediaType === '.jpg' || mediaType === '.png') {
              //console.log('/tray' + routePath + '/root/media/', file);
              mediaArray.push('/tray' + routePath + '/root/media/' + file);
            }

          } else {
            let splitBTAG = file.split('BTAG_');

            console.log('splitBTAG ', splitBTAG);
            if (splitBTAG !== undefined) {
              let tagPost = splitBTAG[1],
                splitTAGE = tagPost.split('_TAGE'),
                thisTag = splitTAGE[0];

              if (mediaType === '.jpg' || mediaType === '.png') {

                console.log('thisTag ', thisTag);
                if (thisTag === tag) {
                  //console.log('/tray' + routePath + '/root/media/', file);
                  mediaArray.push('/tray' + routePath + '/root/media/' + file);
                }

              }

            }
          }

        });
        break;

      default:
        console.log('default case');

        files.forEach((file) => {
          //console.log('/tray' + routePath + '/root/media/', file);
          mediaArray.push('/tray' + routePath + '/root/media/' + file);
        });

    }

    res.send(JSON.stringify({media: mediaArray}, null, 3));
    //console.log('mediaArray1 ', mediaArray);

  });

});

/**
 * @API get version number
 */
app.get(api.v1.version, function (req, res) {
  git.short(function (str) {
    console.log('short', str);
    res.send(JSON.stringify({version: str}, null, 3));
  });
});

/**
 * @API get logs
 */
app.get(api.v1.logs, function (req, res) {
  console.log('service coming soon.');
});

/**
 * @API get hcsName
 */
app.get(api.v1.hcsName, function (req, res) {
  let hcsName = config.get('hcsName');
  res.send(JSON.stringify({hcsName: hcsName}, null, 3));
});

let server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
