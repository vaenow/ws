//图标模板
var shortcutTemp = 
'<li style="left:{left}px;top:{top}px" shortcut="{shortcut}"><img src="{imgsrc}"><span>{title}</span><em></em></li>';

//任务栏模板
var taskTemp = 
'<li window="{num}">'+
	'<b class="focus">'+
		'<img src="{imgsrc}">'+
		'<span>{title}</span>'+
	'</b>'+
'</li>';

//窗口模板
var windowTemp = 
'<div style="width:{width}px;height:{height}px;top:{top}px;left:{left}px;z-index:{zIndex}" class="window-container window-current" window="{num}" id="window_{num}_warp">'+
	'<div style="height:100%" id="window_{num}_inner">'+
		'<div class="title-bar">'+
			'{title}<div class="title-handle"><a class="ha-hide" btn="hide" href="#ha-hide">最小化</a><a class="ha-max" btn="max" href="#ha-max">最大化</a><a class="ha-revert" btn="revert" href="#ha-revert" style="display:none">还原</a><a class="ha-close" btn="close" href="#ha-close">关闭</a></div>'+
		'</div>'+
		'<div class="window-frame">'+
			'<div class="window-mask"></div><div class="window-loading"></div>'+
			'{frameCont}'+
		'</div>'+
//		'<div class="set-bar"><div class="fr">'+
//			'<a class="btn setting"><i class="icon ico-setting"></i><span class="btn-con">设置</span></a>'+
//			'<a class="btn refresh"><i class="icon ico-refresh"></i><span class="btn-con">刷新</span></a>'+
//			'<a class="btn top"><i class="icon ico-top"></i><span class="btn-con">顶部</span></a>'+
//		'</div></div>'+
		'{resize}'+
		'<div style="position:absolute;overflow:hidden;background:url(img/ui/transparent.gif) repeat;display:block" resize="min_width"></div>'+
		'<div style="position:absolute;overflow:hidden;background:url(img/ui/transparent.gif) repeat;display:block" resize="min_height"></div>'+
	'</div>'+
'</div>';

//窗口模板2 只有关闭按钮
var windowTemp2 = 
'<div style="width:{width}px;height:{height}px;top:{top}px;left:{left}px;z-index:{zIndex}" class="window-container window-current" window="{num}" id="window_{num}_warp">'+
	'<div style="height:100%" id="window_{num}_inner">'+
		'<div class="title-bar">'+
			'{title}<div class="title-handle"><a class="ha-hide" btn="hide" href="#ha-hide">最小化</a><a class="ha-close" btn="close" href="#ha-close">关闭</a></div>'+
		'</div>'+
		'<div class="window-frame">'+
			'<div class="window-mask"></div><div class="window-loading"></div>'+
			'{frameCont}'+
		'</div>'+
//		'<div class="set-bar"><div class="fr">'+
//			'<a class="btn refresh"><i class="icon ico-refresh"></i><span class="btn-con">刷新</span></a>'+
//		'</div></div>'+
		'{resize}'+
		'<div style="position:absolute;overflow:hidden;background:url(img/ui/transparent.gif) repeat;display:block" resize="min_width"></div>'+
		'<div style="position:absolute;overflow:hidden;background:url(img/ui/transparent.gif) repeat;display:block" resize="min_height"></div>'+
	'</div>'+
'</div>';

//窗口拖动模板
var resizeTemp = '<div resize="{resize_type}" style="position:absolute;overflow:hidden;background:url(img/ui/transparent.gif) repeat;display:block;{css}" class="resize"></div>';

//窗口内饰
var windowLabel = '<div style="left: 3px; right: 3px; position: absolute; background-color: #DFDFDF; bottom: 3px; top: 3px;"></div>';

//内容为 iframe 
var iframeContTemp = '<iframe frameborder="0" id="window_{num}_frame" name="window_{num}_frame" src="{url}"></iframe>';

//内容为 list content - frame banner
var listContBannerTemp = '<div class="u_banner"><div class="ub_head bgfullsize" style="background-image:url(img/avatar/{headSrc});" ><input class="ubh_file" type="file" /></div><div class="ub_details"><input class="ubd_name inputtransparent" value="{ubdName}"/><input class="ubd_phrase inputtransparent" value="{ubdPhrase}"/><a class="ubd_send ubds_nm" id="ubd_name" ></a><a class="ubd_send ubds_ph" id="ubd_phrase" ></a></div></div>';

//内容为 list content - frame body
var listContBodyTemp = '<ul class="userListBody">{listEle}</ul>';

//内容为 label content
var labelContTemp = '<div class="windowLabel">{frameBody}</div>';

//每条 list 元素
var listEle = 
'<li class="ListBlock">'+
	'<div class="f_img f_img_hide" style="background-image:url(img/avatar/{f_head})"></div>'+
	'<div class="f_details"><div class="f_name">{listDetails}</div><div class="f_phrase">{f_phrase}</div></div>'+
	'<div class="f_right"><div class="f_rtop"></div><div class="f_rbottom"></div></div>'+
'</li>';

//消息窗口
var chatWindow = 
'<div id="vid_chat" style="overflow: hidden;">'+
	'<div class="vid_chat_content" id="vid_chat_content" style="overflow:auto; "></div>'+
	'<div class="vid_chat_bottom">'+
		'<input id="name_" value="snow" maxlength="4">&nbsp;'+
		'<input class="input_message" name="msg" id="msg_">&nbsp;<input class="btns" type="button" value="发言" onclick="send_msg()" maxlength="100" style="opacity: 0.3; color: black;">&nbsp;<input id="autoFresh" class="btns" type="button" value="刷新 5" onclick="ajax_2();" style="opacity: 0.3; color: black;">&nbsp;<input id="stopFresh" class="btns" type="button" value="停止" onclick="ajax_3();" style="opacity: 0.3; color: black;">'+
	'</div>'+
'</div>';

//websocket chat message template
var wstemp = {};
wstemp.msg = "<div class='msg_body'><div class='msg_sender'>{sderalias}</div><div class='msg_date'>{token}</div><div class='msg_ctn'>{ctn}</div></div>";
wstemp.msg_bubble = function(type){
	var position = '';
	var msg 	 = '';
	if(type == 1) {			// friend msg
		position = 'left';
	}else if(type == 2) {	// self msg
		position = 'right';
	}else if(type == 3) {	// system msg
		position = 'left';
	}
	msg = '<div class="wraper{ty}">'+
		'<div class="{pos}">'+
			'<div class="bubble">'+
				'<div class="content">{ctn}</div>'+
			'</div>'+
		'</div>'+
	'</div>';
	return FormatModel(msg, {ty: type, pos:position});
}

var unreadLi = "<li class='{sderalias}'><span class='nm'>[{sderalias}]</span>: <span class='no'>0</span></li>";

//模板格式化（正则替换）
var FormatModel = function(str,model){
	for(var k in model){
		var re = new RegExp("{"+k+"}","g");
		str = str.replace(re,model[k]);
	}
	return str;
};
	