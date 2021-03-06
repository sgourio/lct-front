/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';

angular.module('lct')
  .directive('accountPicture', ['$log', 'userService', '$state', function($log, userService, $state) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'app/components/user/account/account-picture.html',
      controller: function($scope){
        $scope.$on('cropme:done', function(ev, result, cropmeEl) {
          $log.info('cropped');
          userService.uploadPicture(result.croppedImage).then(function(){
            $state.transitionTo('account');
          });
        });
      }
    };
  }]);
