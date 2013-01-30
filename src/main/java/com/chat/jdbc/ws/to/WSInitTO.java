/**
 *
 * Author: luowen
 * Created Date: Jan 30, 2013
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
public class WSInitTO {

	private Long sender;

	private Long reciever;

	public Long getSender() {
		return sender;
	}

	public void setSender(Long sender) {
		this.sender = sender;
	}

	public Long getReciever() {
		return reciever;
	}

	public void setReciever(Long reciever) {
		this.reciever = reciever;
	}

}
