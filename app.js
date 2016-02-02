// Set config as global
global.config = require('./config');

var express = require('express');
var setting = require('./setting');
var http = require('http');

// Create express instance
var app = express();

// App setting
setting.app(app);


// Server starts to listen
var server = http.createServer(app);
var port = config.app.testPort;
if (config.app.env == "production") {
	port = config.app.port;
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	//debug('Listening on ' + bind);
}
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
		throw error;
	}
}

