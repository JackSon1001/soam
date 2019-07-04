angular.module('eui.window')
    .directive('euiWin8Window', ['$q', '$timeout', '$document', 'windowIndex','$sce',
        function ($q, $timeout, $document, windowIndex, $sce) {
            return {
                restrict: 'EA',
                scope: {
                    options:'='
                },
                replace: true,
                transclude: true,
                //templateUrl: function(tElement, attrs) {
                //    return attrs.templateUrl || 'template/window/window.html';
                //},
                templateUrl:'./app/js/directive/window/window.html',
                link: function (scope, element, attrs) {
                    var width,height,midDivHeight,lastElement,windowFoot,maxLeft;
                    var modelWidth = 110;
                    var defaultOptions = {
                        modData: [
                            {
                                "name": "菜单一",
                                "url": ""
                            }
                        ],
                        modInfo: {
                            "softwareName":"系统名称",
                            "modName":"模块名称"
                        }
                    };
                    scope.options = angular.extend({},defaultOptions,scope.options);
                    windowFoot = scope.options.modInfo.softwareName + " > " + scope.options.modInfo.modName + " > ";
                    width = attrs.height? attrs.height:element.parent().css('width');
                    height = attrs.height? attrs.height:element.parent().css('height');
                    maxLeft = 74;
                    bottomHeight = 33;

                    element.addClass(attrs.windowClass || '');
                    scope.size = attrs.size;
                    scope.templateUrl = scope.options.templateUrl;
                    scope.openOffset = windowIndex.getWinMaxIndex();
                    if (attrs.title) {
                        scope.title = attrs.title;
                    }

                    //设置是否显示滚动箭头
                    if(scope.options.modData.length * modelWidth > parseInt(element.find(".meunset").css('width'))){
                        scope.showArrow = true;
                    } else {
                        scope.showArrow = false;
                    }

                    $timeout(function () {
                        // trigger CSS transitions
                        scope.animate = true;

                        /**
                         * Auto-focusing of a freshly-opened modal element causes any child elements
                         * with the autofocus attribute to lose focus. This is an issue on touch
                         * based devices which will show and then hide the onscreen keyboard.
                         * Attempts to refocus the autofocus element via JavaScript will not reopen
                         * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
                         * the modal element if the modal does not contain an autofocus element.
                         */
                        if (!element[0].querySelectorAll('[autofocus]').length) {
                            element[0].focus();
                        }
                    });


                    // This property is only added to the scope for the purpose of detecting when this directive is rendered.
                    // We can detect that by using this property in the template associated with this directive and then use
                    // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
                    scope.$isRendered = true;
                    // Deferred object that will be resolved when this modal is render.
                    var modalRenderDeferObj = $q.defer();
                    // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
                    // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
                    attrs.$observe('windowRender', function(value) {
                        if (value == 'true') {
                            modalRenderDeferObj.resolve();
                        }
                    });

                    modalRenderDeferObj.promise.then(function() {
                        //element.children().eq(0).css({
                        //    height:  height
                        //});
                        //
                        //setMidDivHeight(height);
                        //$modalStack.modalRendered(modal.key);

                        setMaxWindow();

                        // 初始化tab页
                        init();
                    })

                    var buttonsArray, icon, iconArray;
                    iconArray = ["min","max","close"];
                    icon = {
                        "min":false,
                        "max":false,
                        "close":false
                    };
                    if(attrs.buttons){
                        buttonsArray = attrs.buttons.split(" ");
                    }
                    buttonsArray.forEach(function(button){
                        if(iconArray.indexOf(button) !== -1){
                            icon[button] = true;
                        }
                    });
                    scope.icon = icon;

                    scope.maxWindow = function(){
                        var obj = $(element).find(".eui-wTools-max");

                        if( obj.length !== 0 ){
                            $(element).find(".eui-wTools-max").addClass("eui-wTools-restore").removeClass("eui-wTools-max");
                            setMaxWindow();
                        } else {
                            $(element).find(".eui-wTools-restore").addClass("eui-wTools-max").removeClass("eui-wTools-restore");
                            setRestoreWindow();
                        }
                    };

                    scope.minWindow = function(){
                        if(element.css("display") !== "none") {
                            element.css({
                                display: 'none'
                            });
                        }
                        scope.$emit('EVENT_PANEL_WINDOW.close',{"operate":"min","id":scope.options.modInfo.id});
                    };

                    // 关闭时发送事件到上层controller
                    scope.close = function (evt) {
                        scope.$emit('EVENT_PANEL_WINDOW.close', {"operate":"close","id":scope.options.modInfo.id});
                    };

                    scope.$on(scope.options.modInfo.id, function(evt) {
                        if(element.css("display") === "none") {
                            element.css({
                                display: 'block'
                            });
                        } else {
                            element.css({
                                display: 'none'
                            });
                        }
                    });

                    //最大化窗口
                    function setMaxWindow(){
                        element.css({
                            top: '0px',
                            left: maxLeft + 'px',
                            width: width,
                            height:  height
                        });
                        element.children().eq(0).css({
                            height:  height
                        });
                        setMidDivHeight(height);
                        if(element.css("display") === "none") {
                            element.css({
                                display: 'block'
                            });
                        }
                    }

                    //还原窗口
                    function setRestoreWindow(){
                        // 设定对话框大小及初始位置
                        if (y <= 0) {
                            var styles = attrs.size ? attrs.size.split(';') : [];
                            for (var i = 0; i < styles.length; i++) {
                                var styleItem = styles[i].split(':');
                                element[0].children[0].style[styleItem[0]] = styleItem[1];
                            }

                            elementWidth = parseInt(element.children().eq(0).css("width"));
                            elementHeight = parseInt(element.children().eq(0).css("height"));

                            y = ($document[0].children[0].clientHeight - elementHeight) / 2;
                            x = ($document[0].children[0].clientWidth - elementWidth) / 2;

                            var styles = attrs.position ? attrs.size.split(';') : [];
                            if (attrs.position) {
                                var positionStrParts = attrs.position.split('-');
                                var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

                                if (pos0 == 'left') {
                                    x = 0;
                                } else if (pos0 == 'right') {
                                    x = $document[0].children[0].clientWidth - element[0].children[0].offsetWidth;
                                }

                                if (pos1 == 'top') {
                                    y = 1;
                                } else if (pos1 == 'bottom') {
                                    y = $document[0].children[0].clientHeight - element[0].children[0].offsetHeight;
                                }
                            }
                        }
                        element.css({
                            top: y + 'px',
                            left:  x + 'px',
                            width: width
                        });
                        element.children().eq(0).css({
                            height: height
                        });
                        setMidDivHeight(height);
                        if(element.css("display") === "none") {
                            element.css({
                                display: 'block'
                            });
                        }
                    }

                    function init(){
                        lastElement = element.find(".secMenu")[0];
                        //if(scope.templateUrl){
                        //    scope.templateUrl = scope.options.modData[0].url;
                        //}
                        scope.windowFoot = windowFoot + scope.options.modData[0].name;
                        $(lastElement).css({
                            color:'#3a687b',
                            background:'url(./app/images/window/two_bg.jpg) repeat-x'
                        });
                    }

                    //设置元素  <div window-transclude></div>的高度
                    function setMidDivHeight(height){
                        midDivHeight = parseInt(height) - parseInt(element.find(".eui-window-title").css("height")) - parseInt(element.find(".eui-window-foot").css("height"));
                        element.children().eq(0).children().eq(1).css({
                            height:  midDivHeight + 'px'
                        });
                    }

                    scope.setMeunHover = function(e){
                        $(e.target).css({
                            color:'rgb(58, 104, 123)'
                        });
                    };

                    scope.setMeunLeave = function(e){
                        if(e.target !== lastElement){
                            $(e.target).css({
                                color:'#fff'
                            });
                        }
                    };

                    scope.select = function(mod, $index, $event){
                        scope.templateUrl = $sce.trustAsResourceUrl("");
                        if(lastElement){
                            $(lastElement).css({
                                color:'#fff',
                                background:''
                            });
                        }
                        lastElement = element.find(".secMenu")[$index];
                        scope.windowFoot = windowFoot + mod.name;
                        $(lastElement).css({
                            color:'#3a687b',
                            background:'url(./app/images/window/two_bg.jpg) repeat-x'
                        });
                        $timeout(function(){
                            scope.templateUrl = $sce.trustAsResourceUrl(mod.url);
                        })

                    }

                    // 设置二级菜单滚动
                    scope.moreleft = function(){
                        $('#_scrollmenuset').animate({ scrollLeft: $('#_scrollmenuset').scrollLeft() - modelWidth*2 }, 100);
                    }
                    scope.moreright = function(){
                        $('#_scrollmenuset').animate({ scrollLeft: $('#_scrollmenuset').scrollLeft() + modelWidth*2 }, 100);
                    }
                }
            };
        }])
    .factory('windowIndex', function () {
        var windowMaxIndex = 0;
        return {
            getWinMaxIndex: function() {
                windowMaxIndex = windowMaxIndex+3;
                return windowMaxIndex;
            }
        }
    });
