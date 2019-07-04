package com.ydtf.soam.system.logger;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;
import com.ydtf.soam.system.base.contants.Constants;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.spi.ILoggingEvent;

public class LogQueue {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );
	
	private BlockingQueue<ILoggingEvent> queue = new LinkedBlockingQueue<>();
	private LogSender logSender;
	private final String queueName = Constants.RABBITMQ.QUEUE.LOG;
	private static LogQueue logQueue;

	private LogQueue() {}

	public static LogQueue getInstance() {
		if( logQueue == null ) {
			synchronized (LogQueue.class) {
				if( logQueue == null ) {
					logQueue = new LogQueue();
				}
			}
		}
		return logQueue;
	}

	public void put( ILoggingEvent eventObject ) throws Exception {
		queue.put( eventObject );
	}

	public void clear() {
		queue.clear();
	}

	public void setSender( LogSender logSender ) {
		this.logSender = logSender;
	}

	private void send( ILoggingEvent eventObject ) {
		try {
			String message = eventObject.getFormattedMessage();
			if( message != null && message.endsWith( "--nodb" ) ) return; //不记录此日志

			LogBase log = new LogBase();
			log.setService( LogConfig.getServiceName() );
			log.setInstance( LogConfig.getInstanceId() );
			log.setLevel( eventObject.getLevel().toString() );
			log.setMessage( message );
			log.setLogger( eventObject.getLoggerName() );
			log.setThread( eventObject.getThreadName() );
			log.setDate( eventObject.getTimeStamp() );

			if( eventObject.getLevel() == Level.ERROR && eventObject.hasCallerData() ) {
				StackTraceElement[] callerData = eventObject.getCallerData();
				List<StackTrace> callerList = Lists.newArrayList();

				for( StackTraceElement element : callerData ) {
					StackTrace stackTrace = new StackTrace();
					stackTrace.setDeclaringClass( element.getClassName() );
					stackTrace.setLineNumber( element.getLineNumber() );
					stackTrace.setFileName( element.getFileName() );
					stackTrace.setMethodName( element.getMethodName() );
					callerList.add( stackTrace );
				}
				log.setCallerData( callerList );
			}
			else {
				log.setCallerData( null );
			}
			
			logSender.send( queueName, JSON.toJSONString( log ) );
		}
		catch( Exception e ) {
		}

	}

	public void run() throws Exception {
		//系统启动时有可能LogSender还未初始化，循环等待知道初始化成功
		while (logSender == null) {
			logger.info( "LogSender未初始化，等待1秒" );
			this.wait( 1000 );
		}
		while (true) {
			ILoggingEvent eventObject = queue.take();
			send( eventObject );
		}
	}

}
