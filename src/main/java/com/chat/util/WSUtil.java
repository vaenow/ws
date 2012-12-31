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

/**
 * @author vane
 * 
 */
public class WSUtil {

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
