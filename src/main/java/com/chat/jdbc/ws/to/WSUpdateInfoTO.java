/**
 *
 * Author: luowen
 * Created Date: Mar 20, 2013
 * Description:  TODO
 * Change history
 *  =======================================================
 * version					author					remark
 *	1.0						luowen					initial
 */
package com.chat.jdbc.ws.to;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.chat.jdbc.to.UserDetailsTO;

/**
 * @author luowen
 * 
 */
@JsonIgnoreProperties({ "updateIPAddress", "updateDateTime", "vipcode", "userInfoTO" })
public class WSUpdateInfoTO extends UserDetailsTO {

	private String field;		//update field

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}
	
}
