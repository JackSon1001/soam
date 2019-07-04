package com.ydtf.soam.controller;

import java.lang.reflect.Field;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.ydtf.soam.entity.db.chart_service;
import com.ydtf.soam.repository.ChartServiceRepository;
import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.base.contants.Text;
import com.ydtf.soam.system.base.entity.Result;

import io.swagger.annotations.ApiOperation;

@RestController
public class ChartServiceController {
	@Autowired
	ChartServiceRepository chartServiceRepository;

	@ApiOperation(value = "获取时间范围内服务请求数量", notes = "获取时间范围内服务请求数量")
	@RequestMapping(value = "/chart/day", method = RequestMethod.POST)
	public Result<ModelMap> getCount4Day( @RequestBody chart_service service ) {
		List<Object> result = chartServiceRepository.getCount4Day( service.getProducer(), service.getConsumer() );
		List<String> list1 = Lists.newArrayList();
		List<String> list2 = Lists.newArrayList();
		for( Object object : result ) {
			Object[] bean = (Object[]) object;
			list1.add( String.valueOf( bean[0] ) );
			list2.add( String.valueOf( bean[1] ) );

		}

		ModelMap modelMap = new ModelMap();
		modelMap.put( "names", list1 );
		modelMap.put( "counts", list2 );
		return new Result<>( modelMap );
	}

	@ApiOperation(value = "获取实时服务请求数", notes = "获取实时服务请求数")
	@RequestMapping(value = "/chart/constantly", method = RequestMethod.POST)
	public Result<ModelMap> getCount4Constantly( @RequestBody chart_service service ) {
		SimpleDateFormat dsf = new SimpleDateFormat( "yyyy-MM-dd HH:mm" );
		String date = dsf.format( service.getService_id() );
		Object[] result = chartServiceRepository.getCount4Constantly( date );
		JSONObject count = new JSONObject();
		count.put( "name", date );
		String[] array = new String[2];
		array[0] = date;
		array[1] = String.valueOf( (int) (Math.random() * 10000) );
		count.put( "value", array );
		ModelMap modelMap = new ModelMap();
		modelMap.put( "count", count );
		return new Result<>( modelMap );
	}

	@ApiOperation(value = "获取服务请求成功率", notes = "获取服务请求成功率")
	@RequestMapping(value = "/chart/success", method = RequestMethod.POST)
	public Result<ModelMap> getSuccessRatio() throws IllegalArgumentException, IllegalAccessException {
		List<Object[]> successCount = chartServiceRepository.getSuccessCount();
		List<Object[]> serviceCount = chartServiceRepository.getServiceCount();
		List<Integer> list1 = Lists.newArrayList();
		List<Integer> list2 = Lists.newArrayList();
		List<JSONObject> result = Lists.newArrayList();
		Field[] fields = Constants.CSG_SYSTEM.class.getDeclaredFields();
		JSONObject data1 = new JSONObject();
		JSONObject data2 = new JSONObject();
		data1.put( "type", "bar" );
		data1.put( "name", "服务请求次数" );
		data2.put( "name", "服务请求成功次数" );
		data1.put( "type", "bar" );
		for( Field field : fields ) {
			String s = field.toString();
			if( s.contains( "public static final" ) ) {
				String key = field.getName();
				Object value = field.get( key );
				// 按顺序添加服务请求成功次数
				for( int i = 0; i < successCount.size(); i++ ) {
					Object[] bean = successCount.get( i );
					if( String.valueOf( value ).equals( String.valueOf( bean[0] ) ) ) {
						list2.add( Integer.valueOf( String.valueOf( bean[1] ) ) );
						break;
					}
					if( i == successCount.size() - 1 ) {
						list2.add( 0 );
					}
				}
				// 按顺序添加服务请求次数
				for( int i = 0; i < serviceCount.size(); i++ ) {
					Object[] bean = serviceCount.get( i );
					if( String.valueOf( value ).equals( String.valueOf( bean[0] ) ) ) {
						list1.add( Integer.valueOf( String.valueOf( bean[1] ) ) );
						break;
					}
					if( i == serviceCount.size() - 1 ) {
						list1.add( 0 );
					}
				}
			}
		}
		data1.put( "data", list1.toArray() );
		data2.put( "data", list2.toArray() );
		result.add( data1 );
		result.add( data2 );
		ModelMap modelMap = new ModelMap();
		modelMap.put( "result", result );
		return new Result<>( modelMap );
	}

	@ApiOperation(value = "获取服务请求失败率", notes = "获取服务请求失败率")
	@RequestMapping(value = "/chart/failure", method = RequestMethod.POST)
	public Result<ModelMap> getFailureRate() throws IllegalArgumentException, IllegalAccessException {
		List<Object[]> failureCount = chartServiceRepository.getFailureCount();
		List<Object[]> serviceCount = chartServiceRepository.getServiceCount();
		List<Integer> list1 = Lists.newArrayList();
		List<Integer> list2 = Lists.newArrayList();
		List<JSONObject> result = Lists.newArrayList();
		Field[] fields = Constants.CSG_SYSTEM.class.getDeclaredFields();
		JSONObject data1 = new JSONObject();
		JSONObject data2 = new JSONObject();
		data1.put( "type", "bar" );
		data1.put( "name", "服务请求次数" );
		data2.put( "name", "服务请求失败次数" );
		data2.put( "type", "bar" );
		for( Field field : fields ) {
			String s = field.toString();
			if( s.contains( "public static final" ) ) {
				String key = field.getName();
				Object value = field.get( key );
				// 按顺序添加服务请求成功次数
				for( int i = 0; i < failureCount.size(); i++ ) {
					Object[] bean = failureCount.get( i );
					if( String.valueOf( value ).equals( String.valueOf( bean[0] ) ) ) {
						list1.add( Integer.valueOf( String.valueOf( bean[1] ) ) );
						break;
					}
					if( i == failureCount.size() - 1 ) {
						list1.add( 0 );
					}
				}
				// 按顺序添加服务请求次数
				for( int i = 0; i < serviceCount.size(); i++ ) {
					Object[] bean = serviceCount.get( i );
					if( String.valueOf( value ).equals( String.valueOf( bean[0] ) ) ) {
						list2.add( Integer.valueOf( String.valueOf( bean[1] ) ) );
						break;
					}
					if( i == serviceCount.size() - 1 ) {
						list2.add( 0 );
					}
				}
			}
		}
		data1.put( "data", list2.toArray() );
		data2.put( "data", list1.toArray() );
		result.add( data2 );
		result.add( data1 );

		ModelMap modelMap = new ModelMap();
		modelMap.put( "result", result );
		return new Result<>( modelMap );
	}

	@ApiOperation(value = "获取服务成功百分比", notes = "获取服务成功百分比")
	@RequestMapping(value = "/chart/successPercent", method = RequestMethod.POST)
	public Result<ModelMap> getSuccessPercent() throws IllegalArgumentException, IllegalAccessException {
		List<Object[]> serviceCount = chartServiceRepository.getSuccessCount();
		List<JSONObject> list1 = Lists.newArrayList();
		for( Object[] object : serviceCount ) {
			JSONObject json = new JSONObject();
			json.put( "value", String.valueOf( object[1] ) );
			json.put( "name", String.valueOf( object[0] ) );
			list1.add( json );
		}
		int length = list1.size();
		boolean flag = length > 1 ? true : false;
		Field[] fields = Constants.CSG_SYSTEM.class.getDeclaredFields();
		// 和CSG_SYSTEM常量比较。如果不包含，默认为0
		for( Field field : fields ) {
			String s = field.toString();
			if( s.contains( "public static final" ) ) {
				String key = field.getName();
				Object value = field.get( key );
				if( flag ) {
					for( int i = 0; i < length; i++ ) {
						JSONObject json = list1.get( i );
						if( json.get( "name" ).equals( String.valueOf( value ) ) ) {
							break;
						}
						if( i == length - 1 ) {
							JSONObject jsonBean = new JSONObject();
							jsonBean.put( "value", 0 );
							jsonBean.put( "name", value );
							list1.add( jsonBean );
						}
					}
				}
				else {
					JSONObject jsonBean = new JSONObject();
					jsonBean.put( "value", 0 );
					jsonBean.put( "name", value );
					list1.add( jsonBean );
				}
			}
		}
		ModelMap modelMap = new ModelMap();
		modelMap.put( "counts", list1 );
		return new Result<>( modelMap );
	}

	@ApiOperation(value = "获取服务请求成功率排名", notes = "获取服务请求成功率排名")
	@RequestMapping(value = "/chart/successRatioRanking", method = RequestMethod.POST)
	public Result<ModelMap> getSuccessRatioRanking() throws IllegalArgumentException, IllegalAccessException {
		List<Object[]> successCount = chartServiceRepository.getSuccessCount();
		List<Object[]> serviceCount = chartServiceRepository.getServiceCount();
		List<String> list1 = Lists.newArrayList();
		List<String> list2 = Lists.newArrayList();
		List<String> names = Lists.newArrayList();
		List<JSONObject> jsonList = Lists.newArrayList();
		List<JSONObject> tempList = Lists.newArrayList();
		// 计算百分比
		for( Object[] bean : successCount ) {
			JSONObject json = new JSONObject();
			Integer count = Integer.valueOf( String.valueOf( bean[1] ) );
			String name = String.valueOf( bean[0] );
			json.put( "successCount", count );
			json.put( "name", name );
			for( Object[] bean1 : serviceCount ) {
				if( name.equals( String.valueOf( bean1[0] ) ) ) {
					Integer count1 = Integer.valueOf( String.valueOf( bean1[1] ) );
					json.put( "serviceCount", count1 );
					NumberFormat numberFormat = NumberFormat.getInstance();
					// 设置精确到小数点后2位
					numberFormat.setMaximumFractionDigits( 2 );
					String result = numberFormat.format( (float) count / (float) count1 * 100 );
					json.put( "percent", result );
					break;
				}
			}
			jsonList.add( json );
		}
		int length = jsonList.size();
		Object[] jsons = jsonList.toArray();
		// 冒泡排序
		if( length > 0 ) {

			for( int i = 0; i < length - 1; i++ ) {
				for( int j = 0; j < length - 1 - i; j++ ) {
					if( ((JSONObject) jsons[j]).getFloat( "percent" ) > ((JSONObject) jsons[j + 1]).getFloat( "percent" ) ) {
						Object temp = null;
						temp = jsons[j];
						jsons[j] = jsons[j + 1];
						jsons[j + 1] = temp;
					}
				}
			}
		}

		// 設置系统中文名称，补全没有服务请求的系统（6大系统）数据
		Field[] fields = Constants.CSG_SYSTEM.class.getDeclaredFields();
		int jsonLength = jsons.length;
		for( Field field : fields ) {
			String s = field.toString();
			if( s.contains( "public static final" ) ) {
				String key = field.getName();
				Object value = field.get( key );
				Text ann = field.getAnnotation( Text.class );
				String name = ann != null ? ann.value() : key;
				for( int i = 0; i < jsonLength; i++ ) {
					JSONObject json = (JSONObject) jsons[i];
					if( json.getString( "name" ).equals( String.valueOf( value ) ) ) {
						json.put( "bfname", name + "(" + json.getString( "percent" ) + "%)" );
						break;
					}
					if( i == jsonLength - 1 ) {
						JSONObject bean = new JSONObject();
						bean.put( "bfname", name + "(0%)" );
						bean.put( "serviceCount", 0 );
						bean.put( "successCount", 0 );
						tempList.add( bean );
					}
				}
			}
		}

		for( JSONObject json : tempList ) {
			names.add( json.getString( "bfname" ) );
			list1.add( json.getString( "serviceCount" ) );
			list2.add( json.getString( "successCount" ) );
		}
		for( Object json : jsons ) {
			JSONObject bean = (JSONObject) json;
			names.add( bean.getString( "bfname" ) );
			list1.add( bean.getString( "serviceCount" ) );
			list2.add( bean.getString( "successCount" ) );
		}
		ModelMap modelMap = new ModelMap();
		modelMap.put( "names", names );
		modelMap.put( "counts1", list1 );
		modelMap.put( "counts2", list2 );
		return new Result<>( modelMap );
	}

	@ApiOperation(value = "获取服务请求百分比", notes = "获取服务请求百分比")
	@RequestMapping(value = "/chart/requestPercent", method = RequestMethod.POST)
	public Result<ModelMap> getrequestPercent() throws IllegalArgumentException, IllegalAccessException {
		List<Object[]> serviceCount = chartServiceRepository.getServiceCount();
		List<JSONObject> list1 = Lists.newArrayList();
		Field[] fields = Constants.CSG_SYSTEM.class.getDeclaredFields();
		for( Field field : fields ) {
			String s = field.toString();
			if( s.contains( "public static final" ) ) {
				String key = field.getName();
				String value = String.valueOf( field.get( key ) );
				JSONObject json = new JSONObject();
				list1.add( json );
				Text ann = field.getAnnotation( Text.class );
				json.put( "name", ann != null ? ann.value() : key );
				// 按顺序添加服务请求次数
				for( int i = 0; i < serviceCount.size(); i++ ) {
					Object[] bean = serviceCount.get( i );
					if( value.equals( String.valueOf( bean[0] ) ) ) {
						json.put( "value", Integer.valueOf( String.valueOf( bean[1] ) ) );
						break;
					}
					if( i == serviceCount.size() - 1 ) {
						json.put( "value", 0 );
					}
				}

			}
		}
		ModelMap modelMap = new ModelMap();
		modelMap.put( "counts", list1 );
		return new Result<>( modelMap );
	}

	@ApiOperation(value = "获取服务请求错误类别百分比", notes = "获取服务请求错误类别百分比")
	@RequestMapping(value = "/chart/statisticsErrorType", method = RequestMethod.POST)
	public Result<ModelMap> getStatisticsErrorType() throws IllegalArgumentException, IllegalAccessException {
		List<Object[]> serviceCount = chartServiceRepository.statisticsErrorType();
		List<JSONObject> list1 = Lists.newArrayList();
		ModelMap tmpMap = new ModelMap();
		tmpMap.put( "00010401", "网络" );
		tmpMap.put( "00010500", "程序" );
		tmpMap.put( "0001040305", "数据" );
		tmpMap.put( "00010400", "其它" );
		for( Object[] object : serviceCount ) {
			JSONObject json = new JSONObject();
			json.put( "value", Integer.valueOf( String.valueOf( object[0] ) ) );
			json.put( "name", tmpMap.get( String.valueOf( object[1] ) ) );
			list1.add( json );
		}
		ModelMap modelMap = new ModelMap();
		modelMap.put( "counts", list1 );
		return new Result<>( modelMap );
	}

	@ApiOperation(value = "获取各大系统错误百分比", notes = "获取各大系统错误百分比")
	@RequestMapping(value = "/chart/statisticsErrorSystem", method = RequestMethod.POST)
	public Result<ModelMap> getStatisticsErrorSystem() throws IllegalArgumentException, IllegalAccessException {
		List<Object[]> serviceCount = chartServiceRepository.statisticsErrorSystem();
		List<JSONObject> list1 = Lists.newArrayList();
		for( Object[] object : serviceCount ) {
			JSONObject json = new JSONObject();
			json.put( "value", Integer.valueOf( String.valueOf( object[0] ) ) );
			json.put( "name", String.valueOf( object[1] ) );
			list1.add( json );
		}
		ModelMap modelMap = new ModelMap();
		modelMap.put( "counts", list1 );
		return new Result<>( modelMap );
	}

}
