/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('clubHome', [ '$log', 'clubService', function($log, clubService) {
    return {
      restrict: 'E',
      scope: {
        clubId : '@'
      },
      replace: true,
      templateUrl: 'app/components/club/club-home.html',
      controller: function($scope) {
        $log.info('club: ' + $scope.clubId);
        $scope.init = function() {
          clubService.getClub($scope.clubId).then(function (club) {
            $scope.club = club;
          });
        };


        $scope.inviteUser = function(email){
          clubService.inviteUser($scope.clubId, email).then(function(){
            $scope.init();
          })
        };

        $scope.init();
      }
    };
  }]);
