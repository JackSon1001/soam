package com.ydtf.soam.runner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSON;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Envelope;
import com.ydtf.soam.entity.log_soam;
import com.ydtf.soam.repository.LogRepository;
import com.ydtf.soam.system.logger.LogBase;
import com.ydtf.soam.system.queue.rabbitmq.IhandleDelivery;
import com.ydtf.soam.system.queue.rabbitmq.RabbitmqReceiver;

@Component
@Order(value = 20)
public class ConsumerLogMessage implements CommandLineRunner {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	@Value("${soam.rabbitmq.queuename_log:SOAM_LOG}")
	String queueNameLog;

	@Value("${soam.rabbitmq.consumer.log.size:1}")
	Integer consumerSizeLog;

	@Autowired
	LogRepository logRepository;

	@Override
	public void run( String... args ) throws Exception {
		RabbitmqReceiver receiver = new RabbitmqReceiver();

		//重写监听函数
		IhandleDelivery handleDelivery = new IhandleDelivery() {
			@Override
			public void handleDelivery( Channel channel, String consumerTag, Envelope envelope, AMQP.BasicProperties properties,
					byte[] body ) throws Exception {
				if( body == null ) return;

				String message = new String( body, "UTF-8" );
				LogBase logBase = JSON.parseObject( message, LogBase.class );
				String serviceName = logBase.getService();
				if( StringUtils.isEmpty( serviceName ) ) return;

				logRepository.save( new log_soam( logBase ) );

				logger.info( "Message Consume Success, " + serviceName + " Log insert MongoDB : " + message + " --nodb" );
			}
		};

		for( int i = 0; i < consumerSizeLog; i++ ) {
			receiver.Recv( queueNameLog, false, handleDelivery );
		}
		logger.info( "ApplicationRunner : ConsumerLogMessage启动成功" );
	}
}
