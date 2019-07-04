package com.ydtf.soam.system.base.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class System {
	
	@Bean
    public SystemConfig systemConfig(){
        return new SystemConfig();
    }
}