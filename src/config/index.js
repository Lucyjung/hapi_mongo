const Path = require('path');
module.exports = function() {
  var configObj = {
    application: {
      port: 3000
    },
    database: {
      host: 'mongodb://localhost:27017/template',
			user: '',
			password: ''
    }
  }
	return configObj;
}();
