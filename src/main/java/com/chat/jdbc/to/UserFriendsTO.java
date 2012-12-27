/**
 * Websocket IM designer
 * 
 * Date:	Dec 27, 2012
 * ===================================
 * Author			Remark
 * vane				user friends
 * 
 */
package com.chat.jdbc.to;

import java.sql.Date;

/**
 * @author vane
 * 
 */
public class UserFriendsTO {

	private Long fid;
	private Long owner;		//好友者
	private Long friend;	//好友列表
	private String createIPAddress;
	private Date createDateTime;

	private UserInfoTO ownerInfoTO;
	private UserInfoTO friendInfoTO;

	public UserInfoTO getOwnerInfoTO() {
		return ownerInfoTO;
	}

	public void setOwnerInfoTO(UserInfoTO ownerInfoTO) {
		this.ownerInfoTO = ownerInfoTO;
	}

	public UserInfoTO getFriendInfoTO() {
		return friendInfoTO;
	}

	public void setFriendInfoTO(UserInfoTO friendInfoTO) {
		this.friendInfoTO = friendInfoTO;
	}

	public Long getFid() {
		return fid;
	}

	public Long getOwner() {
		return owner;
	}

	public void setOwner(Long owner) {
		this.owner = owner;
	}

	public Long getFriend() {
		return friend;
	}

	public void setFriend(Long friend) {
		this.friend = friend;
	}

	public void setFid(Long fid) {
		this.fid = fid;
	}

	public String getCreateIPAddress() {
		return createIPAddress;
	}

	public void setCreateIPAddress(String createIPAddress) {
		this.createIPAddress = createIPAddress;
	}

	public Date getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(Date createDateTime) {
		this.createDateTime = createDateTime;
	}

}
