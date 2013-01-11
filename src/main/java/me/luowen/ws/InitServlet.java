package me.luowen.ws;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class InitServlet extends HttpServlet {

	private static final long serialVersionUID = -1936532122758235837L;
	
	private static List<MyWebSocket> socketList;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		InitServlet.socketList = new ArrayList<MyWebSocket>();
		super.init(config);
		System.out.println("Server start============");
	}
	
	public static synchronized List<MyWebSocket> getSocketList() {
		return InitServlet.socketList;
	}

}