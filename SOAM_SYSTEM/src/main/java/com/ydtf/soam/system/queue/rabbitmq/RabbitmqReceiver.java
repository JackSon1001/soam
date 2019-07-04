package com.ydtf.soam.system.queue.rabbitmq;

import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;

/**
 * @author zhanglei
 * @date 2016-08-16
 * */
public class RabbitmqReceiver {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	private String host;//MabbitMQ所在主机
	private Integer port;//MabbitMQ所在主机
	//private String queueName;//队列名称
	private String userName;//用户
	private String passWord;//密码
	//private Integer sleepMillis; //间隔毫秒

	private static ConnectionFactory factory;
	private static Connection connection;

	public RabbitmqReceiver() throws Exception {
		host = RabbitmqConfig.getHost();
		port = RabbitmqConfig.getPort();
		//queueName = RabbitmqConfig.getQueueName();
		userName = RabbitmqConfig.getUserName();
		passWord = RabbitmqConfig.getPassWord();
		//sleepMillis = RabbitmqConfig.getSleepMillis();

		if( factory == null ) {
			factory = new ConnectionFactory();//创建连接连接到MabbitMQ
			//指定线程池  
			//ExecutorService service = Executors.newFixedThreadPool( 100 );
			//factory.setSharedExecutor( service );
			factory.setHost( this.host );//设置MabbitMQ所在主机ip或者主机名
			factory.setPort( this.port );//设置MabbitMQ所在主机端口
			factory.setUsername( this.userName );
			factory.setPassword( this.passWord );
		}

		/*if( connection == null || !connection.isOpen() ) {
			connection = factory.newConnection(); //创建一个连接
		}*/
	}

	public void Recv( String queueName, boolean autoAck, IhandleDelivery handleDelivery ) throws Exception {
		if( connection == null || !connection.isOpen() ) {
			try {
				connection = factory.newConnection(); //创建一个连接
			}
			catch( java.net.ConnectException e ) {
				Timer timer = new Timer();
				timer.schedule( new TimerTask() {
					public void run() {
						try {
							Recv( queueName, autoAck, handleDelivery );
							this.cancel();
						}
						catch( Exception e ) {
							e.printStackTrace();
						}
						finally {
							this.cancel();
						}

					}
				}, 10000 );

				logger.error( "RabbitMQ服务器连接失败，消费" + queueName + " 10秒后重试" );
				return;
			}
		}

		try {
			Channel channel = connection.createChannel();//创建一个频道
			channel.basicQos( 1 );//同时只接收一条消息
			channel.queueDeclare( queueName, false, false, false, null );//指定一个队列
			channel.basicConsume( queueName, autoAck, new DefaultConsumer( channel ) {
				@Override
				public void handleDelivery( String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body ) {
					Long deliveryTag = envelope.getDeliveryTag();

					try {
						handleDelivery.handleDelivery( channel, consumerTag, envelope, properties, body );
						//消息确认
						if( !autoAck ) channel.basicAck( deliveryTag, false );
					}
					catch( Exception e ) {
						try {
							//消息退回
							if( !autoAck ) channel.basicNack( deliveryTag, false, true );
						}
						catch( IOException e1 ) {
							e1.printStackTrace();
						}
						e.printStackTrace();
					}
				}
			} );
		}
		catch( com.rabbitmq.client.AlreadyClosedException e ) {
			factory = null;
			connection = null;

			factory = new ConnectionFactory();
			factory.setHost( this.host );
			factory.setPort( this.port );
			factory.setUsername( this.userName );
			factory.setPassword( this.passWord );
			connection = factory.newConnection();

			Recv( queueName, autoAck, handleDelivery );
		}

	}

	public void setHost( String host ) {
		this.host = host;
	}

	public void setPort( Integer port ) {
		this.port = port;
	}

	public void setUserName( String userName ) {
		this.userName = userName;
	}

	public void setPassWord( String passWord ) {
		this.passWord = passWord;
	}
}
