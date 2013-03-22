/**
 *
 * Author: luowen
 * Created Date: Mar 22, 2013
 * Description:  TODO
 * Change history
 *  =======================================================
 * version					author					remark
 *	1.0						luowen					initial
 */
package com.chat.jdbc.ws.to;


/**
 * @author luowen
 *
 */
public class UserStatusTO {

	private long uid;
	private byte status;		//0-offline; 1-online; 2-leave; 3-invisible

	public long getUid() {
		return uid;
	}
	public void setUid(long uid) {
		this.uid = uid;
	}
	public byte getStatus() {
		return status;
	}
	public void setStatus(byte status) {
		this.status = status;
	}
}
