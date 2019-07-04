package com.ydtf.soam.entity.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class flow_ins_line extends EntityBase {

	private static final long serialVersionUID = -2483302592567474160L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@Column(name = "iid", unique = false, nullable = false)
	private Long iid;

	@Column(name = "tid", unique = false, nullable = false)
	private Long tid;

	@Column(name = "key1", unique = false, nullable = false, length = 128)
	private String key;

	@Column(name = "alt", unique = false, nullable = true)
	private Boolean alt;

	@Column(name = "name", unique = false, nullable = true, length = 128)
	private String name;

	@Column(name = "from1", unique = false, nullable = true, length = 32)
	private String from;

	@Column(name = "to1", unique = false, nullable = true, length = 32)
	private String to;

	@Column(name = "m", unique = false, nullable = true)
	private Float m;

	@Column(name = "type", unique = false, nullable = true, length = 32)
	private String type;

	@Column(name = "status", unique = false, nullable = true, length = 32)
	private String status;

	public String getStatus() {
		return status;
	}

	public void setStatus( String status ) {
		this.status = status;
	}

	public void setId( Long id ) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	/**
	 * @return 模板ID
	 */
	public Long getTid() {
		return tid;
	}

	/**
	 * @param 模板ID
	 */
	public void setTid( Long tid ) {
		this.tid = tid;
	}

	public String getKey() {
		return key;
	}

	public void setKey( String key ) {
		this.key = key;
	}

	public void setAlt( Boolean alt ) {
		this.alt = alt;
	}

	public Boolean getAlt() {
		return alt;
	}

	public void setName( String name ) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setFrom( String from ) {
		this.from = from;
	}

	public String getFrom() {
		return from;
	}

	public void setTo( String to ) {
		this.to = to;
	}

	public String getTo() {
		return to;
	}

	public void setM( Float m ) {
		this.m = m;
	}

	public Float getM() {
		return m;
	}

	public void setType( String type ) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public Long getIid() {
		return iid;
	}

	public void setIid( Long iid ) {
		this.iid = iid;
	}

}