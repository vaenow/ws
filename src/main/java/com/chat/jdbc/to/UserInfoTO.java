/**
 * Websocket IM designer
 * 
 * Date:	Dec 27, 2012
 * ===================================
 * Author			Remark
 * vane				user information
 * 
 */
package com.chat.jdbc.to;

import java.sql.Date;

/**
 * @author vane
 * 
 */
public class UserInfoTO {

	private Long uid;
	private String name;
	private String passw;
	private Date createDateTime;
	private String createIPAddress;
	private byte active;

	public byte getActive() {
		return active;
	}

	public void setActive(byte active) {
		this.active = active;
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassw() {
		return passw;
	}

	public void setPassw(String passw) {
		this.passw = passw;
	}

	public Date getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(Date createDateTime) {
		this.createDateTime = createDateTime;
	}

	public String getCreateIPAddress() {
		return createIPAddress;
	}

	public void setCreateIPAddress(String createIPAddress) {
		this.createIPAddress = createIPAddress;
	}

}
