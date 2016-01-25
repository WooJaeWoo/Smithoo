var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/user");

var todoUserSchema = new Schema({
	name: { type: String, required: true },
	password: { type: String, required: true }
}, {
	collection: "todo",
	versionKey: false
});

var TodoUser = mongoose.model("TodoUser", todoUserSchema);

module.exports = TodoUser;