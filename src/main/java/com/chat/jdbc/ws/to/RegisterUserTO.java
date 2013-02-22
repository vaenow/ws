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


/**
 * @author luowen
 * 
 */
public class RegisterUserTO {

	private boolean isSuccess;
	private boolean isDuplicated;

	public boolean isDuplicated() {
		return isDuplicated;
	}

	public void setDuplicated(boolean isDuplicated) {
		this.isDuplicated = isDuplicated;
	}

	public boolean isSuccess() {
		return isSuccess;
	}

	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

}
