package com.ydtf.soam.entity.db;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class xtzc_user extends EntityBase {
	private static final long serialVersionUID = -8887226842915071839L;

	@Id
	@GeneratedValue
	@Column(name = "userid", unique = true, nullable = false, length = 20)
	private Long userid;

	@Column(name = "orgid", unique = false, nullable = true, length = 20)
	private Long orgid;

	@Column(name = "rygh", unique = false, nullable = true, length = 32)
	private String rygh;

	@Column(name = "ryxm", unique = false, nullable = true, length = 80)
	private String ryxm;

	@Column(name = "xb", unique = false, nullable = true, length = 2)
	private Integer xb;

	@Column(name = "yhm", unique = true, nullable = false, length = 64)
	private String yhm;

	@Column(name = "yhmm", unique = false, nullable = false, length = 128)
	private String yhmm;

	@Column(name = "zt", unique = false, nullable = false, length = 2)
	private Integer zt;

	@Column(name = "sdsj", unique = false, nullable = true, length = 32)
	private Date sdsj;

	@Column(name = "bz", unique = false, nullable = true, length = 128)
	private String bz;

	public Long getUserid() {
		return userid;
	}

	public void setUserid( Long userid ) {
		this.userid = userid;
	}

	public Long getOrgid() {
		return orgid;
	}

	public void setOrgid( Long orgid ) {
		this.orgid = orgid;
	}

	public String getRygh() {
		return rygh;
	}

	public void setRygh( String rygh ) {
		this.rygh = rygh;
	}

	public String getRyxm() {
		return ryxm;
	}

	public void setRyxm( String ryxm ) {
		this.ryxm = ryxm;
	}

	public Integer getXb() {
		return xb;
	}

	public void setXb( Integer xb ) {
		this.xb = xb;
	}

	public String getYhm() {
		return yhm;
	}

	public void setYhm( String yhm ) {
		this.yhm = yhm;
	}

	public String getYhmm() {
		return yhmm;
	}

	public void setYhmm( String yhmm ) {
		this.yhmm = yhmm;
	}

	public Integer getZt() {
		return zt;
	}

	public void setZt( Integer zt ) {
		this.zt = zt;
	}

	public Date getSdsj() {
		return sdsj;
	}

	public void setSdsj( Date sdsj ) {
		this.sdsj = sdsj;
	}

	public String getBz() {
		return bz;
	}

	public void setBz( String bz ) {
		this.bz = bz;
	}

}
