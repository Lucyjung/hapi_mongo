$(document).ready( function() {
  /*Tool Tip function*/
  $('[data-toggle="tooltip"]').tooltip();
  $('#home-topbar').load('html/topbar.html');
  $('#login-as').html(getCookie('firstname'));
  $('#btn-save').on("click",function(){
    let role_id = $('#permission-setting-role-id').val();
    let formData = {};
    formData.permission = {};
    formData.name = $('#InputRole').val();
    getFormDataByObj('#permission-setting-list',formData.permission);
    updateRole(role_id,formData,function(status,data){
      //TODO : ask design what to show ?
    })
  });
});
