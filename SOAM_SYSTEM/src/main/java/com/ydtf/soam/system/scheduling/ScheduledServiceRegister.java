package com.ydtf.soam.system.scheduling;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.ydtf.soam.system.base.entity.ServcieConsume;
import com.ydtf.soam.system.base.entity.ServcieConsumeRegister;
import com.ydtf.soam.system.controller.client.EurekaServiceRegisterClient;
import com.ydtf.soam.system.logger.LogConfig;

import net.vidageek.mirror.dsl.Mirror;

@EnableScheduling
@Component
public class ScheduledServiceRegister {

	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	@Autowired
	EurekaServiceRegisterClient eurekaClient;

	//第一次延迟10秒执行，之后按上一次执行完毕时间点之后1小时再执行
	@Scheduled(initialDelay = 5000, fixedDelay = 3600000)
	public void register() {
		
		ClassLoader cl = Thread.currentThread().getContextClassLoader();
		List<ServcieConsume> servcieConsumeList = new ArrayList<ServcieConsume>();

		Arrays.asList( (Object[]) new Mirror().on( new Mirror().on( cl ).get().field( "classes" ) ).get().field( "elementData" ) ).stream().forEach( _c -> {
			try {
				Class<?> c = (Class<?>) _c;
				FeignClient fc = c.getAnnotation( FeignClient.class );
				if( fc == null ) return;

				String svcName = fc.value().toUpperCase();
				for( Method m : new Mirror().on( c ).reflectAll().methods() ) {
					String[] paths = m.getAnnotation( RequestMapping.class ).value();
					for( String path : paths ) {
						ServcieConsume item = new ServcieConsume();
						item.setUrl( path );
						item.setServiceName( svcName );
						item.setClientName( LogConfig.getServiceName() );
						item.setClientClassName( c.getName() );
						servcieConsumeList.add( item );
					}
				}
			}
			catch( Exception e ) {
			}
		} );
		
		ServcieConsumeRegister register = new ServcieConsumeRegister();
		register.setClientName( LogConfig.getServiceName() );
		register.setConsumeList( servcieConsumeList );
		eurekaClient.register( register );

		logger.info( "FeignClient扫描完毕: " + JSON.toJSONString( servcieConsumeList ) );

	}
}
