/**
 * Websocket IM designer
 * 
 * Date:	Dec 23, 2012
 * ===================================
 * Author			Remark
 * vane				TODO
 * 
 */
package com.chat.util;

/**
 * @author vane
 * 
 */
public class Constant {

	// Database Connection.
	public interface JDBCConnection {
		
		String GET_USER_FRIENDS_BY_UID = "SELECT * FROM u_friends f WHERE f.f_owner=2 OR f.f_owner = :uid ORDER BY f.f_owner ASC";
		
		String GET_USER_INFO ="SELECT * FROM u_info i WHERE i.u_id = :uid";
	}

	// Database Base Connection.
	public interface JDBCBaseConnection {
		
		String CONNECTION_DRIVER = "jdbc:mysql://localhost:3306/ws?useUnicode=true&characterEncoding=UTF-8";
		String CONNECTION_LOGIN = "root";
		String CONNECTION_PASSW = "root";
	}

}
