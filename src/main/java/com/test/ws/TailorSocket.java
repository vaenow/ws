package com.test.ws;

import java.io.IOException;

import org.eclipse.jetty.websocket.WebSocket;

class TailorSocket implements WebSocket.OnTextMessage {
	private Connection _connection;

	public void onClose(int closeCode, String message) {
		TailorWebSocketServlet._members.remove(this);
	}

	public void sendMessage(String data) throws IOException {
		_connection.sendMessage(data);
	}

	public void onMessage(String data) {
		System.out.println("Received: " + data);
	}

	public boolean isOpen() {
		return _connection.isOpen();
	}

	public void onOpen(Connection connection) {
		TailorWebSocketServlet._members.add(this);
		_connection = connection;
		try {
			connection.sendMessage("onOpen:Server received Web Socket upgrade and added it to Receiver List.");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}