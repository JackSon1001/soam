package com.ydtf.soam.entity.db;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class flow_ins_info extends EntityBase {

	private static final long serialVersionUID = -3638407537931672721L;

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

	@Column(name = "gdh", unique = false, nullable = true, length = 64)
	private String gdh;

	@Column(name = "ssdw", unique = false, nullable = true, length = 64)
	private String ssdw;

	@Column(name = "dqhj", unique = false, nullable = true, length = 128)
	private String dqhj;

	@Column(name = "dqxt", unique = false, nullable = true, length = 64)
	private String dqxt;

	@Column(name = "dqzt", unique = false, nullable = true, length = 2)
	private Long dqzt;

	@Column(name = "description", unique = false, nullable = true, length = 256)
	private String description;

	@Column(name = "area", unique = false, nullable = true, length = 64)
	private String area;

	@Column(name = "cjr", unique = false, nullable = true)
	private Long cjr;

	@Column(name = "cjsj", unique = false, nullable = true)
	private Date cjsj;

	@Column(name = "xgsj", unique = false, nullable = true)
	private Date xgsj;

	@Column(name = "status", unique = false, nullable = true, length = 32)
	private String status;

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

	public Integer getInitNum() {
		return initNum;
	}

	public void setInitNum( Integer initNum ) {
		this.initNum = initNum;
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

	public String getArea() {
		return area;
	}

	public void setArea( String area ) {
		this.area = area;
	}

	public String getGdh() {
		return gdh;
	}

	public void setGdh( String gdh ) {
		this.gdh = gdh;
	}

	public String getSsdw() {
		return ssdw;
	}

	public void setSsdw( String ssdw ) {
		this.ssdw = ssdw;
	}

	public String getDqhj() {
		return dqhj;
	}

	public void setDqhj( String dqhj ) {
		this.dqhj = dqhj;
	}

	public String getDqxt() {
		return dqxt;
	}

	public void setDqxt( String dqxt ) {
		this.dqxt = dqxt;
	}

	public Long getDqzt() {
		return dqzt;
	}

	public void setDqzt( Long dqzt ) {
		this.dqzt = dqzt;
	}

	public void setStatus( String status ) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}
}