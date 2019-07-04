package com.ydtf.soam.system.logger;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LogSender {

	@Autowired
	private AmqpTemplate rabbitTemplate;

	public void send( String queueName, String message ) {
		this.rabbitTemplate.convertAndSend( queueName, message );
	}
}