/**
 * html5 文件上传测试程序
 * 1. 前端发送大文件请求=》后端
 * 2. 后端产生切片设置文件及参数上载线程数=》前端
 * 3. 前端根据上载线程数循环产生切片上传请求=》后端
 * 4. 后端保存文件切片，更新切片设置文件，如果完成则合并为大文件，发送回应=》前端
 * 5. 前端查看切片设置文件如果有未发送的增加切片上传请求=》后端
 *
 * 切片设置文件：{	sha1: '用于校验文件防止2次上传不一致',
 * 							sliceSize: '单片大小',
 * 							sliceList(切片数组): [0:未开始; 1:已发送; 2:已收到]
 * 						 }
 */

'use strict';

angular.module('test.FileUploadTest', [ 'catServices', 'ui.bootstrap' ])

	.controller(
	'FileUploadController',
	[
		'$scope',
		'$document',
		'$element',
		'$timeout',
		function($scope, $document, $element, $timeout) {

			$scope.files = [];
			var fileInput = $element.find('input[type="file"]');
			var _util = CatUtil();
			var sliceConfig = null;

			//function convSize(file) {
			//	var fileSizeC = 0;
			//	if (file.size > 1024 * 1024) {
			//		fileSizeC = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			//	} else {
			//		fileSizeC = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
			//	}
			//	return fileSizeC;
			//}

			fileInput.bind('change', function(e) {
				for(var i=0; i<e.target.files.length; i++) {
					var file = e.target.files[i];
					if (file) {
						var fileSizeC = _util.formatCapacity(file.size);
						if (typeof file == 'object') {
							$scope.files.push({fileObj: file, fileName: file.name, fileSize: file.size, fileSizeC: fileSizeC, percentComplete: 0});
						}
					}
				}
				$scope.$apply();
			});

			function processSlice(i, file) {
				sliceConfig.sliceList[i] = 1;
				var packet = file.fileObj.slice(i * sliceConfig.sliceSize, (i + 1) * sliceConfig.sliceSize);
				packet['name'] = file.fileName + '_index' + i;
				var fileSizeC = _util.formatCapacity(packet.size);
				var slice = {
					fileObj: packet, fileName: packet.name, primaryName: file.fileName, fileSize: packet.size,
					fileSizeC: fileSizeC, percentComplete: 0, index: i
				};
				$scope.files.push(slice);
				uploadFileSlice(slice);
			}

			function uploadFileSlice(file) {
				var xhr = new XMLHttpRequest();
				var fd = new FormData();
				fd.append("fileName", file.fileName);
				if (file.sliceRequest) {
					fd.append("sliceRequest", true);
					fd.append("fileSize", file.fileSize);
				} else {
					if (file.primaryName) {
						fd.append("primaryName", file.primaryName);
					}
					if (file.index != undefined) {
						fd.append("index", file.index);
					}
					fd.append("fileToUpload", file.fileObj);

					/* event listners */
					xhr.upload.addEventListener("progress", function (evt) {
						$timeout(function () {
							if (evt.lengthComputable) {
								file.percentComplete = Math.round(evt.loaded * 100 / evt.total);
								console.log('uploadProgress, percentComplete=' + file.percentComplete);
								//document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
							}
							else {
								console.log('unable to compute');
							}
						})
					}, false);
				}

				xhr.addEventListener("load", function (evt) {
					/* This event is raised when the server send back a response */
					console.log('uploadComplete: ' + evt.target.responseText);
					// 前端根据上载线程数循环产生切片上传请求=》后端
					var iPool = 0;
					var rep = JSON.parse(evt.target.response);
					if (rep.sliceConfig) {
						sliceConfig = rep.sliceConfig;
						for (var i = 0; i < sliceConfig.sliceList.length; i++) {
							if (sliceConfig.sliceList[i] !== 2) {
								processSlice(i, file);
								iPool = iPool + 1;
								if (iPool >= rep.poolSize) {
									break;
								}
							}
						}
					} else if (file.index != undefined) {
						// 前端查看切片设置文件如果有未发送的增加切片上传请求=》后端
						sliceConfig.sliceList[rep.index] = 2;
						var finish = 0;
						for (var i = 0; i < sliceConfig.sliceList.length; i++) {
							if (sliceConfig.sliceList[i] === 2) {
								finish = finish + 1;
							} else if (sliceConfig.sliceList[i] === 0) {
								for (var j = 0; j < $scope.files.length; i++) {
									if ($scope.files[j].fileName === rep.primaryName) {
										processSlice(i, $scope.files[j]);
										
										break;
									}
								}
							}
						}

						$timeout(function () {
							for (var i = 0; i < $scope.files.length; i++) {
								if ($scope.files[i].fileName === rep.primaryName) {
									$scope.files[i].percentComplete = Math.round(finish * 100 / sliceConfig.sliceList.length);
									console.log('primaryName uploadProgress, percentComplete=' + $scope.files[i].percentComplete);
								}
							}
						})
					}
				}, false);
				xhr.addEventListener("error", uploadFailed, false);
				xhr.addEventListener("abort", uploadCanceled, false);
				/* Be sure to change the url below to the url of your upload server side script */
				xhr.open("POST", "/UploadMinimal");
				xhr.send(fd);
			}

			$scope.uploadFile = function() {
				$scope.upload_disabled = true;
				$scope.files.forEach(function(file){
					if (file.fileSize > 50 * 1024 * 1024) {	//如果大于50MB
						file['sliceRequest'] = true;
					}
					uploadFileSlice(file);
				});
			};


			function uploadProgress(evt) {
				$timeout(function() {
					if (evt.lengthComputable) {
						$scope.percentComplete = Math.round(evt.loaded * 100 / evt.total);
						console.log('uploadProgress, percentComplete=' + $scope.percentComplete);
						//document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
					}
					else {
						console.log('unable to compute');
					}
				})
			}

			function uploadComplete(evt) {
				/* This event is raised when the server send back a response */
				console.log('uploadComplete: ' + evt.target.responseText);
			}

			function uploadFailed(evt) {
				console.log("There was an error attempting to upload the file.");
			}

			function uploadCanceled(evt) {
				console.log("The upload has been canceled by the user or the browser dropped the connection.");
			}

		}]);
