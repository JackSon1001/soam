package com.ydtf.soam.system.logger;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import com.alibaba.fastjson.JSON;
import com.ydtf.soam.system.base.contants.Constants;

public class LogRequestQueue {
	private BlockingQueue<LogRequest> queue = new LinkedBlockingQueue<>();
	private LogSender sender;
	private final String queueName = Constants.RABBITMQ.QUEUE.LOG_REQUEST;
	private static LogRequestQueue logRequestQueue;

	private LogRequestQueue() {}

	public static LogRequestQueue getInstance() {
		if( logRequestQueue == null ) {
			synchronized (LogRequestQueue.class) {
				if( logRequestQueue == null ) {
					logRequestQueue = new LogRequestQueue();
				}
			}
		}
		return logRequestQueue;
	}

	public void put( LogRequest request ) throws Exception {
		queue.put( request );
	}

	public void setSender( LogSender sender ) {
		this.sender = sender;
	}

	private void send( LogRequest request ) {
		try {
			if( request == null ) return;
			String message = JSON.toJSONString( request );
			sender.send( queueName, message );
			//logger.info( "Send to MessageQueue Success for " + queueName + " Log : " + message + " --nodb" );
		}
		catch( Exception e ) {
		}
	}

	public void run() throws Exception {
		while (true) {
			LogRequest request = queue.take();
			send( request );
		}
	}

}
