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

angular.module('lct')
  .directive('admin', [ '$log', 'adminService', function ($log, adminService, $window) {
    return {
      restrict: 'E',
      scope: {},
      replace: true,
      templateUrl: 'app/components/admin/admin.html',
      controller: function ($scope) {

        $scope.generateGame = function () {
          adminService.generateGame().then(function (gameMetaData) {
            $scope.game = gameMetaData;
          });
        };

        $scope.activateClub = function(clubId){
          adminService.activateClub(clubId).then(function(){
            $scope.getClubs();
          });
        };
        $scope.suspendClub = function(clubId){
          adminService.suspendClub(clubId).then(function(){
            $scope.getClubs();
          });
        };
        $scope.deleteClub = function(clubId){
          if( $window.confirm('Supprimer le club?'  ) ) {
            adminService.deleteClub(clubId).then(function () {
              $scope.getClubs();
            });
          }
        };


        $scope.getClubs = function() {
          adminService.getClubs('created').then(function (clubList) {
            $scope.createdClubList = clubList;
          });
          adminService.getClubs('activated').then(function (clubList) {
            $scope.activatedClubList = clubList;
          });
          adminService.getClubs('suspended').then(function (clubList) {
            $scope.suspendedClubList = clubList;
          });
        };

        $scope.getClubs();

      }
    };
  }]);
