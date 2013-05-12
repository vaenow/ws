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

		//得到用户好友列表 - by uid
		String GET_USER_FRIENDS_BY_UID 	= "SELECT * FROM u_friends f WHERE f.f_owner = :uid ORDER BY f.f_rank DESC, f.f_friend ASC";
		//用户基本信息
		String GET_USER_INFO 			= "SELECT * FROM u_info i WHERE i.u_id = :uid";
		//用户详细信息
		String GET_USER_DETAILS 		= "SELECT * FROM u_details d WHERE d.u_id = :uid";
		//保存消息
		String SAVE_MESSAGE 			= "INSERT INTO msg_info (msg_from, msg_to, msg_ty, msg_cnt, msg_crt_dttm, msg_crt_ip, msg_unread, msg_isdelete) VALUES (:msg_from, :msg_to, :msg_ty, :msg_cnt, :msg_crt_dttm, :msg_crt_ip, :msg_unread, :msg_isdelete)";
		//最近插入的ID值
		String LAST_INSERT_ID			= "SELECT LAST_INSERT_ID()";
		//未读消息
		String GET_UNREAD_MSG			= "SELECT * FROM msg_info WHERE msg_unread=1 AND msg_from=:reciever AND msg_to=:sender";
		//登录检查
		String LOGIN_CHECK				= "SELECT * FROM u_info WHERE u_name=:name AND u_passw=:passw";
		//新用户注册
		String USER_REGIST				= "INSERT INTO u_info (u_name, u_passw, u_crt_dttm, u_crt_ip, u_active) VALUES (:name, :passw, :createDateTime, :createIPAddress, :active)";
		//用户基本信息 - by uid
		String GET_USER_INFO_BY_NAME	= "SELECT * FROM u_info WHERE u_name = :name";
		//添加用户详细信息
		String ADD_USER_DETAILS			= "INSERT INTO u_details (u_id, u_alias, u_mobile, u_email, u_updt_ip, u_updt_dttm, u_img_head,u_img_bg, u_phrase, u_gender, u_age, u_real_m, u_remark, u_vipcode, u_extras) VALUES (:uid, :alias, :mobile, :email, :updateIPAddress, :updateDateTime, :headImg, :bgImg, :phrase,:gender, :age, :realName, :remark, :vipcode, :extras)";
		//为某用户添加好友
		String ADD_FRIENDS_TO_USER		= "INSERT INTO u_friends (f_owner, f_friend, f_crt_dttm, f_crt_ip, f_type, f_id_parent, f_rank) VALUES (:owner, :friend, :createDateTime, :createIPAddress, :type, :idParent, :rank)";
		//删除用户的某位好友
		String DEL_FRIENDS				= "DELETE FROM u_friends WHERE f_owner=:owner AND f_friend=:friend";
		//得到一定的用户
		String GET_ACTIVE_USERS			= "SELECT d.* FROM u_details d, u_info i WHERE i.u_id=d.u_id AND i.u_active=1 LIMIT :start, :length";
		//根据owner&friend查询好友
		String GET_USER_FRIENDS_BY_OWNER_FRD = "SELECT * FROM u_friends WHERE f_owner=:owner AND f_friend=:friend";
		//根据uid更新用户详细信息
		String UPD_USR_INFO				= "UPDATE u_details SET  u_alias=:alias, u_img_head=:headImg, u_phrase=:phrase WHERE u_id=:uid";
		//未读消息更新为已读
		String UPD_UNREAD_MSG 			= "UPDATE msg_info SET msg_unread=0 WHERE msg_unread=1 AND msg_from=:reciever AND msg_to=:sender";
		//某用户所有未读消息数量
		String GET_ALL_UNREAD_MSG 		= "SELECT d.u_alias, m.msg_from, d2.u_alias, m.msg_to, COUNT(m.msg_from) AS cnt FROM msg_info m, u_details d, u_details d2 WHERE m.msg_to=d2.u_id AND m.msg_from=d.u_id AND m.msg_unread=1 AND m.msg_to=:uid GROUP BY m.msg_from";
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
		String SC_FORMAT 				= "{'data':[{'id':'main','iconName':'[%name%]','iconUrl':'%iconUrl%','title':'[%name%]','url':'','width':279,'height':520,'resize':true,'conf':{'frameCont':'listContTemp'}}," +
													"{'id':'flist','iconName':'查找用户','iconUrl':'img/shortcut/news.png','title':'friends','url':'/vers2/usrlist.html','width':365,'height':384,'resize':true,'conf':{'frameCont':'listAllTemp'}}]}";
		
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
		
		// get info structure
		String GET_INFO_STRUCTURE		= "infostruct";
		
		// get a amount of users
		String GET_ACTIVE_USERS 		= "gau";
		
		// user login
		String USER_LOGIN				= "login";
		
		// user regist
		String USER_REGIST				= "regist";

		// user is login
		String CHECK_LOGIN 				= "isLogin";

		// add user friends
		String ADD_USR_FRIEND			= "addu";

		// delete user friends
		String DEL_USR_FRIEND			= "delu";
		
		// update user details info
		String UPD_USR_INFO				= "updinfo";

		// get user status - online,offLine etc.
		String GET_USR_STATUS 			= "gus";

		//get all unread messages
		String GET_ALL_UNREAD_MSG 		= "gaurmsg";
		
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
		
		//Table: u_info
		byte USR_ACTIVE					= 1;	//user active
		byte USR_INACTIVE				= 0;	//user not active
		
		//Table: u_details
		byte UD_GENDER_MALE				= 1;	//user details male
		byte UD_GENDER_FEMALE			= 2;	//user details female
		byte UD_GENDER_OTHERS			= 3;	//user details other
		
		int UD_VIP_NONE					= 0;	//none vip
		int UD_VIP_1					= 1;	//vip class 1
		int UD_VIP_2					= 2;	//vip class 2
		int UD_VIP_3					= 3;	//vip class 3
		
		int UD_EXTRAS_NONE				= 0;	//none extras
		
		//Table: u_friends
		int UF_TYPE_NORMAL				= 0;	//is not a group folder
		int UF_TYPE_GROUP				= 1;	//a group folder
		
		int UF_PARENT_NONE				= 0;	//do not have parent note
		
		int UF_RANK_NONE				= 0;	//do not have rank
		
		//Table: 
	}
	
	//websocket connection config
	public interface WSConn {
		int MAX_IDLE_TIME 				= (int)TimeUnit.DAYS.toMillis(1);	//maxIdleTime
	}
	
	public interface Strs {

	}
	
	public interface Common {
		int LOGIN_SUCCESS				= 1;	//login success;
		int LOGIN_FAILURE				= 0;	//login fail;
		
		byte WSMSG_TYPE_SYSTEM			= 1;	//system websocket message type
		byte WSMSG_TYPE_NORMAL			= 0;	//normal websocket message type
		byte WSMSG_TYPE_USR_SHAKE		= 2;	//user send a shake action
		
		long WSMSG_SENDER_SYSTEM		= 0;	//system is the sender of message;
		
		byte USR_OFFLINE				= 10;	//user status offLine
		byte USR_ONLINE					= 11;	//user status online
		byte USR_LEAVE					= 12;	//user status leave
		byte USR_INVISIBLE				= 13;	//user status invisible
		
		byte USR_STATUS_CHG				= 20;	//user status changed

		byte USR_LOGIN_TOKEN 			= -1;	// '-1' is an user login token.
		
		byte SHOW_UNREAD_MSG 			= 30;	// show unread messages
		
	}
}
