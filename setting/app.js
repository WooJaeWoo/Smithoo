var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var expressSession = require('express-session');
var flash = require('connect-flash');
		
var setting = require('./../setting')
var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(app) {
	
	// app.set
	app.set('port', config.app.port);
	app.set('views', config.root.VIEW_ROOT);
	app.set('view engine', 'ejs');
	
	// basic middleware
	app.use(express.static(config.root.PUBLIC_ROOT));
	app.use(favicon(path.join(config.root.PUBLIC_ROOT, 'favicon.ico')));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(expressSession(config.session));

	// Middleware setting
	setting.logger(app);
	setting.mongoose(mongoose);
	setting.passport(passport);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	
	// Routing
	require(config.root.ROUTER_ROOT)(app, passport);
	
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
	
};
