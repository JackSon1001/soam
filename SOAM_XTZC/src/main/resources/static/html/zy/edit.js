/**
 * 功能模块：系统支撑--》资源管理
 * 描   述：编辑资源界面
 * 文件名称：edit.js
 * 创建 人： 周艳平
 * 创建时间： 2016年10月17日11:01:34
 * 修改日志：
 */
 
(function(){
    eui.loadCtr('editZyController',
        function($scope, $euiModalInstance, $timeout, $info,Server,data) {
    	
    		var url = "/xtzc/zy";
            $scope.zy = {"pid": "", "wjbz": "", "zt": '', "zyid": "", "zylb": "", "zymc": ""};

            $scope.gljsData = [];
            $scope.gljsValue = [];//多选下拉是数组结构
            
            $scope.zylbValue = {};
            $scope.zyztValue = {};

            $scope.zylbData = Constants.ZYLB.getDataList();
            $scope.zyztData = Constants.ZT.getDataList();
                        
            $scope.isNotEdit = false;
            
            if(data.type == 'add'){
            	$scope.zy.pid = data.pid;
            	
            	$scope.zy.zylb = Constants.ZYLB.FID+"";//默认功能ID
            	$scope.zylbData[0].selected = true;
            	
            	$scope.zy.zt = Constants.ZT.YX+"";//默认有效
            	$scope.zyztData[0].selected = true;
            }else{
                angular.copy(data.row, $scope.zy);

            	$scope.zy.zylb = $scope.zy.zylb+"";
            	$scope.zy.zt = $scope.zy.zt+"";
            	
            	if($scope.zy.zylb == Constants.ZYLB.FID || $scope.zy.zylb == Constants.ZYLB.FID+""){//默认功能ID
            		$scope.zylbData[0].selected = true;
            		$scope.zylbData[1].selected = false;
            	}else{
            		$scope.zylbData[0].selected = false;
            		$scope.zylbData[1].selected = true;
            	}
            	if($scope.zy.zt == Constants.ZT.YX || $scope.zy.zt == Constants.ZT.YX+""){;//默认有效
            		$scope.zyztData[0].selected = true;
            		$scope.zyztData[1].selected = false;
            	}else{
            		$scope.zyztData[0].selected = false;
            		$scope.zyztData[1].selected = true;
            	}

            	url = "/xtzc/zy/"+$scope.zy.zyid;
            }
            
            if(data.type == 'query'){
                $scope.isNotEdit = true;
            }

            /**
             * 确定
             */
            $scope.ok = function () {
                var data = $scope.zy;
                data.zt = parseInt($scope.zyztValue.id);
                data.zylb = parseInt($scope.zylbValue.id);
                data.pid = parseInt(data.pid);
                
                var data2 = {xtzc_zy:data,xtzc_jszy:[]};
                
                //组织角色资源表
                for(var i=0; i<$scope.gljsValue.length; i++){
                	var jszy = {"gxid": '', "roleid": '', "zyid": ''};
                	jszy.roleid = $scope.gljsValue[i].id;
                	data2.xtzc_jszy.push(jszy);
                }
                
                //请求服务
                var config = {
                    req:{
                        method: 'POST',
                        url:url,
                        data: data2
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
                        	$euiModalInstance.close($scope.zy);
                        }
                    }
                };
                Server.reqData(config);
            };
            
            /**
             * 组织关联角色下拉
             */
            var config = {
        		req:{
        			url: "/xtzc/role/list",
                    method:'GET'
        		},
        		showLoadMsg:true,
                cb: function (data) {
                	if(!data.error){
                    	var jsData = data.body;
                    	for(var i=0; i<jsData.length; i++){
                    		var row = {"id":jsData[i].roleid, "name":jsData[i].jsmc, "desc":jsData[i].bz, "checked":false};
                    		$scope.gljsData.push(row);
                    	}
                    	
                    	//判断是新增或者修改
                    	if(eui.isNotEmpty($scope.zy.zyid)){
                    		var config = {
                				req:{
                        			url: "/xtzc/jszy/list",
                        			data:{"zyid": $scope.zy.zyid},
                                    method:'POST'
                        		},
                        		showLoadMsg:true,
                                cb: function (data) {
                                    if(data){                    	
                                    	var jszyData = data.body;
                                    	
                                    	for(var i=0; i<jszyData.length; i++){
                                    		for(var j=0; j<$scope.gljsData.length; j++){
                                    			if(jszyData[i].roleid == $scope.gljsData[j].id){
                                    				$scope.gljsData[j].checked = true;
                                    			}
                                    		}
                                    	}
                                    }
                                }
                            };
                            Server.reqData(config);
                    	}                    	
                    }
                }
            };
            Server.reqData(config);
            
            //关闭窗口
            $scope.cancel = function(){
                $euiModalInstance.dismiss('cancel');
            }
        });
}());
