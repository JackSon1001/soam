package com.ydtf.soam.system.queue.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.rabbitmq.client.Channel;

/**
 * @author zhanglei
 * @date 2016-08-16
 * */
public class RabbitmqSender {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	public void send( String queueName, byte[] message ) throws Exception {
		Channel channel = null;
		try {
			RabbitmqConnection.getInstance().open();
			channel = RabbitmqConnection.getInstance().getChannelPool().borrowObject();
			channel.queueDeclare( queueName, false, false, false, null );//指定一个队列
			//往队列中发出一条消息
			channel.basicPublish( "", queueName, null, message );
		}
		catch( java.net.ConnectException e ) {
			RabbitmqCacheData.getInstance().add( queueName, message );
			logger.info( "RabbitMQ连接失败，日志消息暂时存入缓存: " + new String( message ) + " --nodb" );
			throw e;
		}
		catch( java.net.NoRouteToHostException e ) {
			RabbitmqCacheData.getInstance().add( queueName, message );
			logger.info( "RabbitMQ连接失败，日志消息暂时存入缓存: " + new String( message ) + " --nodb" );
			throw e;
		}
		//AlreadyClosedException错误通常为Rabbitmq曾经已创建连接，但因特殊原因失效(如：Rabbitmq服务器关闭)，需要重新初始化
		catch( com.rabbitmq.client.AlreadyClosedException e ) {
			logger.error( e.getMessage(), e );
			if( channel != null ) {
				RabbitmqConnection.getInstance().getChannelPool().returnObject( channel );
				channel = null;
			}
			RabbitmqConnection.getInstance().reset();
			send( queueName, message );
		}
		finally {
			if( channel != null ) RabbitmqConnection.getInstance().getChannelPool().returnObject( channel );
		}
	}
}
