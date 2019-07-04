/**
 * 功能模块：日志管理--》请求信息查询
 * 描述：	请求信息查询界面
 * 文件名称：list.js
 * 创建人：	张磊
 * 创建时间：2016年11月9日
 * 修改日志：
 */
 
(function (){ eui.loadCtr("euiController", ['$scope','$timeout', '$info','$euiModal','Server', 
	function ($scope, $timeout,$info,$euiModal,Server) {
		$scope.entity = {};
		var grid;
		$scope.gd_methods = grid = {};
		$scope.options = {
			columns: [[
				{
				    field: "aaaaa",
				    title : '操作',
				    width : 120,
				    halign : 'center',
				    formatter:function(value,row){
				        return '<a href="javascript:onDblClickRow()">查看</a>';
				    }
				},
				{ field: "id", title: "id", halign: "center", width: 120 },
				{ field: "service", title: "service", halign: "center", width: 120 },
				{ field: "instance", title: "instance", halign: "center", width: 120 },
				{ field: "host", title: "host", halign: "center", width: 120 },
				{ field: "connection", title: "connection", halign: "center", width: 120 },
				{ field: "accept", title: "accept", halign: "center", width: 120 },
				/*{ field: "userAgent", title: "userAgent", halign: "center", width: 120 },*/
				{ field: "referer", title: "referer", halign: "center", width: 120 },
				{ field: "acceptEncoding", title: "acceptEncoding", halign: "center", width: 120 },
				{ field: "acceptLanguage", title: "acceptLanguage", halign: "center", width: 120 },
				{ field: "method", title: "method", halign: "center", width: 120 },
				{ field: "url", title: "url", halign: "center", width: 120 },
				{ field: "uri", title: "uri", halign: "center", width: 120 },
				{ field: "contextPath", title: "contextPath", halign: "center", width: 120 },
				{ field: "servletPath", title: "servletPath", halign: "center", width: 120 },
				{ field: "localPort", title: "localPort", halign: "center", width: 120 },
				{ field: "localAddr", title: "localAddr", halign: "center", width: 120 },
				{ field: "localName", title: "localName", halign: "center", width: 120 },
				{ field: "remoteAddr", title: "remoteAddr", halign: "center", width: 120 },
				{ field: "remoteHost", title: "remoteHost", halign: "center", width: 120 },
				{ field: "scheme", title: "scheme", halign: "center", width: 120 },
				{ field: "secure", title: "secure", halign: "center", width: 120 },
				{ field: "serverName", title: "serverName", halign: "center", width: 120 },
				{ field: "serverPort", title: "serverPort", halign: "center", width: 120 },
				{ field: "date", title: "date", halign: "center", width: 120 }
			]],
			title: "HTTP请求信息列表",
			nowrap : false,
			toolbar : '#gdTools',
			collapsible : true,
			checkbox: false,
			singleSelect : true,
			checkOnSelect : true,
			selectOnCheck : true,
			rownumbers : true,
			striped : true,
			border : true,
			fit : true,
			fitColumns : true,
			remoteSort : false,
			pagination : true,
			method: "post",
			url:"/logger/request/page",
			pageNumber : 1,
			pageSize: 20,
			sort: [
				{ "property": "date", "direction": "desc" }
			],
			pageList : [ 20, 50, 10 ],
			queryParams: $scope.entity, //在请求远程数据的时候发送额外的参数
			onDblClickRow : function( rowIndex, rowData ) {
				$scope.view( rowData );
			}
		};
		
		$scope.open = function(){
			var modalInstance = $euiModal.open({
				animation: true,
				templateUrl: 'query.htm',
				controller: 'queryController',
				size : 'width:500px',
				title : '查询HTTP请求信息',
				resolve: {
					data: function () {
						return $scope.entity;
					}
				}
			});

			modalInstance.result.then( function( result ) {
				grid.load();
			}, function () { });
		};
		
		/*$scope.view = function( info ){
			var modalInstance = $euiModal.open({
				animation: true,
				templateUrl: 'info.htm',
				controller: 'infoController',
				size : 'width:500px;',
				title : 'HTTP请求信息',
				resolve: {
					data: info
				}
			});

			modalInstance.result.then( function( result ) {
				grid.load();
			}, function () { });
		};*/
	}]);
}());

