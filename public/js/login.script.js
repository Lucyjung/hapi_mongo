$('#btn-login').on("click",function(){
    var username = $('#inputUserID').val();
    var password = $('#inputPassword').val();
    login(username, password, function(status,data){
      if (status){
        $("#show-invalid-password").show();
      }
      else{
        setCookie('firstname',data.data.firstname);
        $("#show-invalid-password").hide();
        window.location.href = "#/home"
      }
    })
});
$(document).ready( function() {
  $('#home-topbar').empty();
});
