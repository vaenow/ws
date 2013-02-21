/**
 * Websocket IM designer
 * 
 * Date:	Dec 27, 2012
 * ===================================
 * Author			Remark
 * vane				TODO
 * 
 */
package com.chat.jdbc.dao.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import com.chat.jdbc.dao.IOperatorDAO;
import com.chat.jdbc.to.DBQueryTO;
import com.chat.jdbc.to.UserDetailsTO;
import com.chat.jdbc.to.UserFriendsTO;
import com.chat.jdbc.to.UserInfoTO;
import com.chat.util.Constant;
import com.chat.util.WSUtil;

/**
 * @author vane
 * 
 */
@Repository
public class OperatorDAOImpl extends BaseConnectorDAOImpl implements IOperatorDAO {
	Log logger = LogFactory.getLog(OperatorDAOImpl.class);
	
	
	/**
	 * 查询建立映射关系
	 */
	private ParameterizedRowMapper<UserFriendsTO> userFriendsMapper = new ParameterizedRowMapper<UserFriendsTO>() {
		@Override
		public UserFriendsTO mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			UserFriendsTO record = new UserFriendsTO();
			record.setFid(rs.getLong(1));
			record.setOwner(rs.getLong(2));
			record.setFriend(rs.getLong(3));
			record.setCreateDateTime(rs.getDate(4));
			record.setCreateIPAddress(rs.getString(5));
			record.setOwnerDetailsTO(getUserDetails(record.getOwner()));
			record.setFriendDetailsTO(getUserDetails(record.getFriend()));
			return record;
		}
	};
	
	private ParameterizedRowMapper<UserInfoTO> userInfoMapper = new ParameterizedRowMapper<UserInfoTO>() {
		@Override
		public UserInfoTO mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			UserInfoTO record = new UserInfoTO();
			record.setUid(rs.getLong(1));
			record.setName(rs.getString(2));
			record.setPassw(rs.getString(3));
			record.setCreateDateTime(rs.getDate(4));
			record.setCreateIPAddress(rs.getString(5));
			record.setActive(rs.getByte(6));
			return record;
		}
	};	
	
	private ParameterizedRowMapper<UserDetailsTO> userDetailsMapper = new ParameterizedRowMapper<UserDetailsTO>() {
		@Override
		public UserDetailsTO mapRow(ResultSet rs, int rowNum)
				throws SQLException {
			UserDetailsTO record = new UserDetailsTO();
			record.setUid(rs.getLong(1));
			record.setAlias(rs.getString(2));
			record.setMobile(rs.getString(3));
			record.setEmail(rs.getString(4));
			record.setUpdateIPAddress(rs.getString(5));
			record.setUpdateDateTime(rs.getDate(6));
			record.setHeadImg(rs.getString(7));
			record.setBgImg(rs.getString(8));
			record.setPhrase(rs.getString(9));
			record.setUserInfoTO(getUserInfo(record.getUid()));
			return record;
		}
	};
	
	/**
	 * 得到指定用户的朋友
	 * */
	@Override
//	@Cacheable(value = "userFriends")
	public List<UserFriendsTO> getFriendsListByUID(final long uid) {
		logger.fatal("getting friends by user id: "+ uid);
		
		String sql = Constant.JDBCConnection.GET_USER_FRIENDS_BY_UID;
		DBQueryTO bean  = new DBQueryTO();
		bean.setUid(uid);
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(bean);
		return this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userFriendsMapper);
	}

	/**
	 * 得到指定用户
	 * */
	@Override
//	@Cacheable(value = "userInfo")
	public UserInfoTO getUserInfo(final long uid) {
		if (!wscaches.userInfoCache.containsKey(uid)) {
			logger.fatal("getting user id: " + uid);

			String sql = Constant.JDBCConnection.GET_USER_INFO;
			DBQueryTO bean = new DBQueryTO();
			bean.setUid(uid);
			SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(bean);
			wscaches.userInfoCache.put(uid, this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userInfoMapper).get(0));
		}
		return wscaches.userInfoCache.get(uid);
//			return this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userInfoMapper).get(0);
	}

	/**
	 * 得到指定用户详细资料
	 * */
	@Override
//	@Cacheable(value = "userDetails")
	public UserDetailsTO getUserDetails(final long uid) {
		if (!wscaches.userDetailsCache.containsKey(uid)) {
			logger.fatal("getting user details by id: " + uid);

			String sql = Constant.JDBCConnection.GET_USER_DETAILS;
			DBQueryTO bean = new DBQueryTO();
			bean.setUid(uid);
			SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(bean);
			wscaches.userDetailsCache.put(uid, this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userDetailsMapper).get(0));
		}
		return wscaches.userDetailsCache.get(uid);
//			return this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userDetailsMapper).get(0);
	}

	@Override
	public List<UserInfoTO> isAllowToLogin(UserInfoTO ui) {
		// TODO Auto-generated method stub
		logger.fatal("getting user details by id: " + WSUtil.stringifyJSON(ui));

		String sql = Constant.JDBCConnection.LOGIN_CHECK;
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(ui);
		return this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userInfoMapper);
		
	}
	
}
