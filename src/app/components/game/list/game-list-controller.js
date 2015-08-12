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
  .controller('GameListCtrl', [ '$scope', 'gameService', 'userService', '$log', '$stomp', function ($scope, gameService, userService, $log, $stomp) {
    $scope.init = function() {
      userService.userList(function (data){
        $scope.userList=data;
        $scope.$apply();
      });
      gameService.list(function(data){
        $scope.games=data;
      });

      //$stomp.connect('/hello').then(function () {
      //  $log.debug('user-service connected');
      //  $stomp.subscribe('/topic/gamerList', function (payload) {
      //    $log.debug('scope ');
      //    $log.debug(payload);
      //    $scope.userList='toto';//[{test:'test'}];
      //    $scope.$apply();
      //  }, {});
      //});
    };


    //$scope.$watch(function(userService) { return userService.userList; },
    //  function(newValue, oldValue, $scope) {
    //    $log.debug('watch ' + oldValue + ' -> ' + newValue);
    //    $scope.userList=newValue;
    //  });
  }]);
