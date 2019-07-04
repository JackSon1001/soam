package com.ydtf.soam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableCaching //开启缓存
@EnableDiscoveryClient //激活Eureka中的DiscoveryClient实现
//@EnableFeignClients //开启Feign功能
public class ApplictionMain {
	// 启动Spring Boot项目的唯一入口
	public static void main( String[] args ) throws Exception {
		SpringApplication.run( ApplictionMain.class, args );
	}
}
