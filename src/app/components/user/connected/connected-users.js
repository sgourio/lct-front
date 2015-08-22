'use strict';

angular.module('lct')
  .directive('connectedUsers', ['$log', 'userService', function($log, userService) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/user/connected/connected-users.html',
      controller: function($scope){
        userService.userList().then(function(data){
          $scope.users = data;
        });
        userService.subscribeUserList(function(data){
          $scope.users = data;
          $scope.$apply();
        });
      }
    };
  }]);
