module.exports = {
	
	app: function(app) {
		require('./app')(app);
	},
	
	logger: function(logger) {
		require('./logger')(logger);
	},
	
	mongoose: function(mongoose) {
		require('./mongoose')(mongoose);
	},
	
	passport: function(passport) {
		require('./passport')(passport);
	}
	
};