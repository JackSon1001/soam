(function() {
	eui.module('app').controller('editUserController',
			function($scope, $euiModalInstance, $info, $euiModal,Server, data) {
				$scope.xbData = Constants.SEX.getDataList();
				$scope.ztData = Constants.USER.ZT.getDataList();
				$scope.roleData = [];
				$scope.xbValue = {};
				$scope.ztValue = {};
				$scope.roleValue = [];
				$scope.yhmm = "";
				$scope.textValue = {'text': ''};
				var method = 'POST';
				$scope.isNotEdit = false;
				$scope.rolies = [];
				$scope.user = {
					"userid" : '',
					"orgid" : null,
					"rygh" : '',
					"ryxm" : '',
					"yhm" : '',
					"yhmm" : '',
					'xb' : '',
					'zt' : ''
				};
				var resource = "/xtzc/user/"
				// 查询所有角色,填充到角色下拉框
				$scope.queryRole = function(){
					var role = {"zt": 1};
					var config = {
						req: {
							method: 'GET',
							url: "/xtzc/role/list",
							data: {
								"xtzc_yhjsgx": role
							}
						},
						cb: function( result ) {
							if( !result.error) {
								for(var i in result.body){
									var obj = {};
									obj["id"] = result.body[i].roleid;
									obj["name"] = result.body[i].jsmc;
									obj.checked = false;
									$scope.roleData.push(obj);
								}
								if(data.type != 'add'){
									$scope.queryYhjsgx();
								}
							}
						}
					};
					Server.reqData( config );
				}
				$scope.queryRole();
				// 查询用户角色关系,设置选中
				$scope.queryYhjsgx = function(){
					var xtzc_yhjsgx = {};
					xtzc_yhjsgx.userid = $scope.user.userid;
					var config = {
						req: {
							method: 'POST',
							url: "/xtzc/yhjsgx/list",
							data: xtzc_yhjsgx
						},
						cb: function( data ) {
							if( !data.error) {
								var roles = data.body;
								for(var i in roles){
									for(var j in $scope.roleData){
										if($scope.roleData[j].id == roles[i].roleid){
											$scope.roleData[j].checked = true;
											break;
										}
									}
								}
							}
						}
					};
					Server.reqData( config );
				}
				
				
				
				// 处理性别,状态下拉框	
				if (data.type != 'add') {
					method = 'PUT';
					resource = "/xtzc/user/" + data.row.userid;
					angular.copy(data.row, $scope.user);
					for(var index in $scope.xbData){
						if($scope.xbData[index].id == $scope.user.xb){
							$scope.xbData[index].selected = true;
						}else{
							$scope.xbData[index].selected = false;
						}
					}
					for(var index in $scope.ztData){
						if($scope.ztData[index].id == $scope.user.zt){
							$scope.ztData[index].selected = true;
						}else{
							$scope.ztData[index].selected = false;
						}
					}
					$scope.textValue.text = $scope.user.orgid;
					$scope.index = data.index;
					$scope.yhmm = $scope.user.yhmm;
				}else{
					if($scope.ztData && $scope.ztData.length > 0){
						$scope.ztData[0].selected = true;
					}
					
					if($scope.xbData && $scope.xbData.length > 0){
						$scope.xbData[0].selected = true;
					}
				}
				if (data.type == 'query') {
					$scope.isNotEdit = true;
				}
				
				// 密码输入框聚焦事件
				$scope.focus =  function(){
					if(data.type == 'add'){
						return;
					}
					$scope.user.yhmm = "";
				}
				// 密码输入框鼠标移开事件
				$scope.blur =  function(){
					if(data.type == 'add'){
						return;
					}
					if($scope.user.yhmm == ""){
						$scope.user.yhmm = $scope.yhmm;
					}
				}
				// 弹出选择机构窗口
				$scope.click = function(){
                	var modalInstance = $euiModal.open({
                        animation: true,
                        templateUrl: '/xtzc/html/org/tree.htm',
                        controller: 'chooseOrgController',
                        size : 'width:350px',
                        title : '选择机构',
                        resolve: {
                            data: function () {
                                return {};
                            }
                        }
                    });
                    modalInstance.result.then(function (selectBranch) {
                       if(selectBranch){
                    	   
                    	   $scope.textValue.text = selectBranch.label;
                    	   $scope.user.orgid = selectBranch.name;
                       }
                    }, function () {
                    });
                };
                
                // 确定按钮
				$scope.ok = function() {
					$scope.user.xb = $scope.xbValue.id;
					$scope.user.zt = $scope.ztValue.id;
					for(var i in $scope.roleValue){
						var obj = {};
						obj.roleid = $scope.roleValue[i].id;
						$scope.rolies.push(obj);
					}
					var data = {};
					
					data.xtzc_user = $scope.user;
					data.xtzc_yhjsgx = $scope.rolies;
					// 密码加密
					if(data.type == 'add'){
						$scope.user.yhmm = $.md5($scope.user.yhmm);
					}else{
						if($scope.user.yhmm != $scope.yhmm){
							$scope.user.yhmm = $.md5($scope.user.yhmm);
						}
					}
					// 请求服务
					var config = {
						req : {
							method : method,
							url : resource,
							data : data
						},
						cb : function(data) {
							if (!data.error) {
								$info.showMessageBox({
		                            width: 250,
		                            title: "系统提示",
		                            message: "操作成功！",
		                            type: 'succeed',
		                            timeout : 2000
		                        },function(){
		                        	$euiModalInstance.close($scope.user);
		                        });
								
							}
						}
					};
					Server.reqData(config);
				};
				// 关闭窗口
				$scope.cancel = function() {
					$euiModalInstance.dismiss('cancel');
				}
			});
}())
