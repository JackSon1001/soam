package com.ydtf.soam.system.base.entity;

import java.io.Serializable;
import java.lang.reflect.Field;

import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSON;

/**
 * @author zhanglei
 * @date 2016-08-22
 * */
public class EntityBase extends CloneableBase implements Serializable {

	private static final long serialVersionUID = 3086957774274403545L;

	public String toJSONString() {
		return JSON.toJSONString( this );
	}

	@SuppressWarnings("unchecked")
	public <T> T removeEmpty() {
		try {
			for( Field field : this.getClass().getDeclaredFields() ) {
				field.setAccessible( true );
				if( field.getType() == String.class && StringUtils.isEmpty( field.get( this ) ) ) {
					field.set( this, null );
				}
			}

		}
		catch( Exception e ) {
			e.printStackTrace();
		}
		return (T) this;
	}
}