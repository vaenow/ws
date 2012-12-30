/**
 * Websocket IM designer
 * 
 * Date:	Dec 29, 2012
 * ===================================
 * Author			Remark
 * vane				TODO
 * 
 */
package com.chat.jdbc.dao;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

/**
 * @author vane
 * 
 */
public interface IBaseConnectorDAO {

	public void setDataSource(DataSource dataSource);

	public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate();

	public void setNamedParameterJdbcTemplate(NamedParameterJdbcTemplate namedParameterJdbcTemplate);

	public JdbcTemplate getJdbcTemplate();

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate);

}
