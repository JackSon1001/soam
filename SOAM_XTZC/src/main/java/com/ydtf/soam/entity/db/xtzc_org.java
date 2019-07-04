package com.ydtf.soam.entity.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;


@Entity
public class xtzc_org extends EntityBase {

	private static final long serialVersionUID = -3322752070208314538L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "orgid", unique = true, nullable = false, length = 20)
	private Long orgid;

	@Column(name = "pid", unique = false, nullable = true, length = 20)
	private Long pid;

	@Column(name = "jgmc", unique = false, nullable = false, length = 128)
	private String jgmc;

	@Column(name = "jgjc", unique = false, nullable = false, length = 32)
	private String jgjc;

	@Column(name = "zt", unique = false, nullable = false, length = 2)
	private Integer zt;

	@Column(name = "bz", unique = false, nullable = true, length = 128)
	private String bz;

	public Long getOrgid() {
		return orgid;
	}

	public void setOrgid( Long orgid ) {
		this.orgid = orgid;
	}

	public Long getPid() {
		return pid;
	}

	public void setPid( Long pid ) {
		this.pid = pid;
	}

	public String getJgmc() {
		return jgmc;
	}

	public void setJgmc( String jgmc ) {
		this.jgmc = jgmc;
	}

	public String getJgjc() {
		return jgjc;
	}

	public void setJgjc( String jgjc ) {
		this.jgjc = jgjc;
	}

	public Integer getZt() {
		return zt;
	}

	public void setZt( Integer zt ) {
		this.zt = zt;
	}

	public String getBz() {
		return bz;
	}

	public void setBz( String bz ) {
		this.bz = bz;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}