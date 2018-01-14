$.ajax({
  url: '/api/v1/version',
  success: function (sha) {
    console.log('version = ', sha);
    $('#version').text(JSON.parse(sha).version);
    sessionStorage.setItem('version', JSON.parse(sha).version);
  }
});
