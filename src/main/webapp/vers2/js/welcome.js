/**
 * @date 2013-02-21
 * @author luowen
 */
$(document).ready(function(){
	$('form').hide().show('slow');
	
	$('.new-usr-pwd').delegate('a', 'click', function(){
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

/**
 * 登录数据处理
 * 
 * 如果验证成功，则自动跳转至登录页面
 * 如果验证失败，返回false，阻止跳转
 */
formAction = function() {
	var action = '';
	$('form input[name=submit]').val()=='GO'?
		action='login':action='regist';
	var url = Core.url+"?act="+action;
	var formdata = {
			username: $('form input[name=username]').val().trim(),
			password: $('form input[name=password]').val().trim()
	}
	if(isLegal(formdata)){
		$.post(url, formdata, function(sc){
			var result = JSON.parse(sc);
			console.log(result);
			handleResponse(result, action);
		}).error(function(){
			showInfoMessage("操作失败。", true);
		});
		$('form .bgloader').show();
	}else{
		showInfoMessage("输入格式出错。", true);
	}
	//阻止表单自动提交
	return false;
}

handleResponse = function(result, action) {
	if(action == 'login'){
		if (result.allow) {
			localStorage.setItem('uid', result.userinfo.uid);
			window.location.href = '/vers2/index.html';
		} else {
			showInfoMessage('用户名或密码错误。', true);
		}
	} else if(action == 'regist') {
		var msg = "";
		var err = false;
		if(result.success){
			msg = "恭喜! 注册成功！<a href='javascript:hideform();'>登陆</a>";
		} else if(result.duplicated) {
			msg = "用户名已存在。";
			err = true;
		} else {
			msg = "注册失败。";
			err = true;
		}
		showInfoMessage(msg, err);
	}
}

hideform = function() {
	$('form').hide('normal', function(){
		window.location.reload();
	})
}

showInfoMessage = function(msg, error) {
	var color = "rgb(82, 173, 54)";
	$('form .bgloader').hide();
	if(error){
		color = "rgb(216, 77, 77)";
	}
	$('.login-error-msg').css({
		"color" : color
	}).html(msg).hide().show('slow');
}

isLegal = function(data) {
	var u = data.username, p = data.password;
	var isLegal = false;
	if (u && p && u!='' && p!='' && u != 'input here.') {
		isLegal = true;
	}
	return isLegal;
}