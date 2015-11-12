'use strict';
angular.module('lct')
  .directive('rules', ['$log', function() {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/rules/rules.html'
    };
  }]);
