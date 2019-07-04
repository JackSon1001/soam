package com.ydtf.soam.system.queue.rabbitmq;

/**
 * @author zhanglei
 * @date 2016-08-18
 * */
public class RabbitmqConfig {
	private static String host; //MabbitMQ所在主机

	private static Integer port; //MabbitMQ所在主机

	private static String queueName; //队列名称  

	private static String userName; //登录用户名

	private static String passWord; //登录密码

	public static String getHost() {
		return host;
	}

	public static void setHost( String host ) {
		RabbitmqConfig.host = host;
	}

	public static Integer getPort() {
		return port;
	}

	public static void setPort( Integer port ) {
		RabbitmqConfig.port = port;
	}

	public static String getQueueName() {
		return queueName;
	}

	public static void setQueueName( String queueName ) {
		RabbitmqConfig.queueName = queueName;
	}

	public static String getUserName() {
		return userName;
	}

	public static void setUserName( String userName ) {
		RabbitmqConfig.userName = userName;
	}

	public static String getPassWord() {
		return passWord;
	}

	public static void setPassWord( String passWord ) {
		RabbitmqConfig.passWord = passWord;
	}
}
