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

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.chat.util.Constant;

/**
 * @author vane
 * 
 */
public class JDBCBaseConnection {
	protected Connection con = null;
	protected PreparedStatement ps = null;
	protected ResultSet rs = null;

	// ///////////////////////////////////////////////////////////////////////////
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// ///////////////////////////////////////////////////////////////////////////

	public static void main(String[] args) {
		// StudentsInfo si = new StudentsInfo();
		// si.setName("test7");
		// si.setPassword("123123");
		// si.setQq("xxx");
		// si.setSex("famel");
		// for (int i = 1; i <= 10; i++) {
		// // new JDBCstudents().add_s_details("test" + i, "psw");
		// // new JDBCstudents().update_students("test"+i, "112234");
		//
		// // new JDBCstudents().update_s_details(si);
		// }
		/**
		 * 本地测试远程数据库是否有效
		 */
		// new JDBCstudents().add_s_details("游客", "－");

	}

	static {
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	protected synchronized Connection getConection() throws SQLException {
		return DriverManager.getConnection(Constant.JDBCBaseConnection.CONNECTION_DRIVER,
				Constant.JDBCBaseConnection.CONNECTION_LOGIN, Constant.JDBCBaseConnection.CONNECTION_PASSW);
	}

	protected synchronized void finallyRun() {
		if (rs != null)
			try {
				rs.close();
				rs = null;
			} catch (Exception e) {
				e.printStackTrace();
			}
		if (con != null)
			try {
				con.close();
				con = null;
			} catch (Exception e) {
				e.printStackTrace();
			}
		if (ps != null)
			try {
				ps.close();
				ps = null;
			} catch (Exception e) {
				e.printStackTrace();
			}
	}

	protected String convertEncode(String str) {
		try {
			return toReplace(new String(str.getBytes("ISO-8859-1"), "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;
	}

	// / 把字符串转化为HTML语言
	// / </summary>
	protected String toReplace(String str) {
		str = str.replace("&", "&amp;");
		str = str.replace(">", "&gt;");
		str = str.replace("<", "&lt;");
		str = str.replace(" ", "&nbsp;");
		// str = str.Replace(System.Convert.ToChar(13).ToString(), ""); //回撤
		// str = str.Replace(System.convert.toChar(10).toString(), "<br>");//换行
		// str = str.Replace(System.Convert.ToChar(9).ToString(), "　　");//Tab
		return str;
	}

	protected boolean islegal(String str) {
		return str.indexOf("&") != -1 || str.indexOf(">") != -1 || str.indexOf("<") != -1 ? false : true;
	}
}
