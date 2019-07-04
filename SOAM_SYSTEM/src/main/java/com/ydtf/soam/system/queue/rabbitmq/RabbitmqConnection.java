package com.ydtf.soam.system.queue.rabbitmq;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeoutException;

import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class RabbitmqConnection {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );
	private static RabbitmqConnection conn;

	private String host;//MabbitMQ所在主机
	private Integer port;//MabbitMQ所在主机
	private String userName;//用户
	private String passWord;//密码
	private ConnectionFactory factory;
	private Connection connection;
	private static final long INTERVAL = 10000;
	private Timer tryConnTimer = null;
	private Status status = Status.CLOSE;

	private GenericObjectPool<Channel> channelPool;
	private int maxPool = 200;
	private int maxIdle = 20;
	private int minPool = 10;
	private long maxIdleTime = 10;//最大空闲时间，单位分钟

	private RabbitmqConnection() {
		host = RabbitmqConfig.getHost();
		port = RabbitmqConfig.getPort();
		userName = RabbitmqConfig.getUserName();
		passWord = RabbitmqConfig.getPassWord();

		factory = new ConnectionFactory();//创建连接连接到MabbitMQ
		factory.setHost( this.host );//设置MabbitMQ所在主机ip或者主机名
		factory.setPort( this.port );//设置MabbitMQ所在主机端口
		factory.setUsername( this.userName );
		factory.setPassword( this.passWord );
		logger.info( "RabbitmqConnection已连接: " + this.host + ":" + this.port );
	}

	public static RabbitmqConnection getInstance() throws Exception {
		if( conn == null ) {
			synchronized (RabbitmqConnection.class) {
				if( conn == null ) {
					conn = new RabbitmqConnection();
					conn.initChannelPool();
					if( !conn.isOpen() ) conn.open();

					LoggerFactory.getLogger( RabbitmqConnection.class ).info( "RabbitmqConnection实例化" );
				}
			}
		}
		return conn;
	}

	public void initChannelPool() {
		GenericObjectPoolConfig config = new GenericObjectPoolConfig();
		config.setMaxTotal( maxPool );
		config.setMaxIdle( maxIdle );//超过最大空闲数的时候，return的对象会直接销毁，这里设置成跟max size一样大小，防止高并发时候不断构造新对象
		config.setMinIdle( minPool );//对象池保持的最小对象数，会有一个线程轮询扫描
		config.setJmxEnabled( false );
		config.setTestOnBorrow( true );
		//默认-1分钟执行一次清除空闲线程
		config.setTimeBetweenEvictionRunsMillis( maxIdleTime * 60 * 1000 );
		//默认是idle清除是清除空闲了30分钟以上的对象，这里不设置此参数
		//		config.setMinEvictableIdleTimeMillis(GenericObjectPoolConfig.DEFAULT_MIN_EVICTABLE_IDLE_TIME_MILLIS);
		channelPool = new GenericObjectPool<Channel>( new ChannelFactory( this ), config );
		logger.info( "initChannelPool初始化" );
	}

	public void open() throws Exception {
		try {
			if( status == Status.AGAIN ) {
				throw new java.net.ConnectException();
			}
			if( connection == null || !connection.isOpen() ) {
				connection = factory.newConnection(); //创建一个连接
				status = Status.OPEN;
				logger.info( "RabbitmqConnection 打开连接" );
			}
		}
		catch( Exception e ) {
			if( e instanceof java.net.ConnectException || e instanceof java.net.NoRouteToHostException ) {
				this.tryOpenRabbitmqConnection();
				throw e;
			}
		}

	}

	public boolean isOpen() {
		return connection != null && connection.isOpen();
	}

	public synchronized void reset() throws IOException, TimeoutException {
		if( !connection.isOpen() ) {
			connection = factory.newConnection();
			channelPool.clear();
			logger.info( "RabbitmqConnection reset" );
		}
	}

	//关闭频道和连接
	public void close() throws Exception {
		if( channelPool != null ) {
			channelPool.clear();
			channelPool.close();
		}
		if( connection != null ) {
			connection.close();
			connection = null;
		}
		status = Status.CLOSE;
		conn = null;
		logger.info( "RabbitmqConnection close" );
	}

	public Connection getConnection() throws Exception {
		if( !this.isOpen() ) this.open();
		return this.connection;
	}

	public GenericObjectPool<Channel> getChannelPool() {
		return this.channelPool;
	}

	public Status getStatus() {
		return status;
	}

	private void tryOpenRabbitmqConnection() {
		synchronized (RabbitmqConnection.class) {
			if( tryConnTimer == null ) {
				tryConnTimer = new Timer();
				tryConnTimer.schedule( new TimerTask() {
					public void run() {
						try {
							if( connection == null || !connection.isOpen() ) {
								connection = factory.newConnection();
							}
							status = Status.OPEN;
							RabbitmqConnection.getInstance().getChannelPool().clear();
							this.cancel();
							tryConnTimer = null;
							logger.info( "RabbitMQ服务器重新连接成功" );

							RabbitmqConnection.getInstance().sendCacheMessage();
						}
						catch( Exception e ) {
							if( e instanceof java.net.ConnectException
									|| e instanceof java.net.NoRouteToHostException ) {
								logger.error( "RabbitMQ连接失败，" + String.valueOf( INTERVAL / 1000 ) + "秒后自动重试 --nodb" );
							}
							else {
								e.printStackTrace();
							}
						}
					}
				}, INTERVAL, INTERVAL );

				status = Status.AGAIN;
			}
		}

	}

	private void sendCacheMessage() throws Exception {
		RabbitmqSender sender = new RabbitmqSender();
		while (true) {
			TempMessage message = RabbitmqCacheData.getInstance().getNext();
			if( message == null ) break;

			try {
				sender.send( message.getQueueName(), message.getMessage() );
				logger.info( "Send to MessageQueue " + message.getQueueName() + " successfully : "
						+ new String( message.getMessage() ) + " --nodb" );
			}
			catch( Exception e ) {
				RabbitmqCacheData.getInstance().add( message );
				e.printStackTrace();
				break;
			}
		}
	}

	public enum Status {
		OPEN(), CLOSE(), AGAIN;
	}
}
