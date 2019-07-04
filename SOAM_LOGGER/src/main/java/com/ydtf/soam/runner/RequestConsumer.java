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
import com.ydtf.soam.entity.log_request;
import com.ydtf.soam.repository.RequestRepository;
import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.logger.LogRequest;
import com.ydtf.soam.system.queue.rabbitmq.IhandleDelivery;
import com.ydtf.soam.system.queue.rabbitmq.RabbitmqReceiver;

@Component
@Order(value = 21)
public class RequestConsumer implements CommandLineRunner {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	@Value("${soam.rabbitmq.consumer.log.size:1}")
	Integer consumerSizeLog;

	@Autowired
	RequestRepository requestRepository;

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
				LogRequest logRequest = JSON.parseObject( message, LogRequest.class );

				String service = logRequest.getService();
				if( StringUtils.isEmpty( service ) ) {
					String contextPath = logRequest.getContextPath();
					service = "SERVICE-" + contextPath.replace( "/", "" ).toUpperCase();
					logRequest.setService( service );
				}
				if( StringUtils.isEmpty( logRequest.getInstance() ) ) {
					logRequest.setInstance( service );
				}

				requestRepository.save( new log_request( logRequest ) );

				logger.info( "Message Consume Success, " + service + " Request Log insert MongoDB : " + message + " --nodb" );
			}
		};

		for( int i = 0; i < consumerSizeLog; i++ ) {
			receiver.Recv( Constants.RABBITMQ.QUEUE.LOG_REQUEST, false, handleDelivery );
		}
		logger.info( "ApplicationRunner : ConsumerLogRequestMessage启动成功" );
	}
}
