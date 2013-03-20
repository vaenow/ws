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
