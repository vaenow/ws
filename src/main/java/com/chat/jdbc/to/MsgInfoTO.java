/**
 *
 * Author: luowen
 * Created Date: Feb 1, 2013
 * Description:  TODO
 * Change history
 *  =======================================================
 * version					author					remark
 *	1.0						luowen				
 */
package com.chat.jdbc.to;

import java.util.Date;

/**
 * @author luowen
 * 
 */
public class MsgInfoTO {

	private long msg_id;
	private long msg_from;
	private long msg_to;
	private byte msg_ty;
	private String msg_cnt;
	private Date msg_crt_dttm;
	private String msg_crt_ip;
	private byte msg_unread;
	private byte msg_isdelete;

	public long getMsg_id() {
		return msg_id;
	}

	public void setMsg_id(long msg_id) {
		this.msg_id = msg_id;
	}

	public long getMsg_from() {
		return msg_from;
	}

	public void setMsg_from(long msg_from) {
		this.msg_from = msg_from;
	}

	public long getMsg_to() {
		return msg_to;
	}

	public void setMsg_to(long msg_to) {
		this.msg_to = msg_to;
	}

	public byte getMsg_ty() {
		return msg_ty;
	}

	public void setMsg_ty(byte msg_ty) {
		this.msg_ty = msg_ty;
	}

	public String getMsg_cnt() {
		return msg_cnt;
	}

	public void setMsg_cnt(String msg_cnt) {
		this.msg_cnt = msg_cnt;
	}

	public Date getMsg_crt_dttm() {
		return msg_crt_dttm;
	}

	public void setMsg_crt_dttm(Date msg_crt_dttm) {
		this.msg_crt_dttm = msg_crt_dttm;
	}

	public String getMsg_crt_ip() {
		return msg_crt_ip;
	}

	public void setMsg_crt_ip(String msg_crt_ip) {
		this.msg_crt_ip = msg_crt_ip;
	}

	public byte getMsg_unread() {
		return msg_unread;
	}

	public void setMsg_unread(byte msg_unread) {
		this.msg_unread = msg_unread;
	}

	public byte getMsg_isdelete() {
		return msg_isdelete;
	}

	public void setMsg_isdelete(byte msg_isdelete) {
		this.msg_isdelete = msg_isdelete;
	}
}
