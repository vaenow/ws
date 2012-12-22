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
		'<div class="set-bar"><div class="fr">'+
			'<a class="btn setting"><i class="icon ico-setting"></i><span class="btn-con">设置</span></a>'+
			'<a class="btn refresh"><i class="icon ico-refresh"></i><span class="btn-con">刷新</span></a>'+
			'<a class="btn top"><i class="icon ico-top"></i><span class="btn-con">顶部</span></a>'+
		'</div></div>'+
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
		'<div class="set-bar"><div class="fr">'+
			'<a class="btn refresh"><i class="icon ico-refresh"></i><span class="btn-con">刷新</span></a>'+
		'</div></div>'+
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

//内容为 list content
var listContTemp = '<ul id="UserListBody">{listEle}</ul>';

//每条 list 元素
var listEle = '<li style="position:relative;left: 3px;right: 3px;background-color: lightBlue;width: auto;height: auto;">list-content</li><li style="position:relative;left: 3px;right: 3px;background-color: lightBlue;width: auto;height: auto;">list-content-2</li><li style="position:relative;left: 3px;right: 3px;background-color: lightBlue;width: auto;height: auto;">list-content-3</li>';



