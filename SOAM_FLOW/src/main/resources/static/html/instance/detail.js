/**
 * 功能模块：流程查看
 * 描   述：流程查看	建议此处加上随机值，实时刷新：&math=Math.random()
 		【因和eui框架存在冲突，此处所有服务请求都是调用父界面的方法，可参考【editor.html】使用】
 		传参：流程实例id：iid
 			查看模式传参：haveTool	//是否需要左边的工具栏
 * 文件名称：detail.js
 * 创建   人： 周艳平
 * 创建时间： 2016年11月30日10:30:31
 * 修改日志：
 */

( function() {
	eui.loadCtr( "euiController", [ '$scope', '$timeout', '$info', '$filter', '$euiModal', 'Server',
		function( $scope, $timeout, $info, $filter, $euiModal, Server ) {
			//获取参数
			function getAttrStr( name ) {
				var reg = new RegExp( "(^|&)" + name + "=([^&]*)(&|$)" );
				var r = window.location.search.substr( 1 ).match( reg );
				if( r != null ) return unescape( r[ 2 ] );
				return null;
			}

			//获取参数
			window.lcck = {
				iid: getAttrStr( "iid" ),
				haveTool: getAttrStr( "haveTool" )
			};
			var url = ( lcck.iid == null ) ? "" : "/flow/process/page";

			$( "#flowiframe" ).attr( "src", "flow.html?math=" + Math.random() );

			$scope.process = {
				"id": "",
				"iid": "",
				"name": "",
				"type": "",
				"status": "",
				"system": "",
				"start": "",
				"end": "",
				"error_message": ""
			};
			var grid;
			$scope.gd_methods = grid = {};
			$scope.options = {
				columns: [
					[ {
						field: "name",
						title: "节点",
						halign: "center",
						width: 160
					}, {
						field: "type",
						title: "类型",
						halign: "center",
						width: 100
					}, {
						field: "status",
						title: "状态",
						halign: "center",
						width: 80
					}, {
						field: "system",
						title: "系统",
						halign: "center",
						width: 80
					}, {
						field: "start",
						title: "开始时间",
						halign: "center",
						width: 140,
						formatter: function( value, row, index ) {
							return $filter( 'date' )( value, "yyyy-MM-dd hh:mm:ss" );
						}
					}, {
						field: "end",
						title: "结束时间",
						halign: "center",
						width: 140,
						formatter: function( value, row, index ) {
							return $filter( 'date' )( value, "yyyy-MM-dd hh:mm:ss" );
						}
					} ]
				],
				nowrap: false,
				checkbox: false,
				singleSelect: true, //设置选择方式：false 多选；true 单选
				//title: "流程数据列表",
				//toolbar : '#gdTools',
				collapsible: true,
				checkOnSelect: true,
				selectOnCheck: true,
				rownumbers: true,
				striped: true,
				border: true,
				//	           fit : true,
				//	           fitColumns : true,
				remoteSort: false,
				pagination: false,
				method: "post",
				url: url,
				pageNumber: 1,
				pageSize: 10,
				pageList: [ 5, 10, 15 ],
				queryParams: {
					iid: lcck.iid
				}, //在请求远程数据的时候发送额外的参数
				onClickRow: function( index, rowData ) {
					queryYwsj( rowData.id );
				},
				onLoadSuccess: function( result ) {
					if( result && result.data.length > 0 ) {
						queryYwsj( result.data[ 0 ].id );
					}
				}
			};

			/**
			 * 查询业务数据
			 */
			var queryYwsj = function( id ) {
				var config = {
					req: {
						method: 'GET',
						url: '/flow/instance/subjoin/' + id
					},
					showLoadMsg: true,
					cb: function( data ) {
						if( !data.error ) {
							//创建业务数据展示表格
							createYwsj( data.body.data );
						}
					}
				};
				Server.reqData( config );
			};

			/**
			 * 创建业务数据展示表格
			 */
			var createYwsj = function( data ) {
				var ywsjTbl = document.getElementById( "ywsjTbl" );
				ywsjTbl.innerHTML = "";
				if( !data ) return;

				for( var i = 1; i < data.length + 1; i++ ) {
					var td1 = "";

					if( i % 2 == 0 ) {
						td1 = '<td style="text-align: right;width: 20%;" >' + data[ i - 2 ].title + '：</td>\
    				          <td style="width: 30%;" >\
    				              <input value="' + data[ i - 2 ].value + '" readonly="readonly" style="width:100%;\
    				              border: 1px solid #999;background-color: rgb(235, 235, 228);" />\
    				          </td>';
					}

					if( i % 2 == 0 || ( i % 2 == 1 && i == data.length ) ) {
						var td2 = '<td style="text-align: right;width: 20%;" >' + data[ i - 1 ].title + '：</td>\
    					          <td style="width: 30%;" >\
    					              <input value="' + data[ i - 1 ].value + '" readonly="readonly" style="width:100%;\
    					              border: 1px solid #999;background-color: rgb(235, 235, 228);" />\
    					          </td>';

						var tr = document.createElement( "tr" );
						tr.style.height = '32px';
						tr.innerHTML = td1 + td2;
						ywsjTbl.appendChild( tr );
					}
				}
			}

			window.queryFlow = function( url ) {
				var config = {
					req: {
						method: 'GET',
						url: url
					},
					showLoadMsg: true,
					cb: function( data ) {
						if( !data.error ) {
							window.frames[ "flowiframe" ].loadFlow( data.body );
						}
					}
				};
				Server.reqData( config );
			};
		}
	] );
}() );