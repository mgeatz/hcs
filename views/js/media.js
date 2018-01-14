var mediaFiles,
  filesRequested;

if (location.pathname === '/media') {
  $.ajax({
    url: '/api/v1/mediaFiles/1',
    success: function (res) {
      console.log('res ', res);
      mediaFiles = JSON.parse(res).media;
    }
  });
}

var fetchResources = function (resourceType, targetId) {
  var trayPath = location.pathname.split('media')[1],
    tray = (trayPath === '') ? '1' : trayPath;
  $.ajax({
    url: '/api/v1/mediaFiles/' + tray + '/' + resourceType + '/' + targetId,
    success: function (res) {
      console.log('res ', res);
      filesRequested = JSON.parse(res).media;
    }
  });
};

var getMedia = function (mediaChoice) {
  $('#media').html('');
  mediaFiles.forEach(function (value, index) {
    var $media = $('#media'),
      mediaType = value.toLowerCase().substr(value.length - 4);
    if (mediaType.split('')[0] === '.') {

      switch (mediaChoice) {
        case 'photos':
          console.log('photos case');
          // show tags
          // /tray1/root/media/Sun-Jan-14-2018-15-BTAG_New_TAGE-1_wizard.jpg

          var splitBTAG = value.split('BTAG_');

          if (mediaType === '.jpg' || mediaType === '.png') {

            if (splitBTAG.length>1) {
              // find tag
              var tagPre = splitBTAG[0],
                tagPost = splitBTAG[1],
                splitTAGE = tagPost.split('_TAGE'),
                resource = splitTAGE[1],
                tag = splitTAGE[0];

              if (tag.toLowerCase() === 'new') {
                $media.append('<button resourceType="photo" class="tag btn btn-warning" id="' + tag + '">' + tag + '</button>');
              } else {
                $media.append('<button resourceType="photo" class="tag btn btn-primary" id="' + tag + '">' + tag + '</button>');
              }

            } else {
              if ($('#tag_less').length === 0) {
                $media.append('<button resourceType="photo" class="tag btn btn-danger" id="tag_less">No Tag</button>');
              }
            }

            /*$media.append('<div style="background: #ddd; border: 5px solid #ddd; border-radius: 2px;' +
              ' display:inline-block; margin: 5px;"><img width="70" src="' + value + '"/><br>' +
              '<a href="' + value + '" target="_blank">VIEW</a>&nbsp;&nbsp;<sup><u>EDIT</u></sup>' +
              '</div>');*/
          }
          break;
        case 'movies':
          console.log('movies case');
          if (mediaType === '.mov' || mediaType === '.3gp' || mediaType === '.mp4') {
            $media.append('<a href="' + value + '" target="_blank" style="color: white;">' + value + '</a><br>');
          }
          break;
        case 'docs':
          console.log('docs case');
          break;
      }

      // documents
      // .pdf .csv

    } else if (mediaType.split('')[0] === 'd') {
      // check for the following formats

      // documents
      // .docx

    } else if (mediaType.indexOf('.sh') !== -1) {
      console.log('script found - ', value, ' target for removal.');
    }
  });

  $('.tag').click(function(event){
    var targetId = event.target.id,
      resourceType = target.attributes[0].value;
    console.log('targetId ', targetId, ' resourceType ', resourceType);
    fetchResources(resourceType, targetId);
  });

};

$('#photos').click(function () {
  getMedia('photos');
});

$('#videos').click(function () {
  getMedia('movies');
});

$('#docs').click(function () {
  getMedia('docs');
});

