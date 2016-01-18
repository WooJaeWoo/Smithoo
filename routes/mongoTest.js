var mongo = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/smithoo";

mongo.connect(url, function(err, db) {
	if (err) {
		console.error(err);
	}

	console.log("Connected correctly to mongodb server");

	findTest(db, function() {
		db.close();
	});

});


var findTest = function(db, callback) {
	var data = db.collection('ourToDo').find();
	data.each(function(err, doc) {
		if (err) {
			console.log(err)
		}
		if (doc) {
			for (var i in doc) {
				console.log("COLLECTION DOC key: " + i);
				console.log("COLLECTION DOC value: " + doc[i]);
			}
		}
		callback();
	});
};
