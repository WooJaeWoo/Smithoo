var fs = require("fs");

var PM = function() {}

PM.prototype.makeKillProcessShell = function() {
	// Console log Node PID
	var pid = process.pid;
	console.log("Node PID is " + pid);

	// Make kill process shell script
	var killCommand = "sudo kill -9 " + pid;
	fs.writeFile('./killProcess.sh', killCommand, function(err) {
		if(err) throw err;
		fs.chmod('./killProcess.sh', parseInt("764", 8), function(err) {
			console.log("Kill Process Shell write completed");
		});
	});
};

module.exports = PM;
