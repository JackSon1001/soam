package com.ydtf.soam.entity.db;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class flow_tmp_info extends EntityBase {

	private static final long serialVersionUID = -425810289608499694L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@Column(name = "ywid", unique = false, nullable = true)
	private Long ywid;

	@Column(name = "name", unique = false, nullable = true, length = 128)
	private String name;

	@Column(name = "init_num", unique = false, nullable = true)
	private Integer initNum;

	@Column(name = "description", unique = false, nullable = true, length = 256)
	private String description;

	@Column(name = "cjr", unique = false, nullable = true)
	private Long cjr;

	@Column(name = "cjsj", unique = false, nullable = true)
	private Date cjsj;

	@Column(name = "xgsj", unique = false, nullable = true)
	private Date xgsj;

	public void setId( Long id ) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setYwid( Long ywid ) {
		this.ywid = ywid;
	}

	public Long getYwid() {
		return ywid;
	}

	public void setName( String name ) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setDescription( String description ) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setCjr( Long cjr ) {
		this.cjr = cjr;
	}

	public Long getCjr() {
		return cjr;
	}

	public void setCjsj( Date cjsj ) {
		this.cjsj = cjsj;
	}

	public Date getCjsj() {
		return cjsj;
	}

	public void setXgsj( Date xgsj ) {
		this.xgsj = xgsj;
	}

	public Date getXgsj() {
		return xgsj;
	}

	public Integer getInitNum() {
		return initNum;
	}

	public void setInitNum( Integer initNum ) {
		this.initNum = initNum;
	}

}