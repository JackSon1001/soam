( function() {
	eui.module( 'app' ).controller( 'editOrgController',
		function( $scope, $euiModalInstance, $info, Server, data ) {
			$scope.ztData = Constants.ZT.getDataList();
			$scope.ztValue = {};
			$scope.parentOrg = data.parentOrg;
			var method = 'POST';
			$scope.isNotEdit = false;
			$scope.org = {
				"orgid": '',
				"pid": null,
				"jgmc": '',
				"jgjc": '',
				"zt": '',
				"bz": ''
			};
			var resource = "/xtzc/org/";
			if( data.type != 'add' ) {
				method = 'PUT';
				resource = "/xtzc/org/" + data.row.orgid;
				angular.copy( data.row, $scope.org );
				$scope.index = data.index;

				for( var index in $scope.ztData ) {
					if( $scope.ztData[ index ].id == $scope.org.zt ) {
						$scope.ztData[ index ].selected = true;
					}
					else {
						$scope.ztData[ index ].selected = false;
					}
				}
			}
			else {
				if( $scope.parentOrg ) {
					$scope.org.pid = $scope.parentOrg.name;
				}
				if( $scope.ztData && $scope.ztData.length > 0 ) {
					$scope.ztData[ 0 ].selected = true;
				}
			}
			if( data.type == 'query' ) {
				$scope.isNotEdit = true;
			}

			$scope.ok = function() {
				$scope.org.zt = parseInt( $scope.ztValue.id );

				var data = $scope.org
					// 请求服务
				var config = {
					req: {
						method: method,
						url: resource,
						data: data
					},
					cb: function( data ) {
						if( !data.error ) {
							$euiModalInstance.close( $scope.org );
						}
					}
				};
				Server.reqData( config );
			};
			// 关闭窗口
			$scope.cancel = function() {
				$euiModalInstance.dismiss( 'cancel' );
			}
		} );
}() )