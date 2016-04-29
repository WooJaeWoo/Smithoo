UI.Cccard = {};
UI.Cccard.destroy = function() {
	$(".cccard").off();
};

UI.Cccard.init = function() {
	PAGE.init();

	$(".cccard").on("click", function() {
		if (PAGE.COUNT === 0) {
			var nav = $(".cardNav");
			nav.addClass("blur").one("transitionend", function() {
				nav.css("display", "none");
			});
		} else {
			PAGE.clearPage();
		}

		//END condition
		if (PAGE.COUNT >= PAGE.getTotalPage()) {
			this._endEvent();
			return;
		}

		PAGE.COUNT++;
		PAGE.setPage(CONTENTS["page" + PAGE.COUNT]);

	}.bind(this));
};

UI.Cccard._endEvent = function() {
	$(".cccard").off();
	var nav = $(".cardNav");
	nav.css("display", "block").css("opacity");
	nav.removeClass("blur");
	$(".cccard h3").text("END");
	$("#retryButton").css("display", "inline").one("click", function() {
		this.init();
	}.bind(this));
};

var PAGE = {
    COUNT : 0,
    PAGE_COLORS : ["#EF9A9A", "#F48FB1", "#CE93D8", "#B39DDB", "#64B5F6", "#81C784", "#D4E157", "#AED581", "#FF8A65", "#FFB74D", "#FFAB40"],
    init: function() {
        this.COUNT = 0;
        
        var startText = "";
        if (UTIL.isMobile()) {
            startText = "TOUCH TO START";
        } else {
            startText = "CLICK TO START";
        }
        $(".cccard h3").text(startText);
        
        var nav = $(".cardNav");
        nav.removeClass("blur");
        
        $("#retryButton").css("display", "none");
    },
    getTotalPage: function() {
        return Object.keys(CONTENTS).length;
    },
    clearPage: function() {
        BOX.animateOut();
        $("#spinBox").one("animationend", function() {
            
        });
        $(".row").empty();
	},
    setPage: function(page) {
		//Page Background
		this._setBgColor(page.bgColor);
        
		//each Box setting
        var boxes = BOX.getTotalBox(this.COUNT);
		for (var i = 1; i <= boxes; i++) {
            BOX.COUNT = i;
			BOX.addBox(page["box" + i]);
            BOX.animateIn($("#box" + i));
		}
        BOX.COUNT = 0;
	},
    _setBgColor: function() {
        var colorIndex = UTIL.rand(this.PAGE_COLORS.length);
		$(".cccard").css("background-color", this.PAGE_COLORS[colorIndex]);
	}
};

var BOX = {
    COUNT : 0,
    getTotalBox : function(pageNum) {
        return Object.keys(CONTENTS["page" + pageNum]).length;
    },
    addBox : function(boxInfo) {
        this._setBoxInfo(boxInfo);
        
        $(".row").append(this._boxTemplate(boxInfo));
        
		this._scaleText($("#" + boxInfo.id).children(), boxInfo);
	},
    animateIn : function(box) {
        //add transition-delay by boxId
        var delay = box.attr("id").substring(3,4) * 0.4;
        box.css("transitionDelay", delay + "s");

        //delay start 400ms
        setTimeout(function() {
            box.removeClass("left")
               .removeClass("top")
               .removeClass("right")
               .removeClass("bottom");
        }, 400);
        
    },
    animateOut : function() {        
        //translate
        var boxes = this.getTotalBox(PAGE.COUNT);
        for (var i = 1; i <= boxes; i++) {
            var from = $("#box" + i).data("from");
            $("#box" + i).addClass(from);
        }
    },
    _setBoxInfo : function(boxInfo) {
        this._setBoxId(boxInfo);
        this._setTextDirection(boxInfo);
        this._setTextLength(boxInfo.text);
    },
    _setBoxId : function(boxInfo) {
        boxInfo.id = "box" + this.COUNT;
    },
    _setTextDirection : function(boxInfo) {
        //vertical = "span" / horisontal = "nobr"
        var col = parseInt(boxInfo.grid.col.substring(1,2));
        if (col === 1) {
            boxInfo.text.tag = "span";
        } else {
            boxInfo.text.tag = "nobr";
        }
    },
    _boxTemplate : function(boxInfo) {
        var source = $("#" + boxInfo.text.tag + "Template").html();
        var template = Handlebars.compile(source);
        var rendered = template({
            boxId: boxInfo.id,
            col: boxInfo.grid.col,
            row: boxInfo.grid.row,
            margin: boxInfo.grid.margin,
            from: boxInfo.from,
            boxText: boxInfo.text.contents
        });
        return rendered;   
    },
    _setTextLength : function(text) {
        text.length = text.contents.length;
	},
	_scaleText : function(text, boxInfo) {
        var textLenghth = parseFloat(boxInfo.text.length);
        var col = parseFloat(boxInfo.grid.col.substring(1,2));
        var row = parseInt(boxInfo.grid.row.substring(1,2));
        if (boxInfo.text.tag === "span") {
            text.css("transform", "scaleY(" + row/textLenghth + ")");
        } else {
            text.css("transform", "scale(" + col/textLenghth + "," + row + ")")
                .css("padding", "2px 3px");
        }
	},
    boxInfomation : function(boxData) {
        return {
            "id" : "",
            "grid" : {
                "col" : boxData[0],
                "row" : boxData[1],
                "margin" : boxData[2]
            },
            "text" : {
                "contents" : boxData[3],
                "length" : 0,
                "tag" : ""
            },
            "from" : boxData[4]
        };
    }
};

//BOX.boxInfomation([grid.col, grid.row, grid.margin, text.content, from]);
var CONTENTS = {
    "page1" : {
		"box1" : BOX.boxInfomation(["c3", "r3", "", "안녕", "left"]),
		"box2" : BOX.boxInfomation(["c1", "r3", "", "반가워", "top"]),
		"box3" : BOX.boxInfomation(["c4", "r1", "", "굳굳굳굳", "bottom"])
	},
    "page2" : {
        "box1" : BOX.boxInfomation(["c4", "r2", "", "스미스의", "top"]),
		"box2" : BOX.boxInfomation(["c4", "r1", "", "유아이", "right"]),
		"box3" : BOX.boxInfomation(["c4", "r1", "", "공작소", "left"])
	},
    "page3" : {
        "box1" : BOX.boxInfomation(["c2", "r2", "", "세상이", "left"]),
		"box2" : BOX.boxInfomation(["c2", "r2", "", "그대를", "top"]),
		"box3" : BOX.boxInfomation(["c4", "r2", "", "속일지몰라도", "right"])
	},
    "page4" : {
        "box1" : BOX.boxInfomation(["c3", "r2", "", "내가", "top"]),
		"box2" : BOX.boxInfomation(["c1", "r4", "", "그대곁에", "right"]),
		"box3" : BOX.boxInfomation(["c3", "r1", "mt2", "있음을", "left"]),
        "box4" : BOX.boxInfomation(["c3", "r1", "mt1", "기억해요", "bottom"])
	},
    "page5" : {
        "box1" : BOX.boxInfomation(["c4", "r1", "", "안녕  ", "top"]),
		"box2" : BOX.boxInfomation(["c4", "r3", "", ":)", "bottom"])
	}
};