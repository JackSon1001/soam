( function() {
	eui.module( 'app' ).controller( 'chooseOrgController',
		function( $scope, $euiModalInstance, $info, Server, data ) {
			$scope.nodeTree = [];
			$scope.my_tree = {};
			var selectBranch;
			$scope.queryOrgTree = function() {
				var config = {
					req: {
						method: 'GET',
						url: "/xtzc/org/tree/1"
					},
					cb: function( data ) {
						if( !data.error ) {
							$scope.nodeTree = data.body;
						}
					}
				};
				Server.reqData( config );

			}
			$scope.dbclickTree = function( node ) {
				selectBranch = node;
				$euiModalInstance.close( selectBranch );
			};
			$scope.selectedNode = function( node ) {
				selectBranch = node;
			};
			$scope.clickTree = function( node ) {
				selectBranch = node;
			};
			$scope.queryOrgTree();
			$scope.ok = function() {
				$euiModalInstance.close( selectBranch );
			};
			// 关闭窗口
			$scope.cancel = function() {
				$euiModalInstance.dismiss( 'cancel' );
			}
		} );
}() )