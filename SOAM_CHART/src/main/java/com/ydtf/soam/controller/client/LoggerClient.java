package com.ydtf.soam.controller.client;

import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ydtf.soam.controller.hystrix.LoggerHystrix;
import com.ydtf.soam.system.base.entity.Result;

import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@FeignClient(value = "SERVICE-LOGGER", fallback = LoggerHystrix.class)
public interface LoggerClient {

	@RequestMapping(value = "/logger/log/list", method = RequestMethod.POST)
	public Result<List<?>> getLogList( @RequestBody ModelMap modelMap );

	@RequestMapping(value = "/logger/log/count", method = RequestMethod.POST)
	public Result<Long> getLogCount( @RequestBody ModelMap modelMap );

	@RequestMapping(value = "/logger/log/page", method = RequestMethod.POST)
	public Result<?> getLogPage( @RequestBody ModelMap modelMap );

	@RequestMapping(value = "/logger/log/count/between", method = RequestMethod.POST)
	public Result<Long> getLogCountByServiceAndDateBetween( @RequestBody ModelMap modelMap );

	@RequestMapping(value = "/logger/request/count", method = RequestMethod.POST)
	public Result<Long> getRequestCount( @RequestBody ModelMap modelMap );

	@RequestMapping(value = "/logger/request/count/between", method = RequestMethod.POST)
	public Result<Long> getRequestCountByServiceAndDateBetween( @RequestBody ModelMap modelMap );

	@RequestMapping(value = "/logger/request/list/chart9", method = RequestMethod.POST)
	public Result<ModelMap> getRequestFindByDateBetween( @RequestBody ModelMap modelMap );
}