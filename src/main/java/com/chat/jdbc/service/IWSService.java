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

import java.util.List;

import com.chat.jdbc.to.MsgInfoTO;
import com.chat.jdbc.ws.to.WSInitTO;

/**
 * @author luowen
 *
 */
public interface IWSService {
	
	/**
	 * Save Message into database
	 * 
	 * @param msginfo
	 * @return
	 */
	String saveMessage(MsgInfoTO msginfo);

	/**
	 * Get Unread Message
	 *  
	 * @param wsinit
	 * @return
	 */
	List<MsgInfoTO> getUnreadMsg(WSInitTO wsinit);

	/**
	 * Update unread status into READ 
	 * 
	 * @param wsinit
	 * @return 
	 */
	int updUnreadMsg(WSInitTO wsinit);
	
	
}
