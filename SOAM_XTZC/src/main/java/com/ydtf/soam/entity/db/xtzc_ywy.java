package com.ydtf.soam.entity.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

/**
 * <p>实体类</p>
 * <p>Table: xtzc_ywy</p>
 * 
 * @since 2016-10-25
 *
 */

@Entity
public class xtzc_ywy extends EntityBase {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ywid", unique = true, nullable = false, length = 20)
	private Long ywid;

	@Column(name = "name", unique = false, nullable = true, length = 64)
	private String name;

	@Column(name = "zt", unique = false, nullable = true, length = 3)
	private Integer zt;

	@Column(name = "bz", unique = false, nullable = true, length = 256)
	private String bz;

	@Column(name = "pid", unique = false, nullable = true, length = 20)
	private Long pid;

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

	public void setZt( Integer zt ) {
		this.zt = zt;
	}

	public Integer getZt() {
		return zt;
	}

	public void setBz( String bz ) {
		this.bz = bz;
	}

	public String getBz() {
		return bz;
	}

	public void setPid( Long pid ) {
		this.pid = pid;
	}

	public Long getPid() {
		return pid;
	}

}