$(document).ready(function () {

  if (location.pathname === '/media') {
    $.ajax({
      url: '/mediaFiles',
      success: function (res) {
        console.log('res ', res);
        for (var i = 0; i < JSON.parse(res).media.length; i++) {

        }
      }
    });
  }

});
