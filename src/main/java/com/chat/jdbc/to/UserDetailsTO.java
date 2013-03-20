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

import java.util.Date;

/**
 * @author vane
 * 
 */
public class UserDetailsTO {

	private Long uid;					//ID
	private String alias;				//妮称
	private String mobile;				//手机
	private String email;				//邮箱
	private String updateIPAddress;	//更新信息的IP	
	private Date updateDateTime;		//更新信息的Date
	private String headImg;			//头像
	private String bgImg;				//背景
	private String phrase;				//说说
	private byte gender;				//性别
	private byte age;					//年龄
	private String realName;			//真实姓名
	private String remark;				//备注
	private int vipcode;				//VIP代码
	private int extras;				//扩展内容

	private UserInfoTO userInfoTO;

	public byte getGender() {
		return gender;
	}

	public void setGender(byte gender) {
		this.gender = gender;
	}

	public byte getAge() {
		return age;
	}

	public void setAge(byte age) {
		this.age = age;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getVipcode() {
		return vipcode;
	}

	public void setVipcode(int vipcode) {
		this.vipcode = vipcode;
	}

	public int getExtras() {
		return extras;
	}

	public void setExtras(int extras) {
		this.extras = extras;
	}

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
