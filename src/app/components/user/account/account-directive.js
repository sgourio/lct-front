'use strict';

angular.module('lct')
  .directive('account', ['$log', 'userService', 'NgTableParams',  function($log, userService, NgTableParams) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/user/account/account.html',
      controller: function($scope){
        $scope.showForm = false;
        userService.myAccount().then(function(userBean){
          $scope.account = userBean;
        });
        $scope.configTableParams = new NgTableParams({count: 5, 'show_filter': true },{});
        userService.myScore().then(function(scores){
          $scope.scores = scores;
          $scope.configTableParams.settings({data: scores.monthlyScoreGameList});
        });

        $scope.changeNickname = function(){
          $scope.alreadyUsed = false;
          if( $scope.account.nickname ){
            userService.updateNickname($scope.account.nickname).then(function(){
              $scope.nicknameUpdated = true;
              $scope.showForm = false;
            }).catch(function(){
              $scope.alreadyUsed = true;
            });
          }
        }
      }
    };
  }]);
