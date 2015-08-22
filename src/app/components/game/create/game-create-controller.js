/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

/**
 * @ngdoc service
 * @name lctUiApp.gameBoardService
 * @description
 * # gameBoardService
 * Service in the lctUiApp.
 */
angular.module('lct')
  .controller('GameCreateCtrl', [ '$scope', 'gameService', function ($scope, gameService) {
    $scope.init = function() {
      gameService.list(function(data){
        $scope.games=data;
      });
      $scope.roundTime = 120;
      $scope.selectedGame = null;

      $scope.gameName='';

      $scope.startGame = function(){
        gameService.openGame($scope.selectedGame, $scope.gameName, $scope.roundTime).then(function(playGameId){
          // TODO
        });
      };
    };


    //$scope.$watch(function(userService) { return userService.userList; },
    //  function(newValue, oldValue, $scope) {
    //    $log.debug('watch ' + oldValue + ' -> ' + newValue);
    //    $scope.userList=newValue;
    //  });
  }]);
