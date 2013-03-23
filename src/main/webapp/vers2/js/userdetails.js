/**
 * @date: 2013-1-15
 * 
 * @author: luowen
 */

Core.userinfo = (function(){
	var userInfo = {};
	var getInfo  = function(sel,fn){
		var uid = GetStoragedUID();
		var url = Core.url + "?act=gud"+"&uid="+uid;
		$.get(url, function(resp) {
			var result = JSON.parse(resp);
			//localStorage.setItem("u_details", {});
			userInfo = result;
			//callback function
			if(fn)fn(sel);
		});
	};
	getInfo();
	
	return {
		getInfo:function(){
			return userInfo;
		},
		setInfo:function(obj){
			console.log("setInfo: " + obj);
		},
		refresh:function(sel,fn){
			getInfo(sel,fn);
		}
	}
})();

//初始化websocket
Core.initws = function(){
	if(!window.WebSocket)
		alert("WebSocket not supported by this browser!");
	var wsinitial 		= Core.config.infostruct.wsinit();
	wsinitial.sender	= GetStoragedUID();
	wsinitial.reciever	= -1;	// '-1' is an user login token.
	// 创建WebSocket
	ws = new WebSocket("ws://"+Core.CST.HOST+"/mychat/ws?wsinitial="+JSON.stringify(wsinitial));
	// 收到消息时在消息框内显示
	ws.onmessage = function(evt) {onmessage(evt);};
	// 断开时会走这个方法
	ws.onclose = function() {
//		S.wsmsg.ctn 	= 'websocket closed';
//		appendMsg(JSON.stringify(S.wsmsg));
	};
	// 连接上时走这个方法
	ws.onopen = function() {
//		S.wsmsg.ctn 	= 'websocket opened';
//		appendMsg(JSON.stringify(S.wsmsg));
	};
	
	var onmessage = function(evt) {
		var data = JSON.parse(evt.data);
		if(data.msgType === Core.status.STATUS_CHG){
			Core.updateUserStatus();
		}
	}
};


Core.updateUserStatus = function(window_warp){
	$.get(Core.url+"?act=gus",function(res){
		res = JSON.parse(res);
		console.log(res);
		var selector = window_warp?'#'+window_warp:'';
		var b = $(selector+' .userListBody');
		b.children().each(function(){
			var el  = $(this);
			var uid = el.data('info').friend; 
			if(res[uid] && res[uid]['status']===Core.status.ONLINE){
				el.find('.f_img').removeClass('f_img_hide');
			}else if(res[uid] && res[uid]['status']===Core.status.LEAVE){
				el.find('.f_img').addClass('f_img_leave');
			}else{
				el.find('.f_img').addClass('f_img_hide');
			}
		});
	});
}
