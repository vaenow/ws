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

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.stereotype.Repository;

import com.chat.jdbc.dao.IBaseConnectorDAO;
import com.chat.jdbc.to.MsgInfoTO;
import com.chat.util.Constant;
import com.chat.util.WSCaches;

/**
 * @author vane
 * 
 */
@Repository
public  class BaseConnectorDAOImpl implements IBaseConnectorDAO {
	Log logger = LogFactory.getLog(BaseConnectorDAOImpl.class);
	
	WSCaches wscaches = WSCaches.getInstance();
	
	private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
	private JdbcTemplate jdbcTemplate;


	public void setDataSource(DataSource dataSource) {
		this.setJdbcTemplate(new JdbcTemplate(dataSource));
		this.setNamedParameterJdbcTemplate(new NamedParameterJdbcTemplate(dataSource));
	}

	public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate() {
		return namedParameterJdbcTemplate;
	}

	public void setNamedParameterJdbcTemplate(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
		this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}


	/**
	 * 查询建立映射关系
	 */
	protected ParameterizedRowMapper<MsgInfoTO> wsChatMsgInfoMapper = new ParameterizedRowMapper<MsgInfoTO>() {
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

	
	// ///////////////////////////////////////////////////////////////////////////
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// ///////////////////////////////////////////////////////////////////////////
	protected Connection con = null;
	protected PreparedStatement ps = null;
	protected ResultSet rs = null;

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
