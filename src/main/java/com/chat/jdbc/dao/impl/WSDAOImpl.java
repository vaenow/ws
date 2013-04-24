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

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import com.chat.jdbc.dao.IWSDAO;
import com.chat.jdbc.to.MsgInfoTO;
import com.chat.jdbc.ws.to.WSInitTO;
import com.chat.util.Constant;
import com.chat.util.WSUtil;

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
	public String saveMessage(MsgInfoTO msginfo) {
		// TODO Auto-generated method stub
		logger.fatal("saving message.");
		
		String sql = Constant.JDBCConnection.SAVE_MESSAGE;
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(msginfo);
		this.getNamedParameterJdbcTemplate().update(sql, namedParameters);
		return WSUtil.stringifyJSON(msginfo);
	}


	@Override
	public List<MsgInfoTO> getUnreadMsg(WSInitTO wsinit) {
		// TODO Auto-generated method stub
		logger.fatal("getting unread message.");
		
		String sql = Constant.JDBCConnection.GET_UNREAD_MSG;
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(wsinit);
		return this.getNamedParameterJdbcTemplate().query(sql, namedParameters, wsChatMsgInfoMapper);
	}


	@Override
	public int updUnreadMsg(WSInitTO wsinit) {
		// TODO Auto-generated method stub
		logger.fatal("updating unread status into READ.");

		String sql = Constant.JDBCConnection.UPD_UNREAD_MSG;
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(wsinit);
		return this.getNamedParameterJdbcTemplate().update(sql, namedParameters);
	}

}
