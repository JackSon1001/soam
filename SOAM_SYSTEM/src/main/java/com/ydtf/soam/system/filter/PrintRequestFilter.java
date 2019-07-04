package com.ydtf.soam.system.filter;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ReadListener;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.ydtf.soam.system.base.config.SystemConfig;

/**
 * 使用注解标注过滤器
 * @WebFilter将一个实现了javax.servlet.Filter接口的类定义为过滤器
 * 属性filterName声明过滤器的名称,可选
 * 属性urlPatterns指定要过滤 的URL模式,也可使用属性value来声明.(指定要过滤的URL模式是必选属性)
 * 
 * @author 张磊
 * @date 2016-10-14
 */
@Configuration
@WebFilter(urlPatterns = "/*")
public class PrintRequestFilter implements Filter {

	@Autowired
	SystemConfig config;

	@Override
	public void init( FilterConfig filterConfig ) throws ServletException {
		//过滤器初始化
	}

	//执行过滤操作
	@Override
	public void doFilter( ServletRequest request, ServletResponse response, FilterChain chain ) throws IOException, ServletException {

		if( !config.isRecordRequestEnabled() ) return;

		ServletRequest requestWrapper = null;
		if( request instanceof HttpServletRequest ) {
			try {
				requestWrapper = new MAPIHttpServletRequestWrapper( (HttpServletRequest) request );
			}
			catch( Exception e ) {
				e.printStackTrace();
			}
		}
		if( requestWrapper != null ) chain.doFilter( requestWrapper, response );
	}

	@Override
	public void destroy() {
		//过滤器销毁
	}

}

class MAPIHttpServletRequestWrapper extends HttpServletRequestWrapper {

	private final byte[] body;

	public MAPIHttpServletRequestWrapper( HttpServletRequest request ) throws Exception {
		super( request );
		body = InputStreamToByte( request.getInputStream() );
	}

	@Override
	public BufferedReader getReader() throws IOException {
		return new BufferedReader( new InputStreamReader( getInputStream() ) );
	}

	@Override
	public ServletInputStream getInputStream() throws IOException {
		final ByteArrayInputStream bais = new ByteArrayInputStream( body );
		return new ServletInputStream() {

			@Override
			public int read() throws IOException {
				return bais.read();
			}

			@Override
			public boolean isFinished() {
				// TODO Auto-generated method stub
				return true;
			}

			@Override
			public boolean isReady() {
				// TODO Auto-generated method stub
				return true;
			}

			@Override
			public void setReadListener( ReadListener listener ) {
				// TODO Auto-generated method stub
			}
		};
	}

	/**
	 * 将InputStream转换成byte数组
	 * @param in InputStream
	 * @return byte[]
	 * @throws IOException
	 */
	public static byte[] InputStreamToByte( InputStream in ) throws IOException {
		final int BUFFER_SIZE = 4096;

		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] data = new byte[BUFFER_SIZE];
		int count = -1;
		while ((count = in.read( data, 0, BUFFER_SIZE )) != -1)
			outStream.write( data, 0, count );

		data = null;
		return outStream.toByteArray();
	}

}
