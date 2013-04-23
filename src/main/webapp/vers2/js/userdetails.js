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
	wsinitial.reciever	= Core.CST.STATUS.LOGIN_TOKEN;
	// 创建WebSocket
	ws = new WebSocket("ws://"+Core.CST.HOST+"/mychat/ws?wsinitial="+JSON.stringify(wsinitial));
	// 收到消息时在消息框内显示
	ws.onmessage = function(evt) {onmessage(evt);};
	// 断开时会走这个方法
	ws.onclose = function() {};
	// 连接上时走这个方法
	ws.onopen = function() {};
	
	var onmessage = function(evt) {
		var data = JSON.parse(evt.data);
		if(data.msgType === Core.CST.STATUS.STATUS_CHG){
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
			var uid = el.data('info').friend||el.data('info').uid; 
			if(res[uid] && res[uid]['status']===Core.CST.STATUS.ONLINE){
				if(Core.isoffline(el)){
					Core.sortList.sort2Top(el);//Core.sort2Top(el);
					el.find('.f_img.f_img_hide').removeClass('f_img_hide');
				}
			}else if(res[uid] && res[uid]['status']===Core.CST.STATUS.LEAVE){
				el.find('.f_img').addClass('f_img_leave');
				//Core.sortList.top(el);//Core.sort2Top(el);
			}else{
				if(!Core.isoffline(el)){
					Core.sortList.bottom(el);
					el.find('.f_img').addClass('f_img_hide');
				}
			}
//			Core.sortUserLit();
		});
	});
}

Core.sortList = (function() {
	var sort = function(li, updown){
		var index = li.parent().children(':has(.f_img_hide)').first().index();
		li.slideUp(500, function() {
			li.insertBefore(li.siblings().eq(index+updown));
		}).slideDown(500);
	};

	var sort2Top = function($this) {
		$this.slideUp(500, function() {
	        $this.insertBefore($this.siblings().eq(0));
	    }).slideDown(500);	
	}
	return {
		top:function(li){
			sort(li,0);
		},
		bottom:function(li){
			sort(li,-1);
		},
		sort2Top:function(li){
			sort2Top(li);
		},
		down:function(){
			
		}
	}
})(); 


Core.isoffline = function(li){
	return li.has('.f_img_hide').length>0;
}
