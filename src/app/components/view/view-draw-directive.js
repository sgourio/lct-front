/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('viewDraw', [function() {
    return {
      restrict: 'E',
      scope: {
        round:'='
      },
      replace: true,
      templateUrl: 'app/components/view/view-draw.html'
    };
  }]);
