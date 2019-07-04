package com.ydtf.soam.system.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.ydtf.soam.system.base.config.SystemConfig;
import com.ydtf.soam.system.interceptor.LogRequestHandlerInterceptor;

/**
 * @author 张磊
 * @date 2016-09-24
 */

@Configuration
public class WebAppConfigurer extends WebMvcConfigurerAdapter {

	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	@Autowired
	SystemConfig config;

	@Override
	public void addResourceHandlers( ResourceHandlerRegistry registry ) {
		if( !StringUtils.isEmpty( config.getResourcePath() ) ) {
			registry.addResourceHandler( "/resource/**" ).addResourceLocations( config.getResourcePath() );
			logger.info( "静态资源转向：[/resource/**] to [" + config.getResourcePath() + "]" );
		}
	}

	// 多个拦截器组成一个拦截器链
	// addPathPatterns 用于添加拦截规则
	// excludePathPatterns 用户排除拦截
	@Override
	public void addInterceptors( InterceptorRegistry registry ) {
		//Request请求信息的拦截器
		if( config.isRecordRequestEnabled() ) {
			LogRequestHandlerInterceptor logRequestHandlerInterceptor = new LogRequestHandlerInterceptor();
			registry.addInterceptor( logRequestHandlerInterceptor ).addPathPatterns( "/**" ).excludePathPatterns( "/js/**", "/resource/**", "/webjar/**", "/error" );

			logger.info( "增加Request请求信息记录器" );
		}
	}
}