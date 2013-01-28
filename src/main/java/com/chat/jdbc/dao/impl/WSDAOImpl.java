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
package com.chat.jdbc.dao.impl;

import org.springframework.stereotype.Repository;

import com.chat.jdbc.dao.IWSDAO;

/**
 * @author luowen
 *
 */
@Repository
public class WSDAOImpl extends BaseConnectorDAOImpl implements IWSDAO {

	/* (non-Javadoc)
	 * @see com.chat.jdbc.dao.IWSServiceDAO#saveMessage(java.lang.String)
	 */
	@Override
	public String saveMessage(String msg) {
		// TODO Auto-generated method stub
		return msg;
	}

}
