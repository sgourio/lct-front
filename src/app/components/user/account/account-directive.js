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
        $scope.searchName = '';
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
        };

        $scope.updateFriendList = function(){
          userService.getFriends().then(function(data){
            $scope.friends = data;
          });
        };
        $scope.updateFriendList();

        $scope.search = function(){
          if( $scope.searchName ){
            userService.search($scope.searchName).then(function(data){
              $scope.userProposals = data;
            });
          }
        };

        $scope.addFriend = function(friendId){
          if( friendId ){
            userService.addFriend(friendId).then(function(){
              $scope.updateFriendList();
            });
          }
        };

        $scope.removeFriend = function(friendId){
          if( friendId ){
            userService.removeFriend(friendId).then(function(){
              $scope.updateFriendList();
            });
          }
        };
      }
    };
  }]);
