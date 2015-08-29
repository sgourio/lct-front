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
  .controller('GameCreateCtrl', [ '$scope', 'gameService', '$state', function ($scope, gameService, $state) {
    $scope.init = function() {
      //gameService.list(function(data){
      //  $scope.games=data;
      //});
      $scope.roundTime = 120;
      $scope.selectedGame = null;

      $scope.gameName='';
      $scope.hasError = false;

      $scope.startGame = function(){
        $scope.hasError = false;
        if( $scope.gameName == ''){
          $scope.hasError = true;
          $scope.error= 'Merci de donner un nom à votre partie.';
        }
        if( $scope.selectedGame === null){
          $scope.hasError = true;
          $scope.error= 'Il faut sélectionner une partie.';
        }
        if (!$scope.hasError) {
          gameService.openGame($scope.selectedGame, $scope.gameName, $scope.roundTime).then(function (playGameId) {

            $state.go('play', {playGameId: playGameId});
          });
        }
      };
    };


    //$scope.$watch(function(userService) { return userService.userList; },
    //  function(newValue, oldValue, $scope) {
    //    $log.debug('watch ' + oldValue + ' -> ' + newValue);
    //    $scope.userList=newValue;
    //  });
  }]);
