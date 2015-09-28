'use strict';

/**
 * @ngdoc service
 * @name lctUiApp.messageService
 * @description
 * Service to display message to user
 */
angular.module('lct')
  .service('messageService', [ function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var messageService = {
      wordResultMessage: {},
      errorMessage: {},

      clear: function(){
        this.wordResultMessage= {};
        this.errorMessage= {};
      },

      addWordResult: function(wordResult, roundNumber){
        this.clear();
        this.wordResultMessage.roundNumber = roundNumber;
        this.wordResultMessage.wordResult = wordResult;
      },

      addErrorMessage: function(error, roundNumber){
        this.clear();
        this.errorMessage.error = error;
        this.errorMessage.roundNumber = roundNumber;
      }
    };

    return messageService;
  }]);
