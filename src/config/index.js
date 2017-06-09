module.exports = function() {
  var configObj = {
    application: {
      host: 'localhost',
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
