package com.ydtf.soam.system.queue.rabbitmq;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.util.StringUtils;

public class RabbitmqCacheData {
	private static RabbitmqCacheData instanse;
	private static List<TempMessage> messageCache = Collections.synchronizedList( new ArrayList<TempMessage>() );

	private RabbitmqCacheData() {}

	public static RabbitmqCacheData getInstance() throws Exception {
		if( instanse == null ) {
			synchronized (RabbitmqCacheData.class) {
				if( instanse == null ) {
					instanse = new RabbitmqCacheData();
				}
			}
		}
		return instanse;
	}

	public void add( String queueName, byte[] message ) {
		if( StringUtils.isEmpty( queueName ) || message == null ) {
			return;
		}
		synchronized (messageCache) {
			messageCache.add( new TempMessage( queueName, message ) );
		}
	}

	public void add( TempMessage message ) {
		if( message == null || StringUtils.isEmpty( message.getMessage() ) || message.getMessage() == null ) {
			return;
		}
		synchronized (messageCache) {
			messageCache.add( message );
		}
	}

	public TempMessage getNext() {
		TempMessage message;
		synchronized (messageCache) {
			if( messageCache == null || messageCache.size() < 1 ) return null;
			message = messageCache.get( 0 );
			messageCache.remove( 0 );
		}
		return message;
	}

	public List<TempMessage> getAll() {
		return messageCache;
	}
}