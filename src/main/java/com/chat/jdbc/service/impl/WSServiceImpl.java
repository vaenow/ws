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
package com.chat.jdbc.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.jdbc.dao.IWSDAO;
import com.chat.jdbc.service.IWSService;

/**
 * @author luowen
 *
 */
@Service("wsService")
public class WSServiceImpl implements IWSService {

	@Autowired
	IWSDAO wsDAO;
	
	
	@Override
	public String saveMessage(String msg) {
		// TODO Auto-generated method stub
		return wsDAO.saveMessage(msg);
	}

}
