/**
 * 功能模块：系统支撑--》请求日志信息查询
 * 文件名称：index.js
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
							width: 40
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
							field: "host",
							title: "host",
							halign: "center",
							width: 120
						}, {
							field: "connection",
							title: "connection",
							halign: "center",
							width: 120
						}, {
							field: "accept",
							title: "accept",
							halign: "center",
							width: 120
						},
						/*{ field: "userAgent", title: "userAgent", halign: "center", width: 120 },*/
						{
							field: "referer",
							title: "referer",
							halign: "center",
							width: 120
						}, {
							field: "acceptEncoding",
							title: "acceptEncoding",
							halign: "center",
							width: 120
						}, {
							field: "acceptLanguage",
							title: "acceptLanguage",
							halign: "center",
							width: 120
						}, {
							field: "method",
							title: "method",
							halign: "center",
							width: 120
						}, {
							field: "url",
							title: "url",
							halign: "center",
							width: 120
						}, {
							field: "uri",
							title: "uri",
							halign: "center",
							width: 120
						}, {
							field: "contextPath",
							title: "contextPath",
							halign: "center",
							width: 120
						}, {
							field: "servletPath",
							title: "servletPath",
							halign: "center",
							width: 120
						}, {
							field: "localPort",
							title: "localPort",
							halign: "center",
							width: 120
						}, {
							field: "localAddr",
							title: "localAddr",
							halign: "center",
							width: 120
						}, {
							field: "localName",
							title: "localName",
							halign: "center",
							width: 120
						}, {
							field: "remoteAddr",
							title: "remoteAddr",
							halign: "center",
							width: 120
						}, {
							field: "remoteHost",
							title: "remoteHost",
							halign: "center",
							width: 120
						}, {
							field: "scheme",
							title: "scheme",
							halign: "center",
							width: 120
						}, {
							field: "secure",
							title: "secure",
							halign: "center",
							width: 120
						}, {
							field: "serverName",
							title: "serverName",
							halign: "center",
							width: 120
						}, {
							field: "serverPort",
							title: "serverPort",
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
				title: "请求日志信息列表",
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
				url: "/xtzc/request/page", //请求地址
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

			//		var test = function (){
			//			var config = {
			//				req:{
			//				    method: 'POST',
			//				    url:'/xtzc/request/page',
			//				    data: {}
			//				},
			//				showLoadMsg:true,
			//	            cb: function (data) {
			//	            	if(!data.error){
			//	            		$info.alert("测试跨系统调用服务，统计日志数量："+data.body);          	
			//	                }
			//	            }
			//	        };
			//	        Server.reqData(config);
			//		}
			//		test();

			//        $scope.resize = function(){
			//            grid.resize({
			//                width:"850px",
			//                height:"400px"
			//            });
			//        }
			
			$scope.cbxData = [
                {
                    "id":1,
                    "name":"",
                    "desc":""
                },{
                    "id":2,
                    "name":"POST",
                    "desc":"POST"
                },{
                    "id":3,
                    "name":"GET",
                    "desc":"GET"
                }
            ];
			
			// 查询实例
			$scope.query = function() {
				
				$scope.entity.method = $scope.metData.name;
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
					templateUrl: 'query.htm',
					controller: 'queryController',
					size: 'width:500px',
					title: '查询HTTP请求信息',
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
					templateUrl: 'detail.htm',
					controller: 'infoController',
					size: 'width:500px;',
					title: 'HTTP请求信息',
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