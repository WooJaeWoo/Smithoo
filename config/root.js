var path = require('path');

var app_root = path.dirname(require.main.filename);

module.exports = {
	APP_ROOT: app_root,
	MODEL_ROOT: path.join(app_root, 'webapp/models'),
	VIEW_ROOT: path.join(app_root, 'webapp/views'),
	ROUTER_ROOT: path.join(app_root, 'webapp/routes'),
	PUBLIC_ROOT: path.join(app_root, 'webapp/public')
};