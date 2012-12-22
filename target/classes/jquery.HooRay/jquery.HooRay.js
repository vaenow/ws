/*
	作者：胡尐睿丶
	联系方式：hooray0905@foxmail.com
*/

/*
	ie6 png透明修正
	DD_belatedPNG.fix('.png_bg');
	DD_belatedPNG.fixPng( someNode );
*/
if($.browser.msie&&($.browser.version=="6.0")&&!$.support.style){
var DD_belatedPNG={ns:"DD_belatedPNG",imgSize:{},delay:10,nodesFixed:0,createVmlNameSpace:function(){if(document.namespaces&&!document.namespaces[this.ns]){document.namespaces.add(this.ns,"urn:schemas-microsoft-com:vml")}},createVmlStyleSheet:function(){var b,a;b=document.createElement("style");b.setAttribute("media","screen");document.documentElement.firstChild.insertBefore(b,document.documentElement.firstChild.firstChild);if(b.styleSheet){b=b.styleSheet;b.addRule(this.ns+"\\:*","{behavior:url(#default#VML)}");b.addRule(this.ns+"\\:shape","position:absolute;");b.addRule("img."+this.ns+"_sizeFinder","behavior:none; border:none; position:absolute; z-index:-1; top:-10000px; visibility:hidden;");this.screenStyleSheet=b;a=document.createElement("style");a.setAttribute("media","print");document.documentElement.firstChild.insertBefore(a,document.documentElement.firstChild.firstChild);a=a.styleSheet;a.addRule(this.ns+"\\:*","{display: none !important;}");a.addRule("img."+this.ns+"_sizeFinder","{display: none !important;}")}},readPropertyChange:function(){var b,c,a;b=event.srcElement;if(!b.vmlInitiated){return}if(event.propertyName.search("background")!=-1||event.propertyName.search("border")!=-1){DD_belatedPNG.applyVML(b)}if(event.propertyName=="style.display"){c=(b.currentStyle.display=="none")?"none":"block";for(a in b.vml){if(b.vml.hasOwnProperty(a)){b.vml[a].shape.style.display=c}}}if(event.propertyName.search("filter")!=-1){DD_belatedPNG.vmlOpacity(b)}},vmlOpacity:function(b){if(b.currentStyle.filter.search("lpha")!=-1){var a=b.currentStyle.filter;a=parseInt(a.substring(a.lastIndexOf("=")+1,a.lastIndexOf(")")),10)/100;b.vml.color.shape.style.filter=b.currentStyle.filter;b.vml.image.fill.opacity=a}},handlePseudoHover:function(a){setTimeout(function(){DD_belatedPNG.applyVML(a)},1)},fix:function(a){if(this.screenStyleSheet){var c,b;c=a.split(",");for(b=0;b<c.length;b++){this.screenStyleSheet.addRule(c[b],"behavior:expression(DD_belatedPNG.fixPng(this))")}}},applyVML:function(a){a.runtimeStyle.cssText="";this.vmlFill(a);this.vmlOffsets(a);this.vmlOpacity(a);if(a.isImg){this.copyImageBorders(a)}},attachHandlers:function(i){var d,c,g,e,b,f;d=this;c={resize:"vmlOffsets",move:"vmlOffsets"};if(i.nodeName=="A"){e={mouseleave:"handlePseudoHover",mouseenter:"handlePseudoHover",focus:"handlePseudoHover",blur:"handlePseudoHover"};for(b in e){if(e.hasOwnProperty(b)){c[b]=e[b]}}}for(f in c){if(c.hasOwnProperty(f)){g=function(){d[c[f]](i)};i.attachEvent("on"+f,g)}}i.attachEvent("onpropertychange",this.readPropertyChange)},giveLayout:function(a){a.style.zoom=1;if(a.currentStyle.position=="static"){a.style.position="relative"}},copyImageBorders:function(b){var c,a;c={borderStyle:true,borderWidth:true,borderColor:true};for(a in c){if(c.hasOwnProperty(a)){b.vml.color.shape.style[a]=b.currentStyle[a]}}},vmlFill:function(e){if(!e.currentStyle){return}else{var d,f,g,b,a,c;d=e.currentStyle}for(b in e.vml){if(e.vml.hasOwnProperty(b)){e.vml[b].shape.style.zIndex=d.zIndex}}e.runtimeStyle.backgroundColor="";e.runtimeStyle.backgroundImage="";f=true;if(d.backgroundImage!="none"||e.isImg){if(!e.isImg){e.vmlBg=d.backgroundImage;e.vmlBg=e.vmlBg.substr(5,e.vmlBg.lastIndexOf('")')-5)}else{e.vmlBg=e.src}g=this;if(!g.imgSize[e.vmlBg]){a=document.createElement("img");g.imgSize[e.vmlBg]=a;a.className=g.ns+"_sizeFinder";a.runtimeStyle.cssText="behavior:none; position:absolute; left:-10000px; top:-10000px; border:none; margin:0; padding:0;";c=function(){this.width=this.offsetWidth;this.height=this.offsetHeight;g.vmlOffsets(e)};a.attachEvent("onload",c);a.src=e.vmlBg;a.removeAttribute("width");a.removeAttribute("height");document.body.insertBefore(a,document.body.firstChild)}e.vml.image.fill.src=e.vmlBg;f=false}e.vml.image.fill.on=!f;e.vml.image.fill.color="none";e.vml.color.shape.style.backgroundColor=d.backgroundColor;e.runtimeStyle.backgroundImage="none";e.runtimeStyle.backgroundColor="transparent"},vmlOffsets:function(d){var h,n,a,e,g,m,f,l,j,i,k;h=d.currentStyle;n={W:d.clientWidth+1,H:d.clientHeight+1,w:this.imgSize[d.vmlBg].width,h:this.imgSize[d.vmlBg].height,L:d.offsetLeft,T:d.offsetTop,bLW:d.clientLeft,bTW:d.clientTop};a=(n.L+n.bLW==1)?1:0;e=function(b,p,q,c,s,u){b.coordsize=c+","+s;b.coordorigin=u+","+u;b.path="m0,0l"+c+",0l"+c+","+s+"l0,"+s+" xe";b.style.width=c+"px";b.style.height=s+"px";b.style.left=p+"px";b.style.top=q+"px"};e(d.vml.color.shape,(n.L+(d.isImg?0:n.bLW)),(n.T+(d.isImg?0:n.bTW)),(n.W-1),(n.H-1),0);e(d.vml.image.shape,(n.L+n.bLW),(n.T+n.bTW),(n.W),(n.H),1);g={X:0,Y:0};if(d.isImg){g.X=parseInt(h.paddingLeft,10)+1;g.Y=parseInt(h.paddingTop,10)+1}else{for(j in g){if(g.hasOwnProperty(j)){this.figurePercentage(g,n,j,h["backgroundPosition"+j])}}}d.vml.image.fill.position=(g.X/n.W)+","+(g.Y/n.H);m=h.backgroundRepeat;f={T:1,R:n.W+a,B:n.H,L:1+a};l={X:{b1:"L",b2:"R",d:"W"},Y:{b1:"T",b2:"B",d:"H"}};if(m!="repeat"||d.isImg){i={T:(g.Y),R:(g.X+n.w),B:(g.Y+n.h),L:(g.X)};if(m.search("repeat-")!=-1){k=m.split("repeat-")[1].toUpperCase();i[l[k].b1]=1;i[l[k].b2]=n[l[k].d]}if(i.B>n.H){i.B=n.H}d.vml.image.shape.style.clip="rect("+i.T+"px "+(i.R+a)+"px "+i.B+"px "+(i.L+a)+"px)"}else{d.vml.image.shape.style.clip="rect("+f.T+"px "+f.R+"px "+f.B+"px "+f.L+"px)"}},figurePercentage:function(d,c,f,a){var b,e;e=true;b=(f=="X");switch(a){case"left":case"top":d[f]=0;break;case"center":d[f]=0.5;break;case"right":case"bottom":d[f]=1;break;default:if(a.search("%")!=-1){d[f]=parseInt(a,10)/100}else{e=false}}d[f]=Math.ceil(e?((c[b?"W":"H"]*d[f])-(c[b?"w":"h"]*d[f])):parseInt(a,10));if(d[f]%2===0){d[f]++}return d[f]},fixPng:function(c){c.style.behavior="none";var g,b,f,a,d;if(c.nodeName=="BODY"||c.nodeName=="TD"||c.nodeName=="TR"){return}c.isImg=false;if(c.nodeName=="IMG"){if(c.src.toLowerCase().search(/\.png$/)!=-1){c.isImg=true;c.style.visibility="hidden"}else{return}}else{if(c.currentStyle.backgroundImage.toLowerCase().search(".png")==-1){return}}g=DD_belatedPNG;c.vml={color:{},image:{}};b={shape:{},fill:{}};for(a in c.vml){if(c.vml.hasOwnProperty(a)){for(d in b){if(b.hasOwnProperty(d)){f=g.ns+":"+d;c.vml[a][d]=document.createElement(f)}}c.vml[a].shape.stroked=false;c.vml[a].shape.appendChild(c.vml[a].fill);c.parentNode.insertBefore(c.vml[a].shape,c)}}c.vml.image.shape.fillcolor="none";c.vml.image.fill.type="tile";c.vml.color.fill.on=false;g.attachHandlers(c);g.giveLayout(c);g.giveLayout(c.offsetParent);c.vmlInitiated=true;g.applyVML(c)}};try{document.execCommand("BackgroundImageCache",false,true)}catch(r){}DD_belatedPNG.createVmlNameSpace();DD_belatedPNG.createVmlStyleSheet();
}

/*
	SWFObject v2.2
	swfobject.embedSWF("test.swf", "myContent", "300", "120", "9.0.0", "expressInstall.swf");
*/
swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

/*
	jQuery.cookie
	$.cookie('the_cookie'); //读取Cookie值
	$.cookie('the_cookie', 'the_value'); //设置cookie的值
	$.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
*/
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

/*
	定时器
	$("#close-button").oneTime(1000,function(){});
	$("#close-button").stopTime();
	1. everyTime(时间间隔, [计时器名称], 函式名称, [次数限制], [等待函式程序完成])
	2. oneTime(时间间隔, [计时器名称], 呼叫的函式)
	3. stopTime ([计时器名称], [函式名称])
*/
jQuery.fn.extend({
everyTime: function(interval, label, fn, times, belay) {
	return this.each(function() {
		jQuery.timer.add(this, interval, label, fn, times, belay);
	});
},
oneTime: function(interval, label, fn) {
	return this.each(function() {
		jQuery.timer.add(this, interval, label, fn, 1);
	});
},
stopTime: function(label, fn) {
	return this.each(function() {
		jQuery.timer.remove(this, label, fn);
	});
}
});
jQuery.extend({
	timer: {
		guid: 1,
		global: {},
		regex: /^([0-9]+)\s*(.*s)?$/,
		powers: {
			'ms': 1,
			'cs': 10,
			'ds': 100,
			's': 1000,
			'das': 10000,
			'hs': 100000,
			'ks': 1000000
		},
		timeParse: function(value) {
			if (value == undefined || value == null)
				return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseInt(result[1], 10);
				var mult = this.powers[result[2]] || 1;
				return num * mult;
			} else {
				return value;
			}
		},
		add: function(element, interval, label, fn, times, belay) {
			var counter = 0;
			if (jQuery.isFunction(label)) {
				if (!times) 
					times = fn;
				fn = label;
				label = interval;
			}
			interval = jQuery.timer.timeParse(interval);
			if (typeof interval != 'number' || isNaN(interval) || interval <= 0)
				return;
			if (times && times.constructor != Number) {
				belay = !!times;
				times = 0;
			}
			times = times || 0;
			belay = belay || false;
			if (!element.$timers) 
				element.$timers = {};
			if (!element.$timers[label])
				element.$timers[label] = {};
			fn.$timerID = fn.$timerID || this.guid++;
			var handler = function() {
				if (belay && this.inProgress) 
					return;
				this.inProgress = true;
				if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
					jQuery.timer.remove(element, label, fn);
				this.inProgress = false;
			};
			handler.$timerID = fn.$timerID;
			if (!element.$timers[label][fn.$timerID]) 
				element.$timers[label][fn.$timerID] = window.setInterval(handler,interval);
			if ( !this.global[label] )
				this.global[label] = [];
			this.global[label].push( element );
		},
		remove: function(element, label, fn) {
			var timers = element.$timers, ret;
			if ( timers ) {
				if (!label) {
					for ( label in timers )
						this.remove(element, label, fn);
				} else if ( timers[label] ) {
					if ( fn ) {
						if ( fn.$timerID ) {
							window.clearInterval(timers[label][fn.$timerID]);
							delete timers[label][fn.$timerID];
						}
					} else {
						for ( var fn in timers[label] ) {
							window.clearInterval(timers[label][fn]);
							delete timers[label][fn];
						}
					}
					for ( ret in timers[label] ) break;
					if ( !ret ) {
						ret = null;
						delete timers[label];
					}
				}
				for ( ret in timers ) break;
				if ( !ret ) 
					element.$timers = null;
			}
		}
	}
});
if (jQuery.browser.msie)
	jQuery(window).one("unload", function() {
		var global = jQuery.timer.global;
		for ( var label in global ) {
			var els = global[label], i = els.length;
			while ( --i )
				jQuery.timer.remove(els[i], label);
		}
});

/*
	置顶插件scrolltotop
	scrolltotop.controlHTML='<a href="#top" id="scrolltotop">返回顶部</a>';
	scrolltotop.init();
*/
scrolltotop={
setting: {startline:100, scrollto: 0, scrollduration:500, fadeduration:[500, 100]},
controlHTML: '<a href="#top" id="scrolltotop"></a>',
controlattrs: {offsetx:5, offsety:5}, 
anchorkeyword: '#top', 
state: {isvisible:false, shouldvisible:false},
scrollup:function(){
	if (!this.cssfixedsupport) {
		if(this.$control!=undefined) this.$control.css({opacity:0}) 
	};
	var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto);
	if (typeof dest=="string" && jQuery('#'+dest).length==1) {
		dest=jQuery('#'+dest).offset().top;
	} else {
		dest=this.setting.scrollto;
	};
	if(this.$body!=undefined) this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
},
keepfixed:function(){
	var $window=jQuery(window);
	var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx;
	var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety;
	this.$control.css({left:controlx+'px', top:controly+'px'});
},
togglecontrol:function(){
	var scrolltop=jQuery(window).scrollTop();
	if (!this.cssfixedsupport) {
		this.keepfixed();
	};
	this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false;
	if (this.state.shouldvisible && !this.state.isvisible){
		this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0]);
		this.state.isvisible=true;
	}
	else if (this.state.shouldvisible==false && this.state.isvisible){
		this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1]);
		this.state.isvisible=false;
	}
},
init:function(){
	jQuery(document).ready(function($){
		if($("body").attr('scrolltotop')!='no'){
		scrolltotop.cssfixedsupport=!document.all || document.all && document.compatMode=="CSS1Compat" && window.XMLHttpRequest;
		scrolltotop.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');
		scrolltotop.$control=$('<div id="topcontrol">'+scrolltotop.controlHTML+'</div>')
			.css({position:scrolltotop.cssfixedsupport? 'fixed' : 'absolute', bottom:scrolltotop.controlattrs.offsety, right:scrolltotop.controlattrs.offsetx, opacity:0, cursor:'pointer'})
			.click(function(){scrolltotop.scrollup(); return false;})
			.appendTo('body');
		if (document.all && !window.XMLHttpRequest && scrolltotop.$control.text()!='') {
			scrolltotop.$control.css({width:scrolltotop.$control.width()});
		};
		scrolltotop.togglecontrol();
		$('a[href="' + scrolltotop.anchorkeyword +'"]').click(function(){
			scrolltotop.scrollup();
			return false;
		});
		$(window).bind('scroll resize', function(e){
			scrolltotop.togglecontrol();
		});
		}
		});
	}
};

/*
	工具提示tooltip
	指向参数：gravity:'n'; // nw | n | ne | w | e | sw | s | se
	隐显参数：fade:true	delayIn: 500, delayOut: 1000
	html支持参数：html:true
	$('.shelp').eq(0).tooltip({trigger: 'manual',classname:'paopaotip',corner:'10px',gravity:'s'});
	$('.shelp').eq(0).tooltip('show');
*/
function fixTitle($ele){
	if ($ele.attr('title') || typeof($ele.attr('original-title')) != 'string') {
		$ele.attr('original-title', $ele.attr('title') || '').removeAttr('title');
	}
}
function Tooltip(element,options) {
	this.$element = $(element);
	this.options = options;
	this.enabled = true;
	fixTitle(this.$element);
}
Tooltip.prototype = {
	show: function() {
		var title = this.getTitle();
		if (title && this.enabled) {
			var $tip = this.tip();
			$tip.find('.'+this.options.classname+'-inner')[this.options.html ? 'html' : 'text'](title);
			$tip[0].className = this.options.classname;
			$tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
			var pos = $.extend({}, this.$element.offset(), {
				width: this.$element[0].offsetWidth,
				height: this.$element[0].offsetHeight
			});
			var actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight;
			var gravity = (typeof this.options.gravity == 'function')
							? this.options.gravity.call(this.$element[0])
							: this.options.gravity;
			var tp;
			switch (gravity.charAt(0)) {
				case 'n':
					tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
					break;
				case 's':
					tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
					break;
				case 'e':
					tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
					break;
				case 'w':
					tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
					break;
			}
			if (gravity.length == 2) {
				if (gravity.charAt(1) == 'w') {
					tp.left = pos.left + pos.width / 2 - 15;
				} else {
					tp.left = pos.left + pos.width / 2 - actualWidth + 15;
				}
			}
			$tip.css(tp).addClass(this.options.classname+'-' + gravity);
			
			if (this.options.fade) {
				$tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
			} else {
				$tip.css({visibility: 'visible', opacity: this.options.opacity});
			}
			$tip.find('.tooltip-cls').parent().css('left',actualWidth-22);
			$tip.find('.tooltip-cls').click(function(){$tip.hide();});
			//$tip.find('.'+this.options.classname+'-inner').corner(this.options.corner);
		}
	},
	hide: function() {
		if (this.options.fade) {
			this.tip().stop().fadeOut(function(){$(this).remove(); });
		} else {
			this.tip().remove();
		}
	},
	getTitle:function() {
		var title, $e = this.$element, o = this.options;
		fixTitle($e);
		var title, o = this.options;
		if (typeof o.title == 'string') {
			title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
		} else if (typeof o.title == 'function') {
			title = o.title.call($e[0]);
		}
		title = ('' + title).replace(/(^\s*|\s*$)/, "");
		return title || o.fallback;
	},
	tip:function() {
		if (!this.$tip) {
			this.$tip = $('<div class="'+this.options.classname+'"></div>').html((this.options.showcls ? '<div style="position:relative;float:left"><span style="position:absolute;left:0;top:-5px;width:16px;height:16px"><span class="tooltip-cls"></span></span></div>' : '')+'<div class="'+this.options.classname+'-arrow"></div><div class="'+this.options.classname+'-inner"/></div>');
		}
		return this.$tip;
	},
	validate: function() {
		if (!this.$element[0].parentNode) {
			this.hide();
			this.$element = null;
			this.options = null;
		}
	},
	enable: function() { this.enabled = true; },
	disable: function() { this.enabled = false; },
	toggleEnabled: function() { this.enabled = !this.enabled; }
};
$.fn.tooltip = function(options) {
	if (options === true) {
		return this.data('tooltip');
	} else if (typeof options == 'string') {
		if(this.data('tooltip')!=undefined)	return this.data('tooltip')[options]();
	}
	options = $.extend({}, $.fn.tooltip.defaults, options);
	function get(ele) {
		var tooltip = $.data(ele,'tooltip');
		if (!tooltip) {
			tooltip = new Tooltip(ele,$.fn.tooltip.elementOptions(ele,options));
			$.data(ele,'tooltip',tooltip);
		}
		return tooltip;
	}
	function enter() {
		var tooltip = get(this);
		tooltip.hoverState = 'in';
		if (options.delayIn == 0) {
			tooltip.show();
		} else {
			setTimeout(function() { if (tooltip.hoverState == 'in') tooltip.show(); }, options.delayIn);
		}
	};
	function leave() {
		var tooltip = get(this);
		tooltip.hoverState = 'out';
		if (options.delayOut == 0) {
			tooltip.hide();
		} else {
			setTimeout(function() { if (tooltip.hoverState == 'out') tooltip.hide(); }, options.delayOut);
		}
	};
	if (!options.live) this.each(function() { get(this); });
	if (options.trigger != 'manual') {
		var binder   = options.live ? 'live' : 'bind',
			eventIn  = options.trigger == 'hover' ? 'mouseenter' : 'focus',
			eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
		this[binder](eventIn, enter)[binder](eventOut, leave);	
	}
	return this;
};
$.fn.tooltip.defaults = {
	delayIn: 0,delayOut: 0,fade: false,fallback: '',gravity: 'nw',html: true,live: false,
	offset: 0,opacity: 1,title: 'title',classname: 'tooltip',corner:'3px',trigger: 'hover',showcls:false
};
$.fn.tooltip.elementOptions = function(ele, options) {
	return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
};
$.fn.tooltip.autoNS = function() {
	return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
};
$.fn.tooltip.autoWE = function() {
	return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
};

/*
	鼠标滚轮插件mousewheel
	基于mousewheel 3.0.4 https://github.com/brandonaaron/jquery-mousewheel
	$(window).bind('mousewheel',function(){});
*/
var types = ['DOMMouseScroll', 'mousewheel'];
$.event.special.mousewheel = {
	setup: function() {
		if ( this.addEventListener ) {
			for ( var i=types.length; i; ) {
				this.addEventListener( types[--i], handler, false );
			}
		} else {
			this.onmousewheel = handler;
		}
	},
	teardown: function() {
		if ( this.removeEventListener ) {
			for ( var i=types.length; i; ) {
				this.removeEventListener( types[--i], handler, false );
			}
		} else {
			this.onmousewheel = null;
		}
	}
};
$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});
function handler(event) {
	var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
	event = $.event.fix(orgEvent);
	event.type = "mousewheel";
	// Old school scrollwheel delta
	if ( event.wheelDelta ) { delta = event.wheelDelta/120; }
	if ( event.detail     ) { delta = -event.detail/3; }
	// New school multidimensional scroll (touchpads) deltas
	deltaY = delta;
	// Gecko
	if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
		deltaY = 0;
		deltaX = -1*delta;
	}
	// Webkit
	if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
	if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
	// Add event and delta to the front of the arguments
	args.unshift(event, delta, deltaX, deltaY);
	return $.event.handle.apply(this, args);
}

/*
	滚动面板插件jScrollPane
	$('#listbox').jScrollPane();
*/
$.jScrollPane = {
	active : []
};
$.fn.jScrollPane = function(settings)
{
	settings = $.extend({}, $.fn.jScrollPane.defaults, settings);

	var rf = function() { return false; };
	
	return this.each(
		function()
		{
			var $this = $(this);
			var paneEle = this;
			var currentScrollPosition = 0;
			var paneWidth;
			var paneHeight;
			var trackHeight;
			var trackOffset = settings.topCapHeight;
			var $container;
			
			if ($(this).parent().is('.jScrollPaneContainer')) {
				$container = $(this).parent();
				currentScrollPosition = settings.maintainPosition ? $this.position().top : 0;
				var $c = $(this).parent();
				paneWidth = $c.innerWidth();
				paneHeight = $c.outerHeight();
				$('>.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown, >.jScrollCap', $c).remove();
				$this.css({'top':0});
			} else {
				$this.data('originalStyleTag', $this.attr('style'));
				// Switch the element's overflow to hidden to ensure we get the size of the element without the scrollbars [http://plugins.jquery.com/node/1208]
				$this.css('overflow', 'hidden');
				this.originalPadding = $this.css('paddingTop') + ' ' + $this.css('paddingRight') + ' ' + $this.css('paddingBottom') + ' ' + $this.css('paddingLeft');
				this.originalSidePaddingTotal = (parseInt($this.css('paddingLeft')) || 0) + (parseInt($this.css('paddingRight')) || 0);
				paneWidth = $this.innerWidth();
				paneHeight = $this.innerHeight();
				$container = $('<div></div>')
					.attr({'className':'jScrollPaneContainer'})
					.css(
						{
							'height':paneHeight+'px', 
							'width':paneWidth+'px'
						}
					);
				if (settings.enableKeyboardNavigation) {
					$container.attr(
						'tabindex', 
						settings.tabIndex
					);
				}
				$this.wrap($container);
				$container = $this.parent();
				// deal with text size changes (if the jquery.em plugin is included)
				// and re-initialise the scrollPane so the track maintains the
				// correct size
				$(document).bind(
					'emchange', 
					function(e, cur, prev)
					{
						$this.jScrollPane(settings);
					}
				);
				
			}
			trackHeight = paneHeight;
			
			if (settings.reinitialiseOnImageLoad) {
				// code inspired by jquery.onImagesLoad: http://plugins.jquery.com/project/onImagesLoad
				// except we re-initialise the scroll pane when each image loads so that the scroll pane is always up to size...
				// TODO: Do I even need to store it in $.data? Is a local variable here the same since I don't pass the reinitialiseOnImageLoad when I re-initialise?
				var $imagesToLoad = $.data(paneEle, 'jScrollPaneImagesToLoad') || $('img', $this);
				var loadedImages = [];
				
				if ($imagesToLoad.length) {
					$imagesToLoad.each(function(i, val)	{
						$(this).bind('load readystatechange', function() {
							if($.inArray(i, loadedImages) == -1){ //don't double count images
								loadedImages.push(val); //keep a record of images we've seen
								$imagesToLoad = $.grep($imagesToLoad, function(n, i) {
									return n != val;
								});
								$.data(paneEle, 'jScrollPaneImagesToLoad', $imagesToLoad);
								var s2 = $.extend(settings, {reinitialiseOnImageLoad:false});
								$this.jScrollPane(s2); // re-initialise
							}
						}).each(function(i, val) {
							if(this.complete || this.complete===undefined) { 
								//needed for potential cached images
								this.src = this.src; 
							} 
						});
					});
				};
			}

			var p = this.originalSidePaddingTotal;
			var realPaneWidth = paneWidth - settings.scrollbarWidth - settings.scrollbarMargin - p;

			var cssToApply = {
				'height':'auto',
				'width': realPaneWidth + 'px'
			}

			if(settings.scrollbarOnLeft) {
				cssToApply.paddingLeft = settings.scrollbarMargin + settings.scrollbarWidth + 'px';
			} else {
				cssToApply.paddingRight = settings.scrollbarMargin + 'px';
			}

			$this.css(cssToApply);

			var contentHeight = $this.outerHeight();
			var percentInView = paneHeight / contentHeight;
			
			var isScrollable = percentInView < .99;
			$container[isScrollable ? 'addClass' : 'removeClass']('jScrollPaneScrollable');

			if (isScrollable) {
				$container.append(
					$('<div></div>').addClass('jScrollCap jScrollCapTop').css({height:settings.topCapHeight}),
					$('<div></div>').attr({'className':'jScrollPaneTrack'}).css({'width':settings.scrollbarWidth+'px'}).append(
						$('<div></div>').attr({'className':'jScrollPaneDrag'}).css({'width':settings.scrollbarWidth+'px'}).append(
							$('<div></div>').attr({'className':'jScrollPaneDragTop'}).css({'width':settings.scrollbarWidth+'px'}),
							$('<div></div>').attr({'className':'jScrollPaneDragBottom'}).css({'width':settings.scrollbarWidth+'px'})
						)
					),
					$('<div></div>').addClass('jScrollCap jScrollCapBottom').css({height:settings.bottomCapHeight})
				);
				
				var $track = $('>.jScrollPaneTrack', $container);
				var $drag = $('>.jScrollPaneTrack .jScrollPaneDrag', $container);
				
				
				var currentArrowDirection;
				var currentArrowTimerArr = [];// Array is used to store timers since they can stack up when dealing with keyboard events. This ensures all timers are cleaned up in the end, preventing an acceleration bug.
				var currentArrowInc;
				var whileArrowButtonDown = function() 
				{
					if (currentArrowInc > 4 || currentArrowInc % 4 == 0) {
						positionDrag(dragPosition + currentArrowDirection * mouseWheelMultiplier);
					}
					currentArrowInc++;
				};

				if (settings.enableKeyboardNavigation) {
					$container.bind(
						'keydown.jscrollpane',
						function(e) 
						{
							switch (e.keyCode) {
								case 38: //up
									currentArrowDirection = -1;
									currentArrowInc = 0;
									whileArrowButtonDown();
									currentArrowTimerArr[currentArrowTimerArr.length] = setInterval(whileArrowButtonDown, 100);
									return false;
								case 40: //down
									currentArrowDirection = 1;
									currentArrowInc = 0;
									whileArrowButtonDown();
									currentArrowTimerArr[currentArrowTimerArr.length] = setInterval(whileArrowButtonDown, 100);
									return false;
								case 33: // page up
								case 34: // page down
									// TODO
									return false;
								default:
							}
						}
					).bind(
						'keyup.jscrollpane',
						function(e) 
						{
							if (e.keyCode == 38 || e.keyCode == 40) {
								for (var i = 0; i < currentArrowTimerArr.length; i++) {
									clearInterval(currentArrowTimerArr[i]);
								}
								return false;
							}
						}
					);
				}

				if (settings.showArrows) {
					
					var currentArrowButton;
					var currentArrowInterval;

					var onArrowMouseUp = function(event)
					{
						$('html').unbind('mouseup', onArrowMouseUp);
						currentArrowButton.removeClass('jScrollActiveArrowButton');
						clearInterval(currentArrowInterval);
					};
					var onArrowMouseDown = function() {
						$('html').bind('mouseup', onArrowMouseUp);
						currentArrowButton.addClass('jScrollActiveArrowButton');
						currentArrowInc = 0;
						whileArrowButtonDown();
						currentArrowInterval = setInterval(whileArrowButtonDown, 100);
					};
					$container
						.append(
							$('<a></a>')
								.attr(
									{
										'href':'javascript:;', 
										'className':'jScrollArrowUp', 
										'tabindex':-1
									}
								)
								.css(
									{
										'width':settings.scrollbarWidth+'px',
										'top':settings.topCapHeight + 'px'
									}
								)
								.html('Scroll up')
								.bind('mousedown', function()
								{
									currentArrowButton = $(this);
									currentArrowDirection = -1;
									onArrowMouseDown();
									this.blur();
									return false;
								})
								.bind('click', rf),
							$('<a></a>')
								.attr(
									{
										'href':'javascript:;', 
										'className':'jScrollArrowDown', 
										'tabindex':-1
									}
								)
								.css(
									{
										'width':settings.scrollbarWidth+'px',
										'bottom':settings.bottomCapHeight + 'px'
									}
								)
								.html('Scroll down')
								.bind('mousedown', function()
								{
									currentArrowButton = $(this);
									currentArrowDirection = 1;
									onArrowMouseDown();
									this.blur();
									return false;
								})
								.bind('click', rf)
						);
					var $upArrow = $('>.jScrollArrowUp', $container);
					var $downArrow = $('>.jScrollArrowDown', $container);
				}
				
				if (settings.arrowSize) {
					trackHeight = paneHeight - settings.arrowSize - settings.arrowSize;
					trackOffset += settings.arrowSize;
				} else if ($upArrow) {
					var topArrowHeight = $upArrow.height();
					settings.arrowSize = topArrowHeight;
					trackHeight = paneHeight - topArrowHeight - $downArrow.height();
					trackOffset += topArrowHeight;
				}
				trackHeight -= settings.topCapHeight + settings.bottomCapHeight;
				$track.css({'height': trackHeight+'px', top:trackOffset+'px'})
				
				var $pane = $(this).css({'position':'absolute', 'overflow':'visible'});
				
				var currentOffset;
				var maxY;
				var mouseWheelMultiplier;
				// store this in a seperate variable so we can keep track more accurately than just updating the css property..
				var dragPosition = 0;
				var dragMiddle = percentInView*paneHeight/2;
				
				// pos function borrowed from tooltip plugin and adapted...
				var getPos = function (event, c) {
					var p = c == 'X' ? 'Left' : 'Top';
					return event['page' + c] || (event['client' + c] + (document.documentElement['scroll' + p] || document.body['scroll' + p])) || 0;
				};
				
				var ignoreNativeDrag = function() {	return false; };
				
				var initDrag = function()
				{
					ceaseAnimation();
					currentOffset = $drag.offset(false);
					currentOffset.top -= dragPosition;
					maxY = trackHeight - $drag[0].offsetHeight;
					mouseWheelMultiplier = 2 * settings.wheelSpeed * maxY / contentHeight;
				};
				
				var onStartDrag = function(event)
				{
					initDrag();
					dragMiddle = getPos(event, 'Y') - dragPosition - currentOffset.top;
					$('html').bind('mouseup', onStopDrag).bind('mousemove', updateScroll).bind('mouseleave', onStopDrag)
					if ($.browser.msie) {
						$('html').bind('dragstart', ignoreNativeDrag).bind('selectstart', ignoreNativeDrag);
					}
					return false;
				};
				var onStopDrag = function()
				{
					$('html').unbind('mouseup', onStopDrag).unbind('mousemove', updateScroll);
					dragMiddle = percentInView*paneHeight/2;
					if ($.browser.msie) {
						$('html').unbind('dragstart', ignoreNativeDrag).unbind('selectstart', ignoreNativeDrag);
					}
				};
				var positionDrag = function(destY)
				{
					$container.scrollTop(0);
					destY = destY < 0 ? 0 : (destY > maxY ? maxY : destY);
					dragPosition = destY;
					$drag.css({'top':destY+'px'});
					var p = destY / maxY;
					$this.data('jScrollPanePosition', (paneHeight-contentHeight)*-p);
					$pane.css({'top':((paneHeight-contentHeight)*p) + 'px'});
					$this.trigger('scroll');
					if (settings.showArrows) {
						$upArrow[destY == 0 ? 'addClass' : 'removeClass']('disabled');
						$downArrow[destY == maxY ? 'addClass' : 'removeClass']('disabled');
					}
				};
				var updateScroll = function(e)
				{
					positionDrag(getPos(e, 'Y') - currentOffset.top - dragMiddle);
				};
				
				var dragH = Math.max(Math.min(percentInView*(paneHeight-settings.arrowSize*2), settings.dragMaxHeight), settings.dragMinHeight);
				
				$drag.css(
					{'height':dragH+'px'}
				).bind('mousedown', onStartDrag);
				
				var trackScrollInterval;
				var trackScrollInc;
				var trackScrollMousePos;
				var doTrackScroll = function()
				{
					if (trackScrollInc > 8 || trackScrollInc%4==0) {
						positionDrag((dragPosition - ((dragPosition - trackScrollMousePos) / 2)));
					}
					trackScrollInc ++;
				};
				var onStopTrackClick = function()
				{
					clearInterval(trackScrollInterval);
					$('html').unbind('mouseup', onStopTrackClick).unbind('mousemove', onTrackMouseMove);
				};
				var onTrackMouseMove = function(event)
				{
					trackScrollMousePos = getPos(event, 'Y') - currentOffset.top - dragMiddle;
				};
				var onTrackClick = function(event)
				{
					initDrag();
					onTrackMouseMove(event);
					trackScrollInc = 0;
					$('html').bind('mouseup', onStopTrackClick).bind('mousemove', onTrackMouseMove);
					trackScrollInterval = setInterval(doTrackScroll, 100);
					doTrackScroll();
					return false;
				};
				
				$track.bind('mousedown', onTrackClick);
				
				$container.bind(
					'mousewheel',
					function (event, delta) {
						delta = delta || (event.wheelDelta ? event.wheelDelta / 120 : (event.detail) ?
-event.detail/3 : 0);
						initDrag();
						ceaseAnimation();
						var d = dragPosition;
						positionDrag(dragPosition - delta * mouseWheelMultiplier);
						var dragOccured = d != dragPosition;
						return !dragOccured;
					}
				);

				var _animateToPosition;
				var _animateToInterval;
				function animateToPosition()
				{
					var diff = (_animateToPosition - dragPosition) / settings.animateStep;
					if (diff > 1 || diff < -1) {
						positionDrag(dragPosition + diff);
					} else {
						positionDrag(_animateToPosition);
						ceaseAnimation();
					}
				}
				var ceaseAnimation = function()
				{
					if (_animateToInterval) {
						clearInterval(_animateToInterval);
						delete _animateToPosition;
					}
				};
				var scrollTo = function(pos, preventAni)
				{
					if (typeof pos == "string") {
						// Legal hash values aren't necessarily legal jQuery selectors so we need to catch any
						// errors from the lookup...
						try {
							$e = $(pos, $this);
						} catch (err) {
							return;
						}
						if (!$e.length) return;
						pos = $e.offset().top - $this.offset().top;
					}
					ceaseAnimation();
					var maxScroll = contentHeight - paneHeight;
					pos = pos > maxScroll ? maxScroll : pos;
					$this.data('jScrollPaneMaxScroll', maxScroll);
					var destDragPosition = pos/maxScroll * maxY;
					if (preventAni || !settings.animateTo) {
						positionDrag(destDragPosition);
					} else {
						$container.scrollTop(0);
						_animateToPosition = destDragPosition;
						_animateToInterval = setInterval(animateToPosition, settings.animateInterval);
					}
				};
				$this[0].scrollTo = scrollTo;
				
				$this[0].scrollBy = function(delta)
				{
					var currentPos = -parseInt($pane.css('top')) || 0;
					scrollTo(currentPos + delta);
				};
				
				initDrag();
				
				scrollTo(-currentScrollPosition, true);
			
				// Deal with it when the user tabs to a link or form element within this scrollpane
				$('*', this).bind(
					'focus',
					function(event)
					{
						var $e = $(this);
						
						// loop through parents adding the offset top of any elements that are relatively positioned between
						// the focused element and the jScrollPaneContainer so we can get the true distance from the top
						// of the focused element to the top of the scrollpane...
						var eleTop = 0;
						
						var preventInfiniteLoop = 100;
						
						while ($e[0] != $this[0]) {
							eleTop += $e.position().top;
							$e = $e.offsetParent();
							if (!preventInfiniteLoop--) {
								return;
							}
						}
						
						var viewportTop = -parseInt($pane.css('top')) || 0;
						var maxVisibleEleTop = viewportTop + paneHeight;
						var eleInView = eleTop > viewportTop && eleTop < maxVisibleEleTop;
						if (!eleInView) {
							var destPos = eleTop - settings.scrollbarMargin;
							if (eleTop > viewportTop) { // element is below viewport - scroll so it is at bottom.
								destPos += $(this).height() + 15 + settings.scrollbarMargin - paneHeight;
							}
							scrollTo(destPos);
						}
					}
				)
				
				
				if (settings.observeHash) {
					if (location.hash && location.hash.length > 1) {
						setTimeout(function(){
							scrollTo(location.hash);
						}, $.browser.safari ? 100 : 0);
					}
					
					// use event delegation to listen for all clicks on links and hijack them if they are links to
					// anchors within our content...
					$(document).bind('click', function(e){
						$target = $(e.target);
						if ($target.is('a')) {
							var h = $target.attr('href');
							if (h && h.substr(0, 1) == '#' && h.length > 1) {
								setTimeout(function(){
									scrollTo(h, !settings.animateToInternalLinks);
								}, $.browser.safari ? 100 : 0);
							}
						}
					});
				}
				
				// Deal with dragging and selecting text to make the scrollpane scroll...
				function onSelectScrollMouseDown(e)
				{
				   $(document).bind('mousemove.jScrollPaneDragging', onTextSelectionScrollMouseMove);
				   $(document).bind('mouseup.jScrollPaneDragging',   onSelectScrollMouseUp);
				  
				}
				
				var textDragDistanceAway;
				var textSelectionInterval;
				
				function onTextSelectionInterval()
				{
					direction = textDragDistanceAway < 0 ? -1 : 1;
					$this[0].scrollBy(textDragDistanceAway / 2);
				}

				function clearTextSelectionInterval()
				{
					if (textSelectionInterval) {
						clearInterval(textSelectionInterval);
						textSelectionInterval = undefined;
					}
				}
				
				function onTextSelectionScrollMouseMove(e)
				{
					var offset = $this.parent().offset().top;
					var maxOffset = offset + paneHeight;
					var mouseOffset = getPos(e, 'Y');
					textDragDistanceAway = mouseOffset < offset ? mouseOffset - offset : (mouseOffset > maxOffset ? mouseOffset - maxOffset : 0);
					if (textDragDistanceAway == 0) {
						clearTextSelectionInterval();
					} else {
						if (!textSelectionInterval) {
							textSelectionInterval  = setInterval(onTextSelectionInterval, 100);
						}
					}
				}

				function onSelectScrollMouseUp(e)
				{
				   $(document)
					  .unbind('mousemove.jScrollPaneDragging')
					  .unbind('mouseup.jScrollPaneDragging');
				   clearTextSelectionInterval();
				}

				$container.bind('mousedown.jScrollPane', onSelectScrollMouseDown);

				
				$.jScrollPane.active.push($this[0]);
				
			} else {
				$this.css(
					{
						'height':paneHeight+'px',
						'width':paneWidth-this.originalSidePaddingTotal+'px',
						'padding':this.originalPadding
					}
				);
				$this[0].scrollTo = $this[0].scrollBy = function() {};
				// clean up listeners
				$this.parent().unbind('mousewheel').unbind('mousedown.jScrollPane').unbind('keydown.jscrollpane').unbind('keyup.jscrollpane');
			}
			
		}
	)
};

$.fn.jScrollPaneRemove = function()
{
	$(this).each(function()
	{
		$this = $(this);
		var $c = $this.parent();
		if ($c.is('.jScrollPaneContainer')) {
			$this.css(
				{
					'top':'',
					'height':'',
					'width':'',
					'padding':'',
					'overflow':'',
					'position':''
				}
			);
			$this.attr('style', $this.data('originalStyleTag'));
			$c.after($this).remove();
		}
	});
}

$.fn.jScrollPane.defaults = {
	scrollbarWidth : 10,
	scrollbarMargin : 5,
	wheelSpeed : 18,
	showArrows : false,
	arrowSize : 0,
	animateTo : false,
	dragMinHeight : 1,
	dragMaxHeight : 99999,
	animateInterval : 100,
	animateStep: 3,
	maintainPosition: true,
	scrollbarOnLeft: false,
	reinitialiseOnImageLoad: false,
	tabIndex : 0,
	enableKeyboardNavigation: true,
	animateToInternalLinks: false,
	topCapHeight: 0,
	bottomCapHeight: 0,
	observeHash: true
};

// clean up the scrollTo expandos
$(window)
	.bind('unload', function() {
		var els = $.jScrollPane.active; 
		for (var i=0; i<els.length; i++) {
			els[i].scrollTo = els[i].scrollBy = null;
		}
	}
);

/*
	tab插件idTabs
	基于idTabs v3.0
	$("#usual ul").idTabs();
	$(".fade").fadeTabs();
	idTabs("tab2");
*/
// Helper functions
var idTabs, //shortcut
undefined,  //speed up
href = function(e){ return $(e).attr("href"); },
type = function(o){ //reliable
  return o===null && "Null"
	  || o===undefined && "Undefined"
	  || ({}).toString.call(o).slice(8,-1);
};
$.fn.idTabs = function(){
  var s = idTabs.args.apply(this,arguments),
  action = s.update&&"update" || s.remove&&"remove" || "bind";
  s.area = this; //save context
  idTabs[action](s);
  return this; //chainable
};
idTabs = $.idTabs = function(tabarea,options,data){
  // Settings
  var e, tabs, items, test=$(), meta = $.metadata?$(tabarea).metadata():{}, //metadata
  s = {tab:idTabs.tab,item:idTabs.item}; //helpers
  s = $.extend(s,idTabs.settings,meta,options||{}); //settings
  s.tabarea = $(tabarea); //save context
  s.data = data||"idTabs"+ +new Date; //save expando
  // Play nice
  $.each({selected:'.',event:'!',start:'#'},function(n,c){
	if(type(s[n])=="String" && s[n].indexOf(c)==0)
	  s[n] = s[n].substr(1); }); //removes type characters
  if(s.start===null) s.start=-1; //no tab selected
  // Find tabs
  items = []; //save elements
  s.tabs = tabs = $("a[href^=#]",tabarea); //save tabs
  tabs.each(function(){ //add items
	test = s.item(href(this));
	if(test.length) items=items.concat(test.get());
  });
  s.items = $(items).hide(); //hide items
  // Save Settings
  e="idTabs."+s.event;
  data=s.tabarea.data("idTabs")||{};
  data[e]=s;
  s.tabarea.data("idTabs",data);
  // Bind idTabs
  tabs.trigger(e).data(s.data,s)
	  .bind(e,{s:s},function(){ //wrapper function due to jQuery bug
		return idTabs.unbind.apply(this,arguments); })
	  .bind(s.event,{s:s},idTabs.find);
  // Select default tab
	 type(s.start) == "Number" && (s.start<0 || (test=tabs.eq(s.start)).length)
  || type(s.start) == "String" && (test=tabs.filter("a[href=#"+s.start+"]")).length
  || (test=tabs.filter('.'+s.selected).removeClass(s.selected)).length
  || (s.start===undefined && (test=tabs.eq(0)).length);
  if(test.length) test.trigger(s.event);

  return s; //return current settings (be creative)
};
// Parse arguments into settings
idTabs.args = function(){
  var a,i=0,s={},args=arguments,
  // Handle string flags .!:
  str = function(_,a){
	if(a.indexOf('.')==0) s.selected = a;
	else if(a.indexOf('!')==0)
	  if(/^!(true|false)$/i.test(a)) s.toggle = /^!true$/i.test(a);
	  else s.event = a;
	else if(a.indexOf(':')==0) {
	  a=a.substr(1).toLowerCase();
	  if(a.indexOf('!')==0) s[a.substr(1)]=false;
	  else s[a]=true;
	} else if(a) s.start = a;
  };
  // Loop through arguments matching options
  while(i<args.length) {
	a=args[i++];
	switch(type(a)){
	  case "Object"   : $.extend(s,a); break;
	  case "Boolean"  : s.change = a;  break;
	  case "Number"   : s.start = a;   break;
	  case "Function" : s.click = a;   break;
	  case "Null"     : s.start = a;   break;
	  case "String"   : $.each(a.split(/\s+/g),str);
	  default: break;
	}
  }
  return s; //settings object
};
// Bind idTabs
idTabs.bind = function(s){
  if(!s) return;
  var data = "idTabs"+ +new Date; //instance expando
  if(s.grouped) $.idTabs(s.area,s,data);
  else s.area.each(function(){ $.idTabs(this,s,data); });
};
// Rebind idTabs
idTabs.update = function(s){
  if(!s) return;
  s.update=false;
  var self,data,n,e = s.event;
  e = (e+"").indexOf('!')==0 && e.substr(1) || e;
  e = e?"idTabs."+e:"";
  return s.area.each(function(){
	self = $(this);
	data = self.data("idTabs");
	if(!data) return;
	if(e) {
	  n=$.extend({},data[e],s);
	  idTabs.remove(data[e])
	  idTabs(n.tabarea,n,n.data);
	} else for(e in data) {
	  if(!Object.hasOwnProperty.call(data, e)) continue;
	  n=$.extend({},data[e],s);
	  idTabs.remove(data[e]);
	  idTabs(n.tabarea,n,n.data);
	}
  });
};
// Unbind idTabs
idTabs.remove = function(s){
  if(!s) return;
  var data,tabs,e = s.event;
  e = (e+"").indexOf('!')==0 && e.substr(1) || e;
  e = "idTabs"+(e?"."+e:"");
  return s.area.each(function(){
	data=$(this).data("idTabs");
	delete data["idTabs."+s.event];
	$(this).data("idTabs",data);
	tabs = s.tabs || $("a[href^=#]",this); //save tabs
	if(!tabs.length && $(this).is("a[href^=#]")) tabs = $(this);
	tabs.trigger(e);
  });
};
// Find tabs
idTabs.find = function(e){
  // Save self since clicked tab may not be the first tab in the tabarea
  var self=this, ret=false, s=e.data.s;
  // Find first tab within each tabset
  $("a[href="+href(this)+"]:first",s.area).each(function(){
	var t = $(this).data(s.data); //tab's settings
	if(t) ret=idTabs.showtab.call(t.tabarea==s.tabarea?self:this,t,e)||ret;
  });
  return ret;
};
// Show tab
idTabs.showtab = function(s,e){
  if(!s || !s.toggle && $(this).is('.'+s.selected))
	return s&&s.change; //return if already selected
  var id = href(this); //find id
  if(s.click && s.click.call(this,id,s,e)==false) return s.change; //call custom func
  if(s.toggle && $(this).is('.'+s.selected)) id=null; //hide items
  return idTabs.show.call(this,id,s,e); //call default func
};
// Show item
idTabs.show = function(id,s){
  s.tabs.removeClass(s.selected); //clear tabs
  s.tab(id).addClass(s.selected); //select tab(s)
  s.items.hide(); //hide all items
  s.item(id).show(); //show item(s)
  return s.change; //option for changing url
};
// Unbind idTabs
idTabs.unbind = function(e){
  var s = e.data.s;
  $(this).removeData(s.data)
  .unbind("idTabs."+s.event);
  return false;
};
// Extend idTabs
idTabs.extend = function(){
  var args = arguments;
  return function(){
	[].push.apply(args,arguments);
	this.idTabs.apply(this,args);
  };
};
// Matching tabs
idTabs.tab = function(id){
  if(!id) return $([]);
  return $("a[href="+id+"]",this.tabarea);
};
// Matching items
idTabs.item = function(id){
  if(!id) return $([]);
  var item = $(id);
  return item.length?item:$('.'+id.substr(1));
};
// Defaults
idTabs.settings = {
  start:undefined,
  change:false,
  click:null,
  selected:".selected",
  event:"!click",
  toggle:false,
  grouped:false
};
// Auto-run
$(function(){ $(".idTabs").idTabs(); });

/*
	树形表格插件treeview原创
	$("#navigation").treeview({});
*/
$.fn.treeview = function(options){
	var defaults={
	rowtouchclass:"touch_row"
	};
	var opts = $.extend(defaults, options);
	var objid = $(this).attr('id');
	$('#treeviewctrl1').click(function(){_clsAll();})
	$('#treeviewctrl2').click(function(){_opnAll();})
	$(this).find('li').each(function(i,row){
	$(row).find('.kindtreetags').first().before('<span class="treeviewempty" style="width:'+(($(row).attr('level'))*30)+'px">&nbsp;</span><span class="uncheck">&nbsp;</span>');
	if(_chkStat($(row))){
	$(row).find('.treeviewempty').after('<span class="treeviewctrl cls"></span>');
	}else{
	$(row).find('.treeviewempty').after('<span class="treeviewctrl none"></span>');
	}
	$(row).find('.treeviewctrl').click(function(){_ctrlStat($(this));});
	$(row).mouseover(function(){
	$(this).addClass(opts.rowtouchclass);					  
	});	
	$(row).mouseout(function(){
	$(this).removeClass(opts.rowtouchclass);					  
	});
	});
	function _opnAll(){
		$('#'+objid).find("li[level='0']").each(function(i,row){
		if(_chkStat($(row))){
		$(row).find('.treeviewctrl').removeClass('none').removeClass('opn').addClass('cls');
		}else{
		$(row).find('.treeviewctrl').removeClass('cls').removeClass('opn').addClass('none');;
		}
		});
		$('#'+objid).find("li[level!='0']").each(function(i,row){
		if(_chkStat($(row))){
		$(row).find('.treeviewctrl').removeClass('none').removeClass('opn').addClass('cls');
		}else{
		$(row).find('.treeviewctrl').removeClass('cls').removeClass('opn').addClass('none');;
		}
		$(row).fadeIn(300);
		});															
	}
	function _clsAll(){
		$('#'+objid).find("li[level='0']").each(function(i,row){
		if(_chkStat($(row))){
		$(row).find('.treeviewctrl').removeClass('none').removeClass('cls').addClass('opn');
		}else{
		$(row).find('.treeviewctrl').removeClass('cls').removeClass('opn').addClass('none');;
		}
		});	
	$('#'+objid).find("li[level!='0']").fadeOut(200);
	}
	function _chkStat(obj){
	if(parseInt(obj.next().attr('level'),10)>parseInt(obj.attr('level'),10)){return true;}else{return false;}
	}
	function _ctrlStat(obj){
	var liobj=obj.parent('li:first');	
	if(obj.attr('class')=='treeviewctrl none') return;
		if(obj.attr('class')=='treeviewctrl opn'){
		obj.removeClass('opn').addClass('cls');
		$('#'+objid).find('li:gt('+liobj.index()+')').each(function(i,row){
		if(parseInt($(row).attr('level'),10)>parseInt(liobj.attr('level'),10)){
			if(_chkStat($(row))){
			$(row).find('.treeviewctrl').removeClass('opn').addClass('cls');
			}else{
			$(row).find('.treeviewctrl').removeClass('opn').addClass('none');;
			}
		$(row).show();
		}else{
		return false;
		}
		});
		}else{
		obj.removeClass('cls').addClass('opn');	
		$('#'+objid).find('li:gt('+liobj.index()+')').each(function(i,row){
		if(parseInt($(row).attr('level'),10)>parseInt(liobj.attr('level'),10)){
		$(row).hide();
		}else{
		return false;
		}
		});
		}
	}
};

/*
	加载遮罩框插件loadmask
	基于jquery-loadmask-0.3
	$("body").mask("数据加载中...");
	$("body").unmask();
*/
$.fn.mask = function(label,pos,showmask){
	showmask=(showmask=='') ? true : showmask;
	//alert(this.css("display"));
	this.find(".loadmask-msg,.loadmask").remove();
	if(this.css("position") == "static") {
		this.addClass("masked-relative");
	}
	if(showmask){
	this.addClass("masked");
	var maskDiv = $('<div class="loadmask"></div>');
		if(navigator.userAgent.toLowerCase().indexOf("msie") > -1){
			maskDiv.height(this.height() + parseInt(this.css("padding-top")) + parseInt(this.css("padding-bottom")));
			maskDiv.width(this.width() + parseInt(this.css("padding-left")) + parseInt(this.css("padding-right")));
		}
		if(navigator.userAgent.toLowerCase().indexOf("msie 6") > -1){
			this.find("select").addClass("masked-hidden");
		}
	this.append(maskDiv);
	}
	if(typeof label == "string") {
		var maskMsgDiv = $('<div class="loadmask-msg" style="display:none;"></div>');
		maskMsgDiv.append('<div>' + label + '</div>');
		this.append(maskMsgDiv);
		switch(pos){
		case '':
		maskMsgDiv.css("top",Math.round(this.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2)+"px");
		break;
		case 'T':
		maskMsgDiv.css("top",$(document).scrollTop()+10+"px");
		break;
		case 'C':
		maskMsgDiv.css("top",$(document).scrollTop()+Math.round(this.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2)+"px");
		break;
		default:
		maskMsgDiv.css("top",$(document).scrollTop()+pos+"px");
		break;
		}
		maskMsgDiv.css("left", Math.round(this.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2)+"px");
		maskMsgDiv.show();
	}
};
$.fn.unmask = function(){
	this.find(".loadmask-msg,.loadmask").remove();
	this.removeClass("masked");
	this.removeClass("masked-relative");
	this.find("select").removeClass("masked-hidden");
};

/*
	表单ajax插件
	基于 jQuery Form Plugin 2.84
	http://www.aqee.net/docs/jquery.form.plugin/jquery.form.plugin.html
*/
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function(e) {
			e.preventDefault(); // <-- important
			$(this).ajaxSubmit({
				target: '#output'
			});
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}
	
	var method, action, url, $form = this;

	if (typeof options == 'function') {
		options = { success: options };
	}

	method = this.attr('method');
	action = this.attr('action');
	url = (typeof action === 'string') ? $.trim(action) : '';
	url = url || window.location.href || '';
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
	}

	options = $.extend(true, {
		url:  url,
		success: $.ajaxSettings.success,
		type: method || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options);

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var n,v,a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		for (n in options.data) {
			if( $.isArray(options.data[n]) ) {
				for (var k in options.data[n]) {
					a.push( { name: n, value: options.data[n][k] } );
				}
			}
			else {
				v = options.data[n];
				v = $.isFunction(v) ? v() : v; // if value is fn, invoke it
				a.push( { name: n, value: v } );
			}
		}
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a);

	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else {
		options.data = q; // data is the query string for 'post'
	}

	var callbacks = [];
	if (options.resetForm) {
		callbacks.push(function() { $form.resetForm(); });
	}
	if (options.clearForm) {
		callbacks.push(function() { $form.clearForm(); });
	}

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			var fn = options.replaceTarget ? 'replaceWith' : 'html';
			$(options.target)[fn](data).each(oldSuccess, arguments);
		});
	}
	else if (options.success) {
		callbacks.push(options.success);
	}

	options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		var context = options.context || options;   // jQuery 1.4+ supports scope context 
		for (var i=0, max=callbacks.length; i < max; i++) {
			callbacks[i].apply(context, [data, status, xhr || $form, $form]);
		}
	};

	// are there files to upload?
	var fileInputs = $('input:file', this).length > 0;
	var mp = 'multipart/form-data';
	var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	// options.iframe allows user to force iframe mode
	// 06-NOV-09: now defaulting to iframe mode if file input is detected
   if (options.iframe !== false && (fileInputs || options.iframe || multipart)) {
	   // hack to fix Safari hang (thanks to Tim Molendijk for this)
	   // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	   if (options.closeKeepAlive) {
		   $.get(options.closeKeepAlive, function() { fileUpload(a); });
		}
	   else {
		   fileUpload(a);
		}
   }
   else {
		// IE7 massage (see issue 57)
		if ($.browser.msie && method == 'get') { 
			var ieMeth = $form[0].getAttribute('method');
			if (typeof ieMeth === 'string')
				options.type = ieMeth;
		}
		$.ajax(options);
   }

	// fire 'notify' event
	this.trigger('form-submit-notify', [this, options]);
	return this;


	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUpload(a) {
		var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
		var useProp = !!$.fn.prop;

		if (a) {
			// ensure that every serialized input is still enabled
			for (i=0; i < a.length; i++) {
				el = $(form[a[i].name]);
				el[ useProp ? 'prop' : 'attr' ]('disabled', false);
			}
		}

		if ($(':input[name=submit],:input[id=submit]', form).length) {
			// if there is an input with a name or id of 'submit' then we won't be
			// able to invoke the submit fn on the form (at least not x-browser)
			alert('Error: Form elements must not have name or id of "submit".');
			return;
		}
		
		s = $.extend(true, {}, $.ajaxSettings, options);
		s.context = s.context || s;
		id = 'jqFormIO' + (new Date().getTime());
		if (s.iframeTarget) {
			$io = $(s.iframeTarget);
			n = $io.attr('name');
			if (n == null)
				$io.attr('name', id);
			else
				id = n;
		}
		else {
			$io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
			$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
		}
		io = $io[0];


		xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function(status) {
				var e = (status === 'timeout' ? 'timeout' : 'aborted');
				log('aborting upload... ' + e);
				this.aborted = 1;
				$io.attr('src', s.iframeSrc); // abort op in progress
				xhr.error = e;
				s.error && s.error.call(s.context, xhr, e, status);
				g && $.event.trigger("ajaxError", [xhr, s, e]);
				s.complete && s.complete.call(s.context, xhr, e);
			}
		};

		g = s.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) {
			$.event.trigger("ajaxStart");
		}
		if (g) {
			$.event.trigger("ajaxSend", [xhr, s]);
		}

		if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
			if (s.global) {
				$.active--;
			}
			return;
		}
		if (xhr.aborted) {
			return;
		}

		// add submitting element to data if we know it
		sub = form.clk;
		if (sub) {
			n = sub.name;
			if (n && !sub.disabled) {
				s.extraData = s.extraData || {};
				s.extraData[n] = sub.value;
				if (sub.type == "image") {
					s.extraData[n+'.x'] = form.clk_x;
					s.extraData[n+'.y'] = form.clk_y;
				}
			}
		}
		
		var CLIENT_TIMEOUT_ABORT = 1;
		var SERVER_ABORT = 2;

		function getDoc(frame) {
			var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
			return doc;
		}
		
		// take a breath so that pending repaints get some cpu time before the upload starts
		function doSubmit() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (!method) {
				form.setAttribute('method', 'POST');
			}
			if (a != s.url) {
				form.setAttribute('action', s.url);
			}

			// ie borks in some cases when setting encoding
			if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (s.timeout) {
				timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
			}
			
			// look for server aborts
			function checkState() {
				try {
					var state = getDoc(io).readyState;
					log('state = ' + state);
					if (state.toLowerCase() == 'uninitialized')
						setTimeout(checkState,50);
				}
				catch(e) {
					log('Server abort: ' , e, ' (', e.name, ')');
					cb(SERVER_ABORT);
					timeoutHandle && clearTimeout(timeoutHandle);
					timeoutHandle = undefined;
				}
			}

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (s.extraData) {
					for (var n in s.extraData) {
						extraInputs.push(
							$('<input type="hidden" name="'+n+'" />').attr('value',s.extraData[n])
								.appendTo(form)[0]);
					}
				}

				if (!s.iframeTarget) {
					// add iframe to doc and submit the form
					$io.appendTo('body');
					io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
				}
				setTimeout(checkState,15);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				if(t) {
					form.setAttribute('target', t);
				} else {
					$form.removeAttr('target');
				}
				$(extraInputs).remove();
			}
		}

		if (s.forceSync) {
			doSubmit();
		}
		else {
			setTimeout(doSubmit, 10); // this lets dom updates render
		}

		var data, doc, domCheckCount = 50, callbackProcessed;

		function cb(e) {
			if (xhr.aborted || callbackProcessed) {
				return;
			}
			try {
				doc = getDoc(io);
			}
			catch(ex) {
				log('cannot access response document: ', ex);
				e = SERVER_ABORT;
			}
			if (e === CLIENT_TIMEOUT_ABORT && xhr) {
				xhr.abort('timeout');
				return;
			}
			else if (e == SERVER_ABORT && xhr) {
				xhr.abort('server abort');
				return;
			}

			if (!doc || doc.location.href == s.iframeSrc) {
				// response not received yet
				if (!timedOut)
					return;
			}
			io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

			var status = 'success', errMsg;
			try {
				if (timedOut) {
					throw 'timeout';
				}

				var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
					if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
						log('requeing onLoad callback, DOM not available');
						setTimeout(cb, 250);
						return;
					}
					// let this fall through because server response could be an empty document
					//log('Could not access iframe DOM after mutiple tries.');
					//throw 'DOMException: not available';
				}

				//log('response detected');
				var docRoot = doc.body ? doc.body : doc.documentElement;
				xhr.responseText = docRoot ? docRoot.innerHTML : null;
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				if (isXml)
					s.dataType = 'xml';
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': s.dataType};
					return headers[header];
				};
				// support for XHR 'status' & 'statusText' emulation :
				if (docRoot) {
					xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
					xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
				}

				var dt = s.dataType || '';
				var scr = /(json|script|text)/.test(dt.toLowerCase());
				if (scr || s.textarea) {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta) {
						xhr.responseText = ta.value;
						// support for XHR 'status' & 'statusText' emulation :
						xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
						xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
					}
					else if (scr) {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						var b = doc.getElementsByTagName('body')[0];
						if (pre) {
							xhr.responseText = pre.textContent ? pre.textContent : pre.innerHTML;
						}
						else if (b) {
							xhr.responseText = b.innerHTML;
						}
					}
				}
				else if (s.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}

				try {
					data = httpData(xhr, s.dataType, s);
				}
				catch (e) {
					status = 'parsererror';
					xhr.error = errMsg = (e || status);
				}
			}
			catch (e) {
				log('error caught: ',e);
				status = 'error';
				xhr.error = errMsg = (e || status);
			}

			if (xhr.aborted) {
				log('upload aborted');
				status = null;
			}

			if (xhr.status) { // we've set xhr.status
				status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (status === 'success') {
				s.success && s.success.call(s.context, data, 'success', xhr);
				g && $.event.trigger("ajaxSuccess", [xhr, s]);
			}
			else if (status) {
				if (errMsg == undefined)
					errMsg = xhr.statusText;
				s.error && s.error.call(s.context, xhr, status, errMsg);
				g && $.event.trigger("ajaxError", [xhr, s, errMsg]);
			}

			g && $.event.trigger("ajaxComplete", [xhr, s]);

			if (g && ! --$.active) {
				$.event.trigger("ajaxStop");
			}

			s.complete && s.complete.call(s.context, xhr, status);

			callbackProcessed = true;
			if (s.timeout)
				clearTimeout(timeoutHandle);

			// clean up
			setTimeout(function() {
				if (!s.iframeTarget)
					$io.remove();
				xhr.responseXML = null;
			}, 100);
		}

		var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else {
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			}
			return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
		};
		var parseJSON = $.parseJSON || function(s) {
			return window['eval']('(' + s + ')');
		};

		var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

			var ct = xhr.getResponseHeader('content-type') || '',
				xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
				data = xml ? xhr.responseXML : xhr.responseText;

			if (xml && data.documentElement.nodeName === 'parsererror') {
				$.error && $.error('parsererror');
			}
			if (s && s.dataFilter) {
				data = s.dataFilter(data, type);
			}
			if (typeof data === 'string') {
				if (type === 'json' || !type && ct.indexOf('json') >= 0) {
					data = parseJSON(data);
				} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
					$.globalEval(data);
				}
			}
			return data;
		};
	}
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	// in jQuery 1.3+ we can fix mistakes with the ready state
	if (this.length === 0) {
		var o = { s: this.selector, c: this.context };
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing ajaxForm');
			$(function() {
				$(o.s,o.c).ajaxForm(options);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
			e.preventDefault();
			$(this).ajaxSubmit(options);
		}
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest(':submit');
			if (t.length == 0) {
				return;
			}
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length === 0) {
		return a;
	}

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) {
		return a;
	}

	var i,j,n,v,el,max,jmax;
	for(i=0, max=els.length; i < max; i++) {
		el = els[i];
		n = el.name;
		if (!n) {
			continue;
		}

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val()});
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(j=0, jmax=v.length; j < jmax; j++) {
				a.push({name: n, value: v[j]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: n, value: v});
		}
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0];
		n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) {
			return;
		}
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++) {
				a.push({name: n, value: v[i]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: this.name, value: v});
		}
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	   array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
			continue;
		}
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (successful === undefined) {
		successful = true;
	}

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1)) {
			return null;
	}

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) {
			return null;
		}
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) { // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				}
				if (one) {
					return v;
				}
				a.push(v);
			}
		}
		return a;
	}
	return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
	return this.each(function() {
		$('input,select,textarea', this).clearFields();
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
	var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (re.test(t) || tag == 'textarea') {
			this.value = '';
		}
		else if (t == 'checkbox' || t == 'radio') {
			this.checked = false;
		}
		else if (tag == 'select') {
			this.selectedIndex = -1;
		}
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
			this.reset();
		}
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b === undefined) {
		b = true;
	}
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select === undefined) {
		select = true;
	}
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio') {
			this.checked = select;
		}
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// helper fn for console logging
function log() {
	var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
	if (window.console && window.console.log) {
		window.console.log(msg);
	}
	else if (window.opera && window.opera.postError) {
		window.opera.postError(msg);
	}
};

})(jQuery);

/*
	圆角插件corner
	基于jquery.corner.js
	修正了按钮圆角的问题，调用了corner插件
	$('.qmenu').corner("5px");
*/
if(!document.createElement('canvas').getContext){(function(){var m=Math;var y=m.round;var z=m.sin;var A=m.cos;var Z=10;var B=Z/2;function getContext(){if(this.context_){return this.context_}return this.context_=new CanvasRenderingContext2D_(this)}var C=Array.prototype.slice;function bind(f,b,c){var a=C.call(arguments,2);return function(){return f.apply(b,a.concat(C.call(arguments)))}}var D={init:function(a){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var b=a||document;b.createElement('canvas');b.attachEvent('onreadystatechange',bind(this.init_,this,b))}},init_:function(a){if(!a.namespaces['g_vml_']){a.namespaces.add('g_vml_','urn:schemas-microsoft-com:vml')}if(!a.styleSheets['ex_canvas_']){var b=a.createStyleSheet();b.owningElement.id='ex_canvas_';b.cssText='canvas{display:inline-block;overflow:hidden;'+'text-align:left;width:300px;height:150px}'+'g_vml_\\:*{behavior:url(#default#VML)}'}},i:function(a){if(!a.getContext){a.getContext=getContext;a.attachEvent('onpropertychange',onPropertyChange);a.attachEvent('onresize',onResize);var b=a.attributes;if(b.width&&b.width.specified){a.style.width=b.width.nodeValue+'px'}else{a.width=a.clientWidth}if(b.height&&b.height.specified){a.style.height=b.height.nodeValue+'px'}else{a.height=a.clientHeight}}return a}};function onPropertyChange(e){var a=e.srcElement;switch(e.propertyName){case'width':a.style.width=a.attributes.width.nodeValue+'px';a.getContext().clearRect();break;case'height':a.style.height=a.attributes.height.nodeValue+'px';a.getContext().clearRect();break}}function onResize(e){var a=e.srcElement;if(a.firstChild){a.firstChild.style.width=a.clientWidth+'px';a.firstChild.style.height=a.clientHeight+'px'}}D.init();var E=[];for(var i=0;i<16;i++){for(var j=0;j<16;j++){E[i*16+j]=i.toString(16)+j.toString(16)}}function createMatrixIdentity(){return[[1,0,0],[0,1,0],[0,0,1]]}function processStyle(a){var b,alpha=1;a=String(a);if(a.substring(0,3)=='rgb'){var c=a.indexOf('(',3);var d=a.indexOf(')',c+1);var e=a.substring(c+1,d).split(',');b='#';for(var i=0;i<3;i++){b+=E[Number(e[i])]}if(e.length==4&&a.substr(3,1)=='a'){alpha=e[3]}}else{b=a}return[b,alpha]}function processLineCap(a){switch(a){case'butt':return'flat';case'round':return'round';case'square':default:return'square'}}function CanvasRenderingContext2D_(a){this.m_=createMatrixIdentity();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.strokeStyle='#000';this.fillStyle='#000';this.lineWidth=1;this.lineJoin='miter';this.lineCap='butt';this.miterLimit=Z*1;this.globalAlpha=1;this.canvas=a;var b=a.ownerDocument.createElement('div');b.style.width=a.clientWidth+'px';b.style.height=a.clientHeight+'px';b.style.overflow='hidden';b.style.position='absolute';a.appendChild(b);this.element_=b;this.arcScaleX_=1;this.arcScaleY_=1}var F=CanvasRenderingContext2D_.prototype;F.clearRect=function(){this.element_.innerHTML='';this.currentPath_=[]};F.beginPath=function(){this.currentPath_=[]};F.moveTo=function(a,b){var p=this.getCoords_(a,b);this.currentPath_.push({type:'moveTo',x:p.x,y:p.y});this.currentX_=p.x;this.currentY_=p.y};F.lineTo=function(a,b){var p=this.getCoords_(a,b);this.currentPath_.push({type:'lineTo',x:p.x,y:p.y});this.currentX_=p.x;this.currentY_=p.y};F.bezierCurveTo=function(a,b,c,d,e,f){var p=this.getCoords_(e,f);var g=this.getCoords_(a,b);var h=this.getCoords_(c,d);this.currentPath_.push({type:'bezierCurveTo',cp1x:g.x,cp1y:g.y,cp2x:h.x,cp2y:h.y,x:p.x,y:p.y});this.currentX_=p.x;this.currentY_=p.y};F.fillRect=function(a,b,c,d){this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+d);this.lineTo(a,b+d);this.closePath();this.fill();this.currentPath_=[]};F.createLinearGradient=function(a,b,c,d){return new CanvasGradient_('gradient')};F.createRadialGradient=function(a,b,c,d,e,f){var g=new CanvasGradient_('gradientradial');g.radius1_=c;g.radius2_=f;g.focus_.x=a;g.focus_.y=b;return g};F.stroke=function(d){var e=[];var f=false;var a=processStyle(d?this.fillStyle:this.strokeStyle);var g=a[0];var h=a[1]*this.globalAlpha;var W=10;var H=10;e.push('<g_vml_:shape',' fillcolor="',g,'"',' filled="',Boolean(d),'"',' style="position:absolute;width:',W,';height:',H,';"',' coordorigin="0 0" coordsize="',Z*W,' ',Z*H,'"',' stroked="',!d,'"',' strokeweight="',this.lineWidth,'"',' strokecolor="',g,'"',' path="');var j=false;var k={x:null,y:null};var l={x:null,y:null};for(var i=0;i<this.currentPath_.length;i++){var p=this.currentPath_[i];var c;switch(p.type){case'moveTo':e.push(' m ');c=p;e.push(y(p.x),',',y(p.y));break;case'lineTo':e.push(' l ');e.push(y(p.x),',',y(p.y));break;case'close':e.push(' x ');p=null;break;case'bezierCurveTo':e.push(' c ');e.push(y(p.cp1x),',',y(p.cp1y),',',y(p.cp2x),',',y(p.cp2y),',',y(p.x),',',y(p.y));break;case'at':case'wa':e.push(' ',p.type,' ');e.push(y(p.x-this.arcScaleX_*p.radius),',',y(p.y-this.arcScaleY_*p.radius),' ',y(p.x+this.arcScaleX_*p.radius),',',y(p.y+this.arcScaleY_*p.radius),' ',y(p.xStart),',',y(p.yStart),' ',y(p.xEnd),',',y(p.yEnd));break}if(p){if(k.x==null||p.x<k.x){k.x=p.x}if(l.x==null||p.x>l.x){l.x=p.x}if(k.y==null||p.y<k.y){k.y=p.y}if(l.y==null||p.y>l.y){l.y=p.y}}}e.push(' ">');if(typeof this.fillStyle=='object'){var m={x:'50%',y:'50%'};var n=l.x-k.x;var o=l.y-k.y;var q=n>o?n:o;m.x=y(this.fillStyle.focus_.x/n*100+50)+'%';m.y=y(this.fillStyle.focus_.y/o*100+50)+'%';var r=[];if(this.fillStyle.type_=='gradientradial'){var s=this.fillStyle.radius1_/q*100;var t=this.fillStyle.radius2_/q*100-s}else{var s=0;var t=100}var u={offset:null,color:null};var v={offset:null,color:null};this.fillStyle.colors_.sort(function(a,b){return a.offset-b.offset});for(var i=0;i<this.fillStyle.colors_.length;i++){var w=this.fillStyle.colors_[i];r.push(w.offset*t+s,'% ',w.color,',');if(w.offset>u.offset||u.offset==null){u.offset=w.offset;u.color=w.color}if(w.offset<v.offset||v.offset==null){v.offset=w.offset;v.color=w.color}}r.pop();e.push('<g_vml_:fill',' color="',v.color,'"',' color2="',u.color,'"',' type="',this.fillStyle.type_,'"',' focusposition="',m.x,', ',m.y,'"',' colors="',r.join(''),'"',' opacity="',h,'" />')}else if(d){e.push('<g_vml_:fill color="',g,'" opacity="',h,'" />')}else{var x=Math.max(this.arcScaleX_,this.arcScaleY_)*this.lineWidth;e.push('<g_vml_:stroke',' opacity="',h,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',processLineCap(this.lineCap),'"',' weight="',x,'px"',' color="',g,'" />')}e.push('</g_vml_:shape>');this.element_.insertAdjacentHTML('beforeEnd',e.join(''))};F.fill=function(){this.stroke(true)};F.closePath=function(){this.currentPath_.push({type:'close'})};F.getCoords_=function(a,b){return{x:Z*(a*this.m_[0][0]+b*this.m_[1][0]+this.m_[2][0])-B,y:Z*(a*this.m_[0][1]+b*this.m_[1][1]+this.m_[2][1])-B}};function CanvasPattern_(){}G_vmlCMjrc=D})()}if(jQuery.browser.msie){document.execCommand("BackgroundImageCache",false,true)}(function($){var N=$.browser.msie;var O=N&&!window.XMLHttpRequest;var P=$.browser.opera;var Q=typeof document.createElement('canvas').getContext=="function";var R=function(i){return parseInt(i,10)||0};var S=function(a,b,c){var x=a,y;if(x.currentStyle){y=x.currentStyle[b]}else if(window.getComputedStyle){if(typeof arguments[2]=="string")b=c;y=document.defaultView.getComputedStyle(x,null).getPropertyValue(b)}return y};var T=function(a,p){return S(a,'border'+p+'Color','border-'+p.toLowerCase()+'-color')};var U=function(a,p){if(a.currentStyle&&!P){w=a.currentStyle['border'+p+'Width'];if(w=='thin')w=2;if(w=='medium'&&!(a.currentStyle['border'+p+'Style']=='none'))w=4;if(w=='thick')w=6}else{p=p.toLowerCase();w=document.defaultView.getComputedStyle(a,null).getPropertyValue('border-'+p+'-width')}return R(w)};var V=function(a,i){return a.tagName.toLowerCase()==i};var W=function(e,a,b,c,d){if(e=='tl')return a;if(e=='tr')return b;if(e=='bl')return c;if(e=='br')return d};var X=function(a,b,c,d,e,f,g){var h,curve_to;if(d.indexOf('rgba')!=-1){var i=/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;var j=i.exec(d);if(j){var k=[R(j[1]),R(j[2]),R(j[3])];d='rgb('+k[0]+', '+k[1]+', '+k[2]+')'}}var l=a.getContext('2d');if(b==1||g=='notch'){if(e>0&&b>1){l.fillStyle=f;l.fillRect(0,0,b,b);l.fillStyle=d;h=W(c,[0-e,0-e],[e,0-e],[0-e,e],[e,e]);l.fillRect(h[0],h[1],b,b)}else{l.fillStyle=d;l.fillRect(0,0,b,b)}return a}else if(g=='bevel'){h=W(c,[0,0,0,b,b,0,0,0],[0,0,b,b,b,0,0,0],[0,0,b,b,0,b,0,0],[b,b,b,0,0,b,b,b]);l.fillStyle=d;l.beginPath();l.moveTo(h[0],h[1]);l.lineTo(h[2],h[3]);l.lineTo(h[4],h[5]);l.lineTo(h[6],h[7]);l.fill();if(e>0&&e<b){l.strokeStyle=f;l.lineWidth=e;l.beginPath();h=W(c,[0,b,b,0],[0,0,b,b],[b,b,0,0],[0,b,b,0]);l.moveTo(h[0],h[1]);l.lineTo(h[2],h[3]);l.stroke()}return a}h=W(c,[0,0,b,0,b,0,0,b,0,0],[b,0,b,b,b,0,0,0,0,0],[0,b,b,b,0,b,0,0,0,b],[b,b,b,0,b,0,0,b,b,b]);l.fillStyle=d;l.beginPath();l.moveTo(h[0],h[1]);l.lineTo(h[2],h[3]);if(c=='br')l.bezierCurveTo(h[4],h[5],b,b,h[6],h[7]);else l.bezierCurveTo(h[4],h[5],0,0,h[6],h[7]);l.lineTo(h[8],h[9]);l.fill();if(e>0&&e<b){var m=e/2;var n=b-m;h=W(c,[n,m,n,m,m,n],[n,n,n,m,m,m],[n,n,m,n,m,m,m,n],[n,m,n,m,m,n,n,n]);curve_to=W(c,[0,0],[0,0],[0,0],[b,b]);l.strokeStyle=f;l.lineWidth=e;l.beginPath();l.moveTo(h[0],h[1]);l.bezierCurveTo(h[2],h[3],curve_to[0],curve_to[1],h[4],h[5]);l.stroke()}return a};var Y=function(p,a){var b=document.createElement('canvas');b.setAttribute("height",a);b.setAttribute("width",a);b.style.display="block";b.style.position="absolute";b.className="jrCorner";Z(p,b);if(!Q&&N){if(typeof G_vmlCanvasManager=="object"){b=G_vmlCanvasManager.initElement(b)}else if(typeof G_vmlCMjrc=="object"){b=G_vmlCMjrc.i(b)}else{throw Error('Could not find excanvas');}}return b};var Z=function(p,a){if(p.is("table")){p.children("tbody").children("tr:first").children("td:first").append(a);p.css('display','block')}else if(p.is("td")){if(p.children(".JrcTdContainer").length===0){p.html('<div class="JrcTdContainer" style="padding:0px;position:relative;margin:-1px;zoom:1;">'+p.html()+'</div>');p.css('zoom','1');if(O){p.children(".JrcTdContainer").get(0).style.setExpression("height","this.parentNode.offsetHeight")}}p.children(".JrcTdContainer").append(a)}else{p.append(a)}};if(N){var ba=document.createStyleSheet();ba.media='print';ba.cssText='.jrcIECanvasDiv { display:none !important; }'}var bb=function(D){if(this.length==0||!(Q||N)){return this}if(D=="destroy"){return this.each(function(){var p,elm=$(this);if(elm.is(".jrcRounded")){if(typeof elm.data("ie6tmr.jrc")=='number')window.clearInterval(elm.data("ie6tmr.jrc"));if(elm.is("table"))p=elm.children("tbody").children("tr:first").children("td:first");else if(elm.is("td"))p=elm.children(".JrcTdContainer");else p=elm;p.children(".jrCorner").remove();elm.unbind('mouseleave.jrc').unbind('mouseenter.jrc').removeClass('jrcRounded').removeData('ie6tmr.jrc');if(elm.is("td"))elm.html(elm.children(".JrcTdContainer").html())}})}var o=(D||"").toLowerCase();var E=R((o.match(/(\d+)px/)||[])[1])||"auto";var F=((o.match(/(#[0-9a-f]+)/)||[])[1])||"auto";var G=/round|bevel|notch/;var H=((o.match(G)||['round'])[0]);var I=/hover/.test(o);var J=/oversized/.test(o);var K=o.match("hiddenparent");if(N){var G=/ie6nofix|ie6fixinit|ie6fixexpr|ie6fixonload|ie6fixwidthint|ie6fixheightint|ie6fixbothint/;var L=((o.match(G)||['ie6fixinit'])[0])}var M={tl:/top|left|tl/.test(o),tr:/top|right|tr/.test(o),bl:/bottom|left|bl/.test(o),br:/bottom|right|br/.test(o)};if(!M.tl&&!M.tr&&!M.bl&&!M.br)M={tl:1,tr:1,bl:1,br:1};this.each(function(){var d=$(this),rbg=null,bg,s,b,pr;var a=this;var e=S(this,'display');var f=S(this,'position');var g=S(this,'lineHeight','line-height');if(F=="auto"){s=d.siblings(".jrcRounded:eq(0)");if(s.length>0){b=s.data("rbg.jrc");if(typeof b=="string"){rbg=b}}}if(K||rbg===null){var h=this.parentNode,hidden_parents=new Array(),a=0;while((typeof h=='object')&&!V(h,'html')){if(K&&S(h,'display')=='none'){hidden_parents.push({originalvisibility:S(h,'visibility'),elm:h});h.style.display='block';h.style.visibility='hidden'}var j=S(h,'backgroundColor','background-color');if(rbg===null&&j!="transparent"&&j!="rgba(0, 0, 0, 0)"){rbg=j}h=h.parentNode}if(rbg===null)rbg="#ffffff"}if(F=="auto"){bg=rbg;d.data("rbg.jrc",rbg)}else{bg=F}if(e=='none'){var k=S(this,'visibility');this.style.display='block';this.style.visibility='hidden';var l=true}else{var m=false}var n=d.height();var p=d.width();if(I){var q=o.replace(/hover|ie6nofix|ie6fixinit|ie6fixexpr|ie6fixonload|ie6fixwidthint|ie6fixheightint|ie6fixbothint/g,"");if(L!='ie6nofix')q="ie6fixinit "+q;d.bind("mouseenter.jrc",function(){d.addClass(d.attr("hoverclass"))});d.bind("mouseleave.jrc",function(){d.removeClass(d.attr("hoverclass"))})}if(O&&L!='ie6nofix'){this.style.zoom=1;if(L!='ie6fixexpr'){if(d.width()%2!=0)d.width(d.width()+1);if(d.height()%2!=0)d.height(d.height()+1)}$(window).load(function(){if(L=='ie6fixonload'){if(d.css('height')=='auto')d.height(d.css('height'));if(d.width()%2!=0)d.width(d.width()+1);if(d.height()%2!=0)d.height(d.height()+1)}else if(L=='ie6fixwidthint'||L=='ie6fixheightint'||L=='ie6fixbothint'){var c,ie6FixFunction;if(L=='ie6fixheightint'){ie6FixFunction=function(){d.height('auto');var a=d.height();if(a%2!=0)a=a+1;d.css({height:a})}}else if(L=='ie6fixwidthint'){ie6FixFunction=function(){d.width('auto');var a=d.width();if(a%2!=0)a=a+1;d.css({width:a});d.data('lastWidth.jrc',d.get(0).offsetWidth)}}else if(L=='ie6fixbothint'){ie6FixFunction=function(){d.width('auto');d.height('auto');var a=d.width();var b=d.height();if(b%2!=0)b=b+1;if(a%2!=0)a=a+1;d.css({width:a,height:b})}}c=window.setInterval(ie6FixFunction,100);d.data("ie6tmr.jrc",c)}})}var r=n<p?this.offsetHeight:this.offsetWidth;if(E=="auto"){E=r/2;if(E>10)E=r/4}if(E>r/2&&!J){E=r/2}E=Math.floor(E);var t=U(this,'Top');var u=U(this,'Right');var v=U(this,'Bottom');var w=U(this,'Left');if(f=='static'&&!V(this,'td')){this.style.position='relative'}else if(f=='fixed'&&N&&!(document.compatMode=='CSS1Compat'&&!O)){this.style.position='absolute'}if(t+u+v+w>0){this.style.overflow='visible'}if(l)d.css({display:'none',visibility:k});if(typeof hidden_parents!="undefined"){for(var i=0;i<hidden_parents.length;i++){hidden_parents[i].elm.style.display='none';hidden_parents[i].elm.style.visibility=hidden_parents[i].originalvisibility}}var x=0-t,p_right=0-u,p_bottom=0-v,p_left=0-w;var y=(d.find("canvas").length>0);if(y){if(V(this,'table'))pr=d.children("tbody").children("tr:first").children("td:first");else if(V(this,'td'))pr=d.children(".JrcTdContainer");else pr=d}if(M.tl){bordersWidth=t<w?t:w;if(y)pr.children("canvas.jrcTL").remove();var z=X(Y(d,E),E,'tl',bg,bordersWidth,T(this,'Top'),H);$(z).css({left:p_left,top:x}).addClass('jrcTL')}if(M.tr){bordersWidth=t<u?t:u;if(y)pr.children("canvas.jrcTR").remove();var A=X(Y(d,E),E,'tr',bg,bordersWidth,T(this,'Top'),H);$(A).css({right:p_right,top:x}).addClass('jrcTR')}if(M.bl){bordersWidth=v<w?v:w;if(y)pr.children("canvas.jrcBL").remove();var B=X(Y(d,E),E,'bl',bg,bordersWidth,T(this,'Bottom'),H);$(B).css({left:p_left,bottom:p_bottom}).addClass('jrcBL')}if(M.br){bordersWidth=v<u?v:u;if(y)pr.children("canvas.jrcBR").remove();var C=X(Y(d,E),E,'br',bg,bordersWidth,T(this,'Bottom'),H);$(C).css({right:p_right,bottom:p_bottom}).addClass('jrcBR')}if(N)d.children('canvas.jrCorner').children('div').addClass('jrcIECanvasDiv');if(O&&L=='ie6fixexpr'){if(M.bl){B.style.setExpression("bottom","this.parentNode.offsetHeight % 2 == 0 || this.parentNode.offsetWidth % 2 == 0 ? 0-(parseInt(this.parentNode.currentStyle['borderBottomWidth'])) : 0-(parseInt(this.parentNode.currentStyle['borderBottomWidth'])+1)")}if(M.br){C.style.setExpression("right","this.parentNode.offsetWidth  % 2 == 0 || this.parentNode.offsetWidth % 2 == 0 ? 0-(parseInt(this.parentNode.currentStyle['borderRightWidth']))  : 0-(parseInt(this.parentNode.currentStyle['borderRightWidth'])+1)");C.style.setExpression("bottom","this.parentNode.offsetHeight % 2 == 0 || this.parentNode.offsetWidth % 2 == 0 ? 0-(parseInt(this.parentNode.currentStyle['borderBottomWidth'])) : 0-(parseInt(this.parentNode.currentStyle['borderBottomWidth'])+1)")}if(M.tr){A.style.setExpression("right","this.parentNode.offsetWidth   % 2 == 0 || this.parentNode.offsetWidth % 2 == 0 ? 0-(parseInt(this.parentNode.currentStyle['borderRightWidth']))  : 0-(parseInt(this.parentNode.currentStyle['borderRightWidth'])+1)")}}d.addClass('jrcRounded')});if(typeof arguments[1]=="function")arguments[1](this);return this};$.fn.corner=bb})(jQuery);

/*
	腾讯UED提示信息
	ZENG.msgbox.show("设置成功！", 4, 2000);
	ZENG.msgbox.show("服务器繁忙，请稍后再试。", 1, 2000);
	ZENG.msgbox.show("数据拉取失败", 5, 2000);
	ZENG.msgbox.show("正在加载中，请稍后...", 6,8000);
*/
window.ZENG=window.ZENG||{};ZENG.dom={getById:function(a){return document.getElementById(a)},get:function(a){return(typeof(a)=="string")?document.getElementById(a):a},createElementIn:function(d,f,e,c){var a=(f=ZENG.dom.get(f)||document.body).ownerDocument.createElement(d||"div"),b;if(typeof(c)=="object"){for(b in c){if(b=="class"){a.className=c[b]}else{if(b=="style"){a.style.cssText=c[b]}else{a[b]=c[b]}}}}e?f.insertBefore(a,f.firstChild):f.appendChild(a);return a},getStyle:function(b,f){b=ZENG.dom.get(b);if(!b||b.nodeType==9){return null}var a=document.defaultView&&document.defaultView.getComputedStyle,c=!a?null:document.defaultView.getComputedStyle(b,""),d="";switch(f){case"float":f=a?"cssFloat":"styleFloat";break;case"opacity":if(!a){var h=100;try{h=b.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(g){try{h=b.filters("alpha").opacity}catch(g){}}return h/100}else{return parseFloat((c||b.style)[f])}break;case"backgroundPositionX":if(a){f="backgroundPosition";return((c||b.style)[f]).split(" ")[0]}break;case"backgroundPositionY":if(a){f="backgroundPosition";return((c||b.style)[f]).split(" ")[1]}break}if(a){return(c||b.style)[f]}else{return(b.currentStyle[f]||b.style[f])}},setStyle:function(c,g,h){if(!(c=ZENG.dom.get(c))||c.nodeType!=1){return false}var e,b=true,d=(e=document.defaultView)&&e.getComputedStyle,f=/z-?index|font-?weight|opacity|zoom|line-?height/i;if(typeof(g)=="string"){e=g;g={};g[e]=h}for(var a in g){h=g[a];if(a=="float"){a=d?"cssFloat":"styleFloat"}else{if(a=="opacity"){if(!d){a="filter";h=h>=1?"":("alpha(opacity="+Math.round(h*100)+")")}}else{if(a=="backgroundPositionX"||a=="backgroundPositionY"){e=a.slice(-1)=="X"?"Y":"X";if(d){var i=ZENG.dom.getStyle(c,"backgroundPosition"+e);a="backgroundPosition";typeof(h)=="number"&&(h=h+"px");h=e=="Y"?(h+" "+(i||"top")):((i||"left")+" "+h)}}}}if(typeof c.style[a]!="undefined"){c.style[a]=h+(typeof h==="number"&&!f.test(a)?"px":"");b=b&&true}else{b=b&&false}}return b},getScrollTop:function(a){var b=a||document;return Math.max(b.documentElement.scrollTop,b.body.scrollTop)},getClientHeight:function(a){var b=a||document;return b.compatMode=="CSS1Compat"?b.documentElement.clientHeight:b.body.clientHeight}};ZENG.string={RegExps:{trim:/^\s+|\s+$/g,ltrim:/^\s+/,rtrim:/\s+$/,nl2br:/\n/g,s2nb:/[\x20]{2}/g,URIencode:/[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g,escHTML:{re_amp:/&/g,re_lt:/</g,re_gt:/>/g,re_apos:/\x27/g,re_quot:/\x22/g},escString:{bsls:/\\/g,sls:/\//g,nl:/\n/g,rt:/\r/g,tab:/\t/g},restXHTML:{re_amp:/&amp;/g,re_lt:/&lt;/g,re_gt:/&gt;/g,re_apos:/&(?:apos|#0?39);/g,re_quot:/&quot;/g},write:/\{(\d{1,2})(?:\:([xodQqb]))?\}/g,isURL:/^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i,cut:/[\x00-\xFF]/,getRealLen:{r0:/[^\x00-\xFF]/g,r1:/[\x00-\xFF]/g},format:/\{([\d\w\.]+)\}/g},commonReplace:function(a,c,b){return a.replace(c,b)},format:function(c){var b=Array.prototype.slice.call(arguments),a;c=String(b.shift());if(b.length==1&&typeof(b[0])=="object"){b=b[0]}ZENG.string.RegExps.format.lastIndex=0;return c.replace(ZENG.string.RegExps.format,function(d,e){a=ZENG.object.route(b,e);return a===undefined?d:a})}};ZENG.object={routeRE:/([\d\w_]+)/g,route:function(d,c){d=d||{};c=String(c);var b=ZENG.object.routeRE,a;b.lastIndex=0;while((a=b.exec(c))!==null){d=d[a[0]];if(d===undefined||d===null){break}}return d}};var ua=ZENG.userAgent={},agent=navigator.userAgent;ua.ie=9-((agent.indexOf("Trident/5.0")>-1)?0:1)-(window.XDomainRequest?0:1)-(window.XMLHttpRequest?0:1);if(typeof(ZENG.msgbox)=="undefined"){ZENG.msgbox={}}ZENG.msgbox._timer=null;ZENG.msgbox.loadingAnimationPath=ZENG.msgbox.loadingAnimationPath||("gb_tip_loading.gif");ZENG.msgbox.show=function(c,g,h,a){if(typeof(a)=="number"){a={topPosition:a}}a=a||{};var j=ZENG.msgbox,i='<span class="zeng_msgbox_layer" style="display:none;z-index:10000;" id="mode_tips_v2"><span class="gtl_ico_{type}"></span>{loadIcon}{msgHtml}<span class="gtl_end"></span></span>',d='<span class="gtl_ico_loading"></span>',e=[0,0,0,0,"succ","fail","clear"],b,f;j._loadCss&&j._loadCss(a.cssPath);b=ZENG.dom.get("q_Msgbox")||ZENG.dom.createElementIn("div",document.body,false,{className:"zeng_msgbox_layer_wrap"});b.id="q_Msgbox";b.style.display="";b.innerHTML=ZENG.string.format(i,{type:e[g]||"hits",msgHtml:c||"",loadIcon:g==6?d:""});j._setPosition(b,h,a.topPosition)};ZENG.msgbox._setPosition=function(a,f,d){f=f||5000;var g=ZENG.msgbox,b=ZENG.dom.getScrollTop(),e=ZENG.dom.getClientHeight(),c=Math.floor(e/2)-40;ZENG.dom.setStyle(a,"top",((document.compatMode=="BackCompat"||ZENG.userAgent.ie<7)?b:0)+((typeof(d)=="number")?d:c)+"px");clearTimeout(g._timer);a.firstChild.style.display="";f&&(g._timer=setTimeout(g.hide,f))};ZENG.msgbox.hide=function(a){var b=ZENG.msgbox;if(a){clearTimeout(b._timer);b._timer=setTimeout(b._hide,a)}else{b._hide()}};ZENG.msgbox._hide=function(){var a=ZENG.dom.get("q_Msgbox"),b=ZENG.msgbox;clearTimeout(b._timer);if(a){var c=a.firstChild;ZENG.dom.setStyle(a,"display","none")}};

/*
	bigframe
	$('#top').bigframe();
*/
$.fn.bgiframe = ($.browser.msie && /msie 6\.0/i.test(navigator.userAgent) ? function(s) {
    s = $.extend({
        top     : 'auto', // auto == .currentStyle.borderTopWidth
        left    : 'auto', // auto == .currentStyle.borderLeftWidth
        width   : 'auto', // auto == offsetWidth
        height  : 'auto', // auto == offsetHeight
        opacity : true,
        src     : 'javascript:false;'
    }, s);
    var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                   'style="display:block;position:absolute;z-index:-1;'+
                       (s.opacity !== false?'filter:Alpha(Opacity=\'0\');':'')+
                       'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+
                       'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+
                       'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+
                       'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+
                '"/>';
    return this.each(function() {
        if ( $(this).children('iframe.bgiframe').length === 0 )
            this.insertBefore( document.createElement(html), this.firstChild );
    });
} : function() { return this; });
$.fn.bgIframe = $.fn.bgiframe;
function prop(n) {
    return n && n.constructor === Number ? n + 'px' : n;
}

/*
	隔行换色 HRghhs
	@DOM
		<table id="table">
			<tr><td>1</td></tr>
			<tr><td>2</td></tr>
			<tr><td>3</td></tr>
			<tr><td>4</td></tr>
		</table>
	@CSS
		.HRghhs-evenRow{background:#F1FAFA}
		.HRghhs-oddRow{background:#0FF}
		.HRghhs-overRow{background:#FFFFE1}
		.HRghhs-checkRow{background:#FFFFCA}
	@Usage
		$("#table").HRghhs(options);
	@options
		evenRowClass		:"HRghhs-evenRow",		//奇数行样式名称
		oddRowClass			:"HRghhs-oddRow",		//偶数行样式名称
		overRowClass		:"HRghhs-overRow",		//经过行样式名称
		checkRowClass		:"HRghhs-checkRow",		//选中行样式名称
		useOver				:true,					//是否开启经过事件
		useClick			:true,					//是否开启单击事件
		useMoreChoose		:false,					//是否开启多选事件
		useClick2Checkbox	:false					//是否绑定点击选中多选按钮事件
*/
$.fn.HRghhs = function(options){
	var options = $.extend({}, {
		evenRowClass		:"HRghhs-evenRow",
		oddRowClass			:"HRghhs-oddRow",
		overRowClass		:"HRghhs-overRow",
		checkRowClass		:"HRghhs-checkRow",
		useOver				:true,
		useClick			:true,
		useMoreChoose		:false,
		useClick2Checkbox	:false
	}, options);
	this.each(function(){
		var thisTable=$(this);
		$(thisTable).find("tr").each(function(){
			if($(this).attr("rel") != "readonly"){
				//奇偶行样式
				$(thisTable).find("tr:odd").addClass(options.oddRowClass).end().find("tr:even").addClass(options.evenRowClass);
				//是否开启鼠标经过事件
				if(options.useOver){
					//经过行样式
					$(thisTable).find("tr").bind("mouseover",function(){
						$(this).addClass(options.overRowClass);
					}).bind("mouseout",function(){
						$(this).removeClass(options.overRowClass);
					});
				}
				//是否开启单击事件
				if(options.useClick){
					//是否开启多选事件
					if(options.useMoreChoose){
						//添加选中行样式
						$(thisTable).find("tr").toggle(function(){
							if(options.useClick2Checkbox){
								//触发自定义的updateState事件，此事件为自定义checkbox里的
								$(thisTable).find('input:checkbox').trigger('updateState');
								$(this).find("input:checkbox").attr("checked",true);
							}
							$(this).addClass(options.checkRowClass);
						},function(){
							if(options.useClick2Checkbox){
								$(thisTable).find('input:checkbox').trigger('updateState');
								$(this).find("input:checkbox").attr("checked",false);
							}
							$(this).removeClass(options.checkRowClass);
						});
					}else{
						$(thisTable).find("tr").bind("click",function(){
							if(options.useClick2Checkbox){
								$(thisTable).find('input:checkbox').trigger('updateState');
								$(thisTable).find("input:checkbox").attr("checked",false);
								$(this).find("input:checkbox").attr("checked",true);
							}
							$(thisTable).find("tr").removeClass(options.checkRowClass);
							$(this).addClass(options.checkRowClass);
						});
					}
				}
			}
		});
	});
};

/*
	无缝滚动 HRwfgd
	@DOM
		<div id="marquee">
			<ul>
				<li></li>
				<li></li>
			</ul>
		</div>
	@CSS
		#marquee{width:200px;height:50px;overflow:hidden}
	@Usage
		$('#marquee').HRwfgd(options);
	@options
		isEqual			:true,		//所有滚动的元素长宽是否相等,true,false
		loop			:0,			//循环滚动次数，0时无限
		direction		:'left',	//滚动方向，'left','right','up','down'
		scrollAmount	:1,			//步长
		scrollDelay		:20			//时长
*/
$.fn.HRwfgd = function(options) {
	var opts = $.extend({},{
		isEqual			:true,
		loop			:0,
		direction		:'left',
		scrollAmount	:1,
		scrollDelay		:20
	}, options);
	this.each(function() {
		var $marquee = $(this);
		var _scrollObj = $marquee.get(0);
		var scrollW = $marquee.width();
		var scrollH = $marquee.height();
		var $element = $marquee.children();
		var $kids = $element.children();
		var scrollSize = 0;
		var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1: 0;
		$element.css(_type ? 'width': 'height', 10000);
		if (opts.isEqual) {
			scrollSize = $kids[_type ? 'outerWidth': 'outerHeight']() * $kids.length
		} else {
			//查询所有父容器，如果是隐藏的，将其显示
			$kids.parents().each(function(){
				if($(this).is(":hidden")){
					$(this).addClass("hr_wfgd").show();
				}
			})
			$kids.each(function() {
				scrollSize += $(this)[_type ? 'outerWidth': 'outerHeight']()
			})
			//计算完毕后，还原父容器到初始状态
			$(document).find(".hr_wfgd").each(function(){
				if($(this).is(":visible")){
					$(this).hide().removeClass("hr_wfgd");
				}
			});
		}
		if (scrollSize < (_type ? scrollW: scrollH)) return;
		$element.append($kids.clone()).css(_type ? 'width': 'height', scrollSize * 2);
		var numMoved = 0;
		function scrollFunc() {
			var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft': 'scrollTop';
			if (opts.loop > 0) {
				numMoved += opts.scrollAmount;
				if (numMoved > scrollSize * opts.loop) {
					_scrollObj[_dir] = 0;
					return clearInterval(moveId)
				}
			}
			if (opts.direction == 'left' || opts.direction == 'up') {
				_scrollObj[_dir] += opts.scrollAmount;
				if (_scrollObj[_dir] >= scrollSize) {
					_scrollObj[_dir] = 0
				}
			} else {
				_scrollObj[_dir] -= opts.scrollAmount;
				if (_scrollObj[_dir] <= 0) {
					_scrollObj[_dir] = scrollSize
				}
			}
		}
		var moveId = setInterval(scrollFunc, opts.scrollDelay);
		$marquee.hover(function() {
			clearInterval(moveId)
		},
		function() {
			clearInterval(moveId);
			moveId = setInterval(scrollFunc, opts.scrollDelay)
		})
	})
};

/*
	返回顶部 HRfhdb
	@DOM
		<a href="javascript:void(0)" id="fhdb1">返回顶部</a>
	@Usage
		$('#top').HRfhdb(options, fun);
	@options
		animation	:false,		//是否开启动画效果
		speed		:'normal'	//滚动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
	@fun
		在动画完成后执行的函数
*/
$.fn.HRfhdb = function(options, fun){
	var options = $.extend({}, {
		animation	:false,
		speed		:'slow'
	}, options, fun);
	this.each(function(){
		$(this).click(function(){
			if(options.animation == false){
				$.fx.off = true;
			}
			if(fun != null){
				$("html").animate({scrollTop:"0"}, options.speed);
				$("body").animate({scrollTop:"0"}, options.speed, fun);
			}else{
				$("html,body").animate({scrollTop:"0"}, options.speed);
			}
			$.fx.off = false;
		});
	});
};

/*
	外链弹窗 HRwltc
	@Usage
		$('body').HRwltc(options);
	@options
		classname:''	//给外部连接加上统一样式名
*/
$.fn.HRwltc = function(options){
	var options = $.extend({}, {
		classname:''
	}, options);
	this.each(function(){
		if(options.classname != ''){
			$(this).find("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").addClass(options.classname).attr("target","_blank");
		}else{
			$(this).find("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])").attr("target","_blank");
		}
	});
};
	
/*
	手风琴 HRsfq
	@DOM
		<ul id="HRsfq">
			<li>
				<a>汽车</a>
				<div>...</div>
			</li>
			<li>
				<a>火车</a>
				<div>...</div>
			</li>
			<li>
				<a>飞机</a>
				<div>...</div>
			</li>
		</ul>
	@CSS
		#HRsfq li a{display:block;cursor:pointer;background:#0CF url('open.gif') no-repeat center right}
		#HRsfq li a:hover{background:#7FD2FF url('open.gif') no-repeat center right}
		#HRsfq li.HRsfq-active a{background:#7FD2FF url('close.gif') no-repeat center right;color:#fff}
		#HRsfq li div{width:900px}
	@Usage
		$('#HRsfq').HRsfq(options);
	@Options
		activeClass		:'HRsfq-active',	//手风琴标题选中样式名
		speed			:'normal',			//滚动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
		openRow			:0					//展开第几条，默认为0不展开
*/
$.fn.HRsfq = function(options){
	var options = $.extend({}, {
		activeClass		:'HRsfq-active',
		speed			:'normal',
		openRow			:0
	}, options);
	this.each(function() {
		var $ul = $(this);
		$ul.children('li').each(function(){
			$(this).children('div').hide();
			$(this).children('a').click(function(e){
				$(this).parent('li').toggleClass(options.activeClass).siblings().removeClass(options.activeClass).children('div').slideUp(options.speed);
				$(this).siblings().slideToggle(options.speed);
			});
		});
		if(options.openRow >= 0){
			$ul.children('li:nth-child('+options.openRow+')').addClass(options.activeClass).children('div').show();
		}
	});
};

/*
	Tabs切换 HRtabs
	@DOM
		<div class="HRtabs">
			<ul>
				<li><a href="#tabs1">tabs1</a></li>
				<li><a href="#tabs2">tabs2</a></li>
				<li><a href="#tabs3">tabs3</a></li>
			</ul>
			<div id="tabs1">111</div>
			<div id="tabs2">222</div>
			<div id="tabs3">333</div>
		</div>
	@CSS
		#HRsfq li a.HRtabs-active{background:#7FD2FF;color:#fff}
	@Usage
		$('.HRtabs').HRtabs(options);
	@Options
		activeClass		:'HRsfq-active',	//tabs标题选中样式名
		showDiv			:'',				//显示哪个div，默认为空，显示第一个
		overOrClick		:'click',			//触发事件，可以有click、mouseover、dbclick
		animation		:false,				//是否开启动画效果
		speed			:'normal'			//渐隐渐现速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
*/
$.fn.HRtabs = function(options){
	var options = $.extend({}, {
		activeClass		:'HRtabs-active',
		showDiv			:'',
		overOrClick		:'click',
		animation		:false,
		speed			:'normal'
	}, options);
	var box = $(this);
	$(this).each(function(){
		$(box).find("div").hide();
		if(options.showDiv == ""){
			$(box).find('ul li:eq(0) a').addClass(options.activeClass);
			$(box).find('div:eq(0)').show();
		}else{
			$(box).find('ul li').each(function(){
				if($(this).find("a").attr("href") == "#"+options.showDiv){
					$(this).find("a").addClass(options.activeClass);
				}
			});
			$(box).find("#"+options.showDiv).show();
		}
		$(box).find("a").bind(options.overOrClick,function(){
			if(!$(this).hasClass(options.activeClass)){
				$(box).find("ul li a").removeClass(options.activeClass);
				$(this).addClass(options.activeClass);
				if(options.animation){
					$(box).find("div").fadeOut(options.speed);
					$(box).find($(this).attr("href")).fadeIn(options.speed);
				}else{
					$(box).find("div").hide();
					$(box).find($(this).attr("href")).show();
				}
			}
			return false;
		});
	});
};

/*
	锚点连接 HRmdlj
	@DOM
		<a href="#mdlj">锚点连接</a>
		...
		...
		<div id="mdlj"></div>
	@Usage
		$('a').HRmdlj(options);
	@options
		speed:'normal'			//滑动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
*/
$.fn.HRmdlj = function(options){
	var options = $.extend({}, {
		speed:'normal'
	}, options);
	this.each(function(){
		$(this).click(function() {
			var target = $(this).attr('href');
			var destination = $(target).offset().top;
			$('html,body').animate({scrollTop : destination}, options.speed);
			return false;
		});
	});
};
	
/*
	多选按钮 HRcheckbox
	@DOM
		<link rel="stylesheet" rev="stylesheet" href="jquery.HooRay/jquery.HooRay.css" />
		<div>
			<input type="checkbox" name="city" value="1" id="city_1" /><label for="city_1">北京</label>
			<input type="checkbox" name="city" value="2" id="city_2" /><label for="city_2">上海</label>
			<input type="checkbox" name="city" value="3" id="city_3" /><label for="city_3">杭州</label>
		</div>
	@Usage
		$('div').HRcheckbox(options);
	@options
		skin:1			//皮肤选择
*/
$.fn.HRcheckbox = function(options){
	var options = $.extend({}, {
		skin:1
	}, options);
	this.find('input:checkbox').each(function(){
		var input = $(this);
		var label = $('label[for="'+input.attr('id')+'"]');
		var inputType = 'checkbox';
		$('<div class="hr-'+ inputType + options.skin + '"></div>').insertBefore(input).append(input, label);
		var allInputs = $('input[name="'+input.attr('name')+'"]');
		label.hover(function(){
			if(input.is(':checked')){
				$(this).addClass('checkedHover');
			}else{
				$(this).addClass('hover');
			}
		},function(){
			$(this).removeClass('hover checkedHover');
		});
		input.bind('updateState',function(){
			if(input.is(':checked')){
				label.addClass('checked');
			}else{
				label.removeClass('checked checkedHover');
			}
		}).trigger('updateState').click(function(){
			$(this).trigger('updateState');
		});
	});
};

/*
	单选按钮 HRradio
	@DOM
		<link rel="stylesheet" rev="stylesheet" href="jquery.HooRay/jquery.HooRay.css" />
		<div>
			<input type="radio" name="sex" id="sex_1" value="1" /><label for="sex_1">男</label>
			<input type="radio" name="sex" id="sex_2" value="2" /><label for="sex_2">女</label>
		</div>
	@Usage
		$('div').HRradio(options);
	@options
		skin:1			//皮肤选择
*/
$.fn.HRradio = function(options){
	var options = $.extend({}, {
		skin:1
	}, options);
	this.find('input:radio').each(function(){	
		if($(this).is('[type=radio]')){
			var input = $(this);
			var label = $('label[for="'+input.attr('id')+'"]');
			var inputType = 'radio';
			$('<div class="hr-'+ inputType + options.skin + '"></div>').insertBefore(input).append(input, label);
			var allInputs = $('input[name="'+input.attr('name')+'"]');
			label.hover(function(){ 
				$(this).addClass('hover'); 
			},function(){
				$(this).removeClass('hover checkedHover');
			});
			input.bind('updateState', function(){
				if(input.is(':checked')){
					allInputs.each(function(){
						$('label[for="'+$(this).attr('id')+'"]').removeClass('checked');
					});		
					label.addClass('checked');
				}else{
					label.removeClass('checked checkedHover');
				}
			}).trigger('updateState').click(function(){ 
				$(this).trigger('updateState');
			});
		}
	});
};

/*
	控制多选按钮选择数量 HRchecknum
	@CSS
		label.disabled{color:#CCC}
	@DOM
		<div>
			<input type="checkbox" name="city" value="1" id="city_1" /><label for="city_1">北京</label>
			<input type="checkbox" name="city" value="2" id="city_2" /><label for="city_2">上海</label>
			<input type="checkbox" name="city" value="3" id="city_3" /><label for="city_3">杭州</label>
		</div>
	@Usage
		$('div').HRchecknum(options);
	@options
		maxnum:1		//最多能选择几个
*/
$.fn.HRchecknum = function(options){
	var options = $.extend({}, {
		maxnum:1
	}, options);
	var box = this;
	var cb = this.find('input:checkbox');
	cb.each(function(){
		$(this).bind('click', function(){
			if($(this).is(':checked')){
				if(cb.filter(':checked').length >= options.maxnum){
					cb.not(':checked').each(function(){
						$(this).attr('disabled','true');
						var thisid = $(this).attr('id');
						$('label[for="'+thisid+'"]').addClass('disabled');
					});
				}
			}else{
				cb.removeAttr('disabled');
				box.find('label.disabled').removeClass('disabled');
			}
		});
	});
};

/*
	下拉列表 HRxllb
	@DOM
		<div class="HRxllb">
			选择你的语言：
			<select name="language1" id="language1">
				<option value="0">青菜</option>
				<option value="1" selected="selected">菠菜</option>
				<option value="2">花菜</option>
			</select>
		</div>
	@Usage
		$('.HRxllb').HRxllb(options);
	@options
		skin			:1,				//皮肤选择
		color			:'#79A2BD',		//字体默认颜色
		hoverColor		:'#fff',		//鼠标经过颜色
		selectedColor	:'#fff',		//选中颜色
		disabledColor	:'#ccc'			//禁用颜色
		optionsHeight	:''				//显示options的总高度
		reload			:false			//是否重新载入下拉列表
*/
$.fn.HRxllb = function(options){
	var options = $.extend({}, {
		skin			:1,
		color			:'#79A2BD',
		hoverColor		:'#fff',
		selectedColor	:'#fff',
		disabledColor	:'#ccc',
		optionsHeight	:'',
		reload			:false
	}, options);
	var box = $(this);
	$(function(){
		//样式名前缀，用来区分皮肤
		var classPrefix = "hr-xllb"+options.skin+"-";
		//id前缀，用来区分每一个下拉列表
		var idPrefix = "hr-xllb-"+$(box).find("select").attr("id")+"-";
		var selectId = $(box).find("select").attr("id");
		var optionsHeight = 0;
		
		if(options.reload){
			//IE6下可能会出现的BUG，解决办法就是在reload前把select强制show()，再hide()
			$(box).find("select").show().hide().nextAll().remove();
			$(box).append("<div class='"+classPrefix+"select "+idPrefix+"select' style='color:"+options.color+"'>"+$(box).find("select option:selected").html()+"</div>");
			if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
				$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;width:175px'></div>");
			}else{
				$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;position:absolute;z-index:1000;display:none;width:175px;height:"+options.optionsHeight+"px;overflow-x:hidden;overflow-y:scroll'></div>");
			}
			$("."+idPrefix+"div").append("<ul class='"+classPrefix+"options "+idPrefix+"options'></ul>");
			$("."+idPrefix+"options").append("<div class='"+classPrefix+"top' style='color:"+options.disabledColor+"'></div>");
			$(box).find("select#"+selectId).children().each(function(){
				//判断当前html元素是否是optgroup
				if($(this).context.nodeName == "OPTGROUP"){
					if($(this).attr('disabled') == "disabled"){
						$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.disabledColor+"'>"+$(this).attr('label')+"</li>");
						$(this).children().each(function(){
							if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
								$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
							}else{
								$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
							}
						});
					}else{
						$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.color+"'>"+$(this).attr('label')+"</li>");
						$(this).children().each(function(){
							if($(this).attr('disabled') == "disabled"){
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							}else{
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open' style='padding-left:30px;width:120px;color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							}
						});
					}
				}else{
					if($(this).attr('disabled')){
						if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}else{
							$("."+idPrefix+"options").append("<li class='open disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}
					}else{
						if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}else{
							$("."+idPrefix+"options").append("<li class='open' style='color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}
					}
				}
			});
			$("."+idPrefix+"options").append("<div class='"+classPrefix+"bottom' style='color:"+options.disabledColor+"'></div>");
		}else{
			//隐藏select元素
			$(box).find("select").hide();
			//开始创建模拟select需要的元素
			$(box).append("<div class='"+classPrefix+"select "+idPrefix+"select' style='color:"+options.color+"'>"+$(box).find("select option:selected").html()+"</div>");
			if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
				$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;width:175px'></div>");
			}else{
				$(box).append("<div class='"+idPrefix+"div' style='padding:0;margin:0;position:absolute;z-index:1000;display:none;width:175px;height:"+options.optionsHeight+"px;overflow-x:hidden;overflow-y:scroll'></div>");
			}
			$("."+idPrefix+"div").append("<ul class='"+classPrefix+"options "+idPrefix+"options'></ul>");
			$("."+idPrefix+"options").append("<div class='"+classPrefix+"top' style='color:"+options.disabledColor+"'></div>");
			$(box).find("select#"+selectId).children().each(function(){
				//判断当前html元素是否是optgroup
				if($(this).context.nodeName == "OPTGROUP"){
					if($(this).attr('disabled') == "disabled"){
						$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.disabledColor+"'>"+$(this).attr('label')+"</li>");
						$(this).children().each(function(){
							if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
								$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
							}else{
								$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
							}
						});
					}else{
						$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-optgroup disabled' style='color:"+options.color+"'>"+$(this).attr('label')+"</li>");
						$(this).children().each(function(){
							if($(this).attr('disabled') == "disabled"){
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open disabled' style='padding-left:30px;width:120px;color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							}else{
								if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
									$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='padding-left:30px;width:120px;color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//选中
								}else{
									$("."+idPrefix+"options").append("<li class='open' style='padding-left:30px;width:120px;color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");//未选中
								}
							}
						});
					}
				}else{
					if($(this).attr('disabled')){
						if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}else{
							$("."+idPrefix+"options").append("<li class='open disabled' style='color:"+options.disabledColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}
					}else{
						if($(box).find("select#"+selectId+" option:selected").val() == $(this).val()){
							$("."+idPrefix+"options").append("<li class='"+classPrefix+"open-selected' style='color:"+options.selectedColor+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}else{
							$("."+idPrefix+"options").append("<li class='open' style='color:"+options.color+"'>"+$(this).html()+"<div style='display:none'>"+$(this).val()+"</div></li>");
						}
					}
				}
			});
			$("."+idPrefix+"options").append("<div class='"+classPrefix+"bottom' style='color:"+options.disabledColor+"'></div>");
			//结束创建
			//判断select是否可用
			if(!$(box).find("select").attr('disabled')){
				$("."+idPrefix+"select").live('mouseover',function(){
					$(this).addClass(classPrefix+"select-hover");
				}).live('mouseout',function(){
					$(this).removeClass(classPrefix+"select-hover");
				});
				//绑定点击下拉列表事件
				$("body").live('click',function(e){
					var clickme = $(e.target);
					//判断用户鼠标点击区域，模拟鼠标移出select点击隐藏options
					if(!clickme.hasClass(idPrefix+"select")){
						$("."+idPrefix+"div").hide();
						$(box).find("."+idPrefix+"select").removeClass(classPrefix+"select-open");
						$(box).find("."+idPrefix+"options").hide();
					}else{
						//判断当前元素在屏幕整体的上方还是下方，自动判断显示区域
						var marginTop = $(box).offset().top-$(window).scrollTop();
						var marginBottom = $(window).height()-($(box).offset().top-$(window).scrollTop())-24;
						if(marginTop > marginBottom){
							//实时获取options的高度，防止执行reload方法后，options的高度不更新
							if(options.optionsHeight == "" || options.optionsHeight > ($(box).find("select option,select optgroup").length*24+10)){
								optionsHeight = $(box).find("select option,select optgroup").length*24+10;
							}else{
								optionsHeight = options.optionsHeight;
							}
							$("."+idPrefix+"div").css("margin-top","-"+(optionsHeight+24)+"px");
						}else{
							$("."+idPrefix+"div").css("margin-top","0");
						}
						//切换options的隐藏/显示
						if($(box).find("."+idPrefix+"options").css("display") == "block"){
							$(box).find("."+idPrefix+"select").removeClass(classPrefix+"select-open");
							$(box).find("."+idPrefix+"options").hide();
							$("."+idPrefix+"div").hide();
						}else{
							$(box).find("."+idPrefix+"select").addClass(classPrefix+"select-open");
							$(box).find("."+idPrefix+"options").show();
							$("."+idPrefix+"div").show();
						}
					}
				});
				//options的鼠标移入、移出、点击事件
				$(box).find("."+idPrefix+"options li:not(.disabled)").live('mouseover',function(){
					$(this).addClass(classPrefix+"open-hover");
					$(this).css({color:options.hoverColor});
				}).live('mouseout',function(){
					$(this).removeClass(classPrefix+"open-hover");
					if($(this).attr("class") == "open"){
						$(this).css({color:options.color});
					}else{
						$(this).css({color:options.selectedColor});
					}
				}).live('click',function(){
					//移除options的选中样式
					$("."+idPrefix+"options").find("li").not($("."+idPrefix+"options").find("li."+classPrefix+"open-optgroup")).removeClass(classPrefix+"open-selected").addClass("open").css({color:options.color});
					$("."+idPrefix+"options").find("li.disabled").not($("."+idPrefix+"options").find("li."+classPrefix+"open-optgroup")).css({color:options.disabledColor});
					//添加当前点击的options为选中样式
					$(this).addClass(classPrefix+"open-selected");
					//修改真实select里选中的options
					$(box).find("select option").val($(box).find("."+classPrefix+"options li."+classPrefix+"open-selected div").html());
					//隐藏options并修改显示为选中的options
					$("."+idPrefix+"select").removeClass(classPrefix+"select-open").addClass(classPrefix+"select");
					$("."+idPrefix+"select").html($(this).html());
					$("."+idPrefix+"options").hide();
				});
				$(box).find("."+idPrefix+"options li.disabled").live('click',function(){
					return false;
				});
			}else{
				$("."+idPrefix+"select").css({color:options.disabledColor});
			}
		}
	});
};

/*
	图片缩放 HRtpsf
	@CSS
		div{width:250px;height:150px;line-height:150px;overflow:hidden}
		div img{float:left}
	@DOM
		<div>
			<img src="MammaMia.jpg" />
		</div>
	@Usage
		$('div').HRtpsf(options);
	@options
		maxWidth	:100,	//最大宽度，和外层div同宽
		maxHeight	:100	//最大高度，和外层div同高
*/
$.fn.HRtpsf = function(options){
	var options = $.extend({}, {
		maxWidth	:100,
		maxHeight	:100
	}, options);
	this.each(function(){
		var img = $(this).find('img');
		var imgWidth = $(img).attr("width");
		var imgHeight = $(img).attr("height");
		if(imgWidth > options.maxWidth || imgHeight > options.maxHeight){
			if(imgWidth/imgHeight > options.maxWidth/options.maxHeight){
				$(img).attr("width",options.maxWidth);
				var realHeight = options.maxWidth/imgWidth*imgHeight;
				$(img).css("margin-top",parseInt((options.maxHeight-realHeight)/2));
			}else{
				$(img).attr("height",options.maxHeight);
				var realWidth = options.maxHeight/imgHeight*imgWidth;
				$(img).css("margin-left",parseInt((options.maxWidth-realWidth)/2));
			}
		}else{
			$(img).css("margin-top",parseInt((options.maxHeight-imgHeight)/2));
			$(img).css("margin-left",parseInt((options.maxWidth-imgWidth)/2));
		}
	});
};

/*
	高亮显示 HRglxs
	@DOM
		<div class="HRtpzs1">
			<img src="diqiu.jpg" />
			<p>超级玛丽</p>
		</DIV>
	@Usage
		$('.banner').HRglxs(options);
	@options
		opacity		:0.5,		//透明度，0~1
		bgcolor		:'#fff',	//遮罩层背景色
		speed		:'normal'	//滑动速度，'slow','normal','fast'，也可以用数值代替，比如2000表示2000毫秒
*/
$.fn.HRglxs = function(options){
	var options = $.extend({}, {
		opacity		:0.5,
		bgcolor		:'#fff',
		speed		:'normal'
	}, options);
	this.each(function(){
		var box = $(this);
		$(box).bind("mouseover",function(){
			if(isMouseLeaveOrEnter(getEvent(),this)){
				$(this).click(function(){
					if(!$("div").hasClass("HRglxs-bg")){
						$(box).addClass("hr-glxs");
						if($.browser.msie && $.browser.version == "6.0"){
							//ie6无法遮住select，则只能将其隐藏
							$("select:visible").addClass("hr-glxs-select-hidden");
							//ie6不支持position:fixed
							$("body").append("<div class='HRglxs-bg' style='position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:0;width:100%;height:"+$(window).height()+"px;display:none;z-index:9998;background-color:"+options.bgcolor+";filter:progid:DXImageTransform.Microsoft.Alpha(opacity="+options.opacity*100+");opacity:"+options.opacity+";'></div>");
						}else{
							$("body").append("<div class='HRglxs-bg' style='position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:9998;background-color:"+options.bgcolor+";filter:progid:DXImageTransform.Microsoft.Alpha(opacity="+options.opacity*100+");opacity:"+options.opacity+";'></div>");
						}
						$(".HRglxs-bg").fadeIn(options.speed);
					}
				});
			}
		}).bind("mouseout",function(){
			if(isMouseLeaveOrEnter(getEvent(),this)){
				$(".HRglxs-bg").click(function(){
					if($("div").hasClass("HRglxs-bg")){
						$("select").removeClass("hr-glxs-select-hidden");
						$(".HRglxs-bg").fadeOut(options.speed,function(){
							$(box).removeClass("hr-glxs");
							$(".HRglxs-bg").remove();
						});
					}
				});
			}
		});
	});
};
	
/*
	输入框提示 HRinputtip
	@CSS
		.hr-inputtip{color:#999}
	@DOM
		<input type="text" name="search" class="search" />
	@Usage
		$('.search').HRinputtip(options);
	@options
		tipId		:'',	//显示提示信息的id
		maxLength	:0,		//最大长度
		maxTipId	:'',	//提示模块id
		maxTipText	:'',	//正常提示信息
		maxTipError	:'',	//错误提示信息
		pwdTipId	:''		//提示模块id
*/
$.fn.HRinputtip = function(options){
	var options = $.extend({}, {
		tipId		:'',
		maxLength	:0,
		maxTipId	:'',
		maxTipText	:'',
		maxTipError	:'',
		pwdTipId	:''
	}, options);
	this.each(function(){
		var input = $(this);
		if(options.tipId != ""){
			$(input).focusin(function(){
				$('#'+options.tipId).hide();
			}).focusout(function(){
				if($(input).val() == ""){
					$('#'+options.tipId).show();
				}
			});
			$('#'+options.tipId).click(function(){
				$(this).hide();
				$(input).focus();
			});
		}
		if(options.maxLength > 0){
			$("#"+options.maxTipId).hide();
			$(this).focusin(function(){
				showTip($(this));
				$("#"+options.maxTipId).fadeIn();
			}).focusout(function(){
				$("#"+options.maxTipId).fadeOut();
			}).keyup(function(){
				showTip($(this));
			}).bind("text",function(){
				showTip($(this));
			});
			//提示框显示
			function showTip(obj){
				if(options.maxLength - getLen(obj) >= 0){
					$("#"+options.maxTipId).html(options.maxTipText.replace(/\%t/g, (options.maxLength - getLen(obj))));
				}else{
					$("#"+options.maxTipId).html(options.maxTipError.replace(/\%t/g, (options.maxLength - getLen(obj))));
				}
			}
			//获取输入框内容长度(中文为2个)
			function getLen(obj){
				return obj.val().replace(/[^\x00-\xff]/g,'xx').length;
			}
		}
		if(options.pwdTipId != ""){
			$("#"+options.pwdTipId).hide();
			$(this).focusin(function(){
				pwdTip($(this));
				$("#"+options.pwdTipId).fadeIn();
			}).focusout(function(){
				$("#"+options.pwdTipId).fadeOut();
			}).keyup(function(){
				pwdTip($(this));
			}).bind("text",function(){
				pwdTip($(this));
			});
			//提示框显示
			function pwdTip(obj){
				$("#"+options.pwdTipId).html( evaluatePswd(obj.val()) );
			}
			function evaluatePswd(word){
				var arr=new Array('低','中','高','强');
				if(word==""){
					var grd=0;
				}else if(word.length<7){
					var grd=1;
				}else{
					var grd=word.match(/[a-z](?![^a-z]*[a-z])|[A-Z](?![^A-Z]*[A-Z])|\d(?![^\d]*\d)|[^a-zA-Z\d](?![a-zA-Z\d]*[^a-zA-Z\d])/g).length;
				}
				return (grd==0) ? '请输入密码等待强度检测' : '密码强度检测：'+arr[grd-1];
			}
		}
	});
};

/*
	倒计时 HRdjs
	@DOM
		<p></p>
	@Usage
		$('p').HRdjs(options);
	@options
		tipId		:'',	//显示提示信息的id
		maxLength	:0,		//最大长度
		maxTipId	:'',	//提示模块id
		maxTipText	:'',	//正常提示信息
		maxTipError	:'',	//错误提示信息
		pwdTipId	:''		//提示模块id
*/
$.fn.HRdjs = function(options,to){
	var options = $.extend({}, {
		startFontSize	:'36px',
		endFontSize		:'12px',
		duration		:1000,
		startNumber		:10,
		endNumber		:0,
		callBack		:function(){}
	}, options);
	return this.each(function(){
		if(!to && to != options.endNumber){
			to = options.startNumber;
		}
		if($(this).context.nodeName == "INPUT"){
			$(this).val(to).css('fontSize',options.startFontSize);
			$(this).animate({'fontSize':options.endFontSize},options.duration,'',function(){
				if(to > options.endNumber+1){
					$(this).css('fontSize',options.startFontSize).val(to-1).HRdjs(options,to-1);
				}else{
					options.callBack(this);
				}
			});
		}else{
			$(this).text(to).css('fontSize',options.startFontSize);
			$(this).animate({'fontSize':options.endFontSize},options.duration,'',function(){
				if(to > options.endNumber+1){
					$(this).css('fontSize',options.startFontSize).text(to-1).HRdjs(options,to-1);
				}else{
					options.callBack(this);
				}
			});
		}
	});
};

/*
	分享工具 HRshare
	@DOM
		<div>
			<a class="hr-share-xiaoyou"></a>
			<a class="hr-share-115"></a>
			<a class="hr-share-tsina"></a>
			<a class="hr-share-tqq"></a>
			<a class="hr-share-more"></a>
		</div>
	@Usage
		$('div').HRshare(options);
	@options
		size		:16,	//图标尺寸，目前可选16和32
		hasText		:true	//是否显示文字
*/
$.fn.HRshare = function(options){
	var options = $.extend({}, {
		size	:16,
		hasText	:true
	}, options);
	var shareico = {
		"tqq"		:"http://v.t.qq.com/share/share.php?title={title}&url={url}&appkey=118cd1d635c44eab9a4840b2fbf8b0fb",
		"tsina"		:"http://service.weibo.com/share/share.php?title={title}&url={url}&source=bookmark&appkey=2992571369",
		"qzone"		:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}",
		"renren"	:"http://share.renren.com/share/buttonshare.do?link={url}&title={title}",
		"baidu"		:"http://cang.baidu.com/do/add?it={title}&iu={url}&fr=ien#nw=1",
		"115"		:"http://sc.115.com/add?url={url}&title={title}",
		"tsohu"		:"http://t.sohu.com/third/post.jsp?url={url}&title={title}&content=utf-8",
		"taobao"	:"http://share.jianghu.taobao.com/share/addShare.htm?url={url}",
		"xiaoyou"	:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url={url}",
		"hi"		:"http://apps.hi.baidu.com/share/?url={url}&title={title}",
		"fanfou"	:"http://fanfou.com/sharer?u={url}&t={title}",
		"sohubai"	:"http://bai.sohu.com/share/blank/add.do?link={url}",
		"feixin"	:"http://space3.feixin.10086.cn/api/share?title={title}&url={url}",
		"youshi"	:"http://www.ushi.cn/feedShare/feedShare!sharetomicroblog.jhtml?type=button&loginflag=share&title={title}&url={url}",
		"tianya"	:"http://share.tianya.cn/openapp/restpage/activity/appendDiv.jsp?app_id=jiathis&ccTitle={title}&ccUrl={url}&jtss=tianya&ccBody=",
		"msn"		:"http://profile.live.com/P.mvc#!/badge?url={url}&screenshot=",
		"douban"	:"http://shuo.douban.com/!service/share?image=&href={url}&name={title}",
		"twangyi"	:"http://t.163.com/article/user/checkLogin.do?source={title}&info={title}+{url}&images=",
		"mop"		:"http://tk.mop.com/api/post.htm?url={url}&title={title}"
	};
	var shareiconame = {
		"tqq"		:"腾讯微博",
		"tsina"		:"新浪微博",
		"qzone"		:"QQ空间",
		"renren"	:"人人网",
		"baidu"		:"百度收藏",
		"115"		:"115",
		"tsohu"		:"搜狐微博",
		"taobao"	:"淘江湖",
		"xiaoyou"	:"腾讯朋友",
		"hi"		:"百度空间",
		"fanfou"	:"饭否",
		"sohubai"	:"搜狐白社会",
		"feixin"	:"飞信",
		"tianya"	:"天涯社区",
		"youshi"	:"优士网",
		"msn"		:"MSN",
		"douban"	:"豆瓣",
		"twangyi"	:"网易微博",
		"mop"		:"猫扑推客"
	};
	this.each(function(){
		$(this).addClass("hr-share-"+options.size);
		var title = document.title;
		var url = window.location.href;
		function eFunction(str){
			return function(){
				window.open(formatmodel(shareico[str],{title:title, url:url}));
			}
		}
		for(si in shareico){
			$(".hr-share-"+si).die('click').live('click',eFunction(si)).attr("title","分享到"+shareiconame[si]);
			if(options.hasText){
				$(".hr-share-"+si).text(shareiconame[si]);
			}
			$(".hr-share-more-panel-"+si).die('click').live('click',eFunction(si));
		}
		
		//更多
		$(".hr-share-more").live("click",function(){
			if(!$(".HRshare-bg").length){
				if($.browser.msie && $.browser.version == "6.0"){
					//ie6无法遮住select，则只能将其隐藏
					$("select:visible").addClass("hr-share-select-hidden");
					//ie6不支持position:fixed
					$("body").append("<div class='HRshare-bg' style='position:absolute;left:0;top:0;width:"+$(window).width()+"px;height:"+$(window).height()+"px;display:none;z-index:9998;background-color:#000;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);opacity:0.5;'></div>");
				}else{
					$("body").append("<div class='HRshare-bg' style='position:fixed;top:0;left:0;width:100%;height:100%;display:none;z-index:9998;  background-color:#000;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);opacity:0.5;'></div>");
				}
			}
			$(".HRshare-bg").fadeIn('fast');
			
			if(!$(".hr-share-more-panel").length){
				var _left = ($(window).width()-270)/2;
				var _top = ($(window).height()-300)/3;
				if($.browser.msie && $.browser.version == "6.0"){
					var _sharepanel = '<div class="hr-share-more-panel" style="position:absolute;z-index:9999;left:expression(eval(document.documentElement.scrollLeft)+'+_left+');top:expression(eval(document.documentElement.scrollTop)+'+_top+')">';
				}else{
					var _sharepanel = '<div class="hr-share-more-panel" style="position:fixed;z-index:9999;top:'+_top+'px;left:'+_left+'px">';
				}
				_sharepanel += '<div class="hr-share-more-panel-title"><a href="#close" title="关闭">×</a><span>分享到各大网站</span></div><div class="hr-share-more-panel-list">';
				for(si in shareiconame){
					_sharepanel += '<a class="hr-share-more-panel-'+si+'">'+shareiconame[si]+'</a>';
				}
				_sharepanel += '</div><div class="hr-share-more-panel-copyright"><a href="http://www.cnblogs.com/hooray" target="_blank">胡尐睿丶制作</a></div></div>';
				$("body").append(_sharepanel);
			}
			$(".hr-share-more-panel").fadeIn('fast');
		});
		$(".HRshare-bg").live("click",function(){
			$(".hr-share-more-panel").fadeOut('fast');
			$(".HRshare-bg").fadeOut('fast');
		});
		$(".hr-share-more-panel-title a").live("click",function(){
			$(".hr-share-more-panel").fadeOut('fast');
			$(".HRshare-bg").fadeOut('fast');
		});
		$(window).bind('resize',function(){
			var _left = ($(window).width()-270)/2;
			var _top = ($(window).height()-300)/3;
			$(".hr-share-more-panel").css({"left":_left,"top":_top});
		});
	});
};

function isMouseLeaveOrEnter(e, handler){
	if (e.type != 'mouseout' && e.type != 'mouseover') return false;
	var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
	while (reltg && reltg != handler)
		reltg = reltg.parentNode;
	return (reltg != handler);
}
function getEvent(){
	if(document.all)
		return window.event;
	func=getEvent.caller;
	while(func!=null){
		var arg0=func.arguments[0];
		if(arg0){
			if((arg0.constructor==Event || arg0.constructor==MouseEvent) || (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation)){
				return arg0;
			}
		}
		func=func.caller;
	}
	return null;
}
function formatmodel(str,model){
	for(var k in model){
		var re = new RegExp("{"+k+"}","g");
		str = str.replace(re,model[k]);
	}
	return str;
}