package com.ydtf.soam.system.queue.rabbitmq;

import org.apache.commons.pool2.BasePooledObjectFactory;
import org.apache.commons.pool2.PooledObject;
import org.apache.commons.pool2.impl.DefaultPooledObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.rabbitmq.client.Channel;

public class ChannelFactory extends BasePooledObjectFactory<Channel> {

	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	private RabbitmqConnection conn;

	public ChannelFactory( RabbitmqConnection conn ) {
		this.conn = conn;
	}

	@Override
	public Channel create() throws Exception {
		Channel channel = conn.getConnection().createChannel();
		logger.info( "ChannelFactory createChannel" );
		return channel;
	}

	@Override
	public PooledObject<Channel> wrap( Channel obj ) {
		return new DefaultPooledObject<Channel>( obj );
	}

	@Override
	public boolean validateObject( PooledObject<Channel> p ) {
		return p.getObject().isOpen();
	}
}
