var mediaFiles,
  filesRequested,
  locPath = location.pathname,
  trayTarget = null,
  bulkEditArray = [];

if (locPath.indexOf('media') !== -1) {

  switch (locPath) {
    case '/media':
      trayTarget = '1';
      break;
    case '/media2':
      trayTarget = '2';
      break;
    case '/media3':
      trayTarget = '3';
      break;
    case '/media4':
      trayTarget = '4';
      break;
  }

  $.ajax({
    url: '/api/v1/mediaFiles/' + trayTarget,
    success: function (res) {
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
      var filesRequested = JSON.parse(res).media,
        $media = $('#media');

      $media.html('');

      filesRequested.forEach(function (file) {

        $media.append('<div style="background: #ddd; border: 5px solid #ddd; border-radius: 2px;' +
          ' display:inline-block; margin: 5px;"><img height="100" src="' + file + '" style="margin-bottom:10px"/><br>' +
          '<a href="' + file + '" target="_blank"><u>OPEN</u></a>&nbsp;&nbsp;' +
          '<button class="' + file + 'btn btn-default btn-xs" data-toggle="modal" data-target=".edit"' +
          ' id="' + file + '">EDIT</button><br><sub>Select bulk edit: </sub><input type="checkbox" class="bulk_in" '+
          'fileName="' + file + '" style="width:15px;"/></div>');
      });

      $media.prepend('<button class="btn btn-warning" id="bulk_edit_btn" data-toggle="modal" ' +
        'data-target=".bulk_edit">Bulk Edit</button><br><br>');

      // SINGLE :: edit
      $('#save_tag').click(function () {
        var tag = $('#tag').val(),
          file = $('.file_name').text().split('/'),
          fileName = file[file.length - 1],
          whiteSpaceExp = /^\s+$/g;

        if (/\s/g.test(tag)) {
          alert('::: ERROR ::: You cannot have spaces in a tag name!');
        } else {
          $.ajax({
            url: '/api/v1/mediaFiles/' + trayTarget + '/' + fileName + '/' + tag,
            type: 'PUT',
            success: function (res) {
              console.log('UPDATE success ', res);
              location.reload();
            },
            failure: function (error) {
              console.log('error ', error);
            }
          });
        }
      });

      // SINGLE :: delete
      $('#delete_image').click(function () {
        var file = $('.file_name').text().split('/'),
          fileName = file[file.length - 1];

        $.ajax({
          url: '/api/v1/mediaFiles/' + trayTarget + '/' + fileName,
          type: 'DELETE',
          success: function (res) {
            console.log('DELETE success ', res);
            location.reload();
          },
          failure: function (error) {
            console.log('error ', error);
          }
        });
      });


      // BULK :: edit
      $('#bulk_save_tag').click(function () {
        var tag = $('#bulk_tag').val(),
          whiteSpaceExp = /^\s+$/g;

        if (/\s/g.test(tag)) {
          alert('::: ERROR ::: You cannot have spaces in a tag name!');
        } else {

          for(var j=0; j < bulkEditArray.length; j++) {
            var file = bulkEditArray[j].split('/'),
              fileName = file[file.length - 1];

            $.ajax({
              url: '/api/v1/mediaFiles/' + trayTarget + '/' + fileName + '/' + tag,
              type: 'PUT',
              success: function (res) {
                console.log('UPDATE success ', res);
                location.reload();
              },
              failure: function (error) {
                console.log('error ', error);
              }
            });
          }

        }
      });

      // BULK :: delete
      $('#bulk_delete_image').click(function () {

        for(var j=0; j < bulkEditArray.length; j++) {
          var file = bulkEditArray[j].split('/'),
            fileName = file[file.length - 1];

          $.ajax({
            url: '/api/v1/mediaFiles/' + trayTarget + '/' + fileName,
            type: 'DELETE',
            success: function (res) {
              console.log('DELETE success ', res);
              location.reload();
            },
            failure: function (error) {
              console.log('error ', error);
            }
          });
        }

      });

      // BULK :: close
      $('#bulk_close').click(function() {
        bulkEditArray = [];
      });

    },
    failure: function (error) {
      console.log('failed ', error);
    }
  });
};

var getMedia = function (mediaChoice) {
  var $media = $('#media');

  window.stop();
  $media.html('');

  if (mediaFiles === undefined) {
    $media.text('No Files Found.');
  } else {
    mediaFiles.forEach(function (value, index) {
      var $media = $('#media'),
        mediaType = value.toLowerCase().substr(value.length - 4);

      if (mediaType.split('')[0] === '.') {

        switch (mediaChoice) {
          case 'photos':
            // show tags
            // /tray1/root/media/Sun-Jan-14-2018-15-BTAG_New_TAGE-1_wizard.jpg

            var splitBTAG = value.split('BTAG_');

            if (mediaType === '.jpg' || mediaType === '.png') {

              if (splitBTAG.length > 1) {
                // find tag
                var tagPost = splitBTAG[1],
                  splitTAGE = tagPost.split('_TAGE'),
                  tag = splitTAGE[0];

                if (tag.toLowerCase() === 'new') {
                  $media.append('<button resourceType="photo" class="' + tag + ' tag btn btn-warning" id="' + tag + '">' + tag + '</button>');
                } else if ($('.' + tag + '').length < 1) {
                  $media.append('<button resourceType="photo" class="' + tag + ' tag btn btn-primary" id="' + tag + '">' + tag + '</button>');
                }

              } else {
                if ($('#tag_less').length === 0) {
                  $media.append('<button resourceType="photo" class="tag btn btn-danger" id="tag_less">No Tag</button>');
                }
              }
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

    $('.tag').click(function (event) {
      var targetId = event.target.id,
        resourceType = event.target.attributes[0].value;
      console.log('targetId ', targetId, ' resourceType ', resourceType);
      fetchResources(resourceType, targetId);
    });
  }

};


$('#edit_modal').on('show.bs.modal', function (event) {
  var file = event.relatedTarget.id,
    modal = $(this);

  window.stop();

  modal.find('.file_name').text(file);
  modal.find('.file_img').attr('src', file);
});

$('#bulk_edit_modal').on('show.bs.modal', function (event) {
  var modal = $(this);

  modal.find('.bulk_file_name').html('');

  for(var i=0; i < $('.bulk_in').length; i++) {
    var thisBox = $('.bulk_in')[i];
    if (thisBox.checked) {
      var file = $($('.bulk_in')[i]).attr('filename');
      bulkEditArray.push(file);
      modal.find('.bulk_file_name').append(file + ',<br>');
    }
  }

  window.stop();
  //
  // modal.find('.bulk_file_name').text(file);
  // modal.find('.bulk_file_img').attr('src', file);
});


$('#photos').click(function () {
  getMedia('photos');
});

$('#videos').click(function () {
  getMedia('movies');
});

$('#docs').click(function () {
  getMedia('docs');
});

