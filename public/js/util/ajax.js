// AJAX Utilities function

function ajaxGet(url, query_data, callback){
  var url_param = url;
  if (Object.keys(query_data).length > 0){
      url_param = url + '?';
      for (var key in query_data){
        url_param += key + '=' + query_data[key];
        url_param += '&';
    }
  }

  $.ajax({
    type : "GET",
    url: url_param,
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " +
        btoa(getCookie('username') + ":" + getCookie('password')));
    },
    error: function(error) {
      callback(error);
    },
    success: function(data) {
      if (data.statusCode == 200){
        callback(null,data);
      }
      else{
        callback(data.statusCode,data);
      }

    }
  })
};

function ajaxPost(url, data, callback){
  $.ajax({
    type : "POST",
    url: url,
    data : data,
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " +
        btoa(getCookie('username') + ":" + getCookie('password')));
    },
    error: function(error) {
      callback(error);
    },
    success: function(data) {
      if (data.statusCode == 200){
        callback(null,data);
      }
      else{
        callback(data.statusCode,data);
      }
    }
  });
};

function ajaxDelete(url, data, callback){
  $.ajax({
    type : "DELETE",
    url: url,
    data : data,
    jsonp: true,
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " +
      btoa(getCookie('username') + ":" + getCookie('password')));
    },
    error: function(error) {
      callback(error);
    },
    success: function(data) {
      if (data.statusCode == 200){
        callback(null,data);
      }
      else{
        callback(data.statusCode,data);
      }
    }
  });
};

function ajaxPut(url, data, callback){
  $.ajax({
    type : "PUT",
    url: url,
    data : data,
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " +
      btoa(getCookie('username') + ":" + getCookie('password')));
    },
    error: function(error) {
      callback(error);
    },
    success: function(data) {
      if (data.statusCode == 200){
        callback(null,data);
      }
      else{
        callback(data.statusCode,data);
      }
    }
  });
};

function ajaxAuth(url, userInfo, data, callback){
  $.ajax({
    type : "POST",
    url: url,
    data : data,
    jsonp: true,
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "Basic " +
        btoa(userInfo.username + ":" + userInfo.password));
    },
    error: function(error) {
      callback(error);
    },
    success: function(data) {
      if (data.statusCode == 200){
        setCookie('username',userInfo.username,1);
        setCookie('password',userInfo.password,1);
        callback(null,data);
        callback(null,data);
      }
      else{
        callback(data.statusCode,data);
      }

    }
  });
};


function ajaxUpload(url, formData , callback){
  $.ajax({
    type: "POST",
    url: url,
    data: formData,
    //use contentType, processData for sure.
    contentType: false,
    processData: false,
    beforeSend: function() {
      xhr.setRequestHeader ("Authorization", "Basic " +
      btoa(getCookie('username') + ":" + getCookie('password')));

    },
    success: function(data) {
        callback(null, data);
    },
    error: function(err) {
        callback(err, data);
    }
    });
};
