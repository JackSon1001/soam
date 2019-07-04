package com.ydtf.soam.system.base.entity;

import java.io.Serializable;

public class ServcieConsume implements Serializable {

	private static final long serialVersionUID = 1L;

	private String serviceName;

	private String clientName;

	private String url;

	private String clientClassName;

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName( String serviceName ) {
		this.serviceName = serviceName;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName( String clientName ) {
		this.clientName = clientName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl( String url ) {
		this.url = url;
	}

	public String getClientClassName() {
		return clientClassName;
	}

	public void setClientClassName( String clientClassName ) {
		this.clientClassName = clientClassName;
	}

}
