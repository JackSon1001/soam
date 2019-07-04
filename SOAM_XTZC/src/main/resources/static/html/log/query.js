( function() {
	eui.loadCtr( 'queryController',
		function( $scope, $euiModalInstance, $timeout, $info, Server, data ) {
			$scope.data = data;
			$scope.ok = function() {
				for( var value in $scope.data ) {
					if( $scope.data[ value ] === "" ) $scope.data[ value ] = undefined;
				}
				$euiModalInstance.close( $scope.data );
			};

			//关闭窗口
			$scope.cancel = function() {
				$euiModalInstance.dismiss( 'cancel' );
			}
		} );
}() );