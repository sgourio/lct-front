'use strict';

angular.module('lct')
  .directive('connectedUsers', ['$log', 'userService', 'stompService', function($log, userService, stompService) {
    return {
      restrict: 'E',
      scope: {
      },
      replace: true,
      templateUrl: 'app/components/user/connected/connected-users.html',
      controller: function($scope){
        userService.userList().then(function(data){
          $scope.users = data;
        });
        stompService.subscribeUserList(function(data){
          $scope.users = data;
          $scope.$apply();
        });
      }
    };
  }]);
