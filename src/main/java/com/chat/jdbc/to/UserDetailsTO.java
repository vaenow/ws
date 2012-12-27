/**
 * Websocket IM designer
 * 
 * Date:	Dec 27, 2012
 * ===================================
 * Author			Remark
 * vane				user details
 * 
 */
package com.chat.jdbc.to;

import java.sql.Date;

/**
 * @author vane
 * 
 */
public class UserDetailsTO {

	private Long uid;
	private String alias;
	private String mobile;
	private String email;
	private String updateIPAddress;
	private Date updateDateTime;
	private String headImg;
	private String bgImg;
	private String phrase;

	private UserInfoTO userInfoTO;

	public UserInfoTO getUserInfoTO() {
		return userInfoTO;
	}

	public void setUserInfoTO(UserInfoTO userInfoTO) {
		this.userInfoTO = userInfoTO;
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUpdateIPAddress() {
		return updateIPAddress;
	}

	public void setUpdateIPAddress(String updateIPAddress) {
		this.updateIPAddress = updateIPAddress;
	}

	public Date getUpdateDateTime() {
		return updateDateTime;
	}

	public void setUpdateDateTime(Date updateDateTime) {
		this.updateDateTime = updateDateTime;
	}

	public String getHeadImg() {
		return headImg;
	}

	public void setHeadImg(String headImg) {
		this.headImg = headImg;
	}

	public String getBgImg() {
		return bgImg;
	}

	public void setBgImg(String bgImg) {
		this.bgImg = bgImg;
	}

	public String getPhrase() {
		return phrase;
	}

	public void setPhrase(String phrase) {
		this.phrase = phrase;
	}

}
