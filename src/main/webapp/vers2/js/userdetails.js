/**
 * @date: 2013-1-15
 * 
 * @author: luowen
 */

Core.userinfo = (function(){
	var userInfo = {}; 
	(function(){
		var uid = GetStoragedUID();
		var url = Core.url + "?act=gud"+"&uid="+uid;
		$.get(url, function(resp) {
			var result = JSON.parse(resp);
			//localStorage.setItem("u_details", {});
			userInfo = result;
		});
	})()
	
	return {
		getInfo:function(){
			return userInfo;
		},
		 
		setInfo:function(obj){
			console.log("setInfo: " + obj);
		}
	}
})();