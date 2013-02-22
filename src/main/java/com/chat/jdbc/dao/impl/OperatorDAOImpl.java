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

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

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
import com.chat.jdbc.ws.to.QueryUserTO;
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
			record.setGender(rs.getByte(10));
			record.setAge(rs.getByte(11));
			record.setRealName(rs.getString(12));
			record.setRemark(rs.getString(13));
			record.setVipcode(rs.getInt(14));
			record.setExtras(rs.getInt(15));
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
		logger.fatal("isAllowToLogin: " + WSUtil.stringifyJSON(ui));

		String sql = Constant.JDBCConnection.LOGIN_CHECK;
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(ui);
		return this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userInfoMapper);
		
	}

	@Override
	public int insertNewUser(UserInfoTO ui) {
		// TODO Auto-generated method stub
		logger.fatal("insertNewUser: " + WSUtil.stringifyJSON(ui));

		// insert new user
		String sql = Constant.JDBCConnection.USER_REGIST;
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(ui);
		int effectedRows = this.getNamedParameterJdbcTemplate().update(sql, namedParameters);
		
		// get LAST_INSERT_ID
		sql = Constant.JDBCConnection.GET_USER_INFO_BY_NAME;
		namedParameters = new BeanPropertySqlParameterSource(ui);
		UserInfoTO uinfoTO = this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userInfoMapper).get(0);
		
		// add extra details.
		sql = Constant.JDBCConnection.ADD_USER_DETAILS;
		UserDetailsTO udetailsTO = new UserDetailsTO();
		int rd = new Random().nextInt(20)+1;
		String random = rd < 10 ? "0" + rd : "" + rd;
		udetailsTO.setUid(uinfoTO.getUid());
		udetailsTO.setAlias(ui.getName()+"-"+random);
		udetailsTO.setMobile("mobile-"+random);
		udetailsTO.setEmail("email-"+random);
		udetailsTO.setUpdateIPAddress(ui.getCreateIPAddress());
		udetailsTO.setUpdateDateTime(Calendar.getInstance().getTime());
		udetailsTO.setHeadImg("hd"+random+".jpg");
		udetailsTO.setBgImg("bg"+random+".jpg");
		udetailsTO.setPhrase("phrase-"+random);
		udetailsTO.setGender(Constant.DB.UD_GENDER_MALE);
		udetailsTO.setAge(Byte.parseByte(""+20));
		udetailsTO.setRealName("real-name-"+random);
		udetailsTO.setRemark("remark-"+random);
		udetailsTO.setVipcode(Constant.DB.UD_VIP_NONE);
		udetailsTO.setExtras(Constant.DB.UD_EXTRAS_NONE);
		namedParameters = new BeanPropertySqlParameterSource(udetailsTO);
		this.getNamedParameterJdbcTemplate().update(sql, namedParameters);
		
		// add default friends
		sql = Constant.JDBCConnection.ADD_FRIENDS_TO_USER;
		UserFriendsTO ufriendsTO = new UserFriendsTO();
		ufriendsTO.setOwner(uinfoTO.getUid());
		ufriendsTO.setFriend(Long.parseLong(1+""));
		ufriendsTO.setCreateDateTime(Calendar.getInstance().getTime());
		ufriendsTO.setCreateIPAddress(ui.getCreateIPAddress());
		ufriendsTO.setType(0);
		ufriendsTO.setIdParent(0);
		ufriendsTO.setRank(0);
		namedParameters = new BeanPropertySqlParameterSource(ufriendsTO);
		this.getNamedParameterJdbcTemplate().update(sql, namedParameters);
		
		return effectedRows;
	}

	@Override
	public boolean checkUserDuplicated(UserInfoTO ui) {
		// TODO Auto-generated method stub
		logger.fatal("checkUserDuplicated: " + WSUtil.stringifyJSON(ui));
		
		boolean isDuplicated = false;
		String sql = Constant.JDBCConnection.GET_USER_INFO_BY_NAME;
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(ui);
		if(!this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userInfoMapper).isEmpty()){
			isDuplicated = true;
		}
		return isDuplicated;
		
	}

	@Override
	public List<UserDetailsTO> getActiveUsers(QueryUserTO qUserTO) {
		// TODO Auto-generated method stub
		logger.fatal("getActiveUsers: " + WSUtil.stringifyJSON(qUserTO));
		String sql = Constant.JDBCConnection.GET_ACTIVE_USERS;
		SqlParameterSource namedParameters = new BeanPropertySqlParameterSource(qUserTO);
		return this.getNamedParameterJdbcTemplate().query(sql, namedParameters, userDetailsMapper);
	}
	
}
