/**
 * 功能模块：系统支撑--》业务域管理--》编辑业务域
 * 描  述：编辑业务域控制器
 * 文件名称：detail.js
 * 创建 人： 周艳平
 * 创建时间：2016年10月26日15:06:50
 * 修改日志：
 */
 
(function(){
    eui.loadCtr('editYwyController',
        function($scope, $euiModalInstance, $timeout, $info,Server,data) {    	
    		var url = "/xtzc/ywy";
    		$scope.ywy = {ywid:"", name:"", zt:"", bz:"", pid:0};                        
            $scope.isNotEdit = false;
            $scope.ywyztValue = {};
            $scope.ywyztData = Constants.ZT.getDataList();
            
            if(data.type == 'add'){
            	$scope.ywy.pid = data.pid;            	
            	$scope.ywy.zt = Constants.ZT.YX+"";//默认有效
            	$scope.ywyztData[0].selected = true;
            }else{
                angular.copy(data.row, $scope.ywy);
            	$scope.ywy.zt = $scope.ywy.zt+"";            	
            	url = "/xtzc/ywy/"+$scope.ywy.ywyid;
            	
            	if($scope.ywy.zt == Constants.ZT.YX || $scope.ywy.zt == Constants.ZT.YX+""){;//默认有效
	        		$scope.ywyztData[0].selected = true;
	        		$scope.ywyztData[1].selected = false;
	        	}else{
	        		$scope.ywyztData[0].selected = false;
	        		$scope.ywyztData[1].selected = true;
	        	}
            }
            
            if(data.type == 'query'){
                $scope.isNotEdit = true;
            }

            /**
             * 确定
             */
            $scope.ok = function () {
                var data = $scope.ywy;
                data.zt = parseInt($scope.ywyztValue.id);
                data.pid = parseInt(data.pid);
                
                var data2 = {xtzc_ywy:data};
                
                //请求服务
                var config = {
                    req:{
                        method: 'POST',
                        url:url,
                        data: data2
                    },
                    showLoadMsg:true,
                    cb: function (data) {
                        if(!data.error){
                        	$info.showMessageBox({
        	                    width: 250,
        	                    title: "系统提示",
        	                    message: "保存成功。",
        	                    timeout: 1000,
        	                    type: 'succeed'
        	                });
                        	$euiModalInstance.close($scope.ywy);
                        }
                    }
                };
                Server.reqData(config);
            };
                        
            //关闭窗口
            $scope.cancel = function(){
            	$euiModalInstance.dismiss('cancel');
            }
        });
}());
