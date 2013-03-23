/*
**core.js
**胡尐睿丶
*/

Core.init = function(update){
	$(document.body).bind('click',function(){
		//隐藏所有右键列表
		$(".popup-menu").hide();
	});
	var _top = Core.config.shortcutTop;
	var _left = Core.config.shortcutLeft;
	var windowHeight = $("#desk").height();
	var ul = $("#desk").find('ul');
	//屏蔽右键列表
	$(document).bind('contextmenu',function(event){
		$(".popup-menu").hide();
		return false;
	});
	
	var loadShortcut = function(){
		//获取json数组并循环输出每个图标
		var url = Core.url+"?act=gsc";
		$.get(url,function(sc){
			$(ul).html("");
			//把返回的json数组存为全局变量
			sc = jsonsc = JSON.parse(sc);
			//更改显示名字
			var uinfo = Core.userinfo.getInfo();
			if(uinfo.alias){
				jsonsc.data[0].iconName = jsonsc.data[0].iconName.replace('%name%', uinfo.alias);
			} else {
				console.log('Loading strange. try reload.');
				WindowReload();
			}
			for(i=0; i<sc['data'].length; i++){
				_cache.shortcutTemp = {"top":_top,"left":_left,"title":sc['data'][i]['iconName'],"shortcut":sc['data'][i]['id'],"imgsrc":sc['data'][i]['iconUrl']};
				$(ul).append(FormatModel(shortcutTemp,_cache.shortcutTemp));
				//每循环一个图标后，给top的偏移量加90px
				_top += 90;
				//当下一个图标的top偏移量大于窗口高度时，top归零，left偏移量加90px
				if(_top+Core.config.shortcutTop+57 > windowHeight){
					_top = Core.config.shortcutTop;
					_left += 90;
				}
			}
		});
	};
	
	//如果刷新桌面，否则……
	if(update){
		loadShortcut();
	}else{
		$(window).bind('load',function(){
			loadShortcut();
		}).bind('resize',function(){
			if($(window).width()<800 || $(window).height()<400){
				ZENG.msgbox.show("浏览器当前窗口过小，可能会影响正常操作！", 1, 2000);
			}
			//由于图标不会太多，所以resize里的方法是对样式直接修改，当然也可以重建li
			_top = Core.config.shortcutTop;
			_left = Core.config.shortcutLeft;
			windowHeight = $("#desk").height();
			//循环ul，操作每一个li
			$(ul).find("li").each(function(){
				$(this).animate({"left":_left,"top":_top},500);
				_top += 90;
				if(_top+Core.config.shortcutTop+57 > windowHeight){
					_top = Core.config.shortcutTop;
					_left += 90;
				}
			});
			//智能修改每个窗口的定位
			$("#desk div.window-container").each(function(){
				currentW = $(window).width() - $(this).width();
				currentH = $(window).height() - $(this).height();
				_l = $(this).data("info").left/$(this).data("info").emptyW*currentW >= currentW ? currentW : $(this).data("info").left/$(this).data("info").emptyW*currentW;
				_l = _l <= 0 ? 0 : _l;
				_t = $(this).data("info").top/$(this).data("info").emptyH*currentH >= currentH ? currentH : $(this).data("info").top/$(this).data("info").emptyH*currentH;
				_t = _t <= 0 ? 0 : _t;
				$(this).animate({"left":_l+"px","top":_t+"px"},500);
			});
		}).bind('load',function(){
			$('.bgloader').fadeOut(1000);
		});
		//绑定快捷方式点击事件
		ul.delegate('li','click',function(){Core.create($(this));});
		//绑定窗口点击事件
		Core.container();
		//绑定窗口上各个按钮事件
		Core.handle();
		//绑定窗口移动事件
		Core.bindWindowMove();
		//绑定任务栏点击事件
		$('.task-window').delegate('li','click',function(){Core.taskwindow($(this));}).delegate('li','contextmenu',function(){
			//展示自定义右键菜单
			Core.taskwindowrightmenu($(this));
			//屏蔽浏览器自带右键菜单
			return false;
		});
		//绑定用户列表点击事件
		Core.bindUserListEvent();
	}
};

//创建窗体
Core.create = function(obj,opt){
	var options = {};
	if(obj==""){
		options = {
			num		:Date.parse(new Date()),
			imgsrc	:"img/shortcut/news.png",
			title	:opt.title,
			url		:opt.url,
			width	:opt.width,
			height	:opt.height,
			resize	:opt.resize,
			conf	:opt.conf||{} //opt.conf = {}
		};
	}else{
		//RealID
		var sc = obj['attr']?obj['attr']('shortcut'):obj.id;
		//通过循环json找到那条数据
		for(i=0; i<jsonsc['data'].length; i++){
			if(jsonsc['data'][i]['id'] == sc){
				options = {
					num		:jsonsc['data'][i]['id'],
					imgsrc	:jsonsc['data'][i]['iconUrl'],
					title	:jsonsc['data'][i]['iconName'],
					url		:jsonsc['data'][i]['url'],
					width	:jsonsc['data'][i]['width'],
					height	:jsonsc['data'][i]['height'],
					resize	:jsonsc['data'][i]['resize'],
					conf	:jsonsc['data'][i]['conf']||{}	//conf = {}
				};
				break;
			}
		}
	}
	
	var window_warp = 'window_'+options.num+'_warp';
	var window_inner = 'window_'+options.num+'_inner';
	var window_frame = 'window_'+options.num+'_frame';
	//判断窗口是否已打开
	var iswindowopen = 0;
	$('.task-window li').each(function(){
		if($(this).attr('window')==options.num){
			iswindowopen = 1;
			//改变任务栏样式
			$('.task-window li b').removeClass('focus');
			$(this).children('b').addClass('focus');
			//改变窗口样式
			Core.currentFocus($('#'+window_warp)).show(Core.animate.CDW);
			//改变窗口遮罩层样式
			$('.window-frame').children('div.mask').show();
			$('#'+window_inner+' .window-frame').children('div.mask').hide();
		}
	});
	if(iswindowopen == 0){
		//增加背景遮罩层
		_cache.MoveLayOut = GetLayOutBox();
		$('.window-frame').children('div').eq(0).show();
		$('.task-window li b').removeClass('focus');
		$('.window-container').removeClass('window-current');
		//任务栏，窗口等数据
		_cache.taskTemp = {"num":options.num,"title":options.title,"imgsrc":options.imgsrc};
		var top = ($(window).height()-options.height-30)/2 <= 0 ? 0 : ($(window).height()-options.height-30)/2;
		var left = ($(window).width()-options.width)/2 <= 0 ? 0 : ($(window).width()-options.width)/2;
		_cache.windowTemp = {"width":options.width,"height":options.height,"top":top,"left":left,"emptyW":$(window).width()-options.width,"emptyH":$(window).height()-options.height,"zIndex":Core.config.createIndexid,"num":options.num,"title":options.title,"url":options.url};
		_cache.resizeTemp = {"t":"left:0;top:-3px;width:100%;height:5px;z-index:1;cursor:n-resize","r":"right:-3px;top:0;width:5px;height:100%;z-index:1;cursor:e-resize","b":"left:0;bottom:-3px;width:100%;height:5px;z-index:1;cursor:s-resize","l":"left:-3px;top:0;width:5px;height:100%;z-index:1;cursor:w-resize","rt":"right:-3px;top:-3px;width:10px;height:10px;z-index:2;cursor:ne-resize","rb":"right:-3px;bottom:-3px;width:10px;height:10px;z-index:2;cursor:se-resize","lt":"left:-3px;top:-3px;width:10px;height:10px;z-index:2;cursor:nw-resize","lb":"left:-3px;bottom:-3px;width:10px;height:10px;z-index:2;cursor:sw-resize"};
		//新增任务栏
		$('.task-window').append(FormatModel(taskTemp,_cache.taskTemp));
		//新增窗口
		var ele = "";
		if(options.resize){
			//添加窗口缩放模板
			if(!_cache.resizeEleTemp){
				for(var k in _cache.resizeTemp){
					ele += FormatModel(resizeTemp,{resize_type:k,css:_cache.resizeTemp[k]});
				}
				_cache.resizeEleTemp = ele;
			}
			ele = FormatModel(windowTemp,{resize:_cache.resizeEleTemp});
		}else{
			ele = FormatModel(windowTemp2,{resize:Core.CST.ELE_BLANK});
		}
		// default frameCont is false
		if(options.conf.frameCont){
			ele = windowConfigFrameCont(options, ele);
		}else{
			//默认为 Iframe
			ele = FormatModel(ele,{frameCont:iframeContTemp});
		}
		//格式化窗口的最终效果
		ele = FormatModel(ele, _cache.windowTemp);
		$('#desk').append(ele);
		$("#"+window_warp).data("info",_cache.windowTemp);
		Core.config.createIndexid += 1;
		//iframe加载完毕后
		$('#'+window_frame).bind('load',function(){
			if(options.resize){
				//绑定窗口缩放事件
				Core.bindWindowResize($('#'+window_warp));
			}
			//隐藏loading
			$('#'+window_inner+' .window-frame').children('div').eq(1).fadeOut();
		});
		
		//frame为自定义内容时
		if (options.conf.frameCont) {
			windowConfig(options, window_inner, window_warp);
		}
	}
};

//点击任务栏
Core.taskwindow = function(obj){
	var window_warp = 'window_'+obj.attr('window')+'_warp';
	var window_inner = 'window_'+obj.attr('window')+'_inner';
	if(obj.children('b').hasClass('focus')){
		obj.children('b').removeClass('focus');
		$('#'+window_warp).hide(Core.animate.TW);
	}else{
		//改变任务栏样式
		$('.task-window li b').removeClass('focus');
		obj.children('b').addClass('focus');
		//改变窗口样式
		Core.currentFocus($('#'+window_warp)).show(Core.animate.TW);
		//改变窗口遮罩层样式
		$('.window-frame').children('div').eq(0).show();
		$('#'+window_inner+' .window-frame').children('div').eq(0).hide();
	}
};

//任务栏右键菜单
Core.taskwindowrightmenu = function(obj){
	_cache.TaskRight = GetTaskRight(obj);
	_cache.TaskRight.hide();
	_cache.TaskRight.css({left:(obj.index()*(obj.width()+3)+2)+'px'}).show(Core.animate.TWRM);
};

//点击窗口
Core.container = function(){
	$(document).delegate('.window-container','click',function(){
		var obj = $(this);
		//改变任务栏样式
		$('.task-window li b').removeClass('focus');
		$('.task-window li[window="'+obj.attr('window')+'"] b').addClass('focus');
		//改变窗口样式
		Core.currentFocus(obj);
		//改变窗口遮罩层样式
		$('.window-frame').children('div').eq(0).show();
		obj.find('.window-frame').children('div').eq(0).hide();
	});
};

//最小化，最大化，还原，双击，关闭，刷新
Core.handle = function(){
	var updateStyle = function(obj){
		//改变窗口样式
		Core.currentFocus(obj);
	};
	$(document).delegate('.ha-hide','click',function(e){
		var obj = $(this).parents(".window-container");
		updateStyle(obj);
		//最小化
		//阻止冒泡
		Core.stopPropagation(e);//e.stopPropagation();
		obj.hide();
		//改变任务栏样式
		$('.task-window li[window="'+obj.attr('window')+'"] b').removeClass('focus');
	}).delegate('.ha-max','click',function(){
		var obj = $(this).parents(".window-container");
		updateStyle(obj);
		//最大化
		obj.css({width:"100%",height:"100%",top:0,left:0});
		$(this).hide().next(".ha-revert").show();
		ie6iframeheight(obj);
		ZENG.msgbox.show("按F11体验浏览器全屏模式！", 4, 2000);
	}).delegate('.ha-revert','click',function(){
		var obj = $(this).parents(".window-container");
		updateStyle(obj);
		//还原
		obj.css({width:obj.data("info").width+"px",height:obj.data("info").height+"px",left:obj.data("info").left+"px",top:obj.data("info").top+"px"});
		$(this).hide().prev(".ha-max").show();
		ie6iframeheight(obj);
	}).delegate('.title-bar','dblclick',function(){
		var obj = $(this).parents(".window-container");
		updateStyle(obj);
		//双击
		//判断当前窗口是否已经是最大化
		if($(this).find(".ha-max").is(":visible")){
			ie6iframeheight(obj);
			$(this).find(".ha-max").click();
		}else{
			$(this).find(".ha-revert").click();
		}
	}).delegate('.ha-close','click',function(){
		var obj = $(this).parents(".window-container");
		updateStyle(obj);
		//关闭
		$('.task-window li[window="'+obj.attr('window')+'"]').remove();
		obj.fadeOut("500",function(){$(this).html("").remove();});
	}).delegate('.refresh','click',function(){
		var obj = $(this).parents(".window-container");
		updateStyle(obj);
		//刷新
		$("#window_"+obj.attr('window')+"_frame").attr("src",$("#window_"+obj.attr('window')+"_frame").attr("src"));
	}).delegate('.top','click',function(){
		var obj = $(this).parents(".window-container");
		updateStyle(obj);
		window.frames["window_"+obj.attr('window')+"_frame"].scrollTop();
	});
};

//显示桌面
Core.showDesktop = function(){
	$(".task-window li b").removeClass("focus");
	$("#desk ul").nextAll("div").hide();
};

//绑定窗口移动事件
Core.bindWindowMove = function(){
	$(document).delegate(".title-bar","mousedown",function(e){
		var obj = $(this).parents(".window-container");
		//改变窗口为选中样式
		Core.currentFocus(obj);
		x = e.screenX;	//鼠标位于屏幕的left
		y = e.screenY;	//鼠标位于屏幕的top
		sT = obj.offset().top;
		sL = obj.offset().left;
		//增加背景遮罩层
		_cache.MoveLayOut = GetLayOutBox();
		var lay = ($.browser.msie) ? _cache.MoveLayOut : $(window);	
		//绑定鼠标移动事件
		lay.bind("mousemove",function(e){
			_cache.MoveLayOut.show();
			//强制把右上角还原按钮隐藏，最大化按钮显示
			obj.find(".ha-revert").hide().prev(".ha-max").show();
			eX = e.screenX;	//鼠标位于屏幕的left
			eY = e.screenY;	//鼠标位于屏幕的top
			lessX = eX - x;	//距初始位置的偏移量
			lessY = eY - y;	//距初始位置的偏移量
			_l = sL + lessX;
			_t = sT + lessY;
			_w = obj.data("info").width;
			_h = obj.data("info").height;
			//鼠标贴屏幕左侧20px内
			if(e.clientX <= 20){
				_w = (lay.width()/2)+"px";
				_h = "100%";
				_l = 0;
				_t = 0;
			}
			//鼠标贴屏幕右侧20px内
			if(e.clientX >= (lay.width()-21)){
				_w = (lay.width()/2)+"px";
				_h = "100%";
				_l = (lay.width()/2)+"px";
				_t = 0;
			}
			//窗口贴屏幕顶部10px内
			if(_t <= 10){
				_t = 0;
			}
			//窗口贴屏幕底部60px内
			if(_t >= (lay.height()-60)){
				_t = (lay.height()-60)+"px";
				if(e.clientX <= 20){
					_w = (lay.width()/2)+"px";
					_h = "100%";
					_l = 0;
					_t = 0;
				}
			}
			obj.css({width:_w,height:_h,left:_l,top:_t});
			obj.data("info",{width:obj.data("info").width,height:obj.data("info").height,left:obj.offset().left,top:obj.offset().top,emptyW:$(window).width()-obj.data("info").width,emptyH:$(window).height()-obj.data("info").height});
			ie6iframeheight(obj);
		});
		//绑定鼠标抬起事件
		lay.unbind("mouseup").bind("mouseup",function(){
			_cache.MoveLayOut.hide();
			if($.browser.msie){
				_cache.MoveLayOut[0].releaseCapture();
			}
			$(this).unbind("mousemove");
		});
		if($.browser.msie){
			_cache.MoveLayOut[0].setCapture();
		}
	});
};

//绑定窗口缩放事件
Core.bindWindowResize = function(obj){
	for(rs in _cache.resizeTemp){
		bindResize(rs);
	}
	function bindResize(r){
		obj.find("div[resize='"+r+"']").bind("mousedown",function(e){
			//增加背景遮罩层
			_cache.MoveLayOut = GetLayOutBox();
			var lay = ($.browser.msie)? _cache.MoveLayOut : $(window);	
			cy = e.clientY;
			cx = e.clientX;
			h = obj.height();
			w = obj.width();
			lay.unbind("mousemove").bind("mousemove",function(e){
				_cache.MoveLayOut.show();
				_t = e.clientY;
				_l = e.clientX;
				//窗口贴屏幕顶部10px内
				if(_t <= 10){
					_t = 0;
				}
				//窗口贴屏幕底部60px内
				if(_t >= (lay.height()-60)){
					_t = (lay.height()-60);
				}
				
				if(_l <= 1){
					_l = 1;
				}
				if(_l >= (lay.width()-2)){
					_l = (lay.width()-2);
				}
				$('.window-frame').children('div').eq(0).hide();
				obj.find('.window-frame').children('div').eq(0).show();
				switch(r){
					case "t":
						if(h+cy-_t > Core.config.windowMinHeight){
							obj.css({height:(h+cy-_t)+"px",top:_t+"px"});
						}
					break;
					case "r":
						if(w-cx+_l > Core.config.windowMinWidth){
							obj.css({width:(w-cx+_l)+"px"});
						}
					break;
					case "b":
						if(h-cy+_t > Core.config.windowMinHeight){
							obj.css({height:(h-cy+_t)+"px"});
						}
					break;
					case "l":
						if(w+cx-_l > Core.config.windowMinWidth){
							obj.css({width:(w+cx-_l)+"px",left:_l+"px"});
						}
					break;
					case "rt":
						if(h+cy-_t > Core.config.windowMinHeight){
							obj.css({height:(h+cy-_t)+"px",top:_t+"px"});
						}
						if(w-cx+_l > Core.config.windowMinWidth){
							obj.css({width:(w-cx+_l)+"px"});
						}
					break;
					case "rb":
						if(w-cx+_l > Core.config.windowMinWidth){
							obj.css({width:(w-cx+_l)+"px"});
						}
						if(h-cy+_t > Core.config.windowMinHeight){
							obj.css({height:(h-cy+_t)+"px"});
						}
					break;
					case "lt":
						if(w+cx-_l > Core.config.windowMinWidth){
							obj.css({width:(w+cx-_l)+"px",left:_l+"px"});
						}
						if(h+cy-_t > Core.config.windowMinHeight){
							obj.css({height:(h+cy-_t)+"px",top:_t+"px"});
						}
					break;
					case "lb":
						if(w+cx-_l > Core.config.windowMinWidth){
							obj.css({width:(w+cx-_l)+"px",left:_l+"px"});
						}
						if(h-cy+_t > Core.config.windowMinHeight){
							obj.css({height:(h-cy+_t)+"px"});
						}
					break;
				}
				ie6iframeheight(obj);
				//更新窗口宽高缓存
				obj.data("info",{width:obj.width(),height:obj.height(),left:obj.offset().left,top:obj.offset().top,emptyW:$(window).width()-obj.width(),emptyH:$(window).height()-obj.height()});
			});
			//绑定鼠标抬起事件
			lay.unbind("mouseup").bind("mouseup",function(){
				_cache.MoveLayOut.hide();
				if($.browser.msie){
					_cache.MoveLayOut[0].releaseCapture();
				}
				$(this).unbind("mousemove");
			});
			if($.browser.msie){
				_cache.MoveLayOut[0].setCapture();
			}
		});
	}
};

//透明遮罩层
var GetLayOutBox = function(){
	if(!_cache.LayOutBox){
		_cache.LayOutBox = $('<div style="z-index:1000000003;display:none;cursor:default;background:none;height:100%;left:0;position:absolute;top:0;width:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0"><div style="height:100%;width:100%"></div></div>');
		$(document.body).append(_cache.LayOutBox);
	}
	return _cache.LayOutBox;
};
//任务栏右键提示
var GetTaskRight = function(obj){
	if(!_cache.TaskRight){
		_cache.TaskRight = $('<div class="popup-menu task-menu" style="z-index:99999;bottom:30px;display:none"><ul><li><a menu="close" href="#ta-close">关闭</a></li></ul></div>');
		$(document.body).append(_cache.TaskRight);
		$('.task-menu').bind('contextmenu',function(){return false;});
	}
	//绑定关闭事件
	$('.task-menu a[menu="close"]').unbind("click").bind("click",function(){
		$('#window_'+obj.attr('window')+'_inner .title-handle .ha-close').click();
		$('.task-menu').hide();
	});
	return _cache.TaskRight;
};
//模板格式化（正则替换）
var FormatModel = function(str,model){
	for(var k in model){
		var re = new RegExp("{"+k+"}","g");
		str = str.replace(re,model[k]);
	}
	return str;
};
//IE6下实时更新iframe高度
var ie6iframeheight = function(obj){
	if($.browser.msie && $.browser.version==="6.0"){
		$(obj).find('.window-frame').css("height",($(obj).find('.window-frame').parent().height()-59)+"px");
	}
};
//frame为自定义内容时
var windowConfig = function(options, window_inner, window_warp){
	if (options.conf.frameCont == "listContTemp") {
		//限定窗口大小
		$('#'+window_warp).addClass('mainListSize')
		//刷新用户好友列表
		refreshFriendsList(window_warp, window_inner);
	}else if (options.conf.frameCont == "labelContTemp") {
		//打开Socket连接
		startWebSocket();
		hideLoading(window_inner);
	}else if (options.conf.frameCont == "listAllTemp") {
		var start = 0, len = 100;
		var url = Core.url+"?act=gau&start="+start+"&len="+len+"&uid"+GetStoragedUID();
		var eledata = function(result, i) {
			return {
				//friends name
				listDetails : result[i].alias,
				f_head		: result[i].headImg,
				f_phrase	: result[i].phrase
			};
		};
		listUsers(url, window_warp, window_inner, eledata);
		$('#'+window_warp+' .userListBody').addClass('fullHeight');
	}
	if (options.resize) {
		// 绑定窗口缩放事件
		Core.bindWindowResize($('#' + window_warp));
	}
}

// default frameCont is false
var windowConfigFrameCont = function(options, ele){
	if(options.conf.frameCont=="listContTemp"){
		//内容为list body
		ele = FormatModel(ele,{frameCont:listContBannerTemp+listContBodyTemp});
		//得到头像
		ele = FormatModel(ele,{headSrc:Core.userinfo.getInfo().headImg});
		//得到alias,phrase
		ele = FormatModel(ele,{ubdName:Core.userinfo.getInfo().alias});
		ele = FormatModel(ele,{ubdPhrase:Core.userinfo.getInfo().phrase});
	}else if(options.conf.frameCont=="labelContTemp"){
		ele = FormatModel(ele,{frameCont:listContBannerTemp+listContBodyTemp});
		ele = FormatModel(ele,{frameBody:chatWindow});
	}else if(options.conf.frameCont=="listAllTemp"){
		//内容为list all usr
		ele = FormatModel(ele,{frameCont:listContBodyTemp});
	}
	return ele;
}

//隐藏loading
var hideLoading = function(window_inner) {
	// 隐藏loading
	$('#' + window_inner + ' .window-loading').fadeOut();
} 

//显示loading
var showLoading = function(window_inner) {
	// 显示loading
	$('#' + window_inner + ' .window-loading').fadeIn();
} 

//罗列用户 
var listUsers = function(url, window_warp, window_inner, eledata) {
	var me = this;
	$.get(url, function(res){
//		console.log(res);
		var result = JSON.parse(res);
		var b = $('#'+window_warp+' .userListBody');
		b.html("");
		for ( var i = 0; i < result.length; i++) {
			b.append(FormatModel(listEle, eledata(result, i)));
			b.children().last().data('info', result[i]);
			//为ChatFrames存储备用信息
			if(result[i]['friendDetailsTO']){
				Core.config.frd[result[i]['friendDetailsTO']['uid']] = result[i];
			}
		}
		hideLoading(window_inner);
		
		$.get(Core.url+"?act=gus",function(res){
			res = JSON.parse(res);
			console.log(res);
			var b = $('#'+window_warp+' .userListBody');
			b.children().each(function(){
				var el  = $(this);
				var uid = el.data('info').friend; 
				var OFFLINE=0, ONLINE=1, LEAVE=2, INVISIBLE=3;
				if(res[uid] && res[uid]['status']===ONLINE){
					el.find('.f_img').removeClass('f_img_hide');
				}
			});
		})
	});
}

Core.bindUserListEvent = function(){
	var desk = $('#desk');
	//好友列表的监听器
	desk.delegate('.window-frame:has(.u_banner) ul li', 'click', function(e) {
		var me 			= $(this).data('info');
		var t			= me.friend;
		var chatFrame 	= {
			"id" : me.owner+'-'+me.friend,/* "title":"{title}","imgsrc":"{imgsrc}", */
			"iconUrl" : "img/avatar/"+me.friendDetailsTO.headImg,
			"iconName" : "与【"+me.friendDetailsTO.alias+"】交流",
			"url" : Core.CST.ORIGIN+"/vers2/chatframe.html?t="+t,
			"width" : 447,
			"height" : 322,
			"resize" : true,
			//"conf" : {
			//"frameCont" : "labelContTemp"
			//}
		};
		var isContains = false;
		for ( var el in jsonsc.data) {
			if (jsonsc.data[el].id === chatFrame.id)
				isContains = true;
		}
		if (!isContains)
			jsonsc['data'].push(chatFrame);

		//取消绑定。
		Core.stopPropagation(e);
		//创建窗口
		Core.create(chatFrame);
		
//		$('#window_'+chatFrame.id+'_warp').delegate('iframe', 'load', function(){
//			call javascript function from outside an iframe
//			var ifrm = $('iframe')[0];
//			初始化WebSocket连接
//			ifrm.contentWindow.S.startWebSocket();
//			console.log(arguments);
//		});
		
		$('#window_'+chatFrame.id+'_warp iframe').bind('load', function(){
			var ifrm 	= this.contentWindow.S;
			//var wsinit	= JSON.stringify({sender:me.owner,reciever:me.friend});
			var wsinit	= Core.config.infostruct.wsinit();
			wsinitial.sender	= me.owner;
			wsinitial.reciever	= me.friend;
			//启用 WebSocket
			ifrm.startWebSocket(wsinit);
			//update friends info
			ifrm.frd = Core.config.frd;
		});
		
	});
	
	//监听-用户资料修改
	desk.delegate('.window-frame .u_banner [class^=ub]', 'mouseover click change focus', function(evt){
		//console.log("target: "+evt.currentTarget+"evt.type: "+evt.type, "evt.eventPhase: "+evt.eventPhase);
		var me = this;
		var val = "", status=me.classList[0];
		var cn = me.className;
		var IMG= 'ub_head',NAME='ubd_name',PHRASE='ubd_phrase',CHANGE='change',CLICK='click';
		if(cn.indexOf(IMG)!=-1){			// head img
			console.log(IMG);
		}else if(cn.indexOf(NAME)!=-1){		// alias name
			console.log(NAME);
			if(evt.type == CHANGE){
				$("#"+status).fadeIn();
				me.disabled = true;
				Core.updateDetails('alias', me.value, status);
			}
		}else if(cn.indexOf(PHRASE)!=-1){	// phrase
			console.log(PHRASE);
			if(evt.type == CHANGE){
				$("#"+status).fadeIn();
				me.disabled = true;
				Core.updateDetails('phrase', me.value, status);
			}
		}
			
		
	});
	
	//新用户列表添加监听器
	desk.delegate('#window_flist_warp ul li', 'mouseover mouseout click', function(event){
		var childs = $(this).find('.f_right').children();
		if (event.type == "mouseover") {
			childs.eq(0).html("添加好友");
			childs.eq(1).html("删除");
		} else if (event.type == "mouseout") {
			childs.eq(0).html("");
			childs.eq(1).html("");
		} else if (event.type == "click") {
			var name = event.target.className;
			var act  = "";
			if (name == "f_rtop") {
				act  = "addu"; 
			} else if (name == "f_rbottom") {
				act  = "delu";
			} else {
				return;
			}
			
			var uinfo = $(this).data('info');
			var data  = {owner: GetStoragedUID(), friend: uinfo.uid};
			$(this).append($('.window-loading').eq(0).fadeIn());
			handleUser(act, data, $(this));
		}
	});
}

//对用户进行操作
var handleUser = function(action, data, me) {
	var window_flist_warp = 'window_flist_warp';
	//showLoading(window_flist_warp);
	var url = Core.url + "?act=" + action;
	$.post(url, data, function(res){
		console.log(res);
		var res = JSON.parse(res);
		var msgboxinfo 	= '';
		var msgboxtype 	= 1;
		if(res.success){
			var window_warp  = 'window_main_warp';
			var window_inner = 'window_main_inner';
			refreshFriendsList(window_warp, window_inner);
			msgboxinfo 		 = '操作成功！';
			msgboxtype		 = 4;
		}else{
			msgboxinfo 		 = '操作失败！';
			msgboxtype		 = 5;
		}
			//hideLoading(window_flist_warp);
			me.find('.window-loading').eq(0).fadeOut();
			ZENG.msgbox.show(msgboxinfo, msgboxtype, 2000);
	})
}

//刷新用户好友列表
var refreshFriendsList = function(window_warp, window_inner) {
	var uid = GetStoragedUID();
	var url = Core.url + "?act=gufl&uid="+uid;
	var eledata = function(result, i) {
		return {
			//friends name
			listDetails : result[i].friendDetailsTO.alias,
			f_head		: result[i].friendDetailsTO.headImg,
			f_phrase	: result[i].friendDetailsTO.phrase
		};
	};
	listUsers(url, window_warp, window_inner, eledata);
}

//取消事件扩散 - 点击窗口
Core.stopPropagation = function(event){
	event.stopPropagation();
}

//改变窗口为选中样式
Core.currentFocus = function(obj){
	$('.window-container').removeClass('window-current');
	obj.addClass('window-current').css({'z-index':Core.config.createIndexid});
	Core.config.createIndexid += 1;
	return obj;
}

//用户手动更新资料
Core.updateDetails = function(key,val,status){
	if(!key) return ;
	var url 		= Core.url+"?act=updinfo";
	var ui			= Core.userinfo.getInfo();
	var updinfo 	= Core.config.infostruct.updinfo();
	for( var i in updinfo){
		updinfo[i]=ui[i];
	}
	updinfo[key] = val;
	$.post(url, updinfo, function(res){
		var result = JSON.parse(res);
		console.log(result);
		
		//刷新本地用户信息
		Core.userinfo.refresh(status,function(selector){
			$("#"+selector).fadeOut()
			$("."+selector).removeAttr("disabled");
		});
		
	});
}
