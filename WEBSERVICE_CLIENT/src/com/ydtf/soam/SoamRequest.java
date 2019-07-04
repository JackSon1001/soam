package com.ydtf.soam;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

import com.alibaba.fastjson.JSONObject;
import com.ydtf.soam.entity.Status;

/**
 * @see 发送http post请求调用SOAM微服务 
 * @author sifulin
 * @date 2016-9-21
 */
class SoamRequest {

	private static SoamRequest request;
	private static String ip;
	private static String port;
	private static final int readTimeout = 5000;
	private static final int conTimeout = 5000;
	
	private SoamRequest(){
		
	}
	
	/**
	 *
	 * 获取实例 
	 */
	public static SoamRequest getInstance(){
		if(request == null){
			synchronized (SoamRequest.class) {
				if( request == null ) {
					request = new SoamRequest();
					if(SoamClient.getSoamIp() == null || SoamClient.getSoamPort() == null)
						getHost();
				}
			}
		}
		return request;
	}
	
	/**
	 * 读取soam_config.properties配置参数获取IP,PORT 
	 * 
	 */
	private static void getHost(){
		InputStream input = SoamRequest.class.getResourceAsStream("/soam_config.properties");
		Properties prop = new Properties();   
		try {
			prop.load(input);
			ip = prop.getProperty("SOAM_IP");
			port = prop.getProperty("SOAM_PORT");
		}
		catch( IOException e ) {
			throw new RuntimeException(e);
		}  

	}
	
	/**
     * 向指定 URL 发送POST方法的请求
     * 
     * @param url
     *            发送请求的 URL(微服务URL)
     * @param param
     *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
     * @return throw RuntimeException
     */
    public void sendPost(String url, String param) {
    	
    	url = "http://" + ip + ":" + port + url;
        PrintWriter out = null;
        BufferedReader in = null;
       
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            HttpURLConnection conn = (HttpURLConnection)realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("Content-Type",  "application/json;charset=utf-8");  
            conn.setRequestProperty("user-agent","Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)");
            conn.setRequestMethod("POST");
            conn.setConnectTimeout( conTimeout );
            conn.setReadTimeout(readTimeout);
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
           
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            out.print(param);
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            String result = "";
            while ((line = in.readLine()) != null) {
            	result += line;
            }
            JSONObject jsonRes = JSONObject.parseObject(result );
            if(jsonRes.getInteger("code") == Status.ERROR.getCode())
            	throw new RuntimeException(jsonRes.getString( "message" ));
            
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                throw new RuntimeException(ex);
            }
        }
    }    
}
