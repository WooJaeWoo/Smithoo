var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var morgan = require('morgan');
var morganDaily = require('file-stream-rotator');
var Logger = require('./bin/logger.js');
var logger = new Logger();
var pm = new (require('./bin/processManager.js'))();
var mongoose = require('mongoose');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var todo = require('./routes/todo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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
// Session for passport
app.use(expressSession({
	secret: 'smithoo',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/todo', todo);

pm.makeKillProcessShell();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

process.on('SIGINT', function() {
	console.log("\nServer is dead!");
	process.exit();
});


module.exports = app;
