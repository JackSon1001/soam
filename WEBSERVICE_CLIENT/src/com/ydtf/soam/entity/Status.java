package com.ydtf.soam.entity;

public enum Status {
	OK(0, "ok"), ERROR(1, "error");

	private Integer code;

	private String message;

	Status( Integer code, String message ) {
		this.code = code;
		this.message = message;
	}

	public Integer getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}
}
