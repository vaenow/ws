package com.chat.ws;
import java.util.Set;

import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

/**
 * The "onTextMessage" Socket , there is also ControllMessage and BinaryMessage 
 * 
 * @author cbelka
 *
 */
public class ChatWebSocket implements OnTextMessage {

	private Connection connection;

	private Set<ChatWebSocket> users;

	public ChatWebSocket() {

	}

	public ChatWebSocket(Set<ChatWebSocket> users ) {
		this.users = users;
	}



	@Override
	public void onMessage(String data) {
		for (ChatWebSocket user : users) {
			try {
				user.connection.sendMessage(data);
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