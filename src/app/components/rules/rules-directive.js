'use strict';
angular.module('lct')
  .directive('rules', ['$log', function($log) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/rules/rules.html',
      controller: function($scope){
      }
    };
  }]);
