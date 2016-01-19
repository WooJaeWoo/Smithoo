var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Mongoose connect success!");
});

var userSchema = mongoose.Schema({
	name: String,
	age: Number,
	hobby: {
		hobby1: String,
		hobby2: String
	}
}, { versionKey: false });

userSchema.methods.tell = function() {
	console.log("I'm " + this.name +"! Nice to meet you!");
}

var User = mongoose.model('User', userSchema);

var user1 = new User({
	name: "Smithoo",
	age: 10,
	hobby: {
		hobby1: "NFL",
		hobby2: "djembe"
	}
});

var user2 = new User({
	name: "Jimin",
	age: 11,
	hobby: {
		hobby1: "sing a song"
	}
});

user2.save(function(err, user2) {
	if (err) return console.error(err);
	user2.tell();
});

