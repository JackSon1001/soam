//原始数据
//jsondata={"title":"10086网状流程","nodes":{"demo_node_9":{"name":"桂中区","left":10,"top":10,"type":"start round","width":24,"height":24,"alt":true},"demo_node_10":{"name":"桂北区","left":10,"top":81,"type":"start round","width":24,"height":24,"alt":true},"demo_node_11":{"name":"桂西区","left":9,"top":143,"type":"start round","width":24,"height":24,"alt":true},"demo_node_12":{"name":"桂北区","left":11,"top":290,"type":"start round","width":24,"height":24,"alt":true},"demo_node_14":{"name":"桂东区","left":7,"top":339,"type":"start round","width":24,"height":24,"alt":true},"demo_node_2":{"name":"问候语2","left":232,"top":104,"type":"chat","width":86,"height":24,"alt":true},"demo_node_3":{"name":"问候语3","left":220,"top":260,"type":"chat","width":86,"height":24,"alt":true},"demo_node_4":{"name":"问候语4","left":222,"top":327,"type":"chat","width":86,"height":24,"alt":true},"demo_node_5":{"name":"停机判断","left":107,"top":47,"type":"fork","width":86,"height":24,"alt":true},"demo_node_13":{"name":"停机判断2","left":103,"top":289,"type":"fork","width":86,"height":24,"alt":true},"demo_node_20":{"name":"停机菜单","left":355,"top":12,"type":"join","width":86,"height":24,"alt":true},"demo_node_21":{"name":"正常菜单","left":368,"top":362,"type":"join","width":86,"height":24,"alt":true},"demo_node_27":{"name":"延时停机","left":492,"top":13,"type":"node","width":86,"height":24,"alt":true},"demo_node_28":{"name":"开机","left":491,"top":62,"type":"node","width":86,"height":24,"alt":true},"demo_node_29":{"name":"缴费","left":466,"top":162,"type":"node","width":86,"height":24,"alt":true},"demo_node_30":{"name":"历史话费查询","left":591,"top":116,"type":"node","width":111,"height":24,"alt":true},"demo_node_1":{"name":"问候语1","left":228,"top":42,"type":"chat","width":86,"height":24,"alt":true},"demo_node_38":{"name":"积分查询","left":506,"top":261,"type":"complex mix","width":86,"height":24,"alt":true},"demo_node_39":{"name":"剩余资源查询","left":499,"top":312,"type":"complex mix","width":107,"height":24,"alt":true},"demo_node_40":{"name":"常用业务办理","left":491,"top":356,"type":"complex mix","width":110,"height":24,"alt":true},"demo_node_42":{"name":"网络服务","left":492,"top":397,"type":"complex mix","width":86,"height":24,"alt":true},"demo_node_43":{"name":"转人工服务","left":479,"top":457,"type":"state","width":91,"height":24,"alt":true},"demo_node_44":{"name":"话费查询","left":477,"top":213,"type":"state","width":86,"height":24,"alt":true},"demo_node_52":{"name":"实时话费查询","left":609,"top":212,"type":"node","width":107,"height":24,"alt":true},"demo_node_54":{"name":"网络专区投诉","left":639,"top":399,"type":"task","width":106,"height":24,"alt":true},"demo_node_55":{"name":"普通转人工","left":641,"top":456,"type":"task","width":109,"height":24,"alt":true},"demo_node_59":{"name":"10088","left":500,"top":514,"type":"task","width":86,"height":24,"alt":true}},"lines":{"demo_line_6":{"type":"lr","m":81.5,"from":"demo_node_9","to":"demo_node_5","name":""},"demo_line_7":{"type":"lr","m":81.5,"from":"demo_node_10","to":"demo_node_5","name":""},"demo_line_9":{"type":"lr","m":81.5,"from":"demo_node_11","to":"demo_node_5","name":""},"demo_line_14":{"type":"sl","from":"demo_node_12","to":"demo_node_13","name":""},"demo_line_15":{"type":"lr","m":78.5,"from":"demo_node_14","to":"demo_node_13","name":""},"demo_line_17":{"type":"tb","m":152,"from":"demo_node_5","to":"demo_node_2","name":"F"},"demo_line_18":{"type":"tb","m":239,"from":"demo_node_13","to":"demo_node_3","name":"T"},"demo_line_19":{"type":"tb","m":383.5,"from":"demo_node_13","to":"demo_node_4","name":"F"},"demo_line_22":{"type":"lr","m":339,"from":"demo_node_4","to":"demo_node_21","name":""},"demo_line_23":{"type":"lr","m":337.5,"from":"demo_node_2","to":"demo_node_21","name":""},"demo_line_26":{"type":"lr","m":366.5,"from":"demo_node_3","to":"demo_node_20","name":""},"demo_line_31":{"type":"tb","m":176.5,"from":"demo_node_20","to":"demo_node_29","name":"4"},"demo_line_32":{"type":"tb","m":25.5,"from":"demo_node_20","to":"demo_node_27","name":"1"},"demo_line_33":{"type":"tb","m":128,"from":"demo_node_20","to":"demo_node_30","name":"3"},"demo_line_34":{"type":"tb","m":74.5,"from":"demo_node_20","to":"demo_node_28","name":"2"},"demo_line_36":{"type":"tb","m":21.5,"from":"demo_node_5","to":"demo_node_1","name":"T"},"demo_line_37":{"type":"lr","m":367,"from":"demo_node_1","to":"demo_node_20","name":""},"demo_line_45":{"type":"tb","m":225,"from":"demo_node_21","to":"demo_node_44","name":"1"},"demo_line_46":{"type":"tb","m":274.5,"from":"demo_node_21","to":"demo_node_38","name":"2"},"demo_line_47":{"type":"tb","m":325.5,"from":"demo_node_21","to":"demo_node_39","name":"3"},"demo_line_48":{"type":"sl","from":"demo_node_21","to":"demo_node_40","name":"4"},"demo_line_49":{"type":"tb","m":411.5,"from":"demo_node_21","to":"demo_node_42","name":"5"},"demo_line_50":{"type":"tb","m":470.5,"from":"demo_node_21","to":"demo_node_43","name":"0"},"demo_line_51":{"type":"sl","from":"demo_node_44","to":"demo_node_30","name":"2"},"demo_line_53":{"type":"sl","from":"demo_node_44","to":"demo_node_52","name":"1"},"demo_line_56":{"type":"sl","from":"demo_node_43","to":"demo_node_55","name":"0"},"demo_line_57":{"type":"sl","from":"demo_node_43","to":"demo_node_54","name":"1"},"demo_line_58":{"type":"sl","from":"demo_node_42","to":"demo_node_54","name":"0"},"demo_line_60":{"type":"sl","from":"demo_node_43","to":"demo_node_59","name":"2","alt":true}},"areas":{},"initNum":61};

//jsondata={"title":"newFlow_1","nodes":{"demo_node_2":{"name":"开始","left":70,"top":10,"type":"start round","width":24,"height":24,"alt":true},"demo_node_3":{"name":"业务受理","left":73,"top":82,"type":"task round","width":24,"height":24,"alt":true},"demo_node_4":{"name":"工程子流程(受理竣工报验)","left":76,"top":158,"type":"task round","width":24,"height":24,"alt":true},"demo_node_5":{"name":"计量装拆子流程(装拆信息录入)","left":77,"top":256,"type":"task round","width":24,"height":24,"alt":true},"demo_node_6":{"name":"业扩归档","left":83,"top":357,"type":"task round","width":24,"height":24,"alt":true},"demo_node_7":{"name":"结束","left":82,"top":437,"type":"end round","width":24,"height":24,"alt":true},"demo_node_13":{"name":"1.创建业扩工程电子化移交单","left":223,"top":127,"type":"node","width":115,"height":56,"alt":true},"demo_node_14":{"name":"1.创建户表资料电子化移交单","left":224,"top":242,"type":"node","width":118,"height":54,"alt":true},"demo_node_15":{"name":"1.发布电子化移交单","left":225,"top":342,"type":"node","width":118,"height":45,"alt":true},"demo_node_16":{"name":"1.发布电子化移交单","left":231,"top":425,"type":"node","width":114,"height":42,"alt":true},"demo_node_22":{"name":"编制电子化移交单_业扩类","left":502,"top":8,"type":"task round","width":24,"height":24,"alt":true},"demo_node_23":{"name":"电网建模-业扩类","left":505,"top":102,"type":"task round","width":24,"height":24,"alt":true},"demo_node_24":{"name":"编制电子化移交单_户表类","left":406,"top":132,"type":"task round","width":24,"height":24,"alt":true},"demo_node_25":{"name":"电网建模-户表类","left":407,"top":247,"type":"task round","width":24,"height":24,"alt":true},"demo_node_26":{"name":"发布沿布图及设备台账_户表类","left":415,"top":353,"type":"task round","width":24,"height":24,"alt":true},"demo_node_27":{"name":"发布单线图沿布图及设备台账_业扩类","left":511,"top":429,"type":"task round","width":24,"height":24,"alt":true},"demo_node_36":{"name":"1.同步GIS功能位置","left":588,"top":73,"type":"node","width":135,"height":42,"alt":true},"demo_node_37":{"name":"2.反馈生产处理功能位置完成通知","left":589,"top":133,"type":"node","width":138,"height":52,"alt":true},"demo_node_38":{"name":"1.同步GIS功能位置","left":598,"top":248,"type":"node","width":130,"height":41,"alt":true},"demo_node_39":{"name":"2.反馈生产处理功能位置完成通知","left":595,"top":322,"type":"node","width":130,"height":46,"alt":true},"demo_node_40":{"name":"GIS绘图_业扩类","left":858,"top":71,"type":"task round","width":24,"height":24,"alt":true},"demo_node_41":{"name":"生产单线图","left":858,"top":192,"type":"task round","width":24,"height":24,"alt":true},"demo_node_42":{"name":"GIS绘图_户表类","left":801,"top":256,"type":"task round","width":24,"height":24,"alt":true},"demo_node_47":{"name":"1.发送批量主数据同步通知","left":917.4,"top":139,"type":"node","width":175,"height":42,"alt":true},"demo_node_48":{"name":"2.接受数据资源管理平台文件校验结果","left":918.4,"top":190,"type":"node","width":178,"height":43,"alt":true},"demo_node_49":{"name":"3.获取资产设备信息同步结果","left":921.4,"top":251,"type":"node","width":174,"height":38,"alt":true},"demo_node_50":{"name":"1.发送批量主数据同步通知","left":918.4,"top":306,"type":"node","width":178,"height":42,"alt":true},"demo_node_51":{"name":"2.接受数据资源管理平台文件校验结果","left":924.4,"top":359,"type":"node","width":178,"height":46,"alt":true},"demo_node_52":{"name":"3.获取资产设备信息同步结果","left":923.4,"top":416,"type":"node","width":179,"height":41,"alt":true},"demo_node_53":{"name":"1.新增、更新或删除一条客户、客户协议、计量点、表计资产或计量表箱信息","left":925.4,"top":461,"type":"node","width":182,"height":73,"alt":true},"demo_node_54":{"name":"同步主数据_户表类(生产)","left":1257.4,"top":199,"type":"task round","width":24,"height":24,"alt":true},"demo_node_55":{"name":"同步主数据_业扩类(生产)","left":1256.4,"top":346,"type":"task round","width":24,"height":24,"alt":true},"demo_node_56":{"name":"同步主数据(营销)","left":1253.4,"top":457,"type":"task round","width":24,"height":24,"alt":true}},"lines":{"demo_line_8":{"type":"sl","from":"demo_node_2","to":"demo_node_3","name":""},"demo_line_9":{"type":"sl","from":"demo_node_3","to":"demo_node_4","name":"","alt":true},"demo_line_10":{"type":"sl","from":"demo_node_4","to":"demo_node_5","name":"","alt":true},"demo_line_11":{"type":"sl","from":"demo_node_5","to":"demo_node_6","name":"","alt":true},"demo_line_12":{"type":"sl","from":"demo_node_6","to":"demo_node_7","name":"","alt":true},"demo_line_17":{"type":"sl","from":"demo_node_2","to":"demo_node_13","name":"","alt":true},"demo_line_18":{"type":"sl","from":"demo_node_4","to":"demo_node_13","name":"","alt":true},"demo_line_19":{"type":"sl","from":"demo_node_5","to":"demo_node_14","name":"","alt":true},"demo_line_20":{"type":"sl","from":"demo_node_15","to":"demo_node_6","name":"","alt":true},"demo_line_28":{"type":"sl","from":"demo_node_22","to":"demo_node_23","name":"","alt":true},"demo_line_29":{"type":"sl","from":"demo_node_23","to":"demo_node_27","name":"","alt":true},"demo_line_30":{"type":"sl","from":"demo_node_27","to":"demo_node_16","name":"","alt":true},"demo_line_31":{"type":"sl","from":"demo_node_26","to":"demo_node_15","name":"","alt":true},"demo_line_32":{"type":"sl","from":"demo_node_25","to":"demo_node_26","name":"","alt":true},"demo_line_33":{"type":"sl","from":"demo_node_24","to":"demo_node_25","name":"","alt":true},"demo_line_43":{"type":"sl","from":"demo_node_40","to":"demo_node_36","name":"","alt":true},"demo_line_44":{"type":"sl","from":"demo_node_42","to":"demo_node_38","name":"","alt":true},"demo_line_45":{"type":"sl","from":"demo_node_38","to":"demo_node_25","name":"","alt":true},"demo_line_46":{"type":"sl","from":"demo_node_36","to":"demo_node_23","name":"","alt":true},"demo_line_57":{"type":"sl","from":"demo_node_53","to":"demo_node_56","name":"","alt":true},"demo_line_58":{"type":"sl","from":"demo_node_55","to":"demo_node_51","name":"","alt":true},"demo_line_59":{"type":"sl","from":"demo_node_54","to":"demo_node_48","name":"","alt":true}},"areas":{"demo_area_1":{"name":"营销系统","left":0,"top":0,"color":"blue","width":286,"height":542,"alt":true},"demo_area_21":{"name":"安全生产系统","left":286,"top":0,"color":"green","width":358,"height":542,"alt":true},"demo_area_34":{"name":"GIS平台","left":643,"top":1,"color":"red","width":342,"height":541,"alt":true},"demo_area_35":{"name":"数据资源平台","left":982.9999999999995,"top":0,"color":"yellow","width":386,"height":542,"alt":true}},"initNum":61};


//测试数据
jsondata={
    "title": "10086网状流程",
    "nodes": {
        "demo_node_9": {
            "state":"end",
            "name": "桂中区-已结束",
            "left": 25,
            "top": 10,
            "type": "start round",
            "width": 24,
            "height": 24,
            "alt": true
        },
        "demo_node_10": {
            "state":"running",
            "name": "桂北区-运行中",
            "left": 25,
            "top": 81,
            "type": "start round",
            "width": 24,
            "height": 24,
            "alt": true
        },
        "demo_node_11": {
            "state":"error",
            "name": "桂西区-错误",
            "left": 25,
            "top": 143,
            "type": "start round",
            "width": 24,
            "height": 24,
            "alt": true
        },
        "demo_node_12": {
            "state":"end",
            "name": "桂北区",
            "left": 25,
            "top": 290,
            "type": "start round",
            "width": 24,
            "height": 24,
            "alt": true
        },
        "demo_node_14": {
            "state":"end",
            "name": "桂东区",
            "left": 25,
            "top": 339,
            "type": "start round",
            "width": 24,
            "height": 24,
            "alt": true
        },
        "demo_node_2": {
            "state":"notStart",
            "name": "问候语2-未开始",
            "left": 232,
            "top": 104,
            "type": "chat",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_3": {
            "name": "问候语3",
            "left": 220,
            "top": 260,
            "type": "chat",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_4": {
            "name": "问候语4",
            "left": 222,
            "top": 327,
            "type": "chat",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_5": {
            "state":"end",
            "name": "停机判断",
            "left": 107,
            "top": 47,
            "type": "fork",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_13": {
            "state":"end",
            "name": "停机判断2",
            "left": 103,
            "top": 289,
            "type": "fork",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_20": {
            "name": "停机菜单",
            "left": 355,
            "top": 12,
            "type": "join",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_21": {
            "name": "正常菜单",
            "left": 368,
            "top": 362,
            "type": "join",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_27": {
            "name": "延时停机",
            "left": 492,
            "top": 13,
            "type": "node",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_28": {
            "name": "开机",
            "left": 491,
            "top": 62,
            "type": "node",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_29": {
            "name": "缴费",
            "left": 466,
            "top": 162,
            "type": "node",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_30": {
            "name": "历史话费查询",
            "left": 591,
            "top": 116,
            "type": "node",
            "width": 111,
            "height": 24,
            "alt": true
        },
        "demo_node_1": {
            "state":"notStart",
            "name": "问候语1-未开始",
            "left": 228,
            "top": 42,
            "type": "chat",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_38": {
            "name": "积分查询",
            "left": 506,
            "top": 261,
            "type": "complex mix",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_39": {
            "name": "剩余资源查询",
            "left": 499,
            "top": 312,
            "type": "complex mix",
            "width": 107,
            "height": 24,
            "alt": true
        },
        "demo_node_40": {
            "name": "常用业务办理",
            "left": 491,
            "top": 356,
            "type": "complex mix",
            "width": 110,
            "height": 24,
            "alt": true
        },
        "demo_node_42": {
            "name": "网络服务",
            "left": 492,
            "top": 397,
            "type": "complex mix",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_43": {
            "name": "转人工服务",
            "left": 479,
            "top": 457,
            "type": "state",
            "width": 91,
            "height": 24,
            "alt": true
        },
        "demo_node_44": {
            "name": "话费查询",
            "left": 477,
            "top": 213,
            "type": "state",
            "width": 86,
            "height": 24,
            "alt": true
        },
        "demo_node_52": {
            "name": "实时话费查询",
            "left": 609,
            "top": 212,
            "type": "node",
            "width": 107,
            "height": 24,
            "alt": true
        },
        "demo_node_54": {
            "name": "网络专区投诉",
            "left": 639,
            "top": 399,
            "type": "task",
            "width": 106,
            "height": 24,
            "alt": true
        },
        "demo_node_55": {
            "name": "普通转人工",
            "left": 641,
            "top": 456,
            "type": "task",
            "width": 109,
            "height": 24,
            "alt": true
        },
        "demo_node_59": {
            "name": "10088",
            "left": 500,
            "top": 514,
            "type": "task",
            "width": 86,
            "height": 24,
            "alt": true
        }
    },
    "lines": {
        "demo_line_6": {
            "state":"end",
            "type": "lr",
            "m": 81.5,
            "from": "demo_node_9",
            "to": "demo_node_5",
            "name": ""
        },
        "demo_line_7": {
            "state":"running",
            "type": "lr",
            "m": 81.5,
            "from": "demo_node_10",
            "to": "demo_node_5",
            "name": ""
        },
        "demo_line_9": {
            "state":"error",
            "type": "lr",
            "m": 81.5,
            "from": "demo_node_11",
            "to": "demo_node_5",
            "name": ""
        },
        "demo_line_14": {
            "state":"end",
            "type": "sl",
            "from": "demo_node_12",
            "to": "demo_node_13",
            "name": ""
        },
        "demo_line_15": {
            "state":"end",
            "type": "lr",
            "m": 78.5,
            "from": "demo_node_14",
            "to": "demo_node_13",
            "name": ""
        },
        "demo_line_17": {
            "type": "tb",
            "m": 152,
            "from": "demo_node_5",
            "to": "demo_node_2",
            "name": "F"
        },
        "demo_line_18": {
            "type": "tb",
            "m": 239,
            "from": "demo_node_13",
            "to": "demo_node_3",
            "name": "T"
        },
        "demo_line_19": {
            "type": "tb",
            "m": 383.5,
            "from": "demo_node_13",
            "to": "demo_node_4",
            "name": "F"
        },
        "demo_line_22": {
            "type": "lr",
            "m": 339,
            "from": "demo_node_4",
            "to": "demo_node_21",
            "name": ""
        },
        "demo_line_23": {
            "type": "lr",
            "m": 337.5,
            "from": "demo_node_2",
            "to": "demo_node_21",
            "name": ""
        },
        "demo_line_26": {
            "type": "lr",
            "m": 366.5,
            "from": "demo_node_3",
            "to": "demo_node_20",
            "name": ""
        },
        "demo_line_31": {
            "type": "tb",
            "m": 176.5,
            "from": "demo_node_20",
            "to": "demo_node_29",
            "name": "4"
        },
        "demo_line_32": {
            "type": "tb",
            "m": 25.5,
            "from": "demo_node_20",
            "to": "demo_node_27",
            "name": "1"
        },
        "demo_line_33": {
            "type": "tb",
            "m": 128,
            "from": "demo_node_20",
            "to": "demo_node_30",
            "name": "3"
        },
        "demo_line_34": {
            "type": "tb",
            "m": 74.5,
            "from": "demo_node_20",
            "to": "demo_node_28",
            "name": "2"
        },
        "demo_line_36": {
            "type": "tb",
            "m": 21.5,
            "from": "demo_node_5",
            "to": "demo_node_1",
            "name": "T"
        },
        "demo_line_37": {
            "type": "lr",
            "m": 367,
            "from": "demo_node_1",
            "to": "demo_node_20",
            "name": ""
        },
        "demo_line_45": {
            "type": "tb",
            "m": 225,
            "from": "demo_node_21",
            "to": "demo_node_44",
            "name": "1"
        },
        "demo_line_46": {
            "type": "tb",
            "m": 274.5,
            "from": "demo_node_21",
            "to": "demo_node_38",
            "name": "2"
        },
        "demo_line_47": {
            "type": "tb",
            "m": 325.5,
            "from": "demo_node_21",
            "to": "demo_node_39",
            "name": "3"
        },
        "demo_line_48": {
            "type": "sl",
            "from": "demo_node_21",
            "to": "demo_node_40",
            "name": "4"
        },
        "demo_line_49": {
            "type": "tb",
            "m": 411.5,
            "from": "demo_node_21",
            "to": "demo_node_42",
            "name": "5"
        },
        "demo_line_50": {
            "type": "tb",
            "m": 470.5,
            "from": "demo_node_21",
            "to": "demo_node_43",
            "name": "0"
        },
        "demo_line_51": {
            "type": "sl",
            "from": "demo_node_44",
            "to": "demo_node_30",
            "name": "2"
        },
        "demo_line_53": {
            "type": "sl",
            "from": "demo_node_44",
            "to": "demo_node_52",
            "name": "1"
        },
        "demo_line_56": {
            "type": "sl",
            "from": "demo_node_43",
            "to": "demo_node_55",
            "name": "0"
        },
        "demo_line_57": {
            "type": "sl",
            "from": "demo_node_43",
            "to": "demo_node_54",
            "name": "1"
        },
        "demo_line_58": {
            "type": "sl",
            "from": "demo_node_42",
            "to": "demo_node_54",
            "name": "0"
        },
        "demo_line_60": {
            "type": "sl",
            "from": "demo_node_43",
            "to": "demo_node_59",
            "name": "2",
            "alt": true
        }
    },
    "areas": {

    },
    "initNum": 61
};
