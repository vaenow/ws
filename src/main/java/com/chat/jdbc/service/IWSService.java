/**
 *
 * Author: luowen
 * Created Date: Jan 28, 2013
 * Description:  TODO
 * Change history
 *  =======================================================
 * version					author					remark
 *	1.0						luowen				
 */
package com.chat.jdbc.service;

import com.chat.jdbc.to.MsgInfoTO;

/**
 * @author luowen
 *
 */
public interface IWSService {
	
	String saveMessage(MsgInfoTO msginfo);
}
