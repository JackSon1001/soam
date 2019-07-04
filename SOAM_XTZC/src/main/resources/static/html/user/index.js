( function() {
	eui.module( 'app', [ 'eui', 'util' ] )
		.controller( 'euiController',
			function( $scope, $timeout, $info, $euiModal, Server ) {
				//alert($.md5('12347777777777777777777777777'));
				var grid, config;
				$scope.gd_methods = grid = {};
				$scope.userParam = {
					"ryxm": ''
				};
				$scope.options = {
					columns: [
						[ {
							field: "ryxm",
							title: "人员姓名",
							halign: "center",
							width: 380
						}, {
							field: "orgid",
							title: "所属机构",
							halign: "center",
							width: 220
						}, {
							field: "rygh",
							title: "人员工号",
							halign: "center",
							width: 180
						}, {
							field: "yhm",
							title: "登录名",
							halign: "center",
							width: 180
						}, {
							field: "zt",
							title: "状态",
							halign: "center",
							width: 100,
							formatter: function( value, row ) {
								if( value == Constants.USER.ZT.WX ) {
									return "无效";
								}
								else if( value == Constants.USER.ZT.SD ) {
									return "锁定";
								}
								else if( value == Constants.USER.ZT.ZX ) {
									return "注销";
								}
								else if( value == Constants.USER.ZT.YX ) {
									return "有效";
								}
								return value;
							}
						} ]
					],
					nowrap: false,
					title: "用户信息列表",
					toolbar: '#gdTools',
					collapsible: true,
					singleSelect: false,
					checkOnSelect: true,
					selectOnCheck: true,
					rownumbers: true,
					striped: true,
					border: true,
					fit: false,
					method: "post",
					url: "/xtzc/user/page",
					fitColumns: false,
					remoteSort: false,
					onSortColumn: function( sort, order ) {},
					checkbox: true, // 如果为true，则显示复选框
					pagination: true,
					pageNumber: 1,
					pageSize: 20,
					pageList: [ 20, 50, 100 ],
					queryParams: $scope.userParam, // 在请求远程数据的时候发送额外的参数
					sort: [],
					onDblClickRow: function( rowIndex, rowData ) {
						$scope.update( rowData );
					},
					onLoadError: function( data ) {
						JSON.stringify( data, true );
					},
					showLoadMsg: true
				};

				// 新增用户
				$scope.add = function() {
						var modalInstance = $euiModal.open( {
							animation: true,
							templateUrl: 'detail.htm',
							controller: 'editUserController',
							size: 'width:420px',
							title: '新增用户信息',
							resolve: {
								data: function() {
									return {
										type: 'add'
									};
								}
							}
						} );
						modalInstance.result.then( function() {

							$scope.query();
						}, function() {} );

					}
					// 查询用户
				$scope.query = function() {
					var config = {
						req: {
							method: 'POST',
							url: $scope.options.url,
							data: {
								queryParams: $scope.userParam,
								pageNumber: 0,
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

				// 修改用户
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
						controller: 'editUserController',
						size: 'width:420px',
						title: '修改用户信息',
						resolve: {
							data: function() {
								return {
									type: 'edit',
									index: idx,
									row: data
								};
							}
						}
					} );
					modalInstance.result.then( function( result ) {

						$scope.query();
					}, function() {} );
				};

				// 删除用户
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
								var users = [];
								for( var i = 0; i < selections.length; i++ ) {
									var user = {};
									user.userid = selections[ i ].userid;
									users.push( user );
								}
								var config = {
									req: {
										method: 'DELETE',
										url: '/xtzc/user/list',
										data: users
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
										}
									}
								};
								Server.reqData( config );
							}
						}
					);
				};
			}
		);
}() )