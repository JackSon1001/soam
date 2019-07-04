/**
 * 功能模块：系统支撑--》soam日志信息查询
 * 文件名称：index_soam.js
 * 创建人：	李程鹏
 */

( function() {
	eui.loadCtr( "euiController", [ '$scope', '$timeout', '$info', '$euiModal', 'Server',
		function( $scope, $timeout, $info, $euiModal, Server ) {
			$scope.entity = {};
			var grid;
			$scope.gd_methods = grid = {};
			var looklog= function( index ) {				
				var rowData = grid.getData().rows[index];
				$scope.view( rowData );
			};
			$scope.options = {
				columns: [
					[ {
							field: "aaaaa",
							title: '操作',
							width: 80,
							halign: 'center',
							formatter: function( value, row , index) {
								return '<a ng-click="formatterFun.ck('+index+')">查看</a>';
							}
						}, {
							field: "id",
							title: "id",
							halign: "center",
							width: 120
						}, {
							field: "service",
							title: "service",
							halign: "center",
							width: 120
						}, {
							field: "instance",
							title: "instance",
							halign: "center",
							width: 120
						}, {
							field: "level",
							title: "level",
							halign: "center",
							width: 120
						}, {
							field: "message",
							title: "message",
							halign: "center",
							width: 250
						}, {
							field: "logger",
							title: "logger",
							halign: "center",
							width: 300
						},{
							field: "thread",
							title: "thread",
							halign: "center",
							width: 120
						}, {
							field: "date",
							title: "date",
							halign: "center",
							width: 120,
							formatter: function( value, row ) {
								var newTime = new Date( value );
								return newTime;
							}
						}

					]
				],
				formatterFun: {
					ck: looklog
				},
				title: "soam日志信息列表",
				nowrap: false,
				toolbar: '#gdTools',
				collapsible: true,
				checkbox: false,
				singleSelect: true,
				checkOnSelect: true,
				selectOnCheck: true,
				rownumbers: true,
				striped: true,
				border: true,
				fit: true,
				fitColumns: true,
				remoteSort: false,
				pagination: true,
				method: "POST",
				url: "/xtzc/log/page", //请求地址
				pageNumber: 1,
				pageSize: 20,
				sort: [ {
					"property": "",
					"direction": ""
				} ],
				pageList: [ 10, 20, 50 ],
				queryParams: $scope.entity, //在请求远程数据的时候发送额外的参数
				onDblClickRow: function( index, rowData ) {
					$scope.view( rowData );
				}
			};
			
			$scope.cbxData = [
                {
                    "id":1,
                    "name":"INFO",
                    "desc":"INFO"
                },{
                    "id":2,
                    "name":"ERROR",
                    "desc":"ERROR"
                },{
                    "id":3,
                    "name":"WARN",
                    "desc":"WARN"
                }
            ];

			// 查询实例
			$scope.query = function() {
				
					$scope.entity.level = $scope.lvlData.name;
				
					var config = {
						req: {
							method: 'POST',
							url: $scope.options.url,
							data: {
								queryParams: $scope.entity,
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
				};

			$scope.open = function() {
				var modalInstance = $euiModal.open( {
					animation: true,
					templateUrl: 'query_soam.htm',
					controller: 'queryController',
					size: 'width:500px',
					title: '查询soam信息',
					resolve: {
						data: function() {
							return $scope.entity;
						}
					}
				} );

				modalInstance.result.then( function( result ) {
					grid.load();
				}, function() {} );
			};

			$scope.view = function( info ) {
				var modalInstance = $euiModal.open( {
					animation: true,
					templateUrl: 'detail_soam.htm',
					controller: 'infoController',
					size: 'width:500px;',
					title: 'soam信息',
					resolve: {
						data: info
					}
				} );

				modalInstance.result.then( function( result ) {
					grid.load();
				}, function() {} );
			};
			
			looklog=$scope.view;
		}
	] );
}() );