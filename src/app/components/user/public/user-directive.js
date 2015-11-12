/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('user', [function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        user: '=' // userBean
      },
      templateUrl: 'app/components/user/public/user.html'
    };
  }]);
