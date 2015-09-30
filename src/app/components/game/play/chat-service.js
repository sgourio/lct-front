'use strict';

/**
 *
 */
angular.module('lct')
  .service('chatService', [ '$http', 'apiRoot', '$q', '$log', function ($http, apiRoot, $q, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var chatService = {
      getChat: function(chatId){
        return $q(function(resolve, reject) {
          $http.get( apiRoot + '/play/chat/' + chatId ).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service GET ' + apiRoot + '/play/chat/' + chatId +' respond ' + status);
              reject();
            });
        });
      },

      sendChat: function(chatId, message){
        return $q(function(resolve, reject) {
          $http.post( apiRoot + '/play/chat/' + chatId, message ).
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service POST ' + apiRoot + '/play/chat/' + chatId +' respond ' + status);
              reject();
            });
        });
      }
    };

    return chatService;
  }]);
