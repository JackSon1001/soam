package com.ydtf.soam;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.SpringCloudApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

import com.ydtf.bdp.security.EnableBDPSecurity;
import com.ydtf.bdp.session.EnableBDPDistributedSession;

@SpringCloudApplication
@EnableZuulProxy //开启Zuul
@EnableBDPSecurity
@EnableBDPDistributedSession
public class ApplictionMain {
	// 启动Spring Boot项目的唯一入口
	public static void main( String[] args ) throws Exception {
		SpringApplication.run( ApplictionMain.class, args );
	}
}