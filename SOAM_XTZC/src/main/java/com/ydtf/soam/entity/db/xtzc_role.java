package com.ydtf.soam.entity.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class xtzc_role extends EntityBase {

	private static final long serialVersionUID = 911439407368229200L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "roleid", unique = true, nullable = false, length = 20)
	private Long roleid;

	@Column(name = "jsmc", unique = false, nullable = false, length = 80)
	private String jsmc;

	@Column(name = "zt", unique = false, nullable = false, length = 2)
	private Integer zt;

	@Column(name = "bz", unique = false, nullable = true, length = 255)
	private String bz;

	public Long getRoleid() {
		return roleid;
	}

	public void setRoleid( Long roleid ) {
		this.roleid = roleid;
	}

	public String getJsmc() {
		return jsmc;
	}

	public void setJsmc( String jsmc ) {
		this.jsmc = jsmc;
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
}