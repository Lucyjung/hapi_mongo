'use strict';

const Hapi = require('hapi');
const Good = require('good');
const routes = require('./src/routes.js');
const config = require('./src/config');
const auth = require('./src/middleware/auth');
const Path = require('path');
const pubRoute = require('./src/config/public.js')
const server = new Hapi.Server();

// Include Mongoose ORM to connect with database
var mongoose = require('mongoose');

mongoose.connect(config.database.host);

server.connection(config.application);

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    // load dependencies
    server.route(pubRoute);
});

server.register({
      register: require('hapi-qs'),
      options: {} /* optional */
    }
);

server.register(require('hapi-auth-basic'), (err) => {
    server.auth.strategy('redmine', 'basic', { validateFunc: auth.validate });
		for (var route in routes) {
			server.route(routes[route]);
		}
});

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
