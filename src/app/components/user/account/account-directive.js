'use strict';

angular.module('lct')
  .directive('account', ['$log', 'userService', 'stompService', function($log, userService, stompService) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/user/account/account.html',
      controller: function($scope){


      }
    };
  }]);
