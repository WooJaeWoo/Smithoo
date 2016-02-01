var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoUser = new Schema({
		name: { type: String, required: true },
		password: { type: String, required: true }
	}, {
		collection: "todoUser",
		versionKey: false
	});

module.exports = mongoose.model("TodoUser", todoUser);
