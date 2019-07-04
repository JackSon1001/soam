package com.ydtf.soam.entity.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ydtf.soam.system.base.entity.EntityBase;

@Entity
public class flow_tmp_area extends EntityBase {

	private static final long serialVersionUID = -9059997584043683429L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@Column(name = "tid", unique = false, nullable = false)
	private Long tid;

	@Column(name = "key1", unique = false, nullable = false, length = 128)
	private String key;

	@Column(name = "name", unique = false, nullable = false, length = 256)
	private String name;

	@Column(name = "left1", unique = false, nullable = false)
	private Integer left;

	@Column(name = "top", unique = false, nullable = false)
	private Integer top;

	@Column(name = "width", unique = false, nullable = false)
	private Integer width;

	@Column(name = "height", unique = false, nullable = false)
	private Integer height;

	@Column(name = "color", unique = false, nullable = true)
	private String color;

	@Column(name = "alt", unique = false, nullable = true)
	private Boolean alt;

	public void setId( Long id ) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	/**
	 * @return 模板ID
	 */
	public Long getTid() {
		return tid;
	}

	/**
	 * @param 模板ID
	 */
	public void setTid( Long tid ) {
		this.tid = tid;
	}

	public void setKey( String key ) {
		this.key = key;
	}

	public String getKey() {
		return key;
	}

	public void setName( String name ) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setLeft( Integer left ) {
		this.left = left;
	}

	public Integer getLeft() {
		return left;
	}

	public void setTop( Integer top ) {
		this.top = top;
	}

	public Integer getTop() {
		return top;
	}

	public void setWidth( Integer width ) {
		this.width = width;
	}

	public Integer getWidth() {
		return width;
	}

	public void setHeight( Integer height ) {
		this.height = height;
	}

	public Integer getHeight() {
		return height;
	}

	public void setColor( String color ) {
		this.color = color;
	}

	public String getColor() {
		return color;
	}

	public void setAlt( Boolean alt ) {
		this.alt = alt;
	}

	public Boolean getAlt() {
		return alt;
	}

}