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
import org.springframework.stereotype.Service;

import com.chat.jdbc.service.IWSService;
import com.chat.util.WSUtil;



@Service("webSocketChatServlet")
public class WebSocketChatServlet extends WebSocketServlet {

	@Autowired
	IWSService wsService;

	public void setWsService(IWSService wsService) {
		System.out.println("setWsService: "+wsService);
		WSUtil.setWsService(wsService);
		WSUtil.setWebSocketChatServlet(this);
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
		// default Dispatcher 
		getServletContext().getNamedDispatcher("default").forward(request,
				response);
	}
	
	@Override
	public WebSocket doWebSocketConnect(HttpServletRequest req, String protocol) {
//		String wsInitial = arg0.getParameter("wsinitial");
		System.out.println("doWebSocketConnect.. req: "+ req);
		System.out.println("wsService: "+ wsService);
		System.out.println("WSUtil.getWsService(): "+ WSUtil.getWsService());
		
		return new ChatWebSocket(WSUtil.getWebSocketChatServlet().users, req);
	}

}