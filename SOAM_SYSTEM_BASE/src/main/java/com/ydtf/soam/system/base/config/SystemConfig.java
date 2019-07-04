package com.ydtf.soam.system.base.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "soam")
public class SystemConfig {

	/*@Autowired
	private Environment env;*/
	
	/**
	 * 微服务名
	 * */
	private String appName;

	/**
	 * 实例ID
	 * */
	private String instanceId;

	/**
	 * 是否开启日志记录
	 * */
	private Boolean logEnabled;

	/**
	 * 集中化资源路径
	 * */
	private String resourcePath;

	/**
	 * 是否开启Request请求日志记录
	 * */
	private boolean recordRequestEnabled = false;

	/**
	 * Swagger解析根路径
	 * */
	private String swaggerApiBasePackage;

	public String getAppName() {
		return appName;
	}

	public void setAppName( String appName ) {
		this.appName = appName;
	}

	public String getInstanceId() {
		return instanceId;
	}

	public void setInstanceId( String instanceId ) {
		this.instanceId = instanceId;
	}

	public Boolean getLogEnabled() {
		return logEnabled;
	}

	public void setLogEnabled( Boolean logEnabled ) {
		this.logEnabled = logEnabled;
	}

	public String getResourcePath() {
		return resourcePath;
	}

	public void setResourcePath( String resourcePath ) {
		this.resourcePath = resourcePath;
	}

	public boolean isRecordRequestEnabled() {
		return recordRequestEnabled;
	}

	public void setRecordRequestEnabled( boolean recordRequestEnabled ) {
		this.recordRequestEnabled = recordRequestEnabled;
	}

	public String getSwaggerApiBasePackage() {
		return swaggerApiBasePackage;
	}

	public void setSwaggerApiBasePackage( String swaggerApiBasePackage ) {
		this.swaggerApiBasePackage = swaggerApiBasePackage;
	}

	@Value("${eureka.client.serviceUrl.defaultZone}")
	private String eurekaServiceUrl;

	public String getEurekaServiceUrl() {
		return eurekaServiceUrl;
	}

}
