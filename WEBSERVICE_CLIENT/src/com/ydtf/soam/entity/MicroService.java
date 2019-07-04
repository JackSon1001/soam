package com.ydtf.soam.entity;

public enum MicroService {
	WORK(0, "/ws/workflow"), SERVICE(1, "/ws/service/");

	private Integer code;

	private String addr;

	MicroService( Integer code, String addr ) {
		this.code = code;
		this.addr = addr;
	}

	public Integer getCode() {
		return code;
	}

	public String getAddr() {
		return addr;
	}
}
