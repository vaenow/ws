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

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import com.chat.jdbc.dao.IWSDAO;
import com.chat.jdbc.to.MsgInfoTO;
import com.chat.util.Constant;
import com.chat.util.WSUtil;

/**
 * @author luowen
 *
 */
@Repository
public class WSDAOImpl extends BaseConnectorDAOImpl implements IWSDAO {

	/**
	 * 查询建立映射关系
	 */
	private ParameterizedRowMapper<MsgInfoTO> wsChatMsgInfoMapper = new ParameterizedRowMapper<MsgInfoTO>() {
		@Override
		public MsgInfoTO mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			MsgInfoTO record = new MsgInfoTO();
			record.setMsg_id(rs.getLong(1));
			record.setMsg_from(rs.getLong(2));
			record.setMsg_to(rs.getLong(3));
			record.setMsg_ty(rs.getByte(4));
			record.setMsg_cnt(rs.getString(5));
			record.setMsg_crt_dttm(rs.getDate(6));
			record.setMsg_crt_ip(rs.getString(7));
			record.setMsg_unread(rs.getByte(8));
			record.setMsg_isdelete(rs.getByte(9));
			return record;
		}
	};
	
	
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

}
