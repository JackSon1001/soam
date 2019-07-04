package com.ydtf.soam.system.controller.client;

import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ServcieConsume;
import com.ydtf.soam.system.base.entity.ServcieConsumeRegister;

import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@FeignClient(value = "SERVICE-EUREKA")
public interface EurekaServiceRegisterClient {

	@RequestMapping(value = "/service/register", method = RequestMethod.POST)
	public Result<Object> register( @RequestBody ServcieConsumeRegister register );

	@RequestMapping(value = "/service", method = RequestMethod.POST)
	public Result<List<ServcieConsume>> getConsumer( @RequestBody ServcieConsume consume );
}
