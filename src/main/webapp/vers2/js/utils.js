/**
 * @date 2012-10-16
 * @author luowen
 */

GetStoragedUID = function() {
	//默认 uid=1 的用户
	var uid = 1;
	if(localStorage){
		uid = localStorage.getItem('uid');
		if(uid==null || isNaN(uid)){
			uid = 1;
			localStorage.setItem('uid', uid);
		}
	}
	return uid;
}