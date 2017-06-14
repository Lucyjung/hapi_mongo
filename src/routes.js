const MainController = require('./controllers/MainController');
const UserController = require('./controllers/UserController');
const RoleController = require('./controllers/RoleController');
const Joi = require('joi');

module.exports =  [

	// User endpoint
	{
	  method: 'POST',
	  path: '/login',
		config: {
			auth: 'redmine',
			cors : true
		},
	  handler: UserController.login
	},
	{
		method: 'GET',
	  path: '/user/list',
		config: {
			auth: 'redmine',
			cors : true,
		},
	  handler: UserController.list
	},
	{
	  method: 'PUT',
	  path: '/user/{username}/role',
		config: {
			auth: 'redmine',
			cors : true,
			validate: {
        // Id is required field
        params: {
          username: Joi.string().required()
        }
      }
		},
	  handler: UserController.setRole
	},
	{
		method: 'GET',
	  path: '/user/{username}/role',
		config: {
			auth: 'redmine',
			cors : true,
			validate: {
        // Id is required field
        params: {
          username: Joi.string().required()
        }
      }
		},
	  handler: UserController.getRole
	},
	{
		method: 'GET',
	  path: '/user/roles',
		config: {
			auth: 'redmine',
			cors : true,
		},
	  handler: UserController.getRoles
	},
	// Role endpoint
	{
		method: 'POST',
	  path: '/role',
		config: {
			auth: 'redmine',
			cors : true,
		},
	  handler: RoleController.create
	},
	{
		method: 'GET',
	  path: '/roles',
		config: {
			auth: 'redmine',
			cors : true,
		},
	  handler: RoleController.findAll
	},
	{
		method: 'GET',
	  path: '/role/{id}',
		config: {
			auth: 'redmine',
			cors : true,
			validate: {
        // Id is required field
        params: {
          id: Joi.string().required()
        }
      }
		},
	  handler: RoleController.findOne
	},
	{
		method: 'PUT',
	  path: '/role/{id}',
		config: {
			auth: 'redmine',
			cors : true,
			validate: {
        // Id is required field
        params: {
          id: Joi.string().required()
        }
      }
		},
	  handler: RoleController.update
	},
	{
		method: 'DELETE',
	  path: '/role/{id}',
		config: {
			auth: 'redmine',
			cors : true,
			validate: {
        // Id is required field
        params: {
          id: Joi.string().required()
        }
      }
		},
	  handler: RoleController.delete
	}
];
