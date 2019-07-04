package com.ydtf.soam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaServer //启动服务注册中心
@EnableDiscoveryClient
@EnableFeignClients
public class ApplictionMain {
	public static void main( String[] args ) throws Exception {
		SpringApplication.run( ApplictionMain.class, args );
	}
}