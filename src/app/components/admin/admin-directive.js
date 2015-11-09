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
  .directive('admin', [ '$log', 'adminService', function ($log, adminService) {
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
            $scope.getCreatedClubs();
          });
        };

        $scope.getCreatedClubs = function() {
          adminService.createdClubs().then(function (clubList) {
            $scope.createdClubList = clubList;
          });
        };
        $scope.getCreatedClubs();

      }
    }
  }]);
