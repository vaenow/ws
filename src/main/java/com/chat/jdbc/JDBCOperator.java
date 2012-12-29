/**
 * Websocket IM designer
 * 
 * Date:	Dec 27, 2012
 * ===================================
 * Author			Remark
 * vane				TODO
 * 
 */
package com.chat.jdbc;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import com.chat.jdbc.dao.IJDBCOperator;
import com.chat.jdbc.to.DBQueryTO;
import com.chat.jdbc.to.UserFriendsTO;
import com.chat.jdbc.to.UserInfoTO;
import com.chat.util.Constant;

/**
 * @author vane
 * 
 */
@Repository
public class JDBCOperator/* extends JDBCBaseConnection*/ implements IJDBCOperator {
	Log logger = LogFactory.getLog(JDBCOperator.class);
	
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	private JdbcTemplate jdbcTemplate;

	/**
	 * 	用戶信息緩存
	 */
	Map<Long, UserInfoTO> userInfoCache = new HashMap<Long, UserInfoTO>();
	
	public void setDataSource(DataSource dataSource) {
		this.setJdbcTemplate(new JdbcTemplate(dataSource));
		this.setNamedParameterJdbcTemplate(new NamedParameterJdbcTemplate(dataSource));
	}

	public void setNamedParameterJdbcTemplate(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
		this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate() {
		return namedParameterJdbcTemplate;
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}
	
	/**
	 * 查询建立映射关系
	 */
	private ParameterizedRowMapper<UserFriendsTO> mapper1 = new ParameterizedRowMapper<UserFriendsTO>() {
		public UserFriendsTO mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			UserFriendsTO record = new UserFriendsTO();
			record.setFid(rs.getLong(1));
			record.setOwner(rs.getLong(2));
			record.setFriend(rs.getLong(3));
			record.setCreateDateTime(rs.getDate(4));
			record.setCreateIPAddress(rs.getString(5));
			record.setOwnerInfoTO(getUserInfo(record.getOwner()));
			record.setFriendInfoTO(getUserInfo(record.getFriend()));
			return record;
		}
	};
	
	private ParameterizedRowMapper<UserInfoTO> mapper2 = new ParameterizedRowMapper<UserInfoTO>() {
		public UserInfoTO mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			UserInfoTO record = new UserInfoTO();
			record.setUid(rs.getLong(1));
			record.setName(rs.getString(2));
			record.setPassw(rs.getString(3));
			record.setCreateDateTime(rs.getDate(4));
			record.setCreateIPAddress(rs.getString(5));
			return record;
		}
	};
	
	/**
	 * 得到指定用户的朋友
	 * */
	public List<UserFriendsTO> getFriendsByUID(final long uid) {
		logger.fatal("getting friends by user id: "+ uid);
		
		String sql = Constant.JDBCConnection.GET_USER_FRIENDS_BY_UID;
		DBQueryTO bean  = new DBQueryTO();
		bean.setUid(uid);
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(bean);
		return this.getNamedParameterJdbcTemplate().query(sql, namedParameters, mapper1);
	}

	/**
	 * 得到指定用户
	 * */
	public UserInfoTO getUserInfo(final long uid) {
		if (!userInfoCache.containsKey(uid)) {
			logger.fatal("getting user id: " + uid);

			String sql = Constant.JDBCConnection.GET_USER_INFO;
			DBQueryTO bean = new DBQueryTO();
			bean.setUid(uid);
			SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(bean);
			userInfoCache.put(uid, this.getNamedParameterJdbcTemplate().query(sql, namedParameters, mapper2).get(0));
		}
		return userInfoCache.get(uid);
	}
	
}
