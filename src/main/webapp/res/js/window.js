$().ready(function() {
	$("#windowtemp").data("info", {
		width : 100,
		height : 100,
		left : 0,
		top : 0
	});
	$(".title").bind("mousedown", function(e) {
		x = e.screenX; // 鼠标位于屏幕的left
		y = e.screenY; // 鼠标位于屏幕的top
		sT = $("#windowtemp").offset().top;
		sL = $("#windowtemp").offset().left;
		$(document).bind("mousemove", function(e) {
			eX = e.screenX; // 鼠标位于屏幕的left
			eY = e.screenY; // 鼠标位于屏幕的top
			lessX = eX - x; // 距初始位置的偏移量
			lessY = eY - y; // 距初始位置的偏移量
			_l = sL + lessX;
			_t = sT + lessY;
			_w = $("#windowtemp").data("info").width + "px";
			_h = $("#windowtemp").data("info").height + "px";
			$("#windowtemp").css({
				width : _w,
				height : _h,
				left : _l,
				top : _t
			});
		});
	});
	$(document).bind("mouseup", function() {
		$(this).unbind("mousemove");
		$("#windowtemp").data("info", {
			width : $("#windowtemp").width(),
			height : $("#windowtemp").height()
		});
	});
	var moveline = {
		't' : '',
		'r' : '',
		'b' : '',
		'l' : '',
		'rt' : '',
		'rb' : '',
		'lt' : '',
		'lb' : ''
	};
	var ml = "";
	for (ml in moveline) {
		// 依次绑定8个方向的缩放拖动事件
		bindResize(ml);
	}
});

function bindResize(ml) {
	$("#windowtemp div[resize='" + ml + "']").bind("mousedown", function(e) {
		x = (e.offsetX == undefined) ? getOffset(e).offsetX : e.offsetX;
		y = (e.offsetY == undefined) ? getOffset(e).offsetY : e.offsetY;
		cy = e.clientY;
		cx = e.clientX;
		h = $("#windowtemp").height();
		w = $("#windowtemp").width();
		$(document).unbind("mousemove").bind("mousemove", function(e) {
			switch (ml) {
			case "t":
				if (h + cy - e.clientY > 50) {
					$("#windowtemp").css("height", h + cy - e.clientY).css("top", e.clientY - y);
				}
				break;
			case "r":
				if (w - cx + e.clientX > 100) {
					$("#windowtemp").css("width", w - cx + e.clientX);
				}
				break;
			case "b":
				if (h - cy + e.clientY > 50) {
					$("#windowtemp").css("height", h - cy + e.clientY);
				}
				break;
			case "l":
				if (w + cx - e.clientX > 100) {
					$("#windowtemp").css("width", w + cx - e.clientX).css("left", e.clientX - x);
				}
				break;
			case "rt":
				if (h + cy - e.clientY > 50) {
					$("#windowtemp").css("height", h + cy - e.clientY).css("top", e.clientY - y);
				}
				if (w - cx + e.clientX > 100) {
					$("#windowtemp").css("width", w - cx + e.clientX);
				}
				break;
			case "rb":
				if (w - cx + e.clientX > 100) {
					$("#windowtemp").css("width", w - cx + e.clientX);
				}
				if (h - cy + e.clientY > 50) {
					$("#windowtemp").css("height", h - cy + e.clientY);
				}
				break;
			case "lt":
				if (w + cx - e.clientX > 100) {
					$("#windowtemp").css("width", w + cx - e.clientX).css("left", e.clientX - x);
				}
				if (h + cy - e.clientY > 50) {
					$("#windowtemp").css("height", h + cy - e.clientY).css("top", e.clientY - y);
				}
				break;
			case "lb":
				if (w + cx - e.clientX > 100) {
					$("#windowtemp").css("width", w + cx - e.clientX).css("left", e.clientX - x);
				}
				if (h - cy + e.clientY > 50) {
					$("#windowtemp").css("height", h - cy + e.clientY);
				}
				break;
			}
		});
	});
}

function getOffset(e) {
	var target = e.target;
	if (target.offsetLeft == undefined) {
		target = target.parentNode;
	}
	var pageCoord = getPageCoord(target);
	var eventCoord = {
		x : window.pageXOffset + e.clientX,
		y : window.pageYOffset + e.clientY
	};
	var offset = {
		offsetX : eventCoord.x - pageCoord.x,
		offsetY : eventCoord.y - pageCoord.y
	};
	return offset;
}
function getPageCoord(element) {
	var coord = {
		x : 0,
		y : 0
	};
	while (element) {
		coord.x += element.offsetLeft;
		coord.y += element.offsetTop;
		element = element.offsetParent;
	}
	return coord;
}