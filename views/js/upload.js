$('.progress').hide();
$('#upload_controls').show();

$('.upload-btn').on('click', function () {
  var $progressBar = $('.progress-bar');
  $('#upload-input').click();
  $progressBar.text('0%');
  $progressBar.width('0%');
});
$('#upload-input').on('change', function () {

  $('.progress').show();
  $('#upload_controls').hide();

  var files = $(this).get(0).files,
    $progressBar = $('.progress-bar');
  if (files.length > 0) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append('uploads[]', file, file.name);
    }
    $.ajax({
      url: '/api/v1/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        console.log('upload successful!\n' + data);
      },
      xhr: function () {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            $progressBar.text(percentComplete + '%');
            $progressBar.width(percentComplete + '%');
            if (percentComplete === 100) {
              $progressBar.html('Done');
              $('#success_messaging').html('<a href="/media">Go To Your Files</a>');
            }
          }
        }, false);
        return xhr;
      }
    });
  }
});
