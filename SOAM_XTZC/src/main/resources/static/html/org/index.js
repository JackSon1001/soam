( function() {
	eui.module( 'app', [ 'eui', 'util' ] )
		.controller( 'euiController',
			function( $scope, $timeout, $info, $euiModal, Server ) {
				var grid;
				$scope.nodeTree = [];
				$scope.my_tree = {};
				$scope.selectNode = null;
				$scope.gd_methods = grid = {};

				$scope.orgParam = {
					"jgmc": '',
					"jgjc": ''
				};

				$scope.options = {
					columns: [
						[ {
								field: "jgmc",
								title: "机构名称",
								halign: "center",
								width: 120
							}, {
								field: "jgjc",
								title: "机构简称",
								halign: "center",
								width: 120
							}, {
								field: "pid",
								title: "上级机构",
								halign: "center",
								width: 80,
								formatter: function( value, row ) {
									for( var index in $scope.data.data ) {
										if( $scope.data.data[ index ].orgid == row.pid ) {
											return $scope.data.data[ index ].jgmc;
										}
									}
									return value;
								}

							},

							{
								field: "zt",
								title: "状态",
								halign: "center",
								width: 40,
								formatter: function( value, row ) {
									if( value == Constants.ZT.WX ) {
										return "无效";
									}
									else if( value == Constants.ZT.SD ) {
										return "锁定";
									}
									else if( value == Constants.ZT.ZX ) {
										return "注销";
									}
									else if( value == Constants.ZT.YX ) {
										return "有效";
									}
									return value;
								}
							}, {
								field: "bz",
								title: "备注",
								halign: "center",
								width: 120
							}
						]
					],
					method: "post",
					url: "/xtzc/org/page",
					nowrap: false,
					title: "机构信息列表",
					toolbar: '#gdTools',
					collapsible: true,
					singleSelect: false,
					checkOnSelect: true,
					selectOnCheck: true,
					rownumbers: true,
					striped: true,
					border: true,
					fit: true,
					fitColumns: true,
					remoteSort: false,
					onSortColumn: function( sort, order ) {},
					checkbox: true, // 如果为true，则显示复选框
					pagination: true,
					pageNumber: 1,
					pageSize: 20,
					pageList: [ 20, 50, 100 ],
					queryParams: {}, // 在请求远程数据的时候发送额外的参数
					sort: [],
					onDblClickRow: function( rowIndex, rowData ) {
						$scope.update( rowData );
					},
					onLoadError: function( data ) {
						JSON.stringify( data, true );
					}
				};

				$scope.treeOptions = {
					expandLevel: '2'
				}

				$scope.queryOrgTree = function() {
					var config = {
						req: {
							method: 'GET',
							url: "/xtzc/org/tree/0"
						},
						cb: function( data ) {
							if( !data.error ) {
								$scope.nodeTree = data.body;
							}
						}
					};
					Server.reqData( config );

				}
				$scope.queryOrgTree();
				// 新增机构
				$scope.add = function() {
						var modalInstance = $euiModal.open( {
							animation: true,
							templateUrl: 'detail.htm',
							controller: 'editOrgController',
							size: 'width:550px',
							title: '新增机构信息',
							resolve: {
								data: function() {
									return {
										type: 'add',
										parentOrg: $scope.selectNode
									};
								}
							}
						} );
						modalInstance.result.then( function() {
							$info.showMessageBox( {
								width: 250,
								title: "系统提示",
								message: "操作成功！",
								type: 'succeed',
								timeout: 2000
							} );
							$scope.query();
							$scope.queryOrgTree();
						}, function() {} );

					}
					// 查询机构
				$scope.query = function() {
					var config = {
						req: {
							method: 'POST',
							url: $scope.options.url,
							data: {
								queryParams: $scope.orgParam,
								pageNumber: parseInt( $scope.options.pageNumber ) - 1,
								pageSize: $scope.options.pageSize,
								sort: $scope.options.sort
							}
						},
						cb: function( data ) {
							if( !data.error ) {
								$scope.data = data.body;
							}
						},
						showLoadMsg: true
					};
					Server.reqData( config );
				}

				// 修改机构信息
				$scope.update = function( row ) {
					var data;
					if( row ) {
						data = row;
					}
					else {
						var ckRows = grid.getChecked();
						// 判断是否选择
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
						data = ckRows[ 0 ];
					}
					var modalInstance = $euiModal.open( {
						animation: true,
						templateUrl: 'detail.htm',
						controller: 'editOrgController',
						size: 'width:550px',
						title: '修改机构信息',
						resolve: {
							data: function() {
								return {
									type: 'edit',
									index: idx,
									row: data,
									parentOrg: $scope.selectNode
								};
							}
						}
					} );
					modalInstance.result.then( function( result ) {
						$info.showMessageBox( {
							width: 250,
							title: "系统提示",
							message: "操作成功！",
							type: 'succeed',
							timeout: 2000
						} );
						$scope.query();
						$scope.queryOrgTree();
					}, function() {} );
				};

				// 删除机构
				$scope.delete = function() {
					var ckRows = grid.getChecked();
					// 判断是否选择
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
								var selections = grid.getSelections();
								var orgs = [];
								for( var i = 0; i < selections.length; i++ ) {
									var org = {};
									org.orgid = selections[ i ].orgid;
									orgs.push( org );
								}
								var config = {
									req: {
										method: 'DELETE',
										url: '/xtzc/org/list',
										data: orgs
									},
									cb: function( data ) {
										if( !data.error ) {
											$info.showMessageBox( {
												width: 250,
												title: "系统提示",
												message: "操作成功！",
												type: 'succeed',
												timeout: 2000
											} );
											$scope.data = data.body;
											$scope.query();
											$scope.queryOrgTree();
										}
									}
								};
								Server.reqData( config );
							}
						}
					);
				};

				$scope.selectedBrunch = function( node ) {
					$scope.selectNode = node;
					var config = {
						req: {
							method: 'POST',
							url: '/xtzc/org/page',
							data: {
								queryParams: {
									"pid": node.name
								},
								pageNumber: parseInt( $scope.options.pageNumber ) - 1,
								pageSize: $scope.options.pageSize,
								sort: $scope.options.sort
							}
						},
						cb: function( data ) {
							if( !data.error ) {
								$scope.data = data.body;
							}
						}
					};
					Server.reqData( config );
				};
			}
		);
}() )