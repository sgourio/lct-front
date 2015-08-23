'use strict';

angular.module('lct')
  .directive('openedActions', ['$log', 'gameService', '$state', '$auth', function($log, gameService, $state, $auth) {
    return {
      restrict: 'E',
      scope: {
        gameMetaData:'='
      },
      templateUrl: 'app/components/game/play/directives/opened-actions.html',
      controller: function($scope){
        $log.info($auth.getPayload());
        $scope.isOwner=$auth.getPayload().sub === $scope.gameMetaData.owner;
        var d = new Date();
        var min = d.getMinutes() < 15 ? 15 : d.getMinutes() < 30 ? 30 : d.getMinutes() < 45 ? 45 : 0;
        if( min > 0 ) {
          $scope.quarterDate = d.getHours() +'h' + min;
        }else if (d.getHours() < 23 ){
          $scope.quarterDate = (d.getHours() + 1) +'h';
        } else{
          $scope.quarterDate = 'minuit l\'heure du crime';
        }
      }
    };
  }]);
