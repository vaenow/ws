/**
 *
 * Author: luowen
 * Created Date: Jan 30, 2013
 * Description:  TODO
 * Change history
 *  =======================================================
 * version					author					remark
 *	1.0						luowen				
 */
package com.chat.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.chat.jdbc.to.UserDetailsTO;
import com.chat.jdbc.to.UserInfoTO;

/**
 * @author LUOWEN
 * 
 */
public class WSCaches {

	Log logger = LogFactory.getLog(WSCaches.class);

	private static WSCaches wscaches = null;

	private WSCaches() {
		cacheManagement();
	}

	public static WSCaches getInstance() {
		return wscaches == null ? new WSCaches() : wscaches;
	}

	/**
	 * 定时器，清理缓存。
	 * 
	 */
	private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

	/**
	 * 
	 * 缓存管理
	 */
	private void cacheManagement() {
		scheduler.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				cleanCaches();
			}
		}, Constant.CACHE.INITIAL_DELAY, Constant.CACHE.PERIOD, Constant.CACHE.TIME_UNIT);
	}
	
	//-----------------------------------------------//
	//				Caches Configuration			 //
	//-----------------------------------------------//
	/**
	 * 用戶信息緩存
	 */
	public Map<Long, UserInfoTO> userInfoCache = new ConcurrentHashMap<Long, UserInfoTO>();
	
	/**
	 * 用戶详细信息緩存
	 */
	public Map<Long, UserDetailsTO> userDetailsCache = new ConcurrentHashMap<Long, UserDetailsTO>();

	/**
	 * 清理缓存
	 */
	void cleanCaches() {
		this.userDetailsCache.clear();
		this.userInfoCache.clear();

		logger.info("Method: cleanCaches() done.");
	}
}
