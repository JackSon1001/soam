
 
(function(){
	eui.loadCtr('infoController',
		function($scope, $euiModalInstance, $timeout, $info,Server,data) {
			$scope.info = data;
			//关闭窗口
			$scope.cancel = function(){
				$euiModalInstance.dismiss('cancel');
			}
		});
}());
