module.exports = function(app, passport) {
	
	// Test router "http://url + ?test=1"
	app.use(function(req, res, next) {
		res.locals.showTest = config.app.env === "development" && req.query.test === "1";
		next();
	});
	
	app.use("/", require("./index"));
	
	app.use("/ui", require("./ui"));
	
	app.use("/todo", require("./todo"));
	
	app.use("/card", require("./card"));
	
};
