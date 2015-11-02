/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('createMultiplex', [ 'multiplexService', '$state', function(multiplexService, $state) {
    return {
      restrict: 'E',
      scope: {
      },
      replace: true,
      templateUrl: 'app/components/club/multiplex/create-multiplex.html',
      controller: function($scope) {
        $scope.multiplex = {
          roundTime : 120,
          selectedGame : null,
          gameName : ''
        };
        $scope.hasError = false;

        $scope.startGame = function(){
          $scope.hasError = false;
          if( $scope.multiplex.gameName === ''){
            $scope.hasError = true;
            $scope.error= 'Merci de donner un nom à votre partie.';
          }
          if( $scope.multiplex.selectedGame === null){
            $scope.hasError = true;
            $scope.error= 'Il faut sélectionner une partie.';
          }
          if (!$scope.hasError) {
            $scope.multiplex.state = 'opened';
            multiplexService.openGame($scope.multiplex.selectedGame, $scope.multiplex.gameName, $scope.multiplex.roundTime)
              .then(function(multiplexGameId){
                $state.go('multiplexControl', {multiplexGameId: multiplexGameId});
              });
          }
        };
      }
    };
  }]);
