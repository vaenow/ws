package com.chat.jdbc;

import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.students.Discuss;
import com.students.StudentsInfo;

public class JDBCstudents {

	Connection con = null;
	PreparedStatement ps = null;
	ResultSet rs = null;

	// ///////table::: s_details
	/**
	 * 注册时使用
	 * */
	public void add_s_details(String name, String password) {
		name = convertEncode(name);
		password = convertEncode(password);
		try {
			con = getConection();
			ps = con.prepareStatement("insert into s_details (s_name, s_password, s_sex, s_identity_card, s_phone, s_major, s_class, s_qq) values (?, ?, ?, ?, ?, ?, ?, ?);");
			ps.setString(1, name);
			ps.setString(2, password);
			ps.setString(3, "男");
			ps.setString(4, "000000000000000000");
			ps.setString(5, "00000000000");
			ps.setString(6, "未填写");
			ps.setString(7, "未填写");
			ps.setString(8, "00000000");
			ps.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
	}

	/**
	 * 修改资料
	 * */
	public void update_s_details(StudentsInfo si) {
		System.out.println("---updating--1-1--");
		try {
			con = getConection();
			ps = con.prepareStatement("update s_details set s_password=?, s_sex=?, s_identity_card=?, s_phone=?, s_major=?, s_class=?, s_qq=? where s_name=?;");
			ps.setString(1, si.getPassword());
			ps.setString(2, si.getSex());
			ps.setString(3, si.getIdentityCard());
			ps.setString(4, si.getPhone());
			ps.setString(5, si.getMajor());
			ps.setString(6, si.getClassNumber());
			ps.setString(7, si.getQq());
			ps.setString(8, si.getName());
			ps.executeUpdate();

			System.out.println("---updating--1-2--");
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
	}

	/**
	 * 删除人名资料
	 * */
	public void delete_s_details_by_name(String name) {
		try {
			con = getConection();
			ps = con.prepareStatement("delete from s_details where s_name=?");
			ps.setString(1, name);
			ps.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
	}

	/**
	 * 得到所有学生
	 * */
	public List<StudentsInfo> getAllStudents() {
		List<StudentsInfo> list = new ArrayList<StudentsInfo>();
		StudentsInfo si = null;
		try {
			con = getConection();
			ps = con.prepareStatement("select * from s_details");
			rs = ps.executeQuery();
			while (rs.next()) {
				si = new StudentsInfo();
				si.setIndex(rs.getInt(1));
				si.setName(rs.getString(2));
				si.setPassword(rs.getString(3));
				si.setSex(rs.getString(4));
				si.setIdentityCard(rs.getString(5));
				si.setPhone(rs.getString(6));
				si.setMajor(rs.getString(7));
				si.setClassNumber(rs.getString(8));
				si.setQq(rs.getString(9));
				list.add(si);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
		return list;
	}

	/**
	 * 得到特定学生
	 * */
	public List<StudentsInfo> getStudentByName(String name) {
		List<StudentsInfo> list = new ArrayList<StudentsInfo>();
		StudentsInfo si = null;
		try {
			con = getConection();
			ps = con.prepareStatement("select * from s_details where s_name=?");
			ps.setString(1, name);
			rs = ps.executeQuery();
			while (rs.next()) {
				si = new StudentsInfo();
				si.setIndex(rs.getInt(1));
				si.setName(rs.getString(2));
				si.setPassword(rs.getString(3));
				si.setSex(rs.getString(4));
				si.setIdentityCard(rs.getString(5));
				si.setPhone(rs.getString(6));
				si.setMajor(rs.getString(7));
				si.setClassNumber(rs.getString(8));
				si.setQq(rs.getString(9));
				list.add(si);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
		return list;
	}

	/**
	 * 判断是否存在
	 * */
	public boolean isDuplicatedName(String name) {
		if (!islegal(name)) // 是否有非法字符
			return true;
		try {
			con = getConection();
			ps = con.prepareStatement("select * from s_details where s_name=?");
			ps.setString(1, name);
			rs = ps.executeQuery();
			while (rs.next()) {
				return true;
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
		return false;
	}

	/**
	 * 判断是否与原密码匹配
	 * 
	 * */
	boolean isOldPassword(String password) {
		try {
			con = getConection();
			ps = con.prepareStatement("select * from s_details where s_name=?");
			rs = ps.executeQuery();
			while (rs.next()) {
				return password.equals(rs.getString(3));
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
		return false;
	}

	/**
	 * 更新最近登录时间
	 * */
	public void update_s_last_login_dttm(String name) {
		System.out.println("---update_s_last_login_dttm----");
		try {
			con = getConection();
			ps = con.prepareStatement("update s_details set s_last_login_dttm=? where s_name=?;");
			ps.setTimestamp(1, new Timestamp(new Date().getTime()));
			ps.setString(2, name);
			ps.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
	}

	// 获得所有的讨论内容
	public List<Discuss> getDiscuss() {
		List<Discuss> list = new ArrayList<Discuss>();
		try {
			con = getConection();
			ps = con.prepareStatement("select * from s_discuss order by s_time desc limit 0,100;");
			rs = ps.executeQuery();
			while (rs.next()) {
				Discuss dis = new Discuss();
				dis.setName(rs.getString(1));
				dis.setTime(rs.getTimestamp(2));
				dis.setCount(rs.getString(3));
				dis.setIp(rs.getString(4));
				list.add(dis);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
		return list;
	}

	// 添加讨论：
	public void addDiscuss(Discuss d) {
		System.out.println("------count--addDiscuss--" + d.getCount());
		try {
			con = getConection();
			ps = con.prepareStatement("insert into s_discuss (s_student, s_time, s_count, s_ip) values (?, ?, ?, ?);");
			ps.setString(1, d.getName());
			ps.setTimestamp(2, new Timestamp(d.getTime().getTime()));
			ps.setString(3, toReplace(d.getCount()));
			ps.setString(4, d.getIp());
			ps.executeUpdate();
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
	}

	/**
	 * 得到资料
	 * */
	public StudentsInfo get_s_details(String name) {
		System.out.println("---Getting-Details--1-1--");
		StudentsInfo si = new StudentsInfo();
		try {
			con = getConection();
			ps = con.prepareStatement("select * from s_details where s_name=?;");
			ps.setString(1, name);
			rs = ps.executeQuery();
			while (rs.next()) {
				si.setIndex(rs.getInt(1));
				si.setName(rs.getString(2));
				si.setPassword(rs.getString(3));
				si.setSex(rs.getString(4));
				si.setIdentityCard(rs.getString(5));
				si.setPhone(rs.getString(6));
				si.setMajor(rs.getString(7));
				si.setClassNumber(rs.getString(8));
				si.setQq(rs.getString(9));
				si.setCreate_dttm(rs.getTimestamp(10));
				si.setLast_login_dttm(rs.getTimestamp(11));

				// System.out.println("-------1------"+rs.getString(2));
				// System.out.println("-------2------"+rs.getString(4));
				// System.out.println("-------3------"+rs.getString(7));
				//
				// System.out.println("-------1------"+si.getName());
				// System.out.println("-------2-1-----"+convertEncode(si.getSex()));
				// System.out.println("-------3------"+si.getMajor());
				return si;
			}
			System.out.println("---updating--1-2--");
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			finallyRun();
		}
		return si;
	}

	// ///////////////////////////////////////////////////////////////////////////
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// -------------------------------------------------------------------------//
	// ///////////////////////////////////////////////////////////////////////////

	public static void main(String[] args) {
		StudentsInfo si = new StudentsInfo();
		si.setName("test7");
		si.setPassword("123123");
		si.setQq("xxx");
		si.setSex("famel");
		for (int i = 1; i <= 10; i++) {
			// new JDBCstudents().add_s_details("test" + i, "psw");
			// new JDBCstudents().update_students("test"+i, "112234");

			//new JDBCstudents().update_s_details(si);
		}
		/**
		 * 本地测试远程数据库是否有效
		 */
		//new JDBCstudents().add_s_details("游客", "－");
		
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

	private synchronized Connection getConection() throws SQLException {
		return DriverManager
				.getConnection(
						// "jdbc:mysql://luowen5241.s20.eatj.com:3306/luowen5241?useUnicode=true&characterEncoding=UTF-8",
						// "luowen5241", "lqyygy5240");
						
						/**
						 * 发布时使用
						 */
						// "jdbc:mysql://localhost:3306/my0070204?useUnicode=true&characterEncoding=UTF-8",
						// "root", "root");
						
						/**
						 * 本地测试时使用远程数据库
						 */
						 "jdbc:mysql://0007.freejsp.net:3306/my0070204?useUnicode=true&characterEncoding=UTF-8",
						 "my0070204", "lqyygy5240");
		
						//"jdbc:mysql://127.0.0.1:3306/my0070204?useUnicode=true&characterEncoding=UTF-8",
						//"my0070204", "lqyygy5240");
	}

	private synchronized void finallyRun() {
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

	public String convertEncode(String str) {
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
	public String toReplace(String str) {
		str = str.replace("&", "&amp;");
		str = str.replace(">", "&gt;");
		str = str.replace("<", "&lt;");
		str = str.replace(" ", "&nbsp;");	
		// str = str.Replace(System.Convert.ToChar(13).ToString(), ""); //回撤
		// str = str.Replace(System.convert.toChar(10).toString(), "<br>");//换行
		// str = str.Replace(System.Convert.ToChar(9).ToString(), "　　");//Tab
		return str;
	}

	public boolean islegal(String str) {
		return str.indexOf("&") != -1 || str.indexOf(">") != -1
				|| str.indexOf("<") != -1 ? false : true;
	}

}
