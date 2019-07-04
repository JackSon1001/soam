package com.ydtf.soam.entity.struct;

import java.util.Map;

import com.ydtf.soam.entity.db.flow_ins_area;
import com.ydtf.soam.entity.db.flow_ins_line;
import com.ydtf.soam.entity.db.flow_ins_node;
import com.ydtf.soam.system.base.entity.EntityBase;

public class FlowInstanceChart extends EntityBase {

	private static final long serialVersionUID = -1062519416557347025L;

	private Long id;

	private Long ywid;

	private String title;

	private String area;

	private Map<String, flow_ins_node> nodes;

	private Map<String, flow_ins_line> lines;

	private Map<String, flow_ins_area> areas;

	private Integer initNum;

	/**
	 * @return 流程ID
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param 流程ID
	 */
	public void setId( Long id ) {
		this.id = id;
	}

	/**
	 * @return 业务ID
	 */
	public Long getYwid() {
		return ywid;
	}

	/**
	 * @param 业务ID
	 */
	public void setYwid( Long ywid ) {
		this.ywid = ywid;
	}

	/**
	 * @return 流程名称
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param 流程名称
	 */
	public void setTitle( String title ) {
		this.title = title;
	}

	public Map<String, flow_ins_node> getNodes() {
		return nodes;
	}

	public void setNodes( Map<String, flow_ins_node> nodes ) {
		this.nodes = nodes;
	}

	public Map<String, flow_ins_line> getLines() {
		return lines;
	}

	public void setLines( Map<String, flow_ins_line> lines ) {
		this.lines = lines;
	}

	public Map<String, flow_ins_area> getAreas() {
		return areas;
	}

	public void setAreas( Map<String, flow_ins_area> areas ) {
		this.areas = areas;
	}

	public Integer getInitNum() {
		return initNum;
	}

	public void setInitNum( Integer initNum ) {
		this.initNum = initNum;
	}

	public String getArea() {
		return area;
	}

	public void setArea( String area ) {
		this.area = area;
	}

}
