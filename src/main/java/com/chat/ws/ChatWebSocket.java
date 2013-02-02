package com.chat.ws;
import java.io.IOException;
import java.util.Date;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

import com.chat.jdbc.service.IWSService;
import com.chat.jdbc.to.MsgInfoTO;
import com.chat.jdbc.ws.to.WSInitTO;
import com.chat.jdbc.ws.to.WSMessageTO;
import com.chat.util.Constant;
import com.chat.util.WSUtil;

/**
 * The "onTextMessage" Socket , there is also ControllMessage and BinaryMessage 
 * 
 * @author cbelka
 * @update luowen
 */
public class ChatWebSocket implements OnTextMessage {
	
	Log log = LogFactory.getLog(ChatWebSocket.class);

	private Connection connection;			//websocket 连接

	private Set<ChatWebSocket> users;		//存储的所有socket users

	private IWSService wsService;
	
	private WSInitTO wsInitial;			//Socket的目标
	
	private HttpServletRequest request;	//request
	
	public ChatWebSocket() {

	}

	public ChatWebSocket(Set<ChatWebSocket> users ) {
		this.users = users;
		this.wsService = WSUtil.getWsService();
	}
	
	public ChatWebSocket(Set<ChatWebSocket> users, HttpServletRequest request ) {
		this.users 		= users;
		this.wsService 	= WSUtil.getWsService();
		this.request 	= request;
		this.wsInitial 	= WSUtil.handleJSON(request.getParameter("wsinitial"), WSInitTO.class);
		
		WSUtil.logGettingMethods(request, request.getClass());	//log request 'get' properties.
	}
	
	
	@Override
	public void onMessage(String data) {
		WSMessageTO msg = WSUtil.handleJSON(data, WSMessageTO.class);
		String message = msg.getSder()+ ": "+msg.getCtn();
		for (ChatWebSocket user : users) {
			//To specific friend(s)
			if (msg.getSder() == user.getWsInitial().getReciever()
					&& msg.getRcver() == user.getWsInitial().getSender()) {
				try {
					user.connection.sendMessage(message);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
		//To yourself.
		try {
			this.connection.sendMessage(message);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		saveMessageIntoLog(msg);
	}


	@Override
	public void onOpen(Connection connection) {
		this.connection = connection;
		users.add(this);
	}

	@Override
	public void onClose(int closeCode, String message) {
		users.remove(this);
	}

	public WSInitTO getWsInitial() {
		return wsInitial;
	}

	public void setWsInitial(WSInitTO wsInitial) {
		this.wsInitial = wsInitial;
	}
	
	/**
	 * 保存消息至日志
	 * 
	 * @param wsmsg
	 * @return
	 */
	private MsgInfoTO saveMessageIntoLog(WSMessageTO wsmsg){
		MsgInfoTO msginfo  = new MsgInfoTO();
		msginfo.setMsg_from(wsmsg.getSder());
		msginfo.setMsg_to(wsmsg.getRcver());
		msginfo.setMsg_ty(Constant.DB.MSG_INFO_TYPE_TEXT);
		msginfo.setMsg_cnt(wsmsg.getCtn());
		msginfo.setMsg_crt_dttm(new Date());
		msginfo.setMsg_crt_ip(request.getRemoteAddr());
		msginfo.setMsg_unread(Constant.DB.MSG_INFO_UNREAD);
		msginfo.setMsg_isdelete(Constant.DB.MSG_INFO_ISDELETE_N);
		
		log.info(wsService.saveMessage(msginfo));
		
		return msginfo;
	}
	
}