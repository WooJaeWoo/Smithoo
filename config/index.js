var path = require('path');

module.exports = {
	root: require('./root.js'),
	app: {
		port: 3000,
		evn: "production"
	},
	session: {
		secret: "smithoo",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 3600000
		}
	},
	database: {
		localhost: "mongodb://localhost:27017/smithoo",
		options: {}
	},
	error: require('./error.js')
};
