'use strict';

angular.module('lct')
  .directive('chat', [ 'chatService', 'stompService', '$anchorScroll', '$location', '$timeout', function(chatService, stompService, $anchorScroll, $location, $timeout) {
    return {
      restrict: 'E',
      scope: {
        id:'@'
      },
      replace: true,
      templateUrl: 'app/components/game/play/directives/chat.html',
      controller: function($scope) {
        $scope.chatInput = '';

        chatService.getChat($scope.id).then(function (chat){
          $scope.chat = chat;
          $location.hash('mess_' + ($scope.chat.chatMessageList.length - 1));
          $timeout(function() {
            $anchorScroll();
          });
        });

        $scope.sendChat = function(){
          if( $scope.chatInput ){
            chatService.sendChat($scope.id, $scope.chatInput).then(function (){
              $scope.chatInput = '';
            });
          }
        };

        stompService.subscribeChat($scope.id, function(chat){
          $scope.chat = chat;
          if( $scope.chat.chatMessageList ) {
            $location.hash('mess_' + ($scope.chat.chatMessageList.length - 1));
            $timeout(function () {
              $anchorScroll();
            });
            $scope.$apply();
          }
        });
      }
    };
  }]);
