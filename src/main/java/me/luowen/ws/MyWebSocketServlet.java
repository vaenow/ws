package me.luowen.ws;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;

public class MyWebSocketServlet extends WebSocketServlet {

	private static final long serialVersionUID = -7302427588920888589L;

	public WebSocket doWebSocketConnect(HttpServletRequest request, String arg1) {
		System.out.println("getting..");
		
		return new MyWebSocket();
	}

}