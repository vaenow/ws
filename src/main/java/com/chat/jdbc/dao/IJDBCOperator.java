/**
 * Websocket IM designer
 * 
 * Date:	Dec 29, 2012
 * ===================================
 * Author			Remark
 * vane				TODO
 * 
 */
package com.chat.jdbc.dao;

import java.util.List;

import com.chat.jdbc.to.UserFriendsTO;
import com.chat.jdbc.to.UserInfoTO;

/**
 * @author vane
 * 
 */
public interface IJDBCOperator {
	/**
	 * 得到指定用户的朋友
	 * */
	public List<UserFriendsTO> getFriendsByUID(final long uid);

	/**
	 * 得到指定用户
	 * */
	public UserInfoTO getUserInfo(final long uid);
}
