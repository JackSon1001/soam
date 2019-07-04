package com.ydtf.soam.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Lists;
import com.ydtf.soam.controller.client.LoggerClient;
import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.base.entity.Result;

@RestController
public class ChartLogController {

	@Autowired
	LoggerClient loggerClient;

	@RequestMapping(value = "/log/count", method = RequestMethod.POST)
	public Result<Long> getList( @RequestBody ModelMap modelMap ) {
		Result<Long> count = loggerClient.getLogCount( modelMap );
		return count;
	}

	@RequestMapping(value = "/log/chart1", method = RequestMethod.GET)
	public Result<?> getChart1() {
		ModelMap modelMap = new ModelMap();
		Long count;
		List<String> list1 = Lists.newArrayList();
		List<Long> list2 = Lists.newArrayList();

		modelMap.put( "service", "SERVICE-EUREKA" );
		count = loggerClient.getLogCount( modelMap ).getBody();
		list1.add( "EUREKA" );
		list2.add( count );

		modelMap.put( "service", "SERVICE-XTZC" );
		count = loggerClient.getLogCount( modelMap ).getBody();
		list1.add( "XTZC" );
		list2.add( count );

		modelMap.put( "service", "SERVICE-SYSTEM" );
		count = loggerClient.getLogCount( modelMap ).getBody();
		list1.add( "SYSTEM" );
		list2.add( count );

		modelMap.put( "service", "SERVICE-CONFIG" );
		count = loggerClient.getLogCount( modelMap ).getBody();
		list1.add( "CONFIG" );
		list2.add( count );

		modelMap.put( "service", "SERVICE-CHART" );
		count = loggerClient.getLogCount( modelMap ).getBody();
		list1.add( "CHART" );
		list2.add( count );

		modelMap.put( "service", "SERVICE-WS" );
		count = loggerClient.getLogCount( modelMap ).getBody();
		list1.add( "WS" );
		list2.add( count );

		modelMap = new ModelMap();
		modelMap.put( "names", list1 );
		modelMap.put( "counts", list2 );

		return new Result<>( modelMap );
	}

	@RequestMapping(value = "/log/chart2", method = RequestMethod.GET)
	public Result<?> getChart2() {
		ModelMap modelMap = new ModelMap();
		List<Long> count = Lists.newArrayList();
		List<Long> info = Lists.newArrayList();
		List<Long> error = Lists.newArrayList();
		List<Long> warn = Lists.newArrayList();
		List<Long> qita = Lists.newArrayList();

		modelMap.put( "service", "SERVICE-EUREKA" );
		count.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-XTZC" );
		count.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-SYSTEM" );
		count.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-CONFIG" );
		count.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-CHART" );
		count.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-WS" );
		count.add( loggerClient.getLogCount( modelMap ).getBody() );

		modelMap.put( "level", "INFO" );
		modelMap.put( "service", "SERVICE-EUREKA" );
		info.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-XTZC" );
		info.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-SYSTEM" );
		info.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-CONFIG" );
		info.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-CHART" );
		info.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-WS" );
		info.add( loggerClient.getLogCount( modelMap ).getBody() );

		modelMap.put( "level", "ERROR" );
		modelMap.put( "service", "SERVICE-EUREKA" );
		error.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-XTZC" );
		error.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-SYSTEM" );
		error.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-CONFIG" );
		error.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-CHART" );
		error.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-WS" );
		error.add( loggerClient.getLogCount( modelMap ).getBody() );

		modelMap.put( "level", "WARN" );
		modelMap.put( "service", "SERVICE-EUREKA" );
		warn.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-XTZC" );
		warn.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-SYSTEM" );
		warn.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-CONFIG" );
		warn.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-CHART" );
		warn.add( loggerClient.getLogCount( modelMap ).getBody() );
		modelMap.put( "service", "SERVICE-WS" );
		warn.add( loggerClient.getLogCount( modelMap ).getBody() );

		qita.add( count.get( 0 ) - info.get( 0 ) - error.get( 0 ) - warn.get( 0 ) );
		qita.add( count.get( 1 ) - info.get( 1 ) - error.get( 1 ) - warn.get( 1 ) );
		qita.add( count.get( 2 ) - info.get( 2 ) - error.get( 2 ) - warn.get( 2 ) );
		qita.add( count.get( 3 ) - info.get( 3 ) - error.get( 3 ) - warn.get( 3 ) );
		qita.add( count.get( 4 ) - info.get( 4 ) - error.get( 4 ) - warn.get( 4 ) );
		qita.add( count.get( 5 ) - info.get( 5 ) - error.get( 5 ) - warn.get( 5 ) );

		modelMap.clear();
		modelMap.put( "count", count );
		modelMap.put( "info", info );
		modelMap.put( "error", error );
		modelMap.put( "warn", warn );
		modelMap.put( "qita", qita );

		return new Result<>( modelMap );
	}

	@RequestMapping(value = "/log/chart3", method = RequestMethod.GET)
	public Result<?> getChart3() {
		ModelMap modelMap = new ModelMap();
		ModelMap result = new ModelMap();

		Long count = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "service", "SERVICE-EUREKA" );
		Long eureka = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "service", "SERVICE-XTZC" );
		Long xtzc = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "service", "SERVICE-SYSTEM" );
		Long system = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "service", "SERVICE-CONFIG" );
		Long config = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "service", "SERVICE-CHART" );
		Long chart = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "service", "SERVICE-FLOW" );
		Long flow = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "service", "SERVICE-LOGGER" );
		Long logger = loggerClient.getLogCount( modelMap ).getBody();

		Long qita = count - eureka - xtzc - system - config - chart - flow - logger;

		result.put( "eureka", eureka );
		result.put( "xtzc", xtzc );
		result.put( "system", system );
		result.put( "config", config );
		result.put( "chart", chart );
		result.put( "flow", flow );
		result.put( "logger", logger );
		result.put( "qita", qita );

		return new Result<>( result );
	}

	@RequestMapping(value = "/log/chart4", method = RequestMethod.GET)
	public Result<?> getChart4() {
		ModelMap modelMap = new ModelMap();
		ModelMap result = new ModelMap();

		Long count = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "level", "INFO" );
		Long info = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "level", "ERROR" );
		Long error = loggerClient.getLogCount( modelMap ).getBody();

		modelMap.put( "level", "WARN" );
		Long warn = loggerClient.getLogCount( modelMap ).getBody();

		Long qita = count - info - error - warn;

		result.put( "info", info );
		result.put( "error", error );
		result.put( "warn", warn );
		result.put( "qita", qita );

		return new Result<>( result );
	}

	@RequestMapping(value = "/log/chart5", method = RequestMethod.GET)
	public Result<?> getChart5() throws Exception {
		ModelMap modelMap = new ModelMap();
		ModelMap result = new ModelMap();
		Long count;

		List<String> days = Lists.newArrayList();
		List<Long> system = Lists.newArrayList();
		List<Long> eureka = Lists.newArrayList();
		List<Long> xtzc = Lists.newArrayList();
		List<Long> config = Lists.newArrayList();
		List<Long> chart = Lists.newArrayList();
		List<Long> logger = Lists.newArrayList();
		List<Long> qita = Lists.newArrayList();

		modelMap.put( "start", 0 );
		SimpleDateFormat formatter = new SimpleDateFormat( "yyyy-MM-dd" );
		Date date = formatter.parse( formatter.format( new Date() ) );

		for( int i = 6; i >= 0; i-- ) {
			Calendar cal = Calendar.getInstance();
			cal.setTime( date );
			cal.add( Calendar.DATE, i * -1 );
			Date end = cal.getTime();
			days.add( formatter.format( end ) );

			cal.add( Calendar.DATE, 1 );
			modelMap.put( "service", "" );
			modelMap.put( "end", cal.getTime() );
			count = loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody();

			modelMap.put( "service", Constants.SERVICE.SYSTEM );
			system.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.EUREKA );
			eureka.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.XTZC );
			xtzc.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.CONFIG );
			config.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.CHART );
			chart.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.LOGGER );
			logger.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			int idx = system.size() - 1;
			qita.add( count - system.get( idx ) - eureka.get( idx ) - xtzc.get( idx ) - config.get( idx )
					- chart.get( idx ) - logger.get( idx ) );
		}

		result.put( "days", days );
		result.put( "system", system );
		result.put( "eureka", eureka );
		result.put( "xtzc", xtzc );
		result.put( "config", config );
		result.put( "chart", chart );
		result.put( "logger", logger );
		result.put( "qita", qita );

		return new Result<>( result );
	}

	@RequestMapping(value = "/log/chart6", method = RequestMethod.GET)
	public Result<?> getChart6() throws Exception {
		ModelMap modelMap = new ModelMap();
		ModelMap result = new ModelMap();

		List<String> days = Lists.newArrayList();
		List<Long> count = Lists.newArrayList();
		List<Long> system = Lists.newArrayList();
		List<Long> eureka = Lists.newArrayList();
		List<Long> xtzc = Lists.newArrayList();
		List<Long> config = Lists.newArrayList();
		List<Long> chart = Lists.newArrayList();
		List<Long> logger = Lists.newArrayList();
		List<Long> flow = Lists.newArrayList();
		List<Long> qita = Lists.newArrayList();
		List<Long> request = Lists.newArrayList();

		SimpleDateFormat formatter = new SimpleDateFormat( "yyyy-MM-dd" );
		Date date = formatter.parse( formatter.format( new Date() ) );

		for( int i = 20; i >= 0; i-- ) {
			Calendar cal = Calendar.getInstance();
			cal.setTime( date );
			cal.add( Calendar.DATE, i * -1 );
			Date end = cal.getTime();
			days.add( formatter.format( end ) );

			modelMap.put( "start", cal.getTime() );
			cal.add( Calendar.DATE, 1 );
			modelMap.put( "end", cal.getTime() );

			modelMap.put( "service", "" );
			count.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.SYSTEM );
			system.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.EUREKA );
			eureka.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.XTZC );
			xtzc.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.CONFIG );
			config.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.CHART );
			chart.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.LOGGER );
			logger.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			modelMap.put( "service", Constants.SERVICE.FLOW );
			flow.add( loggerClient.getLogCountByServiceAndDateBetween( modelMap ).getBody() );

			int idx = system.size() - 1;
			qita.add( count.get( idx ) - system.get( idx ) - eureka.get( idx ) - xtzc.get( idx ) - config.get( idx )
					- chart.get( idx ) - logger.get( idx ) - flow.get( idx ) );

			modelMap.remove( "service" );
			request.add( loggerClient.getRequestCountByServiceAndDateBetween( modelMap ).getBody() );
		}

		result.put( "days", days );
		result.put( "count", count );
		result.put( "system", system );
		result.put( "eureka", eureka );
		result.put( "xtzc", xtzc );
		result.put( "config", config );
		result.put( "chart", chart );
		result.put( "logger", logger );
		result.put( "flow", flow );
		result.put( "qita", qita );
		result.put( "request", request );

		return new Result<>( result );
	}
}
