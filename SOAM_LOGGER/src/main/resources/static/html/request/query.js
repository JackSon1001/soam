/**
 * 功能模块：日志管理--》请求信息查询
 * 描述：	请求信息查询界面
 * 文件名称：query.js
 * 创建人：	张磊
 * 创建时间：2016年11月9日
 * 修改日志：
 */
 
(function(){
	eui.loadCtr('queryController',
		function($scope, $modalInstance, $euiModalInstance, $timeout, $info,Server,data) {
			$scope.data = data;
			$scope.ok = function () {
				for(var value in $scope.data){
					if($scope.data[value] === "") $scope.data[value] = undefined;
				}
				$euiModalInstance.close( $scope.data );
			};
			
			//关闭窗口
			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
			}
		});
}());
