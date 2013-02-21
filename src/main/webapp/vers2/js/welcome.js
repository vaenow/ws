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