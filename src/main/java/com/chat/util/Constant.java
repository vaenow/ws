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

import java.util.concurrent.TimeUnit;

/**
 * @author vane
 * 
 */
public class Constant {

	// Database Connection.
	public interface JDBCConnection {

		String GET_USER_FRIENDS_BY_UID 	= "SELECT * FROM u_friends f WHERE f.f_owner = :uid ORDER BY f.f_owner ASC";

		String GET_USER_INFO 			= "SELECT * FROM u_info i WHERE i.u_id = :uid";
		
		String GET_USER_DETAILS 		= "SELECT * FROM u_details d WHERE d.u_id = :uid";
		
		String SAVE_MESSAGE 			= "INSERT INTO msg_info (msg_from, msg_to, msg_ty, msg_cnt, msg_crt_dttm, msg_crt_ip, msg_unread, msg_isdelete) VALUES (:msg_from, :msg_to, :msg_ty, :msg_cnt, :msg_crt_dttm, :msg_crt_ip, :msg_unread, :msg_isdelete)";

		String LAST_INSERT_ID			= "SELECT LAST_INSERT_ID()";
		
		String GET_UNREAD_MSG			= "SELECT * FROM msg_info WHERE msg_unread=1 AND msg_from=:reciever AND msg_to=:sender";
		
		String LOGIN_CHECK				= "SELECT * FROM u_info WHERE u_name=:name AND u_passw=:passw";
		
		String USER_REGIST				= "INSERT INTO u_info (u_name, u_passw, u_crt_dttm, u_crt_ip, u_active) VALUES (:name, :passw, :createDateTime, :createIPAddress, :active)";
	}

	// Database Base Connection.
	public interface JDBCBaseConnection {

		String CONNECTION_DRIVER 		= "jdbc:mysql://localhost:3306/ws?useUnicode=true&characterEncoding=UTF-8";
		String CONNECTION_LOGIN 		= "root";
		String CONNECTION_PASSW 		= "root";
	}

	// AJAX JSON response formats.
	public interface AJAX_FORMATS {

		// shortcuts in desktop.
		//String SC_FORMAT 				= "{'data':[{'id':20,'iconName':'自定义窗口','iconUrl':'img/shortcut/news.png','url':'window.html','width':200,'height':300,'resize':true}, {'id':123,'iconName':'[%name%]好友列表','iconUrl':'img/shortcut/news.png','title':'百度','url':'http://www.baidu.com','width':279,'height':600,'resize':true,'conf':{'frameCont':'listContTemp'}}]}";
		String SC_FORMAT 				= "{'data':[{'id':123,'iconName':'[%name%]好友列表','iconUrl':'img/shortcut/news.png','title':'百度','url':'http://www.baidu.com','width':279,'height':520,'resize':true,'conf':{'frameCont':'listContTemp'}}]}";
		
		// friends list name.
		String FRIENDS_LIST_NAME 		= "{'name':%name%}";

		// friends list
		String FRIENDS_LIST 			= "{'flist':[%listName%]}";
	}

	// AJAX action types.
	public interface ACTION_TYPE {
		// get shortcuts.
		String GET_SHORTCUTS 			= "gsc";

		// get user friends list.
		String GET_USER_FRIENDS_LIST 	= "gufl";
		
		// get user details.
		String GET_USER_DETAILS 		= "gud";
		
		// get websocket message to
		String GET_WSMSG 				= "gwsm";
		
		// user login
		String USER_LOGIN				= "login";
		
		// user regist
		String USER_REGIST				= "regist";

	}

	// regx.
	public interface REGX {
		// assertTrue("da@%aaDd%sd".matches(".*%[a-zA-z]{0,}%*.");
		String LIST_NAME_PATERN 		= "%[a-zA-z]{0,}%";
		
	}

	//caches management 缓存管理
	public interface CACHE {
		// 初始化延迟-时间
		long INITIAL_DELAY				= 60;

		// 周期-时间
		long PERIOD 					= 60;
		
		// 时间类型
		TimeUnit TIME_UNIT 				= TimeUnit.SECONDS;
	}
	
	//数据库内各常量汇总
	public interface DB {
		//Table: msg_info
		byte MSG_INFO_TYPE_TEXT 		= 1;	//text
		byte MSG_INFO_TYPE_BINARY 		= 2;	//binary
		byte MSG_INFO_TYPE_OTHERS		= 3;	//others
		
		byte MSG_INFO_UNREAD 			= 1;	//not read
		byte MSG_INFO_READ				= 0;	//already read
		
		byte MSG_INFO_ISDELETE_Y		= 1;	//already delete
		byte MSG_INFO_ISDELETE_N		= 0;	//not delete.
		
		//Table: 
	}
	
	//websocket connection config
	public interface WSConn {
		int MAX_IDLE_TIME 				= (int)TimeUnit.DAYS.toMillis(1);	//maxIdleTime
	}
	
	public interface Strs {

	}
}
