/**
 * 功能模块：系统支撑--》流程模板管理--》编辑流程模板
 * 描  述：编辑流程模板控制器
 * 文件名称：editLcmb.js
 * 创建 人： 周艳平
 * 创建时间：2016年10月26日15:06:50
 * 修改日志：
 */
 
(function(){
    eui.loadCtr('editLcmbController',
        function($scope, $euiModalInstance, $timeout, $info,Server,data) {
    		var url = "/flow/template";
    		$scope.tmp_info = {id:"", ywid:"", name:"", description:"", cjr:"", cjsj:"", xgsj:""};
            
            if(data.type == 'add'){
            	$scope.tmp_info.ywid = data.ywid;
            }else{
                angular.copy(data, $scope.tmp_info);         	
            	url = "/flow/template/"+$scope.tmp_info.id;            	
            }
            
            if(data.type == 'query'){
                $scope.isNotEdit = true;
            }

            $scope.ok = function () {
                var data = $scope.tmp_info;
                data.ywid = parseInt(data.ywid);
                
                //请求服务
                var config = {
                    req:{
                        method: 'POST',
                        url:url,
                        data: data
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
                        	$euiModalInstance.close($scope.tmp_info);
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
