$(document).ready( function() {
  /*Tool Tip function*/
  $('[data-toggle="tooltip"]').tooltip();
  $('#home-topbar').load('html/topbar.html');
  getUserList(function(status){
    if(status){
      $('#topbar-admin-tab').hide();
    }
    else{
      $('#topbar-admin-tab').show();
    }
    $('#login-as').html(getCookie('firstname'));
  })
});
