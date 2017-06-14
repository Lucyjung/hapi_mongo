var RoleModel = require('../models/Roles')
module.exports = {
  create: function (request, reply) {
    var role = new RoleModel(request.payload);
    role.save(function(err) {
      if (!err) {
        reply({
            statusCode: 200,
            message: 'Role Created Successfully',
        });
      } else {
          if (11000 === err.code || 11001 === err.code) {
              reply(Boom.forbidden("please provide another role id, it already exist"));
          }
          else reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
      }
    });
  },
  update: function (request, reply) {

    // convert string to boolean
    for (let i in request.payload.permission){
      request.payload.permission[i] = request.payload.permission[i] == 'true';
    }
    
    RoleModel.update({_id: request.params.id}, request.payload, function (error, data) {
      console.log(data);
      if (error) {
        reply({
            statusCode: 503,
            message: 'Failed to get data',
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
  findOne: function (request, reply) {
    RoleModel.find({_id: request.params.id}, function (error, data) {
      if (error) {
        reply({
          statusCode: 503,
          message: 'Failed to get data',
          data: error
        });
      } else {
        if (data.length === 0) {
          reply({
            statusCode: 200,
            message: 'User Not Found',
            data: data
          });
        } else {
          reply({
            statusCode: 200,
            message: 'User Data Successfully Fetched',
            data: data
          });
        }
      }
    });
  },
  findAll: function (request, reply) {
    RoleModel.find({}, function (error, data) {
      if (error) {
        reply({
          statusCode: 503,
          message: 'Failed to get data',
          data: error
        });
      } else {
        reply({
          statusCode: 200,
          message: 'Role Data Successfully Fetched',
          data: data
        });
      }
    });
  },
  delete: function (request, reply) {

    // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
    RoleModel.findOneAndRemove({_id: request.params.id}, function (error) {
      if (error) {
        reply({
          statusCode: 503,
          message: 'Error in removing Role',
          data: error
        });
      } else {
        reply({
          statusCode: 200,
          message: 'Role Deleted Successfully'
        });
      }
    });

  }
}
