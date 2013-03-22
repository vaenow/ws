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
public class WSMessageTO {
	private String ctn; 	//"message content"
	private Long sder;		//"message sender"
	private Long rcver;	//"message receiver"
	private Long token; 	//"verify token"
	private String sderalias;	// sender alias
	private String rcveralias;	// reciever alias
//	private byte msgType;		//1 -> normal message; 2 -> system message

	private byte msgType;		//0-normal; 1-status; 2-shake;
	
	
	public byte getMsgType() {
		return msgType;
	}

	public void setMsgType(byte msgType) {
		this.msgType = msgType;
	}

	public String getSderalias() {
		return sderalias;
	}

	public void setSderalias(String sderalias) {
		this.sderalias = sderalias;
	}

	public String getRcveralias() {
		return rcveralias;
	}

	public void setRcveralias(String rcveralias) {
		this.rcveralias = rcveralias;
	}

	public String getCtn() {
		return ctn;
	}

	public void setCtn(String ctn) {
		this.ctn = ctn;
	}

	public Long getSder() {
		return sder;
	}

	public void setSder(Long sder) {
		this.sder = sder;
	}

	public Long getRcver() {
		return rcver;
	}

	public void setRcver(Long rcver) {
		this.rcver = rcver;
	}

	public Long getToken() {
		return token;
	}

	public void setToken(Long token) {
		this.token = token;
	}
}
