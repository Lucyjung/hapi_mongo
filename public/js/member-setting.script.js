$(document).ready( function() {
  /*Tool Tip function*/
  $('[data-toggle="tooltip"]').tooltip();
  $('#home-topbar').load('html/topbar.html');
  $('#login-as').html(getCookie('firstname'));
  $('#btnMem_save').on("click",function(){
    let $set = $('#member-setting-rolelist').find("input:checked");
    let len = $set.length;
    let completedCnt = 0;
    let roleIdList = [];
    $set.each(function() {
        roleIdList.push($(this).prop('id'));
    });
    let username = $('#member-setting-username').html();
    setUserRole(username,roleIdList,function(status, data){
      console.log(data);
    })
  });
});
