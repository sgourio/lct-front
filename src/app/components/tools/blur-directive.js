'use strict';

function blurElemDirective() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('click', function () {
        element.blur();
      });
    }
  };
}
angular.module('lct')
  .directive('blurMe', blurElemDirective);
