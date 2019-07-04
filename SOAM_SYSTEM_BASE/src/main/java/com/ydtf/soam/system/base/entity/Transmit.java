package com.ydtf.soam.system.base.entity;


/**
 * @author zhanglei
 * */
public class Transmit extends EntityBase {

	private static final long serialVersionUID = 1L;

	/**
	 * 主键ID
	 * */
	private Long id;
	/**
	 * 流程ID
	 * */
	private String flowId;
	/**
	 * 实例ID
	 * */
	private String instanceId;
	/**
	 * 环节ID 
	 * */
	private String linkId;

	/**
	 * 当前系统
	 * */
	private String beforeSystem;
	/**
	 * 当前机构
	 * */
	private String beforeOrg;
	/**
	 * 当前处理人
	 * */
	private String beforeHandler;
	/**
	 * 下环节系统
	 * */
	private String afterSystem;
	/**
	 * 下环节机构
	 * */
	private String afterOrg;
	/**
	 * 下环节处理人
	 * */
	private String afterHandler;
	/**
	 * 流转时间
	 * */
	private Long timeMillis;

	public Long getId() {
		return id;
	}

	public void setId( Long id ) {
		this.id = id;
	}

	public String getFlowId() {
		return flowId;
	}

	public void setFlowId( String flowId ) {
		this.flowId = flowId;
	}

	public String getInstanceId() {
		return instanceId;
	}

	public void setInstanceId( String instanceId ) {
		this.instanceId = instanceId;
	}

	public String getLinkId() {
		return linkId;
	}

	public void setLinkId( String linkId ) {
		this.linkId = linkId;
	}

	public String getBeforeSystem() {
		return beforeSystem;
	}

	public void setBeforeSystem( String beforeSystem ) {
		this.beforeSystem = beforeSystem;
	}

	public String getBeforeOrg() {
		return beforeOrg;
	}

	public void setBeforeOrg( String beforeOrg ) {
		this.beforeOrg = beforeOrg;
	}

	public String getBeforeHandler() {
		return beforeHandler;
	}

	public void setBeforeHandler( String beforeHandler ) {
		this.beforeHandler = beforeHandler;
	}

	public String getAfterSystem() {
		return afterSystem;
	}

	public void setAfterSystem( String afterSystem ) {
		this.afterSystem = afterSystem;
	}

	public String getAfterOrg() {
		return afterOrg;
	}

	public void setAfterOrg( String afterOrg ) {
		this.afterOrg = afterOrg;
	}

	public String getAfterHandler() {
		return afterHandler;
	}

	public void setAfterHandler( String afterHandler ) {
		this.afterHandler = afterHandler;
	}

	public Long getTimeMillis() {
		return timeMillis;
	}

	public void setTimeMillis( Long timeMillis ) {
		this.timeMillis = timeMillis;
	}

}
