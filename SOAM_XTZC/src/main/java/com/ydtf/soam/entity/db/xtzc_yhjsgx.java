package com.ydtf.soam.entity.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class xtzc_yhjsgx extends EntityBase {

	private static final long serialVersionUID = -3264998721275741567L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "gxid", unique = true, nullable = false, length = 20)
	private Long gxid;

	@Column(name = "userid", unique = false, nullable = false, length = 20)
	private Long userid;

	@Column(name = "roleid", unique = false, nullable = false, length = 20)
	private Long roleid;

	public Long getGxid() {
		return gxid;
	}

	public void setGxid( Long gxid ) {
		this.gxid = gxid;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid( Long userid ) {
		this.userid = userid;
	}

	public Long getRoleid() {
		return roleid;
	}

	public void setRoleid( Long roleid ) {
		this.roleid = roleid;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}