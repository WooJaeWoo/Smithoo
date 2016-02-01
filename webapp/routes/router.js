module.exports = function(app, passport) {
	
	app.use("/", require("./index"));
	
	app.use("/todo", require("./todo"));
	
	app.use("/card", require("./card"));
	
};