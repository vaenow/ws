package com.chat.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ApplicationObjectSupport;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chat.jdbc.service.IJDBCService;
import com.chat.jdbc.to.UserDetailsTO;
import com.chat.jdbc.to.UserFriendsTO;
import com.chat.jdbc.to.UserInfoTO;
import com.chat.jdbc.ws.to.AllowLoginTO;
import com.chat.jdbc.ws.to.QueryUserTO;
import com.chat.jdbc.ws.to.RegisterUserTO;
import com.chat.jdbc.ws.to.ResponseTO;
import com.chat.jdbc.ws.to.UserStatusTO;
import com.chat.jdbc.ws.to.WSInitTO;
import com.chat.jdbc.ws.to.WSMessageTO;
import com.chat.jdbc.ws.to.WSUpdateInfoTO;
import com.chat.util.Constant;
import com.chat.util.WSUtil;
import com.chat.ws.ChatWebSocket;
import com.chat.ws.WebSocketChatServlet;

@Controller
public class AjaxServlet extends ApplicationObjectSupport{

	Log log = LogFactory.getLog(AjaxServlet.class); 
	
	@Autowired
	IJDBCService JDBCService;
	
	/**
	 * Ajax requests dispatcher
	 * 请求分发器
	 * 
	 * @param req
	 * @param resp
	 * @throws IOException
	 */
	@RequestMapping(value = "/handle")
	@ResponseBody
	public void handle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		// 处理编码问题
		// req.setCharacterEncoding("UTF-8");
		// resp.setContentType("text/html;charset=UTF-8");
		String action = req.getParameter("act");
		String result = "";
		
		if (action.equals(Constant.ACTION_TYPE.GET_SHORTCUTS)) {
			result = getShortcuts(req);
		}else if(action.equals(Constant.ACTION_TYPE.GET_USER_FRIENDS_LIST)) {
			result = getUserFriendsList(req);
		}else if(action.equals(Constant.ACTION_TYPE.GET_USER_DETAILS)){
			result = getUserDetails(req);
		}else if(action.equals(Constant.ACTION_TYPE.USER_LOGIN)) {
			result = userLogin(req);
		}else if(action.equals(Constant.ACTION_TYPE.USER_REGIST)) {
			result = userRegist(req);
		}else if(action.equals(Constant.ACTION_TYPE.CHECK_LOGIN)){
			result = checkLogin(req);
		}else if(action.equals(Constant.ACTION_TYPE.GET_ACTIVE_USERS)){
			result = getActiveUsers(req);
		}else if(action.equals(Constant.ACTION_TYPE.ADD_USR_FRIEND)){
			result = addUserFriend(req);
		}else if(action.equals(Constant.ACTION_TYPE.DEL_USR_FRIEND)){
			result = deleteUserFriend(req);
		}else if(action.equals(Constant.ACTION_TYPE.GET_INFO_STRUCTURE)){
			result = getInfoStructure(req);
		}else if(action.equals(Constant.ACTION_TYPE.UPD_USR_INFO)){
			result = updateUserInfo(req);
		}else if(action.equals(Constant.ACTION_TYPE.GET_USR_STATUS)){
			result = getUserStatus(req);
		}else if(action.equals(Constant.ACTION_TYPE.GET_ALL_UNREAD_MSG)){
			result = getAllUnreadMsg(req);
		}

		System.out.println("action: " + action);
		System.out.println("result: " + result.replaceAll("'", "\""));
		//WSUtil.logGettingMethods(req, req.getClass());	//log request 'get' properties.
		
		resp.getWriter().write(result.replaceAll("'", "\""));
	}

	private String getAllUnreadMsg(HttpServletRequest req) {
		long uid = this.parseUID(req);
		List<WSMessageTO> wsmsgto = JDBCService.getAllUnreadMsg(uid);
		return WSUtil.stringifyJSON(wsmsgto);
	}

	private String getUserStatus(HttpServletRequest req) {
		WebSocketChatServlet wscs = WSUtil.getWebSocketChatServlet();
		log.info(wscs.users);
		Set<ChatWebSocket> users = wscs.users;
		Map<Long, UserStatusTO> map = new HashMap<Long, UserStatusTO>();
		UserStatusTO us = null;
		for(ChatWebSocket user:users){
			long uid = user.getWsInitial().getSender();
			us = new UserStatusTO();
			us.setUid(uid);
			us.setStatus(Constant.Common.USR_ONLINE);
			map.put(uid, us);
		}
		
		return WSUtil.stringifyJSON(map);
	}

	private String getShortcuts(HttpServletRequest req) {
		return Constant.AJAX_FORMATS.SC_FORMAT;
	}

	private String updateUserInfo(HttpServletRequest req) {
		Map<String, String> map = new HashMap<String, String>();
		Enumeration<String> en = req.getParameterNames();
		while(en.hasMoreElements()){
			String key = en.nextElement();
			map.put(key, req.getParameter(key));
		}
		map.remove("act");
		WSUpdateInfoTO updinfo = WSUtil.convert2JSON(map, WSUpdateInfoTO.class);
		//String json = WSUtil.stringifyJSON(map);
		//WSUpdateInfoTO upd  = WSUtil.handleJSON(json, WSUpdateInfoTO.class);
		JDBCService.updateUserInfo(updinfo);
		ResponseTO respTO = new ResponseTO();
		respTO.setSuccess(true);
		WSUtil.getWSCaches().cleanCaches();//clean caches
		
		return WSUtil.stringifyJSON(respTO); 
	}

	private String getInfoStructure(HttpServletRequest req) {
		List<Object> list = new ArrayList<Object>();
		list.add(new WSMessageTO());
		list.add(new WSUpdateInfoTO());
		list.add(new WSInitTO());
		
		return WSUtil.stringifyJSON(list);
	}

	private String deleteUserFriend(HttpServletRequest req) {
		long friendOwner = Long.parseLong(req.getParameter("owner"));
		long friend = Long.parseLong(req.getParameter("friend"));
		boolean isSuccess = false;
		ResponseTO responseTO = new ResponseTO();
		UserFriendsTO ufriendsTO = new UserFriendsTO();
		ufriendsTO.setOwner(friendOwner);
		ufriendsTO.setFriend(friend);
		if(JDBCService.delUserFriend(ufriendsTO) >= 1){
			isSuccess = true;
		}
		responseTO.setSuccess(isSuccess);
		
		return WSUtil.stringifyJSON(responseTO);
	}

	private String addUserFriend(HttpServletRequest req) {
		long friendOwner = Long.parseLong(req.getParameter("owner"));
		long friend = Long.parseLong(req.getParameter("friend"));
		boolean isSuccess = false;
		ResponseTO responseTO = new ResponseTO();
		UserFriendsTO ufriendsTO = new UserFriendsTO();
		ufriendsTO.setOwner(friendOwner);
		ufriendsTO.setFriend(friend);
		ufriendsTO.setCreateDateTime(Calendar.getInstance().getTime());
		ufriendsTO.setCreateIPAddress(req.getRemoteAddr());
		ufriendsTO.setType(Constant.DB.UF_TYPE_NORMAL);
		ufriendsTO.setIdParent(Constant.DB.UF_PARENT_NONE);
		ufriendsTO.setRank(Constant.DB.UF_RANK_NONE);
		boolean isDuplicated = JDBCService.checkUserFriendDuplicated(ufriendsTO);
		if(!isDuplicated){
			if(JDBCService.addUserFriend(ufriendsTO) == 1){
				isSuccess = true;
			}
		}
		responseTO.setDuplicated(isDuplicated);
		responseTO.setSuccess(isSuccess);
		
		return WSUtil.stringifyJSON(responseTO);
	}

	private String getActiveUsers(HttpServletRequest req) {
		long uid 	= parseUID(req);
		int start 	= Integer.parseInt(req.getParameter("start"));
		int length 	= Integer.parseInt(req.getParameter("len"));
		QueryUserTO qUserTO = new QueryUserTO();
		qUserTO.setUid(uid);
		qUserTO.setStart(start);
		qUserTO.setLength(length);
		List<UserDetailsTO> list = JDBCService.getActiveUsers(qUserTO);

		return WSUtil.stringifyJSON(list);
	}

	private String checkLogin(HttpServletRequest req) {
		String uid = req.getParameter("uid");
		Integer isLogin = (Integer)req.getSession().getAttribute(uid);
		AllowLoginTO aLoginTO = new AllowLoginTO();
		boolean isAllow = false;
		if (isLogin != null && isLogin == Constant.Common.LOGIN_SUCCESS) {
			isAllow = true;
		}
		aLoginTO.setAllow(isAllow);
		
		return WSUtil.stringifyJSON(aLoginTO);
	}

	private String userRegist(HttpServletRequest req) {
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		UserInfoTO ui = new UserInfoTO();
		RegisterUserTO regstTO = new RegisterUserTO();
		boolean isSuccess = false;
		log.info(username);
		log.info(password);
		ui.setName(username);
		ui.setPassw(password);
		ui.setCreateIPAddress(req.getRemoteAddr());
		ui.setCreateDateTime(Calendar.getInstance().getTime());
		ui.setActive(Constant.DB.USR_ACTIVE);
		boolean isDuplicated = JDBCService.checkUserDuplicated(ui);
		if(!isDuplicated){
			if(JDBCService.insertNewUser(ui) == 1){
				isSuccess = true;
			}
		}
		regstTO.setSuccess(isSuccess);
		regstTO.setDuplicated(isDuplicated);
		
		return WSUtil.stringifyJSON(regstTO);
	}

	private String userLogin(HttpServletRequest req) {
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		UserInfoTO ui = new UserInfoTO();
		AllowLoginTO allowTO = new AllowLoginTO();
		boolean isAllow = false;
		log.info(username);
		log.info(password);
		ui.setName(username);
		ui.setPassw(password);
		List<UserInfoTO> list = JDBCService.isAllowToLogin(ui);
		if(!list.isEmpty()){
			isAllow = true;
			allowTO.setUserinfo(list.get(0));
			HttpSession session = req.getSession();
			session.setAttribute(list.get(0).getUid()+"", Constant.Common.LOGIN_SUCCESS);
		}
		allowTO.setAllow(isAllow);
		
		return WSUtil.stringifyJSON(allowTO);
	}

	private String getUserDetails(HttpServletRequest req) {
		long uid = parseUID(req);
		UserDetailsTO list = JDBCService.getUserDetails(uid);
		//TODO
		return WSUtil.stringifyJSON(list);
	}

	private String getUserFriendsList(HttpServletRequest req) {
		long uid = parseUID(req);
		List<UserFriendsTO> list = JDBCService.getFriendsListByUID(uid);
		System.out.println("list.size(): " + list.size());
//		StringBuilder names = new StringBuilder();
//		for (UserFriendsTO friend : list) {
//			String fname = friend.getFriendDetailsTO().getAlias();
//			names.append(WSUtil.formatUtil(Constant.AJAX_FORMATS.FRIENDS_LIST_NAME, Constant.REGX.LIST_NAME_PATERN,
//					"'" + fname + "'"));
//			names.append(",");
//		}
//		names.deleteCharAt(names.length() - 1);
//		result = WSUtil.formatUtil(Constant.AJAX_FORMATS.FRIENDS_LIST, Constant.REGX.LIST_NAME_PATERN,
//				names.toString());
		
		return WSUtil.stringifyJSON(list);
	}

	public static void main(String[] args) {
		// boolean b =
		// Pattern.compile("%[a-zA-z]{0,}%").matcher("asdf#aadd#ass").group();
		boolean b = "asdf#aadd#ass".matches("#[a-zA-z]{0,}#");
		boolean a = "da@%aaDd%sd".matches(".*%[a-zA-z]{0,}%*.");
		"da@%aaDd%sd".split("%[a-zA-z]{0,}%");

		System.out.println(b + " " + a);
	}
	
	private long parseUID(HttpServletRequest req){
		long uid = 1;
		try {
			 uid = Long.parseLong(req.getParameter("uid"));
		} catch (NumberFormatException e) {
			System.err.println("[error]: UID number formate error. "+e);
		} 
		return uid;
	}
	
}
