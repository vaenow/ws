/**
 * @date 2013-02-21
 * @author luowen
 */
$(document).ready(function(){
	
	$('.new-usr-pwd').delegate('a', 'click', function(){
		console.log(this);
		var note = '<a href="javascript:hideform();">I have username !</a>';
		var animate = 'normal';
		$('.login').hide(animate).html('NEW ONE!').show(animate);
		$('form label').css({'height': 0}).html('');
		$('.new-usr-pwd').hide(animate).html(note).show(animate);
		$('form input[name=submit]').hide(animate).val('Regist').show(animate);
		//修改表单目标地址
		//$('form')[0].action = $('form')[0].action.replace('login', 'regist');
	})

	$('.username-field').delegate('input', 'click', function(){
		if(this.value=='input here.'){
			this.value='';
		}
	}).delegate('input', 'focusout', function(){
		if(this.value==''){
			this.value='input here.';
		}
	})	
});

formAction = function() {
	var action = '';
	$('form input[name=submit]').val()=='GO'?
		action='login':action='regist';
	var url = Core.url+"?act="+action;
	var formdata = {
			username: $('form input[name=username]').val(),
			password: $('form input[name=password]').val()
	}
	$.post(url, formdata, function(sc){
		var result = JSON.parse(sc);
		console.log(result);
		handleResponse(result, action);
	});
	
	$('form .bgloader').show();
	//阻止表单自动提交
	return false;
}

handleResponse = function(result, action) {
	if(action == 'login'){
		if (result.allow) {
			localStorage.setItem('uid', result.userinfo.uid);
			window.location.href = '/vers2/index.html';
		} else {
			showInfoMessage('用户名或密码错误。');
		}
	} else if(action == 'regist') {
		var msg = "";
		if(result.success){
			msg = "恭喜! 注册成功！";
		} else if(result.duplicated) {
			msg = "用户名已存在。";
		} else {
			msg = "注册失败。";
		}
		showInfoMessage(msg);
	}
}

hideform = function() {
	$('form').hide('normal', function(){
		window.location.reload();
	})
}

showInfoMessage = function(msg) {
	$('form .bgloader').hide();
	$('.login-error-msg').html(msg).hide().show('slow');
}