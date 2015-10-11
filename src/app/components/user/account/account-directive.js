'use strict';

angular.module('lct')
  .directive('account', ['$log', 'userService', 'NgTableParams',  function($log, userService, NgTableParams) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/user/account/account.html',
      controller: function($scope){
        userService.myAccount().then(function(userBean){
          $scope.account = userBean;
        });
        $scope.configTableParams = new NgTableParams({count: 5, 'show_filter': true },{});
        userService.myScore().then(function(scores){
          $scope.scores = scores;
          $scope.configTableParams.settings({data: scores.monthlyScoreGameList});
        });
      }
    };
  }]);
