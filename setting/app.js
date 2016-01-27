module.exports = function(app) {
	
	var express = require('express');
	var favicon = require('serve-favicon');
	var bodyParser = require('body-parser');
	var cookieParser = require('cookie-parser');
	var path = require('path');
	
	// Require logging modules
	//var fs = require('fs');
	//var morgan = require('morgan');
	//var morganDaily = require('file-stream-rotator');
	//var Logger = require('./bin/logger.js');
	//global.logger = new Logger();
	app.set('port', config.app.port);
	app.set('views', config.root.VIEW_ROOT);
	app.set('view engine', 'ejs');
	
	app.use(express.static(config.root.PUBLIC_ROOT));
	app.use(favicon(path.join(config.root.PUBLIC_ROOT, 'favicon.ico')));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	
	
	
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

		
	var setting = require('./../setting')
	var passport = require('passport');
	var mongoose = require('mongoose');
	
	setting.mongoose(mongoose);
	setting.passport(passport);
	//setting.logger(logger);
	
	// Routing
	require(config.root.ROUTER_ROOT)(app, passport);
	
};