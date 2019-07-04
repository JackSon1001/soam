package com.ydtf.soam.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;
import com.ydtf.soam.entity.log_request;
import com.ydtf.soam.entity.log_soam;
import com.ydtf.soam.repository.LogRepository;
import com.ydtf.soam.repository.RequestRepository;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;

import io.swagger.annotations.ApiOperation;

@RestController
public class LogRequestController {

	/*@Autowired
	MongoTemplate mongoTemplate;
	
	@Resource
	RedisTemplate<String, log_soam> redisTemplate;*/

	@Autowired
	RequestRepository requestRepository;
	@Autowired
	LogRepository logRepository;

	@ApiOperation(value = "获取Request日志数量")
	@RequestMapping(value = "/request/count", method = RequestMethod.POST)
	public Result<Long> getCount( @RequestBody log_request entity ) {
		return new Result<Long>( requestRepository.count( Example.of( entity ) ) );
	}

	@RequestMapping(value = "/request/page", method = RequestMethod.POST)
	public Result<Page<log_request>> getPage( @RequestBody PageEntity<log_request> pageEntity ) {
		log_request entity = pageEntity.getEntity();
		Page<log_request> data = requestRepository.findAll( Example.of( entity.removeEmpty() ), pageEntity.getPageRequest() );
		return new Result<Page<log_request>>( data );
	}

	@RequestMapping(value = "/request/count/between", method = RequestMethod.POST)
	public Result<Long> getCount1( @RequestBody ModelMap modelMap ) {
		Date start = new Date( Long.valueOf( modelMap.get( "start" ).toString() ) );
		Date end = new Date( Long.valueOf( modelMap.get( "end" ).toString() ) );
		Long count;

		if( modelMap.get( "service" ) == null || StringUtils.isEmpty( modelMap.get( "service" ).toString() ) ) {
			count = requestRepository.countByDateBetween( start, end );
		}
		else {
			String service = modelMap.get( "service" ).toString();
			count = requestRepository.countByServiceAndDateBetween( service, start, end );
		}

		return new Result<Long>( count );
	}

	@RequestMapping(value = "/request/list/chart9", method = RequestMethod.POST)
	public Result<ModelMap> getCount2( @RequestBody ModelMap modelMap ) {

		System.out.println( JSON.toJSONString( modelMap ) );

		Date start = new Date( Long.valueOf( modelMap.get( "start" ).toString() ) );
		Date end = new Date( Long.valueOf( modelMap.get( "end" ).toString() ) );

		List<log_soam> logs = logRepository.findByDateBetween( start, end );
		List<log_request> requests = requestRepository.findByDateBetween( start, end );

		List<Long> list1 = Lists.newArrayList();
		List<Long> list2 = Lists.newArrayList();

		for( log_soam log : logs ) {
			list1.add( log.getDate().getTime() );
		}
		for( log_request request : requests ) {
			list2.add( request.getDate().getTime() );
		}

		ModelMap result = new ModelMap();
		result.put( "log", list1 );
		result.put( "request", list2 );

		return new Result<ModelMap>( result );
	}

}
