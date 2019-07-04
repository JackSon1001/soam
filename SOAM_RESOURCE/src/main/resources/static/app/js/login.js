angular.module('app', [])
	.directive('focusMe', function() {
		return {
			link: function(scope, element, attrs) {
				scope.$watch(attrs.focusMe, function(value) {
					if(value === true) {
						element[0].focus();
						scope[attrs.focusMe] = false;
					}
				});
			}
		};
	})
	.controller('LoginController', ['$scope', '$http',
		function($scope, $http) {
			'use strict';
			//配置换肤
			$scope.skins = [{class:"skin1"},{class:"skin2"},{class:"skin3"},{class:"skin4"}];
			$scope.skinChange = function(index){
				$("body").css({
					background:'url(./app/images/login_bg' + index + '.jpg) no-repeat center center'
				})
			};

			/**
			 * 登录
			 */
			$scope.login =  function(){
				if ($scope.yhm === undefined || $scope.yhm== '') {
					//$info.alert('请输入用户名。');
					$scope.yhmfocus = true;
					return;
				}
				//if ($scope.yhm.length < 2) {
				//	$info.alert('用户名至少2个字。');
				//	$scope.yhmfocus = true;
				//	return;
				//}

				if ($scope.yhmm === undefined || $scope.yhmm== '') {
					//$info.alert('请输入登录密码。');
					$scope.yhmmfocus = true;
					return;
				}
			};
			$scope.yhmfocus = true;

			//按下回车
			$scope.enter = function($event){
				//回车事件
				if($event && $event.keyCode==13)
				{
					$scope.login();
				}
			}
		}]);

