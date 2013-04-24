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
import com.chat.jdbc.ws.to.QueryUserTO;
import com.chat.jdbc.ws.to.WSMessageTO;
import com.chat.jdbc.ws.to.WSUpdateInfoTO;

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

	/**
	 * 得到一定数量的新用户
	 * @param qUserTO
	 * @return
	 */
	public List<UserDetailsTO> getActiveUsers(QueryUserTO qUserTO);

	/**
	 * 为用户添加好友
	 * @param ufriendsTO
	 * @return
	 */
	public int addUserFriend(UserFriendsTO ufriendsTO);

	/**
	 * 删除用户的某位好友
	 * @param ufriendsTO
	 * @return
	 */
	public int delUserFriend(UserFriendsTO ufriendsTO);

	/**
	 * 检查用户是否已经拥有此好友
	 * @param ufriendsTO
	 * @return
	 */
	public boolean checkUserFriendDuplicated(UserFriendsTO ufriendsTO);

	/**
	 * 更新用户详细信息 
	 * @param updinfo
	 * @return
	 */
	public int updateUserInfo(WSUpdateInfoTO updinfo);

	/**
	 * 得到某用户所有未读消息数
	 * @param uid
	 * @return
	 */
	public List<WSMessageTO> getAllUnreadMsg(long uid);
}
