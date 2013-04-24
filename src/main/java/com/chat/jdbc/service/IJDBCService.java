/**
 * Websocket IM designer
 * 
 * Date:	Dec 30, 2012
 * ===================================
 * Author			Remark
 * vane				TODO
 * 
 */
package com.chat.jdbc.service;

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
public interface IJDBCService {

	List<UserFriendsTO> getFriendsListByUID(long i);
	
	UserDetailsTO getUserDetails(long i);

	List<UserInfoTO> isAllowToLogin(UserInfoTO ui);

	int insertNewUser(UserInfoTO ui);

	boolean checkUserDuplicated(UserInfoTO ui);

	List<UserDetailsTO> getActiveUsers(QueryUserTO qUserTO);

	int addUserFriend(UserFriendsTO ufriendsTO);

	int delUserFriend(UserFriendsTO ufriendsTO);

	boolean checkUserFriendDuplicated(UserFriendsTO ufriendsTO);

	int updateUserInfo(WSUpdateInfoTO updinfo);

	List<WSMessageTO> getAllUnreadMsg(long uid);

}
