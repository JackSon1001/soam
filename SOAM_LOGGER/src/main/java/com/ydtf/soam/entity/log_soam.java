package com.ydtf.soam.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import com.ydtf.soam.system.base.entity.EntityBase;
import com.ydtf.soam.system.logger.LogBase;
import com.ydtf.soam.system.logger.StackTrace;

@Document
public class log_soam extends EntityBase {

	private static final long serialVersionUID = 3517768072333996924L;

	public log_soam() {}

	public log_soam( LogBase log ) {
		this.id = log.getId();
		this.service = log.getService();
		this.instance = log.getInstance();
		this.level = log.getLevel();
		this.message = log.getMessage();
		this.logger = log.getLogger();
		this.thread = log.getThread();
		this.date = new Date( log.getDate() );
		this.callerData = log.getCallerData();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column
	private String id;

	@Column
	private String service;

	@Column
	private String instance;

	@Column
	private String level;

	@Column
	private String message;

	@Column
	private String logger;

	@Column
	private String thread;

	@Column
	private Date date;

	@Column
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

	public Date getDate() {
		return date;
	}

	public void setDate( Date date ) {
		this.date = date;
	}

	public List<StackTrace> getCallerData() {
		return callerData;
	}

	public void setCallerData( List<StackTrace> callerData ) {
		this.callerData = callerData;
	}
}
