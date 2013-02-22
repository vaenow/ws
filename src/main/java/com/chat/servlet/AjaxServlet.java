package com.chat.servlet;

import java.io.IOException;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.chat.jdbc.ws.to.WSMessageTO;
import com.chat.util.Constant;
import com.chat.util.WSUtil;

@Controller
public class AjaxServlet {

	Log log = LogFactory.getLog(AjaxServlet.class); 
	
	@Autowired
	IJDBCService JDBCService;

	/**
	 * Get Shortcuts.
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
			result = Constant.AJAX_FORMATS.SC_FORMAT;

		} else if (action.equals(Constant.ACTION_TYPE.GET_USER_FRIENDS_LIST)) {
			long uid = parseUID(req);
			List<UserFriendsTO> list = JDBCService.getFriendsListByUID(uid);

//			StringBuilder names = new StringBuilder();
			System.out.println("list.size(): " + list.size());
//			for (UserFriendsTO friend : list) {
//				String fname = friend.getFriendDetailsTO().getAlias();
//				names.append(WSUtil.formatUtil(Constant.AJAX_FORMATS.FRIENDS_LIST_NAME, Constant.REGX.LIST_NAME_PATERN,
//						"'" + fname + "'"));
//				names.append(",");
//			}
//			names.deleteCharAt(names.length() - 1);
//			result = WSUtil.formatUtil(Constant.AJAX_FORMATS.FRIENDS_LIST, Constant.REGX.LIST_NAME_PATERN,
//					names.toString());
			
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.writeValueAsString(list);
		}else if(action.equals(Constant.ACTION_TYPE.GET_USER_DETAILS)){
			long uid = parseUID(req);
			UserDetailsTO list = JDBCService.getUserDetails(uid);
			//TODO
			ObjectMapper mapper = new ObjectMapper();
			result = mapper.writeValueAsString(list);
		}else if(action.equals(Constant.ACTION_TYPE.GET_WSMSG)){
			result = WSUtil.stringifyJSON(new WSMessageTO());
		}else if(action.equals(Constant.ACTION_TYPE.USER_LOGIN)) {
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
			
			result = WSUtil.stringifyJSON(allowTO);
		}else if(action.equals(Constant.ACTION_TYPE.USER_REGIST)) {
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
			
			result = WSUtil.stringifyJSON(regstTO);
		}else if(action.equals(Constant.ACTION_TYPE.CHECK_LOGIN)){
			String uid = req.getParameter("uid");
			Integer isLogin = (Integer)req.getSession().getAttribute(uid);
			AllowLoginTO aLoginTO = new AllowLoginTO();
			boolean isAllow = false;
			if (isLogin != null && isLogin == Constant.Common.LOGIN_SUCCESS) {
				isAllow = true;
			}
			aLoginTO.setAllow(isAllow);
			
			result = WSUtil.stringifyJSON(aLoginTO);
		}else if(action.equals(Constant.ACTION_TYPE.GET_ACTIVE_USERS)){
			long uid 	= parseUID(req);
			int start 	= Integer.parseInt(req.getParameter("start"));
			int length 	= Integer.parseInt(req.getParameter("len"));
			QueryUserTO qUserTO = new QueryUserTO();
			qUserTO.setUid(uid);
			qUserTO.setStart(start);
			qUserTO.setLength(length);
			List<UserDetailsTO> list = JDBCService.getActiveUsers(qUserTO);
			

			result = WSUtil.stringifyJSON(list);
		}

		System.out.println("action: " + action);
		System.out.println("result: " + result.replaceAll("'", "\""));
		//WSUtil.logGettingMethods(req, req.getClass());	//log request 'get' properties.
		
		resp.getWriter().write(result.replaceAll("'", "\""));
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
