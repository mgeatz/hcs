$('.upload-btn').on('click', function () {
  var $progressBar = $('.progress-bar');
  $('#upload-input').click();
  $progressBar.text('0%');
  $progressBar.width('0%');
});
$('#upload-input').on('change', function () {
  var files = $(this).get(0).files,
    $progressBar = $('.progress-bar');
  if (files.length > 0) {
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append('uploads[]', file, file.name);
    }
    $.ajax({
      url: '/upload',
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
            }
          }
        }, false);
        return xhr;
      }
    });
  }
});
