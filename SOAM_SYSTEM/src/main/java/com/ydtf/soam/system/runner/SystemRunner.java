package com.ydtf.soam.system.runner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.ydtf.soam.system.base.config.SystemConfig;


@Component
@Order(value = 1)
public class SystemRunner implements CommandLineRunner {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	@Autowired
	SystemConfig config;

	@Override
	public void run( String... args ) throws Exception {
		if( StringUtils.isEmpty( config.getAppName() ) ) throw new Exception( "未配置系统名" );
		if( StringUtils.isEmpty( config.getInstanceId() ) ) throw new Exception( "未配置系统实例名" );

		logger.info( "Application启动完毕,系统名:" + config.getAppName() + ",系统实例名:" + config.getInstanceId() + ",系统日志启用:" + config.getLogEnabled() + ",静态资源路径:"
				+ config.getResourcePath() );
	}
}