package com.ydtf.soam.system.base.entity;

import java.util.List;

import com.google.common.collect.Lists;

/**
 * @author zhanglei
 * @date 2016-09-29
 * */
public class TreeNote extends EntityBase {
	private static final long serialVersionUID = -4955494926945457224L;

	public TreeNote() {}

	public TreeNote( String label, String name ) {
		this.label = label;
		this.name = name;
	}

	private String label;
	private String name;
	private Object info;
	private List<TreeNote> children = Lists.newArrayList();

	public String getLabel() {
		return label;
	}

	public void setLabel( String label ) {
		this.label = label;
	}

	public String getName() {
		return name;
	}

	public void setName( String name ) {
		this.name = name;
	}

	public List<TreeNote> getChildren() {
		return children;
	}

	public Object getInfo() {
		return info;
	}

	public void setInfo( Object info ) {
		this.info = info;
	}
}
