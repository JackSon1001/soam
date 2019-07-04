package com.ydtf.soam.system.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ErrorAttributes;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSON;
import com.ydtf.soam.system.base.entity.Result;

import springfox.documentation.annotations.ApiIgnore;

/**
 * @author zhanglei
 * @date 2016-09-04
 * @info 错误拦截，所有错误信息都将通过Result返回
 * */

@Controller
public class AppErrorController implements ErrorController {

	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	private static final String ERROR = "/error";

	private final ErrorAttributes errorAttributes;

	@Autowired
	public AppErrorController( ErrorAttributes errorAttributes ) {
		Assert.notNull( errorAttributes, "ErrorAttributes must not be null" );
		this.errorAttributes = errorAttributes;
	}

	@Override
	public String getErrorPath() {
		return ERROR;
	}

	@ApiIgnore
	@RequestMapping(value = ERROR)
	@ResponseBody
	public Result<Map<String, Object>> error( HttpServletRequest request ) {
		Map<String, Object> body = getErrorAttributes( request, getTraceParameter( request ) );

		Result<Map<String, Object>> result = new Result<Map<String, Object>>();
		result.setCode( (Integer) body.get( "status" ) );
		result.setBody( body );

		if( result.getCode() == HttpStatus.INTERNAL_SERVER_ERROR.value() ) {
			result.setMessage( body.get( "exception" ) + " : " + body.get( "message" ) );
		}
		else {
			result.setMessage( body.get( "error" ).toString() );
		}

		logger.error( "HttpServlet请求错误 : " + JSON.toJSONString( body.get( "path" ) ) );

		return result;
	}

	private boolean getTraceParameter( HttpServletRequest request ) {
		String parameter = request.getParameter( "trace" );
		if( parameter == null ) {
			return false;
		}
		return !"false".equals( parameter.toLowerCase() );
	}

	private Map<String, Object> getErrorAttributes( HttpServletRequest aRequest, boolean includeStackTrace ) {

		RequestAttributes requestAttributes = new ServletRequestAttributes( aRequest );
		Map<String, Object> errMap = errorAttributes.getErrorAttributes( requestAttributes, includeStackTrace );

		String trace = getStackTrace( errorAttributes.getError( requestAttributes ) );
		if( !StringUtils.isEmpty( trace ) ) {
			String[] lines = trace.split( "\r\n\t" );
			errMap.put( "trace", lines );
		}

		return errMap;
	}

	private String getStackTrace( Throwable t ) {
		if( t == null ) return null;

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		String str = "";
		try {
			t.printStackTrace( new PrintStream( baos, true, "UTF-8" ) );
			str = baos.toString( "UTF-8" );
		}
		catch( IOException e ) {
			e.printStackTrace();
			return null;
		}
		finally {
			try {
				if( baos != null ) {
					baos.close();
					baos = null;
				}
			}
			catch( IOException e ) {
				e.printStackTrace();
			}
		}
		return str;
	}
}
