angular.module('app', ['eui','util','eui.window'])
	.controller('MainController', ['$scope', '$http','Server','$info','$sce','$rootScope',
		function($scope, $http, Server, $info, $sce, $rootScope) {
			'use strict';
			var soamMenus = eui.appData.soamMenus;
			var softwareName = 'SOA监控系统';
			var orgin = "http://123.207.3.51:8086";
			var  browsingHistory = [];
			var slides = $scope.slides = [];
			$scope.addSlide = function() {
				$scope.slides = [
					{template: './app/template/main/map.html'},
					{template: './app/template/main/function.html'},
					{template: './app/template/main/statistics.html'}
				];
			};
			$scope.addSlide();

			$scope.isShow = true;
			$scope.customList = [2,3,4,5,6,7];
			$scope.boxHeight = 370;

			$scope.items = [
				{
					imageClass:"myTodo",
					mesAmount: 5,
					menusText:'我的待办',
					onClick:function(){
						alert("浏览记录");
					}
				},
				{
					imageClass:"myMessage",
					mesAmount: 3,
					menusText:'我的消息',
					onClick:function(){
						alert("浏览记录");
					}
				},
				{
					imageClass:"browsHistory",
					menusText:'浏览记录',
					onClick:function(){
						var string = "";
						for(var i = 0; i < browsingHistory.length; i++){
							string = string + browsingHistory[i].name + " "  + browsingHistory[i].date + "\n"
						}
						alert(string);
					}
				}
			];

			//用户退出
			$scope.logout = function(){
				var origin = window.location.origin;
				window.location.href= origin + "/logout";
			};

			//用户信息设置
			$scope.setInfo = function(){
				alert("setInfo");
			};


			/*-----------------------------打开window对话-----------------------------------------------*/
			$scope.loaded = [];
			//点击模块，加载相应对话框
			$scope.loadDialog = function (menu) {
				var isLoad = false;
				var date = new Date();
				if($scope.currModal === menu.id){
					return;
				}

				for(var i=0; i< $scope.loaded.length; i++) {
					if($scope.loaded[i].id === menu.id) {
						isLoad = true;
						if($scope.currModal){
							$rootScope.$broadcast($scope.currModal);
						}
						$rootScope.$broadcast(menu.id);
						$scope.currModal = menu.id;
						break;
					}
				}
				if (!isLoad) {
					if($scope.currModal){
						$rootScope.$broadcast($scope.currModal);
					}
					$scope.currModal = menu.id;
					$scope.loaded.push({template: menu.path, id: menu.id, path: $scope.currModal,icon: menu.icon, name:menu.name});
					browsingHistory.push({id: menu.id,name:menu.name,date:date.toLocaleDateString() + date.toLocaleTimeString()})
				}
			};

			$scope.$on('EVENT_PANEL_WINDOW.close', function(evt, modInfo) {
				$scope.currModal = "";
				if(modInfo && modInfo.operate === "close"){
					for(var i=0; i< $scope.loaded.length; i++) {
						if(modInfo && modInfo.id){
							if($scope.loaded[i].id === modInfo.id) {
								$scope.loaded.splice(i, 1);
							}
						}
					}
				}
			});

			$scope.activeWindow = function($event, id, operate) {
				$event.stopPropagation();
				if(operate === 'min'){
					$rootScope.$broadcast(id);
					if($scope.currModal !== id){
						$rootScope.$broadcast($scope.currModal);
						$scope.currModal = id;
					} else {
						$scope.currModal = "";
					}
				} else if(operate === 'close'){
					for(var i=0; i< $scope.loaded.length; i++) {
						if($scope.loaded[i].id === id) {
							$scope.loaded.splice(i, 1);
						}
					}
				}
			};

			$scope.showMainPage = function(){
				if($scope.currModal){
					$rootScope.$broadcast($scope.currModal);
					$scope.currModal = "";
				}
			};

			//主界面url配置
			var mainUrls = {
				statisticUrls:[
					"/chart/html/chart/cgl.html",
					"/chart/html/chart/sbl.html",
					"/chart/html/chart/cgltj.html",
					"/chart/html/chart/cwxttj.html"
				],
				mapUrl:"/chart/html/map/1.html"
			};

			//统计界面url配置
			$scope.statisticUrls = [];
			for(var i = 0; i < mainUrls.statisticUrls.length; i++){
				$scope.statisticUrls.push({url:$sce.trustAsResourceUrl(orgin + mainUrls.statisticUrls[i])})
			}

			//map地图界面url配置
			$scope.mapUrl = $sce.trustAsResourceUrl(orgin + mainUrls.mapUrl);

			var req = {
				method: "GET",
				url: "xtzc/index.json"
			};

			$http(req).
			success(function(response) {
				var id,name;
				//设置用户信息
				$scope.orgName = response.body.user.orgName;
				$scope.yhm = response.body.user.yhm;
				//设置模块的权限
				var modules = response.body.permission.modules;
				var modals = [];
				for(var i = 0; i < modules.length; i++){
					id = modules[i].id;
					name = id + "Options";
					if(soamMenus[id]){
						//配置一级菜单
						soamMenus[id].id = id;
						modals.push(soamMenus[id]);
						//配置二级菜单
						$scope[name]={
							modData:modules[i].menus,
							modInfo: {
								"id":id,
								"softwareName":softwareName,
								"modName":soamMenus[id].name,
								"modIcon":"soam-icon-" + id + "-wTitle"
							}
						};
						if($scope[name].modData[0] && $scope[name].modData[0].url){
							$scope[name].templateUrl = $sce.trustAsResourceUrl($scope[name].modData[0].url);
						}
					}
				}
				$scope.modals = modals;

				//设置书签模块的权限
				var bookMarks = response.body.bookmarks;
				var bookMarksList = [];
				for(var i = 0; i < bookMarks.length; i++){
					id = modules[i].id;
					if(soamMenus[id]){
						//配置一级菜单
						soamMenus[id].id = id;
						bookMarksList.push(soamMenus[id]);
					}
				}
				$scope.bookMarksList = bookMarksList;
			}).
			error(function (response, status) {
				$info.alert(response);
			});
		}]);

