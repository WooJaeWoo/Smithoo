var express = require('express');
var router = express.Router();

var uiList = ["ssspin"];

router.get("/:uiname", function(req, res, next) {
	var uiname = req.params.uiname;
	
	if (uiList.indexOf(uiname) > -1) {
		res.render("ui/" + uiname);
		return;
	}
	
	next();
});

module.exports = router;