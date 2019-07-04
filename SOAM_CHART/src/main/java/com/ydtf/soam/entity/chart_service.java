package com.ydtf.soam.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class chart_service extends EntityBase {

	private static final long serialVersionUID = -1895439373959428687L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@Column(name = "service_id", unique = false, nullable = false, length = 64)
	private String service_id;

	@Column(name = "service_name", unique = false, nullable = true, length = 128)
	private String service_name;

	@Column(name = "version", unique = false, nullable = true)
	private Long version;

	@Column(name = "interface_name", unique = false, nullable = true, length = 128)
	private String interface_name;

	@Column(name = "producer", unique = false, nullable = false, length = 32)
	private String producer;

	@Column(name = "consumer", unique = false, nullable = false, length = 32)
	private String consumer;

	@Column(name = "call_start", unique = false, nullable = false)
	private Date call_start;

	@Column(name = "call_end", unique = false, nullable = false)
	private Date call_end;

	@Column(name = "success", unique = false, nullable = false)
	private Boolean success;

	@Column(name = "error_code", unique = false, nullable = true, length = 32)
	private String error_code;

	@Column(name = "error_message", unique = false, nullable = true, length = 1024)
	private String error_message;

	@Column(name = "org_id", unique = false, nullable = true, length = 16)
	private String org_id;

	@Column(name = "org_name", unique = false, nullable = true, length = 64)
	private String org_name;

	public void setId( Long id ) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setService_id( String service_id ) {
		this.service_id = service_id;
	}

	public String getService_id() {
		return service_id;
	}

	public void setService_name( String service_name ) {
		this.service_name = service_name;
	}

	public String getService_name() {
		return service_name;
	}

	public void setProducer( String producer ) {
		this.producer = producer;
	}

	public String getProducer() {
		return producer;
	}

	public void setConsumer( String consumer ) {
		this.consumer = consumer;
	}

	public String getConsumer() {
		return consumer;
	}

	public void setCall_start( Date call_start ) {
		this.call_start = call_start;
	}

	public Date getCall_start() {
		return call_start;
	}

	public void setCall_end( Date call_end ) {
		this.call_end = call_end;
	}

	public Date getCall_end() {
		return call_end;
	}

	public void setSuccess( Boolean success ) {
		this.success = success;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setError_code( String error_code ) {
		this.error_code = error_code;
	}

	public String getError_code() {
		return error_code;
	}

	public void setOrg_id( String org_id ) {
		this.org_id = org_id;
	}

	public String getOrg_id() {
		return org_id;
	}

	public void setInterface_name( String interface_name ) {
		this.interface_name = interface_name;
	}

	public String getInterface_name() {
		return interface_name;
	}

	public void setError_message( String error_message ) {
		this.error_message = error_message;
	}

	public String getError_message() {
		return error_message;
	}

	public Long getVersion() {
		return version;
	}

	public void setVersion( Long version ) {
		this.version = version;
	}

	public String getOrg_name() {
		return org_name;
	}

	public void setOrg_name( String org_name ) {
		this.org_name = org_name;
	}

}