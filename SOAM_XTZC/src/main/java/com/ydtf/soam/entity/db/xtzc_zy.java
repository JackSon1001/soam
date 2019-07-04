package com.ydtf.soam.entity.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

/**
 * <p>实体类</p>
 * <p>Table: xtzc_zy</p>
 * 
 * @since 2016-09-27
 *
 */

@Entity
public class xtzc_zy extends EntityBase {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "zyid", unique = true, nullable = false, length = 20)
	private Long zyid;

	@Column(name = "zymc", unique = false, nullable = true, length = 32)
	private String zymc;

	@Column(name = "zylb", unique = false, nullable = true, length = 3)
	private Integer zylb;

	@Column(name = "zt", unique = false, nullable = true, length = 3)
	private Integer zt;

	@Column(name = "wjbz", unique = false, nullable = true, length = 256)
	private String wjbz;

	@Column(name = "pid", unique = false, nullable = true, length = 32)
	private Long pid;

	public void setZyid( Long zyid ) {
		this.zyid = zyid;
	}

	public Long getZyid() {
		return zyid;
	}

	public void setZymc( String zymc ) {
		this.zymc = zymc;
	}

	public String getZymc() {
		return zymc;
	}

	public void setZylb( Integer zylb ) {
		this.zylb = zylb;
	}

	public Integer getZylb() {
		return zylb;
	}

	public void setZt( Integer zt ) {
		this.zt = zt;
	}

	public Integer getZt() {
		return zt;
	}

	public void setWjbz( String wjbz ) {
		this.wjbz = wjbz;
	}

	public String getWjbz() {
		return wjbz;
	}

	public void setPid( Long pid ) {
		this.pid = pid;
	}

	public Long getPid() {
		return pid;
	}

}