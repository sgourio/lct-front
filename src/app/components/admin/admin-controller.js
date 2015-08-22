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
  .controller('AdminCtrl', [ '$scope', '$log', 'adminService', function ($scope, $log, adminService) {
    $scope.generateGame = function(){
      adminService.generateGame().then( function(gameMetaData){
        $scope.game = gameMetaData;
      });
    };
  }]);
