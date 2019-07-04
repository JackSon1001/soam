package com.ydtf.soam.system.logger;

public class LogConfig {
	private static String ServiceName;

	private static String instanceId;

	private static Boolean logEnabled = true;

	public static String getServiceName() {
		return ServiceName;
	}

	protected static void setServiceName( String ServiceName ) {
		LogConfig.ServiceName = ServiceName;
	}

	public static String getInstanceId() {
		return instanceId;
	}

	protected static void setInstanceId( String instanceId ) {
		LogConfig.instanceId = instanceId;
	}

	public static Boolean getLogEnabled() {
		return logEnabled;
	}

	protected static void setLogEnabled( Boolean logEnabled ) {
		LogConfig.logEnabled = logEnabled;
	}

}
