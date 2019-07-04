package com.ydtf.soam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient //激活Eureka中的DiscoveryClient实现
@EnableFeignClients //开启Feign功能
public class SoamXtzcApplication {
	public static void main( String[] args ) {
		SpringApplication.run( SoamXtzcApplication.class, args );
	}
}