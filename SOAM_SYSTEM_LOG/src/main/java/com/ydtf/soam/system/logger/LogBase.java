package com.ydtf.soam.system.logger;

import java.util.List;

public class LogBase {
	private String id;
	private String service;
	private String instance;
	private String level;
	private String message;
	private String logger;
	private String thread;
	private Long date;
	private List<StackTrace> callerData;

	public String getId() {
		return id;
	}

	public void setId( String id ) {
		this.id = id;
	}

	public String getService() {
		return service;
	}

	public void setService( String service ) {
		this.service = service;
	}

	public String getInstance() {
		return instance;
	}

	public void setInstance( String instance ) {
		this.instance = instance;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel( String level ) {
		this.level = level;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage( String message ) {
		this.message = message;
	}

	public String getLogger() {
		return logger;
	}

	public void setLogger( String logger ) {
		this.logger = logger;
	}

	public String getThread() {
		return thread;
	}

	public void setThread( String thread ) {
		this.thread = thread;
	}

	public Long getDate() {
		return date;
	}

	public void setDate( Long date ) {
		this.date = date;
	}

	public List<StackTrace> getCallerData() {
		return callerData;
	}

	public void setCallerData( List<StackTrace> callerData ) {
		this.callerData = callerData;
	}

}
