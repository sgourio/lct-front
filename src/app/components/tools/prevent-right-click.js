'use strict';

function preventRightClick() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('contextmenu', function(e) {
        e.preventDefault();
      });
    }
  };
}
angular.module('lct')
  .directive('preventRightClick', preventRightClick);
