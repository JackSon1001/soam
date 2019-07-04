package com.ydtf.soam.system.queue.rabbitmq;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Envelope;

/**
 * @author zhanglei
 * @date 2016-08-18
 * */
public interface IhandleDelivery {
	public void handleDelivery( Channel channel, String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body )
			throws Exception;
}
