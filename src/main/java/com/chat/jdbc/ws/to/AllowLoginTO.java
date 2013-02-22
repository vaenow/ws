/**
 *
 * Author: luowen
 * Created Date: Feb 21, 2013
 * Description:  TODO
 * Change history
 *  =======================================================
 * version					author					remark
 *	1.0						luowen				
 */
package com.chat.jdbc.ws.to;

import com.chat.jdbc.to.UserInfoTO;

/**
 * @author luowen
 *
 */
public class AllowLoginTO {

	private boolean isAllow;
	private UserInfoTO userinfo;

	public UserInfoTO getUserinfo() {
		return userinfo;
	}

	public void setUserinfo(UserInfoTO userinfo) {
		this.userinfo = userinfo;
	}

	public boolean isAllow() {
		return isAllow;
	}

	public void setAllow(boolean isAllow) {
		this.isAllow = isAllow;
	}
}
