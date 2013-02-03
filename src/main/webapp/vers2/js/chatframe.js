/**
 * @date 2012-10-12
 * @author luowen
 */
// <!--------- 留言版------------->
var S 			= {};
S.ws 			= {};
//加载父页面的变量
S.CST			= window.parent.Core.CST;
S.location 		= window.parent.Core.url+'?act=';
S.wsmsg 		= window.parent.Core.config.wsmsg;
S.frd 			= {};

// 消息内容片断
S.cnt = {
	p1 : "<div class=message onclick=reply('",
	p2 : "')><span class=msg_header ><a class='link' href=javascript:void(0)>[",
	p3 : "]&nbsp;</a></span><span class=msg_cnt >",
	p4 : "</span><span class=msg_dttm>",
	p5 : "</span></span>"
}

// 拼接消息块
function parseToBlock(json) {
	return S.cnt.p1 + json.name + S.cnt.p2 + json.name + S.cnt.p3 + json.cnt
			+ S.cnt.p4 + json.date + S.cnt.p5;
}

S.startWebSocket = function(wsinitial) {
	if(!window.WebSocket)
		alert("WebSocket not supported by this browser!");
	// 创建WebSocket
	S.ws = new WebSocket("ws://"+S.CST.HOST+"/mychat/ws?wsinitial="+wsinitial);
	// 收到消息时在消息框内显示
	S.ws.onmessage = function(evt) {
		appendMsg(evt.data);
	};
	// 断开时会走这个方法
	S.ws.onclose = function() {
		appendMsg('websocket closed');
	};
	// 连接上时走这个方法
	S.ws.onopen = function() {
		appendMsg('websocket opened');
	};
}

// 发送消息 - WebSocket Msg
function sendMsg() {
	var data = document.getElementById('msg_').value;
	S.ws.send(handleMsg(data));
	document.getElementById('msg_').value = '';

}

//添加消息
function appendMsg(data) {
	var msgBox 			= $('#vid_chat_content');
	msgBox.append(data + '</br>');
//	c.append(parseToBlock(j.result[i])).children().last().css({
//			opacity : 0.2
//		}).animate({
//			opacity : 1
//		},1000,'swing');
	//滚动条跟随
	msgBox[0].scrollTop = msgBox[0].scrollHeight;
}

//处理消息格式
function handleMsg(data) {
	var frdinfo		 	= S.frd[getToken()];
	S.wsmsg.ctn 		= data;
	S.wsmsg.sder 		= frdinfo.owner;
	S.wsmsg.rcver 		= frdinfo.friend;
	S.wsmsg.token 		= new Date().getTime();
	S.wsmsg.sderalias		= frdinfo.ownerDetailsTO.alias;
	S.wsmsg.rcveralias		= frdinfo.friendDetailsTO.alias;
	return JSON.stringify(S.wsmsg);
}

//解析url token
function getToken(){
	return window.location.search.split('?t=')[1];
}


function flush() {
	// alert("ajax--");
	$('#vid_chat_content').html(
			"<div class=message><center>留言数据 加载中....</center></div>");
	var url = S.location + "msg";
	$.get(url, function(resp) {
		// handle response JSON data
		var j = JSON.parse(resp);
		if (j.success == true) {
			var c = $("#vid_chat_content");
			c.html('');// clear content
			for (var i=j.result.length-1;i>=0;--i){
				c.append(parseToBlock(j.result[i])).children().last().css({
						opacity : .2
					}).animate({
						opacity : 1
					},1000,'swing');
			}
		}
		addListener_color();
		addListener_box();
	});
}

function send_msg() {
	var msg_cnt = document.getElementById("msg_").value;
	var user_name = document.getElementById("name_").value;
	document.getElementById("msg_").value = "";
	if (msg_cnt == "")
		return null;
	$.ajax({
		type : "get",
		url : S.location + "/msg",
		data : {
			"msg_cnt" : msg_cnt,
			"user_name" : user_name
		},
		dataType : "json",
		error : function() {
			alert("请左上角 登录 后留言！\n");
		},
		success : function() {
			// alert(111);
			//ajax_2();
			console.log('send successed.')
		}
	});
}

function reply(name) {
	document.getElementById("msg_").value = "@" + name + " ";
	$('#msg_').focus();
	// $('#msg_').value(name);
}

function addListener_color() {
	$(document).ready(function() {
		$('.message').each(function() {
			$(this).hover(function() {
				$(this).css("background", "PowderBlue");
			}, function() {
				$(this).css("background", "#FFEFD5");
			});
		});
	});
}

$(document).ready(function() {
	//按钮hover事件 
	$('.btns').live('mouseenter', function(){
		$(this).css("opacity", "1");
		$(this).css("cursor", "pointer");	
	}).live('mouseout', function(){
		$(this).css("opacity", "0.3");
	})
	
	$("#name_").click(function(){
		$(this).css("border-bottom", "white");
	});
});

// ///////////////////////
// //------键盘事件------///
// //////////////////////
$(document).ready(function() {
	$(document).keydown(function(event) {
		// 回车键
		if (event.which == 13) {
//			send_msg();
			sendMsg();
		}
	});
});

// ///////////////////////
// //------留言提示层-----///
// //////////////////////
function addListener_box() {
	$(document).ready(function() {
		var j = 0;
		$(".link").each(function() {
			var linkId = "link" + (++j);
			$(this).attr("id", linkId);
			$(this).css("float", "left");
			var boxId = '.box';
			$(this).hover(function() {
				addBox(linkId);
				// ajax_details();
			}, function() {
				$(boxId).remove();
				// $("#"+linkId).hover(
				// function(){
				// ;
				// },
				// function(){
				// $(boxId).remove();
				// });
			});
		});
	});
}

function addBox(linkId) {
	var name = $("#" + linkId).html();
	var str_2 = "<div class='box' id='box_" + linkId
			+ "' style='position: absolute;' >@" + name + "_" + linkId
			+ "</div>";
	var str_1 = name;
	// $(linkId).html(str_1+str_2);
	document.getElementById(linkId).innerHTML = str_1 + str_2;
	$('.box').css({
		color : "white",
		width : "auto",
		height : "auto",
		border : "0px",
		padding : "3px",
		"text-align" : "left",
		"background-color" : "WindowFrame"
	});
	name = name.replace(/<[^<>]+>/g, ""); // 去掉name字符串中的html标记
	getDetails("#box_" + linkId, name);
}
function getDetails(box_linkId, name) {
	$(box_linkId).html(" 资料加载中...");
	$.ajax({
		type : "get",
		url : S.location + "/info",
		data : {
			"name" : name
		},
		dataType : "html",
		error : function() {
			$(box_linkId).html("暂时无法请求资料");
		},
		success : function(html) {
			$(box_linkId).html(html);
			addCss();
		}
	});
}
function addCss() {
	$('.s_item').css({
		height : "20px",
		width : "40px",
		"float" : "left",
		"text-align" : "right"
	});
	$('.s_content').css({
		width : "55px",
		"float" : "right",
		"text-align" : "left"
	});
	$('.s_cell').css({
		height : "20px",
		width : "100px"
	});
	$('.s_all').css({
		width : "110px"
	});
}
function ajax_details() {
	$.ajax({
		type : "get",
		url : S.location + "/discuss",
		data : {},
		dataType : "html",
		success : function(html) {
			// document.getElementById("vid_chat_content").innerHTML=html;
			// $('#vid_chat_content').html(html);
		}
	});
}