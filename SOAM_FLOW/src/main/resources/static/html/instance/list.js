( function() {
	eui.module( 'app', [ 'eui', 'util' ] )
		.controller( 'euiController',
			function( $scope, $info, $euiModal, Server, $filter ) {
				var grid, config;
				$scope.gd_methods = grid = {};
				$scope.xtData = Constants.CSG_SYSTEM.getDataList();
				$scope.ztData = Constants.FLOW.INSTANCE_STATUS.getDataList();

				$scope.infoParam = {
					"dqxt": '',
					"dqzt": '',
					"ssdw": '',
					"gdh": '',
					'ywid': ''
				};
				var orgSelectBranch;
				var ywySelectBranch;
				$scope.xtValue = {};
				$scope.ztValue = {};
				$scope.orgNodeTree = [];
				$scope.ywyNodeTree = [];
				$scope.my_tree = {};
				$scope.title = "测试测试";
				//绑定机构树单击事件
				$scope.orgSelectedBrunch = function( branch ) {
					orgSelectBranch = branch;
				};
				//绑定业务域树点击事件
				$scope.ywySelectedBrunch = function( branch ) {
					ywySelectBranch = branch;
					$scope.query();
				};
				//查询机构树
				$scope.queryOrgTree = function() {
					var config = {
						req: {
							method: 'GET',
							url: "/flow/instance/orgTree"
						},
						cb: function( data ) {
							if( !data.error ) {
								$scope.orgNodeTree = data.body;
							}
						}
					};
					Server.reqData( config );

				}
				$scope.queryOrgTree();

				//查询业务域树
				$scope.queryYwyTree = function() {
					var config = {
						req: {
							method: 'POST',
							url: "/flow/instance/ywyTree",
							data: {
								'zt': Constants.ZT.YX
							}
						},
						cb: function( data ) {
							if( !data.error ) {
								$scope.ywyNodeTree = data.body;
							}
						}
					};
					Server.reqData( config );

				}
				$scope.queryYwyTree();
				var lookFlow = function( value ) {
					//alert(value);
					//                  var modalInstance = $euiModal.open({
					//                      animation: true,
					//                      templateUrl: 'insList.html',
					//                      controller: 'euiController',
					//                      size : 'width:550px',
					//                      title : '修改用户信息',
					//                      resolve: {
					//                          data: function () {
					//                              //return {type:'edit',index:idx, row:row};
					//                          }
					//                      }
					//                  });
					//                  modalInstance.result.then(function (result) {
					//                      
					//                      $scope.query();
					//                  }, function () {
					//                  });
				};

				$scope.options = {
					columns: [
						[ {
							field: "id",
							title: "操作",
							halign: "center",
							width: 100,
							formatter: function( value, row ) {
								return '<eui-button icon-cls="eui-icon-copy" ng-click="formatterFun.lookFlow1(' + value + ')">查看流程</eui-button>';
							}
						}, {
							field: "gdh",
							title: "工单号",
							halign: "center",
							width: 120
						}, {
							field: "description",
							title: "工单说明",
							halign: "center",
							width: 120
						}, {
							field: "ssdw",
							title: "所属单位",
							halign: "center",
							width: 80
						}, {
							field: "dqhj",
							title: "当前环节",
							halign: "center",
							width: 80
						}, {
							field: "dqxt",
							title: "当前系统",
							halign: "center",
							width: 80,
							formatter: function( value, row ) {
								for( var index in $scope.xtData ) {
									if( $scope.xtData[ index ].id == value )
										return $scope.xtData[ index ].name;
								}
								return value;
							}

						}, {
							field: "dqzt",
							title: "当前状态",
							halign: "center",
							width: 40,
							formatter: function( value, row ) {
								if( value == Constants.FLOW.INSTANCE_STATUS.ZC ) {
									return "正常";
								}
								else if( value == Constants.FLOW.INSTANCE_STATUS.YC ) {
									return "异常";
								}
								else if( value == Constants.FLOW.INSTANCE_STATUS.GQ ) {
									return "挂起";
								}
								return value;
							}
						}, {
							field: "cjsj",
							title: "工单创建时间",
							halign: "center",
							width: 80,
							formatter: function( value, row ) {
								return $filter( 'date' )( value, 'yyyy-MM-dd' );
							}
						} ]
					],
					formatterFun: {
						lookFlow1: lookFlow
					},
					nowrap: false,
					title: "实例信息",
					collapsible: true,
					singleSelect: false,
					checkOnSelect: true,
					selectOnCheck: true,
					rownumbers: true,
					striped: true,
					border: true,
					fit: true,
					method: "post",
					url: "/flow/instance/page",
					fitColumns: true,
					remoteSort: false,
					onSortColumn: function( sort, order ) {},
					checkbox: false, // 如果为true，则显示复选框
					pagination: true,
					pageNumber: 1,
					pageSize: 10,
					pageList: [ 10, 25, 50 ],
					queryParams: $scope.infoParam, // 在请求远程数据的时候发送额外的参数
					sort: [],
					onDblClickRow: function( rowIndex, rowData ) {
						$scope.lookFlow( rowData.id );
					},
					onLoadError: function( data ) {
						JSON.stringify( data, true );
					}
				};
				// 查询实例
				$scope.query = function() {
						$scope.infoParam.dqxt = $scope.xtValue.id;
						$scope.infoParam.dqzt = $scope.ztValue.id;
						if( orgSelectBranch ) {
							$scope.infoParam.ssdw = orgSelectBranch.name;
						}
						if( ywySelectBranch ) {
							$scope.infoParam.ywid = ywySelectBranch.name;
						}
						var config = {
							req: {
								method: 'POST',
								url: $scope.options.url,
								data: {
									queryParams: $scope.infoParam,
									pageNumber: 0,
									pageSize: $scope.options.pageSize,
									sort: $scope.options.sort
								}
							},
							cb: function( data ) {
								if( !data.error ) {
									$scope.data = data.body;
									$scope.countInsNumber();
								}
							},
							showLoadMsg: true
						};

						Server.reqData( config );
					}
					//统计数量
				$scope.countInsNumber = function() {
					$scope.infoParam.dqxt = $scope.xtValue.id;
					$scope.infoParam.dqzt = $scope.ztValue.id;
					if( orgSelectBranch ) {
						$scope.infoParam.ssdw = orgSelectBranch.name;
					}
					if( ywySelectBranch ) {
						$scope.infoParam.ywid = ywySelectBranch.name;
					}
					var config = {
						req: {
							method: 'POST',
							url: '/flow/instance/count',
							data: $scope.infoParam
						},
						cb: function( data ) {
							if( !data.error ) {
								var tDiv = $( "div.panel-title" )[ 0 ];
								var str = '实例信息&nbsp;&nbsp;&nbsp;' + '正常：&nbsp;' +
									data.body.zc +
									'&nbsp;&nbsp;&nbsp;&nbsp;异常：&nbsp;' +
									data.body.yc + '&nbsp;&nbsp;&nbsp;&nbsp;挂起：&nbsp;' + data.body.gq;
								tDiv.innerHTML = str;

								//alert();
							}
						}
					};
					Server.reqData( config );
				}
				$scope.countInsNumber();

				// 查询流程实例信息
				$scope.lookFlow = lookFlow;
			}
		);
}() )