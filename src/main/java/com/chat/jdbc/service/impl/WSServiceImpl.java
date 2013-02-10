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

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.jdbc.dao.IWSDAO;
import com.chat.jdbc.service.IWSService;
import com.chat.jdbc.to.MsgInfoTO;
import com.chat.jdbc.ws.to.WSInitTO;

/**
 * @author luowen
 *
 */
@Service("wsService")
public class WSServiceImpl implements IWSService {

	@Autowired
	IWSDAO wsDAO;
	
	
	@Override
	public String saveMessage(MsgInfoTO msginfo) {
		// TODO Auto-generated method stub
		return wsDAO.saveMessage(msginfo);
	}


	@Override
	public List<MsgInfoTO> getUnreadMsg(WSInitTO wsinit) {
		// TODO Auto-generated method stub
		return wsDAO.getUnreadMsg(wsinit);
	}

	
}
