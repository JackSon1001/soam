//得到浏览器显示的屏幕高度
document.getViewportHeight = function () {
    if (window.innerHeight != window.undefined) return window.innerHeight;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientHeight;
    if (document.body) return document.body.clientHeight;
    return window.undefined;
}
//得到浏览器显示的屏幕宽度
document.getViewportWidth = function () {
    if (window.innerWidth != window.undefined) return window.innerWidth;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientWidth;
    if (document.body) return document.body.clientWidth;
}
/**
 * 遮罩层，组件的显示及隐藏
 */
Mask = {
    showing: false,
    mask: null,
    container: null,
    isIE6: null,
    init: function () {
        //判断浏览器是否是ie6或其以下版本
        var brsVersion = parseInt(window.navigator.appVersion.charAt(0), 10);
        if (brsVersion <= 6 && window.navigator.userAgent.indexOf("MSIE") > -1) {
            this.isIE6 = true;
        } else {
            this.isIE6 = false;
        }
        //将遮罩层加入body
        var popmask = document.createElement('div');
        popmask.id = 'mask';
        document.body.appendChild(popmask);
        this.mask = document.getElementById("mask");

        //将组件边框加入body
        var popcont = document.createElement('div');
        popcont.id = 'popupContainer';
        popcont.innerHTML = "<div class='popupFrame'></div>";
        document.body.appendChild(popcont);
        this.container = document.getElementById("popupContainer");
    },
    setMaskSize: function () {
        var theBody = document.body;

        var fullHeight = document.getViewportHeight();
        var fullWidth = document.getViewportWidth();

        if (fullHeight > theBody.scrollHeight) {
            this.popHeight = fullHeight;
        } else {
            this.popHeight = theBody.scrollHeight;
        }

        if (fullWidth > theBody.scrollWidth) {
            this.popWidth = fullWidth;
        } else {
            this.popWidth = theBody.scrollWidth;
        }

        this.mask.style.height = this.popHeight + "px";
        this.mask.style.width = this.popWidth + "px";
    },
    toCenter: function (conf) {
        var s = this.container.style;
        s.left = (document.getViewportWidth() - conf.width) / 2 + "px";
        s.top = (document.getViewportHeight() - conf.height) / 2 + "px";
    },
    show: function (conf) {
        //判断是否传参
        if(eui.isEmpty){
            conf = {
                title: "温馨提示",
                width: 250,
                height: 80,
                content: "数据加载中。。。"
            };
        }

        //初始化
        this.init();
        //设置遮罩层的长度和宽度
        this.setMaskSize()
        //设置组件的长和宽
        this.container.style.width = conf.width + "px";
        this.container.style.height = conf.height + "px";
        var frame = $('.popupFrame')[0];
        //将组件居中显示
        this.toCenter(conf);
        //设置组件内容
        frame.innerHTML = "<table style='width:100%;height:100%;text-align: center;'>" +
            "<tr class='maskTitleBar'>" +
            "<td class='maskTitle' colspan='2'>" + conf.title + "</td>" +
            "</tr>" +
            "<tr class='maskContent'>" +
            "<td><img style='width:30px;height:30px;margin-left: 10px' src='/themes/default/images/loading.gif'/>" +
            "</td>" +
            "<td style='text-align: left;'>" + conf.content +
            "</td>" +
            "</tr>" +
            "</table>";
        this.showing = true;
    },
    hide: function () {
        //删除遮罩层
        document.body.removeChild(this.mask);
        //删除组件层
        document.body.removeChild(this.container);
        this.showing = false;
    },
    isShowing: function () {
        return this.showing;
    }
}
/*
 * eui
 * 

 * Version: 0.0.6 - 2017-01-11
 * License: 
 */
angular.module("eui", ["eui.tpls", "eui.collapse","eui.accordion","eui.alert","eui.block","eui.button","eui.buttons","eui.carousel","eui.checkbox","eui.combo","eui.comboCheckbox","eui.tree","eui.comboTree","eui.customnav","eui.dateparser","eui.position","eui.datepicker","eui.dropdown","eui.stackedMap","eui.modal","eui.window","eui.fieldset","eui.fileupload","eui.grid","eui.input","eui.layout","eui.loadcontrols","eui.menus","eui.messageBox","eui.pagination","eui.panel","eui.tooltip","eui.popover","eui.progressbar","eui.radio","eui.rating","eui.rightMenu","eui.scrollbar","eui.scrolltabset","eui.service","eui.tabs","eui.timepicker","eui.timespinner","eui.typeahead"]);
angular.module("eui.tpls", ["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/block/block.html","template/button/button.html","template/carousel/carousel.html","template/carousel/slide.html","template/checkbox/checkbox.html","template/combo/combo.html","template/comboCheckbox/comboCheckbox.html","template/tree/tree.html","template/comboTree/comboTree.html","template/customnav/customnav.html","template/datepicker/datepicker.html","template/datepicker/day.html","template/datepicker/month.html","template/datepicker/popup.html","template/datepicker/year.html","template/modal/backdrop.html","template/modal/window.html","template/window/window.html","template/fieldset/fieldset.html","template/fileupload/fileupload.html","template/grid/grid.html","template/menus/menuitem.html","template/menus/menus.html","template/menus/menusIcon.html","template/messageBox/alertContent.html","template/messageBox/confirmContent.html","template/pagination/pager.html","template/pagination/pagination.html","template/panel/panel.html","template/tooltip/tooltip-html-popup.html","template/tooltip/tooltip-popup.html","template/tooltip/tooltip-template-popup.html","template/popover/popover-html.html","template/popover/popover-template.html","template/popover/popover.html","template/progressbar/bar.html","template/progressbar/progress.html","template/progressbar/progressbar.html","template/radio/radio.html","template/rating/rating.html","template/scrollbar/scrollbar.html","template/scrolltabset/scrolltabset.html","template/tabs/tab.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/timespinner/timespinner.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]);
angular.module('eui.collapse', [])

  .directive('euiCollapse', ['$animate', '$injector', function($animate, $injector) {
    var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
    return {
      link: function(scope, element, attrs) {
        function expand() {
          element.removeClass('collapse')
            .addClass('collapsing')
            .attr('aria-expanded', true)
            .attr('aria-hidden', false);

          if ($animateCss) {
            $animateCss(element, {
              addClass: 'in',
              easing: 'ease',
              to: { height: element[0].scrollHeight + 'px' }
            }).start().finally(expandDone);
          } else {
            $animate.addClass(element, 'in', {
              to: { height: element[0].scrollHeight + 'px' }
            }).then(expandDone);
          }
        }

        function expandDone() {
          element.removeClass('collapsing')
            .addClass('collapse')
            .css({height: 'auto'});
        }

        function collapse() {
          if (!element.hasClass('collapse') && !element.hasClass('in')) {
            return collapseDone();
          }

          element
            // IMPORTANT: The height must be set before adding "collapsing" class.
            // Otherwise, the browser attempts to animate from height 0 (in
            // collapsing class) to the given height here.
            .css({height: element[0].scrollHeight + 'px'})
            // initially all panel collapse have the collapse class, this removal
            // prevents the animation from jumping to collapsed state
            .removeClass('collapse')
            .addClass('collapsing')
            .attr('aria-expanded', false)
            .attr('aria-hidden', true);

          if ($animateCss) {
            $animateCss(element, {
              removeClass: 'in',
              to: {height: '0'}
            }).start().finally(collapseDone);
          } else {
            $animate.removeClass(element, 'in', {
              to: {height: '0'}
            }).then(collapseDone);
          }
        }

        function collapseDone() {
          element.css({height: '0'}); // Required so that collapse works when animation is disabled
          element.removeClass('collapsing')
            .addClass('collapse');
        }

        scope.$watch(attrs.euiCollapse, function(shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

angular.module('eui.accordion', ['eui.collapse'])

.constant('euiAccordionConfig', {
  closeOthers: true
})

.controller('EuiAccordionController', ['$scope', '$attrs', 'euiAccordionConfig',
  function($scope, $attrs, accordionConfig) {
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ?
      $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if (closeOthers) {
      angular.forEach(this.groups, function(group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function(event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('euiAccordion', function() {
  return {
    controller: 'EuiAccordionController',
    controllerAs: 'accordion',
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/accordion/accordion.html';
    }
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('euiAccordionGroup', function() {
  return {
    require: '^euiAccordion',         // We need this directive to be inside an accordion
    transclude: true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/accordion/accordion-group.html';
    },
    scope: {
      heading: '@',               // Interpolate the heading attribute onto this scope
      isOpen: '=?',
      isDisabled: '=?'
    },
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      accordionCtrl.addGroup(scope);

      scope.openClass = attrs.openClass || 'panel-open';
      scope.panelClass = attrs.panelClass;
      scope.$watch('isOpen', function(value) {
        element.toggleClass(scope.openClass, !!value);
        if (value) {
          accordionCtrl.closeOthers(scope);
        }
      });

      scope.toggleOpen = function($event) {
        if (!scope.isDisabled) {
          if (!$event || $event.which === 32) {
            scope.isOpen = !scope.isOpen;
          }
        }
      };
    }
  };
})

// Use accordion-heading below an accordion-group to provide a heading containing HTML
.directive('euiAccordionHeading', function() {
  return {
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^euiAccordionGroup',
    link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
      // Pass the heading to the accordion-group controller
      // so that it can be transcluded into the right place in the template
      // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
      accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
.directive('euiAccordionTransclude', function() {
  return {
    require: ['?^euiAccordionGroup', '?^accordionGroup'],
    link: function(scope, element, attrs, controller) {
      controller = controller[0] ? controller[0] : controller[1]; // Delete after we remove deprecation
      scope.$watch(function() { return controller[attrs.euiAccordionTransclude]; }, function(heading) {
        if (heading) {
          element.find('span').html('');
          element.find('span').append(heading);
        }
      });
    }
  };
});

angular.module('eui.alert', [])

.controller('EuiAlertController', ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
  $scope.closeable = !!$attrs.close;

  if (angular.isDefined($attrs.dismissOnTimeout)) {
    $timeout(function() {
      $scope.close();
    }, parseInt($attrs.dismissOnTimeout, 10));
  }
}])

.directive('euiAlert', function() {
  return {
    controller: 'EuiAlertController',
    controllerAs: 'alert',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/alert/alert.html';
    },
    transclude: true,
    replace: true,
    scope: {
      type: '@',
      close: '&'
    }
  };
});

angular.module('eui.block', [])
	.directive('euiBlock', function () {
		return {
			restrict: 'E',
			templateUrl: 'template/block/block.html',
			transclude: true,
			replace: true,
			scope: {
				title: '@'
			},
			compile: function(element, attrs, transcludeFn){
				return function link(scope, element,attrs){
					element.children().eq(1).append(transcludeFn(scope.$parent));
				}
			}
		};
	});


angular.module('eui.button', [])
    .directive('euiButton', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                //templateUrl:'../button/button.html',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/button/button.html';
                },
                replace: true,
                transclude: true,
                scope: {
                    enabled:'=?',   //启用
                    plain:'=?',     //扁平，无背景边框

                    onlyIcon:'@',   //只显示图标
                    allow:'@',      //下拉图标
                    iconCls: '@',   //按钮图标

                    oneclick:'&?',    //单击事件
                    ondbclick:'&'  //双击事件
                },
                compile: function(element, attrs, transcludeFn){
                    return function link(scope, element, attrs) {
                        scope.enabled = (scope.enabled === false || scope.enabled === "false") ? false:true;
                        scope.plain = (scope.plain === true || scope.plain === "true") ? true:false;
                        scope.onlyIcon = (scope.onlyIcon === true || scope.onlyIcon === "true") ? true:false;
                        scope.allow = (scope.allow === true || scope.allow === "true") ? true:false;
                        scope.iconCls = scope.iconCls ? scope.iconCls:"";

                        element.find('.eui-button-text').append(transcludeFn(scope.$parent));

                        //绑定单击事件
                        //element.bind('click',function(){
                        //    if(scope.enabled){
                        //        if(scope.oneclick() == undefined && attrs.oneclick !=undefined){
                        //            eval(attrs.oneclick);
                        //        }else{
                        //            scope.oneclick();
                        //        }
                        //    }
                        //});

                        //绑定双击事件
                        element.bind('dblclick',function(){
                            if(scope.enabled){
                                scope.ondbclick();
                            }
                        });

                        //更新状态
                        var on_enabled_change = function(){
                            if(scope.enabled){
                                if($(element).hasClass("eui-button-disabled")){
                                    $(element).removeClass("eui-button-disabled");
                                }
                            } else {
                                if(!$(element).hasClass("eui-button-disabled")){
                                    $(element).addClass("eui-button-disabled");
                                }
                            }
                        };
                        on_enabled_change();
                        //监视enabled属性
                        scope.$watch('enabled', on_enabled_change, true);

                        if(scope.iconCls){
                            $(element).children().eq(0).addClass(scope.iconCls);
                            //只显示图标
                            if(!attrs.onlyIcon){
                                $(element).children().eq(0).addClass("eui-button-icon");
                            } else {
                                $(element).children().eq(0).html("&nbsp");
                                $(element).children().eq(0).addClass("eui-button-iconOnly");
                            }
                        }

                        //扁平，无背景边框
                        if(scope.plain){
                            if(!$(element).hasClass("eui-button-plain")){
                                $(element).addClass("eui-button-plain");
                            }
                        } else {
                            if($(element).hasClass("eui-button-plain")){
                                $(element).removeClass("eui-button-plain");
                            }
                        }

                        //下拉图标
                        if(scope.allow){
                            $(element).find(".eui-button-allow").css("display","inline-block");
                        }
                    }
                }


            }
        }
    ]).factory('safeApply', function($rootScope) {
    return function(scope, fn) {
        var phase = scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && ( typeof (fn) === 'function')) {
                fn();
            }
        } else {
            scope.$apply(fn);
        }
    }
});;

angular.module('eui.buttons', [])

.constant('euiButtonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
})

.controller('EuiButtonsController', ['euiButtonConfig', function(buttonConfig) {
  this.activeClass = buttonConfig.activeClass || 'active';
  this.toggleEvent = buttonConfig.toggleEvent || 'click';
}])

    /*单选按钮*/
.directive('euiBtnRadio', function() {
  return {
    require: ['euiBtnRadio', 'ngModel'],
    controller: 'EuiButtonsController',
    controllerAs: 'buttons',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      element.find('input').css({display: 'none'});

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.euiBtnRadio)));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        var isActive = element.hasClass(buttonsCtrl.activeClass);

        if (!isActive || angular.isDefined(attrs.uncheckable)) {
          scope.$apply(function() {
            ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.euiBtnRadio));
            ngModelCtrl.$render();
          });
        }
      });
    }
  };
})

    /*复选按钮*/
.directive('euiBtnCheckbox', function() {
  return {
    require: ['euiBtnCheckbox', 'ngModel'],
    controller: 'EuiButtonsController',
    controllerAs: 'button',
    link: function(scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      element.find('input').css({display: 'none'});

      function getTrueValue() {
        return getCheckboxValue(attrs.btnCheckboxTrue, true);
      }

      function getFalseValue() {
        return getCheckboxValue(attrs.btnCheckboxFalse, false);
      }

      function getCheckboxValue(attribute, defaultValue) {
        return angular.isDefined(attribute) ? scope.$eval(attribute) : defaultValue;
      }

      //model -> UI
      ngModelCtrl.$render = function() {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.on(buttonsCtrl.toggleEvent, function() {
        if (attrs.disabled) {
          return;
        }

        scope.$apply(function() {
          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
});

/**
 * @ngdoc overview
 * @name eui.carousel
 *
 * @description
 * AngularJS version of an image carousel.
 *
 */
angular.module('eui.carousel', [])

.controller('EuiCarouselController', ['$scope', '$element', '$interval', '$animate', function($scope, $element, $interval, $animate) {
  var self = this,
    slides = self.slides = $scope.slides = [],
    NEW_ANIMATE = angular.version.minor >= 4,
    NO_TRANSITION = 'eui-noTransition',
    SLIDE_DIRECTION = 'eui-slideDirection',
    currentIndex = -1,
    currentInterval, isPlaying;
  self.currentSlide = null;

  var destroyed = false;
  /* direction: "prev" or "next" */
  self.select = $scope.select = function(nextSlide, direction) {
    var nextIndex = $scope.indexOfSlide(nextSlide);
    //Decide direction if it's not given
    if (direction === undefined) {
      direction = nextIndex > self.getCurrentIndex() ? 'next' : 'prev';
    }
    //Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide && nextSlide !== self.currentSlide && !$scope.$currentTransition) {
      goNext(nextSlide, nextIndex, direction);
    }
  };

  function goNext(slide, index, direction) {
    // Scope has been destroyed, stop here.
    if (destroyed) { return; }

    angular.extend(slide, {direction: direction, active: true});
    angular.extend(self.currentSlide || {}, {direction: direction, active: false});
    if ($animate.enabled() && !$scope.noTransition && !$scope.$currentTransition &&
      slide.$element && self.slides.length > 1) {
      slide.$element.data(SLIDE_DIRECTION, slide.direction);
      if (self.currentSlide && self.currentSlide.$element) {
        self.currentSlide.$element.data(SLIDE_DIRECTION, slide.direction);
      }

      $scope.$currentTransition = true;
      if (NEW_ANIMATE) {
        $animate.on('addClass', slide.$element, function(element, phase) {
          if (phase === 'close') {
            $scope.$currentTransition = null;
            $animate.off('addClass', element);
          }
        });
      } else {
        slide.$element.one('$animate:close', function closeFn() {
          $scope.$currentTransition = null;
        });
      }
    }

    self.currentSlide = slide;
    currentIndex = index;

    //every time you change slides, reset the timer
    restartTimer();
  }

  $scope.$on('$destroy', function() {
    destroyed = true;
  });

  function getSlideByIndex(index) {
    if (angular.isUndefined(slides[index].index)) {
      return slides[index];
    }
    var i, len = slides.length;
    for (i = 0; i < slides.length; ++i) {
      if (slides[i].index == index) {
        return slides[i];
      }
    }
  }

  self.getCurrentIndex = function() {
    if (self.currentSlide && angular.isDefined(self.currentSlide.index)) {
      return +self.currentSlide.index;
    }
    return currentIndex;
  };

  /* Allow outside people to call indexOf on slides array */
  $scope.indexOfSlide = function(slide) {
    return angular.isDefined(slide.index) ? +slide.index : slides.indexOf(slide);
  };

  $scope.next = function() {
    var newIndex = (self.getCurrentIndex() + 1) % slides.length;

    if (newIndex === 0 && $scope.noWrap()) {
      $scope.pause();
      return;
    }

    return self.select(getSlideByIndex(newIndex), 'next');
  };

  $scope.prev = function() {
    var newIndex = self.getCurrentIndex() - 1 < 0 ? slides.length - 1 : self.getCurrentIndex() - 1;

    if ($scope.noWrap() && newIndex === slides.length - 1) {
      $scope.pause();
      return;
    }

    return self.select(getSlideByIndex(newIndex), 'prev');
  };

  $scope.isActive = function(slide) {
     return self.currentSlide === slide;
  };

  $scope.$watch('interval', restartTimer);
  $scope.$watchCollection('slides', resetTransition);
  $scope.$on('$destroy', resetTimer);

  function restartTimer() {
    resetTimer();
    var interval = +$scope.interval;
    if (!isNaN(interval) && interval > 0) {
      currentInterval = $interval(timerFn, interval);
    }
  }

  function resetTimer() {
    if (currentInterval) {
      $interval.cancel(currentInterval);
      currentInterval = null;
    }
  }

  function timerFn() {
    var interval = +$scope.interval;
    if (isPlaying && !isNaN(interval) && interval > 0 && slides.length) {
      $scope.next();
    } else {
      $scope.pause();
    }
  }

  function resetTransition(slides) {
    if (!slides.length) {
      $scope.$currentTransition = null;
    }
  }

  $scope.play = function() {
    if (!isPlaying) {
      isPlaying = true;
      restartTimer();
    }
  };
  $scope.pause = function() {
    if (!$scope.noPause) {
      isPlaying = false;
      resetTimer();
    }
  };

  self.addSlide = function(slide, element) {
    slide.$element = element;
    slides.push(slide);
    //if this is the first slide or the slide is set to active, select it
    if (slides.length === 1 || slide.active) {
      self.select(slides[slides.length - 1]);
      if (slides.length === 1) {
        $scope.play();
      }
    } else {
      slide.active = false;
    }
  };

  self.removeSlide = function(slide) {
    if (angular.isDefined(slide.index)) {
      slides.sort(function(a, b) {
        return +a.index > +b.index;
      });
    }
    //get the index of the slide inside the carousel
    var index = slides.indexOf(slide);
    slides.splice(index, 1);
    if (slides.length > 0 && slide.active) {
      if (index >= slides.length) {
        self.select(slides[index - 1]);
      } else {
        self.select(slides[index]);
      }
    } else if (currentIndex > index) {
      currentIndex--;
    }

    //clean the currentSlide when no more slide
    if (slides.length === 0) {
      self.currentSlide = null;
    }
  };

  $scope.$watch('noTransition', function(noTransition) {
    $element.data(NO_TRANSITION, noTransition);
  });

}])

/**
 * @ngdoc directive
 * @name eui.carousel.directive:carousel
 * @restrict EA
 *
 * @description
 * Carousel is the outer container for a set of image 'slides' to showcase.
 *
 * @param {number=} interval The time, in milliseconds, that it will take the carousel to go to the next slide.
 * @param {boolean=} noTransition Whether to disable transitions on the carousel.
 * @param {boolean=} noPause Whether to disable pausing on the carousel (by default, the carousel interval pauses on hover).
 *
 * @example
<example module="eui">
  <file name="index.html">
    <eui-carousel>
      <eui-slide>
        <img src="http://placekitten.com/150/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>Beautiful!</p>
        </div>
      </eui-slide>
      <eui-slide>
        <img src="http://placekitten.com/100/150" style="margin:auto;">
        <div class="carousel-caption">
          <p>D'aww!</p>
        </div>
      </eui-slide>
    </eui-carousel>
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
 */
.directive('euiCarousel', [function() {
  return {
    transclude: true,
    replace: true,
    controller: 'EuiCarouselController',
    controllerAs: 'carousel',
    require: 'carousel',
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/carousel/carousel.html';
    },
    scope: {
      interval: '=',
      noTransition: '=',
      noPause: '=',
      noWrap: '&'
    }
  };
}])

/**
 * @ngdoc directive
 * @name eui.carousel.directive:slide
 * @restrict EA
 *
 * @description
 * Creates a slide inside a {@link eui.carousel.directive:carousel carousel}.  Must be placed as a child of a carousel element.
 *
 * @param {boolean=} active Model binding, whether or not this slide is currently active.
 * @param {number=} index The index of the slide. The slides will be sorted by this parameter.
 *
 * @example
<example module="eui">
  <file name="index.html">
<div ng-controller="CarouselDemoCtrl">
  <eui-carousel>
    <eui-slide ng-repeat="slide in slides" active="slide.active" index="$index">
      <img ng-src="{{slide.image}}" style="margin:auto;">
      <div class="carousel-caption">
        <h4>Slide {{$index}}</h4>
        <p>{{slide.text}}</p>
      </div>
    </eui-slide>
  </eui-carousel>
  Interval, in milliseconds: <input type="number" ng-model="myInterval">
  <br />Enter a negative number to stop the interval.
</div>
  </file>
  <file name="script.js">
function CarouselDemoCtrl($scope) {
  $scope.myInterval = 5000;
}
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
*/

.directive('euiSlide', function() {
  return {
    require: '^euiCarousel',
    restrict: 'EA',
    transclude: true,
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/carousel/slide.html';
    },
    scope: {
      active: '=?',
      actual: '=?',
      index: '=?'
    },
    link: function (scope, element, attrs, carouselCtrl) {
      carouselCtrl.addSlide(scope, element);
      //when the scope is destroyed then remove the slide from the current slides array
      scope.$on('$destroy', function() {
        carouselCtrl.removeSlide(scope);
      });

      scope.$watch('active', function(active) {
        if (active) {
          carouselCtrl.select(scope);
        }
      });
    }
  };
})

.animation('.item', [
         '$injector', '$animate',
function ($injector, $animate) {
  var NO_TRANSITION = 'eui-noTransition',
    SLIDE_DIRECTION = 'eui-slideDirection',
    $animateCss = null;

  if ($injector.has('$animateCss')) {
    $animateCss = $injector.get('$animateCss');
  }

  function removeClass(element, className, callback) {
    element.removeClass(className);
    if (callback) {
      callback();
    }
  }

  return {
    beforeAddClass: function(element, className, done) {
      // Due to transclusion, noTransition property is on parent's scope
      if (className == 'active' && element.parent() && element.parent().parent() &&
          !element.parent().parent().data(NO_TRANSITION)) {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction == 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element,
          directionClass + ' ' + direction, done);
        element.addClass(direction);

        if ($animateCss) {
          $animateCss(element, {addClass: directionClass})
            .start()
            .done(removeClassFn);
        } else {
          $animate.addClass(element, directionClass).then(function () {
            if (!stopped) {
              removeClassFn();
            }
            done();
          });
        }

        return function () {
          stopped = true;
        };
      }
      done();
    },
    beforeRemoveClass: function (element, className, done) {
      // Due to transclusion, noTransition property is on parent's scope
      if (className === 'active' && element.parent() && element.parent().parent() &&
          !element.parent().parent().data(NO_TRANSITION)) {
        var stopped = false;
        var direction = element.data(SLIDE_DIRECTION);
        var directionClass = direction == 'next' ? 'left' : 'right';
        var removeClassFn = removeClass.bind(this, element, directionClass, done);

        if ($animateCss) {
          $animateCss(element, {addClass: directionClass})
            .start()
            .done(removeClassFn);
        } else {
          $animate.addClass(element, directionClass).then(function() {
            if (!stopped) {
              removeClassFn();
            }
            done();
          });
        }
        return function() {
          stopped = true;
        };
      }
      done();
    }
  };
}]);

angular.module('eui.checkbox', [])
	.directive('euiCheckbox', [
		'$timeout', function ($timeout) {
			return {
				restrict: 'E',
				templateUrl: function (element, attrs) {
					return attrs.templateUrl || 'template/checkbox/checkbox.html';
				},
				replace: true,
				scope: {
					checkboxData: '=',
					checkedData: '=',
					width: '@',
					height: '@'
				},
				link: function (scope, element, attrs) {
					var width, height, labelPosition, index, data = [];
					var labelPositionVal = ["left", "right"];

					width = scope.width ? scope.width : "170px";
					height = scope.height ? scope.height : "100px";
					labelPosition = attrs.labelPosition ? attrs.labelPosition : "right";
					if (labelPositionVal.indexOf(labelPosition) === "-1") {
						labelPosition = "right";
					}

					/*设置样式*/
					scope.styletype = "eui-checkbox";
					if(labelPosition == "right"){
						scope.styletype = "eui-checkbox-r";
					}

					/*生成UUID*/
					function getUuid(){
						var len=32;//32长度
						var radix=16;//16进制
						var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
						var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
						return uuid.join('');
					}

					for (var i = 0; i < scope.checkboxData.length; i++)
					{
						var uuId=getUuid();
						var item = {uuid:uuId, rlabel:'', llabel:'', label:'', value:'', disabled:'', checked:'', show:true};

						if (labelPosition === "right") {
							item.rlabel = scope.checkboxData[i].label;
						} else {
							item.llabel = scope.checkboxData[i].label;
						}

						item.label = scope.checkboxData[i].label;
						item.value = scope.checkboxData[i].value;
						item.disabled = scope.checkboxData[i].disabled;
						item.checked = scope.checkboxData[i].checked ? scope.checkboxData[i].checked : false;

						if(scope.checkboxData[i].show == "false" || scope.checkboxData[i].show == false){
							item.show = false;
						}

						data.push(item);
					}

					scope.data = data;
					scope.checkboxStyle = {
						"width": width,
						"height": height
					};

					scope.getCheckedRows = function () {
						scope.checkedData = [];
						for (var i = 0; i < scope.data.length; i++) {
							if (scope.data[i].checked) {
								scope.checkedData.push(data[i]);
							}
						}
					}

					var on_data_change = function () {
						scope.checkedData = [];
						for (var i = 0; i < data.length; i++) {
							if (data[i].checked) {
								scope.checkedData.push(data[i]);
							}
						}
					};
					scope.$watch('scope.data', on_data_change, true);
				}
			}
		}
	]);

angular.module('eui.combo', [])
    .directive('euiCombo', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/combo/combo.html';
                },
                replace: true,
                scope: {
                    onClick: '&',
                    iconCls: '@',
                    combo:'=?',
                    width:'=',
                    height:'=',
                    inputDisabled:"@", //input输入框不可用设置
                    disabled:'='  // 如果为true，设置组件不可用
                },
                link: function(scope, element, attrs) {
                    var width,height,iconCls;
                    width = scope.width? scope.width:"170px";
                    height = scope.height? scope.height:"25px";
                    iconCls = scope.iconCls? scope.iconCls:"eui-buttonedit-icon";


                    if (attrs.inputDisabled === "true"){
                        scope.inputDisabled = true;
                    } else {
                        scope.inputDisabled = false;
                    }

                    //if(attrs.disabled === "" && scope.disabled === undefined){
                    //    scope.disabled = true;
                    //}

                    if(!scope.combo){
                        scope.combo = {text:""}
                    }

                    $(element).find(".eui-buttonedit-buttons").children().eq(0).addClass(iconCls);

                    if (!scope.onClick) {
                        alert("请设置点击事件函数");
                    }
                    scope.inputStyle = {
                        "width":width,
                        "height":height,
                        "border-width": "0px"
                    };

                    scope.buttonStyle = {
                        "width":height,
                        "height":height,
                        "display":"block"
                    };

                    function on_disabled_change(){
                        //如果控件不可用，取消onClick函数绑定，设置disable样式
                        if(scope.disabled === "true" || scope.disabled === true){
                            scope.inputDisabled = true;
                            scope.onButtonClick = function($event){
                                $event.stopPropagation();
                            };
                            if(!$(element).find(".eui-buttonedit-border").hasClass("eui-buttonedit-disabled")){
                                $(element).find(".eui-buttonedit-border").addClass("eui-buttonedit-disabled");
                            }
                            
                        } else {
                            if (attrs.inputDisabled === "true"){
                                scope.inputDisabled = true;
                            } else {
                                scope.inputDisabled = false;
                            }
                            if($(element).find(".eui-buttonedit-border").hasClass("eui-buttonedit-disabled")){
                                $(element).find(".eui-buttonedit-border").removeClass("eui-buttonedit-disabled");
                            }
                            scope.onButtonClick = function($event){
                                $event.stopPropagation();
                                scope.onClick();
                            };
                        }
                    }

                    scope.$watch('disabled', on_disabled_change, true);


                }
            }
        }
    ]);
angular.module('eui.comboCheckbox', ['eui.combo'])
    .directive('euiComboCheckbox', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/comboCheckbox/comboCheckbox.html';
                },
                replace: true,
                scope: {
                    selectData:'=',
                    selectedRows:'=',
                    checkbox:"@",
                    disabled:"="
                },
                link: function(scope, element, attrs) {
                    var width,
                        height,
                        textValue = [],
                        lastIndex;  // 记录单选上次选中值

                    width = attrs.width? attrs.width:"170px";
                    height = attrs.height? attrs.height:"25px";
                    scope.comboWidth = width;
                    scope.comboHeight = height;
                    scope.selectHeight = attrs.selectHeight? attrs.selectHeight:"200px";

                    scope.selectedRows = [];
                    var selectData = scope.selectData;

                    $(document).bind("click",function(e){
                        $(element).children().eq(1).css("display","none");
                    });

                    scope.panelStyle = {
                        "position":"absolute",
                        "z-index": "110008",
                        "display": "none",
                        "width":width,
                        "top": height,
                        "overflow": "auto"
                    };

                    scope.comboStyle = {
                        "padding": "0",
                        "height": scope.selectHeight
                    };

                    /*选择事件*/
                    scope.select = function(row, $index, $event){
                        var index;
                        $event.stopPropagation();
                        // 多选数据绑定
                        if(scope.checkbox === "true"){
                            if ($(element).children().eq(1).children().eq(0).children().eq($index).hasClass('eui-combobox-item-selected')){
                                $(element).children().eq(1).children().eq(0).children().eq($index).removeClass('eui-combobox-item-selected');
                                if (scope.combo.text === row.name){
                                    scope.combo.text = "";
                                    scope.selectedRows = [];
                                } else {
                                    textValue = scope.combo.text.split(",");
                                    index = textValue.indexOf(row.name);
                                    textValue.splice(index,1);
                                    scope.combo.text = textValue.join(",");
                                    for(var key in scope.selectedRows){
                                        if(scope.selectedRows[key].name === row.name){
                                            scope.selectedRows.splice(key,1);
                                        }
                                    }
                                }
                            } else {     //单选数据绑定
                                $(element).children().eq(1).children().eq(0).children().eq($index).addClass('eui-combobox-item-selected');
                                if (!scope.combo.text || scope.combo.text === ""){
                                    scope.combo.text = row.name;
                                } else {
                                    scope.combo.text = scope.combo.text + ',' + row.name;
                                }
                                scope.selectedRows.push(row);
                            }
                        } else {
                            if (!$(element).children().eq(1).children().eq(0).children().eq($index).hasClass('eui-combobox-item-selected')){
                                $(element).children().eq(1).children().eq(0).children().eq($index).addClass('eui-combobox-item-selected');
                                if(angular.isNumber(lastIndex)){
                                    $(element).children().eq(1).children().eq(0).children().eq(lastIndex).removeClass('eui-combobox-item-selected')
                                }
                                scope.combo.text = row.name;
                                scope.selectedRows = row;
                                lastIndex = $index;
                            }
                            $(element).children().eq(1).css("display","none");
                        }
                    };

                    /*点击下拉*/
                    scope.onClick = function(){
                        if($(element).children().eq(1).css("display") === "none"){
                            $(element).children().eq(1).slideDown();
                        } else {
                            $(element).children().eq(1).slideUp();
                        }
                    };

                    scope.clickCombo = function($event){
                        $event.stopPropagation();
                        if($(element).children().eq(1).css("display") === "none"){
                            $(element).children().eq(1).css("display","block");
                        } else {
                            $(element).children().eq(1).css("display","none");
                        }
                    };

                    function  refreshData(){
                        if(!scope.combo){
                            scope.combo = {};
                        }
                        if(scope.combo && scope.combo.text){
                            scope.combo.text = "";
                        }
                        if(scope.checkbox === "true"){
                            scope.selectedRows = [];
                            if(angular.isArray(scope.selectData)){
                                for(var i=0; i<scope.selectData.length; i++){
                                    var temprow = scope.selectData[i];
                                    if(temprow.checked == true || temprow.checked == "true"){
                                        //文本框赋值
                                        if (scope.combo.text === ""){
                                            scope.combo.text = temprow.name;
                                        } else {
                                            scope.combo.text = scope.combo.text + ',' + temprow.name;
                                        }
                                        //设置选择数据
                                        scope.selectedRows.push(temprow);

                                        //设置选中行样式
                                        scope.selectData[i].style = "eui-combobox-item-selected";
                                    }
                                }
                            }
                        } else {
                            if(angular.isArray(scope.selectData)){
                                for(var i=0; i<scope.selectData.length; i++){
                                    if(scope.selectData[i].selected == true || scope.selectData[i].selected == "true"){
                                        //文本框赋值
                                        scope.combo.text = scope.selectData[i].name;
                                        //设置选择数据
                                        scope.selectedRows = scope.selectData[i];
                                        //设置选中行样式
                                        scope.selectData[i].style = "eui-combobox-item-selected";
                                        //保存上次选中项
                                        lastIndex = i;
                                        return;
                                    }
                                }
                            }
                        }

                    }

                    scope.$watch('selectData', refreshData, true);

                    //scope.addClass = function(){
                    //    $(element).children().eq(0).children().eq(0).children().eq(1).addClass("mini-buttonedit-button-hover");
                    //    //$(this).addClass("mini-buttonedit-button-hover")
                    //};
                    //scope.removeClass = function(){
                    //    $(element).children().eq(0).children().eq(0).children().eq(1).removeClass("mini-buttonedit-button-hover")
                    //};


                }
            }
        }
    ]);

angular.module('eui.tree', [])
    .controller('EuiTreeController', ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
        //定义获取tree属性值，用于跨指令获取
        this.getTreeOptions=function(){
            return $scope.treeOptions;
        };
    }])

	.directive('euiTree', [
		'$timeout', '$sce', function ( $timeout, $sce) {
			return {
                controller: 'EuiTreeController',
				restrict: 'E',
				templateUrl: function (element, attrs) {
					return attrs.templateUrl || 'template/tree/tree.html';
				},
				replace: true,
				scope: {
					//onSelect: '=',
					onClick: '=',
					onDbclick: '=',  //双击事件
					treeOptions: '=',
					//initialSelection: '@',
					treeData: '=',
					treeControl: '='
					//showCheckBox: '@',
					//expandLevel: '='
				},
				link: function (scope, element, attrs) {
					var error, expand_all_parents, expand_level, for_all_ancestors, for_each_branch,
						get_parent, n, on_treeData_change, select_branch, selected_branch,mouseover_branch,onright_branch,
						onclick_branch, ondbclick_branch, tree,options;

					var initFlag = true;  // 初始化selected数据标志位
					var checkboxIcon = {
						checkbox1:"eui-tree-checkbox1",
						checkbox2:"eui-tree-checkbox2",
						checkbox3:"eui-tree-checkbox3"
					};
					error = function (s) {
						console.log('ERROR:' + s);
						debugger;
						return void 0;
					};

					var defaultsOptions = {
						selectOnCheck: false,//如果为true，单击复选框将永远选择行。
						checkOnSelect: false,//如果为true，当用户点击行的时候该复选框就会被选中或取消选中。
						checkbox: false, //如果为true，显示复选框
						cascadeCheck:true,//设置树级联功能，如果为true，则选中父节点的同时选中下属所有子节点，如果为false，则父节点与子节点分别独立选中
						expandLevel: '1',//树展开级别，默认展开3级
						menuTarget:null,//默认没有右击菜单
						iconExpand:'eui-expand', //设置树打开图标
						iconCollapse:'eui-collapse', //设置树折叠图标
						iconLeaf:'eui-leaf', //设置树叶子图标
						iconFolderClose:'eui-folder-close', //设置树节点文件关闭图标
						iconFolderOpen:'eui-folder-open',//设置树节点文件打开图标
						//在树数据变化的时候触发
						onAfterTreeDataChange:function(){
						},
						//在用户点击树节点的时候触发，参数brunch：为所选中的数据
						onSelect:function(branch){
						}
					};

					//初始化options数据
					options = $.extend({}, defaultsOptions, scope.treeOptions);
					scope.showCheckBox = options.checkbox;
					scope.menuTarget = options.menuTarget;

					expand_level = parseInt(options.expandLevel, 10);
					//初始化treeData数据
					if (!scope.treeData) {
						scope.treeData = [];
						//alert('no treeData defined for the tree!');
						//return;
					}
					if (scope.treeData.length == null) {
						if (treeData.label != null) {
							scope.treeData = [treeData];
						} else {
							alert('treeData should be an array of root branches');
							return;
						}
					}
					for_each_branch = function (f) {
						var do_f, root_branch, _i, _len, _ref, _results;
						do_f = function (branch, level) {
							var child, _i, _len, _ref, _results;
							f(branch, level);
							if (branch.children != null) {
								_ref = branch.children;
								_results = [];
								for (_i = 0, _len = _ref.length; _i < _len; _i++) {
									child = _ref[_i];
									_results.push(do_f(child, level + 1));
								}
								return _results;
							}
						};
						_ref = scope.treeData;
						_results = [];
						for (_i = 0, _len = _ref.length; _i < _len; _i++) {
							root_branch = _ref[_i];
							_results.push(do_f(root_branch, 1));
						}
						return _results;
					};

					for_branch_children = function (f, branch) {
						var do_f;
						do_f = function (branch) {
							var child, _i, _len, _ref;
							f(branch);
							if (branch.children != null) {
								_ref = branch.children;
								for (_i = 0, _len = _ref.length; _i < _len; _i++) {
									child = _ref[_i];
									do_f(child);
								}
							}
						};
						do_f(branch);
					};
					selected_branch = null;
					select_branch = function (branch) {
						if (!branch) {
							if (selected_branch != null) {
								selected_branch.labelSelected = false;
							}
							selected_branch = null;
							return;
						}
						if (branch !== selected_branch) {
							if (selected_branch != null) {
								selected_branch.labelSelected = false;
							}
							branch.labelSelected = true;
							selected_branch = branch;
							expand_all_parents(branch);
							if (branch.onSelect != null) {
								branch.onSelect(branch);
								//return $timeout(function () {
								//	return
								//});
							} else {
								options.onSelect(branch);
							}
						}
					};

					onclick_branch = function (branch) {
						if (scope.onClick != null) {
							return $timeout(function () {
								return scope.onClick(branch);
							});
						}
					};

					ondbclick_branch = function (branch) {
						if (scope.onDbclick != null) {
							return $timeout(function () {
								return scope.onDbclick(branch);
							});
						}
					};

					scope.user_dbclick_branch = function (branch) {
						ondbclick_branch(branch);
					};

					scope.expanded = function ($event, row) {
						$event.stopPropagation();
						row.branch.expanded = !row.branch.expanded
					};
					scope.user_clicks_branch = function ($event, branch) {
						$event.stopPropagation();
						onclick_branch(branch);
						if (options.checkbox && options.checkOnSelect){
							branch.selected = !branch.selected;
							setSelectStatus(branch, options.selectOnCheck, options.cascadeCheck);
						} else {
							if (branch !== selected_branch) {
								select_branch(branch);
							}
						}
					};
					/**
					 * 鼠标移入事件
					 * @param $event
					 * @param branch
					 */
					scope.user_mouseover_branch = function ($event, branch) {
                        mouseover_branch = branch;
					};
                    /**
                     * 鼠标右击事件
                     * @param $event
                     * @param branch
                     */
                    scope.user_right_click = function ($event, branch) {
                        onright_branch = branch;

                        // onclick_branch(branch);
                        if (options.checkbox && options.checkOnSelect){
                            branch.selected = !branch.selected;
                            setSelectStatus(branch, options.selectOnCheck, options.cascadeCheck);
                        } else {
                            if (branch !== selected_branch) {
                                select_branch(branch);
                            }
                        }
                    };

					// 复选框单击事件函数
					scope.user_select = function ($event, branch) {
						$event.stopPropagation();
						var selected;
						branch.selected = !branch.selected;
						selected = branch.selected;

						//根据节点复选框的勾选状态，同时设置其父节点和子节点的勾选状态及样式
						setSelectStatus(branch, options.selectOnCheck, options.cascadeCheck);
					};

					/**
					 * @description 根据节点复选框的勾选状态，同时设置其父节点和子节点的勾选状态及样式
					 * @param {object} branch 树形分支对象.
					 * @param {bool} selectOnCheck 如果为true，则在选中复选框的时候同时设置选中行
					 *               如果为false，则仅选中复选框
					 * @param {bool} cascadeCheck 设置树级联功能，如果为true，则选中父节点的同时选中下属所有子节点，
					 *               如果为false，则父节点与子节点分别独立选中
					 * @returns 无
					 */
					function setSelectStatus(branch, selectOnCheck, cascadeCheck){
						var selected, children, child,tempCheckIcon;
						selected = branch.selected;
						if(selected){
							tempCheckIcon = checkboxIcon.checkbox2
						} else {
							tempCheckIcon = checkboxIcon.checkbox1
						}

						if(cascadeCheck){
							//同步设置子节点和父节点状态及样式
							syncSetSelectStatus(branch, tempCheckIcon, selectOnCheck);
						} else {
							branch.checkboxIcon = tempCheckIcon;
							if(selectOnCheck){
								branch.labelSelected = selected;
							}
						}
						options.onSelect(branch)
					}


					/**
					 * @description 初始化树节点复选框的状态及样式
					 * @param {object} branch 树形分支对象.
					 * @param {bool} selectOnCheck 如果为true，则在选中复选框的时候同时设置选中行
					 *               如果为false，则仅选中复选框
					 * @param {bool} cascadeCheck 设置树级联功能，如果为true，则选中父节点的同时选中下属所有子节点，
					 *               如果为false，则父节点与子节点分别独立选中
					 * @returns 无
					 */
					function initSelectStatus(branch, selectOnCheck, cascadeCheck){
						var selected, tempCheckIcon;
						if(branch.selected !== true) {
							branch.selected = false;
						}
						selected = branch.selected;
						if(selected){
							tempCheckIcon = checkboxIcon.checkbox2
						} else {
							tempCheckIcon = checkboxIcon.checkbox1
						}

						if(cascadeCheck){
							if(selected){
								//同步设置子节点和父节点状态及样式
								syncSetSelectStatus(branch, tempCheckIcon, selectOnCheck)
							} else {
								branch.checkboxIcon = checkboxIcon.checkbox1;
								if(branch.children && branch.children.length > 0){
									for(var i = 0 ; i < branch.children.length; i++){
										initSelectStatus(branch.children[i], selectOnCheck, cascadeCheck)
									}
								}
							}
						} else {
							branch.checkboxIcon = tempCheckIcon;
							if(selectOnCheck){
								branch.labelSelected = selected;
							}

							if(branch.children && branch.children.length > 0){
								for(var i = 0 ; i < branch.children.length; i++){
									initSelectStatus(branch.children[i], selectOnCheck, cascadeCheck)
								}
							}
						}

						options.onSelect(branch)
					}

					/**
					 * @description 同步设置子节点和父节点状态及样式
					 * @param {object} branch 树形分支对象.
					 * @param {string} checkIcon 设置分支图标样式
					 * @param {bool} selectOnCheck 如果为true，则在选中复选框的时候同时设置选中行
					 *               如果为false，则仅选中复选框
					 * @returns 无
					 */
					function syncSetSelectStatus(branch, checkIcon, selectOnCheck){
						var selected = branch.selected;
						// 同步勾选或取消所有孩子节点
						for_branch_children(function (b) {
							b.selected = selected;
							b.checkboxIcon = checkIcon;
							if(selectOnCheck){
								b.labelSelected = selected;
							}
							return true;
						}, branch);
						// 同步设置所有父亲节点
						for_all_ancestors(branch, function (b) {
							var flag,
								child,
								i = 0;
							children = b.children;

							// 如果所选节点为已勾选，则判断父节点的所有孩子节点是否为已勾选状态，如全部勾选，则勾选父节点，否则设置父节点填充框样式
							if (selected) {
								flag = true;
								b.checkboxIcon = checkboxIcon.checkbox2;
								while (i < children.length) {
									child = children[i];
									if (!child.selected) {
										flag = false;
										b.checkboxIcon = checkboxIcon.checkbox3;
										break;
									}
									i++;
								}
							} else {
								// 如果所选节点为取消，则循环判断父节点下是否存在已经勾选子节点，如存在，则设置父节点填充框样式，如不存在，则取消父节点
								flag = false;
								b.checkboxIcon = checkboxIcon.checkbox1;
								while (i < children.length) {
									child = children[i];
									if (child.selected) {
										b.checkboxIcon = checkboxIcon.checkbox3;
										break;
									}
									i++;
								}
							}

							b.selected = flag;
							if(selectOnCheck){
								b.labelSelected = flag;
							}
						});
					}

					get_parent = function (child) {
						var parent;
						parent = void 0;
						if (child.parent_uid) {
							for_each_branch(function (b) {
								if (b.uid === child.parent_uid) {
									return parent = b;
								}
							});
						}
						return parent;
					};
					for_all_ancestors = function (child, fn) {
						var parent;
						parent = get_parent(child);
						if (parent != null) {
							fn(parent);
							return for_all_ancestors(parent, fn);
						}
					};
					expand_all_parents = function (child) {
						return for_all_ancestors(child, function (b) {
							return b.expanded = true;
						});
					};
					scope.tree_rows = [];
					on_treeData_change = function () {
						var add_branch_to_list, root_branch, _i, _len, _ref, _results;
						_ref = scope.treeData;
						var labelSelectedFlag;
						// 初始化分支seletcd及labelSelected属性
						if(initFlag && scope.treeData.length > 0){
							initFlag = false;
							labelSelectedFlag = false;
							if(options.checkbox){
								for (_i = 0, _len = _ref.length; _i < _len; _i++) {
									root_branch = _ref[_i];
									initSelectStatus(root_branch, options.selectOnCheck, options.cascadeCheck);
								}
							} else {
								for_each_branch(function (b) {
									if (labelSelectedFlag){
										b.labelSelected = false;
										return;
									}
									if(b.labelSelected === true){
										labelSelectedFlag = true;
										select_branch(b);
									} else {
										b.labelSelected = false;
									}
								});
							}

							//设置初始化expand_level展开层级属性
							for_each_branch(function (b, level) {
								b.level = level;
								return b.expanded = b.level < expand_level;
							});
						}
						for_each_branch(function (b, level) {
							if (!b.uid) {
								return b.uid = "" + Math.random();
							}
						});
						//console.log('UIDs are set.');
						for_each_branch(function (b) {
							var child, _i, _len, _ref, _results;
							if (angular.isArray(b.children)) {
								_ref = b.children;
								_results = [];
								for (_i = 0, _len = _ref.length; _i < _len; _i++) {
									child = _ref[_i];
									_results.push(child.parent_uid = b.uid);
								}
								return _results;
							}
						});
						scope.tree_rows = [];
						for_each_branch(function (branch) {
							var child, f;
							if (branch.children) {
								if (branch.children.length > 0) {
									f = function (e) {
										if (typeof e === 'string') {
											return {
												label: e,
												children: []
											};
										} else {
											return e;
										}
									};
									return branch.children = (function () {
										var _i, _len, _ref, _results;
										_ref = branch.children;
										_results = [];
										for (_i = 0, _len = _ref.length; _i < _len; _i++) {
											child = _ref[_i];
											_results.push(f(child));
										}
										return _results;
									})();
								}
							} else {
								return branch.children = [];
							}
						});
						//for_each_branch(function (b, level) {
						//	b.level = level;
						//	return b.expanded = b.level < expand_level;
						//});

						add_branch_to_list = function (level, branch, visible) {
							var child, child_visible, treeIcon,branchIcon, _i, _len, _ref, _results;
							if (branch.expanded == null) {
								branch.expanded = false;
							}
							if (!branch.children || branch.children.length === 0) {
								treeIcon = "eui-null";
								branchIcon = options.iconLeaf;
							} else {
								if (branch.expanded) {
									treeIcon = options.iconCollapse;
									branchIcon = options.iconFolderOpen;
								} else {
									treeIcon = options.iconExpand;
									branchIcon = options.iconFolderClose;
								}
							}

							//if (branch.labelSelected === undefined) {
							//	branch.labelSelected = false;
							//}

							scope.tree_rows.push({
								level: level,
								branch: branch,
								label: branch.label,
								fmtlabel:$sce.trustAsHtml(branch.label),
								treeIcon: treeIcon,
								branchIcon: branchIcon,
								checkboxIcon: branch.checkboxIcon || checkboxIcon.checkbox1,
								visible: visible,
								selected: branch.selected,    // 新增复选框属性
								labelSelected: branch.labelSelected  // 新增标签选择属性
							});
							//branch.selected = false;
							//branch.labelSelected = false;
							if (branch.children != null) {
								_ref = branch.children;
								_results = [];
								for (_i = 0, _len = _ref.length; _i < _len; _i++) {
									child = _ref[_i];
									child_visible = visible && branch.expanded;
									_results.push(add_branch_to_list(level + 1, child, child_visible));
								}
								return _results;
							}
						};

						_results = [];
						for (_i = 0, _len = _ref.length; _i < _len; _i++) {
							root_branch = _ref[_i];
							_results.push(add_branch_to_list(1, root_branch, true));
						}
						options.onAfterTreeDataChange();
						return _results;
					};
					scope.$watch('treeData', on_treeData_change, true);

					n = scope.treeData.length;
					//console.log('num root branches = ' + n);
					for_each_branch(function (b, level) {
						b.level = level;
						return b.expanded = b.level < expand_level;
					});
					if (scope.treeControl != null) {
						if (angular.isObject(scope.treeControl)) {
							tree = scope.treeControl;
							tree.expand_all = function () {
								return for_each_branch(function (b, level) {
									return b.expanded = true;
								});
							};
							tree.collapse_all = function () {
								return for_each_branch(function (b, level) {
									return b.expanded = false;
								});
							};
							tree.get_first_branch = function () {
								n = scope.treeData.length;
								if (n > 0) {
									return scope.treeData[0];
								}
							};
							tree.select_first_branch = function () {
								var b;
								b = tree.get_first_branch();
								return tree.select_branch(b);
							};
							tree.get_selected_branch = function () {
								return selected_branch;
							};
                            /**
                             * 获取 鼠标移入节点
                             * @returns {*}
                             */
                            tree.get_mouseover_branch = function () {
                                return mouseover_branch;
                            };
                            /**
                             * 获取 鼠标右击节点
                             * @returns {*}
                             */
                            tree.get_onright_branch = function () {
                                return onright_branch;
                            };
							tree.get_parent_branch = function (b) {
								return get_parent(b);
							};
							tree.select_branch = function (b) {
								select_branch(b);
								return b;
							};
							tree.get_children = function (b) {
								return b.children;
							};
							tree.select_parent_branch = function (b) {
								var p;
								if (b == null) {
									b = tree.get_selected_branch();
								}
								if (b != null) {
									p = tree.get_parent_branch(b);
									if (p != null) {
										tree.select_branch(p);
										return p;
									}
								}
							};

							/**
							 * @description 插入树节点（包括前、后、及子节点插入）
							 * @param {object} new_branch 所需插入新节点.
							 * @param {array} operation (操作名）["before","after","add"]
							 * @param {object} old_branch 所选老节点
							 * @returns 无
							 */
							tree.addNode = function (new_branch, operation, old_branch) {
								var oper = ["before", "after", "add"];
								var parent, index;
								if (!old_branch) {
									throw Error("请传入老节点");
								}
								if (!new_branch) {
									throw Error("请传入所需添加节点");
								}
								if (!operation || oper.indexOf(operation) === -1) {
									throw Error("请传入正确的操作类型");
								}
								if (operation === "add") {
									new_branch.level = old_branch.level + 1;
									old_branch.children.push(new_branch);
									old_branch.expanded = true;

								} else {
									new_branch.level = old_branch.level;
									// 如果是root节点，则直接在treeData上增加数据，否则在parent节点增加数据
									if (old_branch.level === 1) {
										index = scope.treeData.indexOf(old_branch);
										if (operation === "before") {
											scope.treeData.splice(index, 0, new_branch);
										} else if (operation === "after") {
											scope.treeData.splice(index + 1, 0, new_branch);
										}
									} else {
										parent = get_parent(old_branch);
										index = parent.children.indexOf(old_branch);
										if (operation === "before") {
											parent.children.splice(index, 0, new_branch);
										} else if (operation === "after") {
											parent.children.splice(index + 1, 0, new_branch);
										}
									}

								}
							};

							tree.removeNode = function (selectBranch) {
								if (!selectBranch) {
									throw Error("请传入所需删除节点");
								}
								if (selectBranch.level === 1) {
									index = scope.treeData.indexOf(selectBranch);
									scope.treeData.splice(index, 1);
								} else {
									parent = get_parent(selectBranch);
									index = parent.children.indexOf(selectBranch);
									parent.children.splice(index, 1);
								}
							};

							tree.add_branch = function (parent, new_branch) {
								if (parent != null) {
									parent.children.push(new_branch);
									parent.expanded = true;
								} else {
									scope.treeData.push(new_branch);
								}
								return new_branch;
							};
							tree.add_root_branch = function (new_branch) {
								tree.add_branch(null, new_branch);
								return new_branch;
							};
							tree.expand_branch = function (b) {
								if (b == null) {
									b = tree.get_selected_branch();
								}
								if (b != null) {
									b.expanded = true;
									return b;
								}
							};
							tree.collapse_branch = function (b) {
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									b.expanded = false;
									return b;
								}
							};
							tree.get_siblings = function (b) {
								var p, siblings;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									p = tree.get_parent_branch(b);
									if (p) {
										siblings = p.children;
									} else {
										siblings = scope.treeData;
									}
									return siblings;
								}
							};
							tree.get_next_sibling = function (b) {
								var i, siblings;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									siblings = tree.get_siblings(b);
									n = siblings.length;
									i = siblings.indexOf(b);
									if (i < n) {
										return siblings[i + 1];
									}
								}
							};
							tree.get_prev_sibling = function (b) {
								var i, siblings;
								if (b == null) {
									b = selected_branch;
								}
								siblings = tree.get_siblings(b);
								n = siblings.length;
								i = siblings.indexOf(b);
								if (i > 0) {
									return siblings[i - 1];
								}
							};
							tree.select_next_sibling = function (b) {
								var next;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									next = tree.get_next_sibling(b);
									if (next != null) {
										return tree.select_branch(next);
									}
								}
							};
							tree.select_prev_sibling = function (b) {
								var prev;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									prev = tree.get_prev_sibling(b);
									if (prev != null) {
										return tree.select_branch(prev);
									}
								}
							};
							tree.get_first_child = function (b) {
								var _ref;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									if (((_ref = b.children) != null ? _ref.length : void 0) > 0) {
										return b.children[0];
									}
								}
							};
							tree.get_closest_ancestor_next_sibling = function (b) {
								var next, parent;
								next = tree.get_next_sibling(b);
								if (next != null) {
									return next;
								} else {
									parent = tree.get_parent_branch(b);
									return tree.get_closest_ancestor_next_sibling(parent);
								}
							};
							tree.get_next_branch = function (b) {
								var next;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									next = tree.get_first_child(b);
									if (next != null) {
										return next;
									} else {
										next = tree.get_closest_ancestor_next_sibling(b);
										return next;
									}
								}
							};
							tree.select_next_branch = function (b) {
								var next;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									next = tree.get_next_branch(b);
									if (next != null) {
										tree.select_branch(next);
										return next;
									}
								}
							};
							tree.last_descendant = function (b) {
								var last_child;
								if (b == null) {
									debugger;
								}
								n = b.children.length;
								if (n === 0) {
									return b;
								} else {
									last_child = b.children[n - 1];
									return tree.last_descendant(last_child);
								}
							};
							tree.get_prev_branch = function (b) {
								var parent, prev_sibling;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									prev_sibling = tree.get_prev_sibling(b);
									if (prev_sibling != null) {
										return tree.last_descendant(prev_sibling);
									} else {
										parent = tree.get_parent_branch(b);
										return parent;
									}
								}
							};

							// 获取所有已经勾选的节点数据
							tree.get_all_selected_branch = function (b) {
								var selected_branch = [], do_f;
								if(!angular.isArray(b)){
									b = [b];
								}

								/**
								 * @description 获取所有已经勾选的节点数据
								 * @param {object} b 节点分支.
								 * @param {bool} cascadeCheck 如果为true，则父节点勾选时，附带所有子节点数据
								 *               如果为false，则所有节点数据勾选为独立状态
								 * @returns 无
								 */
								function getSelectedBranch(b, cascadeCheck){
									var i;
									if(cascadeCheck){
										for (i = 0; i < b.length; i++){
											if (b[i].selected == true){
												selected_branch.push(b[i]);
											} else {
												if (b[i].children && b[i].children.length > 0){
													getSelectedBranch(b[i].children, cascadeCheck);
												}
											}
										}
									} else {
										for (i = 0; i < b.length; i++){
											if (b[i].selected == true){
												selected_branch.push(b[i]);
											}
											if (b[i].children && b[i].children.length > 0){
												getSelectedBranch(b[i].children, cascadeCheck);
											}

										}
									}
								}

								//do_f = function (b) {
								//	var child, _i, _len, _ref;
								//	if (b.children != null) {
								//		_ref = b.children;
								//		_i = _ref.length;
								//		for (_i >= 0; _i--;) {
								//			child = _ref[_i];
								//			if (child != undefined) {
								//				if(child.selected === false){
								//					b.children.splice(_i, 1);
								//				}else if (child.selected === true && child.children.length > 0) {
								//					do_f(child);
								//				}
								//
								//				//if (child.selected === true) {
								//				//	do_f(child);
								//				//} else {
								//				//	delete b.children[_i];
								//				//}
								//			}
								//		}
								//	}
								//};
								//
								//for (var i = 0; i < root.length; i++) {
								//	if (root[i].selected === true) {
								//		do_f(root[i]);
								//	} else {
								//		//delete root[i];
								//		root.splice(i, 1);
								//	}
								//}
								getSelectedBranch(b, options.cascadeCheck);
								return selected_branch;
							};
							return tree.select_prev_branch = function (b) {
								var prev;
								if (b == null) {
									b = selected_branch;
								}
								if (b != null) {
									prev = tree.get_prev_branch(b);
									if (prev != null) {
										tree.select_branch(prev);
										return prev;
									}
								}
							};
						}
					}
				}
			};
		}
	]).directive('ngRightClick',['$parse', function($parse) {
		return{
			require:'^euiTree',
			link:function(scope,element,attrs,euitreeCtl){
                //获取tree控件的属性值
                var treeOptions = euitreeCtl.getTreeOptions();

				if(treeOptions!=null && scope.treeOptions.hasOwnProperty("menuTarget")){
					var fn = $parse(attrs.ngRightClick);
					element.bind('contextmenu', function(event) {
						scope.$apply(function() {
							event.preventDefault();
							fn(scope, {$event:event});
						});
					});
				}
			}
		}
    }]);
angular.module('eui.comboTree', ['eui.combo','eui.tree'])
    .directive('euiComboTree', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/comboTree/comboTree.html';
                },
                replace: true,
                scope: {
                    treeData: '=?',
                    treeControl: '=?',
                    //checkbox: '@',
                    options:'=?',
                    onSelect:'=',
                    disabled:"="
                },
                link: function(scope, element, attrs) {
                    var width,height,index;

                    width = attrs.width? attrs.width:"170px";
                    height = attrs.height? attrs.height:"25px";
                    scope.comboWidth = width;
                    scope.comboHeight = height;
                    scope.treeHeight = attrs.treeHeight? attrs.treeHeight:"200px";
                    if(!scope.treeData){
                        scope.treeData = [];
                    }

                    var defaultsOptions = {
                        //树数据变化之后
                        onAfterTreeDataChange:function(){
                            var data, textValue = "";
                            if(scope.options && (scope.options.checkbox === true)){
                                if (scope.treeControl && scope.treeControl.get_all_selected_branch){
                                    data = scope.treeControl.get_all_selected_branch(scope.treeData);
                                    for(var i = 0; i < data.length; i++){
                                        textValue += data[i].label+ ";" ;
                                    }
                                    scope.textValue = textValue;
                                }
                            }
                        },
                        onSelect:function(branch){
                            if(scope.options.checkbox !== true){
                                scope.textValue = branch.label;
                                $(element).children().eq(1).css("display","none");
                            }
                            if(angular.isFunction(scope.onSelect)){
                                scope.onSelect(branch);
                            }
                        }
                    };

                    scope.options = $.extend({}, defaultsOptions, scope.options);

                    $(document).bind("click",function(e){
	                    //过滤复选框事件
	                    if ( !(scope.options.checkbox === true && e.toElement.type == "checkbox")) {
		                    $(element).children().eq(1).css("display","none");
	                    }
                    });

                    scope.clickCombo = function($event){
                        $event.stopPropagation();
                        if($(element).children().eq(1).css("display") === "none"){
                            $(element).children().eq(1).css("display","block");
                        } else {
                            $(element).children().eq(1).css("display","none");
                        }
                    };

                    scope.panelStyle = {
                        "position":"absolute",
                        "z-index": "110008",
                        "display": "none",
                        "top": height,
                        "width":width,
                        "overflow": "auto"
                    };

                    scope.treeStyle = {"height": scope.treeHeight,"padding": "0"};

                    //scope.selectBranch = function(brunch){
                    //    if(scope.options.checkbox === true){
                    //        //如果选中brunch
                    //        if(brunch.selected){
                    //            if(scope.textValue === "" || scope.textValue === undefined){
                    //                scope.textValue = brunch.label;
                    //            } else {
                    //                scope.textValue = scope.textValue + "," + brunch.label;
                    //            }
                    //        } else {
                    //            if (scope.textValue ===  brunch.label){
                    //                scope.textValue = "";
                    //            } else {
                    //                textValue = scope.textValue.split(",");
                    //                index = textValue.indexOf(brunch.label);
                    //                if(index !== undefined){
                    //                    textValue.splice(index,1);
                    //                }
                    //                scope.textValue = textValue.join(",");
                    //            }
                    //        }
                    //
                    //    } else {
                    //        scope.textValue = brunch.label;
                    //        $(element).children().eq(1).css("display","none");
                    //    }
                    //
                    //    if(scope.options.checkbox !== true){
                    //        scope.textValue = brunch.label;
                    //        $(element).children().eq(1).css("display","none");
                    //    }
                    //    if(angular.isFunction(scope.onSelect)){
                    //        scope.onSelect(brunch);
                    //    }
                    //};


                    //递归函数，合成textValue值
                    //function refreshVaule (treeData){
                    //    for(var i = 0; i < treeData.length; i++){
                    //        if(treeData[i].selected){
                    //            if(scope.options.checkbox === true){
                    //                if(scope.textValue === "" || scope.textValue === undefined){
                    //                    scope.textValue = treeData[i].label;
                    //                } else {
                    //                    scope.textValue = scope.textValue + "," + treeData[i].label;
                    //                }
                    //            } else {
                    //                scope.textValue = treeData[i].label;
                    //                return;
                    //            }
                    //        } else {
                    //            if(angular.isArray(treeData[i].children) && treeData[i].children.length > 0 ){
                    //                refreshVaule (treeData[i].children);
                    //            }
                    //        }
                    //    }
                    //}
                    //
                    //function refreshData(){
                    //    if(angular.isArray(scope.treeData)){
                    //        refreshVaule(scope.treeData);
                    //    }
                    //}
                    //
                    //scope.$watch('treeData', refreshData, false);

                    scope.onClick = function(){
                        if($(element).children().eq(1).css("display") === "none"){
                            $(element).children().eq(1).css("display","block");
                        } else {
                            $(element).children().eq(1).css("display","none");
                        }
                    };

                }
            }
        }
    ]);

angular.module('eui.customnav', [])

  .controller('CustomnavController', ['$scope', '$attrs', '$timeout', '$element',
    function($scope, $attrs, $timeout, $element) {
      $scope.isOpen = false;
      $scope.showItems = [];
      var selectedItems = [];
      var noSelectedItems = [];

      var parentWidth = 0;
      var itemWidth = angular.isDefined($scope.itemWidth) ? $scope.$eval($scope.itemWidth) : 100;

      $timeout(function() {
        var parentEl = $element.parent()[0];
        parentWidth = parentEl.offsetWidth - 30;
        if (parentWidth < 0) {
          parentWidth = 800;
        }
        init();
      });

      var setShowItems = function (items) {
        $scope.showItems = [];
        var totalWidth = 0;
        for (var i = 0; i < items.length; i++) {
          if (totalWidth + itemWidth> parentWidth) {
            break;
          }
          totalWidth = totalWidth + itemWidth;
          $scope.showItems.push(items[i]);
        }
        $scope.totalWidth = totalWidth;
      };

      var init = function(){
        for (var i = 0; i < $scope.navData.length; i++) {
          if ($scope.navData[i].selected) {
            selectedItems.push($scope.navData[i]);
          } else {
            noSelectedItems.push($scope.navData[i]);
          }
        }
        setShowItems(selectedItems);
      };

      $scope.moveToggle = function(){
        $scope.isOpen = !$scope.isOpen;
        if ($scope.isOpen) {
          $scope.showItems = selectedItems.concat(noSelectedItems);

          if (itemWidth > 0) {
            var totalWidth = 0;
            while(totalWidth + itemWidth < parentWidth) {
              totalWidth = totalWidth + itemWidth;
            }
            $scope.totalWidth = totalWidth;
          } else {
            $scope.totalWidth = parentWidth * 0.9;
          }
        } else {
          setShowItems(selectedItems);
        }
      };

      $scope.selectItem = function(item) {
        if (item.selected) {
          selectedItems.splice(selectedItems.indexOf(item), 1);
          noSelectedItems.push(item);
        } else {
          noSelectedItems.splice(noSelectedItems.indexOf(item), 1);
          selectedItems.push(item);
        }

        $scope.onSelected({items: selectedItems});

        item['selected'] = !item.selected;
      }
    }])

  .directive('euiCustomnav', ['$timeout', function($timeout) {
    return {
      controller: 'CustomnavController',
      controllerAs: 'customnav',
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'template/customnav/customnav.html';
      },
      replace: true,
      scope: {
        itemWidth: '@',
        navData: '=',
        onSelected: '&'
      },
      link: function(scope, element, attrs, controller) {
        scope.$watch('isOpen', function (isOpen) {
          if (isOpen) {
            var openObj = element.find('.customnav-item div');
            openObj.css("cursor", "pointer");
          } else {
            var selectObj = element.find('.customnav-item .select');
            selectObj.css("cursor", "default");
          }
        })
      }
    };
  }]);

angular.module('eui.dateparser', [])

.service('euiDateParser', ['$log', '$locale', 'orderByFilter', function($log, $locale, orderByFilter) {
  // Pulled from https://github.com/mbostock/d3/blob/master/src/format/requote.js
  var SPECIAL_CHARACTERS_REGEXP = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

  var localeId;
  var formatCodeToRegex;

  this.init = function() {
    localeId = $locale.id;

    this.parsers = {};

    formatCodeToRegex = {
      'yyyy': {
        regex: '\\d{4}',
        apply: function(value) { this.year = +value; }
      },
      'yy': {
        regex: '\\d{2}',
        apply: function(value) { this.year = +value + 2000; }
      },
      'y': {
        regex: '\\d{1,4}',
        apply: function(value) { this.year = +value; }
      },
      'MMMM': {
        regex: $locale.DATETIME_FORMATS.MONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); }
      },
      'MMM': {
        regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
        apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); }
      },
      'MM': {
        regex: '0[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; }
      },
      'M': {
        regex: '[1-9]|1[0-2]',
        apply: function(value) { this.month = value - 1; }
      },
      'dd': {
        regex: '[0-2][0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; }
      },
      'd': {
        regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
        apply: function(value) { this.date = +value; }
      },
      'EEEE': {
        regex: $locale.DATETIME_FORMATS.DAY.join('|')
      },
      'EEE': {
        regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|')
      },
      'HH': {
        regex: '(?:0|1)[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; }
      },
      'hh': {
        regex: '0[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; }
      },
      'H': {
        regex: '1?[0-9]|2[0-3]',
        apply: function(value) { this.hours = +value; }
      },
      'h': {
        regex: '[0-9]|1[0-2]',
        apply: function(value) { this.hours = +value; }
      },
      'mm': {
        regex: '[0-5][0-9]',
        apply: function(value) { this.minutes = +value; }
      },
      'm': {
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.minutes = +value; }
      },
      'sss': {
        regex: '[0-9][0-9][0-9]',
        apply: function(value) { this.milliseconds = +value; }
      },
      'ss': {
        regex: '[0-5][0-9]',
        apply: function(value) { this.seconds = +value; }
      },
      's': {
        regex: '[0-9]|[1-5][0-9]',
        apply: function(value) { this.seconds = +value; }
      },
      'a': {
        regex: $locale.DATETIME_FORMATS.AMPMS.join('|'),
        apply: function(value) {
          if (this.hours === 12) {
            this.hours = 0;
          }

          if (value === 'PM') {
            this.hours += 12;
          }
        }
      }
    };
  };

  this.init();

  function createParser(format) {
    var map = [], regex = format.split('');

    angular.forEach(formatCodeToRegex, function(data, code) {
      var index = format.indexOf(code);

      if (index > -1) {
        format = format.split('');

        regex[index] = '(' + data.regex + ')';
        format[index] = '$'; // Custom symbol to define consumed part of format
        for (var i = index + 1, n = index + code.length; i < n; i++) {
          regex[i] = '';
          format[i] = '$';
        }
        format = format.join('');

        map.push({ index: index, apply: data.apply });
      }
    });

    return {
      regex: new RegExp('^' + regex.join('') + '$'),
      map: orderByFilter(map, 'index')
    };
  }

  this.parse = function(input, format, baseDate) {
    if (!angular.isString(input) || !format) {
      return input;
    }

    format = $locale.DATETIME_FORMATS[format] || format;
    format = format.replace(SPECIAL_CHARACTERS_REGEXP, '\\$&');

    if ($locale.id !== localeId) {
      this.init();
    }

    if (!this.parsers[format]) {
      this.parsers[format] = createParser(format);
    }

    var parser = this.parsers[format],
        regex = parser.regex,
        map = parser.map,
        results = input.match(regex);

    if (results && results.length) {
      var fields, dt;
      if (angular.isDate(baseDate) && !isNaN(baseDate.getTime())) {
        fields = {
          year: baseDate.getFullYear(),
          month: baseDate.getMonth(),
          date: baseDate.getDate(),
          hours: baseDate.getHours(),
          minutes: baseDate.getMinutes(),
          seconds: baseDate.getSeconds(),
          milliseconds: baseDate.getMilliseconds()
        };
      } else {
        if (baseDate) {
          $log.warn('dateparser:', 'baseDate is not a valid date');
        }
        fields = { year: 1900, month: 0, date: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
      }

      for (var i = 1, n = results.length; i < n; i++) {
        var mapper = map[i-1];
        if (mapper.apply) {
          mapper.apply.call(fields, results[i]);
        }
      }

      if (isValid(fields.year, fields.month, fields.date)) {
        dt = new Date(fields.year, fields.month, fields.date,
          fields.hours, fields.minutes, fields.seconds,
          fields.milliseconds || 0);
      }

      return dt;
    }
  };

  // Check if date is valid for specific month (and year for February).
  // Month: 0 = Jan, 1 = Feb, etc
  function isValid(year, month, date) {
    if (date < 1) {
      return false;
    }

    if (month === 1 && date > 28) {
      return date === 29 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }

    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return date < 31;
    }

    return true;
  }
}]);

/* Deprecated dateparser below */

angular.module('eui.dateparser')

.value('$dateParserSuppressWarning', false)

.service('dateParser', ['$log', '$dateParserSuppressWarning', 'euiDateParser', function($log, $dateParserSuppressWarning, euiDateParser) {
  if (!$dateParserSuppressWarning) {
    $log.warn('dateParser is now deprecated. Use euiDateParser instead.');
  }

  angular.extend(this, euiDateParser);
}]);

angular.module('eui.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$euiPosition', ['$document', '$window', function($document, $window) {
    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function(element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function(element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function(element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      },

      /**
       * Provides coordinates for the targetEl in relation to hostEl
       */
      positionElements: function(hostEl, targetEl, positionStr, appendToBody) {
        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

        var hostElPos,
          targetElWidth,
          targetElHeight,
          targetElPos;

        hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

        targetElWidth = targetEl.prop('offsetWidth');
        targetElHeight = targetEl.prop('offsetHeight');

        var shiftWidth = {
          center: function() {
            return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
          },
          left: function() {
            return hostElPos.left;
          },
          right: function() {
            return hostElPos.left + hostElPos.width;
          }
        };

        var shiftHeight = {
          center: function() {
            return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
          },
          top: function() {
            return hostElPos.top;
          },
          bottom: function() {
            return hostElPos.top + hostElPos.height;
          }
        };

        switch (pos0) {
          case 'right':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: shiftWidth[pos0]()
            };
            break;
          case 'left':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: hostElPos.left - targetElWidth
            };
            break;
          case 'bottom':
            targetElPos = {
              top: shiftHeight[pos0](),
              left: shiftWidth[pos1]()
            };
            break;
          default:
            targetElPos = {
              top: hostElPos.top - targetElHeight,
              left: shiftWidth[pos1]()
            };
            break;
        }

        return targetElPos;
      }
    };
  }]);

/* Deprecated position below */

angular.module('eui.position')

.value('$positionSuppressWarning', false)

.service('$position', ['$log', '$positionSuppressWarning', '$euiPosition', function($log, $positionSuppressWarning, $euiPosition) {
  if (!$positionSuppressWarning) {
    $log.warn('$position is now deprecated. Use $euiPosition instead.');
  }

  angular.extend(this, $euiPosition);
}]);

angular.module('eui.datepicker', ['eui.dateparser', 'eui.position'])

.value('$datepickerSuppressError', false)

.constant('euiDatepickerConfig', {
  formatDay: 'dd',
  formatMonth: 'MMMM',
  formatYear: 'yyyy',
  formatDayHeader: 'EEE',
  formatDayTitle: 'MMMM yyyy',
  formatMonthTitle: 'yyyy',
  datepickerMode: 'day',
  minMode: 'day',
  maxMode: 'year',
  showWeeks: true,
  startingDay: 0,
  yearRange: 20,
  minDate: null,
  maxDate: null,
  shortcutPropagation: false
})

.controller('EuiDatepickerController', ['$scope', '$attrs', '$parse', '$interpolate', '$log', 'dateFilter', 'euiDatepickerConfig', '$datepickerSuppressError', function($scope, $attrs, $parse, $interpolate, $log, dateFilter, datepickerConfig, $datepickerSuppressError) {
  var self = this,
      ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl;

  // Modes chain
  this.modes = ['day', 'month', 'year'];

  // Configuration attributes
  angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader', 'formatDayTitle', 'formatMonthTitle',
                   'showWeeks', 'startingDay', 'yearRange', 'shortcutPropagation'], function(key, index) {
    self[key] = angular.isDefined($attrs[key]) ? (index < 6 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) : datepickerConfig[key];
  });

  // Watchable date attributes
  angular.forEach(['minDate', 'maxDate'], function(key) {
    if ($attrs[key]) {
      $scope.$parent.$watch($parse($attrs[key]), function(value) {
        self[key] = value ? new Date(value) : null;
        self.refreshView();
      });
    } else {
      self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
    }
  });

  angular.forEach(['minMode', 'maxMode'], function(key) {
    if ($attrs[key]) {
      $scope.$parent.$watch($parse($attrs[key]), function(value) {
        self[key] = angular.isDefined(value) ? value : $attrs[key];
        $scope[key] = self[key];
        if ((key == 'minMode' && self.modes.indexOf($scope.datepickerMode) < self.modes.indexOf(self[key])) || (key == 'maxMode' && self.modes.indexOf($scope.datepickerMode) > self.modes.indexOf(self[key]))) {
          $scope.datepickerMode = self[key];
        }
      });
    } else {
      self[key] = datepickerConfig[key] || null;
      $scope[key] = self[key];
    }
  });

  $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;
  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

  if (angular.isDefined($attrs.initDate)) {
    this.activeDate = $scope.$parent.$eval($attrs.initDate) || new Date();
    $scope.$parent.$watch($attrs.initDate, function(initDate) {
      if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)) {
        self.activeDate = initDate;
        self.refreshView();
      }
    });
  } else {
    this.activeDate = new Date();
  }

  $scope.isActive = function(dateObject) {
    if (self.compare(dateObject.date, self.activeDate) === 0) {
      $scope.activeDateId = dateObject.uid;
      return true;
    }
    return false;
  };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;

    ngModelCtrl.$render = function() {
      self.render();
    };
  };

  this.render = function() {
    if (ngModelCtrl.$viewValue) {
      var date = new Date(ngModelCtrl.$viewValue),
          isValid = !isNaN(date);

      if (isValid) {
        this.activeDate = date;
      } else if (!$datepickerSuppressError) {
        $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
      }
    }
    this.refreshView();
  };

  this.refreshView = function() {
    if (this.element) {
      this._refreshView();

      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
      ngModelCtrl.$setValidity('dateDisabled', !date || (this.element && !this.isDisabled(date)));
    }
  };

  this.createDateObject = function(date, format) {
    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
    return {
      date: date,
      label: dateFilter(date, format),
      selected: model && this.compare(date, model) === 0,
      disabled: this.isDisabled(date),
      current: this.compare(date, new Date()) === 0,
      customClass: this.customClass(date)
    };
  };

  this.isDisabled = function(date) {
    return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0) || ($attrs.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode})));
  };

  this.customClass = function(date) {
    return $scope.customClass({date: date, mode: $scope.datepickerMode});
  };

  // Split array into smaller arrays
  this.split = function(arr, size) {
    var arrays = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  };

  // Fix a hard-reprodusible bug with timezones
  // The bug depends on OS, browser, current timezone and current date
  // i.e.
  // var date = new Date(2014, 0, 1);
  // console.log(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
  // can result in "2013 11 31 23" because of the bug.
  this.fixTimeZone = function(date) {
    var hours = date.getHours();
    date.setHours(hours === 23 ? hours + 2 : 0);
  };

  $scope.select = function(date) {
    if ($scope.datepickerMode === self.minMode) {
      var dt = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : new Date(0, 0, 0, 0, 0, 0, 0);
      dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      ngModelCtrl.$setViewValue(dt);
      ngModelCtrl.$render();
    } else {
      self.activeDate = date;
      $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) - 1];
    }
  };

  $scope.move = function(direction) {
    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
        month = self.activeDate.getMonth() + direction * (self.step.months || 0);
    self.activeDate.setFullYear(year, month, 1);
    self.refreshView();
  };

  $scope.toggleMode = function(direction) {
    direction = direction || 1;

    if (($scope.datepickerMode === self.maxMode && direction === 1) || ($scope.datepickerMode === self.minMode && direction === -1)) {
      return;
    }

    $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) + direction];
  };

  // Key event mapper
  $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

  var focusElement = function() {
    self.element[0].focus();
  };

  // Listen for focus requests from popup directive
  $scope.$on('eui:datepicker.focus', focusElement);

  $scope.keydown = function(evt) {
    var key = $scope.keys[evt.which];

    if (!key || evt.shiftKey || evt.altKey) {
      return;
    }

    evt.preventDefault();
    if (!self.shortcutPropagation) {
      evt.stopPropagation();
    }

    if (key === 'enter' || key === 'space') {
      if (self.isDisabled(self.activeDate)) {
        return; // do nothing
      }
      $scope.select(self.activeDate);
    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
      $scope.toggleMode(key === 'up' ? 1 : -1);
    } else {
      self.handleKeyDown(key, evt);
      self.refreshView();
    }
  };
}])

.controller('EuiDaypickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  this.step = { months: 1 };
  this.element = $element;
  function getDaysInMonth(year, month) {
    return ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
  }

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    scope.showWeeks = ctrl.showWeeks;
    ctrl.refreshView();
  };

  this.getDates = function(startDate, n) {
    var dates = new Array(n), current = new Date(startDate), i = 0, date;
    while (i < n) {
      date = new Date(current);
      this.fixTimeZone(date);
      dates[i++] = date;
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  this._refreshView = function() {
    var year = this.activeDate.getFullYear(),
      month = this.activeDate.getMonth(),
      firstDayOfMonth = new Date(year, month, 1),
      difference = this.startingDay - firstDayOfMonth.getDay(),
      numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : - difference,
      firstDate = new Date(firstDayOfMonth);

    if (numDisplayedFromPreviousMonth > 0) {
      firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
    }

    // 42 is the number of days on a six-month calendar
    var days = this.getDates(firstDate, 42);
    for (var i = 0; i < 42; i ++) {
      days[i] = angular.extend(this.createDateObject(days[i], this.formatDay), {
        secondary: days[i].getMonth() !== month,
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.labels = new Array(7);
    for (var j = 0; j < 7; j++) {
      scope.labels[j] = {
        abbr: dateFilter(days[j].date, this.formatDayHeader),
        full: dateFilter(days[j].date, 'EEEE')
      };
    }

    scope.title = dateFilter(this.activeDate, this.formatDayTitle);
    scope.rows = this.split(days, 7);

    if (scope.showWeeks) {
      scope.weekNumbers = [];
      var thursdayIndex = (4 + 7 - this.startingDay) % 7,
          numWeeks = scope.rows.length;
      for (var curWeek = 0; curWeek < numWeeks; curWeek++) {
        scope.weekNumbers.push(
          getISO8601WeekNumber(scope.rows[curWeek][thursdayIndex].date));
      }
    }
  };

  this.compare = function(date1, date2) {
    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
  };

  function getISO8601WeekNumber(date) {
    var checkDate = new Date(date);
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)); // Thursday
    var time = checkDate.getTime();
    checkDate.setMonth(0); // Compare with Jan 1
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
  }

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getDate();

    if (key === 'left') {
      date = date - 1;   // up
    } else if (key === 'up') {
      date = date - 7;   // down
    } else if (key === 'right') {
      date = date + 1;   // down
    } else if (key === 'down') {
      date = date + 7;
    } else if (key === 'pageup' || key === 'pagedown') {
      var month = this.activeDate.getMonth() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setMonth(month, 1);
      date = Math.min(getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth()), date);
    } else if (key === 'home') {
      date = 1;
    } else if (key === 'end') {
      date = getDaysInMonth(this.activeDate.getFullYear(), this.activeDate.getMonth());
    }
    this.activeDate.setDate(date);
  };
}])

.controller('EuiMonthpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  this.step = { years: 1 };
  this.element = $element;

  this.init = function(ctrl) {
    angular.extend(ctrl, this);
    ctrl.refreshView();
  };

  this._refreshView = function() {
    var months = new Array(12),
        year = this.activeDate.getFullYear(),
        date;

    for (var i = 0; i < 12; i++) {
      date = new Date(year, i, 1);
      this.fixTimeZone(date);
      months[i] = angular.extend(this.createDateObject(date, this.formatMonth), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = dateFilter(this.activeDate, this.formatMonthTitle);
    scope.rows = this.split(months, 3);
  };

  this.compare = function(date1, date2) {
    return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getMonth();

    if (key === 'left') {
      date = date - 1;   // up
    } else if (key === 'up') {
      date = date - 3;   // down
    } else if (key === 'right') {
      date = date + 1;   // down
    } else if (key === 'down') {
      date = date + 3;
    } else if (key === 'pageup' || key === 'pagedown') {
      var year = this.activeDate.getFullYear() + (key === 'pageup' ? - 1 : 1);
      this.activeDate.setFullYear(year);
    } else if (key === 'home') {
      date = 0;
    } else if (key === 'end') {
      date = 11;
    }
    this.activeDate.setMonth(date);
  };
}])

.controller('EuiYearpickerController', ['$scope', '$element', 'dateFilter', function(scope, $element, dateFilter) {
  var range;
  this.element = $element;

  function getStartingYear(year) {
    return parseInt((year - 1) / range, 10) * range + 1;
  }

  this.yearpickerInit = function() {
    range = this.yearRange;
    this.step = { years: range };
  };

  this._refreshView = function() {
    var years = new Array(range), date;

    for (var i = 0, start = getStartingYear(this.activeDate.getFullYear()); i < range; i++) {
      date = new Date(start + i, 0, 1);
      this.fixTimeZone(date);
      years[i] = angular.extend(this.createDateObject(date, this.formatYear), {
        uid: scope.uniqueId + '-' + i
      });
    }

    scope.title = [years[0].label, years[range - 1].label].join(' - ');
    scope.rows = this.split(years, 5);
  };

  this.compare = function(date1, date2) {
    return date1.getFullYear() - date2.getFullYear();
  };

  this.handleKeyDown = function(key, evt) {
    var date = this.activeDate.getFullYear();

    if (key === 'left') {
      date = date - 1;   // up
    } else if (key === 'up') {
      date = date - 5;   // down
    } else if (key === 'right') {
      date = date + 1;   // down
    } else if (key === 'down') {
      date = date + 5;
    } else if (key === 'pageup' || key === 'pagedown') {
      date += (key === 'pageup' ? - 1 : 1) * this.step.years;
    } else if (key === 'home') {
      date = getStartingYear(this.activeDate.getFullYear());
    } else if (key === 'end') {
      date = getStartingYear(this.activeDate.getFullYear()) + range - 1;
    }
    this.activeDate.setFullYear(date);
  };
}])

.directive('euiDatepicker', function() {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/datepicker.html';
    },
    scope: {
      datepickerMode: '=?',
      dateDisabled: '&',
      customClass: '&',
      shortcutPropagation: '&?'
    },
    require: ['euiDatepicker', '^ngModel'],
    controller: 'EuiDatepickerController',
    controllerAs: 'datepicker',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      datepickerCtrl.init(ngModelCtrl);
    }
  };
})

.directive('euiDaypicker', function() {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/day.html';
    },
    require: ['^?euiDatepicker', 'euiDaypicker', '^?datepicker'],
    controller: 'EuiDaypickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0] || ctrls[2],
        daypickerCtrl = ctrls[1];

      daypickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('euiMonthpicker', function() {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/month.html';
    },
    require: ['^?euiDatepicker', 'euiMonthpicker', '^?datepicker'],
    controller: 'EuiMonthpickerController',
    link: function(scope, element, attrs, ctrls) {
      var datepickerCtrl = ctrls[0] || ctrls[2],
        monthpickerCtrl = ctrls[1];

      monthpickerCtrl.init(datepickerCtrl);
    }
  };
})

.directive('euiYearpicker', function() {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/year.html';
    },
    require: ['^?euiDatepicker', 'euiYearpicker', '^?datepicker'],
    controller: 'EuiYearpickerController',
    link: function(scope, element, attrs, ctrls) {
      var ctrl = ctrls[0] || ctrls[2];
      angular.extend(ctrl, ctrls[1]);
      ctrl.yearpickerInit();

      ctrl.refreshView();
    }
  };
})

.constant('euiDatepickerPopupConfig', {
  datepickerPopup: 'yyyy-MM-dd',
  datepickerPopupTemplateUrl: 'template/datepicker/popup.html',
  datepickerTemplateUrl: 'template/datepicker/datepicker.html',
  html5Types: {
    date: 'yyyy-MM-dd',
    'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
    'month': 'yyyy-MM'
  },
  currentText: 'Today',
  clearText: 'Clear',
  closeText: 'Done',
  closeOnDateSelection: true,
  appendToBody: false,
  showButtonBar: true,
  onOpenFocus: true
})

.controller('EuiDatepickerPopupController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$document', '$rootScope', '$euiPosition', 'dateFilter', 'euiDateParser', 'euiDatepickerPopupConfig', '$timeout',
function(scope, element, attrs, $compile, $parse, $document, $rootScope, $position, dateFilter, dateParser, datepickerPopupConfig, $timeout) {
  var self = this;
  var cache = {},
    isHtml5DateInput = false;
  var dateFormat, closeOnDateSelection, appendToBody, onOpenFocus,
    datepickerPopupTemplateUrl, datepickerTemplateUrl, popupEl, datepickerEl,
    ngModel, $popup;

  scope.watchData = {};

  this.init = function(_ngModel_) {
    ngModel = _ngModel_;
    closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$parent.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection;
    appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? scope.$parent.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody;
    onOpenFocus = angular.isDefined(attrs.onOpenFocus) ? scope.$parent.$eval(attrs.onOpenFocus) : datepickerPopupConfig.onOpenFocus;
    datepickerPopupTemplateUrl = angular.isDefined(attrs.datepickerPopupTemplateUrl) ? attrs.datepickerPopupTemplateUrl : datepickerPopupConfig.datepickerPopupTemplateUrl;
    datepickerTemplateUrl = angular.isDefined(attrs.datepickerTemplateUrl) ? attrs.datepickerTemplateUrl : datepickerPopupConfig.datepickerTemplateUrl;

    scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? scope.$parent.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;

    if (datepickerPopupConfig.html5Types[attrs.type]) {
      dateFormat = datepickerPopupConfig.html5Types[attrs.type];
      isHtml5DateInput = true;
    } else {
      dateFormat = attrs.datepickerPopup || attrs.euiDatepickerPopup || datepickerPopupConfig.datepickerPopup;
      attrs.$observe('euiDatepickerPopup', function(value, oldValue) {
          var newDateFormat = value || datepickerPopupConfig.datepickerPopup;
          // Invalidate the $modelValue to ensure that formatters re-run
          // FIXME: Refactor when PR is merged: https://github.com/angular/angular.js/pull/10764
          if (newDateFormat !== dateFormat) {
            dateFormat = newDateFormat;
            ngModel.$modelValue = null;

            if (!dateFormat) {
              throw new Error('euiDatepickerPopup must have a date format specified.');
            }
          }
      });
    }

    if (!dateFormat) {
      throw new Error('euiDatepickerPopup must have a date format specified.');
    }

    if (isHtml5DateInput && attrs.datepickerPopup) {
      throw new Error('HTML5 date input types do not support custom formats.');
    }

    // popup element used to display calendar
    popupEl = angular.element('<div eui-datepicker-popup-wrap><div eui-datepicker></div></div>');
    popupEl.attr({
      'ng-model': 'date',
      'ng-change': 'dateSelection(date)',
      'template-url': datepickerPopupTemplateUrl
    });

    // datepicker element
    datepickerEl = angular.element(popupEl.children()[0]);
    datepickerEl.attr('template-url', datepickerTemplateUrl);

    if (isHtml5DateInput) {
      if (attrs.type === 'month') {
        datepickerEl.attr('datepicker-mode', '"month"');
        datepickerEl.attr('min-mode', 'month');
      }
    }

    if (attrs.datepickerOptions) {
      var options = scope.$parent.$eval(attrs.datepickerOptions);
      if (options && options.initDate) {
        scope.initDate = options.initDate;
        datepickerEl.attr('init-date', 'initDate');
        delete options.initDate;
      }
      angular.forEach(options, function(value, option) {
        datepickerEl.attr(cameltoDash(option), value);
      });
    }

    angular.forEach(['minMode', 'maxMode', 'minDate', 'maxDate', 'datepickerMode', 'initDate', 'shortcutPropagation'], function(key) {
      if (attrs[key]) {
        var getAttribute = $parse(attrs[key]);
        scope.$parent.$watch(getAttribute, function(value) {
          scope.watchData[key] = value;
          if (key === 'minDate' || key === 'maxDate') {
            cache[key] = new Date(value);
          }
        });
        datepickerEl.attr(cameltoDash(key), 'watchData.' + key);

        // Propagate changes from datepicker to outside
        if (key === 'datepickerMode') {
          var setAttribute = getAttribute.assign;
          scope.$watch('watchData.' + key, function(value, oldvalue) {
            if (angular.isFunction(setAttribute) && value !== oldvalue) {
              setAttribute(scope.$parent, value);
            }
          });
        }
      }
    });
    if (attrs.dateDisabled) {
      datepickerEl.attr('date-disabled', 'dateDisabled({ date: date, mode: mode })');
    }

    if (attrs.showWeeks) {
      datepickerEl.attr('show-weeks', attrs.showWeeks);
    }

    if (attrs.customClass) {
      datepickerEl.attr('custom-class', 'customClass({ date: date, mode: mode })');
    }

    if (!isHtml5DateInput) {
      // Internal API to maintain the correct ng-invalid-[key] class
      ngModel.$$parserName = 'date';
      ngModel.$validators.date = validator;
      ngModel.$parsers.unshift(parseDate);
      ngModel.$formatters.push(function(value) {
        scope.date = value;
        return ngModel.$isEmpty(value) ? value : dateFilter(value, dateFormat);
      });
    } else {
      ngModel.$formatters.push(function(value) {
        scope.date = value;
        return value;
      });
    }

    // Detect changes in the view from the text box
    ngModel.$viewChangeListeners.push(function() {
      scope.date = dateParser.parse(ngModel.$viewValue, dateFormat, scope.date);
    });

    element.bind('keydown', inputKeydownBind);

    $popup = $compile(popupEl)(scope);
    // Prevent jQuery cache memory leak (template is now redundant after linking)
    popupEl.remove();

    if (appendToBody) {
      $document.find('body').append($popup);
    } else {
      element.after($popup);
    }

    scope.$on('$destroy', function() {
      if (scope.isOpen === true) {
        if (!$rootScope.$$phase) {
          scope.$apply(function() {
            scope.isOpen = false;
          });
        }
      }

      $popup.remove();
      element.unbind('keydown', inputKeydownBind);
      $document.unbind('click', documentClickBind);
    });
  };

  scope.getText = function(key) {
    return scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
  };

  scope.isDisabled = function(date) {
    if (date === 'today') {
      date = new Date();
    }

    return ((scope.watchData.minDate && scope.compare(date, cache.minDate) < 0) ||
      (scope.watchData.maxDate && scope.compare(date, cache.maxDate) > 0));
  };

  scope.compare = function(date1, date2) {
    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
  };

  // Inner change
  scope.dateSelection = function(dt) {
    if (angular.isDefined(dt)) {
      scope.date = dt;
    }
    var date = scope.date ? dateFilter(scope.date, dateFormat) : null; // Setting to NULL is necessary for form validators to function
    element.val(date);
    ngModel.$setViewValue(date);

    if (closeOnDateSelection) {
      scope.isOpen = false;
      element[0].focus();
    }
  };

  scope.keydown = function(evt) {
    if (evt.which === 27) {
      scope.isOpen = false;
      element[0].focus();
    }
  };

  scope.select = function(date) {
    if (date === 'today') {
      var today = new Date();
      if (angular.isDate(scope.date)) {
        date = new Date(scope.date);
        date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
      } else {
        date = new Date(today.setHours(0, 0, 0, 0));
      }
    }
    scope.dateSelection(date);
  };

  scope.close = function() {
    scope.isOpen = false;
    element[0].focus();
  };

  scope.$watch('isOpen', function(value) {
    if (value) {
      scope.position = appendToBody ? $position.offset(element) : $position.position(element);
      scope.position.top = scope.position.top + element.prop('offsetHeight');

      $timeout(function() {
        if (onOpenFocus) {
          scope.$broadcast('eui:datepicker.focus');
        }
        $document.bind('click', documentClickBind);
      }, 0, false);
    } else {
      $document.unbind('click', documentClickBind);
    }
  });

  function cameltoDash(string) {
    return string.replace(/([A-Z])/g, function($1) { return '-' + $1.toLowerCase(); });
  }

  function parseDate(viewValue) {
    if (angular.isNumber(viewValue)) {
      // presumably timestamp to date object
      viewValue = new Date(viewValue);
    }

    if (!viewValue) {
      return null;
    } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
      return viewValue;
    } else if (angular.isString(viewValue)) {
      var date = dateParser.parse(viewValue, dateFormat, scope.date);
      if (isNaN(date)) {
        return undefined;
      } else {
        return date;
      }
    } else {
      return undefined;
    }
  }

  function validator(modelValue, viewValue) {
    var value = modelValue || viewValue;

    if (!attrs.ngRequired && !value) {
      return true;
    }

    if (angular.isNumber(value)) {
      value = new Date(value);
    }
    if (!value) {
      return true;
    } else if (angular.isDate(value) && !isNaN(value)) {
      return true;
    } else if (angular.isString(value)) {
      var date = dateParser.parse(value, dateFormat);
      return !isNaN(date);
    } else {
      return false;
    }
  }

  function documentClickBind(event) {
    var popup = $popup[0];
    var dpContainsTarget = element[0].contains(event.target);
    // The popup node may not be an element node
    // In some browsers (IE) only element nodes have the 'contains' function
    var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
    if (scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
      scope.$apply(function() {
        scope.isOpen = false;
      });
    }
  }

  function inputKeydownBind(evt) {
    if (evt.which === 27 && scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      scope.$apply(function() {
        scope.isOpen = false;
      });
      element[0].focus();
    } else if (evt.which === 40 && !scope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      scope.$apply(function() {
        scope.isOpen = true;
      });
    }
  }
}])

.directive('euiDatepickerPopup', function() {
  return {
    require: ['ngModel', 'euiDatepickerPopup'],
    controller: 'EuiDatepickerPopupController',
    scope: {
      isOpen: '=?',
      currentText: '@',
      clearText: '@',
      closeText: '@',
      dateDisabled: '&',
      customClass: '&'
    },
    link: function(scope, element, attrs, ctrls) {
      var ngModel = ctrls[0],
        ctrl = ctrls[1];

      ctrl.init(ngModel);
    }
  };
})

.directive('euiDatepickerPopupWrap', function() {
  return {
    replace: true,
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/popup.html';
    }
  };
});

/* Deprecated datepicker below */

angular.module('eui.datepicker')

.value('$datepickerSuppressWarning', false)

.controller('DatepickerController', ['$scope', '$attrs', '$parse', '$interpolate', '$log', 'dateFilter', 'euiDatepickerConfig', '$datepickerSuppressError', '$datepickerSuppressWarning', function($scope, $attrs, $parse, $interpolate, $log, dateFilter, datepickerConfig, $datepickerSuppressError, $datepickerSuppressWarning) {
  if (!$datepickerSuppressWarning) {
    $log.warn('DatepickerController is now deprecated. Use EuiDatepickerController instead.');
  }

  var self = this,
    ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl;

  this.modes = ['day', 'month', 'year'];

  angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader', 'formatDayTitle', 'formatMonthTitle',
    'showWeeks', 'startingDay', 'yearRange', 'shortcutPropagation'], function(key, index) {
    self[key] = angular.isDefined($attrs[key]) ? (index < 6 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) : datepickerConfig[key];
  });

  angular.forEach(['minDate', 'maxDate'], function(key) {
    if ($attrs[key]) {
      $scope.$parent.$watch($parse($attrs[key]), function(value) {
        self[key] = value ? new Date(value) : null;
        self.refreshView();
      });
    } else {
      self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
    }
  });

  angular.forEach(['minMode', 'maxMode'], function(key) {
    if ($attrs[key]) {
      $scope.$parent.$watch($parse($attrs[key]), function(value) {
        self[key] = angular.isDefined(value) ? value : $attrs[key];
        $scope[key] = self[key];
        if ((key == 'minMode' && self.modes.indexOf($scope.datepickerMode) < self.modes.indexOf(self[key])) || (key == 'maxMode' && self.modes.indexOf($scope.datepickerMode) > self.modes.indexOf(self[key]))) {
          $scope.datepickerMode = self[key];
        }
      });
    } else {
      self[key] = datepickerConfig[key] || null;
      $scope[key] = self[key];
    }
  });

  $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;
  $scope.uniqueId = 'datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);

  if (angular.isDefined($attrs.initDate)) {
    this.activeDate = $scope.$parent.$eval($attrs.initDate) || new Date();
    $scope.$parent.$watch($attrs.initDate, function(initDate) {
      if (initDate && (ngModelCtrl.$isEmpty(ngModelCtrl.$modelValue) || ngModelCtrl.$invalid)) {
        self.activeDate = initDate;
        self.refreshView();
      }
    });
  } else {
    this.activeDate = new Date();
  }

  $scope.isActive = function(dateObject) {
    if (self.compare(dateObject.date, self.activeDate) === 0) {
      $scope.activeDateId = dateObject.uid;
      return true;
    }
    return false;
  };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;

    ngModelCtrl.$render = function() {
      self.render();
    };
  };

  this.render = function() {
    if (ngModelCtrl.$viewValue) {
      var date = new Date(ngModelCtrl.$viewValue),
        isValid = !isNaN(date);

      if (isValid) {
        this.activeDate = date;
      } else if (!$datepickerSuppressError) {
        $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
      }
    }
    this.refreshView();
  };

  this.refreshView = function() {
    if (this.element) {
      this._refreshView();

      var date = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
      ngModelCtrl.$setValidity('dateDisabled', !date || (this.element && !this.isDisabled(date)));
    }
  };

  this.createDateObject = function(date, format) {
    var model = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : null;
    return {
      date: date,
      label: dateFilter(date, format),
      selected: model && this.compare(date, model) === 0,
      disabled: this.isDisabled(date),
      current: this.compare(date, new Date()) === 0,
      customClass: this.customClass(date)
    };
  };

  this.isDisabled = function(date) {
    return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0) || ($attrs.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode})));
  };

  this.customClass = function(date) {
    return $scope.customClass({date: date, mode: $scope.datepickerMode});
  };

  // Split array into smaller arrays
  this.split = function(arr, size) {
    var arrays = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  };

  this.fixTimeZone = function(date) {
    var hours = date.getHours();
    date.setHours(hours === 23 ? hours + 2 : 0);
  };

  $scope.select = function(date) {
    if ($scope.datepickerMode === self.minMode) {
      var dt = ngModelCtrl.$viewValue ? new Date(ngModelCtrl.$viewValue) : new Date(0, 0, 0, 0, 0, 0, 0);
      dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      ngModelCtrl.$setViewValue(dt);
      ngModelCtrl.$render();
    } else {
      self.activeDate = date;
      $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) - 1];
    }
  };

  $scope.move = function(direction) {
    var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
      month = self.activeDate.getMonth() + direction * (self.step.months || 0);
    self.activeDate.setFullYear(year, month, 1);
    self.refreshView();
  };

  $scope.toggleMode = function(direction) {
    direction = direction || 1;

    if (($scope.datepickerMode === self.maxMode && direction === 1) || ($scope.datepickerMode === self.minMode && direction === -1)) {
      return;
    }

    $scope.datepickerMode = self.modes[self.modes.indexOf($scope.datepickerMode) + direction];
  };

  // Key event mapper
  $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

  var focusElement = function() {
    self.element[0].focus();
  };

  $scope.$on('eui:datepicker.focus', focusElement);

  $scope.keydown = function(evt) {
    var key = $scope.keys[evt.which];

    if (!key || evt.shiftKey || evt.altKey) {
      return;
    }

    evt.preventDefault();
    if (!self.shortcutPropagation) {
      evt.stopPropagation();
    }

    if (key === 'enter' || key === 'space') {
      if (self.isDisabled(self.activeDate)) {
        return; // do nothing
      }
      $scope.select(self.activeDate);
    } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
      $scope.toggleMode(key === 'up' ? 1 : -1);
    } else {
      self.handleKeyDown(key, evt);
      self.refreshView();
    }
  };
}])

.directive('datepicker', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/datepicker.html';
    },
    scope: {
      datepickerMode: '=?',
      dateDisabled: '&',
      customClass: '&',
      shortcutPropagation: '&?'
    },
    require: ['datepicker', '^ngModel'],
    controller: 'DatepickerController',
    controllerAs: 'datepicker',
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('datepicker is now deprecated. Use eui-datepicker instead.');
      }

      var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      datepickerCtrl.init(ngModelCtrl);
    }
  };
}])

.directive('daypicker', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    templateUrl: 'template/datepicker/day.html',
    require: ['^datepicker', 'daypicker'],
    controller: 'EuiDaypickerController',
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('daypicker is now deprecated. Use eui-daypicker instead.');
      }

      var datepickerCtrl = ctrls[0],
        daypickerCtrl = ctrls[1];

      daypickerCtrl.init(datepickerCtrl);
    }
  };
}])

.directive('monthpicker', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    templateUrl: 'template/datepicker/month.html',
    require: ['^datepicker', 'monthpicker'],
    controller: 'EuiMonthpickerController',
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('monthpicker is now deprecated. Use eui-monthpicker instead.');
      }

      var datepickerCtrl = ctrls[0],
        monthpickerCtrl = ctrls[1];

      monthpickerCtrl.init(datepickerCtrl);
    }
  };
}])

.directive('yearpicker', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    templateUrl: 'template/datepicker/year.html',
    require: ['^datepicker', 'yearpicker'],
    controller: 'EuiYearpickerController',
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('yearpicker is now deprecated. Use eui-yearpicker instead.');
      }

      var ctrl = ctrls[0];
      angular.extend(ctrl, ctrls[1]);
      ctrl.yearpickerInit();

      ctrl.refreshView();
    }
  };
}])

.directive('datepickerPopup', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    require: ['ngModel', 'datepickerPopup'],
    controller: 'EuiDatepickerPopupController',
    scope: {
      isOpen: '=?',
      currentText: '@',
      clearText: '@',
      closeText: '@',
      dateDisabled: '&',
      customClass: '&'
    },
    link: function(scope, element, attrs, ctrls) {
      if (!$datepickerSuppressWarning) {
        $log.warn('datepicker-popup is now deprecated. Use eui-datepicker-popup instead.');
      }

      var ngModel = ctrls[0],
        ctrl = ctrls[1];

      ctrl.init(ngModel);
    }
  };
}])

.directive('datepickerPopupWrap', ['$log', '$datepickerSuppressWarning', function($log, $datepickerSuppressWarning) {
  return {
    replace: true,
    transclude: true,
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/datepicker/popup.html';
    },
    link: function() {
      if (!$datepickerSuppressWarning) {
        $log.warn('datepicker-popup-wrap is now deprecated. Use eui-datepicker-popup-wrap instead.');
      }
    }
  };
}]);

angular.module('eui.dropdown', ['eui.position'])

.constant('euiDropdownConfig', {
  openClass: 'open'
})

.service('euiDropdownService', ['$document', '$rootScope', function($document, $rootScope) {
  var openScope = null;

  this.open = function(dropdownScope) {
    if (!openScope) {
      $document.bind('click', closeDropdown);
      $document.bind('keydown', keybindFilter);
    }

    if (openScope && openScope !== dropdownScope) {
      openScope.isOpen = false;
    }

    openScope = dropdownScope;
  };

  this.close = function(dropdownScope) {
    if (openScope === dropdownScope) {
      openScope = null;
      $document.unbind('click', closeDropdown);
      $document.unbind('keydown', keybindFilter);
    }
  };

  var closeDropdown = function(evt) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope) { return; }

    if (evt && openScope.getAutoClose() === 'disabled')  { return ; }

    var toggleElement = openScope.getToggleElement();
    if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
      return;
    }

    var dropdownElement = openScope.getDropdownElement();
    if (evt && openScope.getAutoClose() === 'outsideClick' &&
      dropdownElement && dropdownElement[0].contains(evt.target)) {
      return;
    }

    openScope.isOpen = false;

    if (!$rootScope.$$phase) {
      openScope.$apply();
    }
  };

  var keybindFilter = function(evt) {
    if (evt.which === 27) {
      openScope.focusToggleElement();
      closeDropdown();
    } else if (openScope.isKeynavEnabled() && /(38|40)/.test(evt.which) && openScope.isOpen) {
      evt.preventDefault();
      evt.stopPropagation();
      openScope.focusDropdownEntry(evt.which);
    }
  };
}])

.controller('EuiDropdownController', ['$scope', '$element', '$attrs', '$parse', 'euiDropdownConfig', 'euiDropdownService', '$animate', '$euiPosition', '$document', '$compile', '$templateRequest', function($scope, $element, $attrs, $parse, dropdownConfig, euiDropdownService, $animate, $position, $document, $compile, $templateRequest) {
  var self = this,
    scope = $scope.$new(), // create a child scope so we are not polluting original one
    templateScope,
    openClass = dropdownConfig.openClass,
    getIsOpen,
    setIsOpen = angular.noop,
    toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
    appendToBody = false,
    keynavEnabled =false,
    selectedOption = null;


  $element.addClass('dropdown');

  this.init = function() {
    if ($attrs.isOpen) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }

    appendToBody = angular.isDefined($attrs.dropdownAppendToBody);
    keynavEnabled = angular.isDefined($attrs.euiKeyboardNav);

    if (appendToBody && self.dropdownMenu) {
      $document.find('body').append(self.dropdownMenu);
      $element.on('$destroy', function handleDestroyEvent() {
        self.dropdownMenu.remove();
      });
    }
  };

  this.toggle = function(open) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.getAutoClose = function() {
    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
  };

  scope.getElement = function() {
    return $element;
  };

  scope.isKeynavEnabled = function() {
    return keynavEnabled;
  };

  scope.focusDropdownEntry = function(keyCode) {
    var elems = self.dropdownMenu ? //If append to body is used.
      (angular.element(self.dropdownMenu).find('a')) :
      (angular.element($element).find('ul').eq(0).find('a'));

    switch (keyCode) {
      case (40): {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = 0;
        } else {
          self.selectedOption = (self.selectedOption === elems.length - 1 ?
            self.selectedOption :
            self.selectedOption + 1);
        }
        break;
      }
      case (38): {
        if (!angular.isNumber(self.selectedOption)) {
          self.selectedOption = elems.length - 1;
        } else {
          self.selectedOption = self.selectedOption === 0 ?
            0 : self.selectedOption - 1;
        }
        break;
      }
    }
    elems[self.selectedOption].focus();
  };

  scope.getDropdownElement = function() {
    return self.dropdownMenu;
  };

  scope.focusToggleElement = function() {
    if (self.toggleElement) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function(isOpen, wasOpen) {
    if (appendToBody && self.dropdownMenu) {
      var pos = $position.positionElements($element, self.dropdownMenu, 'bottom-left', true);
      var css = {
        top: pos.top + 'px',
        display: isOpen ? 'block' : 'none'
      };

      var rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
      if (!rightalign) {
        css.left = pos.left + 'px';
        css.right = 'auto';
      } else {
        css.left = 'auto';
        css.right = (window.innerWidth - (pos.left + $element.prop('offsetWidth'))) + 'px';
      }

      self.dropdownMenu.css(css);
    }

    $animate[isOpen ? 'addClass' : 'removeClass']($element, openClass).then(function() {
      if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
        toggleInvoker($scope, { open: !!isOpen });
      }
    });

    if (isOpen) {
      if (self.dropdownMenuTemplateUrl) {
        $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
          templateScope = scope.$new();
          $compile(tplContent.trim())(templateScope, function(dropdownElement) {
            var newEl = dropdownElement;
            self.dropdownMenu.replaceWith(newEl);
            self.dropdownMenu = newEl;
          });
        });
      }

      scope.focusToggleElement();
      euiDropdownService.open(scope);
    } else {
      if (self.dropdownMenuTemplateUrl) {
        if (templateScope) {
          templateScope.$destroy();
        }
        var newEl = angular.element('<ul class="dropdown-menu"></ul>');
        self.dropdownMenu.replaceWith(newEl);
        self.dropdownMenu = newEl;
      }

      euiDropdownService.close(scope);
      self.selectedOption = null;
    }

    if (angular.isFunction(setIsOpen)) {
      setIsOpen($scope, isOpen);
    }
  });

  $scope.$on('$locationChangeSuccess', function() {
    if (scope.getAutoClose() !== 'disabled') {
      scope.isOpen = false;
    }
  });

  var offDestroy = $scope.$on('$destroy', function() {
    scope.$destroy();
  });
  scope.$on('$destroy', offDestroy);
}])

.directive('euiDropdown', function() {
  return {
    restrict: 'AEC',
    controller: 'EuiDropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init();
    }
  };
})

.directive('euiDropdownMenu', function() {
  return {
    restrict: 'AEC',
    require: '?^euiDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
        return;
      }

      element.addClass('dropdown-menu');

      var tplUrl = attrs.templateUrl;
      if (tplUrl) {
        dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
      }

      if (!dropdownCtrl.dropdownMenu) {
        dropdownCtrl.dropdownMenu = element;
      }
    }
  };
})

.directive('euiKeyboardNav', function() {
  return {
    restrict: 'AE',
    require: '?^euiDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      element.bind('keydown', function(e) {
        if ([38, 40].indexOf(e.which) !== -1) {
          e.preventDefault();
          e.stopPropagation();

          var elems = dropdownCtrl.dropdownMenu.find('a');

          switch (e.which) {
            case (40): { // Down
              if (!angular.isNumber(dropdownCtrl.selectedOption)) {
                dropdownCtrl.selectedOption = 0;
              } else {
                dropdownCtrl.selectedOption = dropdownCtrl.selectedOption === elems.length -1 ?
                  dropdownCtrl.selectedOption : dropdownCtrl.selectedOption + 1;
              }
              break;
            }
            case (38): { // Up
              if (!angular.isNumber(dropdownCtrl.selectedOption)) {
                dropdownCtrl.selectedOption = elems.length - 1;
              } else {
                dropdownCtrl.selectedOption = dropdownCtrl.selectedOption === 0 ?
                  0 : dropdownCtrl.selectedOption - 1;
              }
              break;
            }
          }
          elems[dropdownCtrl.selectedOption].focus();
        }
      });
    }
  };
})

.directive('euiDropdownToggle', function() {
  return {
    restrict: 'AEC',
    require: '?^euiDropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if (!dropdownCtrl) {
        return;
      }

      element.addClass('dropdown-toggle');

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if (!element.hasClass('disabled') && !attrs.disabled) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.unbind('click', toggleDropdown);
      });
    }
  };
});

/* Deprecated dropdown below */

angular.module('eui.stackedMap', [])
/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function() {
    return {
      createNew: function() {
        var stack = [];

        return {
          add: function(key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function(key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function() {
            return stack[stack.length - 1];
          },
          remove: function(key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function() {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function() {
            return stack.length;
          }
        };
      }
    };
  });
angular.module('eui.modal', ['eui.stackedMap'])
    /**
     * A helper, internal data structure that stores all references attached to key
     */
    .factory('$$multiMap', function() {
      return {
        createNew: function() {
          var map = {};

          return {
            entries: function() {
              return Object.keys(map).map(function(key) {
                return {
                  key: key,
                  value: map[key]
                };
              });
            },
            get: function(key) {
              return map[key];
            },
            hasKey: function(key) {
              return !!map[key];
            },
            keys: function() {
              return Object.keys(map);
            },
            put: function(key, value) {
              if (!map[key]) {
                map[key] = [];
              }

              map[key].push(value);
            },
            remove: function(key, value) {
              var values = map[key];

              if (!values) {
                return;
              }

              var idx = values.indexOf(value);

              if (idx !== -1) {
                values.splice(idx, 1);
              }

              if (!values.length) {
                delete map[key];
              }
            }
          };
        }
      };
    })

    /**
     * A helper directive for the $modal service. It creates a backdrop element.
     */
    .directive('euiModalBackdrop', [
      '$animate', '$injector', '$euiModalStack',
      function($animate ,  $injector,   $modalStack) {
        var $animateCss = null;

        if ($injector.has('$animateCss')) {
          $animateCss = $injector.get('$animateCss');
        }

        return {
          replace: true,
          templateUrl: 'template/modal/backdrop.html',
          compile: function(tElement, tAttrs) {
            tElement.addClass(tAttrs.backdropClass);
            return linkFn;
          }
        };

        function linkFn(scope, element, attrs) {
          // Temporary fix for prefixing
          element.addClass('modal-backdrop');

          if (attrs.modalInClass) {
            if ($animateCss) {
              $animateCss(element, {
                addClass: attrs.modalInClass
              }).start();
            } else {
              $animate.addClass(element, attrs.modalInClass);
            }

            scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
              var done = setIsAsync();
              if ($animateCss) {
                $animateCss(element, {
                  removeClass: attrs.modalInClass
                }).start().then(done);
              } else {
                $animate.removeClass(element, attrs.modalInClass).then(done);
              }
            });
          }
        }
      }])

    .directive('euiModalWindow', [
      '$euiModalStack', '$q', '$animate', '$injector', '$document',
      function($modalStack ,  $q ,  $animate,   $injector, $document) {
        var $animateCss = null;

        if ($injector.has('$animateCss')) {
          $animateCss = $injector.get('$animateCss');
        }

        return {
          scope: {
            index: '@'
          },
          replace: true,
          transclude: true,
          templateUrl: function(tElement, tAttrs) {
            return tAttrs.templateUrl || 'template/modal/window.html';
          },
          link: function(scope, element, attrs) {
            element.addClass(attrs.windowClass || '');
            element.addClass(attrs.windowTopClass || '');
            scope.size = attrs.size;
            scope.position = attrs.position;
            var showClose = angular.isDefined(attrs.showClose) ? scope.$eval(attrs.showClose) : true;
            scope.showClose = showClose;
            scope.title = attrs.title;
            scope.close = function(evt) {
              var modal = $modalStack.getTop();
              //if (modal && modal.value.backdrop && modal.value.backdrop !== 'static' && (evt.target === evt.currentTarget)) {
              if (modal && modal.value.backdrop && modal.value.backdrop != 'static') {
                evt.preventDefault();
                evt.stopPropagation();
                $modalStack.dismiss(modal.key, 'backdrop click');
              }
            };

            // moved from template to fix issue #2280
            //element.on('click', scope.close);

            var startX = 0, startY = 0, x = 0, y = 0;
            scope.mousedown = function (event) {
              //event.preventDefault();
              startX = event.screenX - x;
              if(startX<0){
                startX = 0;
              }
              startY = event.screenY - y;
              if(startY<0){
                startY = 0;
              }
              //startX = event.screenX - event.clientX + event.offsetX;
              //startY = event.screenY - event.clientY + event.offsetY + 40;
              $document.bind('mousemove', mousemove);
              $document.bind('mouseup', mouseup);
            };

            function mousemove(event) {
              y = event.screenY - startY;
              x = event.screenX - startX;

              /*设置modal拖动不可超出父级窗口高度*/
              var topMax = element[0].clientHeight-element[0].children[0].clientHeight-20;
              if(y<0){
                y = 0;
              }else if(y>topMax){
                y = topMax;
              }
              /*设置modal拖动不可超出父级窗口宽度*/
              var leftMax = element[0].clientWidth-element[0].children[0].clientWidth-10;
              if(x<0){
                x = 0;
              }else if(x>leftMax){
                x = leftMax;
              }
              // if (y<-30) y=-30;
              element[0].children[0].style.top = y + 'px';
              element[0].children[0].style.left = x + 'px';
              //element.css({
              //  top: y + 'px',
              //  left:  x + 'px'
              //});
            };

            function mouseup() {
              $document.off('mousemove', mousemove);
              $document.off('mouseup', mouseup);
            }

            // This property is only added to the scope for the purpose of detecting when this directive is rendered.
            // We can detect that by using this property in the template associated with this directive and then use
            // {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
            scope.$isRendered = true;

            // Deferred object that will be resolved when this modal is render.
            var modalRenderDeferObj = $q.defer();
            // Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
            // In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
            attrs.$observe('modalRender', function(value) {
              if (value == 'true') {
                modalRenderDeferObj.resolve();
              }
            });

            // 设定对话框大小及初始位置
            function initDisplay() {
              if (y <= 0) {
                var styles = attrs.size ? attrs.size.split(';') : [];
                for (var i = 0; i < styles.length; i++) {
                  var styleItem = styles[i].split(':');
                  element[0].children[0].style[styleItem[0]] = styleItem[1];
                }

                y = (element[0].clientHeight - element[0].children[0].offsetHeight - 60) / 2;
                x = (element[0].clientWidth - element[0].children[0].offsetWidth) / 2;

                var styles = attrs.position ? attrs.size.split(';') : [];
                if (attrs.position) {
                  var positionStrParts = attrs.position.split('-');
                  var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

                  if (pos0 == 'left') {
                    x = 0;
                  } else if (pos0 == 'right') {
                    x = element[0].clientWidth - element[0].children[0].offsetWidth - 20;
                  }

                  if (pos1 == 'top') {
                    y = 1;
                  } else if (pos1 == 'bottom') {
                    y = element[0].clientHeight - element[0].children[0].offsetHeight - 20;
                  }
                }
                element[0].children[0].style.top = y + 'px';
                element[0].children[0].style.left = x + 'px';
              }
            }

            modalRenderDeferObj.promise.then(function() {
              var animationPromise = null;

              if (attrs.modalInClass) {
                if ($animateCss) {
                  animationPromise = $animateCss(element, {
                    addClass: attrs.modalInClass
                  }).start();
                } else {
                  animationPromise = $animate.addClass(element, attrs.modalInClass);
                }

                scope.$on($modalStack.NOW_CLOSING_EVENT, function(e, setIsAsync) {
                  var done = setIsAsync();
                  if ($animateCss) {
                    $animateCss(element, {
                      removeClass: attrs.modalInClass
                    }).start().then(done);
                  } else {
                    $animate.removeClass(element, attrs.modalInClass).then(done);
                  }
                });
              }

              $q.when(animationPromise).then(function() {
                var inputWithAutofocus = element[0].querySelector('[autofocus]');
                /**
                 * Auto-focusing of a freshly-opened modal element causes any child elements
                 * with the autofocus attribute to lose focus. This is an issue on touch
                 * based devices which will show and then hide the onscreen keyboard.
                 * Attempts to refocus the autofocus element via JavaScript will not reopen
                 * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
                 * the modal element if the modal does not contain an autofocus element.
                 */
                if (inputWithAutofocus) {
                  inputWithAutofocus.focus();
                } else {
                  element[0].focus();
                }
              });

              // Notify {@link $modalStack} that modal is rendered.
              var modal = $modalStack.getTop();
              if (modal) {
                $modalStack.modalRendered(modal.key);
                initDisplay();
              }
            });
          }
        };
      }])

    .directive('euiModalAnimationClass', function() {
      return {
        compile: function(tElement, tAttrs) {
          if (tAttrs.modalAnimation) {
            tElement.addClass(tAttrs.euiModalAnimationClass);
          }
        }
      };
    })

    .directive('euiModalTransclude', function() {
      return {
        link: function($scope, $element, $attrs, controller, $transclude) {
          $transclude($scope.$parent, function(clone) {
            $element.empty();
            $element.append(clone);
          });
        }
      };
    })

    .factory('$euiModalStack', [
      '$animate', '$timeout', '$document', '$compile', '$rootScope',
      '$q',
      '$injector',
      '$$multiMap',
      '$$stackedMap',
      function($animate ,  $timeout ,  $document ,  $compile ,  $rootScope ,
               $q,
               $injector,
               $$multiMap,
               $$stackedMap) {
        var $animateCss = null;

        if ($injector.has('$animateCss')) {
          $animateCss = $injector.get('$animateCss');
        }

        var OPENED_MODAL_CLASS = 'modal-open';

        var backdropDomEl, backdropScope;
        var openedWindows = $$stackedMap.createNew();
        var openedClasses = $$multiMap.createNew();
        var $modalStack = {
          NOW_CLOSING_EVENT: 'modal.stack.now-closing'
        };

        //Modal focus behavior
        var focusableElementList;
        var focusIndex = 0;
        var tababbleSelector = 'a[href], area[href], input:not([disabled]), ' +
            'button:not([disabled]),select:not([disabled]), textarea:not([disabled]), ' +
            'iframe, object, embed, *[tabindex], *[contenteditable=true]';

        function backdropIndex() {
          var topBackdropIndex = -1;
          var opened = openedWindows.keys();
          for (var i = 0; i < opened.length; i++) {
            if (openedWindows.get(opened[i]).value.backdrop) {
              topBackdropIndex = i;
            }
          }
          return topBackdropIndex;
        }

        $rootScope.$watch(backdropIndex, function(newBackdropIndex) {
          if (backdropScope) {
            backdropScope.index = newBackdropIndex;
          }
        });

        function removeModalWindow(modalInstance, elementToReceiveFocus) {
          var body = $document.find('body').eq(0);
          var modalWindow = openedWindows.get(modalInstance).value;

          //clean up the stack
          openedWindows.remove(modalInstance);

          removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, function() {
            var modalBodyClass = modalWindow.openedClass || OPENED_MODAL_CLASS;
            openedClasses.remove(modalBodyClass, modalInstance);
            body.toggleClass(modalBodyClass, openedClasses.hasKey(modalBodyClass));
            toggleTopWindowClass(true);
          });
          checkRemoveBackdrop();

          //move focus to specified element if available, or else to body
          if (elementToReceiveFocus && elementToReceiveFocus.focus) {
            elementToReceiveFocus.focus();
          } else {
            body.focus();
          }
        }

        // Add or remove "windowTopClass" from the top window in the stack
        function toggleTopWindowClass(toggleSwitch) {
          var modalWindow;

          if (openedWindows.length() > 0) {
            modalWindow = openedWindows.top().value;
            modalWindow.modalDomEl.toggleClass(modalWindow.windowTopClass || '', toggleSwitch);
          }
        }

        function checkRemoveBackdrop() {
          //remove backdrop if no longer needed
          if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, function() {
              backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
          }
        }

        function removeAfterAnimate(domEl, scope, done) {
          var asyncDeferred;
          var asyncPromise = null;
          var setIsAsync = function() {
            if (!asyncDeferred) {
              asyncDeferred = $q.defer();
              asyncPromise = asyncDeferred.promise;
            }

            return function asyncDone() {
              asyncDeferred.resolve();
            };
          };
          scope.$broadcast($modalStack.NOW_CLOSING_EVENT, setIsAsync);

          // Note that it's intentional that asyncPromise might be null.
          // That's when setIsAsync has not been called during the
          // NOW_CLOSING_EVENT broadcast.
          return $q.when(asyncPromise).then(afterAnimating);

          function afterAnimating() {
            if (afterAnimating.done) {
              return;
            }
            afterAnimating.done = true;

            if ($animateCss) {
              $animateCss(domEl, {
                event: 'leave'
              }).start().then(function() {
                domEl.remove();
              });
            } else {
              $animate.leave(domEl);
            }
            scope.$destroy();
            if (done) {
              done();
            }
          }
        }

        $document.bind('keydown', function(evt) {
          if (evt.isDefaultPrevented()) {
            return evt;
          }

          var modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            switch (evt.which) {
              case 27: {
                evt.preventDefault();
                $rootScope.$apply(function() {
                  $modalStack.dismiss(modal.key, 'escape key press');
                });
                break;
              }
              case 9: {
                $modalStack.loadFocusElementList(modal);
                var focusChanged = false;
                if (evt.shiftKey) {
                  if ($modalStack.isFocusInFirstItem(evt)) {
                    focusChanged = $modalStack.focusLastFocusableElement();
                  }
                } else {
                  if ($modalStack.isFocusInLastItem(evt)) {
                    focusChanged = $modalStack.focusFirstFocusableElement();
                  }
                }

                if (focusChanged) {
                  evt.preventDefault();
                  evt.stopPropagation();
                }
                break;
              }
            }
          }
        });

        $modalStack.open = function(modalInstance, modal) {
          var modalOpener = $document[0].activeElement,
              modalBodyClass = modal.openedClass || OPENED_MODAL_CLASS;

          toggleTopWindowClass(false);

          openedWindows.add(modalInstance, {
            deferred: modal.deferred,
            renderDeferred: modal.renderDeferred,
            modalScope: modal.scope,
            backdrop: modal.backdrop,
            keyboard: modal.keyboard,
            openedClass: modal.openedClass,
            windowTopClass: modal.windowTopClass
          });

          openedClasses.put(modalBodyClass, modalInstance);

          var body = $document.find('body').eq(0),
              currBackdropIndex = backdropIndex();

          if (currBackdropIndex >= 0 && !backdropDomEl && modal.showModal) {
            backdropScope = $rootScope.$new(true);
            backdropScope.index = currBackdropIndex;
            var angularBackgroundDomEl = angular.element('<div eui-modal-backdrop="modal-backdrop"></div>');
            angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
            if (modal.animation) {
              angularBackgroundDomEl.attr('modal-animation', 'true');
            }
            backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
            body.append(backdropDomEl);
          }

          if (!modal.showModal) {
            var angularDomEl = angular.element('<div panel-window=""></div>');
          } else {
            var angularDomEl = angular.element('<div eui-modal-window="modal-window"></div>');
          }

          angularDomEl.attr({
            'template-url': modal.windowTemplateUrl,
            'window-class': modal.windowClass,
            'window-top-class': modal.windowTopClass,
            'size': modal.size,
            'position': modal.position,
            'show-close': modal.scope.showClose,
            'title': modal.title,
            'index': openedWindows.length() - 1,
            'animate': 'animate'
          }).html(modal.content);
          if (modal.animation) {
            angularDomEl.attr('modal-animation', 'true');
          }

          var modalDomEl = $compile(angularDomEl)(modal.scope);
          openedWindows.top().value.modalDomEl = modalDomEl;
          openedWindows.top().value.modalOpener = modalOpener;
          body.append(modalDomEl);
          body.addClass(modalBodyClass);

          $modalStack.clearFocusListCache();
        };

        function broadcastClosing(modalWindow, resultOrReason, closing) {
          return !modalWindow.value.modalScope.$broadcast('modal.closing', resultOrReason, closing).defaultPrevented;
        }

        $modalStack.close = function(modalInstance, result) {
          var modalWindow = openedWindows.get(modalInstance);
          if (modalWindow && broadcastClosing(modalWindow, result, true)) {
            modalWindow.value.modalScope.$$euiDestructionScheduled = true;
            modalWindow.value.deferred.resolve(result);
            removeModalWindow(modalInstance, modalWindow.value.modalOpener);
            return true;
          }
          return !modalWindow;
        };

        $modalStack.dismiss = function(modalInstance, reason) {
          var modalWindow = openedWindows.get(modalInstance);
          if (modalWindow && broadcastClosing(modalWindow, reason, false)) {
            modalWindow.value.modalScope.$$euiDestructionScheduled = true;
            modalWindow.value.deferred.reject(reason);
            removeModalWindow(modalInstance, modalWindow.value.modalOpener);
            return true;
          }
          return !modalWindow;
        };

        $modalStack.dismissAll = function(reason) {
          var topModal = this.getTop();
          while (topModal && this.dismiss(topModal.key, reason)) {
            topModal = this.getTop();
          }
        };

        $modalStack.getTop = function() {
          return openedWindows.top();
        };

        $modalStack.modalRendered = function(modalInstance) {
          var modalWindow = openedWindows.get(modalInstance);
          if (modalWindow) {
            modalWindow.value.renderDeferred.resolve();
          }
        };

        $modalStack.focusFirstFocusableElement = function() {
          if (focusableElementList.length > 0) {
            focusableElementList[0].focus();
            return true;
          }
          return false;
        };
        $modalStack.focusLastFocusableElement = function() {
          if (focusableElementList.length > 0) {
            focusableElementList[focusableElementList.length - 1].focus();
            return true;
          }
          return false;
        };

        $modalStack.isFocusInFirstItem = function(evt) {
          if (focusableElementList.length > 0) {
            return (evt.target || evt.srcElement) == focusableElementList[0];
          }
          return false;
        };

        $modalStack.isFocusInLastItem = function(evt) {
          if (focusableElementList.length > 0) {
            return (evt.target || evt.srcElement) == focusableElementList[focusableElementList.length - 1];
          }
          return false;
        };

        $modalStack.clearFocusListCache = function() {
          focusableElementList = [];
          focusIndex = 0;
        };

        $modalStack.loadFocusElementList = function(modalWindow) {
          if (focusableElementList === undefined || !focusableElementList.length) {
            if (modalWindow) {
              var modalDomE1 = modalWindow.value.modalDomEl;
              if (modalDomE1 && modalDomE1.length) {
                focusableElementList = modalDomE1[0].querySelectorAll(tababbleSelector);
              }
            }
          }
        };

        return $modalStack;
      }])

    .provider('$euiModal', function() {
      var $modalProvider = {
        options: {
          animation: true,
          backdrop: true, //can also be false or 'static'
          keyboard: true
        },
        $get: ['$injector', '$rootScope', '$q', '$templateRequest', '$controller',
          '$euiModalStack',
          //'$modalSuppressWarning',
          '$log',
          function ($injector, $rootScope, $q, $templateRequest, $controller,
                    $modalStack,
                    //$modalSuppressWarning,
                    $log) {
            var $modal = {};

            function getTemplatePromise(options) {
              return options.template ? $q.when(options.template) :
                  $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
            }

            function getResolvePromises(resolves) {
              var promisesArr = [];
              angular.forEach(resolves, function(value) {
                if (angular.isFunction(value) || angular.isArray(value)) {
                  promisesArr.push($q.when($injector.invoke(value)));
                } else if (angular.isString(value)) {
                  promisesArr.push($q.when($injector.get(value)));
                } else {
                  promisesArr.push($q.when(value));
                }
              });
              return promisesArr;
            }

            var promiseChain = null;
            $modal.getPromiseChain = function() {
              return promiseChain;
            };

            $modal.open = function(modalOptions) {
              var modalResultDeferred = $q.defer();
              var modalOpenedDeferred = $q.defer();
              var modalRenderDeferred = $q.defer();

              //prepare an instance of a modal to be injected into controllers and returned to a caller
              var modalInstance = {
                result: modalResultDeferred.promise,
                opened: modalOpenedDeferred.promise,
                rendered: modalRenderDeferred.promise,
                close: function (result) {
                  return $modalStack.close(modalInstance, result);
                },
                dismiss: function (reason) {
                  return $modalStack.dismiss(modalInstance, reason);
                }
              };

              //merge and clean up options
              modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
              modalOptions.resolve = modalOptions.resolve || {};

              //verify options
              if (!modalOptions.template && !modalOptions.templateUrl) {
                throw new Error('One of template or templateUrl options is required.');
              }

              var templateAndResolvePromise =
                  $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));

              function resolveWithTemplate() {
                return templateAndResolvePromise;
              }

              // Wait for the resolution of the existing promise chain.
              // Then switch to our own combined promise dependency (regardless of how the previous modal fared).
              // Then add to $modalStack and resolve opened.
              // Finally clean up the chain variable if no subsequent modal has overwritten it.
              var samePromise;
              samePromise = promiseChain = $q.all([promiseChain])
                  .then(resolveWithTemplate, resolveWithTemplate)
                  .then(function resolveSuccess(tplAndVars) {

                    var modalScope = (modalOptions.scope || $rootScope).$new();
                    modalScope.$close = modalInstance.close;
                    modalScope.$dismiss = modalInstance.dismiss;
                    modalScope.showClose = angular.isDefined(modalOptions.showClose)? modalOptions.showClose:true;

                    modalScope.$on('$destroy', function() {
                      if (!modalScope.$$euiDestructionScheduled) {
                        modalScope.$dismiss('$euiUnscheduledDestruction');
                      }
                    });

                    var ctrlInstance, ctrlLocals = {};
                    var resolveIter = 1;

                    //controllers
                    if (modalOptions.controller) {
                      ctrlLocals.$scope = modalScope;
                      ctrlLocals.$euiModalInstance = modalInstance;
                      //Object.defineProperty(ctrlLocals, '$modalInstance', {
                      //  get: function() {
                      //    if (!$modalSuppressWarning) {
                      //      $log.warn('$modalInstance is now deprecated. Use $euiModalInstance instead.');
                      //    }
                      //
                      //    return modalInstance;
                      //  }
                      //});
                      angular.forEach(modalOptions.resolve, function(value, key) {
                        ctrlLocals[key] = tplAndVars[resolveIter++];
                      });

                      ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                      if (modalOptions.controllerAs) {
                        if (modalOptions.bindToController) {
                          angular.extend(ctrlInstance, modalScope);
                        }

                        modalScope[modalOptions.controllerAs] = ctrlInstance;
                      }
                    }

                    $modalStack.open(modalInstance, {
                      showModal: angular.isDefined(modalOptions.showModal) ? modalOptions.showModal : true,
                      scope: modalScope,
                      deferred: modalResultDeferred,
                      renderDeferred: modalRenderDeferred,
                      content: tplAndVars[0],
                      animation: modalOptions.animation,
                      backdrop: modalOptions.backdrop,
                      keyboard: modalOptions.keyboard,
                      backdropClass: modalOptions.backdropClass,
                      windowTopClass: modalOptions.windowTopClass,
                      windowClass: modalOptions.windowClass,
                      windowTemplateUrl: modalOptions.windowTemplateUrl,
                      size: modalOptions.size,
                      position: modalOptions.position,
                      title: modalOptions.title,
                      openedClass: modalOptions.openedClass
                    });
                    modalOpenedDeferred.resolve(true);

                  }, function resolveError(reason) {
                    modalOpenedDeferred.reject(reason);
                    modalResultDeferred.reject(reason);
                  })
                  .finally(function() {
                    if (promiseChain === samePromise) {
                      promiseChain = null;
                    }
                  });

              return modalInstance;
            };

            return $modal;
          }
        ]
      };

      return $modalProvider;
    });

angular.module('eui.window', ['eui.modal'])
	.directive('windowTransclude', ['$log',
		function ($log) {
			return {
				link: function ($scope, $element, $attrs, controller, $transclude) {
					$transclude($scope, function (clone) {
						$element.empty();
						$element.append(clone);
					});
				}
			};
		}])
	.factory('windowIndex', function () {
		var windowMaxIndex = 0;
		return {
			getWinMaxIndex: function () {
				windowMaxIndex = windowMaxIndex + 3;
				return windowMaxIndex;
			}
		}
	})

	.directive('panelWindow', ['$euiModalStack', '$q', '$timeout', '$document', 'windowIndex',
		function ($euiModalStack, $q, $timeout, $document, windowIndex) {
			return {
				restrict: 'EA',
//        scope: {
//          openOffset: '@',
//          animate: '='
//        },
				replace: true,
				transclude: true,
				templateUrl: function (tElement, tAttrs) {
					return tAttrs.templateUrl || 'template/window/window.html';
				},
				link: function (scope, element, attrs) {
					element.addClass(attrs.windowClass || '');
					scope.size = attrs.size;
					if (attrs.title) {
						scope.title = attrs.title;
					}
					scope.openOffset = windowIndex.getWinMaxIndex();

					/*操作图标控制*/
					var buttonsArray, icon, iconArray;
					iconArray = ["min", "max", "close"];
					icon = {
						"min": false,
						"max": false,
						"close": false
					};
					if (attrs.buttons) {
						buttonsArray = attrs.buttons.split(" ");
					}
					buttonsArray.forEach(function (button) {
						if (iconArray.indexOf(button) !== -1) {
							icon[button] = true;
						}
					});
					scope.icon = icon;

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

					// 关闭时发送事件到上层controller
					scope.close = function (evt) {
						scope.$emit('EVENT_PANEL_WINDOW.close', {title: scope.title});
					};

					scope.$on(scope.title, function (evt, next, current) {
						scope.openOffset = windowIndex.getWinMaxIndex();
					});

					var startX = 0, startY = 0, x = 0, y = 0;
					scope.mousedown = function (event) {
						scope.openOffset = windowIndex.getWinMaxIndex();
						//event.preventDefault();
						startX = event.screenX - x;
						startY = event.screenY - y;
						$document.bind('mousemove', mousemove);
						$document.bind('mouseup', mouseup);
					};

					function mousemove(event) {
						y = event.screenY - startY;
						x = event.screenX - startX;

						/*设置window拖动不可超出父级窗口高度*/
						var parentHeight = element[0].parentElement.parentElement.parentElement.parentElement.clientHeight;
						var topMax = parentHeight - element[0].children[0].clientHeight - 10;
						if (y < 0) {
							y = 0;
						} else if (y > topMax) {
							y = topMax;
						}
						/*设置window拖动不可超出父级窗口宽度*/
						var parentWidth = element[0].parentElement.parentElement.parentElement.parentElement.clientWidth;
						var leftMax = parentWidth - element[0].children[0].clientWidth - 10;
						if (x < 0) {
							x = 0;
						} else if (x > leftMax) {
							x = leftMax;
						}
						// if (y<-30) y=-30;
						if (y)
							element.css({
								top: y + 'px',
								left: x + 'px'
							});
					}

					function mouseup() {
						$document.off('mousemove', mousemove);
						$document.off('mouseup', mouseup);
					}

					// This property is only added to the scope for the purpose of detecting when this directive is rendered.
					// We can detect that by using this property in the template associated with this directive and then use
					// {@link Attribute#$observe} on it. For more details please see {@link TableColumnResize}.
					scope.$isRendered = true;
					// Deferred object that will be resolved when this modal is render.
					var modalRenderDeferObj = $q.defer();
					// Observe function will be called on next digest cycle after compilation, ensuring that the DOM is ready.
					// In order to use this way of finding whether DOM is ready, we need to observe a scope property used in modal's template.
					attrs.$observe('windowRender', function (value) {
						if (value == 'true') {
							modalRenderDeferObj.resolve();
						}
					});

					modalRenderDeferObj.promise.then(function () {

						//$euiModalStack.modalRendered(modal.key);

						// 设定对话框大小及初始位置
						if (y <= 0) {
							var styles = attrs.size ? attrs.size.split(';') : [];
							for (var i = 0; i < styles.length; i++) {
								var styleItem = styles[i].split(':');
								element[0].children[0].style[styleItem[0]] = styleItem[1];
							}

							y = ($document[0].children[0].clientHeight - element[0].children[0].offsetHeight - 60) / 2;
							x = ($document[0].children[0].clientWidth - element[0].children[0].offsetWidth) / 2;

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

							element.css({
								top: y + 'px',
								left: x + 'px'
							});
						}

					})
				}
			};
		}]);

angular.module('eui.fieldset', ['eui.window'])

	.controller('FieldsetController', ['$scope', '$attrs',
		function ($scope, $attrs) {
		$scope.isShow = 'opened' in $attrs;

		$scope.disabled = $attrs.disabled ? $attrs.disabled : false;

		/*生成UUID*/
		function getUuid(){
			var len=32;//32长度
			var radix=16;//16进制
			var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
			var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
			return uuid.join('');
		}

		var uuId=getUuid();
		$scope.uuid = uuId;

		$scope.toggleOpen = function () {
			$scope.isShow = !$scope.isShow;
		};
	}])

	.directive('euiFieldset', function () {
		return {
			restrict: 'E',
			controller: 'FieldsetController',
			templateUrl: 'template/fieldset/fieldset.html',
			transclude: true,
			replace: true,
			scope: {
				label: '@'
			},
			compile: function(element, attrs, transcludeFn){
				return function link(scope, element,attrs){
					element.find('fieldset').children().eq(1).append(transcludeFn(scope.$parent));
				}
			}
		};
	});


/**
 * html5 文件上传程序
 * 1. 前端发送大文件请求=》后端
 * 2. 后端产生切片设置文件及参数上载线程数=》前端
 * 3. 前端根据上传线程数循环产生切片上传请求=》后端
 * 4. 后端保存文件切片，更新切片设置文件，如果完成则合并为大文件，发送回应=》前端
 * 5. 前端查看切片设置文件如果有未发送的增加切片上传请求=》后端
 *
 * 切片设置文件：{	sha1: '用于校验文件防止2次上传不一致',
 * 							sliceSize: '单片大小',
 * 							sliceList(切片数组): [0:未开始; 1:已发送; 2:已收到]
 * 						 }
 */

angular.module('eui.fileupload', [])

  .factory('$Util', function() {
    var _gb = 1073741824, //1073741824 = 1024*1024*1024
      _mb = 1048576, //1048576 = 1024*1024
      _kb = 1024;//
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    return {
      uuid: function (len, radix) {
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;

        if (len) {
          // Compact form
          for (i = 0; i < len; i++)
            uuid[i] = chars[0 | Math.random() * radix];
        } else {
          // rfc4122, version 4 form
          var r;

          // rfc4122 requires these characters
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';

          // Fill in random data.  At i==19 set the high bits of clock sequence as
          // per rfc4122, sec. 4.1.5
          for (i = 0; i < 32; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random() * 16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }

        return uuid.join('');
      },
      /**
       * 转化为小数位长度可定的小数
       *
       * @param {type} srcData 原来是小数或者整数
       * @param {type} percent 保留的小数的精度，默认为保留2位小数
       * @returns {type} 转换后的小数
       */
      toDecimal: function (srcData, percent) {
        var _data = parseFloat(srcData);
        var _multiple = 1;
        var _percent = parseInt(percent);
        if (isNaN(_data)) {
          return srcData;
        }
        if (isNaN(_percent) || _percent < 1) {
          _percent = 2;
        }
        //
        for (var index = 0; index < _percent; index++) {
          _multiple = _multiple * 10;
        }
        _data = Math.round(_data * _multiple) / _multiple;
        return _data;
      },
      formatCapacity: function (size) {
        if (size > _gb) {
          return this.toDecimal(size / _gb) + 'GB';
        }
        if (size > _mb) {
          return this.toDecimal(size / _mb) + 'MB';
        }
        if (size > _kb) {
          return this.toDecimal(size / _kb) + 'KB';
        }
        return size + 'Bytes';
      }
    };
  })

  .controller(
  'FileUploadController',
  [
    '$scope',
    '$attrs',
    '$document',
    '$element',
    '$timeout',
    '$Util',
    function($scope, $attrs, $document, $element, $timeout, $Util) {
      var SLICE_SIZE = 50 * 1024 * 1024;	//默认切片大小50MB
      if (angular.isDefined($attrs.sliceSize)) {
        SLICE_SIZE = $scope.$eval($attrs.sliceSize);
      }

      $scope.files = [];
      var fileInput = $element.find('input[type="file"]');
      var sliceConfig = null;

      function changeFn(e) {
        for(var i=0; i<e.target.files.length; i++) {
          var file = e.target.files[i];
          if (file) {
            var fileSizeC = $Util.formatCapacity(file.size);
            if (typeof file == 'object') {
              $scope.files.push({fileObj: file, fileName: file.name, fileSize: file.size, fileSizeC: fileSizeC, percentComplete: 0});
            }
          }
        }
        $scope.filesCount = $scope.files.length;
        if (!$scope.groupId && $scope.filesCount > 1) {
          $scope.groupId = $Util.uuid();
        }
        $scope.$apply();
      }

      var fileElem = fileInput;
      fileElem.bind('change', changeFn);

      if (window.FileAPI && window.FileAPI.ngfFixIE) {
        window.FileAPI.ngfFixIE(fileInput, fileElem, changeFn);
      }

      function processSlice(i, file) {
        sliceConfig.sliceList[i] = 1;
        var packet = file.fileObj.slice(i * sliceConfig.sliceSize, (i + 1) * sliceConfig.sliceSize);
        packet['name'] = file.fileName + '_index' + i;
        var fileSizeC = $Util.formatCapacity(packet.size);
        var slice = {
          fileObj: packet, fileName: packet.name, primaryName: file.fileName, fileSize: packet.size,
          fileSizeC: fileSizeC, percentComplete: 0, index: i
        };
        $scope.files.push(slice);
        uploadFileSlice(slice);
      }

      function uploadFileSlice(file) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $scope.uploadUrl);

        var fd = new FormData();
        fd.append("fileName", file.fileName);
        if (file.sliceRequest) {
          fd.append("sliceRequest", true);
          fd.append("fileSize", file.fileSize);
          fd.append("sliceSize", SLICE_SIZE);
        } else {
          if (file.primaryName) {
            fd.append("primaryName", file.primaryName);
          } else {
            fd.append("primaryName", file.fileName);
          }
          if (file.index != undefined) {
            fd.append("index", file.index);
          }
          fd.append("groupId", $scope.groupId);
          fd.append("fileToUpload", file.fileObj);

          /* event listners */
          xhr.upload.addEventListener("progress", function (evt) {
            $timeout(function () {
              if (evt.lengthComputable) {
                file.percentComplete = Math.round(evt.loaded * 100 / evt.total);

                // 计算总进度
                if (!file.primaryName) {
                  console.log('primary file uploadProgress, percentComplete=' + file.percentComplete);
                  for (var i = 0; i < $scope.files.length; i++) {
                    if ($scope.files[i].fileName === file.fileName) {
                      $scope.files[i].percentComplete = file.percentComplete;
                    }
                  }
                } else {
                  console.log('file slice uploadProgress, percentComplete=' + file.percentComplete);
                }

              }
              else {
                console.log('unable to compute');
              }
            })
          }, false);
        }

        xhr.addEventListener("load", function (evt) {
          /* This event is raised when the server send back a response */
          console.log('load event: ' + evt.target.responseText);
          // 前端根据上载线程数循环产生切片上传请求=》后端
          var iPool = 0;

          try {
            var rep = JSON.parse(evt.target.response);
          }catch(e){
            console.log('load error: ' + evt.target.response);
            return;
          }

          // 更新file对象的组ID和文件ID
          for (var i = 0; i < $scope.files.length; i++) {
            if (($scope.files[i].primaryName == undefined) && ($scope.files[i].fileName === rep.primaryName)) {
              $scope.files[i]['groupId'] = rep.groupId;
              $scope.files[i]['fileId'] = rep.fileId;
            }
          }

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
                  console.log('primary file uploadProgress, percentComplete=' + $scope.files[i].percentComplete);
                }
              }
            })
          }
        }, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        /* Be sure to change the url below to the url of your upload server side script */
        xhr.send(fd);
      }

      $scope.uploadFile = function() {
        console.log('$scope.groupId='+$scope.groupId);

        $scope.upload_disabled = true;
        $scope.files.forEach(function(file){
          if (file.fileSize > SLICE_SIZE && !(window.FileAPI && window.FileAPI.shouldLoad)) {	//如果大于切片大小
            file['sliceRequest'] = true;
          }
          uploadFileSlice(file);
        });

      };


      function uploadFailed(evt) {
        console.log("There was an error attempting to upload the file.");
      }

      function uploadCanceled(evt) {
        console.log("The upload has been canceled by the user or the browser dropped the connection.");
      }

    }])

  .directive('euiFileupload', ['$timeout', function($timeout) {
    return {
      replace: true,
      controller: 'FileUploadController',
      //controllerAs: 'upload',
      //require: 'upload',
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'template/fileupload/fileupload.html';
      },
      scope: {
        uploadUrl: '@',
        groupId: '@',
        result: '&'
      },

      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function () {
          $timeout(function () {
            if (scope.hasResult) {
              return;
            }

            var finish = 0;
            for (var i = 0; i < scope.files.length; i++) {
              if (scope.files[i].percentComplete !== 100) {
                break;
              } else if (scope.files[i].primaryName == undefined) {
                finish = finish + 1;
              }
            }
            if (finish && scope.filesCount === finish) {
              //console.log( result.ID ); //附件ID
              //console.log( result.FJMC ); //附件名称
              //console.log( result.FZID ); //分组ID
              //console.log( result.FJDZ ); //附件地址
              var ret = [];
              for (var i = 0; i < scope.files.length; i++) {
                if (scope.files[i].primaryName == undefined) {
                  ret.push({ID: scope.files[i].fileId, FJMC: scope.files[i].fileName, FZID: scope.files[i].groupId, FJDZ: 'path'});
                }
              }
              scope.hasResult = true;
              scope.result({resultData: ret});
            }
          }, 1000);
        });
      }

    };
  }])

    //上传测试
  .service('fileUploadService', ['$document', function($rootScope) {
    this.actionUrl = 'http://localhost:8080/fileUpload';
    //this.actionUrl = 'http://localhost:8083/engine/image/upload';

    this.setActionUrl = function(url) {
      this.actionUrl = url;
    };

    this.queryGroupFile = function(groupId, cb) {
      console.log('groupId'+groupId);
      if (cb) {
        cb([{ID: 111, FJMC: 'fileName1', FJID: 'abc', FJDZ: 'path'},
            {ID: 222, FJMC: 'fileName2', FJID: 'def', FJDZ: 'path'}]
        );
      }
    };

    this.queryFile = function(fileId, cb) {
      console.log('fileId'+fileId);
      if (cb) {
        cb({ID: 111, FJMC: 'fileName1', FJID: 'abc', FJDZ: 'path'});
      }
    };

    this.deleteGroupFile = function(groupId, cb) {
      console.log('groupId'+groupId);
      if (cb) {
        cb({success: "true"});
      }
    };

    this.deleteFile = function(fileId, cb) {
      console.log('fileId'+fileId);
      if (cb) {
        cb({success: "true"});
      }
    };

  }]);

/**
 * html5 文件上传程序
 * 1. 前端发送大文件请求=》后端
 * 2. 后端产生切片设置文件及参数上载线程数=》前端
 * 3. 前端根据上传线程数循环产生切片上传请求=》后端
 * 4. 后端保存文件切片，更新切片设置文件，如果完成则合并为大文件，发送回应=》前端
 * 5. 前端查看切片设置文件如果有未发送的增加切片上传请求=》后端
 *
 * 切片设置文件：{	sha1: '用于校验文件防止2次上传不一致',
 * 							sliceSize: '单片大小',
 * 							sliceList(切片数组): [0:未开始; 1:已发送; 2:已收到]
 * 						 }
 */

angular.module('eui.fileupload', [])

    .factory('$Util', function () {
        var _gb = 1073741824, //1073741824 = 1024*1024*1024
            _mb = 1048576, //1048576 = 1024*1024
            _kb = 1024;//
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        return {
            uuid: function (len, radix) {
                var chars = CHARS, uuid = [], i;
                radix = radix || chars.length;

                if (len) {
                    // Compact form
                    for (i = 0; i < len; i++)
                        uuid[i] = chars[0 | Math.random() * radix];
                } else {
                    // rfc4122, version 4 form
                    var r;

                    // rfc4122 requires these characters
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';

                    // Fill in random data.  At i==19 set the high bits of clock sequence as
                    // per rfc4122, sec. 4.1.5
                    for (i = 0; i < 32; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }

                return uuid.join('');
            },
            /**
             * 转化为小数位长度可定的小数
             *
             * @param {type} srcData 原来是小数或者整数
             * @param {type} percent 保留的小数的精度，默认为保留2位小数
             * @returns {type} 转换后的小数
             */
            toDecimal: function (srcData, percent) {
                var _data = parseFloat(srcData);
                var _multiple = 1;
                var _percent = parseInt(percent);
                if (isNaN(_data)) {
                    return srcData;
                }
                if (isNaN(_percent) || _percent < 1) {
                    _percent = 2;
                }
                //
                for (var index = 0; index < _percent; index++) {
                    _multiple = _multiple * 10;
                }
                _data = Math.round(_data * _multiple) / _multiple;
                return _data;
            },
            formatCapacity: function (size) {
                if (size > _gb) {
                    return this.toDecimal(size / _gb) + 'GB';
                }
                if (size > _mb) {
                    return this.toDecimal(size / _mb) + 'MB';
                }
                if (size > _kb) {
                    return this.toDecimal(size / _kb) + 'KB';
                }
                return size + 'Bytes';
            }
        };
    })

    .controller(
        'FileUploadController',
        [
            '$scope',
            '$attrs',
            '$document',
            '$element',
            '$timeout',
            '$Util',
            '$interval',
            '$http',
            function ($scope, $attrs, $document, $element, $timeout, $Util, $interval, $http) {
                var SLICE_SIZE = 50 * 1024 * 1024;	//默认切片大小50MB
                var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,
                    chunkSize = 2 * 1024 * 1024,
                    successCount = 0; //md5计算默认分块大小2M
                var timer;
                if (angular.isDefined($attrs.sliceSize)) {
                    SLICE_SIZE = $scope.$eval($attrs.sliceSize);
                }

                $scope.files = [];
                var fileInput = $element.find('input[type="file"]');
                var sliceConfig = null;

                function changeFn(e) {
                    for (var i = 0; i < e.target.files.length; i++) {
                        var file = e.target.files[i];
                        if (file) {
                            var fileSizeC = $Util.formatCapacity(file.size);
                            if (typeof file == 'object') {
                                $scope.files.push({
                                    fileObj: file,
                                    fileName: file.name,
                                    fileSize: file.size,
                                    fileSizeC: fileSizeC,
                                    percentComplete: 0
                                });
                            }
                        }
                    }
                    $scope.filesCount = $scope.files.length;
                    if (!$scope.groupId && $scope.filesCount > 1) {
                        $scope.groupId = $Util.uuid();
                    }
                    $scope.$apply();
                }

                var fileElem = fileInput;
                fileElem.bind('change', changeFn);

                if (window.FileAPI && window.FileAPI.ngfFixIE) {
                    window.FileAPI.ngfFixIE(fileInput, fileElem, changeFn);
                }

                function processSlice(i, file) {
                    var packet = file.fileObj.slice(i * sliceConfig.sliceSize, (i + 1) * sliceConfig.sliceSize);
                    packet['name'] = file.fileName + '_index' + i;
                    var fileSizeC = $Util.formatCapacity(packet.size);
                    var slice = {
                        fileObj: packet, fileName: packet.name, primaryName: file.fileName, fileSize: packet.size,
                        fileSizeC: fileSizeC, percentComplete: 0, index: i, sliceCount: file.sliceCount, MD5: file.MD5,
                        totalSize: file.totalSize
                    };
                    $scope.files.push(slice);
                    uploadFileSlice(slice);
                }

                function uploadFileSlice(file) {
                    var xhr = new XMLHttpRequest();

                    var fd = new FormData();
                    fd.append("fileName", file.fileName);
                    fd.append("MD5", file.MD5);
                    if (file.validateRequest) {
                        xhr.open("POST", $scope.uploadUrl, false);
                        fd.append("validateRequest", true);
                        fd.append("groupId", $scope.groupId);
                        fd.append("MD5", file.MD5);
                        if (file.primaryName) {
                            fd.append("primaryName", file.primaryName);
                        } else {
                            fd.append("primaryName", file.fileName);
                        }
                    }
                    else if (file.sliceRequest) {
                        xhr.open("POST", $scope.uploadUrl, false);
                        fd.append("sliceRequest", true);
                        fd.append("fileSize", file.fileSize);
                        fd.append("sliceSize", SLICE_SIZE);
                    }
                    else if (file.mergeRequest) {
                        xhr.open("POST", $scope.uploadUrl, false);
                        fd.append("mergeRequest", true);
                        fd.append("totalSize", file.totalSize);
                        fd.append("sliceCount", file.sliceCount);
                        fd.append("groupId", $scope.groupId);
                        fd.append("MD5", file.MD5);
                        if (file.primaryName) {
                            fd.append("primaryName", file.primaryName);
                        } else {
                            fd.append("primaryName", file.fileName);
                        }
                    }
                    else {
                        xhr.open("POST", $scope.uploadUrl, true);
                        if (file.primaryName) {
                            fd.append("primaryName", file.primaryName);
                        } else {
                            fd.append("primaryName", file.fileName);
                        }
                        if (file.index != undefined) {
                            fd.append("index", file.index);
                        }
                        fd.append("groupId", $scope.groupId);
                        fd.append("fileToUpload", file.fileObj);
                        fd.append("sliceCount", file.sliceCount);
                        if (file.totalSize) {
                            fd.append("totalSize", file.totalSize);
                        } else {
                            fd.append("totalSize", file.fileSize);
                        }
                        /* event listners */
                        xhr.upload.addEventListener("progress", function (evt) {
                            $timeout(function () {
                                if (evt.lengthComputable) {
                                    file.percentComplete = Math.round(evt.loaded * 100 / evt.total);

                                    // 计算总进度
                                    if (!file.primaryName) {
                                        console.log('primary file uploadProgress, percentComplete=' + file.percentComplete);
                                        for (var i = 0; i < $scope.files.length; i++) {
                                            if ($scope.files[i].fileName === file.fileName) {
                                                $scope.files[i].percentComplete = file.percentComplete;
                                            }
                                        }
                                    } else {
                                        console.log('file slice uploadProgress, percentComplete=' + file.percentComplete);
                                    }

                                }
                                else {
                                    console.log('unable to compute');
                                }
                            })
                        }, false);
                    }

                    xhr.addEventListener("load", function (evt) {
                        /* This event is raised when the server send back a response */
                        console.log('load event: ' + evt.target.responseText);
                        // 前端根据上载线程数循环产生切片上传请求=》后端
                        var iPool = 0;

                        try {
                            var rep = JSON.parse(evt.target.response);
                        } catch (e) {
                            console.log('load error: ' + evt.target.response);
                            return;
                        }

                        // 更新file对象的组ID和文件ID
                        for (var i = 0; i < $scope.files.length; i++) {
                            if (($scope.files[i].primaryName == undefined) && ($scope.files[i].fileName === rep.primaryName)) {
                                $scope.files[i]['groupId'] = rep.groupId;
                                $scope.files[i]['fileId'] = rep.fileId;
                            }
                        }


                        //服务器端返回来的切片配置
                        if (rep.sliceConfig) {
                            sliceConfig = rep.sliceConfig;
                            var sliceCount = sliceConfig.sliceList.length;
                            file['sliceCount'] = sliceCount;
                            file['totalSize'] = sliceConfig.totalSize;
                            for (var i = 0; i < sliceCount; i++) {
                                //if (sliceConfig.sliceList[i] !== 2) {
                                //    processSlice(i, file);
                                //    iPool = iPool + 1;
                                //    if (iPool >= rep.poolSize) {
                                //        break;
                                //    }
                                //}
                                processSlice(i, file);
                                iPool++;
                                if (i != sliceCount - 1 && iPool >= rep.poolSize) {
                                    //隔一秒钟检查一下，看看有没有切片已经上传完毕，有上传完的再请求上传
                                    timer = $interval(function () {
                                        var doingCount = 0;//正在上传的数量，如果这个数量小于并发数量，则加入新的请求
                                        for (var x = 0; x < $scope.files.length; x++) {
                                            if ($scope.files[i]['percentComplete'] != 100) {
                                                doingCount++;
                                            }
                                        }
                                        if (doingCount < rep.poolSize) {
                                            iPool -= rep.poolSize - doingCount;//少几个发几个
                                            $interval.cancel(timer);
                                        }
                                    }, 500);
                                }
                            }
                            //分片合并请求
                            //目前仅仅支持单个文件上传，分块上传这个地方前端得优化，包括上传界面，参数传值等等。
                            timer = $interval(function () {
                                if (successCount == sliceCount) {
                                    file['mergeRequest'] = true;
                                    file['sliceRequest'] = false;
                                    uploadFileSlice(file);
                                    $interval.cancel(timer);
                                }
                            }, 10);
                        }
                        //else if (file.index != undefined) {
                        //// 前端查看切片设置文件如果有未发送的增加切片上传请求=》后端
                        //sliceConfig.sliceList[rep.index] = 2;
                        //var finish = 0;
                        //for (var i = 0; i < sliceConfig.sliceList.length; i++) {
                        //    if (sliceConfig.sliceList[i] === 2) {
                        //        finish = finish + 1;
                        //    } else if (sliceConfig.sliceList[i] === 0) {
                        //        for (var j = 0; j < $scope.files.length; i++) {
                        //            if ($scope.files[j].fileName === rep.primaryName) {
                        //                processSlice(i, $scope.files[j]);
                        //                break;
                        //            }
                        //        }
                        //    }
                        //}
                        //
                        //$timeout(function () {
                        //    for (var i = 0; i < $scope.files.length; i++) {
                        //        if ($scope.files[i].fileName === rep.primaryName) {
                        //            $scope.files[i].percentComplete = Math.round(finish * 100 / sliceConfig.sliceList.length);
                        //            console.log('primary file uploadProgress, percentComplete=' + $scope.files[i].percentComplete);
                        //        }
                        //    }
                        //})
                        // }
                        else if (rep.code == 0 && rep.message == 'slice_receive_success') {
                            successCount++;
                        } else if (file.validateRequest && rep.code == 0) {
                            file['validateRequest'] = false;
                            if (rep.body) {
                                //有返回值
                                file['instantaneous'] = true;
                                console.log(file)
                            }
                        }
                    }, false);

                    xhr.addEventListener("error", uploadFailed, false);
                    xhr.addEventListener("abort", uploadCanceled, false);
                    /* Be sure to change the url below to the url of your upload server side script */
                    xhr.send(fd);
                }

                //$scope.breakInterval = function () {
                //    $interval.cancel(timer);
                //}

                $scope.uploadFile = function () {
                    console.log('$scope.groupId=' + $scope.groupId);
                    $scope.upload_disabled = true;
                    $scope.files.forEach(function (file) {
                        successCount = 0;
                        var chunks = Math.ceil(file.fileSize / chunkSize)
                            , currentChunk = 0
                            , spark = new SparkMD5(),
                            fileReader = new FileReader();
                        fileReader.onload = function (e) {
                            spark.appendBinary(e.target.result);
                            currentChunk++;
                            if (currentChunk < chunks) {
                                loadFile(currentChunk, fileReader, file);
                            } else {
                                file['MD5'] = spark.end();
                                //计算完MD5值后，首先向服务器验证是否已经存在该文件，如果存在则不必上传文件实体，实现秒传功能
                                /**
                                 * 这里应该是验证秒传功能的地方
                                 */
                                file['validateRequest'] = true;
                                uploadFileSlice(file);
                                if (file.instantaneous) {
                                    console.log(file.fileName + " instantaneous sended! ")
                                } else {
                                    if (file.fileSize > SLICE_SIZE && !(window.FileAPI && window.FileAPI.shouldLoad)) {	//如果大于切片大小
                                        file['sliceRequest'] = true;
                                    }
                                    uploadFileSlice(file);
                                }
                            }
                        };
                        loadFile(currentChunk, fileReader, file);
                    });

                };

                function loadFile(currentChunk, fileReader, file) {
                    var start = currentChunk * chunkSize, end = start + chunkSize >= file.fileSize ? file.fileSize : start + chunkSize;
                    fileReader.readAsBinaryString(blobSlice.call(file.fileObj, start, end));
                }

                function uploadFailed(evt) {
                    console.log("There was an error attempting to upload the file.");
                }

                function uploadCanceled(evt) {
                    console.log("The upload has been canceled by the user or the browser dropped the connection.");
                }

            }])

    .directive('euiFileupload', ['$timeout', function ($timeout) {
        return {
            replace: true,
            controller: 'FileUploadController',
            //controllerAs: 'upload',
            //require: 'upload',
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'template/fileupload/fileupload.html';
            },
            scope: {
                uploadUrl: '@',
                groupId: '@',
                result: '&'
            },

            link: function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    $timeout(function () {
                        if (scope.hasResult) {
                            return;
                        }

                        var finish = 0;
                        for (var i = 0; i < scope.files.length; i++) {
                            if (scope.files[i].percentComplete !== 100) {
                                break;
                            } else if (scope.files[i].primaryName == undefined) {
                                finish = finish + 1;
                            }
                        }
                        if (finish && scope.filesCount === finish) {
                            //console.log( result.ID ); //附件ID
                            //console.log( result.FJMC ); //附件名称
                            //console.log( result.FZID ); //分组ID
                            //console.log( result.FJDZ ); //附件地址
                            var ret = [];
                            for (var i = 0; i < scope.files.length; i++) {
                                if (scope.files[i].primaryName == undefined) {
                                    ret.push({
                                        ID: scope.files[i].fileId,
                                        FJMC: scope.files[i].fileName,
                                        FZID: scope.files[i].groupId,
                                        FJDZ: 'path'
                                    });
                                }
                            }
                            scope.hasResult = true;
                            scope.result({resultData: ret});
                        }
                    }, 1000);
                });
            }

        };
    }])

    //上传测试
    .service('fileUploadService', ['$document', function ($rootScope) {
        this.actionUrl = 'http://localhost:8080/fileUpload';
        //this.actionUrl = 'http://localhost:8083/engine/image/upload';

        this.setActionUrl = function (url) {
            this.actionUrl = url;
        };

        this.queryGroupFile = function (groupId, cb) {
            console.log('groupId' + groupId);
            if (cb) {
                cb([{ID: 111, FJMC: 'fileName1', FJID: 'abc', FJDZ: 'path'},
                    {ID: 222, FJMC: 'fileName2', FJID: 'def', FJDZ: 'path'}]
                );
            }
        };

        this.queryFile = function (fileId, cb) {
            console.log('fileId' + fileId);
            if (cb) {
                cb({ID: 111, FJMC: 'fileName1', FJID: 'abc', FJDZ: 'path'});
            }
        };

        this.deleteGroupFile = function (groupId, cb) {
            console.log('groupId' + groupId);
            if (cb) {
                cb({success: "true"});
            }
        };

        this.deleteFile = function (fileId, cb) {
            console.log('fileId' + fileId);
            if (cb) {
                cb({success: "true"});
            }
        };

    }])
    //MD5计算
    .service('MD5', [function () {

    }])
;

/**
 * 文件名：dataGrid指令
 * 创建人：吴睿琪
 * 创建时间：2016年3月20日
 * 修改日志：
 */
angular.module('eui.grid', ['eui'])

    .directive('euiGrid', [
      '$timeout','$http','$sce', 'reqChannel',function($timeout, $http, $sce,reqChannel) {
        return {
          templateUrl: function(element, attrs) {
            return attrs.templateUrl || 'template/grid/grid.html';
          },
          transclude: true,
          replace: true,
          restrict:'EA',
          scope: {
            gridOptions: '=',
            gridData: '=?',
            element:'=?',
            onRegisterApi:'&',
            gridMethods:'=?'
          },
          link: function(scope, element, attrs) {
            var eui = window.eui;
            var dg = {};  // grid对象，包括grid的默认属性配置、方法
            var gridDataCenter; // grid元素的数据存储集合
            var gridStyle={
              "panel":{},
              "datagridWrap":{},
              "datagridView":{},
              "datagridView1":{},
              "datagridView1head":{},
              "datagridView1body":{},
              "datagridView1foot":{},
              "datagridView1htable":{},
              "datagridView2":{},
              "datagridView2head":{},
              "datagridView2body":{},
              "datagridView2foot":{},
              "datagridView2htable":{}
            };  // grid里面各元素的样式设置
            var paraConfig = {
              "rownumbersWidth":28
            };
            var _width;   //grid宽度
            var _height;   //grid高度
            //var grid_body_tr_idindex = 0;
            var gridData = []; //重新组装之后的grid数据，用于赋值scope.rows

            $.fn._propAttr=$.fn.prop||$.fn.attr;

            _width = attrs.width? attrs.width:element.parent().width();
            _height = attrs.height? attrs.height:element.parent().height();
            if (scope.gridMethods != null) {
              if (angular.isObject(scope.gridMethods)) {
                dg.methods = scope.gridMethods;
                //表格默认方法

                //返回属性对象
                dg.methods.options = function () {
                  var opts = gridDataCenter.options;
                  return opts;
                };

                //返回面板对象
                dg.methods.getPanel = function () {
                  return gridDataCenter.panel;
                };
                //返回页面对象
                dg.methods.getPager = function () {
                  return gridDataCenter.panel.children("div.datagrid-pager");
                };
                //返回列字段。如果设置了frozen属性为true，将返回固定列的字段名
                dg.methods.getColumnFields = function (frozen) {
                  return _getColumnFields(frozen);
                };
                //返回指定列属性
                dg.methods.getColumnOption = function (field) {
                  return _getColumnOption(field);
                };
                //做调整和布局
                dg.methods.resize = function (param) {
                  return _resize(param);
                };
                //加载和显示第一页的所有行。如果指定了'param'，它将取代'queryParams'属性。通常可以通过传递一些参数执行一次查询，通过调用这个方法从服务器加载新数据
                dg.methods.load = function (param) {
                  var opts =dg.methods.options();
                  opts.pageNumber = 1;
                  _load(param);
                };
                //重载行。等同于'load'方法，但是它将保持在当前页
                dg.methods.reload = function (param) {
                  return function () {
                    _load(param);
                  };
                };
                //重载页脚行。代码示例
                dg.methods.reloadFooter = function (footer) {
                  return function () {
                    var opts = gridDataCenter.options;
                    var dc = gridDataCenter.dc;
                    if (footer) {
                      gridDataCenter.footer = footer;
                    }
                    if (opts.showFooter) {
                      opts.view.renderFooter.call(opts.view, this, dc.footer2, false);
                      opts.view.renderFooter.call(opts.view, this, dc.footer1, true);
                      if (opts.view.onAfterRender) {
                        opts.view.onAfterRender.call(opts.view, this);
                      }
                      dg.methods.fixRowHeight(this);
                    }
                  };
                };
                //显示载入状态
                dg.methods.loading = function () {
                  return function () {
                    var opts = gridDataCenter.options;
                    dg.methods.getPager(this).pagination("loading");
                    if (opts.loadMsg) {
                      var Panel =dg.methods.getPanel(this);
                      $("<div class=\"datagrid-mask\" style=\"display:block\"></div>").appendTo(Panel);
                      var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:block;left:50%\"></div>").html(opts.loadMsg).appendTo(Panel);
                      msg.css("marginLeft", -msg.outerWidth() / 2);
                    }
                  };
                };
                //隐藏载入状态
                dg.methods.loaded = function () {
                  return function () {
                    dg.methods.getPager(this).pagination("loaded");
                    var Panel =dg.methods.getPanel(this);
                    Panel.children("div.datagrid-mask-msg").remove();
                    Panel.children("div.datagrid-mask").remove();
                  };
                };
                //使列自动展开/收缩到合适的数据表格宽度
                dg.methods.fitColumns = function () {
                  return function () {
                    _fitColumns(this);
                  };
                };
                //固定列大小。如果'field'参数未配置，所有列大小将都是固定的
                dg.methods.fixColumnSize = function (field) {
                  return function () {
                    _fixColumnSize(field);
                  };
                };
                //固定指定列高度。如果'index'参数未配置，所有行高度都是固定的
                dg.methods.fixRowHeight = function (index) {
                  return _fixRowHeight(index);
                };
                //冻结指定行，当数据表格表格向下滚动的时候始终保持被冻结的行显示在顶部
                dg.methods.freezeRow = function (index) {
                  return function () {
                    _freezeRow(this, index);
                  };
                };
                //自动调整列宽度以适应内容
                dg.methods.autoSizeColumn = function (field) {
                  return function () {
                    _autoSizeColumn(this, field);
                  };
                };
                //加载本地数据，旧的行将被移除
                dg.methods.loadData = function (data) {
                  return function () {
                    //buildGridBody(this, data);
                    _loadData(this);
                  };
                };
                //返回加载完毕后的数据
                dg.methods.getData = function () {
                  return gridDataCenter.data;
                };
                //返回当前页的所有行
                dg.methods.getRows = function () {
                  return gridDataCenter.data.rows;
                };
                //返回页脚行
                dg.methods.getFooterRows = function () {
                  return gridDataCenter.footer;
                };
                //返回指定行的索引号，该行的参数可以是一行记录或一个ID字段值
                dg.methods.getRowIndex = function (id) {
                  return _getRowIndex(id);
                };
                //在复选框呗选中的时候返回所有行
                dg.methods.getChecked = function () {
                  return _getChecked();
                };
                //返回第一个被选中的行或如果没有选中的行则返回null
                dg.methods.getSelected = function () {
                  var rows = _getSelected();
                  return rows.length > 0 ? rows[0] : null;
                };
                //返回所有被选中的行，当没有记录被选中的时候将返回一个空数组
                dg.methods.getSelections = function () {
                  return _getSelected();
                };
                //清除所有选择的行
                dg.methods.clearSelections = function () {
                  return function () {
                    var selectedRows = gridDataCenter.selectedRows;
                    selectedRows.splice(0, selectedRows.length);
                    _clearSelections(this);
                  };
                };
                //清楚所有勾选的行
                dg.methods.clearChecked = function () {
                  return function () {
                    var checkedRows = gridDataCenter.checkedRows;
                    checkedRows.splice(0, checkedRows.length);
                    _clearChecked(this);
                  };
                };
                //clearChecked
                dg.methods.selectAll = function () {
                  return function () {
                    _selectAll(this);
                  };
                };
                //取消选择所有当前页中所有的行
                dg.methods.unselectAll = function () {
                  return function () {
                    _clearSelections(this);
                  };
                };
                //选择一行，行索引从0开始
                dg.methods.selectRow = function (index) {
                  return function () {
                    _selectRow(this, index);
                  };
                };
                //通过ID值参数选择一行
                dg.methods.selectRecord = function (id) {
                  return function () {
                    _selectRecord(this, id);
                  };
                };
                //取消选择一行
                dg.methods.unselectRow  = function (index) {
                  return function () {
                    _unselectRow(this, index);
                  };
                };
                //勾选一行，行索引从0开始
                dg.methods.checkRow = function (index) {
                  return function () {
                    _checkRow(this, index);
                  };
                };

                dg.methods.uncheckRow = function (_1b7) {
                  return function () {
                    _uncheckRow(this, _1b7);
                  };
                };
                //勾选当前页中的所有行
                dg.methods.checkAll = function () {
                  return function () {
                    _checkAll(this);
                  };
                };
                //取消勾选当前页中的所有行
                dg.methods.uncheckAll = function () {
                  return function () {
                    _clearChecked(this);
                  };
                };
                //开始编辑行
                dg.methods.beginEdit = function (index) {
                  return function () {
                    _beginEdit(this, index);
                  };
                };
                //结束编辑行
                dg.methods.endEdit = function (index, data) {
                  return function () {
                    _endEdit(this, index, false, data);
                  };
                };
                //取消编辑行
                dg.methods.cancelEdit = function (index) {
                  return function () {
                    _endEdit(this, index, true);
                  };
                };
                //获取指定行的编辑器。每个编辑器都有以下属性：
                //actions：编辑器可以执行的动作，同编辑器定义。
                //target：目标编辑器的uery对象。
                //field：字段名称。
                //type：编辑器类型，比如：'text','combobox','datebox'等。
                dg.methods.getEditors = function (index) {
                  return _getEditors(element[0], index);
                };
                //获取指定编辑器，options包含2个属性：
                //index：行索引。
                //field：字段名称。
                dg.methods.getEditor = function (options) {
                  return _getEditor(element[0], options);
                };
                //刷新行。
                dg.methods.refreshRow = function (index) {
                  //return function () {
                  var opts = gridDataCenter.options;
                  opts.view.refreshRow.call(opts.view, index);
                  //});
                };
                //验证指定的行，当验证有效的时候返回true
                dg.methods.validateRow = function (index) {
                  return validateRow(element[0], index);
                };
                //更新指定行，参数包含下列属性：
                //index：执行更新操作的行索引。
                //row：更新行的新数据
                dg.methods.updateRow = function (param) {
                  var opts = gridDataCenter.options;
                  opts.view.updateRow.call(opts.view, param.index, param.row);
                };
                //追加一个新行。新行将被添加到最后的位置
                dg.methods.appendRow = function (row) {
                  return function () {
                    _appendRow(this, row);
                  };
                };
                //插入一个新行，参数包括一下属性：
                //index：要插入的行索引，如果该索引值未定义，则追加新行。
                //row：行数据
                dg.methods.insertRow = function (param) {
                  return function () {
                    _insertRow(this, param);
                  };
                };
                //删除行
                dg.methods.deleteRow = function (index) {
                  return _deleteRow(index);
                };
                //从上一次的提交获取改变的所有行。类型参数指明用哪些类型改变的行，可以使用的值有：inserted,deleted,updated等。当类型参数未配置的时候返回所有改变的行
                dg.methods.getChanges = function (type) {
                  return _getChanges(type);
                };
                //提交所有从加载或者上一次调用acceptChanges函数后更改的数据
                dg.methods.acceptChanges = function () {
                  return function () {
                    _acceptChanges(this);
                  };
                };
                //回滚所有从创建或者上一次调用acceptChanges函数后更改的数据
                dg.methods.rejectChanges = function () {
                  return function () {
                    _rejectChanges(this);
                  };
                };
                //合并单元格，options包含以下属性：
                //index：行索引。
                //field：字段名称。
                //rowspan：合并的行数。
                //colspan：合并的列数。
                dg.methods.mergeCells = function (options) {
                  return _mergeCells(element[0], options);
                };
                //显示指定的列
                dg.methods.showColumn = function (field) {
                  return function () {
                    var Panel =dg.methods.getPanel(this);
                    Panel.find("td[field=\"" + field + "\"]").show();
                    dg.methods.getColumnOption(this, field).hidden = false;
                    dg.methods.fitColumns(this);
                  };
                };
                //隐藏指定的列
                dg.methods.hideColumn = function (field) {
                  return function () {
                    var Panel =dg.methods.getPanel(this);
                    Panel.find("td[field=\"" + field + "\"]").hide();
                    dg.methods.getColumnOption(this, field).hidden = true;
                    dg.methods.fitColumns(this);
                  };
                };
              }
            };
            function configGrid(){
              var options = scope.gridOptions || {};
              var opts;

              //如果存在项目配置参数，则合并项目整体配置参数
              if(eui && eui.appData && eui.appData.compParaConf && eui.appData.compParaConf.grid){
                if(angular.isObject(eui.appData.compParaConf.grid)){
                  opts = $.extend({}, $.extend({}, dg.defaults, eui.appData.compParaConf.grid), options);
                }
              } else {
                opts = $.extend({}, $.extend({}, dg.defaults), options);
              }
              scope.gridOptions = opts;
              if(opts.formatterFun){
                scope.formatterFun = opts.formatterFun;
              }

              //$(element).css("width", "").css("height", "");
              var gridWrap = wrapGrid(opts.rownumbers);

              opts.view = $.extend({}, opts.view);
              if (opts.title){
                _height -= 28;
              }
              opts.height = _height;
              gridDataCenter = {
                options: opts,
                panel: gridWrap.panel,
                dc: gridWrap.dc,
                selectedRows: [],
                checkedRows: [],
                data: { total: 0, rows: [] },
                originalRows: [],
                updatedRows: [],
                insertedRows: [],
                deletedRows: []
              };

              _fitGridSize();
              _fitColumns();

              init();

              //_loadData(element);

              //_resize(element);
              $timeout(function(){
                bindEvent();
              },100);

              if(opts.url){
                _load();
              }

              //设置冻结表格表头与数据
              scope.frozenColumnsRows = opts.frozenColumns;
              scope.frozenDataRows = gridData.frozenDataRows;

              //设置非冻结表格表头与数据
              scope.columnsRows = opts.columns;
              scope.dataRows = gridData.dataRows;

              //设置整体表格宽度及高度样式
              scope.gridStyle = gridStyle;
            }

            //初始化
            function init() {

              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var dc = datagrid.dc;

              var panel = datagrid.panel;
              //panel.panel($.extend({}, opts, {
              //  id: null,
              //  doSize: false,
              //  onResize: function (width, height) {
              //    setTimeout(function () {
              //      if (gridDataCenter) {
              //        //_fitGridSize();
              //        //_fitColumns();
              //        opts.onResize.call(panel, width, height);
              //      }
              //    }, 0);
              //  },
              //  onExpand: function () {
              //    _fixRowHeight();
              //    opts.onExpand.call(panel);
              //  }
              //}));
              //panel.width(_width);
              //panel.width();

              //datagrid.rowIdPrefix = "datagrid-row-r" + (++grid_body_tr_idindex);

              buildGridHeader(opts.frozenColumns, true);
              buildGridHeader(opts.columns, false);
              cellWidth();//设置单元格宽度


              //dc.header1.add(dc.header2).css("display", opts.showHeader ? "block" : "none");
              //dc.footer1.add(dc.footer2).css("display", opts.showFooter ? "block" : "none");

              //设置工具条
              if (opts.toolbar) {
                if (typeof opts.toolbar == "string") {
                  $(opts.toolbar).addClass("datagrid-toolbar").prependTo(panel);
                  $(opts.toolbar).show();
                } else {
                  $("div.datagrid-toolbar", panel).remove();
                  var tb = $("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(panel);
                  var tr = tb.find("tr");
                  for (var i = 0; i < opts.toolbar.length; i++) {
                    var btn = opts.toolbar[i];
                    if (btn == "-") {
                      $("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
                    } else {
                      var td = $("<td></td>").appendTo(tr);
                      var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                      tool[0].onclick = eval(btn.handler || function () {
                          });
                      tool.linkbutton($.extend({}, btn, { plain: true }));
                    }
                  }
                }
              } else {
                $("div.datagrid-toolbar", panel).remove();
              }
              //$("div.datagrid-pager", panel).remove();
              if (opts.pagination) {
                //var pager = $("<div class=\"datagrid-pager\"></div>");
                //if (opts.pagePosition == "bottom") {
                //  pager.appendTo(panel);
                //} else {
                //  if (opts.pagePosition == "top") {
                //    pager.addClass("datagrid-pager-top").prependTo(panel);
                //  } else {
                //    var pagertop = $("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(panel);
                //    pager.appendTo(panel);
                //    pager = pager.add(pagertop);
                //  }
                //}
                //分页
                scope.pageOptions = {
                  total: 0,
                  pageNumber: opts.pageNumber,
                  pageSize: opts.pageSize,
                  pageList: opts.pageList,
                  style:{
                    width:gridStyle.datagridView.width
                  },
                  onSelectPage: function (pageNumber, pageSize) {
                    opts.pageNumber = pageNumber;
                    opts.pageSize = pageSize;
                    if(opts.url){
                      _load();
                    }
                  }
                };

                //pager.pagination({
                //  total: 0,
                //  pageNumber: opts.pageNumber,
                //  pageSize: opts.pageSize,
                //  pageList: opts.pageList,
                //  onSelectPage: function (pageNumber, pageSize) {
                //    scope.$apply(function(){
                //      opts.pageNumber = pageNumber;
                //      opts.pageSize = pageSize;
                //    });
                //    //pager.pagination("refresh", { pageNumber: pageNumber, pageSize: pageSize });
                //    _load();
                //  }
                //});
              }

              parse(scope.gridData);
              buildGridBody(gridDataCenter.data);
              _showCheckbox();
              _showRownumbers();
              function buildGridHeader(clomuns, frozen) {
                if (clomuns.length < 1) {
                  return;
                }
                // 设置表格头的宽度
                var width = 0, tempWidth = 0;
                var title;
                //$(headerDiv).show();
                //$(headerDiv).empty();
                //var t = $("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(headerDiv);
                //var cell = $("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\">&nbsp;</span></div>").appendTo(element);
                //var length = cell.outerWidth() - cell.width();
                //cell.hide();
                //var length = 8;

                for (var i = 0; i < clomuns.length; i++) {
                  var column = clomuns[i];
                  for (var j = 0; j < column.length; j++) {
                    var col = column[j];
                    if (col.field) {
                      if (col.width) {
                        //col.width = opts.cellWidth[temp.field];
                        width += col.width;
                        //col.boxWidth = parseInt(col.width)-length;
                      } else {
                        col.auto = true;
                      }
                      col.halign = col.halign || col.align || "center";
                      //col.cellClass = "datagrid-cell-c" + grid_body_tr_idindex + "-" + col.field.replace(/\./g, "-");
                      //col.cellSelector = "div." + col.cellClass;
                    }
                    else {
                      col.group = true;
                    }

                    if(opts.showHeaderTitle){
                      col.tips = col.title
                    }

                    if(col.formatterTitle){
                      title = col.formatterTitle(col.title);
                    } else {
                      title = col.title
                    }

                    title = '<div>' + title + '</div>';
                    col.title = $sce.trustAsHtml(title);
                  }
                }

                //if (frozen){
                //  if (opts.rownumbers){
                //    gridStyle.datagridView1.width = width + paraConfig.rownumbersWidth + "px";
                //  } else {
                //    gridStyle.datagridView1.width = width + "px";
                //  }
                //} else {
                //  if (opts.rownumbers && !opts.frozenColumns.length){
                //    gridStyle.datagridView2.width = width + paraConfig.rownumbersWidth + "px";
                //  } else {
                //    gridStyle.datagridView2.width = width + "px";
                //  }
                //}

                //if (frozen && opts.rownumbers) {
                //  var td = $("<td rowspan=\"" + opts.frozenColumns.length + "\"><div class=\"datagrid-header-rownumber\"></div></td>");
                //  if ($("tr", t).length == 0) {
                //    td.wrap("<tr class=\"datagrid-header-row\"></tr>").parent().appendTo($("tbody", t));
                //  } else {
                //    td.prependTo($("tr:first", t));
                //  }
                //}

              };
              //设置单元格宽度
              function cellWidth() {
                //var ss = ["<style type=\"text/css\">"];
                var cellWidth = {};
                var clomuns = _getColumnFields(true).concat(_getColumnFields());
                for (var i = 0; i < clomuns.length; i++) {
                  var col = _getColumnOption(clomuns[i]);
                  //if (col && !col.checkbox) {
                  //  ss.push(col.cellSelector + " {width:" + col.boxWidth + "px;}");
                  //}
                  cellWidth[col.field] = col.width;
                }

                opts.cellWidth = cellWidth;

                //ss.push("</style>");
                //$(ss.join("\n")).prependTo(dc.view);
              };
            };

            //分页数据请求与数据绑定
            function _load(param) {
              var opts = gridDataCenter.options;
              if (param) {
                opts.queryParams = param;
              }

              var req = {
                method: opts.method,
                url: opts.url,
                data: {queryParams: opts.queryParams}
              };

              if (opts.pagination) {
                $.extend(req.data, { pageNumber: opts.pageNumber + opts.diffPage, pageSize: opts.pageSize });
              }
              if (opts.sort) {
                $.extend(req.data, { sort: opts.sort });
              }
              if (opts.onBeforeLoad.call(element, param) == false) {
                return;
              }
              //dg.methods.loading();

              /**
               * @description 适配数据解析
               * 例如：adapter="body.content",
               * data = {
                 *    body:{
                 *      content:[]
                 *    }
                 * }
               *
               * 返回数据data.body.content。
               *
               * @param {string} adapter 数据适配器。
               * @param {object} data 需要解析的数据。
               * @returns {*} 完成解析的数据。
               */
              function parseData(adapter, data){
                var adapterArray = [],
                    temp;
                if(!angular.isString(adapter)){
                  console.error(adapter + "必须为字符串");
                }
                if(!angular.isObject(data)){
                  console.error(data + "必须为对象");
                }

                adapterArray = adapter.split(".");

                for (var key in adapterArray){
                  data = data[adapterArray[key]]
                }
                return data;
              }

              $http(req).success(function (response) {
                if (opts.pagination) {
                  scope.gridData = {
                    data: parseData(opts.data.pageData,response),
                    page:{
                      pageNumber: parseInt(parseData(opts.data.pageNumber,response)) - opts.diffPage,
                      pageSize: parseData(opts.data.pageSize,response),
                      total: parseData(opts.data.total,response)
                    }
                  }
                } else {
                  scope.gridData = {
                    data: parseData(opts.data.data,response)
                  }
                }
              }).error(function (response, status) {
                var errInfo = ' http请求错误，服务器返回(Status Code:' + status + ',response: ' + response + ')';
                console.log(errInfo);
                opts.onLoadError.apply(element, arguments);
              });
            }

            //定义数据表格的视图 该视图是一个对象，将告诉数据表格如何渲染行。该对象必须定义下列函
            var view = {
              //    数据加载时调用。
              //target：DOM对象，数据表格对象。
              //container：行容器。
              //frozen：指明如何渲染冻结容器。
              render: function (container, frozen) {
                var datagrid = gridDataCenter;
                var opts = datagrid.options;
                var rows = datagrid.data.rows;
                var datas = [];
                var fields = dg.methods.getColumnFields(frozen);
                if (frozen) {
                  // 如果没有冻结表头，则返回
                  if(opts.frozenColumns && opts.frozenColumns.length === 0){
                    return;
                  }
                  //if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                  //  return;
                  //}
                }
                for (var i = 0; i < rows.length; i++) {
                  var data = {};
                  var row = rows[i];
                  data.striped  = (i % 2 && opts.striped) ? true:false;
                  data.rowStyle = opts.rowStyler ? opts.rowStyler.call(element,i, rows[i]) : {};
                  //style = style ? "style=\"" + style + "\"" : "";
                  //data.id = datagrid.rowIdPrefix + "-" + (frozen ? 1 : 2) + "-" + i;
                  data.index = i;
                  data.selected = false;
                  data.row = [];
                  for(var j = 0; j <fields.length; j++){
                    var col = dg.methods.getColumnOption(fields[j]);
                    var temp = {};
                    var key = fields[j];
                    var value = "";

                    if(col.hidden){
                      temp.hidden = col.hidden;
                    }
                    temp.field = key;
                    //temp.class = "datagrid-cell-c1-" + key;
                    temp.width = opts.cellWidth[temp.field];

                    if(col.formatter){
                      value = col.formatter(row[fields[j]], row, data.index);
                    } else {
                      if(row[fields[j]] === undefined){
                        value = "";
                      } else {
                        value = row[fields[j]];
                      }
                    }
                    temp.align = col.align || "center";

                    if (!opts.nowrap) {
                      temp.height = "auto"
                    }

                    if(opts.showBodyTitle){
                      temp.tips = row[fields[j]]
                    }

                    value = '<div>' + value + '</div>';
                    temp.value = $sce.trustAsHtml(value);
                    if(col){
                      temp.style = col.styler ? (col.styler(row[fields[j]], row, data.index) || {}) : {};
                    }
                    data.row.push(temp);
                  }
                  datas.push(data);
                }
                if (frozen) {
                  gridData.frozenDataRows = datas;
                } else {
                  gridData.dataRows = datas;
                }
              },
              //这是一个选择函数来渲染行页脚
              renderFooter: function (container, frozen) {
                var opts = gridDataCenter.options;
                var rows = gridDataCenter.footer || [];
                var fields = dg.methods.getColumnFields(frozen);
                var html = ["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
                for (var i = 0; i < rows.length; i++) {
                  html.push("<tr class=\"datagrid-row\" datagrid-row-index=\"" + i + "\">");
                  html.push(this.renderRow.call(this, target, fields, frozen, i, rows[i]));
                  html.push("</tr>");
                }
                html.push("</tbody></table>");
                $(container).html(html.join(""));
              },
              //这是一个属性功能，将调用render函数
              renderRow: function (fields, frozen, rowIndex, rowData) {
                var opts = gridDataCenter.options;
                var cc = [];
                var rowIndex = rowIndex + 1;
                if (opts.pagination) {
                  rowIndex += (opts.pageNumber - 1) * opts.pageSize;
                }
                if(frozen){
                  if(opts.frozenColumns && opts.frozenColumns.rownumbers){
                    cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">" + rowIndex + "</div></td>");
                  }
                  if(opts.frozenColumns && opts.frozenColumns.checkbox){
                    cc.push("<td><div class=\"datagrid-cell-check\"><input type=\"checkbox\"></div></td>");
                  }
                } else {
                  if(opts.columns && opts.columns.rownumbers){
                    cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">" + rowIndex + "</div></td>");
                  }
                  if(opts.columns && opts.columns.checkbox){
                    cc.push("<td><div class=\"datagrid-cell-check\"><input type=\"checkbox\"></div></td>");
                  }
                }

                for (var i = 0; i < fields.length; i++) {
                  var field = fields[i];
                  var col = dg.methods.getColumnOption(field);
                  if (col) {
                    var value = rowData[field];
                    var style = col.styler ? (col.styler(value, rowData, rowIndex) || "") : "";
                    var style = col.hidden ? "style=\"display:none;" + style + "\"" : (style ? "style=\"" + style + "\"" : "");
                    cc.push("<td field=\"" + field + "\" " + style + ">");
                    var style = "";
                    if (col.align) {
                      style += "text-align:" + col.align + ";";
                    }
                    if (!opts.nowrap) {
                      style += "white-space:normal;height:auto;";
                    } else {
                      if (opts.autoRowHeight) {
                        style += "height:auto;";
                      }
                    }
                    cc.push("<div style=\"" + style + "\" ");
                    if (col.checkbox) {
                      cc.push("class=\"datagrid-cell-check ");
                    } else {
                      cc.push("class=\"datagrid-cell " + col.cellClass);
                    }
                    cc.push("\">");
                    //if (col.checkbox) {
                    //  cc.push("<input type=\"checkbox\" name=\"" + field + "\" value=\"" + (value != undefined ? value : "") + "\"/>");
                    //} else {
                    if (col.formatter) {
                      cc.push(col.formatter(value, rowData, rowIndex));
                    } else {
                      cc.push(value);
                    }
                    //}
                    cc.push("</div>");
                    cc.push("</td>");
                  }
                }
                return cc.join("");
              },
              //定义如何刷新指定的行
              refreshRow: function (rowIndex) {
                var opts = gridDataCenter.options;
                var rows = gridDataCenter.data.rows;

                var oldCss=parserCss(rowIndex);
                var newCss=parserCss(rowIndex);
                var oldClass=oldCss.c;
                var newStyle=newCss.s;
                var newClass="datagrid-row "+(rowIndex%2&&opts.striped?"datagrid-row-alt ":" ")+newCss.c;
                function parserCss(rowIndex){
                  var cssJson=opts.rowStyler?opts.rowStyler.call(element,rowIndex,rows[rowIndex]):{};
                  var a = angular.toJson(cssJson);
                  var b = angular.fromJson(cssJson);
                  //增加cssjson转css字符串操作
                  var css = "";
                  var rowClass="";
                  var rowStyle="";

                  if(typeof css=="string"){
                    rowStyle=css;
                  }else{
                    if(css){
                      rowClass=css["class"]||"";
                      rowStyle=css["style"]||"";
                    }
                  }

                  return {c:rowClass,s:rowStyle};
                };
                function setRow(state){
                  var fields = dg.methods.getColumnFields(state);
                  var tr=opts.finder.getTr(rowIndex,"body",(state?1:2));
                  var checked=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                  tr.html(this.renderRow.call(this,target,fields,state,rowIndex,rows[rowIndex]));
                  tr.attr("style",newStyle).removeClass(oldClass).addClass(newClass);
                  if(checked){
                    tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
                  }
                };
                setRow.call(this,true);
                setRow.call(this,false);
                dg.methods.fixRowHeight(rowIndex);

                //this.updateRow.call(this, target, rowIndex, {});
              },
              //更新行
              updateRow: function (rowIndex, row) {
                var opts = gridDataCenter.options;
                var rows = gridDataCenter.data.rows;

                //var oldCss=parserCss(rowIndex);
                $.extend(rows[rowIndex],row);
                //var newCss=parserCss(rowIndex);
                //var oldClass=oldCss.c;
                //var newStyle=newCss.s;
                //var newClass="datagrid-row "+(rowIndex%2&&opts.striped?"datagrid-row-alt ":" ")+newCss.c;
                //function parserCss(rowIndex){
                //  var cssJson=opts.rowStyler?opts.rowStyler.call(rowIndex,rows[rowIndex]):{};
                //  var a = angular.toJson(cssJson);
                //  var b = angular.fromJson(cssJson);
                //  //增加cssjson转css字符串操作
                //  var css = "";
                //  var rowClass="";
                //  var rowStyle="";
                //
                //  if(typeof css=="string"){
                //    rowStyle=css;
                //  }else{
                //    if(css){
                //      rowClass=css["class"]||"";
                //      rowStyle=css["style"]||"";
                //    }
                //  }
                //
                //  return {c:rowClass,s:rowStyle};
                //};
                //function setRow(state){
                //  var fields = dg.methods.getColumnFields(state);
                //  var tr=opts.finder.getTr(rowIndex,"body",(state?1:2));
                //  var checked=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                //  tr.html(this.renderRow.call(this,target,fields,state,rowIndex,rows[rowIndex]));
                //  tr.attr("style",newStyle).removeClass(oldClass).addClass(newClass);
                //  if(checked){
                //    tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
                //  }
                //};
                //setRow.call(this,true);
                //setRow.call(this,false);
                dg.methods.fixRowHeight(rowIndex);
              },
              //插入行
              insertRow: function (rowIndex, row) {
                var datagrid = gridDataCenter;
                var opts = datagrid.options;
                var dc = datagrid.dc;
                var data = datagrid.data;
                if (rowIndex == undefined || rowIndex == null) {
                  rowIndex = data.rows.length;
                }
                if (rowIndex > data.rows.length) {
                  rowIndex = data.rows.length;
                }
                function _1ee(_1ef) {
                  var _1f0 = _1ef ? 1 : 2;
                  for (var i = data.rows.length - 1; i >= rowIndex; i--) {
                    var tr = opts.finder.getTr(i, "body", _1f0);
                    tr.attr("datagrid-row-index", i + 1);
                    //tr.attr("id", datagrid.rowIdPrefix + "-" + _1f0 + "-" + (i + 1));
                    if (_1ef && opts.rownumbers) {
                      var _1f1 = i + 2;
                      if (opts.pagination) {
                        _1f1 += (opts.pageNumber - 1) * opts.pageSize;
                      }
                      tr.find("div.datagrid-cell-rownumber").html(_1f1);
                    }
                  }
                };
                function _1f2(_1f3) {
                  var _1f4 = _1f3 ? 1 : 2;
                  var _1f5 = dg.methods.getColumnFields(_1f3);
                  //var _1f6 = datagrid.rowIdPrefix + "-" + _1f4 + "-" + rowIndex;
                  var tr = "<tr class=\"datagrid-row\" datagrid-row-index=\"" + rowIndex + "\"></tr>";
                  if (rowIndex >= data.rows.length) {
                    if (data.rows.length) {
                      opts.finder.getTr("", "last", _1f4).after(tr);
                    } else {
                      var cc = _1f3 ? dc.body1 : dc.body2;
                      cc.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr + "</tbody></table>");
                    }
                  } else {
                    opts.finder.getTr(rowIndex + 1, "body", _1f4).before(tr);
                  }
                };
                _1ee.call(this, true);
                _1ee.call(this, false);
                _1f2.call(this, true);
                _1f2.call(this, false);
                data.total += 1;
                data.rows.splice(rowIndex, 0, row);
                this.refreshRow.call(this, rowIndex);
              },
              //删除行
              deleteRow: function (rowIndex) {
                var datagrid = gridDataCenter;
                var opts = datagrid.options;
                var data = datagrid.data;
                function _1fa(_1fb) {
                  var _1fc = _1fb ? 1 : 2;
                  for (var i = rowIndex + 1; i < data.rows.length; i++) {
                    var tr = opts.finder.getTr(i, "body", _1fc);
                    tr.attr("datagrid-row-index", i - 1);
                    //tr.attr("id", datagrid.rowIdPrefix + "-" + _1fc + "-" + (i - 1));
                    if (_1fb && opts.rownumbers) {
                      var _1fd = i;
                      if (opts.pagination) {
                        _1fd += (opts.pageNumber - 1) * opts.pageSize;
                      }
                      tr.find("div.datagrid-cell-rownumber").html(_1fd);
                    }
                  }
                };
                opts.finder.getTr(rowIndex).remove();
                _1fa.call(this, true);
                _1fa.call(this, false);
                data.total -= 1;
                data.rows.splice(rowIndex, 1);
              },
              //在视图被呈现之前触发
              onBeforeRender: function (rows) {
              },
              //在视图呗呈现之后触发
              onAfterRender: function () {
                var opts = gridDataCenter.options;
                if (opts.showFooter) {
                  var footer = dg.methods.getPanel(element).find("div.datagrid-footer");
                  footer.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
                }
              }
            };

            dg.parseOptions = function (_1c8) {
              var t = $(_1c8);
              return $.extend({},
                  $.fn.panel.parseOptions(_1c8),
                  $.parser.parseOptions(_1c8, ["url", "toolbar", "idField", "sortName", "sortOrder", "pagePosition", "resizeHandle",
                    { fitColumns: "boolean", autoRowHeight: "boolean", striped: "boolean", nowrap: "boolean" },
                    { rownumbers: "boolean", singleSelect: "boolean", checkOnSelect: "boolean", selectOnCheck: "boolean" },
                    { pagination: "boolean", pageSize: "number", pageNumber: "number" },
                    { remoteSort: "boolean", showHeader: "boolean", showFooter: "boolean" },
                    { scrollbarSize: "number" }]), {
                    pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined),
                    loadMsg: (t.attr("loadMsg") != undefined ? t.attr("loadMsg") : undefined),
                    rowStyler: (t.attr("rowStyler") ? eval(t.attr("rowStyler")) : undefined)
                  });
            };

            //获取对象下标
            function getObjectIndex(a, o) {
              for (var i = 0, _3 = a.length; i < _3; i++) {
                if (a[i] == o) {
                  return i;
                }
              }
              return -1;
            };
            //根据id取消选择行
            function unSelectedRowsById(a, o, id) {
              if (typeof o == "string") {
                for (var i = 0, rows = a.length; i < rows; i++) {
                  if (a[i][o] == id) {
                    a.splice(i, 1);
                    return;
                  }
                }
              } else {
                var index = getObjectIndex(a, o);
                if (index != -1) {
                  a.splice(index, 1);
                }
              }
            };
            //返回标识字段列
            function idFieldRows(scRows, idfield, row) {
              for (var i = 0, rlength = scRows.length; i < rlength; i++) {
                if (scRows[i][idfield] == row[idfield]) {
                  return;
                }
              }
              scRows.push(row);
            };
            //做调整和布局
            function _resize(parm) {
              var flag = false;
              if(parm && parm.width){
                if(parseInt(parm.width) !== _width){
                  _width = parseInt(parm.width);
                  flag = true;
                }
              } else {
                if(element.parent().width() !== _width){
                  _width = element.parent().width();
                  flag = true;
                }
              }

              if (parm && parm.height){
                if (parseInt(parm.height) !== _height){
                  _height = parseInt(parm.height);
                  flag = true;
                }
              } else {
                if (element.parent().height() !== _height){
                  _height = element.parent().height();
                  flag = true;
                }
              }

              // 如果grid大小发生改变，重置grid
              if(flag){
                configGrid();
              }
            };
            //适应大小
            function _fitGridSize() {
              var opts = gridDataCenter.options;
              var frozenColumns = opts.frozenColumns;
              var dc = gridDataCenter.dc;
              var panel = gridDataCenter.panel;
              //var width = panel.width();
              var width = _width - 2;
              var height = _height;
              var gridView = dc.view;
              var gridView1 = dc.view1;
              var gridView2 = dc.view2;
              var gridHeader1 = gridView1.children("div.datagrid-header");
              var gridHeader2 = gridView2.children("div.datagrid-header");
              var gridTable1 = gridHeader1.find("table");
              var gridTable2 = gridHeader2.find("table");
              //var innerHeader = gridHeader1.children("div.datagrid-header-inner").show();


              gridStyle.datagridWrap = {"width":_width + "px","height":_height + "px"};
              gridStyle.panel = {"width":_width + "px"};

              //gridView.width(width);
              gridStyle.datagridView.width = width + "px";
              gridStyle.datagridView1.width = width + "px";
              gridStyle.datagridView2.width = width + "px";

              //gridView1.width(innerHeader.find("table").width());
              //gridStyle.datagridView1.width = innerHeader.find("table").width() + "px";
              //gridStyle.datagridView1.width = 208 + "px";
              if (!opts.showHeader) {
                innerHeader.hide();
              }
              //gridView2.width(width - gridView1.outerWidth());
              //gridStyle.datagridView2.width = width + "px";

              gridStyle.datagridView1head.width = gridStyle.datagridView1.width;
              gridStyle.datagridView1body.width = gridStyle.datagridView1.width;
              gridStyle.datagridView1foot.width = gridStyle.datagridView1.width;

              gridStyle.datagridView2head.width = gridStyle.datagridView2.width;
              gridStyle.datagridView2body.width = gridStyle.datagridView2.width;
              gridStyle.datagridView2foot.width = gridStyle.datagridView2.width;

              //gridView1.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(gridView1.width());
              //gridView2.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(gridView2.width());
              var hh = 25;
              //gridHeader1.css("height", "");
              //gridHeader2.css("height", "");
              //gridTable1.css("height", "");
              //gridTable2.css("height", "");
              //hh = Math.max(gridTable1.height(), gridTable2.height());

              gridStyle.datagridView1htable.height = hh + "px";
              gridStyle.datagridView2htable.height = hh + "px";
              gridStyle.datagridView1head.height = hh + "px";
              gridStyle.datagridView2head.height = hh + "px";



              //gridStyle.datagridView1head.height = "49px";
              //gridStyle.datagridView1htable.height = "50px";


              //gridTable1.height(hh);
              //gridTable2.height(hh);
              //gridHeader1.add(gridHeader2).outerHeight(hh);
              if (opts.height != "auto") {
                var fixedHeight = height - (hh + 1);
                //var fixedHeight = height - gridView2.children("div.datagrid-header").outerHeight() - gridView2.children("div.datagrid-footer").outerHeight() - panel.children("div.datagrid-toolbar").outerHeight();
                //panel.children("div.datagrid-pager").each(function () {
                //  fixedHeight -= $(this).outerHeight();
                //});

                if(opts.toolbar){
                  fixedHeight -= 26;
                }

                if(opts.pagination){
                  //分页高度31px
                  fixedHeight -= 31;
                }


                //dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({ position: "absolute", top: dc.header2.outerHeight() });
                //var height = dc.body2.children("table.datagrid-btable-frozen").outerHeight();
                var height = 0;
                $.extend(gridStyle.datagridView1body,{ marginTop: height, height: (fixedHeight - height) });
                $.extend(gridStyle.datagridView2body,{ marginTop: height, height: (fixedHeight - height) });
                //gridView1.add(gridView2).children("div.datagrid-body").css({ marginTop: height, height: (fixedHeight - height) });
              }
              gridStyle.datagridView1.height = parseInt(gridStyle.datagridView1head.height) + parseInt(gridStyle.datagridView1body.height) + "px";
              gridStyle.datagridView2.height = parseInt(gridStyle.datagridView2head.height) + parseInt(gridStyle.datagridView2body.height) + "px";

              gridStyle.datagridView.height =  gridStyle.datagridView2.height;
              //gridView.height(gridView2.height());
            };

            //固定指定列高度。如果'index'参数未配置，所有行高度都是固定的
            function _fixRowHeight(index, _21) {
              var rows = gridDataCenter.data.rows;
              var opts = gridDataCenter.options;
              var dc = gridDataCenter.dc;
              if (!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight || _21)) {
                if (index != undefined) {
                  var tr1 = opts.finder.getTr(index, "body", 1);
                  var tr2 = opts.finder.getTr(index, "body", 2);
                  alignRowHeight(tr1, tr2);
                } else {
                  var tr1 = opts.finder.getTr(0, "allbody", 1);
                  var tr2 = opts.finder.getTr(0, "allbody", 2);
                  alignRowHeight(tr1, tr2);
                  if (opts.showFooter) {
                    var tr1 = opts.finder.getTr(0, "allfooter", 1);
                    var tr2 = opts.finder.getTr(0, "allfooter", 2);
                    alignRowHeight(tr1, tr2);
                  }
                }
              }
              _fitGridSize();
              if (opts.height == "auto") {
                var gridBody1 = dc.body1.parent();
                var gridBody2 = dc.body2;
                var fullHeight = 0;
                var width = 0;
                gridBody2.children().each(function () {
                  var c = $(this);
                  if (c.is(":visible")) {
                    fullHeight += c.outerHeight();
                    if (width < c.outerWidth()) {
                      width = c.outerWidth();
                    }
                  }
                });


                if (width > gridBody2.width()) {
                  fullHeight += 18;
                }
                gridBody1.height(fullHeight);
                gridBody2.height(fullHeight);
                dc.view.height(dc.view2.height());
              }
              dc.body2.triggerHandler("scroll");
              function alignRowHeight(target1, target2) {
                for (var i = 0; i < target2.length; i++) {
                  var tr1 = $(target1[i]);
                  var tr2 = $(target2[i]);
                  tr1.css("height", "");
                  tr2.css("height", "");
                  var height = Math.max(tr1.height(), tr2.height());
                  tr1.css("height", height);
                  tr2.css("height", height);
                }
              };
            };

            //冻结指定行，当数据表格表格向下滚动的时候始终保持被冻结的行显示在顶部
            function _freezeRow(index) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var dc = datagrid.dc;
              if (!dc.body2.children("table.datagrid-btable-frozen").length) {
                dc.body1.add(dc.body2).prepend("<table class=\"datagrid-btable datagrid-btable-frozen\" cellspacing=\"0\" cellpadding=\"0\"></table>");
              }
              getfreeze_RowCells(true);
              getfreeze_RowCells(false);
              _fitGridSize();
              function getfreeze_RowCells(freezeColmuns) {

                var step = freezeColmuns ? 1 : 2;
                var tr = opts.finder.getTr(index, "body", step);

                (freezeColmuns ? dc.body1 : dc.body2).children("table.datagrid-btable-frozen").append(tr);
              };
            };

            //获取表格数据
            function getGridData() {
              var data = { total: 0, rows: [] };
              var fields = _getColumnFields(true).concat(_getColumnFields(false));

              $().find("tbody tr").each(function () {
                data.total++;
                var col = {};
                for (var i = 0; i < fields.length; i++) {
                  col[fields[i]] = $("td:eq(" + i + ")", this).html();
                }
                data.rows.push(col);
              });
              return data;
            };

            function bindEvent() {
              var datagrid = gridDataCenter;
              var panel = datagrid.panel;
              var opts = datagrid.options;
              var dc = datagrid.dc;
              var headinner = dc.header1.add(dc.header2);
              dc.body2.bind("scroll", function () {//grid body 滚动条事件
                dc.view1.children("div.datagrid-body").scrollTop($(this).scrollTop());
                dc.view2.children("div.datagrid-header,div.datagrid-footer").scrollLeft($(this).scrollLeft());
                dc.body2.children("table.datagrid-btable-frozen").css("left", -$(this).scrollLeft());
              });
            }
            //使列自动展开/收缩到合适的数据表格宽度
            function _fitColumns() {
              var opts = gridDataCenter.options;
              var dc = gridDataCenter.dc;
              //var panelWidth = gridDataCenter.panel.width();
              var panelWidth = gridStyle.datagridWrap.width;

              //如果表格列固定或者有冻结的表格列，则不调整自动调整列宽度
              if (!opts.fitColumns || opts.frozenColumns.length) {
                return;
              }
              var header = dc.view2.children("div.datagrid-header");
              var visableWidth = 0;
              var visableColumn;
              var fields = _getColumnFields(false);
              for (var i = 0; i < fields.length; i++) {
                var col = _getColumnOption(fields[i]);
                if (_7a(col)) {
                  visableWidth += col.width;
                  visableColumn = col;
                }
              }
              var innerHeader = header.children("div.datagrid-header-inner").show();
              gridStyle.datagridView2.width = panelWidth;
              var fullWidth = parseInt(gridStyle.datagridView2.width) -  visableWidth - fields.length - opts.scrollbarSize;
              if(opts.checkbox){
                fullWidth -= 28;
              }
              if(opts.rownumbers){
                fullWidth -= 28;
              }
              var rate = fullWidth / visableWidth;
              if (!opts.showHeader) {
                innerHeader.hide();
              }
              for (var i = 0; i < fields.length; i++) {
                var col = _getColumnOption(fields[i]);
                if (_7a(col)) {
                  var width = Math.floor(col.width * rate);
                  fitColumnWidth(col, width);
                  fullWidth -= width;
                }
              }
              if (fullWidth && visableColumn) {
                fitColumnWidth(visableColumn, fullWidth);
              }
              //_fixColumnSize();
              function fitColumnWidth(col, width) {
                col.width += width;
                //col.boxWidth += width;
              };
              function _7a(col) {
                if (!col.hidden && !col.auto) {
                  return true;
                }
              };
            };
            //自动调整列宽度以适应内容
            function _autoSizeColumn(field) {
              var opts = gridDataCenter.options;
              var dc = gridDataCenter.dc;
              if (field) {
                _resize(field);
                if (opts.fitColumns) {
                  _fitGridSize();
                  _fitColumns();
                }
              } else {
                var _85 = false;
                var _86 = _getColumnFields(true).concat(_getColumnFields(false));
                for (var i = 0; i < _86.length; i++) {
                  var field = _86[i];
                  var col = _getColumnOption(field);
                  if (col.auto) {
                    _resize(field);
                    _85 = true;
                  }
                }
                if (_85 && opts.fitColumns) {
                  _fitGridSize();
                  _fitColumns();
                }
              }
              function _resize(_87) {
                var _88 = dc.view.find("div.datagrid-header td[field=\"" + _87 + "\"] div.datagrid-cell");
                _88.css("width", "");
                var col = dg.methods.getColumnOption(_87);
                col.width = undefined;
                col.boxWidth = undefined;
                col.auto = true;
                dg.methods.fixColumnSize(_87);
                var _89 = Math.max(_88.outerWidth(), _8a("allbody"), _8a("allfooter"));
                _88.outerWidth(_89);
                col.width = _89;
                col.boxWidth = parseInt(_88[0].style.width);
                dg.methods.fixColumnSize(_87);
                opts.onResizeColumn.call(_87, col.width);
                function _8a(_8b) {
                  var _8c = 0;
                  opts.finder.getTr(0, _8b).find("td[field=\"" + _87 + "\"] div.datagrid-cell").each(function () {
                    var w = $(this).outerWidth();
                    if (_8c < w) {
                      _8c = w;
                    }
                  });
                  return _8c;
                };
              };
            };
            //固定列大小。如果'field'参数未配置，所有列大小将都是固定的
            function _fixColumnSize(field) {
              var opts = gridDataCenter.options;
              var dc = gridDataCenter.dc;
              var vtable = dc.view.find("table.datagrid-btable,table.datagrid-ftable");
              vtable.css("table-layout", "fixed");
              if (field) {
                fix(field);
              } else {
                var ff = _getColumnFields(true).concat(_getColumnFields(false));
                for (var i = 0; i < ff.length; i++) {
                  fix(ff[i]);
                }
              }
              vtable.css("table-layout", "auto");
              _91();
              setTimeout(function () {
                _fixRowHeight();
                fixEditorSize();
              }, 0);
              function fix(field) {
                var opts = gridDataCenter.options;
                var col = _getColumnOption(field);

                opts.cellWidth[col.field] = col.width ? col.width: "auto";
                //var _93 = dc.view.children("style")[0];
                //var _94 = _93.styleSheet ? _93.styleSheet : (_93.sheet || document.styleSheets[document.styleSheets.length - 1]);
                //var _95 = _94.cssRules || _94.rules;
                //for (var i = 0, len = _95.length; i < len; i++) {
                //  var _96 = _95[i];
                //  if (_96.selectorText.toLowerCase() == col.cellSelector.toLowerCase()) {
                //    //_96.style["width"] = col.boxWidth ? col.boxWidth + "px" : "auto";
                //    _96.style["width"] = col.width ? col.width + "px" : "auto";
                //    break;
                //  }
                //}
              };
            };
            function _91() {
              var dc = gridDataCenter.dc;
              dc.body1.add(dc.body2).find("td.datagrid-td-merged").each(function () {
                var td = $(this);
                var colspan = td.attr("colspan") || 1;
                var width = _getColumnOption(td.attr("field")).width;
                for (var i = 1; i < colspan; i++) {
                  td = td.next();
                  width += _getColumnOption(td.attr("field")).width + 1;
                }
                $(this).children("div.datagrid-cell").outerWidth(width);
              });
            };
            function fixEditorSize() {
              var dc = gridDataCenter.dc;
              dc.view.find("div.datagrid-editable").each(function () {
                var _9c = $(this);
                var _9d = _9c.parent().attr("field");
                var col = dg.methods.getColumnOption(_9d);
                _9c.outerWidth(col.width);
                var ed = $.data(this, "datagrid.editor");
                if (ed.actions.resize) {
                  ed.actions.resize(ed.target, _9c.width());
                }
              });
            };
            //返回指定列属性
            function _getColumnOption(field) {
              function getColumn(columns) {
                if (columns) {
                  for (var i = 0; i < columns.length; i++) {
                    var cc = columns[i];
                    for (var j = 0; j < cc.length; j++) {
                      var c = cc[j];
                      if (c.field == field) {
                        return c;
                      }
                    }
                  }
                }
                return null;
              };
              var opts = gridDataCenter.options;
              var col = getColumn(opts.columns);
              if (!col) {
                col = getColumn(opts.frozenColumns);
              }
              return col;
            };
            //返回列字段。如果设置了frozen属性为true，将返回固定列的字段名
            function _getColumnFields(frozen) {
              var opts = gridDataCenter.options;
              var columns = (frozen == true) ? (opts.frozenColumns) : opts.columns;
              if (columns.length == 0) {
                return [];
              }
              var fields = [];
              //function getFixedColspan(index) {
              //  var c = 0;
              //  var i = 0;
              //  while (true) {
              //    if (fields[i] == undefined) {
              //      if (c == index) {
              //        return i;
              //      }
              //      c++;
              //    }
              //    i++;
              //  }
              //};
              //function findColumnFields(r) {
              //  var ff = [];
              //  var c = 0;
              //  for (var i = 0; i < columns[r].length; i++) {
              //    var col = columns[r][i];
              //    if (col.field) {
              //      ff.push([c, col.field]);
              //    }
              //    c += parseInt(col.colspan || "1");
              //  }
              //  for (var i = 0; i < ff.length; i++) {
              //    ff[i][0] = getFixedColspan(ff[i][0]);
              //  }
              //  for (var i = 0; i < ff.length; i++) {
              //    var f = ff[i];
              //    fields[f[0]] = f[1];
              //  }
              //};
              for (var i = 0; i < columns.length; i++) {
                for(var j = 0; j < columns[i].length; j++){
                  if(columns[i][j].field){
                    fields.push(columns[i][j].field)
                  }
                }
                //findColumnFields(i);
              }
              return fields;
            };
            //加载本地数据，旧的行将被移除
            function buildGridBody(data) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var dc = datagrid.dc;

              //data = opts.loadFilter.call(data);
              data.total = parseInt(data.total);
              //datagrid.data = data;
              if (data.footer) {
                datagrid.footer = data.footer;
              }
              if (!opts.remoteSort) {
                var opt = _getColumnOption(opts.sortName);
                if (opt) {
                  var _b0 = opt.sorter || function (a, b) {
                        return (a > b ? 1 : -1);
                      };
                  data.rows.sort(function (r1, r2) {
                    return _b0(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == "asc" ? 1 : -1);
                  });
                }
              }
              if (opts.view.onBeforeRender) {
                opts.view.onBeforeRender.call(opts.view, data.rows);
              }
              opts.view.render.call(opts.view, dc.body2, false);
              opts.view.render.call(opts.view, dc.body1, true);
              if (opts.showFooter) {
                opts.view.renderFooter.call(opts.view, dc.footer2, false);
                opts.view.renderFooter.call(opts.view, dc.footer1, true);
              }
              if (opts.view.onAfterRender) {
                opts.view.onAfterRender.call(opts.view);
              }
              //dc.view.children("style:gt(0)").remove();
              if(opts.pagination){
                if (scope.pageOptions.total !== data.total) {
                  scope.pageOptions.total = data.total
                }
              }
              _fixRowHeight();
              dc.body2.triggerHandler("scroll");
              _b2();
              dg.methods.autoSizeColumn();
              function _b2() {
                if (opts.idField) {
                  for (var i = 0; i < data.rows.length; i++) {
                    var row = data.rows[i];
                    if (_b3(datagrid.selectedRows, row)) {
                      _selectRow(i, true);
                    }
                    if (_b3(datagrid.checkedRows, row)) {
                      _checkRow(i, true);
                    }
                  }
                }
                function _b3(a, r) {
                  for (var i = 0; i < a.length; i++) {
                    if (a[i][opts.idField] == r[opts.idField]) {
                      a[i] = r;
                      return true;
                    }
                  }
                  return false;
                };
              };
            };
            //返回指定行的索引号，该行的参数可以是一行记录或一个ID字段值
            function _getRowIndex(row) {
              var opts = gridDataCenter.options;
              var rows = gridDataCenter.data.rows;
              if (typeof row == "object") {
                return getObjectIndex(rows, row);
              } else {
                for (var i = 0; i < rows.length; i++) {
                  if (rows[i][opts.idField] == row) {
                    return i;
                  }
                }
                return -1;
              }
            };
            //返回所有被选中的行，当没有记录被选中的时候将返回一个空数组
            function _getSelected() {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var data = datagrid.data;
              var dataRows = scope.dataRows;
              if (opts.idField) {
                return datagrid.selectedRows;
              } else {
                var selectRows = [];
                //opts.finder.getTr("", "selected", 2).each(function () {
                //  var _be = parseInt($(this).attr("datagrid-row-index"));
                //  selectRows.push(data.rows[_be]);
                //});
                for(var i = 0; i < dataRows.length; i++){
                  if(dataRows[i].selected == true){
                    selectRows.push(data.rows[i]);
                  }
                }
                return selectRows;
              }
            };
            //在复选框呗选中的时候返回所有行
            function _getChecked() {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              if (opts.idField) {
                return datagrid.checkedRows;
              } else {
                var checkRows = [];
                datagrid.dc.view.find("div.datagrid-cell-check input:checked").each(function () {
                  var _c4 = $(this).closest("tr.datagrid-row").attr("datagrid-row-index");
                  checkRows.push(opts.finder.getRow(_c4));
                });
                return checkRows;
              }
            };
            //通过ID值参数选择一行
            function _selectRecord(id) {
              var opts = gridDataCenter.options;
              if (opts.idField) {
                var index = _getRowIndex(id);
                if (index >= 0) {
                  _selectRow(index);
                }
              }
            };
            //选择一行，行索引从0开始
            function _selectRow(index, state) {
              //var datagrid = gridDataCenter;
              var opts = gridDataCenter.options;
              //var selectRows = datagrid.selectedRows;
              if (opts.singleSelect) {
                _clearSelections();
                //selectRows.splice(0, selectRows.length);
              }
              if (!state && opts.checkOnSelect) {
                _checkRow(index, true);
              }
              var row = opts.finder.getRow(index);
              if (opts.idField) {
                idFieldRows(selectRows, opts.idField, row);
              }
              opts.onSelect(index, row);
              scope.dataRows[index].selected = true;
              //var tr = opts.finder.getTr(index).addClass("datagrid-row-selected");
              //if (tr.length) {
              //  if (tr.closest("table").hasClass("datagrid-btable-frozen")) {
              //    return;
              //  }
              //  var _d3 = dc.view2.children("div.datagrid-header").outerHeight();
              //  var _d4 = dc.body2;
              //  var _d5 = _d4.outerHeight(true) - _d4.outerHeight();
              //  var top = tr.position().top - _d3 - _d5;
              //  if (top < 0) {
              //    _d4.scrollTop(_d4.scrollTop() + top);
              //  } else {
              //    if (top + tr.outerHeight() > _d4.height() - 18) {
              //      _d4.scrollTop(_d4.scrollTop() + top + tr.outerHeight() - _d4.height() + 18);
              //    }
              //  }
              //}
            };
            function _unselectRow(index, state) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var dc = datagrid.dc;
              var selectedRows = datagrid.selectedRows;
              if (!state && opts.checkOnSelect) {
                _uncheckRow(index, true);
              }
              //opts.finder.getTr(index).removeClass("datagrid-row-selected");
              scope.dataRows[index].selected = false;
              var row = opts.finder.getRow(index);
              if (opts.idField) {
                unSelectedRowsById(selectedRows, opts.idField, row[opts.idField]);
              }
              opts.onUnselect(index, row);
            };
            function _selectAll(state) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var rows = datagrid.data.rows;
              var selectedRows = datagrid.selectedRows;
              if (!state && opts.checkOnSelect) {
                _checkAll(true);
              }
              //opts.finder.getTr("", "allbody").addClass("datagrid-row-selected");
              for(var i = 0 ; i < scope.dataRows.length; i++){
                scope.dataRows[i].selected = true;
              }
              //if (opts.idField) {
              //  for (var i = 0; i < rows.length; i++) {
              //    idFieldRows(selectedRows, opts.idField, rows[i]);
              //  }
              //}
              opts.onSelectAll(rows);
            };
            function _clearSelections(state) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var rows = datagrid.data.rows;
              var selectedRows = datagrid.selectedRows;
              if (!state && opts.checkOnSelect) {
                _clearChecked(true);
              }
              for(var i = 0 ; i < scope.dataRows.length; i++){
                scope.dataRows[i].selected = false;
              }

              //opts.finder.getTr("", "selected").removeClass("datagrid-row-selected");
              //if (opts.idField) {
              //  for (var i = 0; i < rows.length; i++) {
              //    unSelectedRowsById(selectedRows, opts.idField, rows[i][opts.idField]);
              //  }
              //}
              opts.onUnselectAll(rows);
            };
            //勾选一行
            function _checkRow(index, state) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              scope.dataRows[index].checked = true;

              if (!state && opts.selectOnCheck) {
                _selectRow(index, true);
              }
              //var ck = opts.finder.getTr(index).find("div.datagrid-cell-check input[type=checkbox]");
              //ck._propAttr("checked", true);
              //ck = opts.finder.getTr("", "allbody").find("div.datagrid-cell-check input[type=checkbox]:not(:checked)");
              //if (!ck.length) {
              //  var dc = datagrid.dc;
              //  var _f4 = dc.header1.add(dc.header2);
              //  _f4.find("input[type=checkbox]")._propAttr("checked", true);
              //}
              //var row = opts.finder.getRow(index);
              //if (opts.idField) {
              //  idFieldRows(datagrid.checkedRows, opts.idField, row);
              //}
              //opts.onCheck(index, row);
            };
            //取消勾选一行
            function _uncheckRow(index, state) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              if (!state && opts.selectOnCheck) {
                _unselectRow(index, true);
              }
              scope.dataRows[index].checked = false;
              //var ck = opts.finder.getTr(index).find("div.datagrid-cell-check input[type=checkbox]");
              //ck._propAttr("checked", false);
              //var dc = datagrid.dc;
              //var _fa = dc.header1.add(dc.header2);
              //_fa.find("input[type=checkbox]")._propAttr("checked", false);
              var row = opts.finder.getRow(index);
              if (opts.idField) {
                unSelectedRowsById(datagrid.checkedRows, opts.idField, row[opts.idField]);
              }
              opts.onUncheck(index, row);
            };
            function _checkAll(state) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var rows = datagrid.data.rows;
              if (!state && opts.selectOnCheck) {
                _selectAll(true);
              }
              //var dc = datagrid.dc;
              //var hck = dc.header1.add(dc.header2).find("input[type=checkbox]");
              //var bck = opts.finder.getTr("", "allbody").find("div.datagrid-cell-check input[type=checkbox]");
              //hck.add(bck)._propAttr("checked", true);
              for(var i = 0 ; i < scope.dataRows.length; i++){
                scope.dataRows[i].checked = true;
              }

              //if (opts.idField) {
              //  for (var i = 0; i < rows.length; i++) {
              //    idFieldRows(datagrid.checkedRows, opts.idField, rows[i]);
              //  }
              //}
              opts.onCheckAll(rows);
            };
            function _clearChecked(state) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var rows = datagrid.data.rows;
              if (!state && opts.selectOnCheck) {
                _clearSelections(true);
              }
              //var dc = datagrid.dc;
              //var hck = dc.header1.add(dc.header2).find("input[type=checkbox]");
              //var bck = opts.finder.getTr("", "allbody").find("div.datagrid-cell-check input[type=checkbox]");
              //hck.add(bck)._propAttr("checked", false);
              for(var i = 0 ; i < scope.dataRows.length; i++){
                scope.dataRows[i].checked = false;
              }

              if (opts.idField) {
                for (var i = 0; i < rows.length; i++) {
                  unSelectedRowsById(datagrid.checkedRows, opts.idField, rows[i][opts.idField]);
                }
              }
              opts.onUncheckAll(rows);
            };
            //开始编辑行
            function _beginEdit(index) {
              var opts = gridDataCenter.options;
              var tr = opts.finder.getTr(index);
              var row = opts.finder.getRow(index);
              if (tr.hasClass("datagrid-row-editing")) {
                return;
              }
              if (opts.onBeforeEdit(index, row) == false) {
                return;
              }
              tr.addClass("datagrid-row-editing");
              createEditor(index);
              fixEditorSize();
              tr.find("div.datagrid-editable").each(function () {
                var _107 = $(this).parent().attr("field");
                var ed = $.data(this, "datagrid.editor");
                ed.actions.setValue(ed.target, row[_107]);
              });
              validateRow(index);
            };
            //结束编辑行
            function _endEdit(index, revert, data) {
              var opts = gridDataCenter.options;
              var updatedRows = gridDataCenter.updatedRows;
              var insertedRows = gridDataCenter.insertedRows;
              var tr = opts.finder.getTr(index);
              var row = opts.finder.getRow(index);
              if (!tr.hasClass("datagrid-row-editing")) {
                return;
              }

              if (!revert) {
                if (!validateRow(index)) {
                  return;
                }
                var changed = false;
                var newValues = {};
                tr.find("div.datagrid-editable").each(function () {
                  var field=$(this).parent().attr("field");
                  var ed=$.data(this,"datagrid.editor");
                  var t=$(ed.target);
                  var target=t.data("textbox")?t.textbox("textbox"):t;
                  target.triggerHandler("blur");
                  var value=ed.actions.getValue(ed.target);
                  if (row[field] != value) {
                    row[field] = value;
                    changed = true;
                    newValues[field] = value;
                  }
                });
                if (changed) {
                  if (getObjectIndex(insertedRows, row) == -1) {
                    if (getObjectIndex(updatedRows, row) == -1) {
                      updatedRows.push(row);
                    }
                  }
                  //$.extend(row, newValues);
                }
              }
              tr.removeClass("datagrid-row-editing");
              destroyEditor(index);
              //scope.$apply();
              dg.methods.refreshRow(index);
              if (!revert) {
                opts.onAfterEdit(index, row, newValues);
              } else {
                opts.onCancelEdit(index, row);
              }

              //resetDataAndStyle();
            };
            //获取指定行的编辑器。每个编辑器都有以下属性：
            //actions：编辑器可以执行的动作，同编辑器定义。
            //target：目标编辑器的uery对象。
            //field：字段名称。
            //type：编辑器类型，比如：'text','combobox','datebox'等。
            function _getEditors(index) {
              var opts = gridDataCenter.options;
              var tr = opts.finder.getTr(index);
              var editors = [];
              tr.children("td").each(function () {
                var cell = $(this).find("div.datagrid-editable");
                if (cell.length) {
                  var ed = $.data(cell[0], "datagrid.editor");
                  editors.push(ed);
                }
              });
              return editors;
            };
            //获取指定编辑器，options包含2个属性：
            //index：行索引。
            //field：字段名称。
            function _getEditor(options) {
              var editors = _getEditors(options.index);
              for (var i = 0; i < editors.length; i++) {
                if (editors[i].field == options.field) {
                  return editors[i];
                }
              }
              return null;
            };
            //创建编辑器
            function createEditor(index) {
              var opts = gridDataCenter.options;
              var tr = opts.finder.getTr(index);
              tr.children("td").each(function () {
                var cell = $(this).find("div.datagrid-cell");
                var field = $(this).attr("field");
                var col = _getColumnOption(field);
                if (col && col.editor) {
                  var type, editorOpts;
                  if (typeof col.editor == "string") {
                    type = col.editor;
                  } else {
                    type = col.editor.type;
                    editorOpts = col.editor.options;
                  }
                  var editor = opts.editors[type];
                  if (editor) {
                    var html = cell.html();
                    var width = cell.outerWidth();
                    var editorHtml = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td style=\"text-align:" + col.align + ";\"></td></tr></table>";
                    cell.addClass("datagrid-editable");
                    cell.outerWidth(width);
                    cell.html(editorHtml);
                    cell.children("table").bind("click dblclick contextmenu", function (e) {
                      e.stopPropagation();
                    });
                    $.data(cell[0], "datagrid.editor", { actions: editor, target: editor.init(cell.find("td"), editorOpts), field: field, type: type, oldHtml: html });
                  }
                }
              });
              _fixRowHeight(index, true);
            };
            //销毁编辑器
            function destroyEditor(index) {
              var opts = gridDataCenter.options;
              var tr = opts.finder.getTr(index);
              tr.children("td").each(function () {
                var cell = $(this).find("div.datagrid-editable");
                if (cell.length) {
                  var ed = $.data(cell[0], "datagrid.editor");
                  if (ed.actions.destroy) {
                    ed.actions.destroy(ed.target);
                  }
                  cell.html(ed.oldHtml);
                  $.removeData(cell[0], "datagrid.editor");
                  cell.removeClass("datagrid-editable");
                  cell.css("width", "");
                }
              });
            };
            //验证指定的行，当验证有效的时候返回true
            function validateRow(index) {
              var tr = gridDataCenter.options.finder.getTr(index);
              if (!tr.hasClass("datagrid-row-editing")) {
                return true;
              }
              var vbox = tr.find(".validatebox-text");
              vbox.validatebox("validate");
              vbox.trigger("mouseleave");
              var invalid = tr.find(".validatebox-invalid");
              return invalid.length == 0;
            };
            //从上一次的提交获取改变的所有行。类型参数指明用哪些类型改变的行，可以使用的值有：inserted,deleted,updated等。当类型参数未配置的时候返回所有改变的行
            function _getChanges(type) {
              var insertedRows = gridDataCenter.insertedRows;
              var deletedRows = gridDataCenter.deletedRows;
              var updatedRows = gridDataCenter.updatedRows;
              if (!type) {
                var rows = [];
                rows = rows.concat(insertedRows);
                rows = rows.concat(deletedRows);
                rows = rows.concat(updatedRows);
                return rows;
              } else {
                if (type == "inserted") {
                  return insertedRows;
                } else {
                  if (type == "deleted") {
                    return deletedRows;
                  } else {
                    if (type == "updated") {
                      return updatedRows;
                    }
                  }
                }
              }
              return [];
            };
            //删除行
            function _deleteRow(index) {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var data = datagrid.data;
              var insertedRows = datagrid.insertedRows;
              var deletedRows = datagrid.deletedRows;
              //dg.methods.cancelEdit(index);
              data.rows.splice(index,1);
              data.total--;
              //buildGridBody(element, data.rows);
              //var row = data.rows[index];
              //if (getObjectIndex(insertedRows, row) >= 0) {
              //  unSelectedRowsById(insertedRows, row);
              //} else {
              //  deletedRows.push(row);
              //}
              //unSelectedRowsById(datagrid.selectedRows, opts.idField, data.rows[index][opts.idField]);
              //unSelectedRowsById(datagrid.checkedRows, opts.idField, data.rows[index][opts.idField]);
              //opts.view.deleteRow.call(opts.view, index);
              if (opts.height == "auto") {
                _fixRowHeight();
              }
              //dg.methods.getPager().pagination("refresh", { total: data.total });
              scope.pageOptions = data.total
              scope.rows = gridData;
            };
            //插入一个新行，参数包括一下属性：
            //index：要插入的行索引，如果该索引值未定义，则追加新行。
            //row：行数据
            function _insertRow(param) {
              var data = gridDataCenter.data;
              var view = gridDataCenter.options.view;
              var insertedRows = gridDataCenter.insertedRows;
              view.insertRow.call(view, param.index, param.row);
              insertedRows.push(param.row);
              dg.methods.getPager().pagination("refresh", { total: data.total });
            };
            //追加一个新行。新行将被添加到最后的位置
            function _appendRow(row) {
              var data = gridDataCenter.data;
              var view = gridDataCenter.options.view;
              var insertedRows = gridDataCenter.insertedRows;
              view.insertRow.call(view, null, row);
              insertedRows.push(row);
              dg.methods.getPager().pagination("refresh", { total: data.total });
            };
            //加载本地数据，旧的行将被移除
            function _loadData() {
              var datagrid = gridDataCenter;
              var data = datagrid.data;
              var rows = data.rows;
              var originalRows = [];
              for (var i = 0; i < rows.length; i++) {
                originalRows.push($.extend({}, rows[i]));
              }
              datagrid.originalRows = originalRows;
              datagrid.updatedRows = [];
              datagrid.insertedRows = [];
              datagrid.deletedRows = [];
            };
            //提交所有从加载或者上一次调用acceptChanges函数后更改的数据
            function _acceptChanges() {
              var data = gridDataCenter.data;
              var ok = true;
              for (var i = 0, len = data.rows.length; i < len; i++) {
                if (validateRow(i)) {
                  _endEdit(i, false);
                } else {
                  ok = false;
                }
              }
              if (ok) {
                _loadData();
              }
            };
            //回滚所有从创建或者上一次调用acceptChanges函数后更改的数据
            function _rejectChanges() {
              var datagrid = gridDataCenter;
              var opts = datagrid.options;
              var originalRows = datagrid.originalRows;
              var insertedRows = datagrid.insertedRows;
              var deletedRows = datagrid.deletedRows;
              var selectedRows = datagrid.selectedRows;
              var checkedRows = datagrid.checkedRows;
              var data = datagrid.data;
              function Rowids(a) {
                var ids = [];
                for (var i = 0; i < a.length; i++) {
                  ids.push(a[i][opts.idField]);
                }
                return ids;
              };
              function selectRecord(ids, type) {
                for (var i = 0; i < ids.length; i++) {
                  var index = _getRowIndex(ids[i]);
                  (type == "s" ? _selectRow : _checkRow)(index, true);
                }
              };
              for (var i = 0; i < data.rows.length; i++) {
                _endEdit(i, true);
              }
              var sids = Rowids(selectedRows);
              var cids = Rowids(checkedRows);
              selectedRows.splice(0, selectedRows.length);
              checkedRows.splice(0, checkedRows.length);
              data.total += deletedRows.length - insertedRows.length;
              data.rows = originalRows;
              //buildGridBody(data);
              selectRecord(sids, "s");
              selectRecord(cids, "c");
              _loadData();
            };

            //合并单元格，options包含以下属性：
            //index：行索引。
            //field：字段名称。
            //rowspan：合并的行数。
            //colspan：合并的列数。
            function _mergeCells(options) {
              var rowData, rowIndex, colData, colIndex, tempColIndex;
              var grid = gridData;
              options.rowspan = options.rowspan || 1;
              options.colspan = options.colspan || 1;

              if (options.index){
                return;
              } else {
                rowIndex = options.index;
              }

              if (options.rowspan == 1 && options.colspan == 1) {
                return;
              }

              //如果合并数据不存在或者所需合并数据条数大于总条数则退出
              if (!gridData[options.index] || ((options.index + options.rowspan) > gridData.length)) {
                return;
              }
              rowData = gridData[options.index].row;

              //设置合并单元格的colspan和rowspan属性
              for(var i = 0; i < rowData.length; i++){
                if(rowData[i].field === options.field){
                  colIndex = i;
                  if((colIndex + options.colspan) > rowData.length){
                    return;
                  }
                  rowData[i].colspan = options.colspan;
                  rowData[i].rowspan = options.rowspan;
                  rowData[i].tdClass = "datagrid-td-merged";
                  colData = rowData[i];
                }
              }

              if (!colIndex){
                return;
              }

              //隐藏被合并的单元格列
              for (var i = 1; i < options.colspan; i++) {
                tempColIndex = colIndex;
                tempColIndex++;
                rowData[tempColIndex].style = {
                  "display":"none"
                };
                rowData[tempColIndex].field = options.field;
              }

              for (var i = 1; i < options.rowspan; i++) {
                rowIndex++;
                rowData = gridData[rowIndex].row;
                tempColIndex = colIndex;
                rowData[tempColIndex].style = {
                  "display":"none"
                };
                rowData[tempColIndex].field = options.field;

                for (var j = 1; j < options.colspan; j++) {
                  tempColIndex++;
                  rowData[tempColIndex].style = {
                    "display":"none"
                  };
                  rowData[tempColIndex].field = options.field;
                }
              }
              _91();
            };

            //获取单元格外部宽度
            //bool:布尔值，如果为true则包括元素padding、boder及margin值，如果为false则包含元素padding、boder值
            function _getElementOutWidth(ele, bool){
              var length;
              ele.appendTo(element);
              if(bool){
                length = ele.outerWidth(true) - ele.width();
              } else {
                length = ele.outerWidth() - ele.width();
              }
              ele.remove();
              return length;
            }

            //获取单元格外部高度
            //bool:布尔值，如果为true则包括元素padding、boder及margin值，如果为false则包含元素padding、boder值
            function _getElementOutHeight(ele, bool){
              var length;
              ele.appendTo(element);
              if(bool){
                length = ele.outerHeight(true) - ele.height();
              } else {
                length = ele.outerHeight() - ele.height();
              }
              ele.remove();
              return length;
            }

            //editors 重写默认值对象
            var editors = {
              //文本框
              text: {
                //初始化编辑器并返回目标对象
                init: function (container, options) {
                  var editor = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(container);
                  return editor;
                },
                //从编辑器中获取值
                getValue: function () {
                  return $(element).val();
                },
                //向编辑器中写入值
                setValue: function (value) {
                  $(element).val(value);
                },
                //向编辑器中写入值
                resize: function (width) {
                  $(element).outerWidth(width);
                }
              },
              //多行文本
              textarea: {
                //初始化编辑器并返回目标对象
                init: function (container, options) {
                  var editor = $("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(container);
                  return editor;
                },
                getValue: function () {
                  return $(element).val();
                },
                setValue: function (value) {
                  $(element).val(value);
                },
                resize: function (width) {
                  $(element).outerWidth(width);
                }
              },
              //选择框
              checkbox: {
                //初始化编辑器并返回目标对象
                init: function (container, options) {
                  var editor = $("<input type=\"checkbox\">").appendTo(container);
                  editor.val(options.on);
                  editor.attr("offval", options.off);
                  return editor;
                },
                getValue: function (target) {
                  if ($(target).is(":checked")) {
                    return $(target).val();
                  } else {
                    return $(target).attr("offval");
                  }
                },
                setValue: function (value) {
                  var checked = false;
                  if ($(target).val() == value) {
                    checked = true;
                  }
                  $(target)._propAttr("checked", checked);
                }
              },
              //数值输入框
              numberbox: {
                //初始化编辑器并返回目标对象
                init: function (container, options) {
                  var editor = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(container);
                  editor.numberbox(options);
                  return editor;
                },
                destroy: function (target) {
                  $(target).numberbox("destroy");
                },
                getValue: function (target) {
                  $(target).blur();
                  return $(target).numberbox("getValue");
                },
                setValue: function (value) {
                  $(target).numberbox("setValue", value);
                },
                resize: function (width) {
                  $(target).outerWidth(width);
                }
              },
              //验证框
              validatebox: {
                //初始化编辑器并返回目标对象
                init: function (container, options) {
                  var editor = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(container);
                  editor.validatebox(options);
                  return editor;
                },
                destroy: function (target) {
                  $(target).validatebox("destroy");
                },
                getValue: function (target) {
                  return $(target).val();
                },
                setValue: function (value) {
                  $(target).val(value);
                },
                resize: function (width) {
                  $(target).outerWidth(width);
                }
              },
              //日期框
              datebox: {
                //初始化编辑器并返回目标对象
                init: function (container, options) {
                  var editor = $("<input type=\"text\">").appendTo(container);
                  editor.datebox(options);
                  return editor;
                },
                destroy: function (target) {
                  $(target).datebox("destroy");
                },
                getValue: function (target) {
                  return $(target).datebox("getValue");
                },
                setValue: function (value) {
                  $(target).datebox("setValue", value);
                },
                resize: function (width) {
                  $(target).datebox("resize", width);
                }
              },
              //下拉框
              combobox: {
                //初始化编辑器并返回目标对象
                init: function (container, options) {
                  var editor = $("<input type=\"text\">").appendTo(container);
                  editor.combobox(options || {});
                  return editor;
                },
                destroy: function (target) {
                  $(target).combobox("destroy");
                },
                getValue: function (target) {
                  return $(target).combobox("getValue");
                },
                setValue: function (value) {
                  $(target).combobox("setValue", value);
                },
                resize: function (width) {
                  $(target).combobox("resize", width);
                }
              },
              //下拉树
              combotree: {
                //初始化编辑器并返回目标对象
                init: function (container, target) {
                  var editor = $("<input type=\"text\">").appendTo(container);
                  editor.combotree(target);
                  return editor;
                },
                destroy: function (target) {
                  $(target).combotree("destroy");
                },
                getValue: function (target) {
                  return $(target).combotree("getValue");
                },
                setValue: function (value) {
                  $(target).combotree("setValue", value);
                },
                resize: function (width) {
                  $(target).combotree("resize", width);
                }
              }
            };

            //表格默认属性 以及事件（集成panel的属性和事件）
            //dg.defaults = $.extend({}, $.fn.panel.defaults, {
            dg.defaults = $.extend({}, {
              frozenColumns: [],//同列属性，但是这些列将会被冻结在左侧
              columns: [],//数据表格列配置对象，详见列属性说明中更多的细节
              fitColumns: false,//真正的自动展开/收缩列的大小，以适应网格的宽度，防止水平滚动
              resizeHandle: "right",//调整列的位置，可用的值有：'left','right','both'。在使用'right'的时候用户可以通过拖动右侧边缘的列标题调整列
              autoRowHeight: true,//定义设置行的高度，根据该行的内容。设置为false可以提高负载性能
              toolbar: null,//顶部工具栏的数据表格面板。可能的值：1) 一个数组，每个工具属性都和linkbutton一样。 2) 选择器指定的工具栏
              striped: false,//是否显示斑马线效果
              method: "post",//该方法类型请求远程数据
              nowrap: true,//如果为true，则在同一行中显示数据。设置为true可以提高加载性能
              idField: null,//指明哪一个字段是标识字段
              url: null,//从远程站点加载数据的URL地址
              data:{
                data:"data",  // 不分页时数据配置
                pageData:"data", //分页时数据配置
                pageSize:"pageSize",//分页页面大小
                pageNumber: "pageNumber",//分页页码
                total:"total" // 数据总数
              },
              loadMsg: "Processing, please wait ...",//在从远程站点加载数据的时候显示提示消息
              rownumbers: false,//如果为true，则显示一个行号列
              checkbox: false,//如果为true，则显示复选框
              singleSelect: false,//如果为true，则只允许选择一行
              selectOnCheck: true,//如果为true，单击复选框将永远选择行。        如果为false，选择行将不选中复选框
              checkOnSelect: true,//如果为true，当用户点击行的时候该复选框就会被选中或取消选中。   如果为false，当用户仅在点击该复选框的时候才会被选中或取消
              pagination: false,//如果为true，则在数据表格控件底部显示分页工具栏
              pagePosition: "bottom",//定义分页工具栏的位置。可用的值有：'top','bottom','both'。
              pageNumber: 1,//在设置分页属性的时候初始化页码
              pageSize: 10,//在设置分页属性的时候初始化页面大小
              pageList: [10, 20, 30, 40, 50],//在设置分页属性的时候初始化页面大小
              queryParams: {},//在请求远程数据的时候发送额外的参数
              sortName: null,//定义哪些列可以进行排序   暂不开放
              sortOrder: "asc",//定义列的排序顺序，只能是'asc'或'desc'  暂不开放
              sort: [],//定义按照哪列进行升序或降序排列
              diffPage:0,        //后台起始页面的差值，默认起始页面为1
              remoteSort: true,//定义从服务器对数据进行排序
              showHeaderTitle: true, // 定义是否显示表头的title
              showBodyTitle:true,// 定义是否显示表格内容的title
              showHeader: true,//定义是否显示行头
              showFooter: false,//定义是否显示行脚
              scrollbarSize: 22,//滚动条的宽度(当滚动条是垂直的时候)或高度(当滚动条是水平的时候)。
              //返回样式如'background:red'。带2个参数的函数： rowIndex：该行索引从0开始  rowData：与此相对应的记录行
              rowStyler: function (rowIndex, rowData) {
              },
              //定义如何从远程服务器加载数据。返回false可以放弃本次请求动作。该函数接受以下参数：
              //param：参数对象传递给远程服务器。
              //success(data)：当检索数据成功的时候会调用该回调函数。
              //error()：当检索数据失败的时候会调用该回调函数
              //loader: function (param, success, error) {
              //  var opts =dg.methods.options(this);
              //  if (!opts.url) {
              //    return false;
              //  }
              //  $.ajax({
              //    type: opts.method, url: opts.url, data: param, dataType: "json", success: function (data) {
              //      success(data);
              //    }, error: function () {
              //      error.apply(this, arguments);
              //    }
              //  });
              //},
              //返回过滤数据显示。该函数带一个参数'data'用来指向源数据（即：获取的数据源，比如Json对象）。您可以改变源数据的标准数据格式。这个函数必须返回包含'total'和'rows'属性的标准数据对象
              loadFilter: function (data) {
                if (typeof data.length == "number" && typeof data.splice == "function") {
                  return { total: data.length, rows: data };
                } else {
                  return data;
                }
              },
              //定义在编辑行的时候使用的编辑器
              editors: editors,

              finder: {
                getTr: function (rowIndex, type, step) {
                  type = type || "body";
                  step = step || 0;
                  var dc = gridDataCenter.dc;
                  var opts = gridDataCenter.options;
                  if (step == 0) {
                    var tr1 = opts.finder.getTr(rowIndex, type, 1);
                    var tr2 = opts.finder.getTr(rowIndex, type, 2);
                    return tr1.add(tr2);
                  } else {
                    if (type == "body") {
                      var tr = $("#" + gridDataCenter.rowIdPrefix + "-" + step + "-" + rowIndex);
                      if (!tr.length) {
                        tr = (step == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index=" + rowIndex + "]");
                      }
                      return tr;
                    } else {
                      if (type == "footer") {
                        return (step == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index=" + rowIndex + "]");
                      } else {
                        if (type == "selected") {
                          return (step == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-selected");
                        } else {
                          if (type == "last") {
                            return (step == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]:last");
                          } else {
                            if (type == "allbody") {
                              return (step == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]");
                            } else {
                              if (type == "allfooter") {
                                return (step == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                getRow: function (index) {
                  return gridDataCenter.data.rows[parseInt(index)];
                }
              },
              //定义数据表格的视图
              view: view,
              //在载入请求数据数据之前触发，如果返回false可终止载入数据操作
              onBeforeLoad: function (param) {
              },
              //在数据加载成功的时候触发
              onLoadSuccess: function () {
              },
              //在数据加载成功的时候触发
              onLoadError: function () {
              },
              //在用户点击一行的时候触发，参数包括：
              //rowIndex：点击的行的索引值，该索引值从0开始。
              //rowData：对应于点击行的记录
              onClickRow: function (rowIndex, c) {
              },
              //在用户双击一行的时候触发，参数包括：
              //rowIndex：点击的行的索引值，该索引值从0开始。
              //rowData：对应于点击行的记录
              onDblClickRow: function (rowIndex, rowData) {
              },
              //在用户点击一个单元格的时候触发
              onClickCell: function (rowIndex, field, value) {
              },
              //在用户双击一个单元格的时候触发
              onDblClickCell: function (rowIndex, field, value) {
              },
              //在用户排序一列的时候触发，参数包括：
              //sort：排序列字段名称。
              //order：排序列的顺序(ASC或DESC)
              onSortColumn: function (sort, order) {
              },
              //在用户调整列大小的时候触发
              onResizeColumn: function (field, width) {
              },
              //在用户选择一行的时候触发，参数包括：
              //rowIndex：选择的行的索引值，索引从0开始。
              //rowData：对应于所选行的记录
              onSelect: function (rowIndex, rowData) {
              },
              //        在用户选择一行的时候触发，参数包括：
              //rowIndex：选择的行的索引值，索引从0开始。
              //rowData：对应于所选行的记录
              onUnselect: function (rowIndex, rowData) {
              },
              //在用户选择所有行的时候触发
              onSelectAll: function (rows) {
              },
              //在用户取消选择所有行的时候触发
              onUnselectAll: function (rows) {
              },
              //        在用户勾选一行的时候触发，参数包括：
              //rowIndex：选中的行索引，索引从0开始。
              //rowData：对应于所选行的记录
              onCheck: function (rowIndex, rowData) {
              },
              //        在用户取消勾选一行的时候触发，参数包括：
              //rowIndex：选中的行索引，索引从0开始。
              //rowData：对应于取消勾选行的记录
              onUncheck: function (rowIndex, rowData) {
              },
              //在用户勾选所有行的时候触发
              onCheckAll: function (rows) {
              },
              //在用户取消勾选所有行的时候触发
              onUncheckAll: function (rows) {
              },
              //        在用户开始编辑一行的时候触发，参数包括：
              //rowIndex：编辑行的索引，索引从0开始。
              //rowData：对应于编辑行的记录
              onBeforeEdit: function (rowIndex, rowData) {
              },
              //        在用户完成编辑一行的时候触发，参数包括：
              //rowIndex：编辑行的索引，索引从0开始。
              //rowData：对应于完成编辑的行的记录。
              //changes：更改后的字段(键)/值对
              onAfterEdit: function (rowIndex, rowData, changes) {
              },
              //        在用户取消编辑一行的时候触发，参数包括：
              //rowIndex：编辑行的索引，索引从0开始。
              //rowData：对应于编辑行的记录
              onCancelEdit: function (rowIndex, rowData) {
              },
              //在鼠标右击数据表格表格头的时候触发
              onHeaderContextMenu: function (e, field) {
              },
              //在鼠标右击一行记录的时候触发
              onRowContextMenu: function (e, rowIndex, rowData) {
              }
            });

            //包裹grid
            function wrapGrid(rownumber) {
              var gridwrap = $(element).find(".datagrid-wrap");
              //gridwrap.panel({ doSize: false });
              //gridwrap.panel("panel").addClass("datagrid").bind("_resize", function (e, param) {
              //  var opts = gridDataCenter.options;
              //  if (opts.fit == true || param) {
              //    _resize(element);
              //    setTimeout(function () {
              //      if (gridDataCenter) {
              //        _fixColumnSize();
              //      }
              //    }, 0);
              //  }
              //  return false;
              //});
              var gridView = gridwrap.children("div.datagrid-view");
              var gridView1 = gridView.children("div.datagrid-view1");
              var gridView2 = gridView.children("div.datagrid-view2");
              return {
                panel: gridwrap,
                //frozenColumns: cc[0],
                //columns: cc[1],
                dc: {
                  view: gridView,
                  view1: gridView1,
                  view2: gridView2,
                  header1: gridView1.children("div.datagrid-header").children("div.datagrid-header-inner"),
                  header2: gridView2.children("div.datagrid-header").children("div.datagrid-header-inner"),
                  body1: gridView1.children("div.datagrid-body").children("div.datagrid-body-inner"),
                  body2: gridView2.children("div.datagrid-body"),
                  footer1: gridView1.children("div.datagrid-footer").children("div.datagrid-footer-inner"),
                  footer2: gridView2.children("div.datagrid-footer").children("div.datagrid-footer-inner")
                }
              };
            };

            // 显示隐藏panel
            scope.showPanel = function(e){
              var panel = gridDataCenter.panel;

              //panel-tool-collapse panel-tool-expand
              if(panel.css("display") === "none"){
                $(element).find(".panel-tool-collapse").removeClass("panel-tool-expand");
                panel.slideDown();
              } else {
                $(element).find(".panel-tool-collapse").addClass("panel-tool-expand");
                panel.slideUp()
              }
            };

            //显示复选框
            function _showCheckbox(){
              var opts = gridDataCenter.options;
              if(opts.checkbox){
                if(opts.frozenColumns.length){
                  opts.frozenColumns.checkbox = true;
                  opts.columns.checkbox = false;
                } else {
                  opts.frozenColumns.checkbox = false;
                  opts.columns.checkbox = true;
                }
              } else {
                opts.frozenColumns.checkbox = opts.checkbox;
                opts.columns.checkbox = opts.checkbox;
              }
            }

            //显示行号
            function _showRownumbers(){
              var opts = gridDataCenter.options;
              if(opts.rownumbers){
                if(opts.frozenColumns.length){
                  opts.frozenColumns.rownumbers = true;
                  opts.columns.rownumbers = false;
                } else {
                  opts.frozenColumns.rownumbers = false;
                  opts.columns.rownumbers = true;
                }
              } else {
                opts.frozenColumns.rownumbers = opts.rownumbers;
                opts.columns.rownumbers = opts.rownumbers;
              }
            }

            //绑定复选框事件
            function headchecked(e, selected){
              var opts = gridDataCenter.options;
              if (opts.singleSelect && opts.selectOnCheck) {
                return false;
              }
              if (selected) {
                _checkAll();
              } else {
                _clearChecked();
              }
              e.stopPropagation();
            }

            //鼠标进入标题单元格事件
            function headMouseenter(e){
              if (gridDataCenter.resizing) {
                return;
              }
              $(e.target).addClass("datagrid-header-over");
            }

            function headMouseleave(e){
              $(e.target).removeClass("datagrid-header-over");
            }

            function headContextmenu(e){
              var field = $(e.target).attr("field");
              gridDataCenter.options.onHeaderContextMenu.call(e, field);
            }

            //点击title事件
            function headGridcellClick(e){
              //var p1 = $(this).offset().left + 5;
              //var p2 = $(this).offset().left + $(this).outerWidth() - 5;
              //if (e.pageX < p2 && e.pageX > p1) {
              //  var field = $(this).parent().attr("field");
              //  var col = _getColumnOption(field);////返回指定列属性
              //  if (!col.sortable || datagrid.resizing) {
              //    return;
              //  }
              //  opts.sortName = field;
              //  opts.sortOrder = col.order || "asc";
              //  var cls = "datagrid-sort-" + opts.sortOrder;
              //  if ($(this).hasClass("datagrid-sort-asc")) {
              //    cls = "datagrid-sort-desc";
              //    opts.sortOrder = "desc";
              //  } else {
              //    if ($(this).hasClass("datagrid-sort-desc")) {
              //      cls = "datagrid-sort-asc";
              //      opts.sortOrder = "asc";
              //    }
              //  }
              //  gridcell.removeClass("datagrid-sort-asc datagrid-sort-desc");
              //  $(this).addClass(cls);
              //  if (opts.remoteSort) {
              //    _load();
              //  } else {
              //    var data = gridDataCenter.data;
              //    //buildGridBody(data);
              //  }
              //  opts.onSortColumn.call(opts.sortName, opts.sortOrder);
              //}
            }

            function headGridcellDblClick(e){
              //var p1 = $(this).offset().left + 5;
              //var p2 = $(this).offset().left + $(this).outerWidth() - 5;
              //var resizeHandle = opts.resizeHandle == "right" ? (e.pageX > p2) : (opts.resizeHandle == "left" ? (e.pageX < p1) : (e.pageX < p1 || e.pageX > p2));
              //
              //if (resizeHandle) {
              //  var field = $(this).parent().attr("field");
              //  var col = _getColumnOption(field);
              //  if (col.resizable == false) {
              //    return;
              //  }
              //  dg.methods.autoSizeColumn(field);
              //  col.auto = false;
            }


            //grid body 鼠标进入事件
            function bodyMouseover(e){
              if (gridDataCenter.resizing) {
                return;
              }
              var tr = $(e.target).closest("tr.datagrid-row");
              if (!tr.length) {
                return;
              }

              tr.addClass("datagrid-row-over");
              //var index = get_trIndex(tr);
              //opts.finder.getTr(index).addClass("datagrid-row-over");
              e.stopPropagation();
            }

            function bodyMouseleave(e){
              var tr = $(e.target).closest("tr.datagrid-row");
              if (!tr.length) {
                return;
              }

              tr.removeClass("datagrid-row-over");
              //var index = get_trIndex(tr);
              //opts.finder.getTr(index).removeClass("datagrid-row-over");
              e.stopPropagation();
            }

            //grid body 鼠标点击事件
            function bodyClick(e, index){
              var opts = gridDataCenter.options;
              var tt = $(e.target);
              var tr = tt.closest("tr.datagrid-row");
              if (!tr.length) {
                return;
              }
              //var index = get_trIndex(tr);
              if (tt.parent().hasClass("datagrid-cell-check")) {
                if (opts.singleSelect && opts.selectOnCheck) {
                  if (!opts.checkOnSelect) {
                    _clearChecked(true);
                  }
                  _checkRow(index);
                } else {
                  if (scope.dataRows[index].checked == true) {
                    _checkRow(index);
                  } else {
                    _uncheckRow(index);
                  }
                }
              } else {
                var row = opts.finder.getRow(index);
                var td = tt.closest("td[field]", tr);
                if (td.length) {
                  var field = td.attr("field");
                  opts.onClickCell(index, field, row[field]);
                }
                if (opts.singleSelect == true) {
                  _selectRow(index);
                } else {
                  if (tr.hasClass("datagrid-row-selected")) {
                    _unselectRow(index);
                  } else {
                    _selectRow(index);
                  }
                }
                opts.onClickRow(index, row);
              }
              e.stopPropagation();
            }

            function bodyDblclick(e, index){
              var opts = gridDataCenter.options;
              var tt = $(e.target);
              var tr = tt.closest("tr.datagrid-row");
              if (!tr.length) {
                return;
              }
              //var index = get_trIndex(tr);
              var row = opts.finder.getRow(index);
              var td = $(e.target).closest("td[field]");
              if (td.length) {
                var field = td.attr("field");
                opts.onDblClickCell(index, field, row[field]);
              }
              opts.onDblClickRow(index, row);
              e.stopPropagation();
            }

            function bodyContextmenu(e, index){
              var opts = gridDataCenter.options;
              //var tr = $(e.target).closest("tr.datagrid-row");
              //if (!tr.length) {
              //  return;
              //}
              //var index = get_trIndex(tr);
              var row = opts.finder.getRow(index);
              opts.onRowContextMenu.call(e, index, row);
              e.stopPropagation();
            }

            //grid body 滚动条事件
            function bodyScroll(e){
              var dc = gridDataCenter.dc;
              dc.view1.children("div.datagrid-body").scrollTop($(e.target).scrollTop());
              dc.view2.children("div.datagrid-header,div.datagrid-footer").scrollLeft($(e.target).scrollLeft());
              dc.body2.children("table.datagrid-btable-frozen").css("left", -$(e.target).scrollLeft());
            }


            scope.bindEvent = {
              headchecked:headchecked,
              headMouseenter:headMouseenter,
              headMouseleave:headMouseleave,
              headContextmenu:headContextmenu,
              headGridcellClick:headGridcellClick,
              headGridcellDblClick:headGridcellDblClick,
              bodyMouseover:bodyMouseover,
              bodyMouseleave:bodyMouseleave,
              bodyClick:bodyClick,
              bodyDblclick:bodyDblclick,
              bodyContextmenu:bodyContextmenu,
              bodyScroll:bodyScroll
            };


            configGrid();
            function refreshData(){
              var opts = gridDataCenter.options;
              parse(scope.gridData);
              buildGridBody(gridDataCenter.data);
              resetDataAndStyle();
              opts.onLoadSuccess(scope.gridData);
            }
            //重设表格数据与样式
            function resetDataAndStyle(){
              scope.frozenDataRows = gridData.frozenDataRows;
              scope.dataRows = gridData.dataRows;
              scope.gridStyle = gridStyle;
              scope.columnsRows.checked = false;
              scope.frozenColumnsRows.checked = false;
            }

            //解析gridData数据
            function parse(gridData){
              var opts = gridDataCenter.options;
              if(gridData && gridData.data){
                gridDataCenter.data.rows = gridData.data;
                if(gridData.page){
                  gridDataCenter.data.total = gridData.page.total || gridData.data.length;
                  opts.pageNumber = scope.gridData.page.pageNumber || opts.pageNumber;
                  opts.pageSize = scope.gridData.page.pageSize || opts.pageSize;
                } else {
                  gridDataCenter.data.total = gridData.data.length;
                }
              }
            }
            scope.$watch('gridData', refreshData, true);

            var onResizeHandler = function() {
              _resize();
            };
            reqChannel.onResizeElement(scope, onResizeHandler);
          }
        };
      }])
    .directive("dyCompile", ["$compile", function($compile) {
      return {
        replace: true,
        restrict: 'EA',
        link: function(scope, elm, iAttrs) {
          var DUMMY_SCOPE = {
                $destroy: angular.noop
              },
              root = elm,
              childScope,
              destroyChildScope = function() {
                (childScope || DUMMY_SCOPE).$destroy();
              };

          iAttrs.$observe("html", function(html) {
            if (html) {
              destroyChildScope();
              childScope = scope.$new(false);
              var content = $compile(html)(childScope);
              root.replaceWith(content);
              root = content;
            }

            scope.$on("$destroy", destroyChildScope);
          });
        }
      };
    }]);



angular.module('eui.input', ['eui'])
    .controller('euiinputCtrl',function($scope){
        //$scope.required = false;
        //监视txtvalue属性
        //$scope.inputValue = $scope.options.inputValue;
        //$scope.$watch($scope.inputValue, interacted(testForm[$scope.options.name]), true);
        //
        //function interacted (field){
        //    return true;
        //}


    })
    .directive('euiInput', [
        '$window', '$timeout', '$document', '$euiPosition', '$interpolate', '$parse', '$$stackedMap', function($window, $timeout, $document, $position, $interpolate, $parse, $$stackedMap) {
            return {
                restrict: 'E',
                templateUrl:'../input/template/input/input.html',
                //templateUrl: function(element, attrs) {
                //    return attrs.templateUrl || './template/input/input.html';
                //},
                replace: true,
                transclude: true,
                //require: 'ngModel',
                controller: 'euiinputCtrl',
                scope: {
                    options:"=",
                    inputValue:"="
                },
                link: function(scope, element, attrs) {
                    var defaultOptions= {
                        isOpen:false,
                        placement:"left",
                        name:"",
                        inputValue:"",
                        valid:[
                            {pattern:"",content:""},
                            {minlength:"",content:""},
                            {maxlength:"",content:""}
                        ]
                    }


                    //ngModelCtr.$parsers.push(function(viewValue){
                    //    if(typeof viewValue != "undefined"){
                    //        return "我说："+viewValue;
                    //    }
                    //})

                    scope.value = scope.inputValue
                    scope.options = angular.extend(defaultOptions, scope.options);

                    scope.content = scope.options.valid[1].content;

                    //var tooltip;
                    //var tooltipLinkedScope;
                    //var transitionTimeout;
                    //var showTimeout;
                    //var hideTimeout;
                    //var positionTimeout;
                    //var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
                    //var triggers = getTriggers(undefined);
                    //var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
                    //var ttScope = scope.$new(true);
                    //var repositionScheduled = false;
                    //var isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ? $parse(attrs[prefix + 'IsOpen']) : false;
                    //var contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
                    //var observers = [];
                    //
                    //var positionTooltip = function() {
                    //    // check if tooltip exists and is not empty
                    //    if (!tooltip || !tooltip.html()) { return; }
                    //
                    //    if (!positionTimeout) {
                    //        positionTimeout = $timeout(function() {
                    //            // Reset the positioning.
                    //            tooltip.css({ top: 0, left: 0 });
                    //
                    //            // Now set the calculated positioning.
                    //            var ttCss = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
                    //            ttCss.top += 'px';
                    //            ttCss.left += 'px';
                    //            ttCss.visibility = 'visible';
                    //            tooltip.css(ttCss);
                    //
                    //            positionTimeout = null;
                    //        }, 0, false);
                    //    }
                    //};
                    //
                    //// Set up the correct scope to allow transclusion later
                    //ttScope.origScope = scope;
                    //
                    //// By default, the tooltip is not open.
                    //// TODO add ability to start tooltip opened
                    //ttScope.isOpen = false;
                    //openedTooltips.add(ttScope, {
                    //    close: hide
                    //});
                    //
                    //function toggleTooltipBind() {
                    //    if (!ttScope.isOpen) {
                    //        showTooltipBind();
                    //    } else {
                    //        hideTooltipBind();
                    //    }
                    //}
                    //
                    //// Show the tooltip with delay if specified, otherwise show it immediately
                    //function showTooltipBind() {
                    //    if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                    //        return;
                    //    }
                    //
                    //    cancelHide();
                    //    prepareTooltip();
                    //
                    //    if (ttScope.popupDelay) {
                    //        // Do nothing if the tooltip was already scheduled to pop-up.
                    //        // This happens if show is triggered multiple times before any hide is triggered.
                    //        if (!showTimeout) {
                    //            showTimeout = $timeout(show, ttScope.popupDelay, false);
                    //        }
                    //    } else {
                    //        show();
                    //    }
                    //}
                    //
                    //function hideTooltipBind() {
                    //    cancelShow();
                    //
                    //    if (ttScope.popupCloseDelay) {
                    //        if (!hideTimeout) {
                    //            hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
                    //        }
                    //    } else {
                    //        hide();
                    //    }
                    //}
                    //
                    //// Show the tooltip popup element.
                    //function show() {
                    //    cancelShow();
                    //    cancelHide();
                    //
                    //    // Don't show empty tooltips.
                    //    if (!ttScope.content) {
                    //        return angular.noop;
                    //    }
                    //
                    //    createTooltip();
                    //
                    //    // And show the tooltip.
                    //    ttScope.$evalAsync(function() {
                    //        ttScope.isOpen = true;
                    //        assignIsOpen(true);
                    //        positionTooltip();
                    //    });
                    //}
                    //
                    //function cancelShow() {
                    //    if (showTimeout) {
                    //        $timeout.cancel(showTimeout);
                    //        showTimeout = null;
                    //    }
                    //
                    //    if (positionTimeout) {
                    //        $timeout.cancel(positionTimeout);
                    //        positionTimeout = null;
                    //    }
                    //}
                    //
                    //// Hide the tooltip popup element.
                    //function hide() {
                    //    cancelShow();
                    //    cancelHide();
                    //
                    //    if (!ttScope) {
                    //        return;
                    //    }
                    //
                    //    // First things first: we don't show it anymore.
                    //    ttScope.$evalAsync(function() {
                    //        ttScope.isOpen = false;
                    //        assignIsOpen(false);
                    //        // And now we remove it from the DOM. However, if we have animation, we
                    //        // need to wait for it to expire beforehand.
                    //        // FIXME: this is a placeholder for a port of the transitions library.
                    //        // The fade transition in TWBS is 150ms.
                    //        if (ttScope.animation) {
                    //            if (!transitionTimeout) {
                    //                transitionTimeout = $timeout(removeTooltip, 150, false);
                    //            }
                    //        } else {
                    //            removeTooltip();
                    //        }
                    //    });
                    //}
                    //
                    //function cancelHide() {
                    //    if (hideTimeout) {
                    //        $timeout.cancel(hideTimeout);
                    //        hideTimeout = null;
                    //    }
                    //    if (transitionTimeout) {
                    //        $timeout.cancel(transitionTimeout);
                    //        transitionTimeout = null;
                    //    }
                    //}
                    //
                    //function createTooltip() {
                    //    // There can only be one tooltip element per directive shown at once.
                    //    if (tooltip) {
                    //        return;
                    //    }
                    //
                    //    tooltipLinkedScope = ttScope.$new();
                    //    tooltip = tooltipLinker(tooltipLinkedScope, function(tooltip) {
                    //        if (appendToBody) {
                    //            $document.find('body').append(tooltip);
                    //        } else {
                    //            element.after(tooltip);
                    //        }
                    //    });
                    //
                    //    prepObservers();
                    //}
                    //
                    //function removeTooltip() {
                    //    unregisterObservers();
                    //
                    //    transitionTimeout = null;
                    //    if (tooltip) {
                    //        tooltip.remove();
                    //        tooltip = null;
                    //    }
                    //    if (tooltipLinkedScope) {
                    //        tooltipLinkedScope.$destroy();
                    //        tooltipLinkedScope = null;
                    //    }
                    //}
                    //
                    ///**
                    // * Set the inital scope values. Once
                    // * the tooltip is created, the observers
                    // * will be added to keep things in synch.
                    // */
                    //function prepareTooltip() {
                    //    ttScope.title = attrs[prefix + 'Title'];
                    //    if (contentParse) {
                    //        ttScope.content = contentParse(scope);
                    //    } else {
                    //        ttScope.content = attrs[ttType];
                    //    }
                    //
                    //    ttScope.popupClass = attrs[prefix + 'Class'];
                    //    ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ? attrs[prefix + 'Placement'] : options.placement;
                    //
                    //    var delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
                    //    var closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
                    //    ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
                    //    ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
                    //}
                    //
                    //function assignIsOpen(isOpen) {
                    //    if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
                    //        isOpenParse.assign(scope, isOpen);
                    //    }
                    //}
                    //
                    //ttScope.contentExp = function() {
                    //    return ttScope.content;
                    //};
                    //
                    ///**
                    // * Observe the relevant attributes.
                    // */
                    //attrs.$observe('disabled', function(val) {
                    //    if (val) {
                    //        cancelShow();
                    //    }
                    //
                    //    if (val && ttScope.isOpen) {
                    //        hide();
                    //    }
                    //});
                    //
                    //if (isOpenParse) {
                    //    scope.$watch(isOpenParse, function(val) {
                    //        /*jshint -W018 */
                    //        if (!val === ttScope.isOpen) {
                    //            toggleTooltipBind();
                    //        }
                    //        /*jshint +W018 */
                    //    });
                    //}
                    //
                    //function prepObservers() {
                    //    observers.length = 0;
                    //
                    //    if (contentParse) {
                    //        observers.push(
                    //            scope.$watch(contentParse, function(val) {
                    //                ttScope.content = val;
                    //                if (!val && ttScope.isOpen) {
                    //                    hide();
                    //                }
                    //            })
                    //        );
                    //
                    //        observers.push(
                    //            tooltipLinkedScope.$watch(function() {
                    //                if (!repositionScheduled) {
                    //                    repositionScheduled = true;
                    //                    tooltipLinkedScope.$$postDigest(function() {
                    //                        repositionScheduled = false;
                    //                        if (ttScope && ttScope.isOpen) {
                    //                            positionTooltip();
                    //                        }
                    //                    });
                    //                }
                    //            })
                    //        );
                    //    } else {
                    //        observers.push(
                    //            attrs.$observe(ttType, function(val) {
                    //                ttScope.content = val;
                    //                if (!val && ttScope.isOpen) {
                    //                    hide();
                    //                } else {
                    //                    positionTooltip();
                    //                }
                    //            })
                    //        );
                    //    }
                    //
                    //    observers.push(
                    //        attrs.$observe(prefix + 'Title', function(val) {
                    //            ttScope.title = val;
                    //            if (ttScope.isOpen) {
                    //                positionTooltip();
                    //            }
                    //        })
                    //    );
                    //
                    //    observers.push(
                    //        attrs.$observe(prefix + 'Placement', function(val) {
                    //            ttScope.placement = val ? val : options.placement;
                    //            if (ttScope.isOpen) {
                    //                positionTooltip();
                    //            }
                    //        })
                    //    );
                    //}
                    //
                    //function unregisterObservers() {
                    //    if (observers.length) {
                    //        angular.forEach(observers, function(observer) {
                    //            observer();
                    //        });
                    //        observers.length = 0;
                    //    }
                    //}
                    //
                    //attrs.$observe(prefix + 'IsOpen', function(val) {
                    //    if(val ==="true" && !ttScope.isOpen){
                    //        //显示tip
                    //        show();
                    //    }
                    //
                    //    if(val ==="false" && ttScope.isOpen){
                    //        hide();
                    //    }
                    //    //else {
                    //    //  positionTooltip();
                    //    //}
                    //})
                    //
                    //var unregisterTriggers = function() {
                    //    triggers.show.forEach(function(trigger) {
                    //        element.unbind(trigger, showTooltipBind);
                    //    });
                    //    triggers.hide.forEach(function(trigger) {
                    //        trigger.split(' ').forEach(function(hideTrigger) {
                    //            element[0].removeEventListener(hideTrigger, hideTooltipBind);
                    //        });
                    //    });
                    //};
                    //
                    //function prepTriggers() {
                    //    var val = attrs[prefix + 'Trigger'];
                    //    unregisterTriggers();
                    //
                    //    triggers = getTriggers(val);
                    //
                    //    if (triggers.show !== 'none') {
                    //        triggers.show.forEach(function(trigger, idx) {
                    //            // Using raw addEventListener due to jqLite/jQuery bug - #4060
                    //            if (trigger === triggers.hide[idx]) {
                    //                element[0].addEventListener(trigger, toggleTooltipBind);
                    //            } else if (trigger) {
                    //                element[0].addEventListener(trigger, showTooltipBind);
                    //                triggers.hide[idx].split(' ').forEach(function(trigger) {
                    //                    element[0].addEventListener(trigger, hideTooltipBind);
                    //                });
                    //            }
                    //
                    //            element.on('keypress', function(e) {
                    //                if (e.which === 27) {
                    //                    hideTooltipBind();
                    //                }
                    //            });
                    //        });
                    //    }
                    //}
                    //
                    //prepTriggers();
                    //
                    //var animation = scope.$eval(attrs[prefix + 'Animation']);
                    //ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;
                    //
                    //var appendToBodyVal = scope.$eval(attrs[prefix + 'AppendToBody']);
                    //appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;
                    //
                    //// if a tooltip is attached to <body> we need to remove it on
                    //// location change as its parent scope will probably not be destroyed
                    //// by the change.
                    //if (appendToBody) {
                    //    scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess() {
                    //        if (ttScope.isOpen) {
                    //            hide();
                    //        }
                    //    });
                    //}
                    //
                    //// Make sure tooltip is destroyed and removed.
                    //scope.$on('$destroy', function onDestroyTooltip() {
                    //    cancelShow();
                    //    cancelHide();
                    //    unregisterTriggers();
                    //    removeTooltip();
                    //    openedTooltips.remove(ttScope);
                    //    ttScope = null;
                    //});


                    //scope.required = (attrs.required == "true")? true : false;
                    //scope.disabled = (attrs.disabled == "true")? true : false;
                    //scope.txtvalue = attrs.txtvalue;
                    //scope.required1 = false;

                    //scope.requiredtext = "标示必填项！";
                    //scope.errorMsg = "不能为空！";



                    //根据值和属性设置提示信息
                    //var on_txtvalue_change = function(scope, attrs){
                    //    if(scope.txtvalue!="" && scope.txtvalue!=undefined){
                    //        //有值，去掉验证
                    //        if(scope.required){
                    //            scope.required = false;
                    //        }
                    //    }else{
                    //        //没有值判断是否需要验证
                    //        if(scope.required){
                    //            scope.required = true;
                    //        }
                    //    }
                    //    //alert(scope.txtvalue);
                    //    /*scope.txtvalue = scope.enabled === false || scope.enabled === "false"? false:true;
                    //
                    //     if(!scope.enabled){
                    //     if(!$(element).hasClass("eui-button-disabled")){
                    //     $(element).addClass("eui-button-disabled");
                    //     }
                    //     } else {
                    //     if($(element).hasClass("eui-button-disabled")){
                    //     $(element).removeClass("eui-button-disabled");
                    //     }
                    //     }*/
                    //};
                    //on_txtvalue_change(scope, attrs);

                    //监视txtvalue属性
                    //scope.$watch('txtvalue', on_txtvalue_change(scope, attrs), true);


                }
            }
        }
    ]);

angular.module('eui.input', [])
    .controller('euiinputCtrl',function($scope){
        //$scope.required = false;
    })
    .directive('euiInput', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                //templateUrl:'../button/button.html',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/input/input.html';
                },
                replace: true,
                transclude: true,
                controller: 'euiinputCtrl',
                scope: {
                    required:'=?',
                    txtvalue:'@',
                    disabled:'=?',



                    iconCls: '@',
                    plain:'=?',
                    onlyIcon:'@',
                    enabled:'=?',
                    flag:"@" //如果flag为true，则采用scope判断，如果flag为flase，则采用attrs判断
                },
                link: function(scope, element, attrs) {
                    //scope.required = (attrs.required == "true")? true : false;
                    scope.disabled = (attrs.disabled == "true")? true : false;
                    scope.txtvalue = attrs.txtvalue;
                    //scope.required1 = false;

                    scope.requiredtext = "标示必填项！";
                    scope.errorMsg = "不能为空！";

                    //if(scope.txtvalue!="" && scope.txtvalue!=undefined){
                    //    //有值，去掉验证
                    //    if(scope.required){
                    //        scope.required = false;
                    //    }
                    //}

                    //根据值和属性设置提示信息
                    var on_txtvalue_change = function(scope, attrs){
                        if(scope.txtvalue!="" && scope.txtvalue!=undefined){
                            //有值，去掉验证
                            if(scope.required){
                                scope.required = false;
                            }
                        }else{
                            //没有值判断是否需要验证
                            if(scope.required){
                                scope.required = true;
                            }
                        }
                        //alert(scope.txtvalue);
                        /*scope.txtvalue = scope.enabled === false || scope.enabled === "false"? false:true;

                        if(!scope.enabled){
                            if(!$(element).hasClass("eui-button-disabled")){
                                $(element).addClass("eui-button-disabled");
                            }
                        } else {
                            if($(element).hasClass("eui-button-disabled")){
                                $(element).removeClass("eui-button-disabled");
                            }
                        }*/
                    };
                    //on_txtvalue_change(scope, attrs);

                    //监视txtvalue属性
                    //scope.$watch('txtvalue', on_txtvalue_change(scope, attrs), true);












                    scope.iconCls = scope.iconCls? scope.iconCls:"";
                    scope.flag = (scope.flag === "false" || scope.flag === undefined)? false:true;
                    scope.plain = (scope.plain === "false" || scope.plain === undefined)? false:true;
                    scope.onlyIcon = (scope.onlyIcon === "false" || scope.onlyIcon === undefined)? false:true;

                    //更新状态
                    var on_enabled_change = function(){
                        scope.enabled = scope.enabled === false || scope.enabled === "false"? false:true;

                        if(!scope.enabled){
                            if(!$(element).hasClass("eui-button-disabled")){
                                $(element).addClass("eui-button-disabled");
                            }
                        } else {
                            if($(element).hasClass("eui-button-disabled")){
                                $(element).removeClass("eui-button-disabled");
                            }
                        }
                    };
                    on_enabled_change();
                    //监视enabled属性
                    scope.$watch('enabled', on_enabled_change, true);

                    if(scope.flag){
                        if(scope.iconCls){
                            $(element).children().eq(0).addClass(scope.iconCls);
                            if(!attrs.onlyIcon){
                                $(element).children().eq(0).addClass("eui-button-icon");
                            } else {
                                $(element).children().eq(0).html("&nbsp");
                                $(element).children().eq(0).addClass("eui-button-iconOnly");
                            }
                        }

                        if(scope.plain){
                            if(!$(element).hasClass("eui-button-plain")){
                                $(element).addClass("eui-button-plain");
                            }
                        } else {
                            if($(element).hasClass("eui-button-plain")){
                                $(element).removeClass("eui-button-plain");
                            }
                        }
                    } else {
                        if(attrs.iconCls){
                            $(element).children().eq(0).addClass(attrs.iconCls);
                            if(!attrs.onlyIcon){
                                $(element).children().eq(0).addClass("eui-button-icon");
                            } else {
                                $(element).children().eq(0).html("&nbsp");
                                $(element).children().eq(0).addClass("eui-button-iconOnly");
                            }
                        }

                        if(attrs.plain){
                            if(!$(element).hasClass("eui-button-plain")){
                                $(element).addClass("eui-button-plain");
                            }
                        } else {
                            if($(element).hasClass("eui-button-plain")){
                                $(element).removeClass("eui-button-plain");
                            }
                        }
                    }

                    if(attrs.allow){
                        $(element).find(".eui-button-allow").css("display","inline-block");
                    }
                }
            }
        }
    ]);

'use strict';

/**
 * UI.Layout
 */
angular.module('eui.layout', ['eui'])
  .controller('euiLayoutCtrl', ['$scope', '$attrs', '$element', '$timeout', '$window', 'LayoutContainer', 'Layout',
  function euiLayoutCtrl($scope, $attrs, $element, $timeout, $window, LayoutContainer, Layout) {

    var ctrl = this;
    var opts = angular.extend({}, $scope.$eval($attrs.euiLayout), $scope.$eval($attrs.options));
    var numOfSplitbars = 0;
    //var cache = {};
    var animationFrameRequested;
    var lastPos;

    // regex to verify size is properly set to pixels or percent
    var sizePattern = /\d+\s*(px|%)\s*$/i;

    Layout.addLayout(ctrl);

    ctrl.containers = [];
    ctrl.movingSplitbar = null;
    ctrl.bounds = $element[0].getBoundingClientRect();
    ctrl.isUsingColumnFlow = opts.flow === 'column';
    ctrl.sizeProperties = !ctrl.isUsingColumnFlow ?
    { sizeProperty: 'height',
      offsetSize: 'offsetHeight',
      offsetPos: 'top',
      flowProperty: 'top',
      oppositeFlowProperty: 'bottom',
      mouseProperty: 'clientY',
      flowPropertyPosition: 'y' } :
    { sizeProperty: 'width',
      offsetSize: 'offsetWidth',
      offsetPos: 'left',
      flowProperty: 'left',
      oppositeFlowProperty: 'right',
      mouseProperty: 'clientX',
      flowPropertyPosition: 'x' };

    $element
      // Force the layout to fill the parent space
      // fix no height layout...
      .addClass('stretch')
      // set the layout css class
      .addClass('eui-layout-' + (opts.flow || 'row'));

    if (opts.disableToggle) {
      $element.addClass('no-toggle');
    }
    if (opts.disableMobileToggle) {
      $element.addClass('no-mobile-toggle');
    }

    // Initial global size definition
    opts.sizes = opts.sizes || [];
    opts.maxSizes = opts.maxSizes || [];
    opts.minSizes = opts.minSizes || [];
    opts.dividerSize = opts.dividerSize === undefined ? 10 : opts.dividerSize;
    opts.collapsed = opts.collapsed || [];
    ctrl.opts = opts;

    $scope.updateDisplay = function() {
      ctrl.calculate();
    };

    var debounceEvent;
    function draw() {
      var position = ctrl.sizeProperties.flowProperty;
      var dividerSize = parseInt(opts.dividerSize);
      var elementSize = $element[0][ctrl.sizeProperties.offsetSize];

      if(ctrl.movingSplitbar !== null) {
        var splitbarIndex = ctrl.containers.indexOf(ctrl.movingSplitbar);
        var nextSplitbarIndex = (splitbarIndex + 2) < ctrl.containers.length ? splitbarIndex + 2 : null;

        if(splitbarIndex > -1) {
          var processedContainers = ctrl.processSplitbar(ctrl.containers[splitbarIndex]);
          var beforeContainer = processedContainers.beforeContainer;
          var afterContainer = processedContainers.afterContainer;

          if(!beforeContainer.collapsed && !afterContainer.collapsed) {
            // calculate container positons
            var difference = ctrl.movingSplitbar[position] - lastPos;
            var newPosition = ctrl.movingSplitbar[position] - difference;

            // Keep the bar in the window (no left/top 100%)
            newPosition = Math.min(elementSize-dividerSize, newPosition);

            // Keep the bar from going past the previous element min/max values
            if(angular.isNumber(beforeContainer.beforeMinValue) && newPosition < beforeContainer.beforeMinValue)
              newPosition = beforeContainer.beforeMinValue;
            if(angular.isNumber(beforeContainer.beforeMaxValue) && newPosition > beforeContainer.beforeMaxValue)
              newPosition = beforeContainer.beforeMaxValue;

            // Keep the bar from going past the next element min/max values
            if(afterContainer !== null &&
              angular.isNumber(afterContainer.afterMinValue) &&
              newPosition > (afterContainer.afterMinValue - dividerSize))
              newPosition = afterContainer.afterMinValue - dividerSize;
            if(afterContainer !== null && angular.isNumber(afterContainer.afterMaxValue) && newPosition < afterContainer.afterMaxValue)
              newPosition = afterContainer.afterMaxValue;

            // resize the before container
            beforeContainer.size = newPosition - beforeContainer[position];
            // store the current value to preserve this size during onResize
            beforeContainer.uncollapsedSize = beforeContainer.size;

            // update after container position
            var oldAfterContainerPosition = afterContainer[position];
            afterContainer[position] = newPosition + dividerSize;

            //update after container size if the position has changed
            if(afterContainer[position] != oldAfterContainerPosition) {
              afterContainer.size = (nextSplitbarIndex !== null) ?
              (oldAfterContainerPosition + afterContainer.size) - (newPosition + dividerSize) :
              elementSize - (newPosition + dividerSize);
              // store the current value to preserve this size during onResize
              afterContainer.uncollapsedSize = afterContainer.size;
            }

            // move the splitbar
            ctrl.movingSplitbar[position] = newPosition;

            // broadcast an event that resize happened (debounced to 50ms)
            if(debounceEvent) $timeout.cancel(debounceEvent);
            debounceEvent = $timeout(function() {
              $scope.$broadcast('eui.layout.resize', beforeContainer, afterContainer);
              debounceEvent = null;
            }, 50);
          }
        }
      }

      //Enable a new animation frame
      animationFrameRequested = null;
    }

    function offset(element) {
      var rawDomNode = element[0];
      var body = document.documentElement || document.body;
      var scrollX = window.pageXOffset || body.scrollLeft;
      var scrollY = window.pageYOffset || body.scrollTop;
      var clientRect = rawDomNode.getBoundingClientRect();
      var x = clientRect.left + scrollX;
      var y = clientRect.top + scrollY;
      return { left: x, top: y };
    }

    /**
     * Returns the current value for an option
     * @param  option   The option to get the value for
     * @return The value of the option. Returns null if there was no option set.
     */
    function optionValue(option) {
      if(typeof option == 'number' || typeof option == 'string' && option.match(sizePattern)) {
        return option;
      } else {
        return null;
      }
    }

    //================================================================================
    // Public Controller Functions
    //================================================================================
    ctrl.mouseUpHandler = function(event) {
      if(ctrl.movingSplitbar !== null) {
        ctrl.movingSplitbar = null;
      }
      return event;
    };

    ctrl.mouseMoveHandler = function(mouseEvent) {
      var mousePos = mouseEvent[ctrl.sizeProperties.mouseProperty] ||
        (mouseEvent.originalEvent && mouseEvent.originalEvent[ctrl.sizeProperties.mouseProperty]) ||
        // jQuery does touches weird, see #82
        ($window.jQuery ?
          (mouseEvent.originalEvent ? mouseEvent.originalEvent.targetTouches[0][ctrl.sizeProperties.mouseProperty] : 0) :
          (mouseEvent.targetTouches ? mouseEvent.targetTouches[0][ctrl.sizeProperties.mouseProperty] : 0));

      lastPos = mousePos - offset($element)[ctrl.sizeProperties.offsetPos];

      //Cancel previous rAF call
      if(animationFrameRequested) {
        window.cancelAnimationFrame(animationFrameRequested);
      }

      //TODO: cache layout values

      //Animate the page outside the event
      animationFrameRequested = window.requestAnimationFrame(draw);
    };

    /**
     * Returns the min and max values of the ctrl.containers on each side of the container submitted
     * @param container
     * @returns {*}
     */
    ctrl.processSplitbar = function(container) {
      var index = ctrl.containers.indexOf(container);

      var setValues = function(container) {
        var start = container[ctrl.sizeProperties.flowProperty];
        var end = container[ctrl.sizeProperties.flowProperty] + container.size;

        container.beforeMinValue = angular.isNumber(container.minSize) ? start + container.minSize : start;
        container.beforeMaxValue = angular.isNumber(container.maxSize) ? start + container.maxSize : null;

        container.afterMinValue = angular.isNumber(container.minSize) ? end - container.minSize : end;
        container.afterMaxValue = angular.isNumber(container.maxSize) ? end - container.maxSize : null;
      };

      //verify the container was found in the list
      if(index > -1) {
        var beforeContainer = (index > 0) ? ctrl.containers[index-1] : null;
        var afterContainer = ((index+1) <= ctrl.containers.length) ? ctrl.containers[index+1] : null;

        if(beforeContainer !== null) setValues(beforeContainer);
        if(afterContainer !== null) setValues(afterContainer);

        return {
          beforeContainer: beforeContainer,
          afterContainer: afterContainer
        };
      }

      return null;
    };

    /**
     * Checks if a string has a percent symbol in it.
     * @param num
     * @returns {boolean}
     */
    ctrl.isPercent = function(num) {
      return (num && angular.isString(num) && num.indexOf('%') > -1) ? true : false;
    };

    /**
     * Converts a number to pixels from percent.
     * @param size
     * @param parentSize
     * @returns {number}
     */
    ctrl.convertToPixels = function(size, parentSize) {
      return Math.floor(parentSize * (parseInt(size) / 100));
    };

    /**
     * Sets the default size for each container.
     */
    ctrl.calculate = function() {
      var c, i;
      var dividerSize = parseInt(opts.dividerSize);
      var elementSize = $element[0].getBoundingClientRect()[ctrl.sizeProperties.sizeProperty];
      var availableSize = elementSize - (dividerSize * numOfSplitbars);
      var originalSize = availableSize;
      var usedSpace = 0;
      var numOfAutoContainers = 0;
      if(ctrl.containers.length > 0 && $element.children().length > 0) {

        // calculate sizing for ctrl.containers
        for(i=0; i < ctrl.containers.length; i++) {
          if(!LayoutContainer.isSplitbar(ctrl.containers[i])) {

            c = ctrl.containers[i];
            opts.sizes[i] = c.isCentral ? 'auto' : c.collapsed ? (optionValue(c.minSize) || '0px') : optionValue(c.uncollapsedSize) || 'auto';
            opts.minSizes[i] = optionValue(c.minSize);
            opts.maxSizes[i] = optionValue(c.maxSize);

            if(opts.sizes[i] !== 'auto') {
              if(ctrl.isPercent(opts.sizes[i])) {
                opts.sizes[i] = ctrl.convertToPixels(opts.sizes[i], originalSize);
              } else {
                opts.sizes[i] = parseInt(opts.sizes[i]);
              }
            }

            if(opts.minSizes[i] !== null) {
              if(ctrl.isPercent(opts.minSizes[i])) {
                opts.minSizes[i] = ctrl.convertToPixels(opts.minSizes[i], originalSize);
              } else {
                opts.minSizes[i] = parseInt(opts.minSizes[i]);
              }

              // don't allow the container size to initialize smaller than the minSize
              if(!c.collapsed && opts.sizes[i] < opts.minSizes[i]) opts.sizes[i] = opts.minSizes[i];
            }

            if(opts.maxSizes[i] !== null) {
              if(ctrl.isPercent(opts.maxSizes[i])) {
                opts.maxSizes[i] = ctrl.convertToPixels(opts.maxSizes[i], originalSize);
              } else {
                opts.maxSizes[i] = parseInt(opts.maxSizes[i]);
              }

              // don't allow the container size to intialize larger than the maxSize
              if(opts.sizes[i] > opts.maxSizes[i]) opts.sizes[i] = opts.maxSizes[i];
            }

            if(opts.sizes[i] === 'auto') {
              numOfAutoContainers++;
            } else {
              availableSize -= opts.sizes[i];
            }
          }
        }

        // FIXME: autoSize if frequently Infinity, since numOfAutoContainers is frequently 0, no need to calculate that
        // set the sizing for the ctrl.containers
        /*
         * When the parent size is odd, rounding down the `autoSize` leaves a remainder.
         * This remainder is added to the last auto-sized container in a layout.
         */
        var autoSize = Math.floor(availableSize / numOfAutoContainers),
          remainder = availableSize - autoSize * numOfAutoContainers;
        for(i=0; i < ctrl.containers.length; i++) {
          c = ctrl.containers[i];
          c[ctrl.sizeProperties.flowProperty] = usedSpace;
          c.maxSize = opts.maxSizes[i];
          c.minSize = opts.minSizes[i];

          //TODO: adjust size if autosize is greater than the maxSize

          if(!LayoutContainer.isSplitbar(c)) {
            var newSize;
            if(opts.sizes[i] === 'auto') {
              newSize = autoSize;
              // add the rounding down remainder to the last auto-sized container in the layout
              if (remainder > 0 && i === ctrl.containers.length - 1) {
                newSize += remainder;
              }
            } else {
              newSize = opts.sizes[i];
            }

            c.size = (newSize !== null) ? newSize : autoSize;
          } else {
            c.size = dividerSize;
          }

          usedSpace += c.size;
        }
      }
    };

    /**
     * Adds a container to the list of layout ctrl.containers.
     * @param container The container to add
     */
    ctrl.addContainer = function(container) {
      var index = ctrl.indexOfElement(container.element);
      if(!angular.isDefined(index) || index < 0 || ctrl.containers.length < index) {
        console.error("Invalid index to add container; i=" + index + ", len=", ctrl.containers.length);
        return;
      }

      if(LayoutContainer.isSplitbar(container)) {
        numOfSplitbars++;
      }

      container.index = index;
      ctrl.containers.splice(index, 0, container);

      ctrl.calculate();
    };

    /**
     * Remove a container from the list of layout ctrl.containers.
     * @param  container
     */
    ctrl.removeContainer = function(container) {
      var index = ctrl.containers.indexOf(container);
      if(index >= 0) {
        if(!LayoutContainer.isSplitbar(container)) {
          if(ctrl.containers.length > 2) {
            // Assume there's a sidebar between each container
            // We need to remove this container and the sidebar next to it
            if(index == ctrl.containers.length - 1) {
              // We're removing the last element, the side bar is on the left
              ctrl.containers[index-1].element.remove();
            } else {
              // The side bar is on the right
              ctrl.containers[index+1].element.remove();
            }
          }
        } else {
          // fix for potentially collapsed containers
          ctrl.containers[index - 1].collapsed = false;
          numOfSplitbars--;
        }

        // Need to re-check the index, as a side bar may have been removed
        var newIndex = ctrl.containers.indexOf(container);
        if(newIndex >= 0) {
          ctrl.containers.splice(newIndex, 1);
          ctrl.opts.maxSizes.splice(newIndex, 1);
          ctrl.opts.minSizes.splice(newIndex, 1);
          ctrl.opts.sizes.splice(newIndex, 1);
        }
        ctrl.calculate();
      } else {
        console.error("removeContainer for container that did not exist!");
      }
    };

    /**
     * Returns an array of layout ctrl.containers.
     * @returns {Array}
     */
    ctrl.getContainers = function() {
      return ctrl.containers;
    };

    ctrl.toggleContainer = function(index) {

      var splitter = ctrl.containers[index + 1],
        el;

      if (splitter) {
        el = splitter.element[0].children[0];
      } else {
        splitter = ctrl.containers[index - 1];
        el = splitter.element[0].children[1];
      }

      $timeout(function(){
        angular.element(el).triggerHandler('click');
      });
    };

    /**
     * Toggles the container before the provided splitbar
     * @param splitbar
     * @returns {boolean|*|Array}
     */
    ctrl.toggleBefore = function(splitbar) {
      var index = ctrl.containers.indexOf(splitbar) - 1;

      var c = ctrl.containers[index];
      c.collapsed = !ctrl.containers[index].collapsed;

      var nextSplitbar = ctrl.containers[index+1];
      var nextContainer = ctrl.containers[index+2];

      // uncollapsedSize is undefined in case of 'auto' sized containers.
      // Perhaps there's a place where we could set... could find it though. @see also toggleBefore
      if (c.uncollapsedSize === undefined) {
        c.uncollapsedSize = c.size;
      } else {
        c.uncollapsedSize = parseInt(c.uncollapsedSize);
      }
      // FIXME: collapse:resize:uncollapse: works well "visually" without the nextSplitbar and nextContainer calculations
      // but removing those breaks few test
      $scope.$apply(function() {
        if(c.collapsed) {

          c.size = 0;

          if(nextSplitbar) nextSplitbar[ctrl.sizeProperties.flowProperty] -= c.uncollapsedSize;
          if(nextContainer) {
            nextContainer[ctrl.sizeProperties.flowProperty] -= c.uncollapsedSize;
            nextContainer.uncollapsedSize += c.uncollapsedSize;
          }

        } else {
          c.size = c.uncollapsedSize;

          if(nextSplitbar) nextSplitbar[ctrl.sizeProperties.flowProperty] += c.uncollapsedSize;
          if(nextContainer) {
            nextContainer[ctrl.sizeProperties.flowProperty] += c.uncollapsedSize;
            nextContainer.uncollapsedSize -= c.uncollapsedSize;
          }
        }
      });
      $scope.$broadcast('eui.layout.toggle', c);
      Layout.toggled();

      return c.collapsed;
    };


    /**
     * Toggles the container after the provided splitbar
     * @param splitbar
     * @returns {boolean|*|Array}
     */
    ctrl.toggleAfter = function(splitbar) {
      var index = ctrl.containers.indexOf(splitbar) + 1;
      var c = ctrl.containers[index];
      var prevSplitbar = ctrl.containers[index-1];
      var prevContainer = ctrl.containers[index-2];
      var isLastContainer = index === (ctrl.containers.length - 1);
      var endDiff;
      var flowProperty = ctrl.sizeProperties.flowProperty;
      var sizeProperty = ctrl.sizeProperties.sizeProperty;

      ctrl.bounds = $element[0].getBoundingClientRect();

      c.collapsed = !ctrl.containers[index].collapsed;

      // uncollapsedSize is undefined in case of 'auto' sized containers.
      // Perhaps there's a place where we could set... could find it though. @see also toggleBefore
      if (c.uncollapsedSize === undefined) {
        c.uncollapsedSize = c.size;
      } else {
        c.uncollapsedSize = parseInt(c.uncollapsedSize);
      }

      // FIXME: collapse:resize:uncollapse: works well "visually" without the prevSplitbar and prevContainer calculations
      // but removing those breaks few test
      $scope.$apply(function() {
        if(c.collapsed) {

          c.size = 0;

          // adds additional space so the splitbar moves to the very end of the container
          // to offset the lost space when converting from percents to pixels
          endDiff = (isLastContainer) ? ctrl.bounds[sizeProperty] - c[flowProperty] - c.uncollapsedSize : 0;

          if(prevSplitbar) {
            prevSplitbar[flowProperty] += (c.uncollapsedSize + endDiff);
          }
          if(prevContainer) {
            prevContainer.size += (c.uncollapsedSize + endDiff);
          }

        } else {
          c.size = c.uncollapsedSize;

          // adds additional space so the splitbar moves back to the proper position
          // to offset the additional space added when collapsing
          endDiff = (isLastContainer) ? ctrl.bounds[sizeProperty] - c[flowProperty] - c.uncollapsedSize : 0;

          if(prevSplitbar) {
            prevSplitbar[flowProperty] -= (c.uncollapsedSize + endDiff);
          }
          if(prevContainer) {
            prevContainer.size -= (c.uncollapsedSize + endDiff);
          }
        }
      });
      $scope.$broadcast('eui.layout.toggle', c);
      Layout.toggled();
      return c.collapsed;
    };

    /**
     * Returns the container object of the splitbar that is before the one passed in.
     * @param currentSplitbar
     */
    ctrl.getPreviousSplitbarContainer = function(currentSplitbar) {
      if(LayoutContainer.isSplitbar(currentSplitbar)) {
        var currentSplitbarIndex = ctrl.containers.indexOf(currentSplitbar);
        var previousSplitbarIndex = currentSplitbarIndex - 2;
        if(previousSplitbarIndex >= 0) {
          return ctrl.containers[previousSplitbarIndex];
        }
        return null;
      }
      return null;
    };

    /**
     * Returns the container object of the splitbar that is after the one passed in.
     * @param currentSplitbar
     */
    ctrl.getNextSplitbarContainer = function(currentSplitbar) {
      if(LayoutContainer.isSplitbar(currentSplitbar)) {
        var currentSplitbarIndex = ctrl.containers.indexOf(currentSplitbar);
        var nextSplitbarIndex = currentSplitbarIndex + 2;
        if(currentSplitbarIndex > 0 && nextSplitbarIndex < ctrl.containers.length) {
          return ctrl.containers[nextSplitbarIndex];
        }
        return null;
      }
      return null;
    };

    /**
     * Checks whether the container before this one is a split bar
     * @param  {container}  container The container to check
     * @return {Boolean}    true if the element before is a splitbar, false otherwise
     */
    ctrl.hasSplitbarBefore = function(container) {
      var index = ctrl.containers.indexOf(container);
      if(1 <= index) {
        return LayoutContainer.isSplitbar(ctrl.containers[index-1]);
      }

      return false;
    };

    /**
     * Checks whether the container after this one is a split bar
     * @param  {container}  container The container to check
     * @return {Boolean}    true if the element after is a splitbar, false otherwise
     */
    ctrl.hasSplitbarAfter = function(container) {
      var index = ctrl.containers.indexOf(container);
      if(index < ctrl.containers.length - 1) {
        return LayoutContainer.isSplitbar(ctrl.containers[index+1]);
      }

      return false;
    };

    /**
     * Checks whether the passed in element is a eui-layout type element.
     * @param  {element}  element The element to check
     * @return {Boolean}          true if the element is a layout element, false otherwise.
     */
    ctrl.isLayoutElement = function(element) {
      return element.hasAttribute('eui-layout-container') ||
        element.hasAttribute('eui-splitbar') ||
        element.nodeName === 'EUI-LAYOUT-CONTAINER';
    };

    /**
     * Retrieve the index of an element within it's parents context.
     * @param  {element} element The element to get the index of
     * @return {int}             The index of the element within it's parent
     */
    ctrl.indexOfElement = function(element) {
      var parent = element.parent();
      var children = parent.children();
      var containerIndex = 0;
      for(var i = 0; i < children.length; i++) {
        var child = children[i];
        if(ctrl.isLayoutElement(child)) {
          if(element[0] == children[i]) {
            return containerIndex;
          }
          containerIndex++;
        }
      }
      return -1;
    };

    return ctrl;
  }])

  .directive('euiLayout', ['$window', function($window) {
    return {
      restrict: 'AE',
      controller: 'euiLayoutCtrl',
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function () {
          return element[0][ctrl.sizeProperties.offsetSize];
        }, function() {
          ctrl.calculate();
        });

        function onResize() {
          scope.$evalAsync(function() {
            ctrl.calculate();
          });
        }

        angular.element($window).bind('resize', onResize);

        scope.$on('$destroy', function() {
          angular.element($window).unbind('resize', onResize);
        });
      }
    };
  }])

  .directive('euiSplitbar', ['LayoutContainer', function(LayoutContainer) {
    // Get all the page.
    var htmlElement = angular.element(document.body.parentElement);

    return {
      restrict: 'EAC',
      require: '^euiLayout',
      scope: {},

      link: function(scope, element, attrs, ctrl) {
        if(!element.hasClass('stretch')) element.addClass('stretch');
        if(!element.hasClass('eui-splitbar')) element.addClass('eui-splitbar');

        var animationClass = ctrl.isUsingColumnFlow ? 'animate-column' : 'animate-row';
        element.addClass(animationClass);

        scope.splitbar = LayoutContainer.Splitbar();
        scope.splitbar.element = element;

        //icon <a> elements
        var prevButton = angular.element(element.children()[0]);
        var afterButton = angular.element(element.children()[1]);

        //icon <span> elements
        var prevIcon = angular.element(prevButton.children()[0]);
        var afterIcon = angular.element(afterButton.children()[0]);

        //icon classes
        var iconLeft = 'eui-splitbar-icon-left';
        var iconRight = 'eui-splitbar-icon-right';
        var iconUp = 'eui-splitbar-icon-up';
        var iconDown = 'eui-splitbar-icon-down';

        var prevIconClass = ctrl.isUsingColumnFlow ? iconLeft : iconUp;
        var afterIconClass = ctrl.isUsingColumnFlow ? iconRight : iconDown;

        prevIcon.addClass(prevIconClass);
        afterIcon.addClass(afterIconClass);


        prevButton.on('click', function() {
          var prevSplitbarBeforeButton, prevSplitbarAfterButton;
          var result = ctrl.toggleBefore(scope.splitbar);
          var previousSplitbar = ctrl.getPreviousSplitbarContainer(scope.splitbar);

          if(previousSplitbar !== null) {
            prevSplitbarBeforeButton = angular.element(previousSplitbar.element.children()[0]);
            prevSplitbarAfterButton = angular.element(previousSplitbar.element.children()[1]);
          }

          if(ctrl.isUsingColumnFlow) {
            if(result) {
              afterButton.css('display', 'none');
              prevIcon.removeClass(iconLeft);
              prevIcon.addClass(iconRight);

              // hide previous splitbar buttons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'none');
                prevSplitbarAfterButton.css('display', 'none');
              }
            } else {
              afterButton.css('display', 'inline');
              prevIcon.removeClass(iconRight);
              prevIcon.addClass(iconLeft);

              // show previous splitbar icons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'inline');
                prevSplitbarAfterButton.css('display', 'inline');
              }
            }
          } else {
            if(result) {
              afterButton.css('display', 'none');
              prevIcon.removeClass(iconUp);
              prevIcon.addClass(iconDown);

              // hide previous splitbar buttons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'none');
                prevSplitbarAfterButton.css('display', 'none');
              }
            } else {
              afterButton.css('display', 'inline');
              prevIcon.removeClass(iconDown);
              prevIcon.addClass(iconUp);

              // show previous splitbar icons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'inline');
                prevSplitbarAfterButton.css('display', 'inline');
              }
            }
          }
          scope.$evalAsync(function() {
            ctrl.calculate();
          });
        });

        afterButton.on('click', function() {
          var nextSplitbarBeforeButton, nextSplitbarAfterButton;
          var result = ctrl.toggleAfter(scope.splitbar);
          var nextSplitbar = ctrl.getNextSplitbarContainer(scope.splitbar);

          if(nextSplitbar !== null) {
            nextSplitbarBeforeButton = angular.element(nextSplitbar.element.children()[0]);
            nextSplitbarAfterButton = angular.element(nextSplitbar.element.children()[1]);
          }

          if(ctrl.isUsingColumnFlow) {
            if(result) {
              prevButton.css('display', 'none');
              afterIcon.removeClass(iconRight);
              afterIcon.addClass(iconLeft);

              // hide next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'none');
                nextSplitbarAfterButton.css('display', 'none');
              }
            } else {
              prevButton.css('display', 'inline');
              afterIcon.removeClass(iconLeft);
              afterIcon.addClass(iconRight);

              // show next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'inline');
                nextSplitbarAfterButton.css('display', 'inline');
              }
            }
          } else {
            if(result) {
              prevButton.css('display', 'none');
              afterIcon.removeClass(iconDown);
              afterIcon.addClass(iconUp);

              // hide next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'none');
                nextSplitbarAfterButton.css('display', 'none');
              }
            } else {
              prevButton.css('display', 'inline');
              afterIcon.removeClass(iconUp);
              afterIcon.addClass(iconDown);

              // show next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'inline');
                nextSplitbarAfterButton.css('display', 'inline');
              }
            }
          }
          scope.$evalAsync(function() {
            ctrl.calculate();
          });
        });

        element.on('mousedown touchstart', function(e) {
          ctrl.movingSplitbar = scope.splitbar;
          ctrl.processSplitbar(scope.splitbar);

          e.preventDefault();
          e.stopPropagation();

          htmlElement.on('mousemove touchmove', function(event) {
            scope.$apply(angular.bind(ctrl, ctrl.mouseMoveHandler, event));
          });
          return false;
        });

        htmlElement.on('mouseup touchend', function(event) {
          scope.$apply(angular.bind(ctrl, ctrl.mouseUpHandler, event));
          htmlElement.off('mousemove touchmove');
        });

        scope.$watch('splitbar.size', function(newValue) {
          element.css(ctrl.sizeProperties.sizeProperty, newValue + 'px');
        });

        scope.$watch('splitbar.' + ctrl.sizeProperties.flowProperty, function(newValue) {
          element.css(ctrl.sizeProperties.flowProperty, newValue + 'px');
        });

        scope.$on('$destroy', function() {
          htmlElement.off('mouseup touchend mousemove touchmove');
        });

        //Add splitbar to layout container list
        ctrl.addContainer(scope.splitbar);

        element.on('$destroy', function() {
          ctrl.removeContainer(scope.splitbar);
          scope.$evalAsync();
        });
      }
    };

  }])

  .directive('euiLayoutContainer',
    ['LayoutContainer', '$compile', '$timeout', 'Layout',
      function(LayoutContainer, $compile, $timeout, Layout) {
        return {
          restrict: 'AE',
          require: '^euiLayout',
          scope: {
            collapsed: '=',
            resizable: '=',
            size: '@',
            minSize: '@',
            maxSize: '@'
          },

          compile: function() {
            return {
              pre: function(scope, element, attrs, ctrl) {

                scope.container = LayoutContainer.Container();
                scope.container.element = element;
                scope.container.id = element.attr('id') || null;
                scope.container.layoutId = ctrl.id;
                scope.container.isCentral = attrs.uiLayoutContainer === 'central';

                if (scope.collapsed === true) {
                  scope.collapsed = false;
                  Layout.addCollapsed(scope.container);
                }
                // FIXME: collapsed: @see uiLayoutLoaded for explanation
                //if (angular.isDefined(scope.collapsed)) {
                //  scope.container.collapsed = scope.collapsed;
                //}

                if (angular.isDefined(scope.resizable)) {
                  scope.container.resizable = scope.resizable;
                }
                scope.container.size = scope.size;
                scope.container.uncollapsedSize = scope.size;
                scope.container.minSize = scope.minSize;
                scope.container.maxSize = scope.maxSize;
                ctrl.addContainer(scope.container);

                element.on('$destroy', function() {
                  ctrl.removeContainer(scope.container);
                  scope.$evalAsync();
                });
              },
              post: function(scope, element, attrs, ctrl) {
                if(!element.hasClass('stretch')) element.addClass('stretch');
                if(!element.hasClass('eui-layout-container')) element.addClass('eui-layout-container');

                var animationClass = ctrl.isUsingColumnFlow ? 'animate-column' : 'animate-row';
                element.addClass(animationClass);

                scope.$watch('collapsed', function (val, old) {
                  if (angular.isDefined(old) && val !== old) {
                    ctrl.toggleContainer(scope.container.index);
                  }
                });

                scope.$watch('container.size', function(newValue) {
                  element.css(ctrl.sizeProperties.sizeProperty, newValue + 'px');
                  if(newValue === 0) {
                    element.addClass('eui-layout-hidden');
                  } else {
                    element.removeClass('eui-layout-hidden');
                  }
                });

                scope.$watch('container.' + ctrl.sizeProperties.flowProperty, function(newValue) {
                  element.css(ctrl.sizeProperties.flowProperty, newValue + 'px');
                });

                //TODO: add ability to disable auto-adding a splitbar after the container
                var parent = element.parent();
                var children = parent.children();
                var index = ctrl.indexOfElement(element);
                var splitbar = angular.element('<div eui-splitbar>' +
                  '<a><span class="eui-splitbar-icon"></span></a>' +
                  '<a><span class="eui-splitbar-icon"></span></a>' +
                  '</div>');
                if(0 < index && !ctrl.hasSplitbarBefore(scope.container)) {
                  angular.element(children[index-1]).after(splitbar);
                  $compile(splitbar)(scope);
                } else if(index < children.length - 1) {
                  element.after(splitbar);
                  $compile(splitbar)(scope);
                }
              }
            };
          }
        };
      }])

  .directive('euiLayoutLoaded', ['$timeout', 'Layout', 'reqChannel', function($timeout, Layout, reqChannel) {
    // Currently necessary for programmatic toggling to work with "initially" collapsed containers,
    // because prog. toggling depends on the logic of prevButton and nextButton (which should be probably refactored out)
    //
    // This is how it currently works:
    // 1. uiLayoutContainer in prelink phase resets @collapsed to false, because layout has to be calculated
    //    with all containers uncollapsed to get the correct dimensions
    // 2. layout with eui-layout-loaded attributes broadcasts "ui.layout.loaded"
    // 3. user changes values of @collapsed which triggers 'click' on either of the buttons
    // 3. the other button is hidden and container size set to 0
    return {
      require: '^euiLayout',
      restrict: 'A',
      priority: -100,
      link: function($scope, el, attrs){

        // negation is safe here, because we are expecting non-empty string
        if (!attrs['euiLayoutLoaded']) {
          Layout.toggle().then(
            function(){
              $scope.$broadcast('eui.layout.loaded', null);
              reqChannel.resizeElement();
            }
          );
        } else {
          $scope.$broadcast('eui.layout.loaded',  attrs['euiLayoutLoaded']);
          reqChannel.resizeElement();
        }
      }
    };
  }])

  .factory('Layout', ['$q', '$timeout', function($q, $timeout) {
    var layouts = [],
      collapsing = [],
      toBeCollapsed = 0,
      toggledDeffered =  null;

    function toggleContainer(container) {
      try {
        layouts[container.layoutId].toggleContainer(container.index);
      } catch (e) {
        e.message = 'Could not toggle container [' + container.layoutId + '/' + container.index + ']: ' + e.message;
        throw e;
      }
    }

    return {
      addLayout: function (ctrl) {
        ctrl.id = layouts.length;
        layouts.push(ctrl);
      },
      addCollapsed: function(container) {
        collapsing.push(container);
      },
      hasCollapsed: function() {
        return collapsing.length > 0;
      },
      toggled: function() {
        // event already dispatched, do nothing
        if (toBeCollapsed === 0) {
          if (toggledDeffered) {
            toggledDeffered.reject();
          } else {
            return false;
          }
        }
        toBeCollapsed--;
        if (toBeCollapsed === 0) {
          toggledDeffered.resolve();
        }
      },
      toggle: function() {
        toggledDeffered = $q.defer();
        toBeCollapsed = collapsing.length;
        if (toBeCollapsed === 0) {
          $timeout(function(){
            toggledDeffered.resolve();
          });
        }
        collapsing.reverse();
        var c;
        while(c = collapsing.pop()) {
          toggleContainer(c);
        }
        return toggledDeffered.promise;
      }
    };
  }])

  .factory('LayoutContainer', function() {
    function BaseContainer() {

      /**
       * Stores element's id if provided
       * @type {string}
       */
      this.id = null;

      /**
       * Id of the parent layout
       * @type {number}
       */
      this.layoutId = null;

      /**
       * Central container that is always resized
       * @type {boolean}
       */
      this.isCentral = false;

      /**
       * actual size of the container, which is changed on every updateDisplay
       * @type {any}
       */
      this.size = 'auto';

      /**
       * cache for the last uncollapsed size
       * @type {any}
       */
      this.uncollapsedSize = null;

      this.maxSize = null;
      this.minSize = null;
      this.resizable = true;
      this.element = null;
      this.collapsed = false;
    }

    // Splitbar container
    function SplitbarContainer() {
      this.size = 10;
      this.left = 0;
      this.top = 0;
      this.element = null;
    }

    return {
      Container: function(initialSize) {
        return new BaseContainer(initialSize);
      },
      Splitbar: function() {
        return new SplitbarContainer();
      },
      isSplitbar: function(container) {
        return container instanceof SplitbarContainer;
      }
    };
  })
;

angular.module('eui.loadcontrols', [])

    .controller('LoadcontrolsController', ['$scope', '$attrs','$timeout', '$http', '$info',
        function ($scope, $attrs, $timeout, $http, $info) {
            $scope.isShow = false;//默认不显示容器内容
            $scope.isShowResult = ($scope.showResult == true || $scope.showResult == "true") ? true : false;
            $scope.showResult = false;
            $scope.resultId = ($scope.resultId == undefined) ? "loadcontrolsResult" : $scope.loadcontrols;
            $scope.datasources = "sssssssssssss";

            //判断是否配置服务
            if($scope.serviceName == "" || $scope.serviceName == undefined){
                $scope.isShow = true;
                $scope.showResult = false;
            }else{
                var loadMessage = $info.loading("界面加载中......", "温馨提示");
                var animateFn = function() {

                    var svcRequest = {
                        XT_RY:[
                            {name:'张三',age:'23',sex:'男'}, {name:'李四',age:'29',sex:'男'},
                            {name:'王五',age:'27',sex:'男'}, {name:'老六',age:'30',sex:'男'}
                        ],
                        XT_ZZ:[
                            {id:'12',name:'云南电网',sjid:'1'}, {id:'13',name:'贵州电网',sjid:'1'},
                            {id:'22',name:'昆明供电局',sjid:'12'}, {id:'23',name:'曲靖供电局',sjid:'12'}
                        ]
                    };

                    if($scope.serviceName =="XTZC.RYGL.CXRY1"){
                        $scope.datasources = "调用查询服务：XTZC.RYGL.CXRY，执行成功！";
                    }else if($scope.serviceName =="XTZC.RYGL.CXRY2"){
                        $scope.datasources = "调用查询服务：XTZC.RYGL.CXRY，执行成功！";
                    }else{
                        $scope.datasources = svcRequest;
                    }

                    $scope.isShow = true;
                    if($scope.isShowResult){
                        $scope.showResult = true;
                    }
                    $info.hideMessageBox(loadMessage);
                    $timeout.cancel();

                    $scope.loaddata();
                };
                $timeout(animateFn, 1500);
            }

            ////当timeout被定义时，它返回一个promise对象
            //var timer = $timeout(
            //    function() {
            //        console.log( "Timeout executed11111111111：", Date.now() );
            //    },
            //    2000
            //);
            //
            ////将resolve/reject处理函数绑定到timer promise上以确保我们的cancel方法能正常运行
            //timer.then(
            //    function() {
            //        console.log( "Timer resolved!22222222222222222：", Date.now() );
            //    },
            //    function() {
            //        console.log( "Timer rejected!33333333333：", Date.now() );
            //    }
            //);
            //
            ////当DOM元素从页面中被移除时，AngularJS将会在scope中触发$destory事件。这让我们可以有机会来cancel任何潜在的定时器
            //$scope.$on(
            //    "$destroy",
            //    function( event ) {
            //        $timeout.cancel( timer );
            //    }
            //);
    }])

    .directive('euiLoadcontrols', function () {
        return {
            restrict: 'AE',
            controller: 'LoadcontrolsController',
            templateUrl: 'template/loadcontrols/loadcontrols.html',
            transclude: true,
            replace: true,
            scope: {
                resultId: '@',
                showResult: '@',
                serviceName: '@',
                datasources: '=?',
                loaddata:'&'    //加载数据
            },
            link: function(scope, element, attrs) {

            }
        };
    });
angular.module('eui.menuitem', [])
    .directive('euiMenuitem', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/menus/menuitem.html';
                },
                replace: true,
                transclude: true,
                scope: {
                    iconCls: '@',
                    enabled:'@'
                },
                link: function(scope, element, attrs) {
                    var on_enabled_change = function(){
                        if (scope.enabled === false || scope.enabled === "false"){
                            scope.enabled = false;
                        } else {
                            scope.enabled = true;
                        }

                        if(!scope.enabled){
                            if(!$(element).find(".eui-menuitem-inner").hasClass("eui-menu-disabled")){
                                $(element).find(".eui-menuitem-inner").addClass("eui-menu-disabled");
                            }
                        } else {
                            if($(element).find(".eui-menuitem-inner").hasClass("eui-menu-disabled")){
                                $(element).find(".eui-menuitem-inner").removeClass("eui-menu-disabled");
                            }
                        }
                    };

                    if(attrs.iconCls){
                        $(element).find(".eui-menuitem-icon").addClass(attrs.iconCls);
                    }

                    on_enabled_change();
                    scope.$watch('enabled', on_enabled_change, true);

                    scope.mouseleave = function(){
                        if(!scope.enabled){
                            return;
                        }
                        if ($(element).hasClass("eui-menuitem-hover")){
                            $(element).removeClass("eui-menuitem-hover");
                        }
                    };

                    scope.mouseover = function(){
                        if(!scope.enabled){
                            return;
                        }
                        if (!$(element).hasClass("eui-menuitem-hover")){
                            $(element).addClass("eui-menuitem-hover");
                        }
                    }
                }
            }
        }
    ]);

angular.module('eui.menus', ['eui.menuitem','eui.button'])
    .directive('euiMenus', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/menus/menus.html';
                },
                replace: true,
                transclude: true,
                scope: {
                    iconCls: '@',
                    titleName:'@',
                    plain:'@',
                    enabled:'@'
                },
                link: function(scope, element, attrs) {

                    var on_enabled_change = function(){
                        if (scope.enabled === false || scope.enabled === "false"){
                            scope.enabled = false;
                        } else {
                            scope.enabled = true;
                        }
                    };
                    scope.$watch('enabled', on_enabled_change, true);

                    $(document).bind("click",function(e){
                        if($(element).children().eq(1).css("display") === "block"){
                            $(element).children().eq(1).css("display","none");
                        }
                    });

                    scope.mouseleave = function(){
                        if($(element).children().eq(1).css("display") !== "none"){
                            $(element).children().eq(1).css("display","none");
                        }
                    };

                    scope.mouseover = function($event){
                        if(!scope.enabled){
                            $event.preventDefault();
                            return;
                        }
                        if($(element).children().eq(1).css("display") === "none"){
                            $(element).children().eq(1).css("display","block");
                        }
                    }
                }
            }
        }
    ])
    .directive('euiMenusIcon', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/menus/menusIcon.html';
                },
                replace: true,
                transclude: true,
                scope: {
                    options:'='
                },
                link: function(scope, element, attrs) {
                    var defaultOptions = {
                        imageClass:"mainImage",
                        mesShow:false,
                        mesAmount: 0,
                        menusText:'我的菜单',
                        onClick:function(){}
                    };

                    function init(){
                        if (scope.options && scope.options.mesAmount){
                            scope.options.mesShow = true;
                        } else {
                            scope.options.mesShow = false;
                        }
                    }

                    init();

                    scope.$watch('options', optionsChange, true);

                    scope.options = $.extend(defaultOptions, scope.options);

                    function optionsChange(){
                        init();
                    }
                }
            }
        }
    ]);

/**
 * Created by hongxin on 2015-11-6.
 */
angular.module('eui.messageBox', [])
	.controller('InfoCtrl', ['$scope', '$euiModalInstance', 'items', '$timeout',
		function ($scope, $euiModalInstance, items, $timeout) {
			$scope.message = items.message;
			if (items.type) {
				$scope.type = items.type;
			}

			if (angular.isDefined(items.timeout)) {
				$timeout(function () {
					$euiModalInstance.close({});
				}, parseInt(items.timeout, 10));
			}

			$scope.showFooter = angular.isDefined(items.showFooter) ? items.showFooter : true;
			$scope.showClose = angular.isDefined(items.showClose) ? items.showClose : true;
			$scope.showNo = angular.isDefined(items.showNo) ? items.showNo : false;

			if (angular.isDefined(items.showInput) && items.showInput) {
				$scope.showInput = true;
			}

			$scope.ok = function () {
				var data = {};
				if ($scope.dataInput) {
					data['dataInput'] = $scope.dataInput;
				}
				$euiModalInstance.close(data);
			};
			$scope.no = function () {
				$euiModalInstance.close({no: true});
			};
			$scope.cancel = function () {
				$euiModalInstance.dismiss('cancel');
			};
		}])

	// 显示后台的错误信息
	.factory('$info', ['$euiModal', '$compile', '$rootScope', '$document',
		function ($euiModal, $compile, $rootScope, $document) {
			var siFunc = {
				alert: function (info,cb) {
					//系统提示窗默认宽度
					var sysInfoWidth = "280";
					if (info.width !== undefined) {
						sysInfoWidth = info.width;
					}

					if (info.type == undefined) {
						info.type = 'none';//默认是无图标信息
					}

					if (typeof info == 'string') {
						info = {message: info};
					}
					if (info.title) {
						var title = info.title;
					} else {
						var title = '提醒';
					}

					var modalInstance = $euiModal.open({
						showModal: info.showModal,
						templateUrl: 'template/messageBox/alertContent.html',
						controller: 'InfoCtrl',
						title: title,
						backdropClass:info.backdropClass,
						size: 'width:' + sysInfoWidth + 'px',
						position: info.posX + '-' + info.posY,
						resolve: {
							items: function () {
								return info;
							}
						}
					});

					modalInstance.result.then(function (data) {
						if(cb){
							cb();
						}
						if(data && data.cb){
							data.cb();
						}
					}, function () {
						//$log.info('Modal dismissed at: ' + new Date());
					});

					return modalInstance;
				}
				, confirm: function (info, title, cb) {
					//系统选择窗默认宽度
					var sysConfirmWidth = "280";
					if (info.width !== undefined) {
						sysConfirmWidth = info.width;
					}

					if (typeof info == 'string') {
						info = {message: info};
					}

					if (info.type == undefined) {
						info['type'] = "ask";
					}else{
						info['type'] = "none";
					}

					var modalInstance = $euiModal.open({
						templateUrl: 'template/messageBox/confirmContent.html',
						controller: 'InfoCtrl',
						title: title,
						size: 'width:' + sysConfirmWidth + 'px',
						resolve: {
							items: function () {
								return info;
							}
						}
					});
					modalInstance.result.then(function (item) {
						if (item && item.no) {
							cb('no');
						} else {
							cb('ok', item.dataInput);
						}
					}, function () {
						cb('cancel');
					});
				}
				, confirmYN: function (info, title, cb) {
					var title = info.title;
					var cb = info.callback;
					info['showNo'] = true;
					this.confirm(info, title, cb);
				}
				, prompt: function (info, title, cb) {
					var info = {
						type: 'none',
						showInput: true,
						message: info,
						title: title,
						width: "370"
					};
					this.confirm(info, title, cb);
				}
				, showMessageBox: function (info,cb) {
					info['showFooter'] = false;
					this.alert(info, cb);
				}
				, loading: function (message, title) {
					var info = {
						type: 'loading',
						showFooter: false,
						showClose: false,
						message: message,
						//backdropClass:'messageBoxTest',
						title: title
					};
					return this.alert(info);
				}
				, hideMessageBox: function (info,cb) {
					if(cb){
						info.close({cb:cb});
					} else {
						info.close({});
					}

				}
			};
			return siFunc;
		}]);
angular.module('eui.pagination', [])
    .controller('EuiPaginationController', ['$scope', '$attrs', '$parse', function($scope, $attrs, $parse) {
      var self = this,
          ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
          setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

      this.init = function(ngModelCtrl_, config) {
        ngModelCtrl = ngModelCtrl_;
        this.config = config;

        ngModelCtrl.$render = function() {
          self.render();
        };

        if ($attrs.itemsPerPage) {
          $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
            self.itemsPerPage = parseInt(value, 10);
            $scope.totalPages = self.calculateTotalPages();
          });
        } else {
          this.itemsPerPage = config.itemsPerPage;
        }

        $scope.$watch('totalItems', function() {
          $scope.totalPages = self.calculateTotalPages();
        });

        $scope.$watch('totalPages', function(value) {
          setNumPages($scope.$parent, value); // Readonly variable

          if ( $scope.page > value ) {
            $scope.selectPage(value);
          } else {
            ngModelCtrl.$render();
          }
        });
      };

      this.calculateTotalPages = function() {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
      };

      this.render = function() {
        $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
      };

      $scope.selectPage = function(page, evt) {
        if (evt) {
          evt.preventDefault();
        }

        var clickAllowed = !$scope.ngDisabled || !evt;
        if (clickAllowed && $scope.page !== page && page > 0 && page <= $scope.totalPages) {
          if (evt && evt.target) {
            evt.target.blur();
          }
          ngModelCtrl.$setViewValue(page);
          ngModelCtrl.$render();
        }
      };

      $scope.getText = function(key) {
        return $scope[key + 'Text'] || self.config[key + 'Text'];
      };

      $scope.noPrevious = function() {
        return $scope.page === 1;
      };

      $scope.noNext = function() {
        return $scope.page === $scope.totalPages;
      };
    }])

    .constant('euiPaginationConfig', {
      itemsPerPage: 10,
      boundaryLinks: false,
      directionLinks: true,
      firstText: 'First',
      previousText: 'Previous',
      nextText: 'Next',
      lastText: 'Last',
      rotate: true
    })

    .directive('euiPagination', ['$parse', 'euiPaginationConfig', function($parse, paginationConfig) {
      return {
        restrict: 'EA',
        scope: {
          options:'='
        },
        //require: ['euiPagination', '?ngModel'],
        //controller: 'EuiPaginationController',
        //controllerAs: 'pagination',
        templateUrl: function(element, attrs) {
          return attrs.templateUrl || 'template/pagination/pagination.html';
        },
        replace: true,
        link: function(scope, element, attrs) {
          var options = {};
          defaultsPagination={
            total:1,
            pageSize:10,
            pageNumber:1,
            pageList:[10,20,30,50],
            style:{
              width:"100%"
            },
            //loading:false,
            //buttons:null,
            //showPageList:true,
            //showRefresh:true,
            //links:10,
            //layout:["list","sep","first","prev","sep","manual","sep","next","last","sep","refresh"],
            onSelectPage:function(pageNumber, pageSize){}
          };

          var pageBtn = {
            first:$(element).find("tr").children().eq(2).find("a"),
            prev:$(element).find("tr").children().eq(3).find("a"),
            next:$(element).find("tr").children().eq(-4).find("a"),
            last:$(element).find("tr").children().eq(-3).find("a")
          };

          //scope.pageData = {
          //  pageNumber:1,
          //  totalPage: 19,
          //  fromPage: 31,
          //  toPage: 40,
          //  total: 197
          //};

          function  initPage(){
            options =  $.extend({}, defaultsPagination, options, scope.options);
            scope.options = options;
            var pageList, from, to, totalPage, pageData = {};
            pageList = {
              pageSize:''+options.pageSize,
              list:[]
            };
            for(var i = 0; i < options.pageList.length; i++){
              pageList.list.push({name:''+options.pageList[i]});
            }

            totalPage = Math.ceil(options.total / options.pageSize);
            if(options.pageNumber < 1 || options.pageSize < 1){
              throw "pageNumber或者pageSize数值不能小于1，请输入正确的值";
            }
            if(options.pageNumber > totalPage){
              from = (options.totalPage - 1) * options.pageSize + 1
            } else {
              from = (options.pageNumber - 1) * options.pageSize + 1
            }

            if(options.pageNumber * options.pageSize > options.total){
              to = options.total
            } else {
              to = options.pageNumber * options.pageSize
            }

            pageData = {
              pageNumber:options.pageNumber,
              totalPage: totalPage,
              from: from,
              to: to,
              total: options.total
            };
            scope.pageList = pageList;
            scope.pageData = pageData;
            setPageBtnStyle();

          }

          initPage();
          scope.$watch("options", initPage, true);
          scope.$watch("pageList.pageSize", onSelectChange, true);

          function onSelectChange(){
            scope.options.pageSize = parseInt(scope.pageList.pageSize);
            scope.pageData.pageNumber = 1;
            scope.options.pageNumber = scope.pageData.pageNumber;
            options.onSelectPage(scope.pageData.pageNumber, options.pageSize);
          }
          scope.selectFirstPage = function(){
            if(scope.pageData.pageNumber !== 1){
              scope.pageData.pageNumber = 1;
            }
            if(scope.pageData.total >= 1){
              scope.pageData.from = 1;
            } else {
              scope.pageData.from = 0
            }
            if(scope.pageData.total >= options.pageSize){
              scope.pageData.to = options.pageSize;
            } else {
              scope.pageData.to = scope.pageData.total;
            }
            setPageBtnStyle();
            scope.options.pageNumber = scope.pageData.pageNumber;
            options.onSelectPage(scope.pageData.pageNumber, options.pageSize)
          };

          scope.selectPreviousPage = function(){
            scope.pageData.pageNumber = parseInt(scope.pageData.pageNumber);
            if(scope.pageData.pageNumber > 1){
              scope.pageData.pageNumber -= 1;
              scope.pageData.from -= options.pageSize;
              scope.pageData.to -= options.pageSize;
              setPageBtnStyle();
            } else {
              scope.selectFirstPage();
            }
            scope.options.pageNumber = scope.pageData.pageNumber;
            options.onSelectPage(scope.pageData.pageNumber, options.pageSize)
          };

          scope.selectNextPage = function() {
            var to;
            to = scope.pageData.to + options.pageSize;
            scope.pageData.pageNumber = parseInt(scope.pageData.pageNumber);
            if (scope.pageData.pageNumber < scope.pageData.totalPage){
              scope.pageData.pageNumber += 1;
              scope.pageData.from += options.pageSize;
              if (to > scope.pageData.total){
                scope.pageData.to = scope.pageData.total;
              } else {
                scope.pageData.to = to;
              }
              setPageBtnStyle();
            } else {
              scope.selectLastPage();
            }
            scope.options.pageNumber = scope.pageData.pageNumber;
            options.onSelectPage(scope.pageData.pageNumber, options.pageSize)
          };

          scope.selectLastPage = function () {
            scope.pageData.pageNumber = parseInt(scope.pageData.pageNumber);
            if(scope.pageData.pageNumber !== scope.pageData.totalPage){
              scope.pageData.pageNumber = scope.pageData.totalPage;
              scope.pageData.from = (scope.pageData.totalPage - 1) * options.pageSize + 1;
              scope.pageData.to = scope.pageData.total;
              setPageBtnStyle();
            }
            scope.options.pageNumber = scope.pageData.pageNumber;
            options.onSelectPage(scope.pageData.pageNumber, options.pageSize)
          };

          scope.refresh = function(){
            var to;
            scope.pageData.pageNumber = parseInt(scope.pageData.pageNumber);
            if(scope.pageData.pageNumber < 1 ||  scope.pageData.pageNumber > scope.pageData.totalPage){
              throw "请输入正确的pageNumber值";
            }
            scope.pageData.from = (scope.pageData.pageNumber - 1 ) * options.pageSize + 1;
            to = scope.pageData.pageNumber * options.pageSize;
            if (to > scope.pageData.total){
              scope.pageData.to = scope.pageData.total;
            } else {
              scope.pageData.to = to;
            }
            setPageBtnStyle();
            scope.options.pageNumber = scope.pageData.pageNumber;
            options.onSelectPage(scope.pageData.pageNumber, options.pageSize);
          };

          scope.keydown = function(e){
            if(e && e.keyCode==13){
              scope.refresh();
            }
          };

          function disabledBtn(ele){
            ele.addClass("l-btn-disabled");
          }

          function enabledBtn(ele){
            if(ele.hasClass("l-btn-disabled")){
              ele.removeClass("l-btn-disabled")
            }
          }

          function setPageBtnStyle(){
            enabledBtn(pageBtn.first);
            enabledBtn(pageBtn.prev);
            enabledBtn(pageBtn.next);
            enabledBtn(pageBtn.last);

            if(scope.pageData.pageNumber === 1){
              disabledBtn(pageBtn.first);
              disabledBtn(pageBtn.prev);
            }

            if(scope.pageData.pageNumber === scope.pageData.totalPage){
              disabledBtn(pageBtn.next);
              disabledBtn(pageBtn.last);
            }
          }
        }
      };
    }])

    .constant('euiPagerConfig', {
      itemsPerPage: 10,
      previousText: '« Previous',
      nextText: 'Next »',
      align: true
    })

    .directive('euiPager', ['euiPagerConfig', function(pagerConfig) {
      return {
        restrict: 'EA',
        scope: {
          totalItems: '=',
          previousText: '@',
          nextText: '@',
          ngDisabled: '='
        },
        require: ['euiPager', '?ngModel'],
        controller: 'EuiPaginationController',
        controllerAs: 'pagination',
        templateUrl: function(element, attrs) {
          return attrs.templateUrl || 'template/pagination/pager.html';
        },
        replace: true,
        link: function(scope, element, attrs, ctrls) {
          var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

          if (!ngModelCtrl) {
            return; // do nothing if no ng-model
          }

          scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
          paginationCtrl.init(ngModelCtrl, pagerConfig);
        }
      };
    }]);

angular.module('eui.panel', [])
    .directive('euiPanel', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                templateUrl: function(element, attrs) {
                    return attrs.templateUrl || 'template/panel/panel.html';
                },
                replace: true,
                transclude: true,
                scope: {
                    panelTitle: '@',
                    panelFoot: '@',
                    iconCls: '@',
                    //width: '@',
                    //height: '@',
                    openPanel:"&",
                    closePanel:"&",
                    onbuttonclick: '='
                },
                compile: function(element, attrs, transcludeFn){
                    return function link(scope, element, attrs) {
                        scope.width = attrs.width? attrs.width:"700px";
                        scope.height = attrs.height? attrs.height:"250px";
                        scope.overflow = attrs.overflow? attrs.overflow:"auto";

                        element.find('.eui-panel-body').append(transcludeFn(scope.$parent));

                        /*操作图标控制*/
                        var buttonsArray = [], icon, iconArray;
                        iconArray = ["collapse","max","add","edit","close","remove","apart"];
                        icon = {
                            "collapse":false,
                            "max":false,
                            "add":false,
                            "edit":false,
                            "close":false,
                            "remove":false,
                            "apart":false
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
                        if(scope.iconCls){
                            $(element).find(".eui-panel-title").children().eq(0).addClass("eui-panel-button-icon").addClass(scope.iconCls);
                        }

                        /*展开与缩放*/
                        scope.collapsePanel = function(){
                            if($(element).children().eq(1).css("display") === "block"){
                                $(element).children().eq(1).css("display","none");
                                $(element).find(".eui-tools-collapse").addClass("eui-tools-expand").removeClass("eui-tools-collapse");

                                $(element).find(".eui-tools-expand")[0].title = "展开";
                            } else {
                                $(element).children().eq(1).css("display","block");
                                $(element).find(".eui-tools-expand").addClass("eui-tools-collapse").removeClass("eui-tools-expand");

                                $(element).find(".eui-tools-collapse")[0].title = "缩小";
                            }
                        };

                        /*最大化、恢复*/
                        scope.changeSizePanel = function(){
                            if($(element).find(".eui-tools-max").length>0){
                                $(element).find(".eui-tools-max").addClass("eui-tools-restore").removeClass("eui-tools-max");

                                $(".eui-panel").css("width","100%");
                                var maxHeight = $(element)[0].parentElement.parentElement.offsetHeight - 80;
                                $(".eui-panel-body").css("height",maxHeight+"px");

                                $(element).find(".eui-tools-restore")[0].title = "恢复";
                            } else {
                                $(element).find(".eui-tools-restore").addClass("eui-tools-max").removeClass("eui-tools-restore");

                                $(".eui-panel").css("width", scope.width);
                                $(".eui-panel-body").css("height", scope.height);

                                $(element).find(".eui-tools-max")[0].title = "最大化";
                            }
                        };

                        scope.openPanel = function(){
                            $(element).css("display","block");
                        };
                        scope.closePanel = function(){
                            $(element).css("display","none");
                        }

                        if(attrs.panelFoot){
                            $(".eui-panel-footer").css("padding","5px 0 5px 10px");
                        }
                    }
                }



            }
        }
    ])

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module('eui.tooltip', ['eui.position', 'eui.stackedMap'])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider('$euiTooltip', function() {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    animation: true,
    popupDelay: 0,
    popupCloseDelay: 0,
    useContentExp: false
  };

  // Default hide triggers for each show trigger
  var triggerMap = {
    'mouseenter': 'mouseleave',
    'click': 'click',
    'focus': 'blur',
    'none': ''
  };

  // The options specified to the provider globally.
  var globalOptions = {};

  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['eui.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
	this.options = function(value) {
		angular.extend(globalOptions, value);
	};

  /**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
   */
  this.setTriggers = function setTriggers(triggers) {
    angular.extend(triggerMap, triggers);
  };

  /**
   * This is a helper function for translating camel-case to snake-case.
   */
  function snake_case(name) {
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  /**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = ['$window', '$compile', '$timeout', '$document', '$euiPosition', '$interpolate', '$rootScope', '$parse', '$$stackedMap', function($window, $compile, $timeout, $document, $position, $interpolate, $rootScope, $parse, $$stackedMap) {
    var openedTooltips = $$stackedMap.createNew();
    $document.on('keypress', function(e) {
      if (e.which === 27) {
        var last = openedTooltips.top();
        if (last) {
          last.value.close();
          openedTooltips.removeTop();
          last = null;
        }
      }
    });

    return function $tooltip(ttType, prefix, defaultTriggerShow, options) {
      options = angular.extend({}, defaultOptions, globalOptions, options);

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      function getTriggers(trigger) {
        var show = (trigger || options.trigger || defaultTriggerShow).split(' ');
        var hide = show.map(function(trigger) {
          return triggerMap[trigger] || trigger;
        });
        return {
          show: show,
          hide: hide
        };
      }

      var directiveName = snake_case(ttType);

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      var template =
        '<div '+ directiveName + '-popup '+
          'title="' + startSym + 'title' + endSym + '" '+
          (options.useContentExp ?
            'content-exp="contentExp()" ' :
            'content="' + startSym + 'content' + endSym + '" ') +
          'placement="' + startSym + 'placement' + endSym + '" '+
          'popup-class="' + startSym + 'popupClass' + endSym + '" '+
          'animation="animation" ' +
          'is-open="isOpen"' +
          'origin-scope="origScope" ' +
          'style="visibility: hidden; display: block; top: -9999px; left: -9999px;"' +
          '>' +
        '</div>';

      return {
        compile: function(tElem, tAttrs) {
          var tooltipLinker = $compile(template);

          return function link(scope, element, attrs, tooltipCtrl) {
            var tooltip;
            var tooltipLinkedScope;
            var transitionTimeout;
            var showTimeout;
            var hideTimeout;
            var positionTimeout;
            var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
            var triggers = getTriggers(undefined);
            var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);
            var ttScope = scope.$new(true);
            var repositionScheduled = false;
            var isOpenParse = angular.isDefined(attrs[prefix + 'IsOpen']) ? $parse(attrs[prefix + 'IsOpen']) : false;
            var contentParse = options.useContentExp ? $parse(attrs[ttType]) : false;
            var observers = [];

            var positionTooltip = function() {
              // check if tooltip exists and is not empty
              if (!tooltip || !tooltip.html()) { return; }

              if (!positionTimeout) {
                positionTimeout = $timeout(function() {
                  // Reset the positioning.
                  tooltip.css({ top: 0, left: 0 });

                  // Now set the calculated positioning.
                  var ttCss = $position.positionElements(element, tooltip, ttScope.placement, appendToBody);
                  ttCss.top += 'px';
                  ttCss.left += 'px';
                  ttCss.visibility = 'visible';
                  tooltip.css(ttCss);

                  positionTimeout = null;
                }, 0, false);
              }
            };

            // Set up the correct scope to allow transclusion later
            ttScope.origScope = scope;

            // By default, the tooltip is not open.
            // TODO add ability to start tooltip opened
            ttScope.isOpen = false;
            openedTooltips.add(ttScope, {
              close: hide
            });

            function toggleTooltipBind() {
              if (!ttScope.isOpen) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }

            // Show the tooltip with delay if specified, otherwise show it immediately
            function showTooltipBind() {
              if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                return;
              }

              cancelHide();
              prepareTooltip();

              if (ttScope.popupDelay) {
                // Do nothing if the tooltip was already scheduled to pop-up.
                // This happens if show is triggered multiple times before any hide is triggered.
                if (!showTimeout) {
                  showTimeout = $timeout(show, ttScope.popupDelay, false);
                }
              } else {
                show();
              }
            }

            function hideTooltipBind() {
              cancelShow();

              if (ttScope.popupCloseDelay) {
                if (!hideTimeout) {
                  hideTimeout = $timeout(hide, ttScope.popupCloseDelay, false);
                }
              } else {
                hide();
              }
            }

            // Show the tooltip popup element.
            function show() {
              cancelShow();
              cancelHide();

              // Don't show empty tooltips.
              if (!ttScope.content) {
                return angular.noop;
              }

              createTooltip();

              // And show the tooltip.
              ttScope.$evalAsync(function() {
                ttScope.isOpen = true;
                assignIsOpen(true);
                positionTooltip();
              });
            }

            function cancelShow() {
              if (showTimeout) {
                $timeout.cancel(showTimeout);
                showTimeout = null;
              }

              if (positionTimeout) {
                $timeout.cancel(positionTimeout);
                positionTimeout = null;
              }
            }

            // Hide the tooltip popup element.
            function hide() {
              cancelShow();
              cancelHide();

              if (!ttScope) {
                return;
              }

              // First things first: we don't show it anymore.
              ttScope.$evalAsync(function() {
                ttScope.isOpen = false;
                assignIsOpen(false);
                // And now we remove it from the DOM. However, if we have animation, we
                // need to wait for it to expire beforehand.
                // FIXME: this is a placeholder for a port of the transitions library.
                // The fade transition in TWBS is 150ms.
                if (ttScope.animation) {
                  if (!transitionTimeout) {
                    transitionTimeout = $timeout(removeTooltip, 150, false);
                  }
                } else {
                  removeTooltip();
                }
              });
            }

            function cancelHide() {
              if (hideTimeout) {
                $timeout.cancel(hideTimeout);
                hideTimeout = null;
              }
              if (transitionTimeout) {
                $timeout.cancel(transitionTimeout);
                transitionTimeout = null;
              }
            }

            function createTooltip() {
              // There can only be one tooltip element per directive shown at once.
              if (tooltip) {
                return;
              }

              tooltipLinkedScope = ttScope.$new();
              tooltip = tooltipLinker(tooltipLinkedScope, function(tooltip) {
                if (appendToBody) {
                  $document.find('body').append(tooltip);
                } else {
                  element.after(tooltip);
                }
              });

              prepObservers();
            }

            function removeTooltip() {
              unregisterObservers();

              transitionTimeout = null;
              if (tooltip) {
                tooltip.remove();
                tooltip = null;
              }
              if (tooltipLinkedScope) {
                tooltipLinkedScope.$destroy();
                tooltipLinkedScope = null;
              }
            }

            /**
             * Set the inital scope values. Once
             * the tooltip is created, the observers
             * will be added to keep things in synch.
             */
            function prepareTooltip() {
              ttScope.title = attrs[prefix + 'Title'];
              if (contentParse) {
                ttScope.content = contentParse(scope);
              } else {
                ttScope.content = attrs[ttType];
              }

              ttScope.popupClass = attrs[prefix + 'Class'];
              ttScope.placement = angular.isDefined(attrs[prefix + 'Placement']) ? attrs[prefix + 'Placement'] : options.placement;

              var delay = parseInt(attrs[prefix + 'PopupDelay'], 10);
              var closeDelay = parseInt(attrs[prefix + 'PopupCloseDelay'], 10);
              ttScope.popupDelay = !isNaN(delay) ? delay : options.popupDelay;
              ttScope.popupCloseDelay = !isNaN(closeDelay) ? closeDelay : options.popupCloseDelay;
            }

            function assignIsOpen(isOpen) {
              if (isOpenParse && angular.isFunction(isOpenParse.assign)) {
                isOpenParse.assign(scope, isOpen);
              }
            }

            ttScope.contentExp = function() {
              return ttScope.content;
            };

            /**
             * Observe the relevant attributes.
             */
            attrs.$observe('disabled', function(val) {
              if (val) {
                cancelShow();
              }

              if (val && ttScope.isOpen) {
                hide();
              }
            });

            if (isOpenParse) {
              scope.$watch(isOpenParse, function(val) {
                /*jshint -W018 */
                if (!val === ttScope.isOpen) {
                  toggleTooltipBind();
                }
                /*jshint +W018 */
              });
            }

            function prepObservers() {
              observers.length = 0;

              if (contentParse) {
                observers.push(
                  scope.$watch(contentParse, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    }
                  })
                );

                observers.push(
                  tooltipLinkedScope.$watch(function() {
                    if (!repositionScheduled) {
                      repositionScheduled = true;
                      tooltipLinkedScope.$$postDigest(function() {
                        repositionScheduled = false;
                        if (ttScope && ttScope.isOpen) {
                          positionTooltip();
                        }
                      });
                    }
                  })
                );
              } else {
                observers.push(
                  attrs.$observe(ttType, function(val) {
                    ttScope.content = val;
                    if (!val && ttScope.isOpen) {
                      hide();
                    } else {
                      positionTooltip();
                    }
                  })
                );
              }

              observers.push(
                attrs.$observe(prefix + 'Title', function(val) {
                  ttScope.title = val;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );

              observers.push(
                attrs.$observe(prefix + 'Placement', function(val) {
                  ttScope.placement = val ? val : options.placement;
                  if (ttScope.isOpen) {
                    positionTooltip();
                  }
                })
              );
            }

            function unregisterObservers() {
              if (observers.length) {
                angular.forEach(observers, function(observer) {
                  observer();
                });
                observers.length = 0;
              }
            }

            var unregisterTriggers = function() {
              triggers.show.forEach(function(trigger) {
                element.unbind(trigger, showTooltipBind);
              });
              triggers.hide.forEach(function(trigger) {
                trigger.split(' ').forEach(function(hideTrigger) {
                  element[0].removeEventListener(hideTrigger, hideTooltipBind);
                });
              });
            };

            function prepTriggers() {
              var val = attrs[prefix + 'Trigger'];
              unregisterTriggers();

              triggers = getTriggers(val);

              if (triggers.show !== 'none') {
                triggers.show.forEach(function(trigger, idx) {
                  // Using raw addEventListener due to jqLite/jQuery bug - #4060
                  if (trigger === triggers.hide[idx]) {
                    element[0].addEventListener(trigger, toggleTooltipBind);
                  } else if (trigger) {
                    element[0].addEventListener(trigger, showTooltipBind);
                    triggers.hide[idx].split(' ').forEach(function(trigger) {
                      element[0].addEventListener(trigger, hideTooltipBind);
                    });
                  }

                  element.on('keypress', function(e) {
                    if (e.which === 27) {
                      hideTooltipBind();
                    }
                  });
                });
              }
            }

            prepTriggers();

            var animation = scope.$eval(attrs[prefix + 'Animation']);
            ttScope.animation = angular.isDefined(animation) ? !!animation : options.animation;

            var appendToBodyVal = scope.$eval(attrs[prefix + 'AppendToBody']);
            appendToBody = angular.isDefined(appendToBodyVal) ? appendToBodyVal : appendToBody;

            // if a tooltip is attached to <body> we need to remove it on
            // location change as its parent scope will probably not be destroyed
            // by the change.
            if (appendToBody) {
              scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess() {
                if (ttScope.isOpen) {
                  hide();
                }
              });
            }

            // Make sure tooltip is destroyed and removed.
            scope.$on('$destroy', function onDestroyTooltip() {
              cancelShow();
              cancelHide();
              unregisterTriggers();
              removeTooltip();
              openedTooltips.remove(ttScope);
              ttScope = null;
            });
          };
        }
      };
    };
  }];
})

// This is mostly ngInclude code but with a custom scope
.directive('euiTooltipTemplateTransclude', [
         '$animate', '$sce', '$compile', '$templateRequest',
function ($animate ,  $sce ,  $compile ,  $templateRequest) {
  return {
    link: function(scope, elem, attrs) {
      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      var changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      var cleanupLastIncludeContent = function() {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }

        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }

        if (currentElement) {
          $animate.leave(currentElement).then(function() {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.euiTooltipTemplateTransclude), function(src) {
        var thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function(response) {
            if (thisChangeId !== changeCounter) { return; }
            var newScope = origScope.$new();
            var template = response;

            var clone = $compile(template)(newScope, function(clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function() {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    }
  };
}])

/**
 * Note that it's intentional that these classes are *not* applied through $animate.
 * They must not be animated as they're expected to be present on the tooltip on
 * initialization.
 */
.directive('euiTooltipClasses', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (scope.placement) {
        element.addClass(scope.placement);
      }

      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }

      if (scope.animation()) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    }
  };
})

.directive('euiTooltipPopup', function() {
  return {
    replace: true,
    scope: { content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-popup.html',
    link: function(scope, element) {
      element.addClass('tooltip');
    }
  };
})

.directive('euiTooltip', [ '$euiTooltip', function($euiTooltip) {
  return $euiTooltip('euiTooltip', 'tooltip', 'mouseenter');
}])

.directive('euiTooltipTemplatePopup', function() {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/tooltip/tooltip-template-popup.html',
    link: function(scope, element) {
      element.addClass('tooltip');
    }
  };
})

.directive('euiTooltipTemplate', ['$euiTooltip', function($euiTooltip) {
  return $euiTooltip('euiTooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

.directive('euiTooltipHtmlPopup', function() {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-popup.html',
    link: function(scope, element) {
      element.addClass('tooltip');
    }
  };
})

.directive('euiTooltipHtml', ['$euiTooltip', function($euiTooltip) {
  return $euiTooltip('euiTooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}]);

/* Deprecated tooltip below */

angular.module('eui.tooltip')

.value('$tooltipSuppressWarning', false)

.provider('$tooltip', ['$euiTooltipProvider', function($euiTooltipProvider) {
  angular.extend(this, $euiTooltipProvider);

  this.$get = ['$log', '$tooltipSuppressWarning', '$injector', function($log, $tooltipSuppressWarning, $injector) {
    if (!$tooltipSuppressWarning) {
      $log.warn('$tooltip is now deprecated. Use $euiTooltip instead.');
    }

    return $injector.invoke($euiTooltipProvider.$get);
  }];
}])

// This is mostly ngInclude code but with a custom scope
.directive('tooltipTemplateTransclude', [
         '$animate', '$sce', '$compile', '$templateRequest', '$log', '$tooltipSuppressWarning',
function ($animate ,  $sce ,  $compile ,  $templateRequest,   $log,   $tooltipSuppressWarning) {
  return {
    link: function(scope, elem, attrs) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-template-transclude is now deprecated. Use eui-tooltip-template-transclude instead.');
      }

      var origScope = scope.$eval(attrs.tooltipTemplateTranscludeScope);

      var changeCounter = 0,
        currentScope,
        previousElement,
        currentElement;

      var cleanupLastIncludeContent = function() {
        if (previousElement) {
          previousElement.remove();
          previousElement = null;
        }
        if (currentScope) {
          currentScope.$destroy();
          currentScope = null;
        }
        if (currentElement) {
          $animate.leave(currentElement).then(function() {
            previousElement = null;
          });
          previousElement = currentElement;
          currentElement = null;
        }
      };

      scope.$watch($sce.parseAsResourceUrl(attrs.tooltipTemplateTransclude), function(src) {
        var thisChangeId = ++changeCounter;

        if (src) {
          //set the 2nd param to true to ignore the template request error so that the inner
          //contents and scope can be cleaned up.
          $templateRequest(src, true).then(function(response) {
            if (thisChangeId !== changeCounter) { return; }
            var newScope = origScope.$new();
            var template = response;

            var clone = $compile(template)(newScope, function(clone) {
              cleanupLastIncludeContent();
              $animate.enter(clone, elem);
            });

            currentScope = newScope;
            currentElement = clone;

            currentScope.$emit('$includeContentLoaded', src);
          }, function() {
            if (thisChangeId === changeCounter) {
              cleanupLastIncludeContent();
              scope.$emit('$includeContentError', src);
            }
          });
          scope.$emit('$includeContentRequested', src);
        } else {
          cleanupLastIncludeContent();
        }
      });

      scope.$on('$destroy', cleanupLastIncludeContent);
    }
  };
}])

.directive('tooltipClasses', ['$log', '$tooltipSuppressWarning', function($log, $tooltipSuppressWarning) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-classes is now deprecated. Use eui-tooltip-classes instead.');
      }

      if (scope.placement) {
        element.addClass(scope.placement);
      }
      if (scope.popupClass) {
        element.addClass(scope.popupClass);
      }
      if (scope.animation()) {
        element.addClass(attrs.tooltipAnimationClass);
      }
    }
  };
}])

.directive('tooltipPopup', ['$log', '$tooltipSuppressWarning', function($log, $tooltipSuppressWarning) {
  return {
    replace: true,
    scope: { content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-popup.html',
    link: function(scope, element) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-popup is now deprecated. Use eui-tooltip-popup instead.');
      }

      element.addClass('tooltip');
    }
  };
}])

.directive('tooltip', ['$tooltip', function($tooltip) {
  return $tooltip('tooltip', 'tooltip', 'mouseenter');
}])

.directive('tooltipTemplatePopup', ['$log', '$tooltipSuppressWarning', function($log, $tooltipSuppressWarning) {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/tooltip/tooltip-template-popup.html',
    link: function(scope, element) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-template-popup is now deprecated. Use eui-tooltip-template-popup instead.');
      }

      element.addClass('tooltip');
    }
  };
}])

.directive('tooltipTemplate', ['$tooltip', function($tooltip) {
  return $tooltip('tooltipTemplate', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}])

.directive('tooltipHtmlPopup', ['$log', '$tooltipSuppressWarning', function($log, $tooltipSuppressWarning) {
  return {
    replace: true,
    scope: { contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-popup.html',
    link: function(scope, element) {
      if (!$tooltipSuppressWarning) {
        $log.warn('tooltip-html-popup is now deprecated. Use eui-tooltip-html-popup instead.');
      }

      element.addClass('tooltip');
    }
  };
}])

.directive('tooltipHtml', ['$tooltip', function($tooltip) {
  return $tooltip('tooltipHtml', 'tooltip', 'mouseenter', {
    useContentExp: true
  });
}]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, and selector delegatation.
 */
angular.module('eui.popover', ['eui.tooltip'])

.directive('euiPopoverTemplatePopup', function() {
  return {
    replace: true,
    scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/popover/popover-template.html',
    link: function(scope, element) {
      element.addClass('popover');
    }
  };
})

.directive('euiPopoverTemplate', ['$euiTooltip', function($euiTooltip) {
  return $euiTooltip('euiPopoverTemplate', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('euiPopoverHtmlPopup', function() {
  return {
    replace: true,
    scope: { contentExp: '&', title: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover-html.html',
    link: function(scope, element) {
      element.addClass('popover');
    }
  };
})

.directive('euiPopoverHtml', ['$euiTooltip', function($euiTooltip) {
  return $euiTooltip('euiPopoverHtml', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('euiPopoverPopup', function() {
  return {
    replace: true,
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html',
    link: function(scope, element) {
      element.addClass('popover');
    }
  };
})

.directive('euiPopover', ['$euiTooltip', function($euiTooltip) {
  return $euiTooltip('euiPopover', 'popover', 'click');
}]);

/* Deprecated popover below */

angular.module('eui.popover')

.value('$popoverSuppressWarning', false)

.directive('popoverTemplatePopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&',
      originScope: '&' },
    templateUrl: 'template/popover/popover-template.html',
    link: function(scope, element) {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-template-popup is now deprecated. Use eui-popover-template-popup instead.');
      }

      element.addClass('popover');
    }
  };
}])

.directive('popoverTemplate', ['$tooltip', function($tooltip) {
  return $tooltip('popoverTemplate', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('popoverHtmlPopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { contentExp: '&', title: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover-html.html',
    link: function(scope, element) {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-html-popup is now deprecated. Use eui-popover-html-popup instead.');
      }

      element.addClass('popover');
    }
  };
}])

.directive('popoverHtml', ['$tooltip', function($tooltip) {
  return $tooltip('popoverHtml', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('popoverPopup', ['$log', '$popoverSuppressWarning', function($log, $popoverSuppressWarning) {
  return {
    replace: true,
    scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html',
    link: function(scope, element) {
      if (!$popoverSuppressWarning) {
        $log.warn('popover-popup is now deprecated. Use eui-popover-popup instead.');
      }

      element.addClass('popover');
    }
  };
}])

.directive('popover', ['$tooltip', function($tooltip) {

  return $tooltip('popover', 'popover', 'click');
}]);

angular.module('eui.progressbar', [])

.constant('euiProgressConfig', {
  animate: true,
  max: 100
})

.controller('EuiProgressController', ['$scope', '$attrs', 'euiProgressConfig', function($scope, $attrs, progressConfig) {
  var self = this,
      animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

  this.bars = [];
  $scope.max = angular.isDefined($scope.max) ? $scope.max : progressConfig.max;

  this.addBar = function(bar, element, attrs) {
    if (!animate) {
      element.css({'transition': 'none'});
    }

    this.bars.push(bar);

    bar.max = $scope.max;
    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

    bar.$watch('value', function(value) {
      bar.recalculatePercentage();
    });

    bar.recalculatePercentage = function() {
      var totalPercentage = self.bars.reduce(function(total, bar) {
        bar.percent = +(100 * bar.value / bar.max).toFixed(2);
        return total + bar.percent;
      }, 0);

      if (totalPercentage > 100) {
        bar.percent -= totalPercentage - 100;
      }
    };

    bar.$on('$destroy', function() {
      element = null;
      self.removeBar(bar);
    });
  };

  this.removeBar = function(bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
    this.bars.forEach(function (bar) {
      bar.recalculatePercentage();
    });
  };

  $scope.$watch('max', function(max) {
    self.bars.forEach(function(bar) {
      bar.max = $scope.max;
      bar.recalculatePercentage();
    });
  });
}])

.directive('euiProgress', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'EuiProgressController',
    require: 'euiProgress',
    scope: {
      max: '=?'
    },
    templateUrl: 'template/progressbar/progress.html'
  };
})

.directive('euiBar', function() {
  return {
    replace: true,
    transclude: true,
    require: '^euiProgress',
    scope: {
      value: '=',
      type: '@'
    },
    templateUrl: 'template/progressbar/bar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, element, attrs);
    }
  };
})

.directive('euiProgressbar', function() {
  return {
    replace: true,
    transclude: true,
    controller: 'EuiProgressController',
    scope: {
      value: '=',
      max: '=?',
      type: '@'
    },
    templateUrl: 'template/progressbar/progressbar.html',
    link: function(scope, element, attrs, progressCtrl) {
      progressCtrl.addBar(scope, angular.element(element.children()[0]), {title: attrs.title});
    }
  };
});

/* Deprecated progressbar below */

angular.module('eui.progressbar')

.value('$progressSuppressWarning', false)

.controller('ProgressController', ['$scope', '$attrs', 'euiProgressConfig', '$log', '$progressSuppressWarning', function($scope, $attrs, progressConfig, $log, $progressSuppressWarning) {
  if (!$progressSuppressWarning) {
    $log.warn('ProgressController is now deprecated. Use EuiProgressController instead.');
  }

  var self = this,
    animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

  this.bars = [];
  $scope.max = angular.isDefined($scope.max) ? $scope.max : progressConfig.max;

  this.addBar = function(bar, element, attrs) {
    if (!animate) {
      element.css({'transition': 'none'});
    }

    this.bars.push(bar);

    bar.max = $scope.max;
    bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

    bar.$watch('value', function(value) {
      bar.recalculatePercentage();
    });

    bar.recalculatePercentage = function() {
      bar.percent = +(100 * bar.value / bar.max).toFixed(2);

      var totalPercentage = self.bars.reduce(function(total, bar) {
        return total + bar.percent;
      }, 0);

      if (totalPercentage > 100) {
        bar.percent -= totalPercentage - 100;
      }
    };

    bar.$on('$destroy', function() {
      element = null;
      self.removeBar(bar);
    });
  };

  this.removeBar = function(bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
  };

  $scope.$watch('max', function(max) {
    self.bars.forEach(function(bar) {
      bar.max = $scope.max;
      bar.recalculatePercentage();
    });
  });
}])

.directive('progress', ['$log', '$progressSuppressWarning', function($log, $progressSuppressWarning) {
  return {
    replace: true,
    transclude: true,
    controller: 'ProgressController',
    require: 'progress',
    scope: {
      max: '=?',
      title: '@?'
    },
    templateUrl: 'template/progressbar/progress.html',
    link: function() {
      if (!$progressSuppressWarning) {
        $log.warn('progress is now deprecated. Use eui-progress instead.');
      }
    }
  };
}])

.directive('bar', ['$log', '$progressSuppressWarning', function($log, $progressSuppressWarning) {
  return {
    replace: true,
    transclude: true,
    require: '^progress',
    scope: {
      value: '=',
      type: '@'
    },
    templateUrl: 'template/progressbar/bar.html',
    link: function(scope, element, attrs, progressCtrl) {
      if (!$progressSuppressWarning) {
        $log.warn('bar is now deprecated. Use eui-bar instead.');
      }
      progressCtrl.addBar(scope, element);
    }
  };
}])

.directive('progressbar', ['$log', '$progressSuppressWarning', function($log, $progressSuppressWarning) {
  return {
    replace: true,
    transclude: true,
    controller: 'ProgressController',
    scope: {
      value: '=',
      max: '=?',
      type: '@'
    },
    templateUrl: 'template/progressbar/progressbar.html',
    link: function(scope, element, attrs, progressCtrl) {
      if (!$progressSuppressWarning) {
        $log.warn('progressbar is now deprecated. Use eui-progressbar instead.');
      }
      progressCtrl.addBar(scope, angular.element(element.children()[0]), {title: attrs.title});
    }
  };
}]);

angular.module('eui.radio', [])
	.directive('euiRadio', [
		'$timeout', function($timeout) {
			return {
				restrict: 'E',
				templateUrl: function (element, attrs) {
					return attrs.templateUrl || 'template/radio/radio.html';
				},
				replace: true,
				scope: {
					radioData:'=',
					checkedData: '=',
					width:'@',
					height:'@'
				},
				link: function(scope, element, attrs) {
					var width,height,labelPosition,index,data=[];
					var labelPositionVal = ["left","right"];

					width = scope.width? scope.width:"170px";
					height = scope.height? scope.height:"100px";
					labelPosition = attrs.labelPosition? attrs.labelPosition:"right";
					if(labelPositionVal.indexOf(labelPosition) === "-1"){
						labelPosition = "right";
					}

					/*设置样式*/
					scope.styletype = "eui-radio";
					if(labelPosition == "right"){
						scope.styletype = "eui-radio-r";
					}

					/*生成UUID*/
					function getUuid(){
						var len=32;//32长度
						var radix=16;//16进制
						var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
						var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
						return uuid.join('');
					}

					var uuId=getUuid();
					scope.rdName = uuId;
					var model = "";

					for (var i = 0; i < scope.radioData.length; i++)
					{
						var uuId=getUuid();
						var item = {uuid:uuId, rlabel:'', llabel:'', label:'', value:'', disabled:'', checked:'', model:'', show:true};

						if (labelPosition === "right") {
							item.rlabel = scope.radioData[i].label;
						} else {
							item.llabel = scope.radioData[i].label;
						}

						item.label = scope.radioData[i].label;
						item.value = scope.radioData[i].value;
						item.disabled = scope.radioData[i].disabled;
						item.checked = scope.radioData[i].checked ? scope.radioData[i].checked : false;

						if(scope.radioData[i].show == "false" || scope.radioData[i].show == false){
							item.show = false;
						}

						if(scope.radioData[i].checked == "true" || scope.radioData[i].checked == true){
							item.model = scope.radioData[i].value;
						}

						data.push(item);
					}

					scope.rdModel = model;

					scope.data = data;
					scope.radioStyle = {
						"width":width,
						"height":height
					};

					scope.onChangeRow = function () {
						scope.checkedData = [this.row];
					}

					var on_data_change = function () {
						scope.checkedData = [];
						for (var i = 0; i < data.length; i++) {
							if (data[i].checked) {
								scope.checkedData.push(data[i]);
							}
						}
					};
					scope.$watch('scope.data', on_data_change, true);

					//function changedValue(value){
					//    console.log(scope.checkedValue);
					//}

					//console(scope[scope.radioData.name]);

					//scope.$watch(scope.checkedValue, changedValue, true);

				}
			}
		}
	]);

//});

angular.module('eui.rating', [])

.constant('euiRatingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null,
  titles : ['one', 'two', 'three', 'four', 'five']
})

.controller('EuiRatingController', ['$scope', '$attrs', 'euiRatingConfig', function($scope, $attrs, ratingConfig) {
  var ngModelCtrl  = { $setViewValue: angular.noop };

  this.init = function(ngModelCtrl_) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.push(function(value) {
      if (angular.isNumber(value) && value << 0 !== value) {
        value = Math.round(value);
      }
      return value;
    });

    this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
    this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
    var tmpTitles = angular.isDefined($attrs.titles)  ? $scope.$parent.$eval($attrs.titles) : ratingConfig.titles ;
    this.titles = angular.isArray(tmpTitles) && tmpTitles.length > 0 ?
      tmpTitles : ratingConfig.titles;

    var ratingStates = angular.isDefined($attrs.ratingStates) ?
      $scope.$parent.$eval($attrs.ratingStates) :
      new Array(angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max);
    $scope.range = this.buildTemplateObjects(ratingStates);
  };

  this.buildTemplateObjects = function(states) {
    for (var i = 0, n = states.length; i < n; i++) {
      states[i] = angular.extend({ index: i }, { stateOn: this.stateOn, stateOff: this.stateOff, title: this.getTitle(i) }, states[i]);
    }
    return states;
  };

  this.getTitle = function(index) {
    if (index >= this.titles.length) {
      return index + 1;
    } else {
      return this.titles[index];
    }
  };

  $scope.rate = function(value) {
    if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
      ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue === value ? 0 : value);
      ngModelCtrl.$render();
    }
  };

  $scope.enter = function(value) {
    if (!$scope.readonly) {
      $scope.value = value;
    }
    $scope.onHover({value: value});
  };

  $scope.reset = function() {
    $scope.value = ngModelCtrl.$viewValue;
    $scope.onLeave();
  };

  $scope.onKeydown = function(evt) {
    if (/(37|38|39|40)/.test(evt.which)) {
      evt.preventDefault();
      evt.stopPropagation();
      $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? 1 : -1));
    }
  };

  this.render = function() {
    $scope.value = ngModelCtrl.$viewValue;
  };
}])

.directive('euiRating', function() {
  return {
    require: ['euiRating', 'ngModel'],
    scope: {
      readonly: '=?',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'EuiRatingController',
    templateUrl: 'template/rating/rating.html',
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      ratingCtrl.init(ngModelCtrl);
    }
  };
});

/* Deprecated rating below */

angular.module('eui.rating')

.value('$ratingSuppressWarning', false)

.controller('RatingController', ['$scope', '$attrs', '$controller', '$log', '$ratingSuppressWarning', function($scope, $attrs, $controller, $log, $ratingSuppressWarning) {
  if (!$ratingSuppressWarning) {
    $log.warn('RatingController is now deprecated. Use EuiRatingController instead.');
  }

  angular.extend(this, $controller('EuiRatingController', {
    $scope: $scope,
    $attrs: $attrs
  }));
}])

.directive('rating', ['$log', '$ratingSuppressWarning', function($log, $ratingSuppressWarning) {
  return {
    require: ['rating', 'ngModel'],
    scope: {
      readonly: '=?',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'RatingController',
    templateUrl: 'template/rating/rating.html',
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      if (!$ratingSuppressWarning) {
        $log.warn('rating is now deprecated. Use eui-rating instead.');
      }
      var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];
      ratingCtrl.init(ngModelCtrl);
    }
  };
}]);

/**
 * 描述：右击菜单，支持自定义，动态，静态html
 * 时间；2016年11月9日14:18:06
 * 创建人：周艳平
 * @type {*|{Module}}
 */
var app = angular.module('eui.rightMenu', [])
app.directive('euiRightMenu', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            //获取右击菜单对象
	        var dom = document.getElementById(attrs.menuTarget);
	        if(dom!=null){
		        var menuElement = angular.element(dom);
		        menuElement.css("display","none");//默认隐藏菜单

		        //打开
		        $scope.open = function(event, element) {
			        element.css("display","block");
			        element.css('top', event.clientY + 10 + 'px');
			        element.css('left', event.clientX + 15 + 'px');
		        };

		        //关闭
		        function close(element) {
			        element.css("display","none");
		        };

		        //显示右键菜单
		        element.bind('contextmenu', function (event) {
			        $scope.$apply(function () {
				        event.preventDefault();
				        $scope.open(event, menuElement);
			        });
		        });

		        //绑定事件
		        $scope.menuEvent=function(item){
			        item.onclick(item);
		        };

		        //窗口绑定点击事件 隐藏右键菜单
		        angular.element($window).bind('click', function (event) {
			        $scope.$apply(function () {
				        event.preventDefault();
				        close(menuElement);
			        });
		        });
	        }
        }
    };
}]);

/**
 * Created by hongxin on 2015-11-26.
 */
angular.module('eui.scrollbar', [])
  .directive('euiScrollbar', ['$timeout', '$window', function($timeout, $window) {
    return {
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'template/scrollbar/scrollbar.html';
      },
      transclude: true,
      replace: true,
      scope: {
        moveHeight: '@',
        otherHeight: '='
      },
      link: function(scope, element, attrs, controller) {
        var otherHeight = 0;
        var moveHeight = angular.isDefined(scope.moveHeight) ? scope.$eval(scope.moveHeight) : 100;

        var scrollArea = element.find('div').eq(1);

        $timeout(function() {
          scope.$watch('otherHeight', function () {
            otherHeight = +scope.otherHeight;
            calcCustomHeight();
          })
        });

        $window.onresize = function () {
          scope.$apply(function() {
            calcCustomHeight();
          });
        };

        var calcCustomHeight = function() {
          var customHeight = $window.innerHeight - otherHeight;
          //var height = element.parent().css("width");
          if (scrollArea) {
            scrollArea.css({height: customHeight + "px"});
          }
        };

        scope.moreup = function(evt){
          evt.preventDefault();
          evt.stopPropagation();
          if (scrollArea) {
            var to = moveHeight,
              step = 100,
              timeout,
              animateFn = function() {
                step -= 10;
                doMove( to / 10);
                if (step <= 0) {
                  clearInterval(timeout);
                }
              };
            doMove = function(val) {
              scrollArea[0].scrollTop = scrollArea[0].scrollTop - val;
            };

            timeout = setInterval(animateFn, 10);
          }
        };
        scope.moredown = function(evt){
          evt.preventDefault();
          evt.stopPropagation();
          if (scrollArea) {
            var to = moveHeight,
              step = 100,
              timeout,
              animateFn = function() {
                step -= 10;
                doMove( to / 10);
                if (step <= 0) {
                  clearInterval(timeout);
                }
              };
            doMove = function(val) {
              scrollArea[0].scrollTop = scrollArea[0].scrollTop + val;
            };

            timeout = setInterval(animateFn, 10);
          }
        }
      }
    }
  }]);

/**
 * Created by hongxin on 2015-11-30.
 */
angular.module('eui.scrolltabset', [])
  .controller('ScrolltabsetController', ['$scope', '$animate', '$injector', '$interval',
    function ($scope, $animate, $injector, $interval) {
      var ctrl = this,
        tabs = ctrl.tabs = $scope.tabs = [];

      ctrl.select = function(selectedTab) {
        angular.forEach(tabs, function(tab) {
          if (tab.active && tab !== selectedTab) {
            tab.active = false;
            tab.onDeselect();
            selectedTab.selectCalled = false;
          }
        });
        selectedTab.active = true;
        // only call select if it has not already been called
        if (!selectedTab.selectCalled) {
          selectedTab.onSelect();
          selectedTab.selectCalled = true;
        }
      };

      ctrl.addTab = function addTab(tab) {
        tabs.push(tab);
        // we can't run the select function on the first tab
        // since that would select it twice
        if (tabs.length === 1 && tab.active !== false) {
          tab.active = true;
        } else if (tab.active) {
          ctrl.select(tab);
        } else {
          tab.active = false;
        }
      };

      ctrl.removeTab = function removeTab(tab) {
        var index = tabs.indexOf(tab);
        //Select a new tab if the tab to be removed is selected and not destroyed
        if (tab.active && tabs.length > 1 && !destroyed) {
          //If this is the last tab, select the previous tab. else, the next tab.
          var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
          ctrl.select(tabs[newActiveIndex]);
        }
        tabs.splice(index, 1);
      };

      ctrl.close = function(selectedTab) {
        selectedTab.onClose();
      };

      var destroyed;
      $scope.$on('$destroy', function() {
        destroyed = true;
      });

      //var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
      var moveWidth = angular.isDefined($scope.moveWidth) ? $scope.$eval($scope.moveWidth) : 260;
      $scope.moreleft = function(){
        if (ctrl.scrollArea) {
          var to = moveWidth,
            step = 100,
            timeout,
            animateFn = function() {
              step -= 10;
              doMove( to / 10);
              if (step <= 0) {
                $interval.cancel(timeout);
              }
            };
          doMove = function(val) {
            ctrl.scrollArea[0].scrollLeft = ctrl.scrollArea[0].scrollLeft - val;
          };

          timeout = $interval(animateFn, 10);
          //ctrl.scrollArea[0].scrollLeft = ctrl.scrollArea[0].scrollLeft - 130*2;
          //ctrl.scrollArea.animate({ scrollLeft: ctrl.scrollArea.scrollLeft() - 130*2 }, 100);
        }
      };

      $scope.moreright = function(){
        if (ctrl.scrollArea) {
          var to = moveWidth,
            step = 100,
            timeout,
            animateFn = function() {
              step -= 10;
              doMove( to / 10);
              if (step <= 0) {
                $interval.cancel(timeout);
              }
            };
          doMove = function(val) {
            ctrl.scrollArea[0].scrollLeft = ctrl.scrollArea[0].scrollLeft + val;
          };

          timeout = $interval(animateFn, 10);
          //ctrl.scrollArea[0].scrollLeft = ctrl.scrollArea[0].scrollLeft + 130*2;
          //ctrl.scrollArea.animate({ scrollLeft: ctrl.scrollArea.scrollLeft() + 130*2 }, 100);
        }
      }
    }])


  .directive('euiScrollTabset', ['$timeout', function($timeout) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        istabs:'=?',   //是否Tabs布局，默认是Tabs，不同布局图标不同
        type: '@',
        moveWidth: '@',
        otherWidth: '='
      },
      controller: 'ScrolltabsetController',
      templateUrl: 'template/scrolltabset/scrolltabset.html',
      link: function(scope, element, attrs, controller) {
        scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
        scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
        var otherWidth = angular.isDefined(scope.otherWidth) ? scope.otherWidth : 100;

        scope.istabs = (scope.istabs === false || scope.istabs === "false") ? false:true;

        var ulObj = element.find('ul');
        controller['scrollArea'] = ulObj.parent();

        $timeout(function() {
          scope.$watchCollection('tabs', function () {
            // 计算总宽度
            var width = 20;
            if (ulObj.length) {
              for (var i = 0; i < ulObj[0].children.length; i++) {
                width = width + ulObj[0].children[i].clientWidth;
              }
              ulObj.css({width: width + 'px'});
            } else {
              ulObj.css({width: 'auto'});
            }

            // 计算可视宽度
            var parentEl = element.parent()[0];
            var viewWidth = parentEl.offsetWidth - otherWidth;
            if (controller.scrollArea) {
              controller.scrollArea.css({width: viewWidth + 'px'});
            }
          })
        });
      }
    };
  }])

  .directive('euiScrollTab', ['$parse', function($parse) {
    return {
      require: '^euiScrollTabset',
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/tabs/tab.html',
      transclude: true,
      scope: {
        active: '=?',
        heading: '@',
        onSelect: '&select', //This callback is called in contentHeadingTransclude
        onClose: '&close', //This callback is called in contentHeadingTransclude
        //once it inserts the tab's content into the dom
        onDeselect: '&deselect'
      },
      controller: function() {
        //Empty controller so other directives can require being 'under' a tab
      },
      link: function(scope, elm, attrs, tabsetCtrl, transclude) {
        scope.$watch('active', function(active) {
          if (active) {
            tabsetCtrl.select(scope);
          }
        });

        scope.disabled = false;
        if (attrs.disable) {
          scope.$parent.$watch($parse(attrs.disable), function(value) {
            scope.disabled = !! value;
          });
        }

        scope.select = function() {
          if (!scope.disabled) {
            scope.active = true;
          }
        };

        scope.closeable = !!attrs.close;
        scope.close = function(event) {
          tabsetCtrl.close(scope);
          //if (!scope.disabled) {
          //  scope.active = true;
          //}
        };

        tabsetCtrl.addTab(scope);
        scope.$on('$destroy', function() {
          tabsetCtrl.removeTab(scope);
        });

        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      }
    };
  }])

  .directive('scrollTabHeadingTransclude', function() {
    return {
      restrict: 'A',
      require: ['?^euiScrollTab', '?^tab'], // TODO: change to '^uibTab' after deprecation removal
      link: function(scope, elm) {
        scope.$watch('headingElement', function updateHeadingElement(heading) {
          if (heading) {
            elm.html('');
            elm.append(heading);
          }
        });
      }
    };
  })

  .directive('scrollTabContentTransclude', function() {
    return {
      restrict: 'A',
      require: ['?^euiScrollTabset', '?^tabset'], // TODO: change to '^uibTabset' after deprecation removal
      link: function(scope, elm, attrs) {
        var tab = scope.$eval(attrs.scrollTabContentTransclude);

        //Now our tab is ready to be transcluded: both the tab heading area
        //and the tab content area are loaded.  Transclude 'em both.
        tab.$transcludeFn(tab.$parent, function(contents) {
          angular.forEach(contents, function(node) {
            if (isTabHeading(node)) {
              //Let tabHeadingTransclude know.
              tab.headingElement = node;
            } else {
              elm.append(node);
            }
          });
        });
      }
    };

    function isTabHeading(node) {
      return node.tagName && (
          node.hasAttribute('tab-heading') || // TODO: remove after deprecation removal
          node.hasAttribute('data-tab-heading') || // TODO: remove after deprecation removal
          node.hasAttribute('x-tab-heading') || // TODO: remove after deprecation removal
          node.hasAttribute('scroll-tab-heading') ||
          node.hasAttribute('data-scroll-tab-heading') ||
          node.hasAttribute('x-scroll-tab-heading') ||
          node.tagName.toLowerCase() === 'tab-heading' || // TODO: remove after deprecation removal
          node.tagName.toLowerCase() === 'data-tab-heading' || // TODO: remove after deprecation removal
          node.tagName.toLowerCase() === 'x-tab-heading' || // TODO: remove after deprecation removal
          node.tagName.toLowerCase() === 'scroll-tab-heading' ||
          node.tagName.toLowerCase() === 'data-scroll-tab-heading' ||
          node.tagName.toLowerCase() === 'x-scroll-tab-heading'
        );
    }
  });

/**
 * Created by Administrator on 2016/11/11.
 */
angular.module('eui.service', [])
    // define the request notification channel for the pub/sub service
    .factory('reqChannel', ['$rootScope', function ($rootScope){
        // private notification messages
        var _RESIZE_ = '_RESIZE_';

        // publish resize notification
        var resizeElement = function () {
            $rootScope.$broadcast(_RESIZE_,{args: arguments});
        };
        //subscribe to resize notification
        var onResizeElement = function($scope, handler) {
            $scope.$on(_RESIZE_, function(event, args) {
                handler(args);
            });
        };
        // return the publicly accessible methods
        return {
            resizeElement: resizeElement,
            onResizeElement: onResizeElement
        };
    }]);

/**
 * @ngdoc overview
 * @name eui.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */

angular.module('eui.tabs', [])

.controller('EuiTabsetController', ['$scope', function ($scope) {
  var ctrl = this,
      tabs = ctrl.tabs = $scope.tabs = [];

  ctrl.select = function(selectedTab) {
    angular.forEach(tabs, function(tab) {
      if (tab.active && tab !== selectedTab) {
        tab.active = false;
        tab.onDeselect();
        selectedTab.selectCalled = false;
      }
    });
    selectedTab.active = true;
    // only call select if it has not already been called
    if (!selectedTab.selectCalled) {
      selectedTab.onSelect();
      selectedTab.selectCalled = true;
    }
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    // we can't run the select function on the first tab
    // since that would select it twice
    if (tabs.length === 1 && tab.active !== false) {
      tab.active = true;
    } else if (tab.active) {
      ctrl.select(tab);
    } else {
      tab.active = false;
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && tabs.length > 1 && !destroyed) {
      //If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };

  ctrl.close = function(selectedTab) {
    selectedTab.onClose();
  }

  var destroyed;
  $scope.$on('$destroy', function() {
    destroyed = true;
  });
}])

/**
 * @ngdoc directive
 * @name eui.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {boolean=} justified Whether or not to use justified styling for the tabs.
 *
 * @example
<example module="eui">
  <file name="index.html">
    <eui-tabset>
      <eui-tab heading="Tab 1"><b>First</b> Content!</eui-tab>
      <eui-tab heading="Tab 2"><i>Second</i> Content!</eui-tab>
    </eui-tabset>
    <hr />
    <eui-tabset vertical="true">
      <eui-tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</eui-tab>
      <eui-tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</eui-tab>
    </eui-tabset>
    <eui-tabset justified="true">
      <eui-tab heading="Justified Tab 1"><b>First</b> Justified Content!</eui-tab>
      <eui-tab heading="Justified Tab 2"><i>Second</i> Justified Content!</eui-tab>
    </eui-tabset>
  </file>
</example>
 */
.directive('euiTabset', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      type: '@'
    },
    controller: 'EuiTabsetController',
    templateUrl: 'template/tabs/tabset.html',
    link: function(scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
    }
  };
})

/**
 * @ngdoc directive
 * @name eui.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link eui.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link eui.tabs.directive:tabset tabset}.
 *
 * @example
<example module="eui">
  <file name="index.html">
    <div ng-controller="TabsDemoCtrl">
      <button class="btn btn-small" ng-click="items[0].active = true">
        Select item 1, using active binding
      </button>
      <button class="btn btn-small" ng-click="items[1].disabled = !items[1].disabled">
        Enable/disable item 2, using disabled binding
      </button>
      <br />
      <eui-tabset>
        <eui-tab heading="Tab 1">First Tab</eui-tab>
        <eui-tab select="alertMe()">
          <eui-tab-heading><i class="icon-bell"></i> Alert me!</tab-heading>
          Second Tab, with alert callback and html heading!
        </eui-tab>
        <eui-tab ng-repeat="item in items"
          heading="{{item.title}}"
          disabled="item.disabled"
          active="item.active">
          {{item.content}}
        </eui-tab>
      </eui-tabset>
    </div>
  </file>
  <file name="script.js">
    function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
  </file>
</example>
 */

/**
 * @ngdoc directive
 * @name eui.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link eui.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
<example module="eui">
  <file name="index.html">
    <eui-tabset>
      <eui-tab>
        <eui-tab-heading><b>HTML</b> in my titles?!</tab-heading>
        And some content, too!
      </eui-tab>
      <eui-tab>
        <eui-tab-heading><i class="icon-heart"></i> Icon heading?!?</tab-heading>
        That's right.
      </eui-tab>
    </eui-tabset>
  </file>
</example>
 */
.directive('euiTab', ['$parse', function($parse) {
  return {
    require: '^euiTabset',
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/tabs/tab.html',
    transclude: true,
    scope: {
      active: '=?',
      heading: '@',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onClose: '&close', // 将调用外部定义的关闭函数
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    link: function(scope, elm, attrs, tabsetCtrl, transclude) {
      scope.$watch('active', function(active) {
        if (active) {
          tabsetCtrl.select(scope);
        }
      });

      scope.disabled = false;
      if (attrs.disable) {
        scope.$parent.$watch($parse(attrs.disable), function(value) {
          scope.disabled = !! value;
        });
      }

      scope.select = function() {
        if (!scope.disabled) {
          scope.active = true;
        }
      };

      tabsetCtrl.addTab(scope);
      scope.$on('$destroy', function() {
        tabsetCtrl.removeTab(scope);
      });

      scope.closeable = !!attrs.close;
      scope.close = function(event) {
        if (!scope.disabled) {
          tabsetCtrl.close(scope);
        }
      };

      //We need to transclude later, once the content container is ready.
      //when this link happens, we're inside a tab heading.
      scope.$transcludeFn = transclude;
    }
  };
}])

.directive('euiTabHeadingTransclude', function() {
  return {
    restrict: 'A',
    require: ['?^euiTab', '?^tab'], // TODO: change to '^euiTab' after deprecation removal
    link: function(scope, elm) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
})

.directive('euiTabContentTransclude', function() {
  return {
    restrict: 'A',
    require: ['?^euiTabset', '?^tabset'], // TODO: change to '^euiTabset' after deprecation removal
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.euiTabContentTransclude);

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };

  function isTabHeading(node) {
    return node.tagName && (
      node.hasAttribute('tab-heading') || // TODO: remove after deprecation removal
      node.hasAttribute('data-tab-heading') || // TODO: remove after deprecation removal
      node.hasAttribute('x-tab-heading') || // TODO: remove after deprecation removal
      node.hasAttribute('eui-tab-heading') ||
      node.hasAttribute('data-eui-tab-heading') ||
      node.hasAttribute('x-eui-tab-heading') ||
      node.tagName.toLowerCase() === 'tab-heading' || // TODO: remove after deprecation removal
      node.tagName.toLowerCase() === 'data-tab-heading' || // TODO: remove after deprecation removal
      node.tagName.toLowerCase() === 'x-tab-heading' || // TODO: remove after deprecation removal
      node.tagName.toLowerCase() === 'eui-tab-heading' ||
      node.tagName.toLowerCase() === 'data-eui-tab-heading' ||
      node.tagName.toLowerCase() === 'x-eui-tab-heading'
    );
  }
});

/* deprecated tabs below */

angular.module('eui.timepicker', [])

.constant('euiTimepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: true,
  meridians: null,
  readonlyInput: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: true
})

.controller('EuiTimepickerController', ['$scope', '$element', '$attrs', '$parse', '$log', '$locale', 'euiTimepickerConfig', function($scope, $element, $attrs, $parse, $log, $locale, timepickerConfig) {
  var selected = new Date(),
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
      meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS;

  $scope.tabindex = angular.isDefined($attrs.tabindex) ? $attrs.tabindex : 0;
  $element.removeAttr('tabindex');

  this.init = function(ngModelCtrl_, inputs) {
    ngModelCtrl = ngModelCtrl_;
    ngModelCtrl.$render = this.render;

    ngModelCtrl.$formatters.unshift(function(modelValue) {
      return modelValue ? new Date(modelValue) : null;
    });

    var hoursInputEl = inputs.eq(0),
        minutesInputEl = inputs.eq(1);

    var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;
    if (mousewheel) {
      this.setupMousewheelEvents(hoursInputEl, minutesInputEl);
    }

    var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
    if (arrowkeys) {
      this.setupArrowkeyEvents(hoursInputEl, minutesInputEl);
    }

    $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
    this.setupInputEvents(hoursInputEl, minutesInputEl);
  };

  var hourStep = timepickerConfig.hourStep;
  if ($attrs.hourStep) {
    $scope.$parent.$watch($parse($attrs.hourStep), function(value) {
      hourStep = parseInt(value, 10);
    });
  }

  var minuteStep = timepickerConfig.minuteStep;
  if ($attrs.minuteStep) {
    $scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
      minuteStep = parseInt(value, 10);
    });
  }

  var min;
  $scope.$parent.$watch($parse($attrs.min), function(value) {
    var dt = new Date(value);
    min = isNaN(dt) ? undefined : dt;
  });

  var max;
  $scope.$parent.$watch($parse($attrs.max), function(value) {
    var dt = new Date(value);
    max = isNaN(dt) ? undefined : dt;
  });

  $scope.noIncrementHours = function() {
    var incrementedSelected = addMinutes(selected, hourStep * 60);
    return incrementedSelected > max ||
      (incrementedSelected < selected && incrementedSelected < min);
  };

  $scope.noDecrementHours = function() {
    var decrementedSelected = addMinutes(selected, -hourStep * 60);
    return decrementedSelected < min ||
      (decrementedSelected > selected && decrementedSelected > max);
  };

  $scope.noIncrementMinutes = function() {
    var incrementedSelected = addMinutes(selected, minuteStep);
    return incrementedSelected > max ||
      (incrementedSelected < selected && incrementedSelected < min);
  };

  $scope.noDecrementMinutes = function() {
    var decrementedSelected = addMinutes(selected, -minuteStep);
    return decrementedSelected < min ||
      (decrementedSelected > selected && decrementedSelected > max);
  };

  $scope.noToggleMeridian = function() {
    if (selected.getHours() < 13) {
      return addMinutes(selected, 12 * 60) > max;
    } else {
      return addMinutes(selected, -12 * 60) < min;
    }
  };

  // 12H / 24H mode
  $scope.showMeridian = timepickerConfig.showMeridian;
  if ($attrs.showMeridian) {
    $scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
      $scope.showMeridian = !!value;

      if (ngModelCtrl.$error.time) {
        // Evaluate from template
        var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
        if (angular.isDefined(hours) && angular.isDefined(minutes)) {
          selected.setHours(hours);
          refresh();
        }
      } else {
        updateTemplate();
      }
    });
  }

  // Get $scope.hours in 24H mode if valid
  function getHoursFromTemplate() {
    var hours = parseInt($scope.hours, 10);
    var valid = $scope.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
    if (!valid) {
      return undefined;
    }

    if ($scope.showMeridian) {
      if (hours === 12) {
        hours = 0;
      }
      if ($scope.meridian === meridians[1]) {
        hours = hours + 12;
      }
    }
    return hours;
  }

  function getMinutesFromTemplate() {
    var minutes = parseInt($scope.minutes, 10);
    return (minutes >= 0 && minutes < 60) ? minutes : undefined;
  }

  function pad(value) {
    return (angular.isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
  }

  // Respond on mousewheel spin
  this.setupMousewheelEvents = function(hoursInputEl, minutesInputEl) {
    var isScrollingUp = function(e) {
      if (e.originalEvent) {
        e = e.originalEvent;
      }
      //pick correct delta variable depending on event
      var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
      return (e.detail || delta > 0);
    };

    hoursInputEl.bind('mousewheel wheel', function(e) {
      $scope.$apply(isScrollingUp(e) ? $scope.incrementHours() : $scope.decrementHours());
      e.preventDefault();
    });

    minutesInputEl.bind('mousewheel wheel', function(e) {
      $scope.$apply(isScrollingUp(e) ? $scope.incrementMinutes() : $scope.decrementMinutes());
      e.preventDefault();
    });

  };

  // Respond on up/down arrowkeys
  this.setupArrowkeyEvents = function(hoursInputEl, minutesInputEl) {
    hoursInputEl.bind('keydown', function(e) {
      if (e.which === 38) { // up
        e.preventDefault();
        $scope.incrementHours();
        $scope.$apply();
      } else if (e.which === 40) { // down
        e.preventDefault();
        $scope.decrementHours();
        $scope.$apply();
      }
    });

    minutesInputEl.bind('keydown', function(e) {
      if (e.which === 38) { // up
        e.preventDefault();
        $scope.incrementMinutes();
        $scope.$apply();
      } else if (e.which === 40) { // down
        e.preventDefault();
        $scope.decrementMinutes();
        $scope.$apply();
      }
    });
  };

  this.setupInputEvents = function(hoursInputEl, minutesInputEl) {
    if ($scope.readonlyInput) {
      $scope.updateHours = angular.noop;
      $scope.updateMinutes = angular.noop;
      return;
    }

    var invalidate = function(invalidHours, invalidMinutes) {
      ngModelCtrl.$setViewValue(null);
      ngModelCtrl.$setValidity('time', false);
      if (angular.isDefined(invalidHours)) {
        $scope.invalidHours = invalidHours;
      }
      if (angular.isDefined(invalidMinutes)) {
        $scope.invalidMinutes = invalidMinutes;
      }
    };

    $scope.updateHours = function() {
      var hours = getHoursFromTemplate(),
        minutes = getMinutesFromTemplate();

      if (angular.isDefined(hours) && angular.isDefined(minutes)) {
        selected.setHours(hours);
        if (selected < min || selected > max) {
          invalidate(true);
        } else {
          refresh('h');
        }
      } else {
        invalidate(true);
      }
    };

    hoursInputEl.bind('blur', function(e) {
      if (!$scope.invalidHours && $scope.hours < 10) {
        $scope.$apply(function() {
          $scope.hours = pad($scope.hours);
        });
      }
    });

    $scope.updateMinutes = function() {
      var minutes = getMinutesFromTemplate(),
        hours = getHoursFromTemplate();

      if (angular.isDefined(minutes) && angular.isDefined(hours)) {
        selected.setMinutes(minutes);
        if (selected < min || selected > max) {
          invalidate(undefined, true);
        } else {
          refresh('m');
        }
      } else {
        invalidate(undefined, true);
      }
    };

    minutesInputEl.bind('blur', function(e) {
      if (!$scope.invalidMinutes && $scope.minutes < 10) {
        $scope.$apply(function() {
          $scope.minutes = pad($scope.minutes);
        });
      }
    });

  };

  this.render = function() {
    var date = ngModelCtrl.$viewValue;

    if (isNaN(date)) {
      ngModelCtrl.$setValidity('time', false);
      $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
    } else {
      if (date) {
        selected = date;
      }

      if (selected < min || selected > max) {
        ngModelCtrl.$setValidity('time', false);
        $scope.invalidHours = true;
        $scope.invalidMinutes = true;
      } else {
        makeValid();
      }
      updateTemplate();
    }
  };

  // Call internally when we know that model is valid.
  function refresh(keyboardChange) {
    makeValid();
    ngModelCtrl.$setViewValue(new Date(selected));
    updateTemplate(keyboardChange);
  }

  function makeValid() {
    ngModelCtrl.$setValidity('time', true);
    $scope.invalidHours = false;
    $scope.invalidMinutes = false;
  }

  function updateTemplate(keyboardChange) {
    var hours = selected.getHours(), minutes = selected.getMinutes();

    if ($scope.showMeridian) {
      hours = (hours === 0 || hours === 12) ? 12 : hours % 12; // Convert 24 to 12 hour system
    }

    $scope.hours = keyboardChange === 'h' ? hours : pad(hours);
    if (keyboardChange !== 'm') {
      $scope.minutes = pad(minutes);
    }
    $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
  }

  function addMinutes(date, minutes) {
    var dt = new Date(date.getTime() + minutes * 60000);
    var newDate = new Date(date);
    newDate.setHours(dt.getHours(), dt.getMinutes());
    return newDate;
  }

  function addMinutesToSelected(minutes) {
    selected = addMinutes(selected, minutes);
    refresh();
  }

  $scope.showSpinners = angular.isDefined($attrs.showSpinners) ?
    $scope.$parent.$eval($attrs.showSpinners) : timepickerConfig.showSpinners;

  $scope.incrementHours = function() {
    if (!$scope.noIncrementHours()) {
      addMinutesToSelected(hourStep * 60);
    }
  };

  $scope.decrementHours = function() {
    if (!$scope.noDecrementHours()) {
      addMinutesToSelected(-hourStep * 60);
    }
  };

  $scope.incrementMinutes = function() {
    if (!$scope.noIncrementMinutes()) {
      addMinutesToSelected(minuteStep);
    }
  };

  $scope.decrementMinutes = function() {
    if (!$scope.noDecrementMinutes()) {
      addMinutesToSelected(-minuteStep);
    }
  };

  $scope.toggleMeridian = function() {
    if (!$scope.noToggleMeridian()) {
      addMinutesToSelected(12 * 60 * (selected.getHours() < 12 ? 1 : -1));
    }
  };
}])

.directive('euiTimepicker', function() {
  return {
    restrict: 'EA',
    require: ['euiTimepicker', '?^ngModel'],
    controller: 'EuiTimepickerController',
    controllerAs: 'timepicker',
    replace: true,
    scope: {},
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/timepicker/timepicker.html';
    },
    link: function(scope, element, attrs, ctrls) {
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (ngModelCtrl) {
        timepickerCtrl.init(ngModelCtrl, element.find('input'));
      }
    }
  };
});

/* Deprecated timepicker below */

angular.module('eui.timepicker')

.value('$timepickerSuppressWarning', false)

.controller('TimepickerController', ['$scope', '$element', '$attrs', '$controller', '$log', '$timepickerSuppressWarning', function($scope, $element, $attrs, $controller, $log, $timepickerSuppressWarning) {
  if (!$timepickerSuppressWarning) {
    $log.warn('TimepickerController is now deprecated. Use EuiTimepickerController instead.');
  }

  angular.extend(this, $controller('EuiTimepickerController', {
    $scope: $scope,
    $element: $element,
    $attrs: $attrs
  }));
}])

.directive('timepicker', ['$log', '$timepickerSuppressWarning', function($log, $timepickerSuppressWarning) {
  return {
    restrict: 'EA',
    require: ['timepicker', '?^ngModel'],
    controller: 'TimepickerController',
    controllerAs: 'timepicker',
    replace: true,
    scope: {},
    templateUrl: function(element, attrs) {
      return attrs.templateUrl || 'template/timepicker/timepicker.html';
    },
    link: function(scope, element, attrs, ctrls) {
      if (!$timepickerSuppressWarning) {
        $log.warn('timepicker is now deprecated. Use eui-timepicker instead.');
      }
      var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (ngModelCtrl) {
        timepickerCtrl.init(ngModelCtrl, element.find('input'));
      }
    }
  };
}]);

/**
 * Created by hongxin on 2015-11-6.
 */

angular.module('eui.timespinner', [])

  .constant('euiTimeSpinnerConfig', {
    hourStep: 1,
    minuteStep: 1,
    showMeridian: false,
    meridians: null,
    readonlyInput: false,
    mousewheel: true,
    arrowkeys: true,
    showSpinners: true
  })

  .controller('TimeSpinnerController', ['$scope', '$element', '$attrs', '$parse', '$log', '$locale', 'euiTimeSpinnerConfig', function($scope, $element, $attrs, $parse, $log, $locale, timepickerConfig) {
    var selected = new Date(),
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
      meridians = angular.isDefined($attrs.meridians) ? $scope.$parent.$eval($attrs.meridians) : timepickerConfig.meridians || $locale.DATETIME_FORMATS.AMPMS;

    $scope.tabindex = angular.isDefined($attrs.tabindex) ? $attrs.tabindex : 0;
    $element.removeAttr('tabindex');

    this.init = function(ngModelCtrl_, inputs) {
      ngModelCtrl = ngModelCtrl_;
      ngModelCtrl.$render = this.render;

      ngModelCtrl.$formatters.unshift(function(modelValue) {
        return modelValue ? new Date(modelValue) : null;
      });

      var hoursInputEl = inputs.eq(0),
        minutesInputEl = inputs.eq(1),
        secondsInputEl = inputs.eq(2);

      var mousewheel = angular.isDefined($attrs.mousewheel) ? $scope.$parent.$eval($attrs.mousewheel) : timepickerConfig.mousewheel;
      if (mousewheel) {
        this.setupMousewheelEvents(hoursInputEl, minutesInputEl, secondsInputEl);
      }

      var arrowkeys = angular.isDefined($attrs.arrowkeys) ? $scope.$parent.$eval($attrs.arrowkeys) : timepickerConfig.arrowkeys;
      if (arrowkeys) {
        this.setupArrowkeyEvents(hoursInputEl, minutesInputEl, secondsInputEl);
      }

      $scope.readonlyInput = angular.isDefined($attrs.readonlyInput) ? $scope.$parent.$eval($attrs.readonlyInput) : timepickerConfig.readonlyInput;
      this.setupInputEvents(hoursInputEl, minutesInputEl, secondsInputEl);
    };

    var hourStep = timepickerConfig.hourStep;
    if ($attrs.hourStep) {
      $scope.$parent.$watch($parse($attrs.hourStep), function(value) {
        hourStep = parseInt(value, 10);
      });
    }

    var minuteStep = timepickerConfig.minuteStep;
    if ($attrs.minuteStep) {
      $scope.$parent.$watch($parse($attrs.minuteStep), function(value) {
        minuteStep = parseInt(value, 10);
      });
    }

    var min;
    $scope.$parent.$watch($parse($attrs.min), function(value) {
      var dt = new Date(value);
      min = isNaN(dt) ? undefined : dt;
    });

    var max;
    $scope.$parent.$watch($parse($attrs.max), function(value) {
      var dt = new Date(value);
      max = isNaN(dt) ? undefined : dt;
    });

    $scope.noIncrementHours = function() {
      var incrementedSelected = addMinutes(selected, hourStep * 60);
      return incrementedSelected > max ||
        (incrementedSelected < selected && incrementedSelected < min);
    };

    $scope.noDecrementHours = function() {
      var decrementedSelected = addMinutes(selected, -hourStep * 60);
      return decrementedSelected < min ||
        (decrementedSelected > selected && decrementedSelected > max);
    };

    $scope.noIncrementMinutes = function() {
      var incrementedSelected = addMinutes(selected, minuteStep);
      return incrementedSelected > max ||
        (incrementedSelected < selected && incrementedSelected < min);
    };

    $scope.noDecrementMinutes = function() {
      var decrementedSelected = addMinutes(selected, -minuteStep);
      return decrementedSelected < min ||
        (decrementedSelected > selected && decrementedSelected > max);
    };

    $scope.noToggleMeridian = function() {
      if (selected.getHours() < 13) {
        return addMinutes(selected, 12 * 60) > max;
      } else {
        return addMinutes(selected, -12 * 60) < min;
      }
    };

    // 12H / 24H mode
    $scope.showMeridian = timepickerConfig.showMeridian;
    if ($attrs.showMeridian) {
      $scope.$parent.$watch($parse($attrs.showMeridian), function(value) {
        $scope.showMeridian = !!value;

        if (ngModelCtrl.$error.time) {
          // Evaluate from template
          var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
          if (angular.isDefined(hours) && angular.isDefined(minutes)) {
            selected.setHours(hours);
            refresh();
          }
        } else {
          updateTemplate();
        }
      });
    }

    // Get $scope.hours in 24H mode if valid
    function getHoursFromTemplate() {
      var hours = parseInt($scope.hours, 10);
      var valid = $scope.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
      if (!valid) {
        if (hours < 0)
          return 0;
        else if (hours > 23)
          return 23;
        else
          return undefined;
      }

      if ($scope.showMeridian) {
        if (hours === 12) {
          hours = 0;
        }
        if ($scope.meridian === meridians[1]) {
          hours = hours + 12;
        }
      }
      return hours;
    }

    function getMinutesFromTemplate() {
      var minutes = parseInt($scope.minutes, 10);
      var valid = (minutes >= 0 && minutes < 60) ? true : false;
      if (!valid) {
        if (minutes < 0)
          return 0;
        else if (minutes > 59)
          return 59;
        else
          return undefined;
      } else {
        return minutes
      }
    }

    function getSecondsFromTemplate() {
      var seconds = parseInt($scope.seconds, 10);
      var valid = (seconds >= 0 && seconds < 60) ? true : false;
      if (!valid) {
        if (seconds < 0)
          return 0;
        else if (seconds > 59)
          return 59;
        else
          return seconds;
      } else {
        return seconds
      }
    }

    function pad(value) {
      return (angular.isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
    }

    // Respond on mousewheel spin
    this.setupMousewheelEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
      var isScrollingUp = function(e) {
        if (e.originalEvent) {
          e = e.originalEvent;
        }
        //pick correct delta variable depending on event
        var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
        return (e.detail || delta > 0);
      };

      hoursInputEl.bind('mousewheel wheel', function(e) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementHours() : $scope.decrementHours());
        e.preventDefault();
      });

      minutesInputEl.bind('mousewheel wheel', function(e) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementMinutes() : $scope.decrementMinutes());
        e.preventDefault();
      });

      secondsInputEl.bind('mousewheel wheel', function(e) {
        $scope.$apply(isScrollingUp(e) ? $scope.incrementSeconds() : $scope.decrementSeconds());
        e.preventDefault();
      });

    };

    // Respond on up/down arrowkeys
    this.setupArrowkeyEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
      hoursInputEl.bind('keydown', function(e) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementHours();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementHours();
          $scope.$apply();
        }
      });

      minutesInputEl.bind('keydown', function(e) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementMinutes();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementMinutes();
          $scope.$apply();
        }
      });

      secondsInputEl.bind('keydown', function(e) {
        if (e.which === 38) { // up
          e.preventDefault();
          $scope.incrementSeconds();
          $scope.$apply();
        } else if (e.which === 40) { // down
          e.preventDefault();
          $scope.decrementSeconds();
          $scope.$apply();
        }
      });
    };

    this.setupInputEvents = function(hoursInputEl, minutesInputEl, secondsInputEl) {
      if ($scope.readonlyInput) {
        $scope.updateHours = angular.noop;
        $scope.updateMinutes = angular.noop;
        $scope.updateSeconds = angular.noop;
        return;
      }

      var invalidate = function(invalidHours, invalidMinutes, invalidSeconds) {
        ngModelCtrl.$setViewValue(null);
        ngModelCtrl.$setValidity('time', false);
        if (angular.isDefined(invalidHours)) {
          $scope.invalidHours = invalidHours;
        }
        if (angular.isDefined(invalidMinutes)) {
          $scope.invalidMinutes = invalidMinutes;
        }
        if (angular.isDefined(invalidSeconds)) {
          $scope.invalidSeconds = invalidSeconds;
        }
      };

      $scope.updateHours = function() {
        var hours = getHoursFromTemplate(),
          minutes = getMinutesFromTemplate(),
          seconds = getSecondsFromTemplate();

        if (angular.isDefined(hours) && angular.isDefined(minutes) && angular.isDefined(seconds)) {
          selected.setHours(hours);
          if (selected < min || selected > max) {
            invalidate(true);
          } else {
            refresh('h');
          }
        } else {
          invalidate(true);
        }
      };

      hoursInputEl.bind('blur', function(e) {
        if (!$scope.invalidHours && $scope.hours < 10) {
          $scope.$apply(function() {
            $scope.hours = pad($scope.hours);
          });
        }
      });

      hoursInputEl.bind('focus', function(e) {
        $scope.focusInput = 'h';
      });

      $scope.updateMinutes = function() {
        var minutes = getMinutesFromTemplate(),
          hours = getHoursFromTemplate();

        if (angular.isDefined(minutes) && angular.isDefined(hours)) {
          selected.setMinutes(minutes);
          if (selected < min || selected > max) {
            invalidate(undefined, true);
          } else {
            refresh('m');
          }
        } else {
          invalidate(undefined, true);
        }
      };

      minutesInputEl.bind('blur', function(e) {
        if (!$scope.invalidMinutes && $scope.minutes < 10) {
          $scope.$apply(function() {
            $scope.minutes = pad($scope.minutes);
          });
        }
      });

      $scope.focusInput = 'm';
      minutesInputEl.bind('focus', function(e) {
        $scope.focusInput = 'm';
      });

      $scope.updateSeconds = function() {
        var seconds = getSecondsFromTemplate(),
          minutes = getMinutesFromTemplate(),
          hours = getHoursFromTemplate();

        if (angular.isDefined(seconds) && angular.isDefined(minutes) && angular.isDefined(hours)) {
          selected.setSeconds(seconds);
          if (selected < min || selected > max) {
            invalidate(undefined, undefined, true);
          } else {
            refresh('s');
          }
        } else {
          invalidate(undefined, undefined, true);
        }
      };

      secondsInputEl.bind('blur', function(e) {
        if (!$scope.invalidSeconds && $scope.seconds < 10) {
          $scope.$apply(function() {
            $scope.seconds = pad($scope.seconds);
          });
        }
      });

      secondsInputEl.bind('focus', function(e) {
        $scope.focusInput = 's';
      });

    };

    this.render = function() {
      var date = ngModelCtrl.$viewValue;

      if (isNaN(date)) {
        ngModelCtrl.$setValidity('time', false);
        $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
      } else {
        if (date) {
          selected = date;
        }

        if (selected < min || selected > max) {
          ngModelCtrl.$setValidity('time', false);
          $scope.invalidHours = true;
          $scope.invalidMinutes = true;
          $scope.invalidSeconds = true;
        } else {
          makeValid();
        }
        updateTemplate();
      }
    };

    // Call internally when we know that model is valid.
    function refresh(keyboardChange) {
      makeValid();
      ngModelCtrl.$setViewValue(new Date(selected));
      updateTemplate(keyboardChange);
    }

    function makeValid() {
      ngModelCtrl.$setValidity('time', true);
      $scope.invalidHours = false;
      $scope.invalidMinutes = false;
      $scope.invalidSeconds = false;
    }

    function updateTemplate(keyboardChange) {
      var hours = selected.getHours(), minutes = selected.getMinutes(), seconds = selected.getSeconds();

      if ($scope.showMeridian) {
        hours = (hours === 0 || hours === 12) ? 12 : hours % 12; // Convert 24 to 12 hour system
      }

      $scope.hours = keyboardChange === 'h' ? hours : pad(hours);
      $scope.minutes = keyboardChange === 'm' ? minutes : pad(minutes);
      $scope.seconds = keyboardChange === 's' ? seconds : pad(seconds);
      $scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
    }

    function addMinutes(date, minutes) {
      var dt = new Date(date.getTime() + minutes * 60000);
      var newDate = new Date(date);
      newDate.setHours(dt.getHours(), dt.getMinutes());
      return newDate;
    }

    function addMinutesToSelected(minutes) {
      selected = addMinutes(selected, minutes);
      refresh();
    }

    $scope.showSpinners = angular.isDefined($attrs.showSpinners) ?
      $scope.$parent.$eval($attrs.showSpinners) : timepickerConfig.showSpinners;

    $scope.incrementHours = function() {
      if (!$scope.noIncrementHours()) {
        addMinutesToSelected(hourStep * 60);
      }
    };

    $scope.decrementHours = function() {
      if (!$scope.noDecrementHours()) {
        addMinutesToSelected(-hourStep * 60);
      }
    };

    $scope.incrementMinutes = function() {
      if (!$scope.noIncrementMinutes()) {
        addMinutesToSelected(minuteStep);
      }
    };

    $scope.decrementMinutes = function() {
      if (!$scope.noDecrementMinutes()) {
        addMinutesToSelected(-minuteStep);
      }
    };

    $scope.toggleMeridian = function() {
      if (!$scope.noToggleMeridian()) {
        addMinutesToSelected(12 * 60 * (selected.getHours() < 12 ? 1 : -1));
      }
    };

    $scope.incrementVal = function() {
      if ($scope.focusInput === 'h') {
        $scope.incrementHours();
      } else if ($scope.focusInput === 'm') {
        $scope.incrementMinutes();
      }
    };

    $scope.decrementVal = function() {
      if ($scope.focusInput === 'h') {
        $scope.decrementHours();
      } else if ($scope.focusInput === 'm') {
        $scope.decrementMinutes();
      }
    };
  }])

  .directive('euiTimespinner', function() {
    return {
      restrict: 'EA',
      require: ['euiTimespinner', '?^ngModel'],
      controller: 'TimeSpinnerController',
      controllerAs: 'euiTimespinner',
      replace: true,
      scope: {},
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'template/timespinner/timespinner.html';
      },
      link: function(scope, element, attrs, ctrls) {
        var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        if (ngModelCtrl) {
          timepickerCtrl.init(ngModelCtrl, element.find('input'));
        }
      }
    };
  })

;
angular.module('eui.typeahead', ['eui.position'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('euiTypeaheadParser', ['$parse', function($parse) {
    //                      00000111000000000000022200000000000000003333333333333330000000000044000
    var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;
    return {
      parse: function(input) {
        var match = input.match(TYPEAHEAD_REGEXP);
        if (!match) {
          throw new Error(
            'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
              ' but got "' + input + '".');
        }

        return {
          itemName: match[3],
          source: $parse(match[4]),
          viewMapper: $parse(match[2] || match[1]),
          modelMapper: $parse(match[1])
        };
      }
    };
  }])

  .controller('euiTypeaheadController', ['$scope', '$element', '$attrs', '$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$euiPosition', 'euiTypeaheadParser',
    function(originalScope, element, attrs, $compile, $parse, $q, $timeout, $document, $window, $rootScope, $position, typeaheadParser) {
    var HOT_KEYS = [9, 13, 27, 38, 40];
    var eventDebounceTime = 200;
    var modelCtrl, ngModelOptions;
    //SUPPORTED ATTRIBUTES (OPTIONS)

    //minimal no of characters that needs to be entered before typeahead kicks-in
    var minLength = originalScope.$eval(attrs.typeaheadMinLength);
    if (!minLength && minLength !== 0) {
      minLength = 1;
    }

    //minimal wait time after last character typed before typeahead kicks-in
    var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

    //should it restrict model values to the ones selected from the popup only?
    var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

    //binding to a variable that indicates if matches are being retrieved asynchronously
    var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

    //a callback executed when a match is selected
    var onSelectCallback = $parse(attrs.typeaheadOnSelect);

    //should it select highlighted popup value when losing focus?
    var isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

    //binding to a variable that indicates if there were no results after the query is completed
    var isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

    var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

    var appendToBody =  attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

    var appendToElementId =  attrs.typeaheadAppendToElementId || false;

    var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

    //If input matches an item of the list exactly, select it automatically
    var selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

    //INTERNAL VARIABLES

    //model setter executed upon match selection
    var parsedModel = $parse(attrs.ngModel);
    var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
    var $setModelValue = function(scope, newValue) {
      if (angular.isFunction(parsedModel(originalScope)) &&
        ngModelOptions && ngModelOptions.$options && ngModelOptions.$options.getterSetter) {
        return invokeModelSetter(scope, {$$$p: newValue});
      } else {
        return parsedModel.assign(scope, newValue);
      }
    };

    //expressions used by typeahead
    var parserResult = typeaheadParser.parse(attrs.euiTypeahead);

    var hasFocus;

    //Used to avoid bug in iOS webview where iOS keyboard does not fire
    //mousedown & mouseup events
    //Issue #3699
    var selected;

    //create a child scope for the typeahead directive so we are not polluting original scope
    //with typeahead-specific data (matches, query etc.)
    var scope = originalScope.$new();
    var offDestroy = originalScope.$on('$destroy', function() {
      scope.$destroy();
    });
    scope.$on('$destroy', offDestroy);

    // WAI-ARIA
    var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
    element.attr({
      'aria-autocomplete': 'list',
      'aria-expanded': false,
      'aria-owns': popupId
    });

    //pop-up element used to display matches
    var popUpEl = angular.element('<div eui-typeahead-popup></div>');
    popUpEl.attr({
      id: popupId,
      matches: 'matches',
      active: 'activeIdx',
      select: 'select(activeIdx)',
      'move-in-progress': 'moveInProgress',
      query: 'query',
      position: 'position'
    });
    //custom item template
    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
      popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
    }

    if (angular.isDefined(attrs.typeaheadPopupTemplateUrl)) {
      popUpEl.attr('popup-template-url', attrs.typeaheadPopupTemplateUrl);
    }

    var resetMatches = function() {
      scope.matches = [];
      scope.activeIdx = -1;
      element.attr('aria-expanded', false);
    };

    var getMatchId = function(index) {
      return popupId + '-option-' + index;
    };

    // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
    // This attribute is added or removed automatically when the `activeIdx` changes.
    scope.$watch('activeIdx', function(index) {
      if (index < 0) {
        element.removeAttr('aria-activedescendant');
      } else {
        element.attr('aria-activedescendant', getMatchId(index));
      }
    });

    var inputIsExactMatch = function(inputValue, index) {
      if (scope.matches.length > index && inputValue) {
        return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
      }

      return false;
    };

    var getMatchesAsync = function(inputValue) {
      var locals = {$viewValue: inputValue};
      isLoadingSetter(originalScope, true);
      isNoResultsSetter(originalScope, false);
      $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
        //it might happen that several async queries were in progress if a user were typing fast
        //but we are interested only in responses that correspond to the current view value
        var onCurrentRequest = (inputValue === modelCtrl.$viewValue);
        if (onCurrentRequest && hasFocus) {
          if (matches && matches.length > 0) {
            scope.activeIdx = focusFirst ? 0 : -1;
            isNoResultsSetter(originalScope, false);
            scope.matches.length = 0;

            //transform labels
            for (var i = 0; i < matches.length; i++) {
              locals[parserResult.itemName] = matches[i];
              scope.matches.push({
                id: getMatchId(i),
                label: parserResult.viewMapper(scope, locals),
                model: matches[i]
              });
            }

            scope.query = inputValue;
            //position pop-up with matches - we need to re-calculate its position each time we are opening a window
            //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
            //due to other elements being rendered
            recalculatePosition();

            element.attr('aria-expanded', true);

            //Select the single remaining option if user input matches
            if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
              scope.select(0);
            }
          } else {
            resetMatches();
            isNoResultsSetter(originalScope, true);
          }
        }
        if (onCurrentRequest) {
          isLoadingSetter(originalScope, false);
        }
      }, function() {
        resetMatches();
        isLoadingSetter(originalScope, false);
        isNoResultsSetter(originalScope, true);
      });
    };

    // bind events only if appendToBody params exist - performance feature
    if (appendToBody) {
      angular.element($window).bind('resize', fireRecalculating);
      $document.find('body').bind('scroll', fireRecalculating);
    }

    // Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
    var timeoutEventPromise;

    // Default progress type
    scope.moveInProgress = false;

    function fireRecalculating() {
      if (!scope.moveInProgress) {
        scope.moveInProgress = true;
        scope.$digest();
      }

      // Cancel previous timeout
      if (timeoutEventPromise) {
        $timeout.cancel(timeoutEventPromise);
      }

      // Debounced executing recalculate after events fired
      timeoutEventPromise = $timeout(function() {
        // if popup is visible
        if (scope.matches.length) {
          recalculatePosition();
        }

        scope.moveInProgress = false;
      }, eventDebounceTime);
    }

    // recalculate actual position and set new values to scope
    // after digest loop is popup in right position
    function recalculatePosition() {
      scope.position = appendToBody ? $position.offset(element) : $position.position(element);
      scope.position.top += element.prop('offsetHeight');
    }

    //we need to propagate user's query so we can higlight matches
    scope.query = undefined;

    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
    var timeoutPromise;

    var scheduleSearchWithTimeout = function(inputValue) {
      timeoutPromise = $timeout(function() {
        getMatchesAsync(inputValue);
      }, waitTime);
    };

    var cancelPreviousTimeout = function() {
      if (timeoutPromise) {
        $timeout.cancel(timeoutPromise);
      }
    };

    resetMatches();

    scope.select = function(activeIdx) {
      //called from within the $digest() cycle
      var locals = {};
      var model, item;

      selected = true;
      locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
      model = parserResult.modelMapper(originalScope, locals);
      $setModelValue(originalScope, model);
      modelCtrl.$setValidity('editable', true);
      modelCtrl.$setValidity('parse', true);

      onSelectCallback(originalScope, {
        $item: item,
        $model: model,
        $label: parserResult.viewMapper(originalScope, locals)
      });

      resetMatches();

      //return focus to the input element if a match was selected via a mouse click event
      // use timeout to avoid $rootScope:inprog error
      if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
        $timeout(function() { element[0].focus(); }, 0, false);
      }
    };

    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
    element.bind('keydown', function(evt) {
      //typeahead is open and an "interesting" key was pressed
      if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
        return;
      }

      // if there's nothing selected (i.e. focusFirst) and enter or tab is hit, clear the results
      if (scope.activeIdx === -1 && (evt.which === 9 || evt.which === 13)) {
        resetMatches();
        scope.$digest();
        return;
      }

      evt.preventDefault();

      if (evt.which === 40) {
        scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
        scope.$digest();
      } else if (evt.which === 38) {
        scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
        scope.$digest();
      } else if (evt.which === 13 || evt.which === 9) {
        scope.$apply(function () {
          scope.select(scope.activeIdx);
        });
      } else if (evt.which === 27) {
        evt.stopPropagation();

        resetMatches();
        scope.$digest();
      }
    });

    element.bind('blur', function() {
      if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
        selected = true;
        scope.$apply(function() {
          scope.select(scope.activeIdx);
        });
      }
      hasFocus = false;
      selected = false;
    });

    // Keep reference to click handler to unbind it.
    var dismissClickHandler = function(evt) {
      // Issue #3973
      // Firefox treats right click as a click on document
      if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
        resetMatches();
        if (!$rootScope.$$phase) {
          scope.$digest();
        }
      }
    };

    $document.bind('click', dismissClickHandler);

    originalScope.$on('$destroy', function() {
      $document.unbind('click', dismissClickHandler);
      if (appendToBody || appendToElementId) {
        $popup.remove();
      }

      if (appendToBody) {
        angular.element($window).unbind('resize', fireRecalculating);
        $document.find('body').unbind('scroll', fireRecalculating);
      }
      // Prevent jQuery cache memory leak
      popUpEl.remove();
    });

    var $popup = $compile(popUpEl)(scope);

    if (appendToBody) {
      $document.find('body').append($popup);
    } else if (appendToElementId !== false) {
      angular.element($document[0].getElementById(appendToElementId)).append($popup);
    } else {
      element.after($popup);
    }

    this.init = function(_modelCtrl, _ngModelOptions) {
      modelCtrl = _modelCtrl;
      ngModelOptions = _ngModelOptions;

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function(inputValue) {
        hasFocus = true;

        if (minLength === 0 || inputValue && inputValue.length >= minLength) {
          if (waitTime > 0) {
            cancelPreviousTimeout();
            scheduleSearchWithTimeout(inputValue);
          } else {
            getMatchesAsync(inputValue);
          }
        } else {
          isLoadingSetter(originalScope, false);
          cancelPreviousTimeout();
          resetMatches();
        }

        if (isEditable) {
          return inputValue;
        } else {
          if (!inputValue) {
            // Reset in case user had typed something previously.
            modelCtrl.$setValidity('editable', true);
            return null;
          } else {
            modelCtrl.$setValidity('editable', false);
            return undefined;
          }
        }
      });

      modelCtrl.$formatters.push(function(modelValue) {
        var candidateViewValue, emptyViewValue;
        var locals = {};

        // The validity may be set to false via $parsers (see above) if
        // the model is restricted to selected values. If the model
        // is set manually it is considered to be valid.
        if (!isEditable) {
          modelCtrl.$setValidity('editable', true);
        }

        if (inputFormatter) {
          locals.$model = modelValue;
          return inputFormatter(originalScope, locals);
        } else {
          //it might happen that we don't have enough info to properly render input value
          //we need to check for this situation and simply return model value if we can't apply custom formatting
          locals[parserResult.itemName] = modelValue;
          candidateViewValue = parserResult.viewMapper(originalScope, locals);
          locals[parserResult.itemName] = undefined;
          emptyViewValue = parserResult.viewMapper(originalScope, locals);

          return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
        }
      });
    };
  }])

  .directive('euiTypeahead', function() {
    return {
      controller: 'euiTypeaheadController',
      require: ['ngModel', '^?ngModelOptions', 'euiTypeahead'],
      link: function(originalScope, element, attrs, ctrls) {
        ctrls[2].init(ctrls[0], ctrls[1]);
      }
    };
  })

  .directive('euiTypeaheadPopup', function() {
    return {
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '&',
        moveInProgress: '=',
        select: '&'
      },
      replace: true,
      templateUrl: function(element, attrs) {
        return attrs.popupTemplateUrl || 'template/typeahead/typeahead-popup.html';
      },
      link: function(scope, element, attrs) {
        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function() {
          return scope.matches.length > 0;
        };

        scope.isActive = function(matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function(matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function(activeIdx) {
          scope.select({activeIdx:activeIdx});
        };
      }
    };
  })

  .directive('euiTypeaheadMatch', ['$templateRequest', '$compile', '$parse', function($templateRequest, $compile, $parse) {
    return {
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link:function(scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
        $templateRequest(tplUrl).then(function(tplContent) {
          $compile(tplContent.trim())(scope, function(clonedElement) {
            element.replaceWith(clonedElement);
          });
        });
      }
    };
  }])

  .filter('euiTypeaheadHighlight', ['$sce', '$injector', '$log', function($sce, $injector, $log) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp(queryToEscape) {
      // Regex: capture the whole query string and replace it with the string that will be used to match
      // the results, for example if the capture is "a" the result will be \a
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
    }

    return function(matchItem, query) {
      if (!isSanitizePresent && containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }
      matchItem = query? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
      if (!isSanitizePresent) {
        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }
      return matchItem;
    };
  }]);

/* Deprecated typeahead below */
  
angular.module('eui.typeahead')
  .value('$typeaheadSuppressWarning', false)
  .service('typeaheadParser', ['$parse', 'euiTypeaheadParser', '$log', '$typeaheadSuppressWarning', function($parse, euiTypeaheadParser, $log, $typeaheadSuppressWarning) {
    if (!$typeaheadSuppressWarning) {
      $log.warn('typeaheadParser is now deprecated. Use euiTypeaheadParser instead.');
    }

    return euiTypeaheadParser;
  }])

  .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$window', '$rootScope', '$euiPosition', 'typeaheadParser', '$log', '$typeaheadSuppressWarning',
    function($compile, $parse, $q, $timeout, $document, $window, $rootScope, $position, typeaheadParser, $log, $typeaheadSuppressWarning) {
    var HOT_KEYS = [9, 13, 27, 38, 40];
    var eventDebounceTime = 200;
    return {
      require: ['ngModel', '^?ngModelOptions'],
      link: function(originalScope, element, attrs, ctrls) {
        if (!$typeaheadSuppressWarning) {
          $log.warn('typeahead is now deprecated. Use eui-typeahead instead.');
        }
        var modelCtrl = ctrls[0];
        var ngModelOptions = ctrls[1];
        //SUPPORTED ATTRIBUTES (OPTIONS)

        //minimal no of characters that needs to be entered before typeahead kicks-in
        var minLength = originalScope.$eval(attrs.typeaheadMinLength);
        if (!minLength && minLength !== 0) {
          minLength = 1;
        }

        //minimal wait time after last character typed before typeahead kicks-in
        var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

        //should it restrict model values to the ones selected from the popup only?
        var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

        //binding to a variable that indicates if matches are being retrieved asynchronously
        var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

        //a callback executed when a match is selected
        var onSelectCallback = $parse(attrs.typeaheadOnSelect);

        //should it select highlighted popup value when losing focus?
        var isSelectOnBlur = angular.isDefined(attrs.typeaheadSelectOnBlur) ? originalScope.$eval(attrs.typeaheadSelectOnBlur) : false;

        //binding to a variable that indicates if there were no results after the query is completed
        var isNoResultsSetter = $parse(attrs.typeaheadNoResults).assign || angular.noop;

        var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

        var appendToBody =  attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

        var appendToElementId =  attrs.typeaheadAppendToElementId || false;

        var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

        //If input matches an item of the list exactly, select it automatically
        var selectOnExact = attrs.typeaheadSelectOnExact ? originalScope.$eval(attrs.typeaheadSelectOnExact) : false;

        //INTERNAL VARIABLES

        //model setter executed upon match selection
        var parsedModel = $parse(attrs.ngModel);
        var invokeModelSetter = $parse(attrs.ngModel + '($$$p)');
        var $setModelValue = function(scope, newValue) {
          if (angular.isFunction(parsedModel(originalScope)) &&
            ngModelOptions && ngModelOptions.$options && ngModelOptions.$options.getterSetter) {
            return invokeModelSetter(scope, {$$$p: newValue});
          } else {
            return parsedModel.assign(scope, newValue);
          }
        };

        //expressions used by typeahead
        var parserResult = typeaheadParser.parse(attrs.typeahead);

        var hasFocus;

        //Used to avoid bug in iOS webview where iOS keyboard does not fire
        //mousedown & mouseup events
        //Issue #3699
        var selected;

        //create a child scope for the typeahead directive so we are not polluting original scope
        //with typeahead-specific data (matches, query etc.)
        var scope = originalScope.$new();
        var offDestroy = originalScope.$on('$destroy', function() {
			    scope.$destroy();
        });
        scope.$on('$destroy', offDestroy);

        // WAI-ARIA
        var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
        element.attr({
          'aria-autocomplete': 'list',
          'aria-expanded': false,
          'aria-owns': popupId
        });

        //pop-up element used to display matches
        var popUpEl = angular.element('<div typeahead-popup></div>');
        popUpEl.attr({
          id: popupId,
          matches: 'matches',
          active: 'activeIdx',
          select: 'select(activeIdx)',
          'move-in-progress': 'moveInProgress',
          query: 'query',
          position: 'position'
        });
        //custom item template
        if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
          popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
        }

        if (angular.isDefined(attrs.typeaheadPopupTemplateUrl)) {
          popUpEl.attr('popup-template-url', attrs.typeaheadPopupTemplateUrl);
        }

        var resetMatches = function() {
          scope.matches = [];
          scope.activeIdx = -1;
          element.attr('aria-expanded', false);
        };

        var getMatchId = function(index) {
          return popupId + '-option-' + index;
        };

        // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
        // This attribute is added or removed automatically when the `activeIdx` changes.
        scope.$watch('activeIdx', function(index) {
          if (index < 0) {
            element.removeAttr('aria-activedescendant');
          } else {
            element.attr('aria-activedescendant', getMatchId(index));
          }
        });

        var inputIsExactMatch = function(inputValue, index) {
          if (scope.matches.length > index && inputValue) {
            return inputValue.toUpperCase() === scope.matches[index].label.toUpperCase();
          }

          return false;
        };

        var getMatchesAsync = function(inputValue) {
          var locals = {$viewValue: inputValue};
          isLoadingSetter(originalScope, true);
          isNoResultsSetter(originalScope, false);
          $q.when(parserResult.source(originalScope, locals)).then(function(matches) {
            //it might happen that several async queries were in progress if a user were typing fast
            //but we are interested only in responses that correspond to the current view value
            var onCurrentRequest = (inputValue === modelCtrl.$viewValue);
            if (onCurrentRequest && hasFocus) {
              if (matches && matches.length > 0) {
                scope.activeIdx = focusFirst ? 0 : -1;
                isNoResultsSetter(originalScope, false);
                scope.matches.length = 0;

                //transform labels
                for (var i = 0; i < matches.length; i++) {
                  locals[parserResult.itemName] = matches[i];
                  scope.matches.push({
                    id: getMatchId(i),
                    label: parserResult.viewMapper(scope, locals),
                    model: matches[i]
                  });
                }

                scope.query = inputValue;
                //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                //due to other elements being rendered
                recalculatePosition();

                element.attr('aria-expanded', true);

                //Select the single remaining option if user input matches
                if (selectOnExact && scope.matches.length === 1 && inputIsExactMatch(inputValue, 0)) {
                  scope.select(0);
                }
              } else {
                resetMatches();
                isNoResultsSetter(originalScope, true);
              }
            }
            if (onCurrentRequest) {
              isLoadingSetter(originalScope, false);
            }
          }, function() {
            resetMatches();
            isLoadingSetter(originalScope, false);
            isNoResultsSetter(originalScope, true);
          });
        };

        // bind events only if appendToBody params exist - performance feature
        if (appendToBody) {
          angular.element($window).bind('resize', fireRecalculating);
          $document.find('body').bind('scroll', fireRecalculating);
        }

        // Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
        var timeoutEventPromise;

        // Default progress type
        scope.moveInProgress = false;

        function fireRecalculating() {
          if (!scope.moveInProgress) {
            scope.moveInProgress = true;
            scope.$digest();
          }

          // Cancel previous timeout
          if (timeoutEventPromise) {
            $timeout.cancel(timeoutEventPromise);
          }

          // Debounced executing recalculate after events fired
          timeoutEventPromise = $timeout(function() {
            // if popup is visible
            if (scope.matches.length) {
              recalculatePosition();
            }

            scope.moveInProgress = false;
          }, eventDebounceTime);
        }

        // recalculate actual position and set new values to scope
        // after digest loop is popup in right position
        function recalculatePosition() {
          scope.position = appendToBody ? $position.offset(element) : $position.position(element);
          scope.position.top += element.prop('offsetHeight');
        }

        resetMatches();

        //we need to propagate user's query so we can higlight matches
        scope.query = undefined;

        //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
        var timeoutPromise;

        var scheduleSearchWithTimeout = function(inputValue) {
          timeoutPromise = $timeout(function() {
            getMatchesAsync(inputValue);
          }, waitTime);
        };

        var cancelPreviousTimeout = function() {
          if (timeoutPromise) {
            $timeout.cancel(timeoutPromise);
          }
        };

        //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
        //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
        modelCtrl.$parsers.unshift(function(inputValue) {
          hasFocus = true;

          if (minLength === 0 || inputValue && inputValue.length >= minLength) {
            if (waitTime > 0) {
              cancelPreviousTimeout();
              scheduleSearchWithTimeout(inputValue);
            } else {
              getMatchesAsync(inputValue);
            }
          } else {
            isLoadingSetter(originalScope, false);
            cancelPreviousTimeout();
            resetMatches();
          }

          if (isEditable) {
            return inputValue;
          } else {
            if (!inputValue) {
              // Reset in case user had typed something previously.
              modelCtrl.$setValidity('editable', true);
              return null;
            } else {
              modelCtrl.$setValidity('editable', false);
              return undefined;
            }
          }
        });

        modelCtrl.$formatters.push(function(modelValue) {
          var candidateViewValue, emptyViewValue;
          var locals = {};

          // The validity may be set to false via $parsers (see above) if
          // the model is restricted to selected values. If the model
          // is set manually it is considered to be valid.
          if (!isEditable) {
            modelCtrl.$setValidity('editable', true);
          }

          if (inputFormatter) {
            locals.$model = modelValue;
            return inputFormatter(originalScope, locals);
          } else {
            //it might happen that we don't have enough info to properly render input value
            //we need to check for this situation and simply return model value if we can't apply custom formatting
            locals[parserResult.itemName] = modelValue;
            candidateViewValue = parserResult.viewMapper(originalScope, locals);
            locals[parserResult.itemName] = undefined;
            emptyViewValue = parserResult.viewMapper(originalScope, locals);

            return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
          }
        });

        scope.select = function(activeIdx) {
          //called from within the $digest() cycle
          var locals = {};
          var model, item;

          selected = true;
          locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
          model = parserResult.modelMapper(originalScope, locals);
          $setModelValue(originalScope, model);
          modelCtrl.$setValidity('editable', true);
          modelCtrl.$setValidity('parse', true);

          onSelectCallback(originalScope, {
            $item: item,
            $model: model,
            $label: parserResult.viewMapper(originalScope, locals)
          });

          resetMatches();

          //return focus to the input element if a match was selected via a mouse click event
          // use timeout to avoid $rootScope:inprog error
          if (scope.$eval(attrs.typeaheadFocusOnSelect) !== false) {
            $timeout(function() { element[0].focus(); }, 0, false);
          }
        };

        //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
        element.bind('keydown', function(evt) {
          //typeahead is open and an "interesting" key was pressed
          if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
            return;
          }

          // if there's nothing selected (i.e. focusFirst) and enter or tab is hit, clear the results
          if (scope.activeIdx === -1 && (evt.which === 9 || evt.which === 13)) {
            resetMatches();
            scope.$digest();
            return;
          }

          evt.preventDefault();

          if (evt.which === 40) {
            scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
            scope.$digest();
          } else if (evt.which === 38) {
            scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
            scope.$digest();
          } else if (evt.which === 13 || evt.which === 9) {
            scope.$apply(function () {
              scope.select(scope.activeIdx);
            });
          } else if (evt.which === 27) {
            evt.stopPropagation();

            resetMatches();
            scope.$digest();
          }
        });

        element.bind('blur', function() {
          if (isSelectOnBlur && scope.matches.length && scope.activeIdx !== -1 && !selected) {
            selected = true;
            scope.$apply(function() {
              scope.select(scope.activeIdx);
            });
          }
          hasFocus = false;
          selected = false;
        });

        // Keep reference to click handler to unbind it.
        var dismissClickHandler = function(evt) {
          // Issue #3973
          // Firefox treats right click as a click on document
          if (element[0] !== evt.target && evt.which !== 3 && scope.matches.length !== 0) {
            resetMatches();
            if (!$rootScope.$$phase) {
              scope.$digest();
            }
          }
        };

        $document.bind('click', dismissClickHandler);

        originalScope.$on('$destroy', function() {
          $document.unbind('click', dismissClickHandler);
          if (appendToBody || appendToElementId) {
            $popup.remove();
          }

          if (appendToBody) {
            angular.element($window).unbind('resize', fireRecalculating);
            $document.find('body').unbind('scroll', fireRecalculating);
          }
          // Prevent jQuery cache memory leak
          popUpEl.remove();
        });

        var $popup = $compile(popUpEl)(scope);

        if (appendToBody) {
          $document.find('body').append($popup);
        } else if (appendToElementId !== false) {
          angular.element($document[0].getElementById(appendToElementId)).append($popup);
        } else {
          element.after($popup);
        }
      }
    };
  }])
  
  .directive('typeaheadPopup', ['$typeaheadSuppressWarning', '$log', function($typeaheadSuppressWarning, $log) {
    return {
      scope: {
        matches: '=',
        query: '=',
        active: '=',
        position: '&',
        moveInProgress: '=',
        select: '&'
      },
      replace: true,
      templateUrl: function(element, attrs) {
        return attrs.popupTemplateUrl || 'template/typeahead/typeahead-popup.html';
      },
      link: function(scope, element, attrs) {
        
        if (!$typeaheadSuppressWarning) {
          $log.warn('typeahead-popup is now deprecated. Use eui-typeahead-popup instead.');
        }
        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function() {
          return scope.matches.length > 0;
        };

        scope.isActive = function(matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function(matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function(activeIdx) {
          scope.select({activeIdx:activeIdx});
        };
      }
    };
  }])
  
  .directive('typeaheadMatch', ['$templateRequest', '$compile', '$parse', '$typeaheadSuppressWarning', '$log', function($templateRequest, $compile, $parse, $typeaheadSuppressWarning, $log) {
    return {
      restrict: 'EA',
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link:function(scope, element, attrs) {
        if (!$typeaheadSuppressWarning) {
          $log.warn('typeahead-match is now deprecated. Use eui-typeahead-match instead.');
        }

        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
        $templateRequest(tplUrl).then(function(tplContent) {
          $compile(tplContent.trim())(scope, function(clonedElement) {
            element.replaceWith(clonedElement);
          });
        });
      }
    };
  }])
  
  .filter('typeaheadHighlight', ['$sce', '$injector', '$log', '$typeaheadSuppressWarning', function($sce, $injector, $log, $typeaheadSuppressWarning) {
    var isSanitizePresent;
    isSanitizePresent = $injector.has('$sanitize');

    function escapeRegexp(queryToEscape) {
      // Regex: capture the whole query string and replace it with the string that will be used to match
      // the results, for example if the capture is "a" the result will be \a
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    function containsHtml(matchItem) {
      return /<.*>/g.test(matchItem);
    }

    return function(matchItem, query) {
      if (!$typeaheadSuppressWarning) {
        $log.warn('typeaheadHighlight is now deprecated. Use euiTypeaheadHighlight instead.');
      }

      if (!isSanitizePresent && containsHtml(matchItem)) {
        $log.warn('Unsafe use of typeahead please use ngSanitize'); // Warn the user about the danger
      }

      matchItem = query? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem; // Replaces the capture string with a the same string inside of a "strong" tag
      if (!isSanitizePresent) {
        matchItem = $sce.trustAsHtml(matchItem); // If $sanitize is not present we pack the string in a $sce object for the ng-bind-html directive
      }

      return matchItem;
    };
  }]);

angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"panel {{panelClass || 'panel-default'}}\">\n" +
    "    <div class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\n" +
    "        <h4 class=\"panel-title\">\n" +
    "            <a href tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\"\n" +
    "               eui-accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
    "        </h4>\n" +
    "    </div>\n" +
    "    <div class=\"panel-collapse collapse\" eui-collapse=\"!isOpen\">\n" +
    "        <div class=\"panel-body\" ng-transclude></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion.html",
    "<div class=\"panel-group\" ng-transclude></div>");
}]);

angular.module("template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/alert/alert.html",
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning'), closeable ? 'alert-dismissible' : null]\" role=\"alert\">\n" +
    "    <button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "        <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/block/block.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/block/block.html",
    "<div class=\"eui-block\" >\n" +
    "    <div class=\"title\">{{title}}</div>\n" +
    "    <div></div>\n" +
    "</div>");
}]);

angular.module("template/button/button.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/button/button.html",
    "<a class=\"eui-button\">\n" +
    "    <span class=\"eui-button-text\"></span>\n" +
    "    <span class=\"eui-button-allow eui-button-menu\" style=\"display: none\"></span>\n" +
    "</a>");
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/carousel.html",
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\">\n" +
    "  <div class=\"carousel-inner\" ng-transclude></div>\n" +
    "  <a role=\"button\" href class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\">\n" +
    "    <span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "    <span class=\"sr-only\">previous</span>\n" +
    "  </a>\n" +
    "  <a role=\"button\" href class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\">\n" +
    "    <span aria-hidden=\"true\" class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "    <span class=\"sr-only\">next</span>\n" +
    "  </a>\n" +
    "  <ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
    "    <li ng-repeat=\"slide in slides | orderBy:indexOfSlide track by $index\" ng-class=\"{ active: isActive(slide) }\" ng-click=\"select(slide)\">\n" +
    "      <span class=\"sr-only\">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if=\"isActive(slide)\">, currently active</span></span>\n" +
    "    </li>\n" +
    "  </ol>\n" +
    "</div>");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/slide.html",
    "<div ng-class=\"{\n" +
    "    'active': active\n" +
    "  }\" class=\"item text-center\" ng-transclude></div>\n" +
    "");
}]);

angular.module("template/checkbox/checkbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/checkbox/checkbox.html",
    "<div ng-style=\"checkboxStyle\">\n" +
    "    <div ng-repeat=\"row in data track by row.value\">\n" +
    "        <label ng-click=\"getCheckedRows()\">\n" +
    "\n" +
    "            <!--<label for={{row.uuid}} ng-show=\"row.show\">{{row.llabel}}</label>-->\n" +
    "\n" +
    "            <input class={{styletype}} type=\"checkbox\" id={{row.uuid}} ng-show=\"row.show\"\n" +
    "                    ng-disabled=row.disabled value={{row.value}} ng-model=\"row.checked\">\n" +
    "            <label for={{row.uuid}} ng-show=\"row.show\">{{row.label}}</label>\n" +
    "\n" +
    "            <!--{{row.llabel}}\n" +
    "            <input type=\"checkbox\" value={{row.value}} ng-model=\"row.checked\"/>\n" +
    "            {{row.rlabel}}-->\n" +
    "        </label>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("template/combo/combo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/combo/combo.html",
    "<span class=\"eui-buttonedit\" ng-style=\"inputStyle\">\n" +
    "    <a class=\"eui-buttonedit-border\">\n" +
    "        <input type=\"text\" class=\"eui-buttonedit-input\" autocomplete=\"off\" ng-model=\"combo.text\"  ng-disabled= inputDisabled >\n" +
    "        <span class=\"eui-buttonedit-buttons\" ng-click=\"onButtonClick($event)\">\n" +
    "            <span ng-style=\"buttonStyle\"></span>\n" +
    "        </span>\n" +
    "    </a>\n" +
    "</span>\n" +
    "");
}]);

angular.module("template/comboCheckbox/comboCheckbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/comboCheckbox/comboCheckbox.html",
    "<div style=\"position: relative\">\n" +
    "    <eui-combo width=\"comboWidth\" height=\"comboHeight\" on-click=\"onClick()\" combo= \"combo\"\n" +
    "           icon-cls=\"eui-icon-dropDownArrow\" disabled=disabled input-disabled = \"true\" ng-click=\"clickCombo($event)\"></eui-combo>\n" +
    "    <div class=\"eui-panel\" ng-style=\"panelStyle\" style=\"z-index: 500\">\n" +
    "        <div class=\"eui-combo-panel\" ng-style=\"comboStyle\" >\n" +
    "            <div ng-repeat=\"row in selectData track by $index\" ng-click=\"select(row, $index, $event)\"\n" +
    "                 class=\"eui-combobox-item {{row.style}}\">{{row.name}}</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/tree/tree.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/tree.html",
    "<ul class=\"nav nav-list nav-pills nav-stacked eui-tree\">\n" +
    "    <li eui-right-menu menu-target='{{menuTarget}}' ng-repeat=\"row in tree_rows | filter:{visible:true} track by row.branch.uid\"\n" +
    "        ng-animate=\"'eui-tree-animate'\" ng-class=\"'level-' + {{ row.level }} + (row.branch.selected ? ' active':'')\"\n" +
    "        class=\"eui-tree-row\">\n" +
    "        <div ng-class=\"{'eui-tree-selectedBg': row.branch.labelSelected}\" style=\"margin: 0 5px;\"\n" +
    "             ng-mouseover=\"user_mouseover_branch($event, row.branch)\"\n" +
    "             ng-right-click=\"user_right_click($event, row.branch)\"\n" +
    "             ng-click=\"user_clicks_branch($event,row.branch)\" ng-dblclick=\"user_dbclick_branch(row.branch)\">\n" +
    "            <i ng-class=\"row.treeIcon\" ng-click=\"expanded($event,row)\" class=\"indented tree-icon\"> </i>\n" +
    "            <i ng-class=\"row.branchIcon\" class=\"indented\" style=\"position: relative;top:1px;\"></i>\n" +
    "            <!--<input type=\"checkbox\" ng-model=\"row.branch.selected\" class=\"indented\" ng-click=\"user_select($event,row.branch)\"-->\n" +
    "                   <!--ng-show=\"showCheckBox\">-->\n" +
    "            <span class=\"indented eui-tree-checkbox\" ng-class=\"row.checkboxIcon\"\n" +
    "                  ng-click=\"user_select($event,row.branch)\" ng-show=\"showCheckBox\"></span>\n" +
    "            <!--<span class=\"indented tree-label\">{{ row.label }} </span>-->    <!--原码-->\n" +
    "\n" +
    "            <!--\n" +
    "            修改：自定义HTML标签\n" +
    "            周艳平：2016年11月15日15:44:29\n" +
    "            -->\n" +
    "            <span class=\"indented tree-label\" data-ng-bind-html=\"row.fmtlabel\"></span>\n" +
    "            <!--<span class=\"indented tree-label\" ng-bind-html=\"data1\"></span>-->\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/comboTree/comboTree.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/comboTree/comboTree.html",
    "<div style=\"position: relative\">\n" +
    "    <eui-combo width=\"comboWidth\" height=\"comboHeight\" on-click=\"onClick()\" text-value= \"textValue\"\n" +
    "           icon-cls=\"eui-icon-dropDownArrow\" disabled=disabled input-disabled = \"true\" ng-click=\"clickCombo($event)\"></eui-combo>\n" +
    "    <div class=\"eui-panel\" ng-style=\"panelStyle\" style=\"z-index: 500\">\n" +
    "        <div class=\"eui-combo-panel\">\n" +
    "            <eui-tree ng-style=\"treeStyle\"\n" +
    "                tree-data=\"treeData\"\n" +
    "                tree-options = \"options\"\n" +
    "                tree-control=\"treeControl\"></eui-tree>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/customnav/customnav.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/customnav/customnav.html",
    "<div style=\"position: absolute;\">\n" +
    "  <div style=\"float: left;width: {{totalWidth}}px;overflow: hidden;\"><ul>\n" +
    "    <ui ng-repeat=\"nav in showItems\" class=\"customnav-item\" style=\"width: {{itemWidth}}px;\">{{nav.title}}<div ng-click=\"selectItem(nav)\" ng-class=\"isOpen ? (nav.selected ? 'select' : 'no-select') : 'no-select'\"></div></ui>\n" +
    "  </ul></div>\n" +
    "  <div style=\"float: left;\">\n" +
    "    <span class=\"glyphicon glyphicon-option-horizontal\" ng-click=\"moveToggle()\" style=\"font-size: 30px;top: 10px;cursor: pointer;\"></span>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<div ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\">\n" +
    "  <eui-daypicker ng-switch-when=\"day\" tabindex=\"0\"></eui-daypicker>\n" +
    "  <eui-monthpicker ng-switch-when=\"month\" tabindex=\"0\"></eui-monthpicker>\n" +
    "  <eui-yearpicker ng-switch-when=\"year\" tabindex=\"0\"></eui-yearpicker>\n" +
    "</div>");
}]);

angular.module("template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/day.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{::5 + showWeeks}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th ng-if=\"showWeeks\" class=\"text-center\"></th>\n" +
    "      <th ng-repeat=\"label in ::labels track by $index\" class=\"text-center\"><small aria-label=\"{{::label.full}}\">{{::label.abbr}}</small></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-if=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-muted': dt.secondary, 'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/month.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/popup.html",
    "<ul class=\"dropdown-menu\" dropdown-nested ng-if=\"isOpen\" style=\"display: block\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
    "	<li ng-transclude></li>\n" +
    "	<li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "		<span class=\"btn-group pull-left\">\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    "		</span>\n" +
    "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    "	</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/year.html",
    "<table role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"3\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{::dt.uid}}\" ng-class=\"::dt.customClass\">\n" +
    "        <button type=\"button\" style=\"min-width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div eui-modal-animation-class=\"fade\"\n" +
    "     modal-in-class=\"in\"\n" +
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +
    "></div>\n" +
    "");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal\"\n" +
    "     eui-modal-animation-class=\"fade\"\n" +
    "     modal-in-class=\"in\"\n" +
    "     ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"size ? 'modal-' + size : ''\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <button ng-show=\"showClose\" type=\"button\" class=\"close\" ng-click=\"close($event)\"\n" +
    "                        data-dismiss=\"modal\" style=\"position: absolute;font-size: 16px;right: 10px;top: 2px;\n" +
    "                        width: 25px;height: 25px;color: rgb(84, 174, 204);\">\n" +
    "                    <span aria-hidden=\"true\" style=\"font-family: cursive;font-weight: bold;color: #294358;\">X</span>\n" +
    "                    <span class=\"sr-only\">Close</span>\n" +
    "                </button>\n" +
    "                <h2 class=\"modal-title\" ng-mousedown=\"mousedown($event)\" style=\"display: block;\">{{title}}</h2>\n" +
    "            </div>\n" +
    "            <div eui-modal-transclude style=\"/*background-color: #fff;*/\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/window/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/window/window.html",
    "<div window-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal window fade\"\n" +
    "     ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + openOffset, display: 'block'}\">\n" +
    "    <div class=\"modal-content\">\n" +
    "        <div class=\"eui-window-header\">\n" +
    "            <!--<span class=\"mini-tools\">-->\n" +
    "                <!--<span class=\"mini-tools-min\" ng-show=\"icon.min\"  ng-click=\"minWindow()\"></span>-->\n" +
    "                <!--<span class=\"mini-tools-max\" ng-show=\"icon.max\" ng-click=\"maxWindow()\"></span>-->\n" +
    "                <!--<span class=\"mini-tools-close\" ng-show=\"icon.close\" ng-click=\"close($event)\"></span>-->\n" +
    "            <!--</span>-->\n" +
    "            <span class=\"eui-window-tools\">\n" +
    "                <span class=\"eui-window-tools-min\" ng-show=\"icon.max\" title=\"最小化\" ng-click=\"minWindow()\"></span>\n" +
    "                <span class=\"eui-window-tools-max\" ng-show=\"icon.max\" title=\"最大化\" ng-click=\"maxWindow()\"></span>\n" +
    "                <span class=\"eui-window-tools-close\" ng-show=\"icon.close\" title=\"关闭\" ng-click=\"close($event)\"></span>\n" +
    "            </span>\n" +
    "            <span class=\"modal-title\" ng-mousedown=\"mousedown($event)\" style=\"display: block;\">{{title}}　</span>\n" +
    "        </div>\n" +
    "        <div window-transclude style=\"padding: 10px;background-color: #fff;border-top: 1px solid #d1d1d1;\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/fieldset/fieldset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/fieldset/fieldset.html",
    "<div class=\"field-set-pane\">\n" +
    "    <fieldset class=\"fieldset\" ng-class='{hideFieldset: !isShow}'>\n" +
    "        <legend>\n" +
    "            <!--<label>\n" +
    "                <input class=\"field-set-checkbox\" ng-click=\"toggleOpen()\" ng-checked='isShow' type=\"checkbox\"/>\n" +
    "                {{label}}\n" +
    "            </label>-->\n" +
    "            <input class=\"eui-fieldset-checkbox\" type=\"checkbox\" id=\"{{uuid}}\" ng-checked='isShow'\n" +
    "                   ng-disabled=disabled ng-click=\"toggleOpen()\" >\n" +
    "            <label for=\"{{uuid}}\" >{{label}}</label>\n" +
    "        </legend>\n" +
    "        <div ng-show=\"isShow\"></div>\n" +
    "    </fieldset>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/fileupload/fileupload.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/fileupload/fileupload.html",
    "<div>\n" +
    "  <div>\n" +
    "    <p>选择上传文件(可多选)</p>\n" +
    "    <input class=\"btn btn-default btn-sm\" type=\"file\" multiple id=\"fileToUpload\"\n" +
    "           style=\"display: inline;float: left;height: 30px;\"/>\n" +
    "    <input class=\"btn btn-default btn-sm\" type=\"button\" ng-click=\"uploadFile()\"\n" +
    "           ng-disabled=\"upload_disabled\" value=\"上传\" style=\"display: inline;float: left;\"/>\n" +
    "  </div>\n" +
    "  <div style=\"height: 300px;overflow-y: auto;\">\n" +
    "    <div ng-repeat=\"file in files\">\n" +
    "      <div id=\"fileInfo\">{{file.fileName}},&nbsp;&nbsp;{{file.fileSizeC}}</div>\n" +
    "      <div class=\"progress\" style=\"display: inline;float: left;width: 100%;\">\n" +
    "        <div class=\"progress-bar progress-bar-info\" role=\"progressbar\"\n" +
    "             aria-valuenow=\"{{file.percentComplete}}\" aria-valuemin=\"0\" aria-valuemax=\"100\"\n" +
    "             style=\"width: {{file.percentComplete}}%;\">\n" +
    "          {{file.percentComplete}}%\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/grid/grid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/grid.html",
    "<div class=\"panel datagrid\" ng-style=\"gridStyle.panel\">\n" +
    "    <div class=\"panel-header\" style=\"width: 100%;\" ng-show=\"gridOptions.title\">\n" +
    "        <div class=\"panel-title\">{{gridOptions.title}}</div>\n" +
    "        <div class=\"panel-tool\" ng-click=\"showPanel()\"><a class=\"panel-tool-collapse\"></a></div>\n" +
    "    </div>\n" +
    "    <div class=\"datagrid-wrap panel-body panel-body-noheader\" title=\"\" ng-style=\"gridStyle.datagridWrap\">\n" +
    "        <div class=\"datagrid-view\" ng-style=\"gridStyle.datagridView\">\n" +
    "            <div class=\"datagrid-view1\" ng-style=\"gridStyle.datagridView1\">\n" +
    "                <div class=\"datagrid-header\" ng-style=\"gridStyle.datagridView1head\">\n" +
    "                    <div class=\"datagrid-header-inner\" ng-show=\"gridOptions.showHeader\">\n" +
    "                        <table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" ng-style=\"gridStyle.datagridView1htable\">\n" +
    "                            <tbody>\n" +
    "                            <tr class=\"datagrid-header-row\" ng-repeat=\"frozenColumns in frozenColumnsRows\">\n" +
    "                                <td ng-show=\"frozenColumnsRows.rownumbers\" rowspan=\"1\" class=\"datagrid-td-rownumber\"><div class=\"datagrid-header-rownumber\"></div></td>\n" +
    "                                <td ng-show=\"frozenColumnsRows.checkbox\">\n" +
    "                                    <div class=\"datagrid-header-check\">\n" +
    "                                        <input type=\"checkbox\" ng-click=\"checkBoxSelect($event, frozenColumnsRows.checked)\" ng-model=\"frozenColumnsRows.checked\">\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                                <td ng-repeat=\"column in frozenColumns track by $index\" field={{column.field}} colspan={{column.colspan}} rowspan={{column.rowspan}}>\n" +
    "                                    <div class=\"datagrid-cell\" ng-style=\"{'width':column.width, 'text-align':column.halign}\">\n" +
    "                                        <span>{{column.title}}</span>\n" +
    "                                        <span class=\"datagrid-sort-icon\">&nbsp;</span>\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"datagrid-body\" ng-style=\"gridStyle.datagridView1body\">\n" +
    "                    <div class=\"datagrid-body-inner\">\n" +
    "                        <table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n" +
    "                            <tbody>\n" +
    "                            <tr ng-repeat=\"row in frozenDataRows\" id={{row.id}} datagrid-row-index={{row.index}}  class=\"datagrid-row\"\n" +
    "                                ng-class=\"{'datagrid-row-alt':row.striped}\" ng-style=\"row.rowStyle\"\n" +
    "                                ng-dblclick=\"bindEvent.bodyDblclick($event, row.index)\" ng-click=\"bindEvent.bodyClick($event,row.index)\"\n" +
    "                                ng-mouseover=\"bindEvent.bodyMouseover($event)\" ng-mouseleave=\"bindEvent.bodyMouseleave($event)\"\n" +
    "                                oncontextmenu=\"bindEvent.bodyContextmenu($event,row.index)\">\n" +
    "                                <td ng-show=\"frozenColumnsRows.rownumbers\" class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">{{row.index + 1}}</div></td>\n" +
    "                                <td ng-show=\"frozenColumnsRows.checkbox\">\n" +
    "                                    <div class=\"datagrid-cell-check \"><input type=\"checkbox\"></div>\n" +
    "                                </td>\n" +
    "                                <td ng-repeat=\"data in row.row\" field={{data.field}} colspan={{data.colspan}} rowspan={{data.rowspan}} ng-class=\"data.tdClass\" ng-style=\"data.style\">\n" +
    "                                    <div style=\"text-align:center;white-space:normal;height:auto;\" class=\"datagrid-cell\"  ng-class=\"data.class\" ng-bind-html=\"data.value\">\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"datagrid-footer\" ng-style=\"gridStyle.datagridView1foot\">\n" +
    "                    <div class=\"datagrid-footer-inner\" style=\"display: none;\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"datagrid-view2\" ng-style=\"gridStyle.datagridView2\">\n" +
    "                <div class=\"datagrid-header\" ng-style=\"gridStyle.datagridView2head\">\n" +
    "                    <div class=\"datagrid-header-inner\"  ng-show=\"gridOptions.showHeader\">\n" +
    "                        <table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" ng-style=\"gridStyle.datagridView2htable\">\n" +
    "                            <tbody>\n" +
    "                            <tr class=\"datagrid-header-row\" ng-repeat=\"columns in columnsRows\">\n" +
    "                                <td ng-show=\"columnsRows.rownumbers\" rowspan=\"1\"><div class=\"datagrid-header-rownumber\"></div></td>\n" +
    "                                <td ng-show=\"columnsRows.checkbox\">\n" +
    "                                    <div class=\"datagrid-header-check\"><input type=\"checkbox\" ng-click=\"bindEvent.headchecked($event, columnsRows.checked)\" ng-model=\"columnsRows.checked\"></div>\n" +
    "                                </td>\n" +
    "                                <td ng-repeat=\"column in columns track by $index\" field={{column.field}} colspan={{column.colspan}} rowspan={{column.rowspan}} ng-hide=\"column.hidden\"\n" +
    "                                    ng-mouseenter=\"bindEvent.headMouseenter($event)\" ng-mouseleave=\"bindEvent.headMouseleave($event)\" oncontextmenu=\"bindEvent.headContextmenu(e)\">\n" +
    "                                    <div class=\"datagrid-cell-group\" ng-show=\"column.group\">{{column.title}}</div>\n" +
    "                                    <div class=\"datagrid-cell\" ng-show=\"!column.group\" ng-style=\"{'width':column.width, 'text-align':column.halign}\" title={{column.tips}}\n" +
    "                                         ng-click=\"bindEvent.headGridcellClick($event)\" ng-dblclick=\"bindEvent.headGridcellDblClick($event)\">\n" +
    "                                        <span dy-compile html=\"{{column.title}}\"></span>\n" +
    "                                        <span class=\"datagrid-sort-icon\">&nbsp;</span>\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"datagrid-body\" ng-style=\"gridStyle.datagridView2body\">\n" +
    "                    <div class=\"datagrid-body-inner\">\n" +
    "                        <table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n" +
    "                            <tbody>\n" +
    "                            <tr ng-repeat=\"row in dataRows\" id={{row.id}} datagrid-row-index={{row.index}}  class=\"datagrid-row\"\n" +
    "                                ng-class=\"{'datagrid-row-alt':row.striped,'datagrid-row-selected':row.selected}\" ng-style=\"row.rowStyle\"\n" +
    "                                ng-dblclick=\"bindEvent.bodyDblclick($event, row.index)\" ng-click=\"bindEvent.bodyClick($event,row.index)\"\n" +
    "                                ng-mouseover=\"bindEvent.bodyMouseover($event)\" ng-mouseleave=\"bindEvent.bodyMouseleave($event)\"\n" +
    "                                oncontextmenu=\"bindEvent.bodyContextmenu($event,row.index)\" >\n" +
    "                                <td ng-show=\"columnsRows.rownumbers\" class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">{{row.index + 1}}</div></td>\n" +
    "                                <td ng-show=\"columnsRows.checkbox\">\n" +
    "                                    <div style=\"\" class=\"datagrid-cell-check\"><input type=\"checkbox\" ng-model=\"row.checked\" ng-click=\"bindEvent.bodyChecked($event, row.checked)\"></div>\n" +
    "                                </td>\n" +
    "                                <td ng-repeat=\"data in row.row\" field={{data.field}} colspan={{data.colspan}} rowspan={{data.rowspan}} ng-class=\"data.tdClass\" ng-style=\"data.style\" ng-hide=\"data.hidden\">\n" +
    "                                    <div style=\"white-space:normal;\" class=\"datagrid-cell\" ng-style=\"{'width':data.width,height:data.height,'text-align':data.align}\" title={{data.tips}}>\n" +
    "                                        <div dy-compile html=\"{{data.value}}\"></div>\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"datagrid-footer\" ng-style=\"gridStyle.datagridView2foot\">\n" +
    "                    <div class=\"datagrid-footer-inner\" style=\"display: none;\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <eui-pagination options = \"pageOptions\" ng-show=\"gridOptions.pagination\"></eui-pagination>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/menus/menuitem.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/menus/menuitem.html",
    "<div class=\"eui-menuitem\" ng-mouseleave=\"mouseleave()\" ng-mouseover=\"mouseover()\">\n" +
    "    <div class=\"eui-menuitem-inner\">\n" +
    "        <span class=\"eui-menuitem-icon\" style=\"display: inline-block\"></span>\n" +
    "        <span class=\"eui-menuitem-text\"><span ng-transclude></span></span>\n" +
    "        <span class=\"eui-menuitem-allow\"></span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("template/menus/menus.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/menus/menus.html",
    "<span style=\"position: relative\">\n" +
    "    <eui-button icon-cls=\"iconCls\" flag=\"true\" enabled=\"enabled\"  plain=\"plain\"\n" +
    "               allow=\"true\" ng-click=\"click($event)\" ng-mouseover=\"mouseover($event)\">{{titleName}}\n" +
    "    </eui-button>\n" +
    "    <span ng-mouseleave=\"mouseleave()\" class=\"eui-menu-border\">\n" +
    "         <span ng-transclude></span>\n" +
    "    </span>\n" +
    "</span>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("template/menus/menusIcon.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/menus/menusIcon.html",
    "<div ng-click=\"options.onClick()\">\n" +
    "    <a>\n" +
    "        <div class=\"boxIcon\"  ng-class=\"options.imageClass\">\n" +
    "            <span class=\"badge\" style=\"margin-left: 25px;background-color: red;\" ng-bind=\"options.mesAmount\" ng-show=\"options.mesShow\"></span>\n" +
    "        </div>\n" +
    "        <div ng-bind=\"options.menusText\"></div>\n" +
    "    </a>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("template/messageBox/alertContent.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/messageBox/alertContent.html",
    "<div class=\"eui_msgbox_alert\">\n" +
    "\n" +
    "  <div style=\"padding: 34px 0px 12px 36px; overflow: auto;\">\n" +
    "    <div class=\"{{type}}-sign\" style=\"float: left;\"></div>\n" +
    "\n" +
    "    <div class=\"eui_msgobx_msg\">{{message}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"showFooter\" class=\"modal-footer\" style=\"text-align: center;\">\n" +
    "    <button class=\"eui_msgbox_btn_ok\" ng-click=\"ok()\" data-dismiss=\"modal\">确定</button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/messageBox/confirmContent.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/messageBox/confirmContent.html",
    "<div>\n" +
    "    <div style=\"padding: 34px 0px 12px 36px; overflow: auto;\">\n" +
    "        <div class=\"{{type}}-sign\" style=\"float: left;\"></div>\n" +
    "\n" +
    "        <div class=\"eui_msgbox_confirm_mgs\">{{message}}\n" +
    "            <br><input type=\"text\" ng-show=\"showInput\" ng-model=\"dataInput\" style=\"width:200px;margin-top:5px;\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-footer\" style=\"text-align: center;\">\n" +
    "        <button class=\"eui_msgbox_btn_ok\" ng-click=\"ok()\">确定</button>\n" +
    "        <button class=\"eui_msgbox_btn_no\" ng-click=\"no()\" ng-show=\"showNo\">否</button>\n" +
    "        <button class=\"eui_msgbox_btn_cancel\" ng-click=\"cancel()\">取消</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pager.html",
    "<ul class=\"pager\">\n" +
    "  <li ng-class=\"{disabled: noPrevious()||ngDisabled, previous: align}\"><a href ng-click=\"selectPage(page - 1, $event)\">{{::getText('previous')}}</a></li>\n" +
    "  <li ng-class=\"{disabled: noNext()||ngDisabled, next: align}\"><a href ng-click=\"selectPage(page + 1, $event)\">{{::getText('next')}}</a></li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pagination.html",
    "<div class=\"datagrid-pager pagination\" ng-style=\"{'width':options.style.width}\" ng-keydown=\"keydown($event)\">\n" +
    "  <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n" +
    "    <tbody>\n" +
    "    <tr>\n" +
    "      <td>\n" +
    "        <select ng-model=\"pageList.pageSize\" style=\"width: 47px;height: 25px;font-size: 12px;\">\n" +
    "          <option ng-repeat=\"option in pageList.list\" value=\"{{option.name}}\">{{option.name}}</option>\n" +
    "        </select>\n" +
    "      </td>\n" +
    "      <td><div class=\"pagination-btn-separator\"></div></td>\n" +
    "      <td>\n" +
    "        <a class=\"l-btn l-btn-small l-btn-plain\" ng-click=\"selectFirstPage()\">\n" +
    "        <span class=\"l-btn-left l-btn-icon-left\">\n" +
    "          <span class=\"l-btn-text l-btn-empty\">&nbsp;</span>\n" +
    "          <span class=\"l-btn-icon pagination-first\">&nbsp;</span></span></a></td>\n" +
    "      <td><a class=\"l-btn l-btn-small l-btn-plain\" ng-click=\"selectPreviousPage()\">\n" +
    "        <span class=\"l-btn-left l-btn-icon-left\">\n" +
    "          <span class=\"l-btn-text l-btn-empty\">&nbsp;</span>\n" +
    "          <span class=\"l-btn-icon pagination-prev\">&nbsp;</span></span></a></td>\n" +
    "      <td><div class=\"pagination-btn-separator\"></div></td>\n" +
    "      <td><span style=\"padding-left:6px;\">第</span></td>\n" +
    "      <td><input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\" ng-model=\"pageData.pageNumber\"></td>\n" +
    "      <td><span style=\"padding-right:6px;\">共{{pageData.totalPage}}页</span></td>\n" +
    "      <td><div class=\"pagination-btn-separator\"></div></td>\n" +
    "      <td><a class=\"l-btn l-btn-small l-btn-plain\" ng-click=\"selectNextPage()\">\n" +
    "        <span class=\"l-btn-left l-btn-icon-left\">\n" +
    "          <span class=\"l-btn-text l-btn-empty\">&nbsp;</span>\n" +
    "          <span class=\"l-btn-icon pagination-next\">&nbsp;</span>\n" +
    "        </span></a></td>\n" +
    "      <td><a class=\"l-btn l-btn-small l-btn-plain\" ng-click=\"selectLastPage()\">\n" +
    "<span class=\"l-btn-left l-btn-icon-left\"><span class=\"l-btn-text l-btn-empty\">&nbsp;</span>\n" +
    "          <span class=\"l-btn-icon pagination-last\">&nbsp;</span></span></a></td>\n" +
    "<td><div class=\"pagination-btn-separator\"></div></td>\n" +
    "<td><a class=\"l-btn l-btn-small l-btn-plain\" ng-click=\"refresh()\" >\n" +
    "        <span class=\"l-btn-left l-btn-icon-left\"><span class=\"l-btn-text l-btn-empty\">&nbsp;</span>\n" +
    "          <span class=\"l-btn-icon pagination-load\">&nbsp;</span></span></a></td></tr>\n" +
    "</tbody></table>\n" +
    "<div class=\"pagination-info\">显示{{pageData.from}}到{{pageData.to}},共{{pageData.total}}记录</div><div style=\"clear:both;\"></div></div>");
}]);

angular.module("template/panel/panel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/panel/panel.html",
    "<div class=\"eui-panel eui-panel-default\" ng-style=\"{'width': width}\">\n" +
    "    <div class=\"eui-panel-title\">\n" +
    "        <span></span>\n" +
    "        {{panelTitle}}\n" +
    "        <span class=\"eui-tools\">\n" +
    "            <span class=\"eui-tools-collapse\" ng-show=\"icon.collapse\" title=\"缩小\" ng-click=\"collapsePanel()\"></span>\n" +
    "            <span class=\"eui-tools-apart\" ng-show=\"icon.apart\"></span>\n" +
    "\n" +
    "            <span class=\"eui-tools-max\" ng-show=\"icon.max\" title=\"最大化\" ng-click=\"changeSizePanel()\"></span>\n" +
    "\n" +
    "            <span class=\"eui-icon-close\" ng-show=\"icon.close\" title=\"关闭\" ng-click=\"closePanel()\"></span>\n" +
    "            <span class=\"eui-icon-add\" ng-show=\"icon.add\" title=\"添加\" ng-click=\"onbuttonclick('add')\"></span>\n" +
    "            <span class=\"eui-icon-edit\" ng-show=\"icon.edit\" title=\"编辑\" ng-click=\"onbuttonclick('edit')\"></span>\n" +
    "            <span class=\"eui-icon-remove\" ng-show=\"icon.remove\" title=\"删除\" ng-click=\"onbuttonclick('remove')\"></span>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <div style=\"display: block\">\n" +
    "        <div class=\"eui-panel-body\" ng-style=\"{'height': height,'overflow': overflow}\">\n" +
    "        </div>\n" +
    "        <div class=\"eui-panel-footer\">{{panelFoot}}</div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-html-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-popup.html",
    "<div\n" +
    "  tooltip-animation-class=\"fade\"\n" +
    "  eui-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind-html=\"contentExp()\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-popup.html",
    "<div\n" +
    "  tooltip-animation-class=\"fade\"\n" +
    "  eui-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-template-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-template-popup.html",
    "<div\n" +
    "  tooltip-animation-class=\"fade\"\n" +
    "  eui-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\"\n" +
    "    eui-tooltip-template-transclude=\"contentExp()\"\n" +
    "    tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/popover/popover-html.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover-html.html",
    "<div tooltip-animation-class=\"fade\"\n" +
    "  eui-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind-html=\"contentExp()\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/popover/popover-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover-template.html",
    "<div tooltip-animation-class=\"fade\"\n" +
    "  eui-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +
    "      <div class=\"popover-content\"\n" +
    "        eui-tooltip-template-transclude=\"contentExp()\"\n" +
    "        tooltip-template-transclude-scope=\"originScope()\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover.html",
    "<div tooltip-animation-class=\"fade\"\n" +
    "  eui-tooltip-classes\n" +
    "  ng-class=\"{ in: isOpen() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-if=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/bar.html",
    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" style=\"min-width: 0;\" ng-transclude></div>\n" +
    "");
}]);

angular.module("template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progress.html",
    "<div class=\"progress\" ng-transclude aria-labelledby=\"{{::title}}\"></div>");
}]);

angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progressbar.html",
    "<div class=\"progress\">\n" +
    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" style=\"min-width: 0;\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/radio/radio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/radio/radio.html",
    "<div ng-style=\"checkboxStyle\">\n" +
    "    <div ng-repeat=\"row in data track by row.value\">\n" +
    "        <label ng-click=\"onChangeRow()\">\n" +
    "\n" +
    "            <!--<label for={{row.uuid}} ng-show=\"row.show\">{{row.llabel}}</label>-->\n" +
    "\n" +
    "            <input class={{styletype}} type=\"radio\" id={{row.uuid}} ng-show=\"row.show\"\n" +
    "                    ng-disabled=row.disabled value={{row.value}} name=\"{{rdName}}\"\n" +
    "                   ng-model=\"row.model\">\n" +
    "            <label for={{row.uuid}} ng-show=\"row.show\">{{row.label}}</label>\n" +
    "\n" +
    "            <!--{{row.left}}\n" +
    "            <input type=\"radio\" ng-model= \"modelName\" value=\"row.value\">\n" +
    "            {{row.right}}<br>-->\n" +
    "        </label>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/rating/rating.html",
    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
    "    <span ng-repeat-start=\"r in range track by $index\" class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
    "    <i ng-repeat-end ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < value && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\" ng-attr-title=\"{{r.title}}\" aria-valuetext=\"{{r.title}}\"></i>\n" +
    "</span>\n" +
    "");
}]);

angular.module("template/scrollbar/scrollbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/scrollbar/scrollbar.html",
    "<div class=\"scrollbar\">\n" +
    "  <div class=\"moreup\" ng-click=\"moreup($event)\"></div>\n" +
    "  <div class=\"custom\">\n" +
    "    <div ng-transclude></div>\n" +
    "  </div>\n" +
    "  <div class=\"moredown\" ng-click=\"moredown($event)\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/scrolltabset/scrolltabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/scrolltabset/scrolltabset.html",
    "<div>\n" +
    "  <div style=\"display: inline-block;\">\n" +
    "    <div style=\"float: left;padding: 4px 1px;cursor: pointer;\" ng-click=\"moreleft()\">\n" +
    "      <img ng-show=\"istabs\" src=\"themes/default/images/tabs/allow_left.gif\"/>\n" +
    "      <img ng-show=\"!istabs\" src=\"themes/default/images/menu/menu_botton_left_a.png\"/>\n" +
    "    </div>\n" +
    "    <div style=\"float: left;width: 90%;overflow: hidden;\">\n" +
    "      <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "    </div>\n" +
    "    <div style=\"float: left;padding: 4px 1px;cursor: pointer;\" ng-click=\"moreright()\">\n" +
    "      <img ng-show=\"istabs\" src=\"themes/default/images/tabs/allow_right.gif\"/>\n" +
    "      <img ng-show=\"!istabs\" src=\"themes/default/images/menu/menu_botton_right_a.png\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\"\n" +
    "         ng-repeat=\"tab in tabs\"\n" +
    "         ng-class=\"{active: tab.active}\"\n" +
    "         scroll-tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a href ng-click=\"select()\" eui-tab-heading-transclude>{{heading}}\n" +
    "    <button ng-show=\"closeable\" type=\"button\" ng-click=\"close($event)\"\n" +
    "      style=\"background: 0 0;border: 0;padding:0px;opacity: .5;\">&times;\n" +
    "    </button>\n" +
    "  </a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div>\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\" \n" +
    "         ng-repeat=\"tab in tabs\" \n" +
    "         ng-class=\"{active: tab.active}\"\n" +
    "         eui-tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/timepicker/timepicker.html",
    "<table>\n" +
    "  <tbody>\n" +
    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
    "      <td><a ng-click=\"incrementHours()\" ng-class=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementHours()\" tabindex=\"{{::tabindex}}\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "      <td>&nbsp;</td>\n" +
    "      <td><a ng-click=\"incrementMinutes()\" ng-class=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noIncrementMinutes()\" tabindex=\"{{::tabindex}}\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "      <td ng-show=\"showMeridian\"></td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <td class=\"form-group\" ng-class=\"{'has-error': invalidHours}\">\n" +
    "        <input style=\"width:50px;\" type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\">\n" +
    "      </td>\n" +
    "      <td>:</td>\n" +
    "      <td class=\"form-group\" ng-class=\"{'has-error': invalidMinutes}\">\n" +
    "        <input style=\"width:50px;\" type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\">\n" +
    "      </td>\n" +
    "      <td ng-show=\"showMeridian\"><button type=\"button\" ng-class=\"{disabled: noToggleMeridian()}\" class=\"btn btn-default text-center\" ng-click=\"toggleMeridian()\" ng-disabled=\"noToggleMeridian()\" tabindex=\"{{::tabindex}}\">{{meridian}}</button></td>\n" +
    "    </tr>\n" +
    "    <tr class=\"text-center\" ng-show=\"::showSpinners\">\n" +
    "      <td><a ng-click=\"decrementHours()\" ng-class=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementHours()\" tabindex=\"{{::tabindex}}\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "      <td>&nbsp;</td>\n" +
    "      <td><a ng-click=\"decrementMinutes()\" ng-class=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\" ng-disabled=\"noDecrementMinutes()\" tabindex=\"{{::tabindex}}\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "      <td ng-show=\"showMeridian\"></td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/timespinner/timespinner.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/timespinner/timespinner.html",
    "<div class=\"t-spinner\" ng-mouseenter=\"showSpinner=true\" ng-mouseleave=\"showSpinner=false\">\n" +
    "  <input class=\"text-center\" ng-model=\"hours\" ng-change=\"updateHours()\" ng-class=\"{'has-error': invalidHours}\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\">\n" +
    "  <span class=\"tm\">:</span>\n" +
    "  <input class=\"text-center\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" ng-class=\"{'has-error': invalidMinutes}\" ng-readonly=\"::readonlyInput\" maxlength=\"2\" tabindex=\"{{::tabindex}}\">\n" +
    "  <span class=\"tm\">:</span>\n" +
    "  <input class=\"text-center\" ng-model=\"seconds\" maxlength=\"2\" disabled=\"\">\n" +
    "  <div ng-show=\"showSpinner\" class=\"spinner\">\n" +
    "    <div class=\"spinner-back\" ng-click=\"incrementVal()\">\n" +
    "      <div class=\"spinner-up\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"spinner-back\" ng-click=\"decrementVal()\">\n" +
    "      <div class=\"spinner-down\"></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-match.html",
    "<a href tabindex=\"-1\" ng-bind-html=\"match.label | euiTypeaheadHighlight:query\"></a>\n" +
    "");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-popup.html",
    "<ul class=\"dropdown-menu\" ng-show=\"isOpen() && !moveInProgress\" ng-style=\"{top: position().top+'px', left: position().left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
    "    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{::match.id}}\">\n" +
    "        <div eui-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module('app', [])
    .run(function() {
    });
/**
 * 文件名：EUI框架扩展文件
 * 创建人：周艳平
 * 创建时间：2016年1月29日10:41:22
 * 修改日志：
 *      修改人：吴睿琪
 *      修改日期：2016年6月20日
 *      修改内容：eui库继承angular库，增加eui库api发布函数
 *
 */
(function (window) {
    var eui = window.eui || (window.eui = {}),
        angular = window.angular;

    if(angular && window.jQuery){
        jQuery.extend(eui,angular);
    } else {
        throw("请先引入angular及jQuery文件！");
    }

    var euiConf = {
        appName : "app",        //默认启动名
        controllerName : "euiController",        //默认控制器名
        svcCallType: 'JSON'             //服务请求类型
    };

    var module = angular.module(euiConf.appName,['eui','util']);

    /*
     * load：EUI框架定义创建默认控制器接口
     * controllerName,controlFun,serviceName, dataCenter
     * */
    function load(controlFun,dataCenter) {
        var controllerName = euiConf.controllerName;
        //加载module
        module.controller(controllerName,
            ['$scope','$timeout', '$info','$euiModal','Server',
                function ($scope, $timeout,$info,$euiModal,Server) {
                    $scope.showPage = false;
                    var messageid = $info.loading("数据加载中, 请稍后 ...", "Loading");
                    var grid,config;
                    $scope.gd_methods = grid = {};
                    $scope.options = dataCenter.options;
                    var context = {
                        dataCenter: '', $scope: $scope, $timeout: $timeout,$info: $info,Server:Server,
                        $euiModal: $euiModal, grid:grid, close:close
                    };
                    if(dataCenter.options.url) {
                        if (dataCenter.options.pagination) {
                            config = {
                               req:{
                                   method: 'POST',
                                   url:dataCenter.options.url,
                                   data: {
                                       queryParams: dataCenter.options.queryParams,
                                       pageNumber: parseInt(dataCenter.options.pageNumber) - 1,
                                       pageSize: dataCenter.options.pageSize,
                                       sort: dataCenter.options.sort
                                   }
                                },
                                cb: function (data) {
                                    if (!data.error) {
                                        context.dataCenter = data.body;
                                        controlFun(context);
                                    } else {
                                        context.close();
                                    }
                                }
                            };
                        } else {
                            config = {
                                req:{
                                    method: 'GET',
                                    url:dataCenter.options.url,
                                    data: {}
                                },
                                cb: function (data) {
                                    if(!data.error){
                                        context.dataCenter = data.body;
                                        controlFun(context);
                                    } else {
                                        context.close();
                                    }
                                }
                            };
                        }
                        Server.reqData(config);
                    } else {
                        //直接加载界面
                        context.close();
                        controlFun(context);
                    }

                    function close(){
                        $info.hideMessageBox(messageid);
                        $scope.showPage = true;
                    }
                }
            ]
        );


    };

    /*
     * load：EUI框架定义创建默认控制器接口
     * */
    function loadCtr(controllerName,controlFun) {
        module.controller(controllerName,controlFun);
    };

    /**
     * 定义 dataCenter 对象
     */
    function dataCenter(){
        this.header = {
            service_cost: "",
            status: ""
        },
            this.pageSize = "50",
            this.pageNumber = "1",
            this.totalCount = "100",
            this.orderField = null,
            this.orderType = null,
            this.parameters = {},
            this.rowSets = {

            },
            this.getRowset = function( name ) {

                return null;
            }
    };

    function rowSet(){
        this.primary = [],
            this.added = [],
            this.modified = [],
            this.deleted = []
    };

    /**
     * 判断服务是否成功
     */
    function isSuccess(request){
        if(!eui.isEmpty(request) && request.header.status == "succ"){
            return true;
        }
        return false;
    };

    /**
     * 判断字符是否为空
     * */
    function isEmpty(value) {
        if (value == undefined || value == "" || value == null) {
            return true;
        }
        return false;
    };

    /**
     * 判断字符是否非空
     */
    function isNotEmpty(value) {
        return !isEmpty(value);
    };

    /**
     * 获取字节长度
     * @param String s 字符串
     */
    function getByteLength(s) {
        var length = 0;
        var a = s.split("");
        for (var i = 0; i < a.length; i++) {
            if (a[i].charCodeAt(0) < 299) {
                length++;
            }
            else {
                length += 2;
            }
        }
        return length;
    };

    /**
     * 根据字节长度截取字符
     * @param String s 字符串
     * @param int len 截取长度
     */
    function subStrByByteLength(s, len) {
        var length = 0;
        var str = "";
        var a = s.split("");
        for (var i = 0; i < a.length; i++) {
            if (a[i].charCodeAt(0) < 299) length++;
            else length += 3;

            if (length <= len) str = str + a[i];
            else break;
        }
        return str;
    };


    /**
     * This is a helper function for translating camel-case to snake-case.
     */
    function camelToSnake(name) {
        var regexp = /[A-Z]/g;
        var separator = '-';
        return name.replace(regexp, function(letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }

    //eui框架外部接口发布
    function publishExternalAPI(eui) {
        jQuery.extend(eui, {
            'load': load,
            'loadCtr': loadCtr,
            'dataCenter': dataCenter,
            'rowSet': rowSet,
            'isSuccess': isSuccess,
            'isEmpty': isEmpty,
            'isNotEmpty': isNotEmpty,
            'getByteLength': getByteLength,
            'subStrByByteLength': subStrByByteLength,
            'camelToSnake':camelToSnake
        });
    }

    publishExternalAPI(eui);
})(window);

/**
 * Eui 前端框架配置文件
 */

(function(window){
    var timeout = {
        svcRequestTimeout:"20000"  //默认超时时间为20秒
    }

    var apiversion = {
        v1:'v1'
    }

    var compParaConf = {
        grid:{               //可以配置grid初始化options里的所有参数
            data:{
                data:"body",  // 不分页时数据配置
                pageData:"body.content", //分页时数据配置
                pageSize:"body.size",//分页页面大小
                pageNumber: "body.number",//分页页码
                total:"body.totalElements" // 数据总数
            },
            diffPage:-1        //后台起始页面的差值，此处后台起始页面为0
        }
    };

    var soamMenus = {
        xtzc:{
            name:"系统支撑",
            icon:"soam-icon-xtzc",
            path:"./app/template/function/xtzc.html"
        },
        flow:{
            name:"流程管理",
            icon:"soam-icon-flow",
            path:"./app/template/function/flow.html"
        },
        flowm:{
            name:"流程监控",
            icon:"soam-icon-flowm",
            path:"./app/template/function/flowm.html"
        },
        service:{
            name:"服务监控",
            icon:"soam-icon-service",
            path:"./app/template/function/service.html"
        },
        chart:{
            name:"统计报表",
            icon:"soam-icon-chart",
            path:"./app/template/function/chart.html"
        },
        logger:{
            name:"日志管理",
            icon:"soam-icon-logger",
            path:"./app/template/function/logger.html"
        }
    };

    var appData = {
        requestMethod: 'GET',
        //prefix: '/api/',
        //requestMethod: 'POST',
        url:'localhost:8080',
        prefix: '/xtzc',
        //postfix: '.json',
        postfix: '/list',
        apiversion:apiversion.v1,
        timeout:timeout,
        compParaConf:compParaConf,
        soamMenus:soamMenus,
        ServiceResponseTime:100   //服务请求阈值，毫秒数，当服务请求时间小于此值默认不显示进度条，实际请求时间超过此值时，自动显示进度条
    }

    if(window.eui){
        jQuery.extend(window.eui, {
            'appData': appData
        });
    }

}(window));


/**
 * 文件名：EUI框架工具函数文件
 * 创建人：吴睿琪
 * 创建时间：2016年7月29日
 * 修改日志：
 *
 */

angular.module('util', ['ngCookies'])
    .factory('Auth', ['$cookies', function ($cookies){
        var _user = $cookies.getObject('user');
        var reqHead = {};

        var setUser = function(user) {
            if (!user.role || user.role < 0) {
                user.role = 0;
            }
            _user = user;
            $cookies.putObject('user', _user);
        };
        return {
            isAuthorized: function() {
                return _user && _user.role;
            },
            setUser: setUser,
            isLoggedIn: function() {
                return _user ? true : false;
            },
            getUser: function() {
                return _user;
            },
            setReqHead: function() {
                reqHead['account'] = _user.account;
                reqHead['role'] = _user.role;
            },
            getReqHead: function() {
                return {account: _user.account, role: _user.role};
            },
            getId: function() {
                return _user ? _user._id : null;
            },
            getToken: function() {
                return _user ? _user.token : '';
            },
            setToken: function(data) {
                if (data && data.user) {
                    var user = {user: data.user[0].userId,
                        role: data.user[0].roleId,
                        name: data.user[0].name,
                        account: data.user[0].account
                    };
                    setUser(user);
                }
            },
            logout: function() {
                $cookies.remove('user');
                _user = null;
                reqHead = null;
            }
        }
    }])
    .factory('Server', ['$http','$info','soamDataTransfer','$timeout',
    function ($http,$info,dataTransfer,$timeout) {
        var requests = [];
        var appData = eui.appData;
        var setPageCursor = function(value) {
            if (value === 'wait') {
                requests.push(true);
                //angular.element(document.getElementsByClassName('claro')[0]).css('cursor', value);
                angular.element(document.getElementsByTagName('body')).css('cursor', value);
            } else {
                if (requests.length > 0) {
                    requests.shift();
                }
                if (requests.length <= 0) {
                    angular.element(document.getElementsByTagName('body')).css('cursor', value);
                }
            }
        };

        return {
            /**
             * 请求数据
             * @param {Object} config 参数集合:<br>
             *    [String] method 请求方法<br>
             *    [String] resource 资源名称<br>
             *    {Object} data 请求数据<br>
             *
             *    [DataSet] dataSet 请求数据结构<br>
             *    [boolean] asynchronous 是否为异步请求,默认true<br>
             *    [Function] onComplete 请求完成后的回调函数，asynchronous为true时有效<br>
             *    [Function] onFail 请求完成后的回调函数，asynchronous为true时有效<br>
             *    [boolean] original 是否把原始的字符串数据直接返回，默认false<br>
             *  [boolean] loading 是否显示loading提示条，默认的情况下是显示的。为true<br>
             *  [String]  loadText loading工具条上的提示信息。可以是html脚本<br>
             *  [boolean] useHttps 是否使用https协议，默认false<br>
             *
             *    [boolean] showLoadMsg 是否显示进度条，默认false<br>
             */
            //reqData: function (service, data, cb, /* optional */ parameters) {
            reqData: function (config) {

                config.req.status='start';//设置服务请求状态，默认开始

                var isPopMsg = true;//默认弹出提示
                var svcRequestTimeout = appData.timeout.svcRequestTimeout;
                var req = {};
                var svcTimeout = null;//服务请求定时器
                var messageid = null;

                //var svcData = [{serviceName:"/xtzc/zy/page",requestTime:50}];

                var showLoadMsg = config.showLoadMsg || false;
                if (showLoadMsg){
                    /**
                     * 是否显示服务请求进度条，默认显示，判断服务请求时间，
                     * 超过200毫秒自动启用，低于200设置定时器，请求超过200毫秒后启用
                     */
                    var isShowLoad = true;
//                    //循环方式：
//                    for(i in svcData){
//                        if(svcData[i].serviceName == config.req.url){
//                            //低于200设置定时器，请求超过200毫秒后启用
//                            if(svcData[i].requestTime < eui.appData.requestLoadTime){
//                                isShowLoad = false;
//                                var svcTimeout = $timeout(function(){
//                                    //判断服务请求状态
//                                    if(config.req.status == 'start'){
//                                        var messageid = $info.loading("数据加载中, 请稍后 ...", "Loading");
//                                    }
//                                },eui.appData.requestTimeOut);
//                            }
//                            break;
//                        }
//                    }
                    //属性方式：
//                    var ServiceResponseTime = {"/xtzc/zy/page":50};
                    if(typeof(ServiceResponseTime)!="undefined" && ServiceResponseTime!=null){
                        var responseTime = ServiceResponseTime[config.req.url];
                        var svcResponseTime = eui.appData.ServiceResponseTime;

                        if(responseTime!=undefined &&  typeof(responseTime) == "number" && responseTime>0
                            && svcResponseTime!=undefined &&  typeof(svcResponseTime) == "number" && svcResponseTime>0
                            && responseTime < svcResponseTime){

                            isShowLoad = false;
                            svcTimeout = $timeout(function(){
                                console.log("======================"+config.req.status+"======================");
                                //判断服务请求状态
                                if(config.req.status == 'start'){
                                    messageid = $info.loading("数据加载中, 请稍后 ...", "Loading");
                                }
                            }, eui.appData.ServiceResponseTime);
                        }
                    }

                    if(isShowLoad){
                        messageid = $info.loading("数据加载中, 请稍后 ...", "Loading");
                    }
                }
                if(config.req){
                    req = $.extend({headers: {'Content-Type':'application/json'}}, config.req);
                }

                //var user = Auth.getReqHead();
                var user = {}
                if (user === null) {
                    $info.alert('用户未登录.');
                    config.cb({message: '用户未登录.'});
                } else {
                    //document.body.style.cursor="wait";
                    setPageCursor('wait');
                    $http(req).
                    success(function(response) {
                        config.req.status='end';//设置服务请求状态，结束
                        svcTimeout = null;

                        if (config.cb) setPageCursor('auto');
                        //统一数据处理
                        dataTransfer.respDataParse(response, function(data){
                            if(messageid){
                                $info.hideMessageBox(messageid,function(){
                                    config.cb(data);
                                });
                            } else {
                                config.cb(data);
                            }
                        })
                    }).
                    error(function (response, status) {
                        config.req.status='end';//设置服务请求状态，结束
                        svcTimeout = null;

                        if (config.cb){
                            setPageCursor('auto');
                        }

                        dataTransfer.respDataParse(response, function(data){
                            if(messageid){
                                $info.hideMessageBox(messageid,function(){
                                    config.cb(data);
                                });
                            } else {
                                config.cb(data);
                            }
                        })
                    });
                }
                //return timer;
            }
        }
    }])
    /**
     * SOAM项目数据处理函数，待完善
     *
     */
    .factory('soamDataTransfer', ['$info',
        function ($info) {
            //*    [String] url 请求URL,如果为空则认为请求组件数据<br>
            //*    [String] service 服务名称<br>
            //*    [DataSet] dataSet 请求数据结构<br>

            function reqDataHandling(reqData){
                var data;

                return data;
            }

            /**
             *
             *respData：{"code": 0,"message": "ok","body": {}}，body可以存放任何业务数据
             * 返回data：{body:respData.body,message:respData.message,error:null}
             */

            function respDataParse(respData, fn){
                var data = {};
                if(!eui.isObject(respData)){
                    throw new Error("返回的响应数据respData:"+ respData.toString() + "不是对象，请传入object对象数据");
                }

                if(!respData.hasOwnProperty("code") || !respData.hasOwnProperty("message") || !respData.hasOwnProperty("body")){
                    throw new Error("请返回正确的响应数据形式");
                }

                //统一错误处理
                if(respData.code !== 0){
                    var errInfo = respData.message;
                    if(errInfo){
                        $info.alert(errInfo);
                    }
                    data= {
                        body:null,
                        message:respData.message,
                        error:true
                    };
                } else {
                    //如果是分页查询
                    if(respData.body && respData.body.content){
                        data= {
                            body:{
                                data:respData.body.content,
                                page:{
                                    pageNumber: parseInt(respData.body.number) + 1,
                                    pageSize: respData.body.size,
                                    total:respData.body.totalElements
                                }
                            },
                            message:respData.message,
                            error:null
                        };
                    } else {
                        data= {
                            body:respData.body,
                            message:respData.message,
                            error:null
                        };
                    }
                }
                fn(data)
            }

            return {
                reqDataHandling: reqDataHandling,
                respDataParse:respDataParse

            }

        }])