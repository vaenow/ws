package com.chat.servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BaseServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		log("doGet");
		super.doGet(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		log("doPost");
		super.doPost(req, resp);
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		log("destroy");
		super.destroy();
	}

	@Override
	public void init() throws ServletException {
		// TODO Auto-generated method stub
		log("init");
		super.init();
	}

//	private void log(String log) {
//		System.out.println("[DEBUG] " + new Date().toString() + " " + log);
//	}
}
