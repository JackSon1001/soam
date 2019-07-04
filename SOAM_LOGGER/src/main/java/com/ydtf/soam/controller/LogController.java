package com.ydtf.soam.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.entity.log_soam;
import com.ydtf.soam.repository.LogRepository;
import com.ydtf.soam.system.base.entity.PageEntity;
import com.ydtf.soam.system.base.entity.Result;

import io.swagger.annotations.ApiOperation;

@RestController
public class LogController {

	@Autowired
	LogRepository logRepository;

	@ApiOperation(value = "获取日志列表")
	@RequestMapping(value = "/log/list", method = RequestMethod.POST)
	public Result<List<log_soam>> getList( @RequestBody log_soam entity ) {
		Sort sort = new Sort( Direction.DESC, "timestamp" );

		if( logRepository.count( Example.of( entity ) ) > 100 ) {
			Page<log_soam> page = logRepository.findAll( Example.of( entity ), new PageRequest( 0, 100, sort ) );
			return new Result<List<log_soam>>( page.getContent() );
		}

		List<log_soam> data = logRepository.findAll( Example.of( entity ), sort );
		return new Result<List<log_soam>>( data );
	}

	@ApiOperation(value = "获取日志数量")
	@RequestMapping(value = "/log/count", method = RequestMethod.POST)
	public Result<Long> getCount( @RequestBody log_soam entity ) {
		return new Result<Long>( logRepository.count( Example.of( entity ) ) );
	}

	@ApiOperation(value = "分页查询日志列表")
	@RequestMapping(value = "/log/page", method = RequestMethod.POST)
	public Result<Page<log_soam>> getPage( @RequestBody PageEntity<log_soam> pageEntity ) {
		log_soam entity = pageEntity.queryParams;
		PageRequest pageRequest = pageEntity.getPageRequest();
		Page<log_soam> data = logRepository.findAll( Example.of( entity.removeEmpty() ), pageRequest );
		return new Result<Page<log_soam>>( data );
	}

	@ApiOperation(value = "根据服务名与时间段获取日志数量")
	@RequestMapping(value = "/log/count/between", method = RequestMethod.POST)
	public Result<Long> getCount( @RequestBody ModelMap modelMap ) {
		Date start = new Date( Long.valueOf( modelMap.get( "start" ).toString() ) );
		Date end = new Date( Long.valueOf( modelMap.get( "end" ).toString() ) );
		Long count;

		if( modelMap.get( "service" ) == null || StringUtils.isEmpty( modelMap.get( "service" ).toString() ) ) {
			count = logRepository.countByDateBetween( start, end );
		}
		else {
			String service = modelMap.get( "service" ).toString();
			count = logRepository.countByServiceAndDateBetween( service, start, end );
		}

		return new Result<Long>( count );
	}

}
