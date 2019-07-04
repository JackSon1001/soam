package com.ydtf.soam.system.controller;

import java.lang.reflect.Field;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.ydtf.soam.system.base.contants.Text;

import springfox.documentation.annotations.ApiIgnore;

/**
 * @author zhanglei
 * @date 2016-09-25
 * */

@ApiIgnore
@RestController
public class ConstantsController {

	private static StringBuffer script = new StringBuffer();

	@RequestMapping(value = "/js/constants.js", method = RequestMethod.GET)
	public String constants() throws Exception {
		if( script != null && script.length() > 0 ) return script.toString();

		StringBuffer funcBuffer = new StringBuffer();
		Class<?> constantsClass = Class.forName( "com.ydtf.soam.system.contants.Constants" );
		JSONObject constants = handleJSON( constantsClass, "this", funcBuffer );

		script.append( "(function(){\n" );
		script.append( "this." + constantsClass.getSimpleName() + "=" + constants.toJSONString() + ";\n" );
		script.append( "\n" );
		script.append( funcBuffer );
		script.append( "})();" );
		return script.toString();
	}

	private JSONObject handleJSON( Class<?> classz, String parent, StringBuffer buffer ) throws Exception {
		JSONObject json = new JSONObject();
		List<JSONObject> list = Lists.newArrayList();

		Field fields[] = classz.getDeclaredFields();
		for( Field field : fields ) {
			String s = field.toString();
			if( s.contains( "public static final" ) ) {
				String key = field.getName();
				Object value = field.get( key );
				json.put( key, value );

				JSONObject data = new JSONObject();
				Text ann = field.getAnnotation( Text.class );
				data.put( "id", value );
				data.put( "name", ann != null ? ann.value() : value );

				list.add( data );
			}
		}

		buffer.append( parent + "." + classz.getSimpleName() + ".getDataList = function(){ return " + JSON.toJSONString( list ) + " };\n" );

		Class<?>[] classs = classz.getClasses();
		for( Class<?> c : classs ) {
			JSONObject j = handleJSON( c, parent + "." + classz.getSimpleName(), buffer );
			json.put( c.getSimpleName(), j );
		}

		return json;
	}
}
