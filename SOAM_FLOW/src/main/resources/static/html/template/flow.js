/**
 * 功能模块：建模设计--》流程建模--》编辑流程模板
 * 描  述：流程建模
 * 文件名称：flowLcjm.js
 * 创建  人： 周艳平
 * 创建时间： 2016年11月1日15:49:09
 * 修改日志：
 */

//自适应最大化iframe
var flowWidth = window.innerWidth;
var flowHeight = window.innerHeight;	
var property={
	width : flowWidth,
	height : flowHeight,
	toolBtns : ["start round","end round","task","node round","chat","state","plug","join round","fork round","complex mix"],
	haveHead : true,//BOOL值,是否需要展示标题及顶部按钮的顶部栏;
	headBtns : ["new","open","save","undo","redo","reload"],//如果haveHead=true，则定义HEAD区的按钮
	haveTool : true,//BOOL值,是否需要左边的工具栏(这决定了渲染完成后是编辑模式还是纯浏览模式)
	haveGroup : true,//BOOL值，决定了是否有节点连线编辑与分组区域编辑两种工作区状态的切换开关。
	useOperStack : true	//BOOL值，决定了是否要用事务序列管理工作区内的操作事务，选TRUE的话，将开启正常使用撤销undo和重做redo的功能，该设定只在可编辑状态时有效。
};
var remark={
	cursor : "选择指针",
	mutiselect:"多选结点",
	direct : "结点连线",
	start : "入口结点",
	end : "结束结点",
	task : "任务结点",
	node : "自动结点",
	chat : "决策结点",
	state : "状态结点",
	plug : "附加插件",
	join : "联合结点",
	fork : "分支结点",
	complex : "复合结点",
	group : "组织划分框编辑开关"
};
var flowLcjm;
$(document).ready(function(){
	//获取参数
	function getAttrStr(name){
		//http://localhost:8085/flow/html/jmsj/flowLcjm.html?id=13&ywid=5&math=0.1279647608580532&isEdit=N
	    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if(r!=null)return  unescape(r[2]); return null;
	}
	
	//获取参数
	var info_id = getAttrStr("id");
	var ywid = getAttrStr("ywid");
	var isEdit = getAttrStr("isEdit");
	var editable = getAttrStr("editable");
	//判断是否可编辑
	if(isEdit=="N"){
		property.haveHead = false;
		property.haveTool = false;
	}
				
	flowLcjm=$.createGooFlow($("#flowLcjm"),property);
	flowLcjm.setNodeRemarks(remark);
	flowLcjm.onBtnSaveClick = function(){				
		if(!info_id){
			window.parent.saveMsg("请选择流程模板。");
			return;
		}
		
		var flowData = flowLcjm.exportData();
		flowData["id"]=info_id;
		flowData["ywid"]=ywid;
		
		//调用父界面方法保存数据
		var flowDataJson = JSON.stringify(flowData);				
		window.parent.saveFlow(flowDataJson);					
	};
	//工作区是否可编辑
	if(editable=="false" || editable==false){
		flowLcjm.$editable=false;
	}
	
	//单元节点双击事件
    flowLcjm.$workArea.delegate(".GooFlow_item", "dblclick", { inthis: flowLcjm }, function (e) {
    	//window.parent.saveMsg(this.id + "----" + this.innerText);
    	window.parent.editNode({id:this.id, name:this.innerText});
    });
	
	//判断是否有模板
	if(info_id==null){
		flowLcjm.loadData([]);
	}else{
		window.parent.queryFlow('/flow/template/chart/'+info_id);
	}
});

/**
 * 加载流程模板
 **/
window.loadFlow = function(data){
	flowLcjm.loadData(data);
};