'use strict';

angular.module('lct')
  .directive('chat', [ 'chatService', 'stompService', '$anchorScroll', '$location', '$timeout', function(chatService, stompService, $anchorScroll, $location, $timeout) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'='
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/chat.html',
      controller: function($scope) {
        $scope.chatInput = '';

        chatService.getChat($scope.gameMetaData.playGameId).then(function (chat){
          $scope.chat = chat;
          $location.hash('mess_' + ($scope.chat.chatMessageList.length - 1));
          $timeout(function() {
            $anchorScroll();
          });
        });

        $scope.sendChat = function(){
          if( $scope.chatInput ){
            chatService.sendChat($scope.gameMetaData.playGameId, $scope.chatInput).then(function (){
              $scope.chatInput = '';
            });
          }
        };

        stompService.subscribeChat($scope.gameMetaData.playGameId, function(chat){
          $scope.chat = chat;
          $location.hash('mess_' + ($scope.chat.chatMessageList.length - 1));
          $timeout(function () {
            $anchorScroll();
          });
          $scope.$apply();
        });
      }
    };
  }]);
