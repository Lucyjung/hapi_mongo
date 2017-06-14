
const redmineService = require('../services/redmine');
const UserModel = require('../models/Users');
const RoleModel = require('../models/Roles');
const each = require('async/each')

module.exports = {

  login: function (request, reply) {
    reply({
      statusCode: 200,
      data: request.auth.credentials
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
      role: []
    }
    if (request.payload && request.payload.role){
      update.role =  request.payload.role;
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
        RoleModel.find({},function(error, rolelist){

          if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get role',
                data: error
            });
          }
          else{
            let ownRoleIds =  data.length > 0 ? data[0].role : [];
            let returnRole = {};
            let roleIdList = [];
            for (let i in rolelist){
              let roleName = rolelist[i].name;
              let isOwn = ownRoleIds.indexOf(rolelist[i]._id.toString()) > -1;
              returnRole[roleName] = isOwn
              roleIdList.push(rolelist[i]._id);
            }
            reply({
                statusCode: 200,
                message: 'User Role is Fetched',
                username: request.params.username,
                ownRole: returnRole,
                idList: roleIdList
            });
          }
        })

      }
    });
  },
  getRoles: function (request, reply) {

    UserModel.find({}, function (error, records) {
      if (error) {
        reply({
            statusCode: 503,
            message: 'Failed to get Roles',
            data: error
        });
      } else {
        if (records && records.length > 0){
          results = [];
          each(records,function(record,callback){
              RoleModel.find({_id: record.role}, function (error, roleInfo) {
                if (error){
                  callback('Failed to get Role Info');
                }
                else{

                  let cloned = Object.assign({}, record);
                  let result = cloned._doc; // workaround for mongoose ??
                  result.roleName = roleInfo[0].name;
                  console.log(result);
                  results.push(result);

                  callback();
                }

              });
          },function(err){
            if( err ) {
              // One of the iterations produced an error.
              // All processing will now stop.
              reply({
                statusCode: 503,
                message: 'Failed to get Roles',
                data: err
              });
            } else {
              reply({
                statusCode: 200,
                message: 'User Roles are Fetched',
                data: results
              });
            }
          });
        }
      }
    });
  },
}
