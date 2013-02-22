/**
 * @date 2012-10-16
 * @author luowen
 */

GetStoragedUID = function() {
	//默认 uid=1 的用户
	var uid = 1;
	if(localStorage){
		uid = localStorage.getItem('uid');
		if(uid==null || isNaN(uid)){
			uid = 1;
			localStorage.setItem('uid', uid);
		}
	}
	return uid;
}

/**
 * 页面重新载入
 */
WindowReload = function(destination){
	window.location.href = destination||window.location.href;
}

/**
 * 检查用户是否已经登录
 */
CheckIsLogin = function(){
	var url = Core.url + "?act=isLogin&uid="+GetStoragedUID();
	$.get(url, function(res){
		console.log("res: "+res);
		res = JSON.parse(res);
		if(!res.allow){
			WindowReload('/vers2/welcome.html');
		}
	})
	
}
