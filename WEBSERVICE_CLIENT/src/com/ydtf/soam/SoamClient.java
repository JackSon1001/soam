package com.ydtf.soam;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

import com.alibaba.fastjson.JSONObject;
import com.ydtf.soam.entity.MicroService;
import com.ydtf.soam.entity.TransmitData;

/**
 * @author sifulin
 * @date 2016-9-21
 * @see webservice客户端
 */
public class SoamClient {
	
	private static String soamIp;//soam Ip地址
	private static String soamPort;//soam port
	
	
	/**
	 * @author sifulin
	 * @see 初始化soam的 ip、port  
	 * @param String ip,port
	 */
	public static void init(String ip,String port){
		if(soamIp == null || soamPort == null){
			soamIp = ip;
			soamPort = port;
		}
	}
	/**
	 * 向SOAM发送服务监控信息 
	 * 
	 */
	public static void sendServiceInfo() throws Exception{
		send(MicroService.SERVICE,null);
	}
	
	/**
	 * @see 向SOAM发送流程监控信息 
	 * @author sifulin
	 * @param TransmitData 流程监控信息
	 * @return throw Exception
	 */
	public static void sendWorkflowInfo(TransmitData data) throws Exception{
		
		if(data == null)
			throw new Exception("输入参数不能为空");
//		String param = toJsonString( data.getClass(),data );
		String param = JSONObject.toJSONString( data );
		
		send(MicroService.WORK, param);
	}
	
	private static void send(MicroService ms, String param) throws Exception{
		
		SoamRequest.getInstance().sendPost( ms.getAddr(), param );
	}
	
	/**
	 * @see 将对象转换为json字符串
	 * 
	 */
	/*private static String toJsonString(Class<?> clazz,Object obj){
		StringBuffer json = new StringBuffer("{");
		try{
			Field[] field = clazz.getDeclaredFields();
			String fName;
			String fValue;
			Object object;
			Method method;
			for(Field f : field){
				fName = f.getName();
				method = clazz.getDeclaredMethod("get" + fName.substring( 0, 1 ).toUpperCase() + fName.substring(1), null);
				object = method.invoke(obj, null);
				if(object != null){
					fValue = object.toString();
					json.append("\"" + fName + "\" : \"" + fValue + "\",");
				}
			}
			if(json.length() > 1)
				json.deleteCharAt(json.length() -1);
			json.append( "}");
		}catch(Exception e){
			throw new RuntimeException(e.getMessage());
		}
		
		return json.toString();
	}*/

	public static String getSoamIp() {
		return soamIp;
	}

	public static String getSoamPort() {
		return soamPort;
	}
	
}
