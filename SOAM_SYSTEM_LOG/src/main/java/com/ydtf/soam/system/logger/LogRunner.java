package com.ydtf.soam.system.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.ydtf.soam.system.base.config.SystemConfig;
import com.ydtf.soam.system.base.contants.Constants;


@Component
@Order(value = 2)
public class LogRunner implements CommandLineRunner {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );
	
	@Autowired
	SystemConfig config;

	@Autowired
	private LogSender logSender;

	@Autowired
	private LogSender requestSender;

	@Override
	public void run( String... args ) throws Exception {
		
		if( StringUtils.isEmpty( config.getAppName() ) ) throw new Exception( "未配置系统名" );
		if( StringUtils.isEmpty( config.getInstanceId() ) ) throw new Exception( "未配置系统实例名" );

		LogConfig.setServiceName( config.getAppName() );
		LogConfig.setInstanceId( config.getInstanceId() );
		LogConfig.setLogEnabled( config.getLogEnabled() );

		if( LogConfig.getLogEnabled() == false ) return;

		final Thread logThread = new Thread( new Runnable() {
			@Override
			public void run() {
				try {
					Thread.sleep( 2000 );
					LogQueue.getInstance().setSender( logSender );
					LogQueue.getInstance().run();
				}
				catch( Exception e ) {
					e.printStackTrace();
				}
			}

		} );
		logThread.setName( "logger" );
		logThread.start();

		final Thread requestThread = new Thread( new Runnable() {
			@Override
			public void run() {
				try {
					Thread.sleep( 2000 );
					LogRequestQueue.getInstance().setSender( requestSender );
					LogRequestQueue.getInstance().run();
				}
				catch( Exception e ) {
					e.printStackTrace();
				}
			}

		} );
		requestThread.setName( "logger-request" );
		requestThread.start();

		logger.info( "日志系统初始化完毕，消息队列通道名: " + Constants.RABBITMQ.QUEUE.LOG );
	}
}