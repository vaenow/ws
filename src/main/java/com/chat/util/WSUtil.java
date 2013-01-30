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

import java.io.IOException;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.context.ApplicationContext;

import com.chat.jdbc.service.IWSService;
import com.chat.jdbc.ws.to.WSMessageTO;

/**
 * @author vane
 * 
 */
public class WSUtil {

	/**
	 * <pre>
	 * 存储IWSService的单例对象。
	 * 
	 * 备注：
	 *     因为SpringMVC3目前版本暂时不支持WebSocket
	 *     所以用此方法绕过Spring的管理。
	 *     此问题留做日后处理。
	 * </pre>
	 */
	private static IWSService wsService;

	public static IWSService getWsService() {
		return wsService;
	}

	public static void setWsService(IWSService wsService) {
		WSUtil.wsService = wsService;
	}

	private static ObjectMapper mapper = new ObjectMapper();

	/**
	 * 字符串模版 格式化JSON
	 * 
	 * @param str
	 * @param regex
	 * @param replacement
	 * @return
	 */

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

	/**
	 * Jackson库  格式化JSON
	 * 
	 * @param json
	 * @param clazz
	 * @return
	 */
	public static <T> T handleJSON(String json, Class<T> clazz){
		Object obj = new Object();
		try {
			obj = mapper.readValue(json, clazz);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return (T) obj;
	}
}
