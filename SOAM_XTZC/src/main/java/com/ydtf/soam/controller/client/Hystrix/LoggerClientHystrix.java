package com.ydtf.soam.controller.client.Hystrix;


import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

import com.ydtf.soam.controller.client.LoggerClient;
import com.ydtf.soam.system.base.entity.Result;

@Component
public class LoggerClientHystrix implements LoggerClient {

	@Override
	public Result<Long> getCount(ModelMap modelMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<?> getPage(ModelMap modelMap) {
		// TODO Auto-generated method stub
		System.out.println( "11111111111111111" );
		return null;
	}

	@Override
	public Result<Long> getLogCount(ModelMap modelMap) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<?> getLogPage(ModelMap modelMap) {
		// TODO Auto-generated method stub
		return null;
	}
}
