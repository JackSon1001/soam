package com.ydtf.soam.system.logger;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.UnsynchronizedAppenderBase;

/**
 * @author zhanglei
 * @date 2016-08-18
 * */
public class LogAppender extends UnsynchronizedAppenderBase<ILoggingEvent> {

	@Override
	protected void append( ILoggingEvent eventObject ) {

		//未开启日志记录
		if( LogConfig.getLogEnabled() == false ) return;
		//ILoggingEvent为空
		if( eventObject == null ) return;
		//未初始化消息队列配置
		//if( RabbitmqConfig.getHost() == null ) return;
		//未获取到消息队列名
		/*if( queueNameLog == null ) {
			logger.error( "未配置系统日志消息通道名" );
			return;
		}*/

		try {
			LogQueue.getInstance().put( eventObject );
		}
		catch( Exception e ) {
			e.printStackTrace();
		}
	}
}