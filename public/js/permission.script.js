$(document).ready( function() {
  /*Tool Tip function*/
  $('[data-toggle="tooltip"]').tooltip();
  $('#home-topbar').load('html/topbar.html');
  getRoles(function(status,data){
    $('#login-as').html(getCookie('firstname'));
    $('#admin-permission-table > tbody').children().each(function(){
        this.remove();
    });

    let rolelist = data.data;
    for (let i in rolelist){
      let role_id = rolelist[i]._id;
      toAppendHtml = '<tr>' +
      '<td><a href="#/permission-setting" id="'+ role_id+ '">' + rolelist[i].name + '</a></td>' +
      '<td>' + 'Delete' + '</td>' +
      '</tr>';
      $('#admin-permission-table > tbody:last-child').append(toAppendHtml);
      $('#' + role_id).data("roleData",rolelist[i]);
      document.getElementById(role_id).onclick = permissionTbl_OnClick;
    }
  })
});
function permissionTbl_OnClick(){
  let roleData = $(this).data('roleData');

  elementLoaded('#InputRole',function(){
    $('#InputRole').val(roleData.name);
    $('#InputRole').prop('readonly', true);
    $('#permission-setting-role-id').val(roleData._id);
    setObjByData('#permission-setting-list',roleData.permission);
  });
}
