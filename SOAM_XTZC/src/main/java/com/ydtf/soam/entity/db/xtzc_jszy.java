package com.ydtf.soam.entity.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

/**
 * <p>实体类</p>
 * <p>Table: xtzc_jszy</p>
 * 
 * @since 2016-09-26
 *
 */

@Entity
public class xtzc_jszy extends EntityBase {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "gxid", unique = true, nullable = false, length = 20)
	private Long gxid;

	@Column(name = "roleid", unique = false, nullable = true, length = 20)
	private Long roleid;

	@Column(name = "zyid", unique = false, nullable = true, length = 20)
	private Long zyid;

	public void setGxid( Long gxid ) {
		this.gxid = gxid;
	}

	public Long getGxid() {
		return gxid;
	}

	public void setRoleid( Long roleid ) {
		this.roleid = roleid;
	}

	public Long getRoleid() {
		return roleid;
	}

	public void setZyid( Long zyid ) {
		this.zyid = zyid;
	}

	public Long getZyid() {
		return zyid;
	}

}