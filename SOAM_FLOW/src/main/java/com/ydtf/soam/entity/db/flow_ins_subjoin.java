package com.ydtf.soam.entity.db;

import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import com.ydtf.soam.system.base.entity.EntityBase;

@Document
public class flow_ins_subjoin extends EntityBase {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private String id;

	@Column(name = "pid", unique = true, nullable = true)
	private Long pid;

	@Column(name = "data", unique = false, nullable = true)
	private List<Map<String, Object>> data;

	public String getId() {
		return id;
	}

	public void setId( String id ) {
		this.id = id;
	}

	public Long getPid() {
		return pid;
	}

	public void setPid( Long pid ) {
		this.pid = pid;
	}

	public List<Map<String, Object>> getData() {
		return data;
	}

	public void setData( List<Map<String, Object>> data ) {
		this.data = data;
	}

}