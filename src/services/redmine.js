const request = require('request');
const each = require('async/each')
const redmineConfig =  {
  url: 'http://10.164.232.200/redmine/',
  //url: 'http://127.0.0.1/redmine/',
  authPath: 'users/current.json?include=memberships,groups',
  userlist: 'users.json?limit=100',
  userDetail_pre: 'users/',
  userDetail_post: '.json?include=memberships,groups',
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
            var userlist = [];
            each(resData.users,function(user,asyncCB){

              request.get(redmineConfig.url + redmineConfig.userDetail_pre +
                user.id + redmineConfig.userDetail_post, {
                'auth': {
                  'user': username,
                  'pass': password
                }
              },function (error, response, body) {

                if (error){
                  asyncCB(error)
                }
                else{
                  let userDetail = JSON.parse(body);
                  userlist.push(userDetail.user);
                  asyncCB(null);
                }

              });
            },function(err){
              if( err ) {
                // One of the iterations produced an error.
                // All processing will now stop.
                callback(err);
              } else {
                callback(null, userlist);
              }
            });
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
