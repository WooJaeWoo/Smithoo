// Require basic modules
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

// Require logging modules
var morgan = require('morgan');
var morganDaily = require('file-stream-rotator');
var Logger = require('./bin/logger.js');
global.logger = new Logger();

// Require authentication modules
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// Express configuration
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use basic modules
app.use(express.static(PUBLIC_ROOT));
app.use(favicon(path.join(PUBLIC_ROOT, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Use logger modules
// Console logger
app.use(morgan('dev'));
// File logger (daily errors)
app.use(morgan("[:date[iso]] :method :url :status (:response-time ms) - :res[content-length]", {
	skip: function (req, res) { return res.statusCode < 400 },
	stream: morganDaily.getStream({
		filename: __dirname + "/log/smithoo_http(%DATE%).log",
		frequency: "daily",
		verbose: false,
		date_format: "YYYY-MM-DD"
	})
}));

// Use authentication modules
app.use(expressSession({
	secret: 'smithoo',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 3600000
	}
}));
app.use(passport.initialize());
app.use(passport.session());


// Routers
var routes = require(path.join(SRC_ROOT, '/routes/index'));
var users = require('./routes/users');
var todo = require('./routes/todo');

app.use('/', routes);
app.use('/users', users);
app.use('/todo', todo);

// Webapp health check
app.get('/status', function(req, res) {
	res.send(new Buffer(JSON.stringify({
		pid: process.pid,
		memory: process.memoryUsage(),
		uptime: process.uptime()
	})));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
