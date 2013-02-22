/**
 *
 * Author: luowen
 * Created Date: Feb 22, 2013
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
public class QueryUserTO {

	private long uid;
	private int start;
	private int length;

	public long getUid() {
		return uid;
	}

	public void setUid(long uid) {
		this.uid = uid;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

}
