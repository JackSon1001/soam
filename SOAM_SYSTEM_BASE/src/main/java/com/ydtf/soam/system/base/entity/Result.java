package com.ydtf.soam.system.base.entity;

/**
 * @author zhanglei
 * @date 2016-08-27
 * */

public class Result<T> {
	private Integer code;
	private String message;
	private T body;

	public Result() {}

	public Result( ResultEnum status ) {
		this.code = status.getCode();
		this.message = status.getMessage();
	}

	public Result( T body ) {
		this.code = ResultEnum.OK.getCode();
		this.message = ResultEnum.OK.getMessage();
		this.body = body;
	}

	public Result( Integer code, String message ) {
		this.code = code;
		this.message = message;
	}

	public Result( Integer code, String message, T body ) {
		this.code = code;
		this.message = message;
		this.body = body;
	}

	public Integer getCode() {
		return code;
	}

	public void setCode( Integer code ) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage( String message ) {
		this.message = message;
	}

	public T getBody() {
		return body;
	}

	public void setBody( T body ) {
		this.body = body;
	}
}
