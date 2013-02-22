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

import com.chat.jdbc.to.UserDetailsTO;
import com.chat.jdbc.to.UserFriendsTO;
import com.chat.jdbc.to.UserInfoTO;

/**
 * @author vane
 * 
 */
public interface IOperatorDAO {
	/**
	 * 得到指定用户的朋友
	 * */
	public List<UserFriendsTO> getFriendsListByUID(final long uid);

	/**
	 * 得到指定用户
	 * */
	public UserInfoTO getUserInfo(final long uid);

	/**
	 * 得到用户详细资料
	 * @param uid
	 * @return
	 */
	public UserDetailsTO getUserDetails(long uid);

	/**
	 * 检查是否允许用户登录
	 * @param ui
	 * @return
	 */
	public List<UserInfoTO> isAllowToLogin(UserInfoTO ui);

	/**
	 * 添加新用户
	 * @param ui
	 * @return
	 */
	public int insertNewUser(UserInfoTO ui);

	/**
	 * 检查用户是否重复
	 * @param ui
	 * @return
	 */
	public boolean checkUserDuplicated(UserInfoTO ui);
}
