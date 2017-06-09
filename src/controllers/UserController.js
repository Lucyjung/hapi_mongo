
const redmineService = require('../services/redmine');
const UserModel = require('../models/Users')
module.exports = {

  login: function (request, reply) {
    reply({
      statusCode: 200,
    });
  },
  list: function (request, reply){
    let username = request.auth.credentials.username;
    let password = request.auth.credentials.password;

    redmineService.userlist(username, password, function(error,userlist){
      if(error){
        reply({
          statusCode: 503,
          message: error
        });
      }
      else{
        reply({
          statusCode: 200,
          userlist: userlist
        });
      }
    });
  },
  setRole: function (request, reply) {
    let query = {
      username: request.params.username
    };
    let update = {
      role: request.payload.role
    }
    UserModel.findOneAndUpdate(query, update, {upsert:true}, function (error, data) {
      if (error) {
        reply({
            statusCode: 503,
            message: 'Failed to set role',
            data: error
        });
      } else {
        reply({
            statusCode: 200,
            message: 'Role Updated Successfully',
            data: data
        });
      }
    });
  },
  getRole: function (request, reply) {
    let query = {
      username: request.params.username
    };
    UserModel.find(query, function (error, data) {
      if (error) {
        reply({
            statusCode: 503,
            message: 'Failed to get role',
            data: error
        });
      } else {
        reply({
            statusCode: 200,
            message: 'User Role is Fetched',
            data: data
        });
      }
    });
  },
}
