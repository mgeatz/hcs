

  var mediaFiles;

  if (location.pathname === '/media') {
    $.ajax({
      url: '/mediaFiles',
      success: function (res) {
        console.log('res ', res);
        mediaFiles = JSON.parse(res).media;
      }
    });
  }

  var getMedia = function (mediaChoice) {
    $('#media').html('');
    mediaFiles.forEach(function (value, index) {
      var $media = $('#media'),
        mediaType = value.toLowerCase().substr(value.length-4);
      if (mediaType.split('')[0] === '.') {

        switch (mediaChoice) {
          case 'photos':
            console.log('photos case');
            if (mediaType === '.jpg' || mediaType === '.png') {
              $media.append('<div style="background: #ddd; border: 5px solid #ddd; border-radius: 2px;'+
                ' display:inline-block; margin: 5px;"><img width="70" src="'+value+'"/><br>'+
                '<a href="'+value+'" target="_blank">VIEW</a>&nbsp;&nbsp;<sup><u>EDIT</u></sup>'+
                '</div>');
            }
            break;
          case 'movies':
            console.log('movies case');
            if (mediaType === '.mov' || mediaType === '.3gp' || mediaType === '.mp4') {
              $media.append('<a href="'+value+'" target="_blank" style="color: white;">'+value+'</a><br>');
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
  };

  $('#photos').click(function(){
    getMedia('photos');
  });

  $('#videos').click(function(){
    getMedia('movies');
  });

  $('#docs').click(function(){
    getMedia('docs');
  });

