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

import java.util.ArrayList;
import java.util.List;

import com.chat.jdbc.to.UserFriendsTO;
import com.chat.jdbc.to.UserInfoTO;
import com.chat.util.Constant;

/**
 * @author vane
 * 
 */
public class JDBCOperator extends JDBCBaseConnection {

	/**
	 * 得到指定用户的朋友
	 * */
	public List<UserFriendsTO> getFriendsByUID(long uid) {
		List<UserFriendsTO> list = new ArrayList<UserFriendsTO>();
		UserFriendsTO uf = null;
		try {
			con = getConection();
			ps = con.prepareStatement(Constant.JDBCConnection.GET_USER_FRIENDS_BY_UID);
			ps.setLong(1, uid);
			rs = ps.executeQuery();
			while (rs.next()) {
				uf = new UserFriendsTO();
				uf.setFid(rs.getLong(1));
				uf.setOwner(rs.getLong(2));
				uf.setFriend(rs.getLong(3));
				uf.setCreateDateTime(rs.getDate(4));
				uf.setCreateIPAddress(rs.getString(5));
				uf.setOwnerInfoTO(getUserInfo(uf.getOwner()));
				uf.setFriendInfoTO(getUserInfo(uf.getFriend()));
				list.add(uf);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			// finallyRun();
		}
		return list;
	}

	/**
	 * 得到指定用户
	 * */
	public UserInfoTO getUserInfo(long uid) {
		UserInfoTO ui = null;
		try {
			con = getConection();
			ps = con.prepareStatement(Constant.JDBCConnection.GET_USER_INFO);
			ps.setLong(1, uid);
			rs = ps.executeQuery();
			while (rs.next()) {
				ui = new UserInfoTO();
				ui.setUid(rs.getLong(1));
				ui.setName(rs.getString(2));
				ui.setPassw(rs.getString(3));
				ui.setCreateDateTime(rs.getDate(4));
				ui.setCreateIPAddress(rs.getString(5));
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			// finallyRun();
		}
		return ui;
	}
	
	
	public static void main(String[] args){
		JDBCOperator op = new JDBCOperator();
		op.getFriendsByUID(1);
	}
}
