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
	public List<UserDetailsTO> getUserDetails(long uid) {
		// TODO Auto-generated method stub
		return operatorDAOImpl.getUserDetails(uid);
	}
}
