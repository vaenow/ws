/**
 * @date 2012-10-12
 * @author luowen
 */
var Core=_cache = {};
var jsonsc;

Core.config = {
	shortcutTop:20,			//快捷方式top初始位置
	shortcutLeft:20,		//快捷方式left初始位置
	createIndexid:1,		//z-index初始值
	windowMinWidth:150,		//窗口最小宽度
	windowMinHeight:56		//窗口最小高度
};

/******************/
/** constant list */
/******************/
//常量 constance
Core.CST = {
	//空白 element
	ELE_BLANK:"",
	HOST: 		window.location.host,		//"localhost:8080"
	HOST_NAME: 	window.location.hostname,	//"localhost"
	HREF: 		window.location.href,		//"http://localhost:8080/vers2/index.html"
	ORIGIN:		window.location.origin	||
				window.location.protocol+'//'+
				window.location.host,		//"http://localhost:8080"
	PATH_NAME:	window.location.pathname,	//"/vers2/index.html"
	PORT:		window.location.port,		//"8080"
	PROTOCOL:	window.location.protocol,	//"http:"
	//数据源
	AJAX_URL:{
		//本地数据
		LOCAL:"/js/shortcut.js",
		//服务器数据
		REMOTE:"/ajax/handle",
	}
}
Core.url = Core.CST.ORIGIN + Core.CST.AJAX_URL.REMOTE;
/**********************/
/** constant list end */
/**********************/

//全局动态效果配置
Core.animate = {
		//TaskWindow 			任务栏左键
		TW	: 	{duration: 'normal',specialEasing: { width: 'linear', height:'swing'}},
		//TaskWindowRightMenu 	任务栏右键弹出菜单
		TWRM: 	{duration : 100},
		//CreatedWindow 		已创建的窗口
		CDW	: 	{duration: 'normal'},
}

//WebSocketMessageFormate 消息格式
//Core.config.wsmsg = {
//		ctn		:	"message content",
//		sder	:	"message sender",
//		rcver	:	"message receiver",
//		token	:	"verify token"
//}
Core.config.wsmsg = (function() {
	//获取WebSocketMessage对象属性
	var obj = {}
	var url = Core.url+"?act=gwsm";
	$.get(url,function(rs){
		console.log('rs: '+rs);
		obj = JSON.parse(rs);
	});
	
	return obj;
})();