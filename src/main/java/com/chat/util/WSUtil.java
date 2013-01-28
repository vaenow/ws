/**
 * Websocket IM designer
 * 
 * Date:	Dec 31, 2012
 * ===================================
 * Author			Remark
 * vane				TODO
 * 
 */
package com.chat.util;

import org.springframework.context.ApplicationContext;

import com.chat.jdbc.service.IWSService;

/**
 * @author vane
 * 
 */
public class WSUtil {

	private static IWSService wsService;
	
	public static IWSService getWsService() {
		return wsService;
	}

	public static void setWsService(IWSService wsService) {
		WSUtil.wsService = wsService;
	}

	public static String formatUtil(String str, String regex, String replacement) {
		
		StringBuilder sb = new StringBuilder();
		try {
			String[] s = str.split(regex);
			sb.append(s[0]).append(replacement).append(s[1]);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return sb.toString();
	}
	
}
