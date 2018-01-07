$.ajax({
  url: '/version',
  success: function (sha) {
    console.log('version = ', sha);
    $('#version').text(sha.version);
  }
});