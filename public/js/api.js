
function login(username, password, callback){
  var userInfo = {
    username: username,
    password: password
  }
  ajaxAuth(api_url + 'login',userInfo,{},function(status,data){
    callback(status,data);
  })
}

function getUserList( callback){
  ajaxGet(api_url + 'user/list',[],function(status,data){
    callback(status,data);
  })
}

function getUserRole(username, callback){
  ajaxGet(api_url + 'user/' + username + '/role' ,[],function(status,data){
    callback(status,data);
  })
}

function setUserRole(username, role, callback){
  var update_data = {
    role: role
  }
  ajaxPut(api_url + 'user/' + username + '/role' ,update_data,function(status,data){
    callback(status,data);
  })
}

function getUserRoles(callback){
  ajaxGet(api_url + 'user/Roles' ,[],function(status,data){
    callback(status,data);
  })
}

function createRole(roleInfo, callback){
  ajaxPost(api_url + 'role' ,roleInfo,function(status,data){
    callback(status,data);
  })
}

function getRoles(callback){
  ajaxGet(api_url + 'roles' ,[],function(status,data){
    callback(status,data);
  })
}

function getRole(id, callback){
  ajaxGet(api_url + 'role/' + id,[],function(status,data){
    callback(status,data);
  })
}
function updateRole(id, roleData, callback){

  ajaxPut(api_url + 'role/' + id,roleData,function(status,data){
    callback(status,data);
  })
}
function deleteRole(id, newRole, callback){
  ajaxPut(api_url + 'role/' + id,function(status,data){
    callback(status,data);
  })
}

// Wait for element to exist.
function elementLoaded(el, cb) {
  if ($(el).length) {
    // Element is now loaded.
    cb($(el));
  } else {
    // Repeat every 1ms.
    setTimeout(function() {
      elementLoaded(el, cb)
    }, 1);
  }
};

function getFormDataByObj(obj, formData){
  $(obj).find("input[type='text']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });

  $(obj).find("input[type='number']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });

  $(obj).find("input[type='hidden']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });

  $(obj).find("input[type='password']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });

  $(obj).find(":selected").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).val();
    }
  });

  $(obj).find("input[type='checkbox']").each(function () {
    var name = $(this).attr('name');
    if (name != undefined){
      formData[name] = $(this).is(':checked');
    }
  });

};
function setObjByData(obj, data){
  for (let name in data){
    $(obj).find('input[name="'+ name + '"]').each(function () {
      switch($(this).prop('type')) {
          case "checkbox":
              $(this).prop('checked', data[name]);
              break;
          case "text":
              $(this).val(data[name]);
              break;
          default:
              break;
      }
    });
  }


};
