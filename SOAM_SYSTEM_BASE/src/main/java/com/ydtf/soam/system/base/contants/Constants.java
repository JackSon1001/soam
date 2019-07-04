package com.ydtf.soam.system.base.contants;

/**
 * 常量类
 * @author zhanglei
 * */
public final class Constants {

	/** 微服务 */
	public final class SERVICE {
		@Text("EUREKA")
		public static final String EUREKA = "SERVICE-EUREKA";
		@Text("SYSTEM")
		public static final String SYSTEM = "SERVICE-SYSTEM";
		@Text("CONFIG")
		public static final String CONFIG = "SERVICE-CONFIG";
		@Text("XTZC")
		public static final String XTZC = "SERVICE-XTZC";
		@Text("CHART")
		public static final String CHART = "SERVICE-CHART";
		@Text("LOGGER")
		public static final String LOGGER = "SERVICE-LOGGER";
		@Text("FLOW")
		public static final String FLOW = "SERVICE-FLOW";
		@Text("WS")
		public static final String WS = "SERVICE-WS";
		@Text("GATEWAY")
		public static final String GATEWAY = "SERVICE-GATEWAY";
		@Text("RESOURCE")
		public static final String RESOURCE = "SERVICE-RESOURCE";
		@Text("TESTER")
		public static final String TESTER = "SERVICE-TESTER";
	}

	public final class CSG_SYSTEM {
		@Text("营销管理系统")
		public static final int PMS = 1;
		@Text("财务管理系统")
		public static final int CWGL = 2;
		@Text("资产管理系统")
		public static final int ZCGL = 3;
		@Text("人力资源管理系统")
		public static final int RLZYGL = 4;
		@Text("地理信息系统")
		public static final int GIS = 5;
		@Text("数据资源平台")
		public static final int SJZYPT = 6;
	}

	/** RabbitMQ */
	public final class RABBITMQ {
		public final class QUEUE {
			public static final String LOG_REQUEST = "SOAM_LOG_REQUEST";
			public static final String LOG = "SOAM_LOG";
			public static final String FLOW_TRANSMIT = "SOAM_FLOW_TRANSMIT";
		}
	}

	/** 状态 */
	public final class ZT {
		@Text("有效")
		public static final int YX = 1;
		@Text("无效")
		public static final int WX = 2;
	}

	/** 是否标志 */
	public final class SF {
		@Text("是")
		public static final int YES = 1;
		@Text("否")
		public static final int NO = 2;
	}

	/** 性别 */
	public final class SEX {
		@Text("男")
		public static final int MAN = 1;
		@Text("女 ")
		public static final int WOMAN = 2;
	}

	/** 资源类别 */
	public final class ZYLB {
		@Text("功能ID ")
		public static final int FID = 1;
		@Text("功能URL ")
		public static final int URL = 2;
	}

	/** 用户 */
	public final class USER {
		/** 用户状态 */
		public final class ZT {
			@Text("有效")
			public static final int YX = 1;
			@Text("无效")
			public static final int WX = 2;
			@Text("锁定")
			public static final int SD = 3;
			@Text("注销")
			public static final int ZX = 4;
		}
	}

	/** 流程 */
	public final class FLOW {

		public final class INSTANCE_STATUS {
			@Text("正常")
			public static final String ZC = "1";
			@Text("异常")
			public static final String YC = "2";
			@Text("挂起")
			public static final String GQ = "3";
		}
		
		public final class NODE_STATUS {
			@Text("正常")
			public static final String END = "END";
			@Text("异常")
			public static final String YC = "2";
			@Text("挂起")
			public static final String GQ = "3";
		}

		/** 区域颜色 */
		public final class AREA_COLOR {
			@Text("红色")
			public static final String RED = "red";
			@Text("黄色")
			public static final String YELLOW = "yellow";
			@Text("蓝色")
			public static final String BLUE = "blue";
			@Text("绿色")
			public static final String GREEN = "green";
		}

		/** 流程节点类型 */
		public final class NODE_TYPE {
			public static final String START_ROUND = "start round";
			public static final String CHAT = "chat";
			public static final String FORK = "fork";
			public static final String JOIN = "join";
			public static final String NODE = "node";
			public static final String COMPLEX_MIX = "complex mix";
			public static final String STATE = "state";
			public static final String TASK = "task";
			public static final String PLUG = "plug";
			public static final String END_ROUND = "end round";
			public static final String MUTISELECT = "mutiselect";
			public static final String TASK_ROUND = "task round";
		}

		/** 连接线类型 */
		public final class LINE_TYPE {
			public static final String LR = "lr";
			public static final String TB = "tb";
			public static final String SL = "sl";
		}
	}
}
