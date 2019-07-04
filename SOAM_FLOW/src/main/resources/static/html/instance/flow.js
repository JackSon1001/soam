/**
 * 功能模块：流程查看
 * 描  述：流程查看	建议此处加上随机值，实时刷新：&math=Math.random()
 		【因和eui框架存在冲突，此处所有服务请求都是调用父界面的方法，可参考【lcjm.html】使用】
 		传参：流程实例id：iid
 			查看模式传参：haveTool	//是否需要左边的工具栏
 * 文件名称：flow.js
 * 创建  人： 周艳平
 * 创建时间： 2016年11月30日11:32:41
 * 修改日志：
 */

//自适应最大化iframe
var flowWidth = window.innerWidth;
var flowHeight = window.innerHeight;
var property = {
	width: flowWidth,
	height: flowHeight,
	toolBtns: [ "start round", "end round", "task round", "node", "chat", "state", "plug", "join", "fork", "complex mix" ],
	haveHead: false, //BOOL值,是否需要展示标题及顶部按钮的顶部栏;
	headBtns: [ "new", "open", "save", "undo", "redo", "reload" ], //如果haveHead=true，则定义HEAD区的按钮
	haveTool: true, //BOOL值,是否需要左边的工具栏(这决定了渲染完成后是编辑模式还是纯浏览模式)
	haveGroup: false, //BOOL值，决定了是否有节点连线编辑与分组区域编辑两种工作区状态的切换开关。
	useOperStack: true //BOOL值，决定了是否要用事务序列管理工作区内的操作事务，选TRUE的话，将开启正常使用撤销undo和重做redo的功能，该设定只在可编辑状态时有效。
};
var remark = {
	cursor: "选择指针",
	mutiselect: "多选结点",
	direct: "结点连线",
	start: "入口结点",
	end: "结束结点",
	task: "自动结点",
	node: "任务结点",
	chat: "决策结点",
	state: "状态结点",
	plug: "附加插件",
	join: "联合结点",
	fork: "分支结点",
	complex: "复合结点",
	group: "组织划分框编辑开关"
};
var flowLook;
$( document ).ready( function() {
	//获取参数	
	var lcck = window.parent.lcck;

	//判断是否可编辑
	if( lcck.haveTool == "false" || lcck.haveTool == false ) {
		property.haveHead = false;
		property.haveTool = false;
	}

	flowLook = $.createGooFlow( $( "#flowLook" ), property );
	flowLook.setNodeRemarks( remark );
	flowLook.$editable = false; //工作区不可编辑

	//单元节点双击事件
	flowLook.$workArea.delegate( ".ico_node", "dblclick", {
		inthis: flowLook
	}, function( e ) {
		//window.parent.saveMsg(this.id + "----" + this.innerText);
		//    	window.parent.editNode({id:this.id, name:this.innerText, nodeIsEdit:nodeIsEdit});
	} );

	//判断是否有模板
	if( lcck.iid == null ) {
		flowLook.loadData( [] );
	}
	else {
		window.parent.queryFlow( '/flow/instance/chart/' + lcck.iid );
	}
} );

/**
 * 加载流程模板
 **/
window.loadFlow = function( data ) {
	flowLook.loadData( data );
};