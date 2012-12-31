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
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.simple.ParameterizedRowMapper;

/**
 * @author vane
 * 
 */
public class UserFriendsTO {

	private Long fid;
	private Long owner; // 好友者
	private Long friend; // 好友列表
	private String createIPAddress;
	private Date createDateTime;

	private UserDetailsTO ownerDetailsTO;
	private UserDetailsTO friendDetailsTO;

	public UserDetailsTO getOwnerDetailsTO() {
		return ownerDetailsTO;
	}

	public void setOwnerDetailsTO(UserDetailsTO ownerDetailsTO) {
		this.ownerDetailsTO = ownerDetailsTO;
	}

	public UserDetailsTO getFriendDetailsTO() {
		return friendDetailsTO;
	}

	public void setFriendDetailsTO(UserDetailsTO friendDetailsTO) {
		this.friendDetailsTO = friendDetailsTO;
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
