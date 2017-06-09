
const redmineService = require('../services/redmine');
module.exports = {

  validate: function (request, username, password, callback)  {
    if (username && password){
      redmineService.auth(username,password, function(error, user){
        var ret_data ={};
        if (error){
          return callback(null,false);
        }
        else {
          user.username = username;
          user.password = password;
          return callback(null,true,user);
        }
      });
    }
    else{
      return callback(null,false);
    }
  }
}
