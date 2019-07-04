package com.ydtf.soam.system.queue.rabbitmq;

public class TempMessage {
	String queueName;
	byte[] message;

	public TempMessage( String queueName, byte[] message ) {
		this.queueName = queueName;
		this.message = message;
	}

	public String getQueueName() {
		return queueName;
	}

	public byte[] getMessage() {
		return message;
	}
}
