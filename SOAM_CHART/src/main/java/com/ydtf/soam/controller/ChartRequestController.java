package com.ydtf.soam.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.ydtf.soam.controller.client.LoggerClient;
import com.ydtf.soam.system.base.entity.Result;

@RestController
public class ChartRequestController {

	@Autowired
	LoggerClient loggerClient;

	@RequestMapping(value = "/request/chart1", method = RequestMethod.POST)
	public Result<Long> getChart1() {
		ModelMap modelMap = new ModelMap();
		Result<Long> count = loggerClient.getRequestCount( modelMap );
		return count;
	}

	@RequestMapping(value = "/request/chart2", method = RequestMethod.POST)
	public Result<?> getChart2( @RequestBody ModelMap modelMap ) {

		final int fixed = 30;
		final int minute = modelMap.get( "minute" ) == null ? fixed
				: Integer.valueOf( modelMap.get( "minute" ).toString() ) < 0 ? 0
						: Integer.valueOf( modelMap.get( "minute" ).toString() );
		final int quantum = modelMap.get( "quantum" ) == null ? 1
				: Integer.valueOf( modelMap.get( "quantum" ).toString() ) <= 0 ? 1
						: Integer.valueOf( modelMap.get( "quantum" ).toString() );

		List<String> times = Lists.newArrayList();
		List<Long> logs = Lists.newArrayList();
		List<Long> requests = Lists.newArrayList();
		List<Integer> logCounts = Lists.newArrayList();
		List<Integer> requestCounts = Lists.newArrayList();
		Map<String, Integer> logCountMap = Maps.newLinkedHashMap();
		Map<String, Integer> requestCountMap = Maps.newLinkedHashMap();
		ModelMap queryMap = new ModelMap();
		ModelMap resultMap = new ModelMap();
		SimpleDateFormat formatter = new SimpleDateFormat( "HH:mm" );
		Date start = new Date();
		Date end = new Date();

		/*时间段List*/
		Date date = DateUtils.addMinutes( new Date(), minute * -1 );
		for( int i = 0; i < minute; i = i + quantum ) {
			String time = formatter.format( date );
			times.add( formatter.format( date ) );
			logCountMap.put( time, 0 );
			requestCountMap.put( time, 0 );
			date = DateUtils.addMinutes( date, quantum );
		}

		/*将时间段分组，进行查询，避免长时间未响应*/
		List<Integer> grups = Lists.newArrayList();
		int minute2 = minute;
		do {
			if( minute2 < fixed ) grups.add( minute2 );
			else grups.add( fixed );
			minute2 = minute2 - fixed;
		}
		while (minute2 > 0);

		for( Integer min : grups ) {
			start = DateUtils.addMinutes( end, min * -1 );
			queryMap.put( "start", start.getTime() );
			queryMap.put( "end", end.getTime() );
			resultMap = loggerClient.getRequestFindByDateBetween( queryMap ).getBody();
			logs.addAll( JSON.parseArray( resultMap.get( "log" ).toString(), Long.class ) );
			requests.addAll( JSON.parseArray( resultMap.get( "request" ).toString(), Long.class ) );
			end = start;
		}

		/*填充某时间段的请求数量和日志数量*/
		Calendar cal = Calendar.getInstance();
		int _count = 0;
		for( Long d : logs ) {
			cal.setTimeInMillis( d );
			String key = formatter.format( cal.getTime() );
			_count++;
			if( logCountMap.get( key ) != null ) {
				logCountMap.put( key, logCountMap.get( key ) + _count );
				_count = 0;
			}
		}
		_count = 0;
		for( Long d : requests ) {
			cal.setTimeInMillis( d );
			String key = formatter.format( cal.getTime() );
			_count++;
			if( requestCountMap.get( key ) != null ) {
				requestCountMap.put( key, requestCountMap.get( key ) + _count );
				_count = 0;
			}
		}

		/*将Map中的请求数量和日志数量，放入返回List*/
		for( Entry<String, Integer> entry : logCountMap.entrySet() ) {
			logCounts.add( entry.getValue() );
		}
		for( Entry<String, Integer> entry : requestCountMap.entrySet() ) {
			requestCounts.add( entry.getValue() );
		}

		/*返回结果数据*/
		ModelMap result = new ModelMap();
		result.put( "times", times );
		result.put( "log", logCounts );
		result.put( "request", requestCounts );
		return new Result<>( result );
	}

}
