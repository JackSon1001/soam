package com.ydtf.soam.system.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.system.base.config.SystemConfig;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ServcieConsume;
import com.ydtf.soam.system.controller.client.EurekaServiceRegisterClient;
import com.ydtf.soam.system.logger.LogConfig;
import com.ydtf.soam.system.queue.rabbitmq.RabbitmqCacheData;
import com.ydtf.soam.system.queue.rabbitmq.TempMessage;

/**
 * @author zhanglei
 * @date 2016-09-05
 * */

@RestController
@RequestMapping(value = "/sys", method = RequestMethod.GET)
public class SystemController {

	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	/*@Autowired
	StringRedisTemplate redis;*/

	@Autowired
	SystemConfig config;

	@Autowired
	EurekaServiceRegisterClient eurekaClient;

	@RequestMapping("/instance")
	public Result<String> getInstance() {
		logger.info( config.getInstanceId() );
		return new Result<String>( LogConfig.getInstanceId() );
	}

	@RequestMapping("/appname")
	public Result<String> getApplicationName() {
		return new Result<String>( config.getAppName() );
	}

	@RequestMapping("/cacheMessageQueueCount")
	public Result<Integer> getCacheMessageCount() throws Exception {
		return new Result<Integer>( RabbitmqCacheData.getInstance().getAll().size() );
	}

	@RequestMapping("/cacheMessageQueue")
	public Result<List<TempMessage>> getCacheMessage() throws Exception {
		return new Result<List<TempMessage>>( RabbitmqCacheData.getInstance().getAll() );
	}

	@RequestMapping("/consume")
	public Result<List<ServcieConsume>> getConsume() {
		ServcieConsume consume = new ServcieConsume();
		consume.setClientName( config.getAppName() );
		Result<List<ServcieConsume>> result = eurekaClient.getConsumer( consume );
		return result;
	}

	@RequestMapping("/guest")
	public Result<List<ServcieConsume>> getGuest() {
		ServcieConsume consume = new ServcieConsume();
		consume.setServiceName( config.getAppName() );
		Result<List<ServcieConsume>> result = eurekaClient.getConsumer( consume );
		return result;
	}

	@RequestMapping("/config")
	public Result<Object> getSystemConfig() {
		return new Result<Object>( config );
	}
}
