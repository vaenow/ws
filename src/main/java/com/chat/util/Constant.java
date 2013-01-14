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

		String GET_USER_FRIENDS_BY_UID = "SELECT * FROM u_friends f WHERE f.f_owner = :uid ORDER BY f.f_owner ASC";

		String GET_USER_INFO = "SELECT * FROM u_info i WHERE i.u_id = :uid";
		
		String GET_USER_DETAILS = "SELECT * FROM u_details d WHERE d.u_id = :uid";
	}

	// Database Base Connection.
	public interface JDBCBaseConnection {

		String CONNECTION_DRIVER = "jdbc:mysql://localhost:3306/ws?useUnicode=true&characterEncoding=UTF-8";
		String CONNECTION_LOGIN = "root";
		String CONNECTION_PASSW = "root";
	}

	// AJAX JSON response formats.
	public interface AJAX_FORMATS {

		// shortcuts in desktop.
		String SC_FORMAT = "{'data':[{'id':20,'iconName':'自定义窗口','iconUrl':'img/shortcut/news.png','url':'window.html','width':200,'height':300,'resize':true}, {'id':123,'iconName':'好友列表','iconUrl':'img/shortcut/news.png','title':'百度','url':'http://www.baidu.com','width':279,'height':600,'resize':true,'conf':{'frameCont':'listContTemp'}}]}";

		// friends list name.
		String FRIENDS_LIST_NAME = "{'name':%name%}";

		// friends list
		String FRIENDS_LIST = "{'flist':[%listName%]}";
	}

	// AJAX action types.
	public interface ACTION_TYPE {
		// get shortcuts.
		String GET_SHORTCUTS = "gsc";

		// get user friends list.
		String GET_USER_FRIENDS_LIST = "gufl";

	}

	// regx.
	public interface REGX {
		// assertTrue("da@%aaDd%sd".matches(".*%[a-zA-z]{0,}%*.");
		String LIST_NAME_PATERN = "%[a-zA-z]{0,}%";
		
	}

}
