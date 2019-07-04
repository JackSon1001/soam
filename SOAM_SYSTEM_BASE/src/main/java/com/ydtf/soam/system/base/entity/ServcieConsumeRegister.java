package com.ydtf.soam.system.base.entity;

import java.io.Serializable;
import java.util.List;

public class ServcieConsumeRegister implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String clientName;
	
	private List<ServcieConsume> consumeList;

	public String getClientName() {
		return clientName;
	}

	public void setClientName( String clientName ) {
		this.clientName = clientName;
	}

	public List<ServcieConsume> getConsumeList() {
		return consumeList;
	}

	public void setConsumeList( List<ServcieConsume> consumeList ) {
		this.consumeList = consumeList;
	}


}
