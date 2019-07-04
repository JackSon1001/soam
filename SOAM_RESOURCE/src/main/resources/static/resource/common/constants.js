(function(){
this.Constants={"SF":{"NO":2,"YES":1},"SEX":{"MAN":1,"WOMAN":2},"RABBITMQ":{"QUEUE":{"LOG":"SOAM_LOG","LOG_REQUEST":"SOAM_LOG_REQUEST"}},"ZT":{"WX":2,"YX":1},"SERVICE":{"SYSTEM":"SERVICE-SYSTEM","CONFIG":"SERVICE-CONFIG","GATEWAY":"SERVICE-GATEWAY","TESTER":"SERVICE-TESTER","LOGGER":"SERVICE-LOGGER","EUREKA":"SERVICE-EUREKA","XTZC":"SERVICE-XTZC","WS":"SERVICE-WS","FLOW":"SERVICE-FLOW","CHART":"SERVICE-CHART","RESOURCE":"SERVICE-RESOURCE"},"USER":{"ZT":{"WX":2,"SD":3,"ZX":4,"YX":1}},"CSG_SYSTEM":{"GIS":5,"SJZYPT":6,"CWGL":2,"PMS":1,"ZCGL":3,"RLZYGL":4},"FLOW":{"LINE_TYPE":{"LR":"lr","SL":"sl","TB":"tb"},"NODE_TYPE":{"END_ROUND":"end round","START_ROUND":"start round","TASK":"task","MUTISELECT":"mutiselect","FORK":"fork","NODE":"node","CHAT":"chat","TASK_ROUND":"task round","JOIN":"join","COMPLEX_MIX":"complex mix","STATE":"state","PLUG":"plug"},"AREA_COLOR":{"RED":"red","BLUE":"blue","YELLOW":"yellow","GREEN":"green"},"INSTANCE_STATUS":{"ZC":"1","YC":"2","GQ":"3"}},"ZYLB":{"FID":1,"URL":2}};

this.Constants.getDataList = function(){ return [] };
this.Constants.FLOW.getDataList = function(){ return [] };
this.Constants.FLOW.LINE_TYPE.getDataList = function(){ return [{"name":"lr","id":"lr"},{"name":"tb","id":"tb"},{"name":"sl","id":"sl"}] };
this.Constants.FLOW.NODE_TYPE.getDataList = function(){ return [{"name":"start round","id":"start round"},{"name":"chat","id":"chat"},{"name":"fork","id":"fork"},{"name":"join","id":"join"},{"name":"node","id":"node"},{"name":"complex mix","id":"complex mix"},{"name":"state","id":"state"},{"name":"task","id":"task"},{"name":"plug","id":"plug"},{"name":"end round","id":"end round"},{"name":"mutiselect","id":"mutiselect"},{"name":"task round","id":"task round"}] };
this.Constants.FLOW.AREA_COLOR.getDataList = function(){ return [{"name":"红色","id":"red"},{"name":"黄色","id":"yellow"},{"name":"蓝色","id":"blue"},{"name":"绿色","id":"green"}] };
this.Constants.FLOW.INSTANCE_STATUS.getDataList = function(){ return [{"name":"正常","id":"1"},{"name":"异常","id":"2"},{"name":"挂起","id":"3"}] };
this.Constants.USER.getDataList = function(){ return [] };
this.Constants.USER.ZT.getDataList = function(){ return [{"name":"有效","id":1},{"name":"无效","id":2},{"name":"锁定","id":3},{"name":"注销","id":4}] };
this.Constants.ZYLB.getDataList = function(){ return [{"name":"功能ID ","id":1},{"name":"功能URL ","id":2}] };
this.Constants.SEX.getDataList = function(){ return [{"name":"男","id":1},{"name":"女 ","id":2}] };
this.Constants.SF.getDataList = function(){ return [{"name":"是","id":1},{"name":"否","id":2}] };
this.Constants.ZT.getDataList = function(){ return [{"name":"有效","id":1},{"name":"无效","id":2}] };
this.Constants.RABBITMQ.getDataList = function(){ return [] };
this.Constants.RABBITMQ.QUEUE.getDataList = function(){ return [{"name":"SOAM_LOG_REQUEST","id":"SOAM_LOG_REQUEST"},{"name":"SOAM_LOG","id":"SOAM_LOG"}] };
this.Constants.CSG_SYSTEM.getDataList = function(){ return [{"name":"营销管理系统","id":1},{"name":"财务管理系统","id":2},{"name":"资产管理系统","id":3},{"name":"人力资源管理系统","id":4},{"name":"地理信息系统","id":5},{"name":"数据资源平台","id":6}] };
this.Constants.SERVICE.getDataList = function(){ return [{"name":"EUREKA","id":"SERVICE-EUREKA"},{"name":"SYSTEM","id":"SERVICE-SYSTEM"},{"name":"CONFIG","id":"SERVICE-CONFIG"},{"name":"XTZC","id":"SERVICE-XTZC"},{"name":"CHART","id":"SERVICE-CHART"},{"name":"LOGGER","id":"SERVICE-LOGGER"},{"name":"FLOW","id":"SERVICE-FLOW"},{"name":"WS","id":"SERVICE-WS"},{"name":"GATEWAY","id":"SERVICE-GATEWAY"},{"name":"RESOURCE","id":"SERVICE-RESOURCE"},{"name":"TESTER","id":"SERVICE-TESTER"}] };
})();