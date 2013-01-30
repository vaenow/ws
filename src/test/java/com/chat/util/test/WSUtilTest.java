/**
 *
 * Copyright (c) 2012 NCS Corporation.
 *
 * Author: luowen
 * Created Date: Jan 30, 2013
 * Description:  TODO
 * Change history
 *  =======================================================
 * version					author					remark
 *	1.0						luowen				
 */
package com.chat.util.test;

import org.junit.Test;

import com.chat.jdbc.ws.to.WSMessageTO;
import com.chat.util.WSUtil;

/**
 * @author luowen
 *
 */
public class WSUtilTest {

	@Test
	public void handleJSONTest() {
		WSMessageTO msg = null;
		String json = "";
		
		json = "{\"ctn\":\"content content\",\"sder\":1,\"rcver\":2,\"token\":1359511914176}";
		msg = WSUtil.handleJSON(json, WSMessageTO.class);
		
	}
}
