package com.ydtf.soam.system.config;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * 将所有输出JSON中，为null值的String类型字段，转为""
 * @author 张磊
 */

@Configuration
public class JsonObjectMapper extends ObjectMapper {

	private static final long serialVersionUID = 1L;

	public JsonObjectMapper() {
		super();
		//空值处理为空串  
		this.getSerializerProvider().setNullValueSerializer( new JsonSerializer<Object>() {
			@Override
			public void serialize( Object value, JsonGenerator jg, SerializerProvider sp )
					throws IOException, JsonProcessingException {
				jg.writeString( "" );
			}
		} );
	}
}
