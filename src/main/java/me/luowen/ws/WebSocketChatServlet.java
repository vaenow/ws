package me.luowen.ws;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketServlet;



@WebServlet(name="mychat", 
        urlPatterns={"/mychat/*"} )
public class WebSocketChatServlet extends WebSocketServlet {


	
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

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// default Deispatcher 
		getServletContext().getNamedDispatcher("default").forward(request,
				response);
	}

	@Override
	public WebSocket doWebSocketConnect(HttpServletRequest arg0, String arg1) {
		
		System.out.println("doWebSocketConnect.. arg0: "+ arg0);
		return new ChatWebSocket(users);
	}

}
