package com.ydtf.soam.entity;

import java.util.Date;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import com.ydtf.soam.system.base.entity.EntityBase;
import com.ydtf.soam.system.logger.LogRequest;

@Document
public class log_request extends EntityBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public log_request() {}

	public log_request( LogRequest request ) {
		this.service = request.getService();
		this.instance = request.getInstance();
		this.host = request.getHost();
		this.connection = request.getConnection();
		this.contentLength = request.getContentLength();
		this.accept = request.getAccept();
		this.origin = request.getOrigin();
		this.userAgent = request.getUserAgent();
		this.contentType = request.getContentType();
		this.referer = request.getReferer();
		this.acceptEncoding = request.getAcceptEncoding();
		this.acceptLanguage = request.getAcceptLanguage();
		this.method = request.getMethod();
		this.url = request.getUrl();
		this.uri = request.getUrl();
		this.contextPath = request.getContextPath();
		this.servletPath = request.getServletPath();
		this.localPort = request.getLocalPort();
		this.localAddr = request.getLocalAddr();
		this.localName = request.getLocalName();
		this.remoteAddr = request.getRemoteAddr();
		this.remoteHost = request.getRemoteHost();
		this.scheme = request.getScheme();
		this.secure = request.isSecure();
		this.serverName = request.getServerName();
		this.serverPort = request.getServerPort();
		this.parameter = request.getParameter();
		this.date = request.getDate();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column
	private String id;
	@Column
	private String service;
	@Column
	private String instance;
	@Column
	private String host;
	@Column
	private String connection;
	@Column
	private Long contentLength;
	@Column
	private String accept;
	@Column
	private String origin;
	@Column
	private String userAgent;
	@Column
	private String contentType;
	@Column
	private String referer;
	@Column
	private String acceptEncoding;
	@Column
	private String acceptLanguage;
	@Column
	private String method;
	@Column
	private String url;
	@Column
	private String uri;
	@Column
	private String contextPath;
	@Column
	private String servletPath;
	@Column
	private Integer localPort;
	@Column
	private String localAddr;
	@Column
	private String localName;
	@Column
	private String remoteAddr;
	@Column
	private String remoteHost;
	@Column
	private String scheme;
	@Column
	private boolean secure;
	@Column
	private String serverName;
	@Column
	private Integer serverPort;
	@Column
	private Map<?, ?> parameter;
	@Column
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

	public Integer getLocalPort() {
		return localPort;
	}

	public void setLocalPort( Integer localPort ) {
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

	public Integer getServerPort() {
		return serverPort;
	}

	public void setServerPort( Integer serverPort ) {
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
