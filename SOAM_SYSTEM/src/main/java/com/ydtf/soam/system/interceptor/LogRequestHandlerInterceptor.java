package com.ydtf.soam.system.interceptor;

import java.io.BufferedReader;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Maps;
import com.ydtf.soam.system.logger.LogConfig;
import com.ydtf.soam.system.logger.LogRequest;
import com.ydtf.soam.system.logger.LogRequestQueue;

/**
 * ServletRequest拦截器
 * 控制台打印Request请求信息
 * 
 * @author 张磊
 * @date 2016-10-14
 */
public class LogRequestHandlerInterceptor implements HandlerInterceptor {

	SimpleDateFormat dateFormat = new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss.SSS" );

	//在请求处理之前进行调用（Controller方法调用之前）
	@Override
	public boolean preHandle( HttpServletRequest request, HttpServletResponse response, Object handler ) throws Exception {

		try {
			/*String contentType = request.getHeader( "Content-Type" );
			if( contentType == null ) contentType = "";*/

			/*Enumeration<String> e = request.getHeaders( "Accept-Encoding" );
			while (e.hasMoreElements()) {
				String value = (String) e.nextElement();
				System.out.println( value );
			}*/

			/*Enumeration<String> e = request.getHeaderNames();
			while (e.hasMoreElements()) {
				String name = (String) e.nextElement();
				String value = request.getHeader( name );
				System.out.println( name + " : " + value );
			}*/

			Enumeration<String> en = request.getParameterNames();
			Map<Object, Object> paramMap = Maps.newHashMap();
			while (en.hasMoreElements()) {
				String name = (String) en.nextElement();
				String value = request.getParameter( name );
				paramMap.put( name, value );
			}

			StringBuffer buffer = new StringBuffer();
			String line = null;
			try {
				BufferedReader reader = request.getReader();
				while ((line = reader.readLine()) != null)
					buffer.append( line );
			}
			catch( Exception ex ) {
				ex.printStackTrace();
			}

			System.out.println( "=============================" );
			System.out.println( "请求时间 : " + dateFormat.format( new Date() ) );
			System.out.println( "请求URL : " + request.getRequestURI().toString() );
			if( request.getHeader( "Content-Type" ) != null ) {
				System.out.println( "数据类型 : " + request.getHeader( "Content-Type" ) );
			}
			System.out.println( "请求类型 : " + request.getMethod() );
			if( paramMap.size() > 0 ) {
				System.out.println( "请求参数 : " + JSON.toJSONString( paramMap ) );
			}
			if( buffer.length() > 0 ) {
				System.out.println( "请求JSON : " + buffer );
				String jsonString = buffer.toString();
				
				if( jsonString.startsWith( "{" ) ) {
					JSONObject jsonObject = JSON.parseObject( jsonString );
					for( Entry<?, ?> entry : jsonObject.entrySet() ) {
						paramMap.put( entry.getKey().toString(), entry.getValue() );
					}
				}
				else if( jsonString.startsWith( "[" ) ) {
					JSONArray jsonArray = JSON.parseArray( jsonString );
				}
				

			}
			System.out.println( "=============================" );

			////////////////////////////////////////
			////////////////////////////////////////

			LogRequest logRequest = new LogRequest();
			logRequest.setService( LogConfig.getServiceName() );
			logRequest.setInstance( LogConfig.getInstanceId() );
			logRequest.setHost( request.getHeader( "host" ) );
			logRequest.setConnection( request.getHeader( "connection" ) );
			logRequest.setContentLength( request.getHeader( "content-length" ) != null ? Long.valueOf( request.getHeader( "content-length" ) ) : null );
			logRequest.setAccept( request.getHeader( "accept" ) );
			logRequest.setOrigin( request.getHeader( "origin" ) );
			logRequest.setUserAgent( request.getHeader( "user-agent" ) );
			logRequest.setContentType( request.getHeader( "content-type" ) );
			logRequest.setReferer( request.getHeader( "referer" ) );
			logRequest.setAcceptEncoding( request.getHeader( "accept-encoding" ) );
			logRequest.setAcceptLanguage( request.getHeader( "accept-language" ) );
			logRequest.setMethod( request.getMethod() );
			logRequest.setUrl( request.getRequestURL().toString() );
			logRequest.setUri( request.getRequestURI() );
			logRequest.setServletPath( request.getServletPath() );
			logRequest.setContextPath( request.getContextPath() );
			logRequest.setLocalPort( request.getLocalPort() );
			logRequest.setLocalAddr( request.getLocalAddr() );
			logRequest.setLocalName( request.getLocalName() );
			logRequest.setRemoteAddr( request.getRemoteAddr() );
			logRequest.setRemoteHost( request.getRemoteHost() );
			logRequest.setScheme( request.getScheme() );
			logRequest.setSecure( request.isSecure() );
			logRequest.setServerName( request.getServerName() );
			logRequest.setServerPort( request.getServerPort() );
			logRequest.setParameter( paramMap );
			logRequest.setDate( new Date() );
			LogRequestQueue.getInstance().put( logRequest );
		}
		catch( Exception e ) {
			e.printStackTrace();
		}

		return true;
	}

	//请求处理之后进行调用，但是在视图被渲染之前（Controller方法调用之后）
	@Override
	public void postHandle( HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView ) throws Exception {
		// TODO Auto-generated method stub
	}

	//在整个请求结束之后被调用，也就是在DispatcherServlet 渲染了对应的视图之后执行（主要是用于进行资源清理工作）
	@Override
	public void afterCompletion( HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex ) throws Exception {
		// TODO Auto-generated method stub
	}

}
