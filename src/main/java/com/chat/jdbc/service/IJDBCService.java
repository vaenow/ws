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

import com.chat.jdbc.to.UserFriendsTO;

/**
 * @author vane
 *
 */
public interface IJDBCService {

	List<UserFriendsTO> getFriendsListByUID(long i);

}
