package com.chat.ws;
import java.util.Set;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

import com.chat.jdbc.service.IWSService;
import com.chat.util.WSUtil;

/**
 * The "onTextMessage" Socket , there is also ControllMessage and BinaryMessage 
 * 
 * @author cbelka
 *
 */
public class ChatWebSocket implements OnTextMessage {

	private Connection connection;

	private Set<ChatWebSocket> users;

	private IWSService wsService;
	
	public ChatWebSocket() {

	}

	public ChatWebSocket(Set<ChatWebSocket> users ) {
		this.users = users;
		this.wsService = WSUtil.getWsService();
	}
	
	@Override
	public void onMessage(String data) {
		for (ChatWebSocket user : users) {
			try {
				user.connection.sendMessage(data+" - "+wsService.saveMessage(data));
			} catch (Exception e) {
			}
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

}