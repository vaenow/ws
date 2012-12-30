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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.jdbc.dao.IOperatorDAO;
import com.chat.jdbc.service.IJDBCService;

/**
 * @author vane
 * 
 */
@Service/*(value = "JDBCService")*/
public class JDBCServiceImpl implements IJDBCService {
	
	@Autowired
	IOperatorDAO operatorDAOImpl;
	
	public void getFriendsListByUID(long uid) {

		operatorDAOImpl.getFriendsListByUID(uid);
	}
}
