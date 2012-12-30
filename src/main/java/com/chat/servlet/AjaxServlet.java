package com.chat.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.chat.jdbc.service.IJDBCService;

@Controller
public class AjaxServlet {

	@Autowired
	IJDBCService JDBCService;

	@RequestMapping(value = "/app")
	@ResponseBody
	public String handle(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		// 处理编码问题
		// req.setCharacterEncoding("UTF-8");
		// resp.setContentType("text/html;charset=UTF-8");

		JDBCService.getFriendsListByUID(1);
		
		return "ok.";
		// resp.getWriter().write("hello world!");
	}

}
