package com.chat.ws;
import java.io.IOException;
import java.util.Set;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

import com.chat.jdbc.service.IWSService;
import com.chat.jdbc.ws.to.WSInitTO;
import com.chat.jdbc.ws.to.WSMessageTO;
import com.chat.util.WSUtil;

/**
 * The "onTextMessage" Socket , there is also ControllMessage and BinaryMessage 
 * 
 * @author cbelka
 * @update luowen
 */
public class ChatWebSocket implements OnTextMessage {

	private Connection connection;

	private Set<ChatWebSocket> users;

	private IWSService wsService;
	
	private WSInitTO wsInitial;			//Socket的目标
	
	public ChatWebSocket() {

	}

	public ChatWebSocket(Set<ChatWebSocket> users ) {
		this.users = users;
		this.wsService = WSUtil.getWsService();
	}
	
	public ChatWebSocket(Set<ChatWebSocket> users, String wsInitial ) {
		this.users = users;
		this.wsService = WSUtil.getWsService();
		this.wsInitial = WSUtil.handleJSON(wsInitial, WSInitTO.class);
	}
	
	
	@Override
	public void onMessage(String data) {
		WSMessageTO msg = WSUtil.handleJSON(data, WSMessageTO.class);
		//wsService.saveMessage(data);
		String message = msg.getSder()+ ": "+msg.getCtn();
		for (ChatWebSocket user : users) {
			//To specific friend(s)
			if (msg.getSder() == user.getWsInitial().getReciever()
					&& msg.getRcver() == user.getWsInitial().getSender()) {
				try {
					user.connection.sendMessage(message);
				} catch (Exception e) {
				}
			}
		}
		
		//To yourself.
		try {
			this.connection.sendMessage(message);
		} catch (IOException e) {
			e.printStackTrace();
		}
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

}