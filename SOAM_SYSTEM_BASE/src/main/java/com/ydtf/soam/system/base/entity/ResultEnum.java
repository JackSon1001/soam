package com.ydtf.soam.system.base.entity;

public enum ResultEnum {
	OK(0, "ok"), ERROR(1, "error");

	private Integer code;

	private String message;

	private Object body;

	ResultEnum( Integer code, String message ) {
		this.code = code;
		this.message = message;
		this.body = null;
	}

	public Integer getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

	public Object getBody() {
		return body;
	}
}
