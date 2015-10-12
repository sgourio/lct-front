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
          $timeout(function() {
            angular.element('.chat ul')[0].scrollTop = angular.element('.chat ul')[0].scrollHeight;
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
          var element = angular.element('.chat ul')[0];
          var toScroll = element.scrollHeight - element.scrollTop === element.clientHeight;
          $scope.chat = chat;
          if( $scope.chat.chatMessageList ) {
            $timeout(function () {
              if( toScroll ) {
                element.scrollTop = element.scrollHeight;
              }
            });
            $scope.$apply();
          }
        });
      }
    };
  }]);
