$(document).ready(function () {

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
    mediaFiles.forEach(function (value, index) {
      var $media = $('#media'),
        mediaType = value.toLowerCase().substr(value.length-4);
      if (mediaType.split('')[0] === '.') {

        switch (mediaChoice) {
          case 'photos':
            console.log('photos case');
            if (mediaType === '.jpg' || mediaType === '.png') {
              $media.html('');
              $media.append('<img width="100" src="'+value+'"/>');
            }
            break;
          case 'movies':
            console.log('movies case');
            if (mediaType === '.mov' || mediaType === '.3gp' || mediaType === '.mp4') {
              $media.html('');
              $media.append('<video width="320" height="240" controls>'+
                '<source src="'+ value +'" type="video/'+ mediaType.split('.')[1] +'">'+
                'Your browser does not support the video tag.'+
              '</video>');
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

  $('#audio').click(function(){
    getMedia('audio');
  });

  $('#docs').click(function(){
    getMedia('docs');
  });

});
