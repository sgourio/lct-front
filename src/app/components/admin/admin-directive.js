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
  .directive('admin', [ '$log', 'adminService', '$modal', function ($log, adminService, $modal) {
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
          var deleteClubModalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'deleteClubModal',
            controller: [ '$scope', '$modalInstance', 'clubId', function ($scope, $modalInstance, clubId) {
              $scope.ok = function () {
                $modalInstance.close(clubId);
              };
              $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
              };
            }],
            resolve: {
              clubId: clubId
            }
          });
          deleteClubModalInstance.result.then(function (clubID) {
            adminService.deleteClub(clubId).then(function () {
              $scope.getClubs();
            });
          }, function () {
          });

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

        $scope.cleanMainChat = function(){
          adminService.cleanMainChat();
        }

      }
    };
  }]);
