package com.ydtf.soam.system.logger;

import java.util.Date;
import java.util.Map;

public class LogRequest {
	private String service;
	private String instance;
	private String host;
	private String connection;
	private Long contentLength;
	private String accept;
	private String origin;
	private String userAgent;
	private String contentType;
	private String referer;
	private String acceptEncoding;
	private String acceptLanguage;
	private String method;
	private String url;
	private String uri;
	private String contextPath;
	private String servletPath;
	private int localPort;
	private String localAddr;
	private String localName;
	private String remoteAddr;
	private String remoteHost;
	private String scheme;
	private boolean secure;
	private String serverName;
	private int serverPort;
	private Map<?, ?> parameter;
	private Date date;

	public String getService() {
		return service;
	}

	public void setService( String service ) {
		this.service = service;
	}

	public String getInstance() {
		return instance;
	}

	public void setInstance( String instance ) {
		this.instance = instance;
	}

	public String getHost() {
		return host;
	}

	public void setHost( String host ) {
		this.host = host;
	}

	public String getConnection() {
		return connection;
	}

	public void setConnection( String connection ) {
		this.connection = connection;
	}

	public Long getContentLength() {
		return contentLength;
	}

	public void setContentLength( Long contentLength ) {
		this.contentLength = contentLength;
	}

	public String getAccept() {
		return accept;
	}

	public void setAccept( String accept ) {
		this.accept = accept;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin( String origin ) {
		this.origin = origin;
	}

	public String getUserAgent() {
		return userAgent;
	}

	public void setUserAgent( String userAgent ) {
		this.userAgent = userAgent;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType( String contentType ) {
		this.contentType = contentType;
	}

	public String getReferer() {
		return referer;
	}

	public void setReferer( String referer ) {
		this.referer = referer;
	}

	public String getAcceptEncoding() {
		return acceptEncoding;
	}

	public void setAcceptEncoding( String acceptEncoding ) {
		this.acceptEncoding = acceptEncoding;
	}

	public String getAcceptLanguage() {
		return acceptLanguage;
	}

	public void setAcceptLanguage( String acceptLanguage ) {
		this.acceptLanguage = acceptLanguage;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod( String method ) {
		this.method = method;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl( String url ) {
		this.url = url;
	}

	public String getUri() {
		return uri;
	}

	public void setUri( String uri ) {
		this.uri = uri;
	}

	public String getContextPath() {
		return contextPath;
	}

	public void setContextPath( String contextPath ) {
		this.contextPath = contextPath;
	}

	public int getLocalPort() {
		return localPort;
	}

	public void setLocalPort( int localPort ) {
		this.localPort = localPort;
	}

	public String getLocalAddr() {
		return localAddr;
	}

	public void setLocalAddr( String localAddr ) {
		this.localAddr = localAddr;
	}

	public String getLocalName() {
		return localName;
	}

	public void setLocalName( String localName ) {
		this.localName = localName;
	}

	public String getRemoteAddr() {
		return remoteAddr;
	}

	public void setRemoteAddr( String remoteAddr ) {
		this.remoteAddr = remoteAddr;
	}

	public String getRemoteHost() {
		return remoteHost;
	}

	public void setRemoteHost( String remoteHost ) {
		this.remoteHost = remoteHost;
	}

	public String getScheme() {
		return scheme;
	}

	public void setScheme( String scheme ) {
		this.scheme = scheme;
	}

	public boolean isSecure() {
		return secure;
	}

	public void setSecure( boolean secure ) {
		this.secure = secure;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName( String serverName ) {
		this.serverName = serverName;
	}

	public String getServletPath() {
		return servletPath;
	}

	public void setServletPath( String servletPath ) {
		this.servletPath = servletPath;
	}

	public int getServerPort() {
		return serverPort;
	}

	public void setServerPort( int serverPort ) {
		this.serverPort = serverPort;
	}

	public Date getDate() {
		return date;
	}

	public void setDate( Date date ) {
		this.date = date;
	}

	public Map<?, ?> getParameter() {
		return parameter;
	}

	public void setParameter( Map<?, ?> parameter ) {
		this.parameter = parameter;
	}

}
