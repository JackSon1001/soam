package com.ydtf.soam.entity;

public class TransmitData {

	
	private Long id;
	private String flowId;
	private String instanceId;
	private String linkId;

	private String beforeSystem;
	private String beforeOrg;
	private String beforeHandler;

	private String afterSystem;
	private String afterOrg;
	private String afterHandler;

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
