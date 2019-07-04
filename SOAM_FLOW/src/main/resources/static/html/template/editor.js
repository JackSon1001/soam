/**
 * 功能模块：建模设计--》流程建模
 * 描      述：流程建模
 * 文件名称：lcjm.js
 * 创建   人： 周艳平
 * 创建时间： 2016年10月25日15:57:29
 * 修改日志：
 */
 
(function (){
    eui.loadCtr("euiController", ['$scope','$timeout', '$info','$euiModal','Server',
         function ($scope, $timeout,$info,$euiModal,Server) {
    		$("#flowiframe").attr("src", "flow.html?math="+Math.random());
    		
    		//注册提示方法
    		window.saveMsg = function(msg){
    			$info.alert(msg);
    		};

    		//保存模板数据
    		window.saveFlow = function(flowDataJson){
    			var config = {
        			req:{
					    method: 'POST',
					    url:'/flow/template/chart',
					    data: flowDataJson
					},
					showLoadMsg:true,
                    cb: function (data) {
                    	if(!data.error){
                    		$info.showMessageBox({
        	                    width: 250,
        	                    title: "系统提示",
        	                    message: "保存成功。",
        	                    timeout: 1000,
        	                    type: 'succeed'
        	                });          	
                        }
                    }
                };
                Server.reqData(config);
    		};
    		
    		//查询模板数据
    		window.queryFlow = function(url){
    			var config = {
	                req:{
	                    method: 'GET',	                    
	                    url:url
	                },
	                showLoadMsg:true,
	                cb: function (data) {
	                    if(!data.error){	                    	
	                    	window.frames["flowiframe"].loadFlow(data.body);
	                    }
	                }
	            };
		        Server.reqData(config);
    		};
    		
    		/**
    		 * 编辑节点信息
    		 */
    		window.editNode = function(data){
    			var modalInstance = $euiModal.open({
	                animation: true,
	                templateUrl: 'edit_node.htm',
	                controller: 'editNodeController',
	                size : 'width:400px',
	                title : '编辑节点信息',
	                resolve: {
	                    data: function () {
	                        return {type:'edit', ywid:$scope.selectNode == null ? 0 : parseInt($scope.selectNode.name), id:data.id, name:data.name, nodeIsEdit:data.nodeIsEdit};
	                    }
	                }
	            });
	            modalInstance.result.then(function (result) {
	            	
	            }, function () {
	            });
    		}
 		
    		/**
             * 查询业务域流程模板树
             */
    		$scope.queryTree = function(){
		        var config = {
	                req:{
	                    method: 'POST',	                    
	                    url:"/flow/ywy/tree",
	                    data: {}	//{ywid:"", name:"", zt:1, bz:"", pid:0}
	                },
	                showLoadMsg:true,
	                cb: function (data) {
	                    if(!data.error){
	                    	$scope.nodeTree = data.body;
	                    }
	                }
	            };
		        Server.reqData(config);
	    	};
	    	$scope.queryTree();
	    	
	    	/**
             * 新增流程模板
             */
	    	$scope.addLcmb = function(){
	    		if($scope.selectNode == null || $scope.selectNode.label.indexOf("[业务域]")<0){
	    			$info.showMessageBox({
	                    width: 300,
	                    title: "系统提示",
	                    message: '请选择【业务域】添加模板。',
	                    type: 'warning'
	                });
	    			return;
	    		}
	    		
	    		var modalInstance = $euiModal.open({
	                animation: true,
	                templateUrl: 'edit_detail.htm',
	                controller: 'editLcmbController',
	                size : 'width:400px',
	                title : '新增流程模板信息',
	                resolve: {
	                    data: function () {
	                        return {type:'add', ywid:$scope.selectNode == null ? 0 : parseInt($scope.selectNode.name)};
	                    }
	                }
	            });
	            modalInstance.result.then(function (result) {
	            	$scope.queryTree();
	            }, function () {
	            });
	    	};

	    	/**
             * 修改流程模板
             */
	    	$scope.upLcmb = function(){	    		
	    		if($scope.selectNode == null || $scope.selectNode.label.indexOf("[流程模板]")<0){
	    			$info.showMessageBox({
	                    width: 300,
	                    title: "系统提示",
	                    message: '请选择【流程模板】进行修改。',
	                    type: 'warning'
	                });
	    			return;
	    		}
	    		
	    		var modalInstance = $euiModal.open({
	                animation: true,
	                templateUrl: 'edit_detail.htm',
	                controller: 'editLcmbController',
	                size : 'width:400px',
	                title : '新增流程模板信息',
	                resolve: {
	                    data: function () {
	                        return $scope.selectNode.info;
	                    }
	                }
	            });
	            modalInstance.result.then(function (result) {
	            	$scope.queryTree();
	            }, function () {
	            });
	    	};

	    	/**
             * 删除流程模板
             */
	    	$scope.delLcmb = function(){
	    		if($scope.selectNode == null || $scope.selectNode.label.indexOf("[流程模板]")<0){
	    			$info.showMessageBox({
	                    width: 300,
	                    title: "系统提示",
	                    message: '请选择【流程模板】进行删除。',
	                    type: 'warning'
	                });
	    			return;
	    		}
	    		
	    		$info.confirm("确定删除所选记录吗？", "系统提示",
                    function (action) {
                        if (action == "ok") {
                        	//请求服务
                            var config = {
                                req:{
                                    method: 'DELETE',
                                    url:"/flow/template/"+$scope.selectNode.name
                                },
                                showLoadMsg:true,
                                cb: function (data) {
                                    if(!data.error){
                                    	$info.showMessageBox({
                    	                    width: 250,
                    	                    title: "系统提示",
                    	                    message: "删除成功。",
                    	                    timeout: 1000,
                    	                    type: 'succeed'
                    	                });
                                    	$scope.queryTree();
                                    	
                                    	//刷新模板编辑器
                                    	$("#flowiframe").attr("src", "flow.html?math="+Math.random());
                                    }
                                }
                            };
                            Server.reqData(config);
                        }
                    }
                );	    		
	    	};
		
    		/**
    		 *********树结构**********
    		 * */
            $scope.nodeTree = [];
            $scope.my_tree = {};
            $scope.selectNode = null;
            $scope.menuBtns = {add:false, up:false, del:false};
            
            $scope.treeOptions = {
                expandLevel: '1',
                menuTarget:"menuBtn",//右击菜单
                onSelect:function(node){
                	//隐藏菜单
                	var menuElement = angular.element(document.getElementById('menuBtn'));
    		        menuElement.css("display","none");
                	
                	$scope.selectNode = node;
                	if(node.label.indexOf("[流程模板]")>=0){
                		$scope.menuBtns = {add:false, up:true, del:true};
                	}else{
                		$scope.menuBtns = {add:true, up:false, del:false};
                	}
                }
            };
            
            /**
             * 双击展开/关闭节点
             */
            $scope.dbclickTree = function (node) {
                node.expanded = !node.expanded;
            };
            
            /**
             * 查看流程模板
             */
            $scope.onclickTree = function(node) {
            	$scope.selectNode = node;
            	
            	if(node.label.indexOf("[流程模板]")>=0){
            		var url = "flow.html?id="+node.info.id+"&ywid="+node.info.ywid+"&math="+Math.random();
            		$("#flowiframe").attr("src", url);
            	}
            };
         }
     ]);
}());
