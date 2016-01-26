var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');

var Logger = function() {
	var logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console) ({
				level: 'debug'
			}),
			new winstonDaily ({
				name: "service_log",
				level: 'info',
				json: false,
				filename: "./log/smithoo_service",
				datePattern: "(yyyy-MM-dd).log"
			})
		],
		exitOnError: false
	});

	return logger;
};

module.exports = Logger;