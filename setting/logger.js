var morgan = require('morgan');
var morganDaily = require('file-stream-rotator');
var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');

module.exports = function(app) {
	
	// Set morgan logger for web server
	var filePattern = "[:date[iso]] :method :url :status (:response-time ms) - :res[content-length]";
	app.use(morgan('dev'));
	app.use(morgan(filePattern, {
		skip: function (req, res) { return res.statusCode < 400 },
		stream: morganDaily.getStream({
			filename: config.root.APP_ROOT + "/log/smithoo_http(%DATE%).log",
			frequency: "daily",
			verbose: false,
			date_format: "YYYY-MM-DD"
		})
	}));
	
	
	// Set winston logger for service
	var winstonLogger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console) ({
				level: 'debug'
			}),
			new winstonDaily ({
				name: "service_log",
				level: 'info',
				json: false,
				filename: config.root.APP_ROOT + "/log/smithoo_service",
				datePattern: "(yyyy-MM-dd).log"
			})
		],
		exitOnError: false
	});
	
	global.logger = winstonLogger;
	
};