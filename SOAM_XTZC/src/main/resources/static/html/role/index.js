/**
 * 功能模块：系统支撑--》角色管理
 * 描   述：角色管理界面
 * 文件名称：index.js
 * 创建 人： 周艳平
 * 创建时间： 2016年10月17日11:01:34
 * 修改日志：
 */

( function() {
	eui.loadCtr( "euiController", [ '$scope', '$timeout', '$info', '$euiModal', 'Server',
		function( $scope, $timeout, $info, $euiModal, Server ) {

			$scope.role = {
				jsmc: "",
				zt: ""
			};
			var grid;
			$scope.gd_methods = grid = {};
			$scope.options = {
				columns: [
					[ {
						field: "jsmc",
						title: "角色名称",
						halign: "center",
						width: 200
					}, {
						field: "zt",
						title: "状态",
						halign: "center",
						width: 150,
						formatter: function( value, row ) {
							if( value == Constants.ZT.YX || value == Constants.ZT.YX + "" ) {; //默认有效
								return "有效";
							}
							else {
								return "无效";
							}
						},
					}, {
						field: "bz",
						title: "备注",
						halign: "center",
						width: 300
					} ]
				],
				nowrap: false,
				title: "角色信息列表",
				toolbar: '#gdTools',
				collapsible: true,
				singleSelect: false,
				checkOnSelect: true,
				selectOnCheck: true,
				rownumbers: true,
				striped: true,
				border: true,
				checkbox: true,
				//				fit: true,
				//				fitColumns: true,
				remoteSort: false,
				pagination: true,
				method: "post",
				url: "/xtzc/role/page",
				pageNumber: 1,
				pageSize: 20,
				pageList: [ 20, 50, 100 ],
				queryParams: $scope.role, //在请求远程数据的时候发送额外的参数
				onDblClickRow: function( rowIndex, rowData ) {
					$scope.update( rowData );
				}
			};

			/**
			 * 重置
			 */
			$scope.reset = function() {
				$scope.role = {
					jsmc: "",
					zt: ""
				};
				$scope.options.queryParams = $scope.zy;
			};

			/**
			 * 新增角色
			 */
			$scope.add = function() {
				var modalInstance = $euiModal.open( {
					animation: true,
					templateUrl: 'edit.htm',
					controller: 'editRoleController',
					size: 'width:400px',
					title: '新增角色信息',
					resolve: {
						data: function() {
							return {
								type: 'add'
							};
						}
					}
				} );
				modalInstance.result.then( function( result ) {
					$scope.query();
				}, function() {} );
			}

			/**
			 * 查询角色
			 */
			$scope.query = function() {
				var config = {
					req: {
						method: 'POST',
						url: "/xtzc/role/page",
						data: {
							queryParams: $scope.role,
							pageNumber: parseInt( $scope.options.pageNumber ) - 1,
							pageSize: $scope.options.pageSize,
							sort: $scope.options.sort
						}
					},
					showLoadMsg: true,
					cb: function( data ) {
						if( !data.error ) {
							$scope.data = data.body;
						}
					}
				};
				Server.reqData( config );
			}

			/**
			 * 修改角色
			 */
			$scope.update = function(rowData) {
				
				var ckRows = [ rowData ];
				if( !rowData ) {
					ckRows = grid.getChecked();
				}

				//判断是否选择
				if( ckRows.length == 0 ) {
					$info.alert( {
						message: '请选择需要修改的记录',
						type: 'warning'
					} );
					return;
				}

				if( ckRows.length > 1 ) {
					$info.alert( {
						message: '只能选择一条记录修改',
						type: 'warning'
					} );
					return;
				}

				var idx = grid.getRowIndex( ckRows[ 0 ] );
				var modalInstance = $euiModal.open( {
					animation: true,
					templateUrl: 'edit.htm',
					controller: 'editRoleController',
					size: 'width:400px',
					title: '修改角色信息',
					resolve: {
						data: function() {
							return {
								type: 'edit',
								index: idx,
								row: ckRows[ 0 ]
							};
						}
					}
				} );

				modalInstance.result.then( function( result ) {
					$scope.query();
				}, function() {} );
			};

			/**
			 * 删除角色
			 */
			$scope.delete = function() {
				var ckRows = grid.getChecked();

				//判断是否选择
				if( ckRows.length == 0 ) {
					$info.alert( {
						message: '请选择需要删除的记录',
						type: 'warning'
					} );
					return;
				}

				$info.confirm( "确定删除所选记录吗？", "系统提示",
					function( action ) {
						if( action == "ok" ) {
							var config = {
								req: {
									method: 'DELETE',
									url: '/xtzc/role/list',
									data: ckRows
								},
								showLoadMsg: true,
								cb: function( data ) {
									if( !data.error ) {
										$info.showMessageBox( {
											width: 250,
											title: "系统提示",
											message: "删除成功。",
											timeout: 1000,
											type: 'succeed'
										} );
										$scope.query();
									}
								}
							};
							Server.reqData( config );
						}
					}
				);
			};

			/**
			 * 查看角色详细信息
			 */
			/*$scope.queryRole = function( row ) {
				var ckRows = grid.getChecked();
				if( row != undefined ) {
					ckRows = [ row ];
				}

				//判断是否选择
				if( ckRows.length == 0 ) {
					$info.alert( {
						message: '请选择需要查看的记录',
						type: 'warning'
					} );
					return;
				}

				if( ckRows.length > 1 ) {
					$info.alert( {
						message: '只能选择一条记录查看',
						type: 'warning'
					} );
					return;
				}

				var idx = grid.getRowIndex( ckRows[ 0 ] );
				var modalInstance = $euiModal.open( {
					animation: true,
					templateUrl: 'edit.htm',
					controller: 'editRoleController',
					size: 'width:400px',
					title: '查看角色信息',
					resolve: {
						data: function() {
							return {
								type: 'query',
								index: idx,
								row: ckRows[ 0 ]
							};
						}
					}
				} );

				modalInstance.result.then( function( result ) {

				}, function() {
					//alert('取消。。。。');
				} );
			};*/
		}
	] );
}() );