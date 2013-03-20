/**
 * Websocket IM designer
 * 
 * Date:	Dec 30, 2012
 * ===================================
 * Author			Remark
 * vane				TODO
 * 
 */
package com.chat.jdbc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.jdbc.dao.IOperatorDAO;
import com.chat.jdbc.service.IJDBCService;
import com.chat.jdbc.to.UserDetailsTO;
import com.chat.jdbc.to.UserFriendsTO;
import com.chat.jdbc.to.UserInfoTO;
import com.chat.jdbc.ws.to.QueryUserTO;
import com.chat.jdbc.ws.to.WSUpdateInfoTO;

/**
 * @author vane
 * 
 */
@Service/*(value = "JDBCService")*/
public class JDBCServiceImpl implements IJDBCService {
	
	@Autowired
	IOperatorDAO operatorDAOImpl;
	
	@Override
	public List<UserFriendsTO> getFriendsListByUID(long uid) {

		return operatorDAOImpl.getFriendsListByUID(uid);
	}

	@Override
	public UserDetailsTO getUserDetails(long uid) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.getUserDetails(uid);
	}

	@Override
	public List<UserInfoTO> isAllowToLogin(UserInfoTO ui) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.isAllowToLogin(ui);
	}

	@Override
	public 	int insertNewUser(UserInfoTO ui) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.insertNewUser(ui);
	}

	@Override
	public boolean checkUserDuplicated(UserInfoTO ui) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.checkUserDuplicated(ui);
	}

	@Override
	public List<UserDetailsTO> getActiveUsers(QueryUserTO qUserTO) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.getActiveUsers(qUserTO);
	}

	@Override
	public int addUserFriend(UserFriendsTO ufriendsTO) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.addUserFriend(ufriendsTO);
	}

	@Override
	public int delUserFriend(UserFriendsTO ufriendsTO) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.delUserFriend(ufriendsTO);
	}

	@Override
	public boolean checkUserFriendDuplicated(UserFriendsTO ufriendsTO) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.checkUserFriendDuplicated(ufriendsTO);
	}

	@Override
	public int updateUserInfo(WSUpdateInfoTO updinfo) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.updateUserInfo(updinfo);
	}
	
}
