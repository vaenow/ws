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
package com.chat.jdbc.dao;

import java.util.List;

import com.chat.jdbc.to.MsgInfoTO;
import com.chat.jdbc.ws.to.WSInitTO;

/**
 * @author luowen
 *
 */
public interface IWSDAO {

	String saveMessage(MsgInfoTO msginfo);

	List<MsgInfoTO> getUnreadMsg(WSInitTO wsinit);
}
