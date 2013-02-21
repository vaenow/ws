/**
 * @date 2013-02-21
 * @author luowen
 */
$(document).ready(function(){
	
	$('.new-usr-pwd').delegate('a', 'click', function(){
		console.log(this);
		var note = 'I have <a href="">username</a> and <a href="">password</a>!';
		$('.login').html('NEW ONE!');
		$('form label').css({'height': 0}).html('');
		$('.new-usr-pwd').html(note);
		$('form input[name=submit]').val('Regist');
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
			password: $('form input[name=password]').val(),
			token	: new Date().getTime()
	}
	$.post(url, formdata, function(sc){
		var result = JSON.parse(sc);
		console.log(result);
	});
	
	//阻止表单自动提交
	return false;
}


