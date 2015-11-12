/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('clubDescription', [ '$log', '$auth', '$window', 'clubService', function($log, $auth, $window, clubService) {
    return {
      restrict: 'E',
      scope: {
      },
      replace: true,
      templateUrl: 'app/components/club/club-description.html',
      controller: function($scope) {
        $scope.auth = $auth;
        $window.sessionStorage.toState = 'club';

        $scope.createClub = function(clubName){
          clubService.create(clubName).then(function(){
            $scope.clubName = '';
            $scope.myClubs();
          });
        };

        $scope.myClubs = function(){
          clubService.myClubs().then(function(data){
            $scope.clubList = data;
            $log.info(data);
          });
        };

        $scope.myClubs();
      }
    };
  }]);
