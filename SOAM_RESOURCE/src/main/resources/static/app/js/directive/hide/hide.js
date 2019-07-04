/**
 * Created by Administrator on 2016/9/17.
 */
angular.module('eui.hide', ['eui'])
    .directive('uibHide', function($info) {
        return {
            controller: 'UibHideController',
            restrict:'A',
            transclude: true,
            replace: true,
            link: function(scope, element, attr) {
                scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
                    // we're adding a temporary, animation-specific class for ng-hide since this way
                    // we can control when the element is actually displayed on screen without having
                    // to have a global/greedy CSS selector that breaks when other animations are run.
                    // Read: https://github.com/angular/angular.js/issues/9103#issuecomment-58335845
                    $animate[value ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    });
