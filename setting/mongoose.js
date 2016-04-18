module.exports = function(mongoose) {
	var db = config.database;
	var env = config.app.env;
	if (env == "development") {
		return mongoose.connect(db.testUrl);
	} else if (env == "production") {
		return mongoose.connect(db.url);
	} else {
		return mongoose.connect(db.testUrl);
	}
};
