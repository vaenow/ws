package com.chat.ws;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;

import com.chat.jdbc.service.IWSService;
import com.chat.util.WSUtil;



@Controller("webSocketChatServlet")
public class WebSocketChatServlet extends WebSocketServlet {

	@Autowired
	IWSService wsService;

	public void setWsService(IWSService wsService) {
		System.out.println("setWsService: "+wsService);
		WSUtil.setWsService(wsService);
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/** 
	 * We Collect the conntected Sockets in this set
	 * 
	 * A CopyOnWriteArraySet is treadsafe, fast during read , but slow during updates, which is perfect for this usecase
	 */
	public final Set<ChatWebSocket> users = new CopyOnWriteArraySet<ChatWebSocket>();

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// default Deispatcher 
		getServletContext().getNamedDispatcher("default").forward(request,
				response);
	}
	
	@Override
	public WebSocket doWebSocketConnect(HttpServletRequest arg0, String protocol) {
		String wsInitial = arg0.getParameter("wsinitial");
		System.out.println("doWebSocketConnect.. arg0: "+ arg0);
		System.out.println("wsService: "+ wsService);
		System.out.println("WSUtil.getWsService(): "+ WSUtil.getWsService());
		System.out.println("wsInitial: "+wsInitial);
		return new ChatWebSocket(users, wsInitial);
	}

}