package com.ydtf.soam.system.queue.rabbitmq;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(value = 1)
public class RabbitmqRunner implements CommandLineRunner {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	@Value("${spring.rabbitmq.host:unknown}")
	private String host; //MabbitMQ所在主机

	@Value("${spring.rabbitmq.port:0}")
	private Integer port; //MabbitMQ所在主机

	@Value("${spring.rabbitmq.username}")
	private String userName; //登录用户名

	@Value("${spring.rabbitmq.password}")
	private String passWord; //登录密码

	@Override
	public void run( String... args ) throws Exception {
		if( "unknown".equals( host ) ) throw new Exception( "未配置消息队列host:spring.rabbitmq.host" );
		if( port == 0 ) throw new Exception( "未配置消息队列port:spring.rabbitmq.port" );

		//设置Rabbitmq缓存信息
		RabbitmqConfig.setHost( host );
		RabbitmqConfig.setPort( port );
		RabbitmqConfig.setUserName( userName );
		RabbitmqConfig.setPassWord( passWord );

		logger.info( "RabbitMQ初始化完毕，消息队列地址: " + host + ":" + port.toString() );
	}
}