module.exports = function(mongoose) {
	var db = config.database;

	var env = process.env.NODE_ENV || "development";

	//if (env == "development")
	return mongoose.connect(db.localhost);
};
