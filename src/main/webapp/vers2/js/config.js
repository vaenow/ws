
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
	ORIGIN:		window.location.origin,		//"http://localhost:8080"
	PATH_NAME:	window.location.pathname,	//"/vers2/index.html"
	PORT:		window.location.port,		//"8080"
	PORTOCOL:	window.location.portocol,	//"http:"
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