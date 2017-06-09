const request = require('request');
const redmineConfig =  {
  //url: 'http://10.164.232.200/redmine/',
  url: 'http://127.0.0.1/redmine/',
  authPath: 'users/current.json',
  userlist: 'users.json',
};

module.exports = {
  auth: function (username, password, callback) {
    request.get(redmineConfig.url + redmineConfig.authPath, {
      'auth': {
        'user': username,
        'pass': password
      }
    },function (error, response, body) {
      if (error){
        callback(error);
      }else {
        try {
          var resData = JSON.parse(body);
          if (resData.user && resData.user.firstname){
            callback(null, resData.user);
          }
          else{
            callback('Redmine accessible with Invalid data');
          }
        }catch(err){
          callback(err);
        }

      }
    });
  },
  userlist: function(username, password,callback){
    request.get(redmineConfig.url + redmineConfig.userlist, {
      'auth': {
        'user': username,
        'pass': password
      }
    },function (error, response, body) {
      if (error){
        callback(error);
      }else {
        try {
          var resData = JSON.parse(body);
          if (resData.users){
            callback(null, resData.users);
          }
          else{
            callback('Redmine accessible with Invalid data');
          }
        }catch(err){
          callback(err);
        }
      }
    });
  }
}
