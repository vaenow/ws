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
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.chat.jdbc.service.IWSService;

/**
 * @author vane
 * 
 */
public class WSUtil {

	private static Log log = LogFactory.getLog(WSUtil.class);
	
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

	/**
	 * Jackson 操作对象
	 */
	private static ObjectMapper mapper = new ObjectMapper();

	

	//------------------------------------------------------//

	public static IWSService getWsService() {
		return wsService;
	}
	
	public static void setWsService(IWSService wsService) {
		WSUtil.wsService = wsService;
	}
	
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
	
	/**
	 * Jackson库 将对象转为JSON字符串
	 * 
	 * @param obj
	 * @return
	 */
	public static String stringifyJSON(Object obj){
		try {
			return mapper.writeValueAsString(obj);
		} catch (JsonGenerationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "JsonGenerationException; JsonMappingException; IOException;";
	}
	
	/**
	 * Log Object all 'get' methods.
	 * 
	 * @param obj
	 */
	public static void logGettingMethods(Object obj, Class clazz) {
		log.info(obj);
		Method[] methods = clazz.getDeclaredMethods();// 类的方法
		for (Method method : methods) {
			String methodName = method.getName();
			if (methodName.startsWith("get") && !methodName.equals("getClass")) {// 如果方法名以get开头
				Object value = null;
				try {
					value = method.invoke(obj);
				} catch (IllegalArgumentException e) {
//					e.printStackTrace();
				} catch (IllegalAccessException e) {
//					e.printStackTrace();
				} catch (InvocationTargetException e) {
//					e.printStackTrace();
				}// 调用方法,并打印返回值
				System.out.println("\t "+methodName+": "+value+", ");
			}
		}
	}
}
