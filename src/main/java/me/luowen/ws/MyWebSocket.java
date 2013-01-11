package me.luowen.ws;

import java.io.IOException;
import java.util.List;

import org.eclipse.jetty.websocket.WebSocket.Connection;
import org.eclipse.jetty.websocket.WebSocket.OnTextMessage;

public class MyWebSocket implements OnTextMessage {

	private Connection conn;

	/* (non-Javadoc)
	 * @see org.eclipse.jetty.websocket.WebSocket#onClose(int, java.lang.String)
	 * 一个客户端断开时,从List中移除
	 */
	public void onClose(int arg0, String arg1) {
		InitServlet.getSocketList().remove(this);
		System.out.println("onClose==========================");
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jetty.websocket.WebSocket#onOpen(org.eclipse.jetty.websocket.WebSocket.Connection)
	 * 一个客户端连上来时,将它加入List
	 */
	public void onOpen(Connection conn) {
		// 如果客户端在这个MaxIdleTime中都没有活动,则它会自动结束
		System.out.println("onOpen==========================" + conn.getMaxIdleTime());
		this.conn = conn;
		InitServlet.getSocketList().add(this);
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jetty.websocket.WebSocket.OnTextMessage#onMessage(java.lang.String)
	 * 一个客户端发送数据后,触发它自己的onMessage方法,在这个方法里给所有在线的客户端发送这条消息
	 */
	public void onMessage(String data) {
		System.out.println("~~~~~~~~~~" + data);
		List<MyWebSocket> socketList = InitServlet.getSocketList();
		for (MyWebSocket socket : socketList) {
			try {
				socket.getConn().sendMessage(data);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	public Connection getConn() {
		return conn;
	}

	public void setConn(Connection conn) {
		this.conn = conn;
	}

}