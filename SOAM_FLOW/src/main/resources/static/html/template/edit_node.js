/**
 * 功能模块：系统支撑--》流程模板管理--》编辑流程模板--》编辑节点
 * 描  述：编辑节点控制器
 * 文件名称：editNode.js
 * 创建 人： 周艳平
 * 创建时间：2016年11月8日11:18:13
 * 修改日志：
 */

( function() {
	eui.loadCtr( 'editNodeController',
		function( $scope, $euiModalInstance, $timeout, $info, Server, data ) {
			var url = "/flow/template";
			$scope.node = data;
			$scope.isNotEdit = data.nodeIsEdit;

			if( data.type == 'query' ) {
				$scope.isNotEdit = true;
			}

			$scope.ok = function() {
				var data = $scope.node;
				data.ywid = parseInt( data.ywid );

				//请求服务
				var config = {
					req: {
						method: 'POST',
						url: url,
						data: data
					},
					showLoadMsg: true,
					cb: function( data ) {
						if( !data.error ) {
							$info.showMessageBox( {
								width: 250,
								title: "系统提示",
								message: "保存成功。",
								timeout: 1000,
								type: 'succeed'
							} );
							$euiModalInstance.close( $scope.node );
						}
					}
				};
				Server.reqData( config );
			};

			//关闭窗口
			$scope.cancel = function() {
				$euiModalInstance.dismiss( 'cancel' );
			}
		} );
}() );