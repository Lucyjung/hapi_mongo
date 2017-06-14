$(document).ready( function() {
  /*Tool Tip function*/
  $('[data-toggle="tooltip"]').tooltip();
  $('#home-topbar').load('html/topbar.html');
  getUserList(function(status,data){
    $('#login-as').html(getCookie('firstname'));
    $('#admin-member-table > tbody').children().each(function(){
        this.remove();
    });
    var userlist = data.userlist;
    for (var i in userlist){
      let user_id = userlist[i].id;
      let groupName = userlist[i].groups.length > 0 ? userlist[i].groups[0].name : '-';
      let toAppendHtml = '<tr>' +
      '<td><a href="#/member-setting" id="'+ user_id+ '">' + userlist[i].login + '</a></td>' +
      '<td>' + userlist[i].firstname + '</td>' +
      '<td>' + userlist[i].lastname + '</td>' +
      '<td>' + groupName+ '</td>' +
      '</tr>';
      $('#admin-member-table > tbody:last-child').append(toAppendHtml);
      $('#' + user_id).data("userData",userlist[i]);
      document.getElementById(user_id).onclick = memberTbl_OnClick;
    }
  })
});
function memberTbl_OnClick(){
  let userData = $(this).data('userData');
  getUserRole(userData.login, function(status, data){
    elementLoaded('#member-setting-rolelist',function(){
      $('#member-setting-member-table > tbody').children().each(function(){
          this.remove();
      });
      let groupName = userData.groups.length > 0 ? userData.groups[0].name : '-';
      toAppendHtml = '<tr>' +
      '<td id="member-setting-username">' + userData.login + '</td>' +
      '<td>' + userData.firstname + '</td>' +
      '<td>' + userData.lastname + '</td>' +
      '<td>' + groupName + '</td>' +
      '</tr>';
      $('#member-setting-member-table > tbody:last-child').append(toAppendHtml);
      $('#member-setting-rolelist').empty();
      let idList = data.idList;
      let count = 0;
      for (let roleName in data.ownRole){
        let toAppendHtml =
        '<div class="col-md-12">' +
        '<input type="checkbox" id="' + idList[count]+ '">' +
        '<label for="'+ idList[count] +'">' +
        '<span></span>' +
              roleName
        '</label>' +
        '</div>';
        $('#member-setting-rolelist').append(toAppendHtml);
        $('#'+idList[count]).prop('checked',data.ownRole[roleName] );
        count++;
      }
    });
  });



}
