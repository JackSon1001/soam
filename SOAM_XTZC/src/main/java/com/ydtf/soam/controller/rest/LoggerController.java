package com.ydtf.soam.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.controller.client.LoggerClient;
import com.ydtf.soam.system.base.entity.Result;

@RestController
public class LoggerController {

	@Autowired
	LoggerClient logClient;
	
	//-----请求日志信息
	@RequestMapping(value = "/request/page", method = RequestMethod.POST)
	public Result<?> getPage( @RequestBody ModelMap modelMap ) {
		//获取所有记录
		Result<?> result = logClient.getPage( modelMap );
		return result;
	}

	@RequestMapping(value = "/request/count", method = RequestMethod.POST)
	public Result<Long> getCount( @RequestBody ModelMap modelMap ) {
		//获取所有记录
		Result<Long> result = logClient.getCount( modelMap );
		return result;
	}
	
	//-----服务日志信息
	@RequestMapping(value = "/log/page", method = RequestMethod.POST)
	public Result<?> getLogPage( @RequestBody ModelMap modelMap ) {
		//获取所有记录
		Result<?> result = logClient.getLogPage(modelMap);
		return result;
	}

	@RequestMapping(value = "/log/count", method = RequestMethod.POST)
	public Result<Long> getLogCount( @RequestBody ModelMap modelMap ) {
		//获取所有记录
		Result<Long> result = logClient.getLogCount( modelMap );
		return result;
	}
}
