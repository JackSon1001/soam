/**
 * 功能模块：系统支撑--》资源管理
 * 描  述：资源管理界面
 * 文件名称：index.js
 * 创建 人： 周艳平
 * 创建时间： 2016年10月17日11:01:34
 * 修改日志：
 */

( function() {
	eui.loadCtr( "euiController", [ '$scope', '$timeout', '$info', '$euiModal', 'Server',
		function( $scope, $timeout, $info, $euiModal, Server ) {

			$scope.zy = {
				zymc: "",
				zylb: "",
				zt: "",
				pid: null
			};
			var grid;
			$scope.gd_methods = grid = {};
			$scope.options = {
				columns: [
					[ {
						field: "zymc",
						title: "资源名称",
						halign: "center",
						width: 200
					}, {
						field: "pid",
						title: "上级资源",
						halign: "center",
						width: 200,
						formatter: function( value, row, index ) {
							var fmtValue = "一级资源";
							if( !( value == 0 || value == "0" ) ) {
								fmtValue = $scope.selectNode == null ? value : $scope.selectNode.label;
							}
							return fmtValue;
						}
					}, {
						field: "zylb",
						title: "资源类别",
						halign: "center",
						width: 150,
						formatter: function( value, row, index ) {
							if( value == Constants.ZYLB.FID || value == Constants.ZYLB.FID + "" ) { //默认功能ID
								return "功能ID";
							}
							else {
								return "功能URL";
							}
						}
					}, {
						field: "zt",
						title: "状态",
						halign: "center",
						width: 150,
						formatter: function( value, row, index ) {
							if( value == Constants.ZT.YX || value == Constants.ZT.YX + "" ) {; //默认有效
								return "有效";
							}
							else {
								return "无效";
							}
						}
					}, {
						field: "wjbz",
						title: "资源地址",
						halign: "center",
						width: 300
					} ]
				],
				nowrap: false,
				checkbox: true,
				singleSelect: false, //设置选择方式：false 多选；true 单选
				title: "资源信息列表",
				toolbar: '#gdTools',
				collapsible: true,
				checkOnSelect: true,
				selectOnCheck: true,
				rownumbers: true,
				striped: true,
				border: true,
				/*fit : true,
				fitColumns : true,*/
				remoteSort: false,
				pagination: true,
				method: "post",
				url: "/xtzc/zy/page",
				pageNumber: 1,
				pageSize: 20,
				pageList: [ 20, 50, 100 ],
				queryParams: $scope.zy, //在请求远程数据的时候发送额外的参数
				onDblClickRow: function( rowIndex, rowData ) {
					$scope.update( rowData );
				}
			};

			/**
			 * 查询树列表
			 */
			var queryTree = function() {
				var config = {
					req: {
						method: 'GET',
						url: "/xtzc/zy/tree",
						data: $scope.zy
					},
					showLoadMsg: false,
					cb: function( data ) {
						if( !data.error ) {
							$scope.nodeTree = [ {
								"label": "功能资源",
								"info": {},
								"children": data.body
							} ];
						}
					}
				};
				Server.reqData( config );
			};
			queryTree();

			/**
			 * 新增资源信息
			 */
			$scope.add = function() {
				var modalInstance = $euiModal.open( {
					animation: true,
					templateUrl: 'edit.htm',
					controller: 'editZyController',
					size: 'width:600px',
					title: '新增资源信息',
					resolve: {
						data: function() {
							return {
								type: 'add'
							};
						}
					}
				} );
				modalInstance.result.then( function( result ) {
					queryTree();
					$scope.query();
				}, function() {} );
			}

			/**
			 * 查询资源信息
			 */
			$scope.query = function() {
				var config = {
					req: {
						method: 'POST',
						url: "/xtzc/zy/page",
						data: {
							queryParams: $scope.zy,
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
			 * 重置
			 */
			$scope.reset = function() {
				$scope.zy = {
					zymc: "",
					zylb: "",
					zt: "",
					pid: ""
				};
				$scope.options.queryParams = $scope.zy;
			};

			/**
			 * 修改资源信息
			 */
			$scope.update = function( rowData ) {
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

				var modalInstance = $euiModal.open( {
					animation: true,
					templateUrl: 'edit.htm',
					controller: 'editZyController',
					size: 'width:600px',
					title: '修改资源信息',
					resolve: {
						data: function() {
							return {
								type: 'edit',
								row: ckRows[ 0 ]
							};
						}
					}
				} );

				modalInstance.result.then( function( result ) {
					queryTree();
					$scope.query();
				}, function() {} );
			};

			/**
			 * 删除资源信息
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
									url: '/xtzc/zy/list',
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
										queryTree();
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
			 * 查看资源信息
			 */
			/*$scope.queryZyxx = function( row ) {
				var ckRows = grid.getChecked();
				if( row != undefined ) {
					ckRows = [ row ];
				}

				//判断是否选择
				if( ckRows.length == 0 ) {
					$info.alert( '请选择需要查看的记录' );
					return;
				}

				if( ckRows.length > 1 ) {
					$info.alert( '只能选择一条记录查看' );
					return;
				}

				var modalInstance = $euiModal.open( {
					animation: true,
					templateUrl: 'edit.htm',
					controller: 'editZyController',
					size: 'width:600px',
					title: '查看资源信息',
					resolve: {
						data: function() {
							return {
								type: 'query',
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

			/**
			 *********树结构**********
			 * */
			$scope.nodeTree = [];
			$scope.my_tree = {};
			$scope.selectNode = null;
			$scope.treeOptions = {
				expandLevel: '2'
			}

			/**
			 * 双击展开/关闭节点
			 */
			$scope.dbclickTree = function( node ) {
				node.expanded = !node.expanded;
			};

			/**
			 * 树单击事件
			 */
			$scope.clickTree = function( node ) {
				$scope.selectNode = node;

				var config = {
					req: {
						method: 'POST',
						url: '/xtzc/zy/list',
						data: {
							"pid": node.name
						}
					},
					showLoadMsg: true,
					cb: function( data ) {
						if( !data.error ) {
							var datatemp = {
								data: data.body,
								page: {
									pageNumber: parseInt( $scope.options.pageNumber ) - 1,
									pageSize: $scope.options.pageSize,
									total: data.body.length
								}
							};
							$scope.data = datatemp;
						}
					}
				};
				Server.reqData( config );
			};
		}
	] );
}() );