/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('clubHome', [ function() {
    return {
      restrict: 'E',
      scope: {

      },
      replace: true,
      templateUrl: 'app/components/club/club-home.html',
      controller: function($scope) {

      }
    };
  }]);
