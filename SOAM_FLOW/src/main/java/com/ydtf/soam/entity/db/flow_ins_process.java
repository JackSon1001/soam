package com.ydtf.soam.entity.db;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class flow_ins_process extends EntityBase {

	private static final long serialVersionUID = 2487474731934742077L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@Column(name = "iid", unique = false, nullable = false)
	private Long iid;

	@Column(name = "name", unique = false, nullable = false, length = 128)
	private String name;

	@Column(name = "type", unique = false, nullable = false, length = 32)
	private String type;

	@Column(name = "status", unique = false, nullable = false, length = 32)
	private String status;

	@Column(name = "system", unique = false, nullable = false, length = 64)
	private String system;

	@Column(name = "start", unique = false, nullable = true, length = 3)
	private Date start;

	@Column(name = "end", unique = false, nullable = true, length = 3)
	private Date end;

	@Column(name = "error_message", unique = false, nullable = true, length = 1024)
	private String error_message;

	public void setId( Long id ) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setName( String name ) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setType( String type ) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setStatus( String status ) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setSystem( String system ) {
		this.system = system;
	}

	public String getSystem() {
		return system;
	}

	public void setStart( Date start ) {
		this.start = start;
	}

	public Date getStart() {
		return start;
	}

	public void setEnd( Date end ) {
		this.end = end;
	}

	public Date getEnd() {
		return end;
	}

	public void setError_message( String error_message ) {
		this.error_message = error_message;
	}

	public String getError_message() {
		return error_message;
	}

	public Long getIid() {
		return iid;
	}

	public void setIid( Long iid ) {
		this.iid = iid;
	}

}