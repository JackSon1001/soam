/**
 * 功能模块：系统支撑--》角色管理
 * 描   述：编辑角色界面
 * 文件名称：edit.js
 * 创建 人： 周艳平
 * 创建时间： 2016年10月17日11:01:34
 * 修改日志：
 */

( function() {
	eui.loadCtr( 'editRoleController',
		function( $scope, $euiModalInstance, $timeout, $info, Server, data ) {
			$scope.isNotEdit = false;
			var url = "/xtzc/role";
			$scope.role = {
				"roleid": '',
				"jsmc": '',
				"zt": '',
				"bz": ''
			};
			$scope.zyztData = Constants.ZT.getDataList();
			$scope.zyztValue = {};
			var checkOptions = {
				checkbox: true, //如果为true，显示复选框
				cascadeCheck: false
			};
			$scope.checkOptions = checkOptions;
			$scope.nodeTree = [];
			$scope.my_tree = {};

			/**
			 * 查询资源树列表
			 */
			var queryTree = function() {
				var config = {
					req: {
						url: "/xtzc/zy/tree",
						method: 'GET'
					},
					cb: function( data ) {
						if( !data.error ) {
							var tempZy = data.body;
							//判断是否新增操作
							if( $scope.role.roleid == '' ) {
								$scope.nodeTree = tempZy;
							}
							else {
								var config = {
									req: {
										url: "/xtzc/jszy/list",
										method: 'POST',
										data: {
											"roleid": $scope.role.roleid
										}
									},
									cb: function( data ) {
										if( !data.error ) {
											var tempJszy = data.body;

											for( var i = 0; i < tempZy.length; i++ ) {
												for( var j = 0; j < tempZy[ i ].children.length; j++ ) {
													for( var k = 0; k < tempJszy.length; k++ ) {
														if( tempZy[ i ].children[ j ].name == tempJszy[ k ].zyid ) {
															tempZy[ i ].children[ j ].selected = true;
														}
													}
												}

												for( var k = 0; k < tempJszy.length; k++ ) {
													if( tempZy[ i ].name == tempJszy[ k ].zyid ) {
														tempZy[ i ].selected = true;
														break;
													}
												}
											}
											$scope.nodeTree = tempZy;
										}
									}
								};
								Server.reqData( config );
							}
						}
					}
				};
				Server.reqData( config );
			};
			queryTree();

			if( data.type == 'add' ) {
				$scope.role.zt = Constants.ZT.YX + ""; //默认有效
				$scope.zyztData[ 0 ].selected = true;
			}
			else {
				url = "/xtzc/role/" + data.row.roleid;
				angular.copy( data.row, $scope.role );

				if( $scope.role.zt == Constants.ZT.YX || $scope.role.zt == Constants.ZT.YX + "" ) {; //默认有效
					$scope.zyztData[ 0 ].selected = true;
					$scope.zyztData[ 1 ].selected = false;
				}
				else {
					$scope.zyztData[ 0 ].selected = false;
					$scope.zyztData[ 1 ].selected = true;
				}

				$scope.role.zt = "" + $scope.role.zt;
				$scope.index = data.index;
			}
			if( data.type == 'query' ) {
				$scope.isNotEdit = true;
			}

			/**
			 * 确定
			 */
			$scope.ok = function() {
				$scope.role.zt = parseInt( $scope.zyztValue.id );
				var data2 = {
					xtzc_role: $scope.role,
					xtzc_jszy: []
				};

				var ckZys = $scope.my_tree.get_all_selected_branch( $scope.nodeTree );
				if( ckZys == undefined || ckZys.length == 0 ) {
					$info.alert( {
						message: '请选择关联资源',
						type: 'warning'
					} );
					return;
				}
				//组织角色资源表
				for( var i = 0; i < ckZys.length; i++ ) {
					var jszy = {
						"gxid": '',
						"roleid": '',
						"zyid": ''
					};
					jszy.zyid = ckZys[ i ].name;
					data2.xtzc_jszy.push( jszy );
				}

				var data = $scope.role;
				// 请求服务
				var config = {
					req: {
						url: url,
						data: data2,
						method: 'POST'
					},
					showLoadMsg: true,
					cb: function( data ) {
						if( data ) {
							$info.showMessageBox( {
								width: 250,
								title: "系统提示",
								message: "保存成功。",
								timeout: 1000,
								type: 'succeed'
							} );
							$euiModalInstance.close( $scope.role );
						}
					}
				};
				Server.reqData( config );
			};

			// 关闭窗口
			$scope.cancel = function() {
				$euiModalInstance.dismiss( 'cancel' );
			}
		} );
}() )