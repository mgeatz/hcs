var version = sessionStorage.getItem('version');
if (version === null) {
  $.ajax({
    url: '/version',
    success: function (sha) {
      console.log('version = ', sha);
      $('#version').text(JSON.parse(sha).version);
      sessionStorage.setItem('version', JSON.parse(sha).version);
    }
  });
} else {
  $('#version').text(sessionStorage.getItem('version'));
}
