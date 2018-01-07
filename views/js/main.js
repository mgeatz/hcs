if (location.hash.length !== 7) {
  $.ajax({
    url: '/version',
    success: function (sha) {
      console.log('version = ', sha);
      var versionNumber = JSON.parse(sha).version;
      $('#version').text(versionNumber);
      location.hash=versionNumber;
    }
  });
} else {
  $('#version').text(location.hash);
}
