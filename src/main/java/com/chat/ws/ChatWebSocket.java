package com.chat.ws;
import java.io.IOException;
import java.util.Date;
import java.util.List;
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
	}
	
	
	@Override
	public void onMessage(String data) {
		WSMessageTO msg = WSUtil.handleJSON(data, WSMessageTO.class);
		String message = msg.getSderalias()+ ": "+msg.getCtn();
		
		boolean isRead = sendMsg(message);
		saveMessageIntoLog(msg, isRead);
	}


	@Override
	public void onOpen(Connection connection) {
		//set max idle time
		connection.setMaxIdleTime(Constant.WSConn.MAX_IDLE_TIME);
		//log.info(Constant.WSConn.MAX_IDLE_TIME);
		this.connection = connection;
		//WSUtil.logGettingMethods(connection, Connection.class);
		users.add(this);
		
		checkUnreadMsg();
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
	private MsgInfoTO saveMessageIntoLog(WSMessageTO wsmsg, boolean isRead){
		MsgInfoTO msginfo  = new MsgInfoTO();
		msginfo.setMsg_from(wsmsg.getSder());
		msginfo.setMsg_to(wsmsg.getRcver());
		msginfo.setMsg_ty(Constant.DB.MSG_INFO_TYPE_TEXT);
		msginfo.setMsg_cnt(wsmsg.getCtn());
		msginfo.setMsg_crt_dttm(new Date());
		msginfo.setMsg_crt_ip(request.getRemoteAddr());
		msginfo.setMsg_unread(isRead?Constant.DB.MSG_INFO_READ:Constant.DB.MSG_INFO_UNREAD);
		msginfo.setMsg_isdelete(Constant.DB.MSG_INFO_ISDELETE_N);
		
		log.info(wsService.saveMessage(msginfo));
		
		return msginfo;
	}
	
	/**
	 * 得到未读消息。
	 * 
	 * @param wsinit
	 */
	private List<MsgInfoTO> fetchUnreadMsg(WSInitTO wsinit) {
		// TODO Auto-generated method stub
		List<MsgInfoTO> unreadList = wsService.getUnreadMsg(wsinit);
		
		log.info("unread list: "+WSUtil.stringifyJSON(unreadList));
		
		return unreadList;
	}
	
	/**
	 * 检查用户未读消息
	 * 
	 */
	private void checkUnreadMsg(){
		List<MsgInfoTO> list = fetchUnreadMsg(this.wsInitial);
		int size = list.size();
		String msgNote = "";
		if (size > 0) {
			msgNote = "You have unread message(s): " + size;
		} else {
			msgNote = "You have no unread messages";
		}
		sendMsg(msgNote, true, false);
		
		for(int i = 0; i<size; i++){
			sendMsg(list.get(i).getMsg_from()+": "+list.get(i).getMsg_cnt(), true, false);
		}
	}
	
	/**
	 * 对特定端口发送消息
	 *  
	 * @param message		消息内容
	 * @param isSend2Me		对自己发送
	 * @param isSend2One	对好友发送
	 * @return				消息是否已读
	 */
	private boolean sendMsg(String message, boolean isSend2Me, boolean isSend2One){
		// 消息是否已读状态
		boolean isRead = false;
		
		if(isSend2One){
			for (ChatWebSocket user : users) {
				//To specific friend(s)
				if (wsInitial.getSender() == user.getWsInitial().getReciever()
						&& wsInitial.getReciever() == user.getWsInitial().getSender()) {
					try {
						user.connection.sendMessage(message);
						//消息已读标志
						isRead = true;
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		//To yourself.
		if (isSend2Me) {
			try {
				this.connection.sendMessage(message);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return isRead;
	}
	
	/**
	 * 对特定端口发送消息
	 *  - 默认对自己和好友同时发送消息
	 * 
	 * @param message
	 * @return
	 */
	private boolean sendMsg(String message) {
		return sendMsg(message, true, true);
	}
}