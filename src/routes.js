const MainController = require('./controllers/MainController');
const UserController = require('./controllers/UserController');
const RoleController = require('./controllers/RoleController');
const Joi = require('joi');
module.exports =  [
	// Main endpoint
	{
	  method: 'GET',
	  path: '/',
	  handler: MainController.index
	},

	// User endpoint
	{
	  method: 'POST',
	  path: '/login',
		config: { auth: 'redmine' },
	  handler: UserController.login
	},
	{
		method: 'GET',
	  path: '/user/list',
		config: { auth: 'redmine' },
	  handler: UserController.list
	},
	{
	  method: 'PUT',
	  path: '/user/{username}/role',
		config: { auth: 'redmine' },
	  handler: UserController.setRole
	},
	{
		method: 'GET',
	  path: '/user/{username}/role',
		config: { auth: 'redmine' },
	  handler: UserController.getRole
	},
	// Role endpoint
	{
		method: 'POST',
	  path: '/role',
		config: { auth: 'redmine' },
	  handler: RoleController.create
	},
	{
		method: 'GET',
	  path: '/roles',
		config: { auth: 'redmine' },
	  handler: RoleController.findAll
	},
	{
		method: 'GET',
	  path: '/role/{id}',
		config: {
			auth: 'redmine',
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
	  path: '/role',
		config: { auth: 'redmine' },
	  handler: RoleController.update
	},
	{
		method: 'DELETE',
	  path: '/role/{id}',
		config: {
			auth: 'redmine',
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
