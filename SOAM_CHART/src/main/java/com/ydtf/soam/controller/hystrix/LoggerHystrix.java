package com.ydtf.soam.controller.hystrix;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

import com.ydtf.soam.controller.client.LoggerClient;
import com.ydtf.soam.system.base.entity.Result;

@Component
public class LoggerHystrix implements LoggerClient {

	@Override
	public Result<List<?>> getLogList( ModelMap modelMap ) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<Long> getLogCount( ModelMap modelMap ) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<?> getLogPage( ModelMap modelMap ) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<Long> getLogCountByServiceAndDateBetween( ModelMap modelMap ) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<Long> getRequestCount( ModelMap modelMap ) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<Long> getRequestCountByServiceAndDateBetween( ModelMap modelMap ) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<ModelMap> getRequestFindByDateBetween( ModelMap modelMap ) {
		return null;
	}

}
