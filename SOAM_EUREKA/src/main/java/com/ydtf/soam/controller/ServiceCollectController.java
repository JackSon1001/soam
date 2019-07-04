package com.ydtf.soam.controller;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;
import com.ydtf.soam.system.base.entity.ServcieConsume;
import com.ydtf.soam.system.base.entity.ServcieConsumeRegister;

@RestController
public class ServiceCollectController {

	private final String REDIS_KEY = "SOAM_SERVICE_COLLECT";

	@Bean
	public RedisTemplate<String, ServcieConsume> redisTemplate( RedisConnectionFactory redisConnectionFactory ) throws UnknownHostException {
		RedisTemplate<String, ServcieConsume> template = new RedisTemplate<String, ServcieConsume>();
		template.setConnectionFactory( redisConnectionFactory );
		return template;
	}

	@Autowired
	RedisTemplate<String, ServcieConsume> redisTemplate;

	@RequestMapping(value = "/service/register", method = RequestMethod.POST)
	public Result<Object> register( @RequestBody ServcieConsumeRegister register ) {
		if( register == null || StringUtils.isEmpty( register.getClientName() ) || register.getConsumeList() == null ) {
			return new Result<Object>( ResultEnum.ERROR );
		}

		String clientName = register.getClientName();
		List<ServcieConsume> list = register.getConsumeList();

		redisTemplate.opsForSet().members( REDIS_KEY ).forEach( item -> {
			if( Objects.equals( clientName, item.getClientName() ) ) {
				redisTemplate.opsForSet().remove( REDIS_KEY, item );
			}
		} );

		for( ServcieConsume consume : list ) {
			redisTemplate.opsForSet().add( REDIS_KEY, consume );
		}

		return new Result<Object>( ResultEnum.OK );
	}

	@RequestMapping(value = "/service", method = RequestMethod.POST)
	public Result<List<ServcieConsume>> getConsumer( @RequestBody ModelMap modelMap ) {
		String serviceName = modelMap.get( "serviceName" ) != null ? modelMap.get( "serviceName" ).toString() : "";
		String clientName = modelMap.get( "clientName" ) != null ? modelMap.get( "clientName" ).toString() : "";

		List<ServcieConsume> list = new ArrayList<ServcieConsume>();
		List<ServcieConsume> serviceCollect = new ArrayList<ServcieConsume>();

		redisTemplate.opsForSet().members( REDIS_KEY ).forEach( item -> {
			serviceCollect.add( item );
		} );

		if( !StringUtils.isEmpty( serviceName ) ) {
			for( ServcieConsume item : serviceCollect ) {
				if( Objects.equals( serviceName, item.getServiceName() ) ) {
					list.add( item );
				}
			}
			return new Result<List<ServcieConsume>>( list );
		}
		else if( !StringUtils.isEmpty( clientName ) ) {
			for( ServcieConsume item : serviceCollect ) {
				if( Objects.equals( clientName, item.getClientName() ) ) {
					list.add( item );
				}
			}
			return new Result<List<ServcieConsume>>( list );
		}

		else {
			return new Result<List<ServcieConsume>>( serviceCollect );
		}
	}

}
