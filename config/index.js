var path = require('path');

module.exports = {
	root: require('./root.js'),
	app: {
		env: "development",
		port: 3000,
		testPort: 3001
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
		url: "mongodb://localhost:27017/smithoo",
		testUrl: "mongodb://localhost:27017/smithooTest",
		options: {}
	},
	error: require('./error.js')
};
