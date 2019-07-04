package com.ydtf.soam.controller.client;


import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ydtf.soam.system.base.entity.Result;

import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@FeignClient(value = "SERVICE-LOGGER")
public interface LoggerClient {
	//请求日志信息
	@ApiOperation(value = "获取Request日志数量")
	@RequestMapping(value = "/logger/request/count", method = RequestMethod.POST)
	public Result<Long> getCount( @RequestBody ModelMap modelMap );

	@ApiOperation(value = "查询分页后的数据")
	@RequestMapping(value = "/logger/request/page", method = RequestMethod.POST)
	public Result<?> getPage( @RequestBody ModelMap modelMap );
	
	//服务日志信息
	@ApiOperation(value = "获取Request日志数量")
	@RequestMapping(value = "/logger/log/count", method = RequestMethod.POST)
	public Result<Long> getLogCount( @RequestBody ModelMap modelMap );

	@ApiOperation(value = "查询分页后的数据")
	@RequestMapping(value = "/logger/log/page", method = RequestMethod.POST)
	public Result<?> getLogPage( @RequestBody ModelMap modelMap );
}
