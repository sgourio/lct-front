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
  .controller('GameCreateCtrl', [ '$scope', 'gameService', '$state', '$auth', 'clubService', 'userService', function ($scope, gameService, $state, $auth, clubService, userService) {
    $scope.init = function() {
      //gameService.list(function(data){
      //  $scope.games=data;
      //});
      $scope.roundTime = 120;
      $scope.selectedGame = null;

      $scope.gameName='';
      $scope.hasError = false;

      $scope.authorizedUserIds = [];
      $scope.authorization = 'all';

      $scope.startGame = function(){
        $scope.hasError = false;
        if( $scope.gameName === ''){
          $scope.hasError = true;
          $scope.error= 'Merci de donner un nom à votre partie.';
        }
        if( $scope.selectedGame === null){
          $scope.hasError = true;
          $scope.error= 'Il faut sélectionner une partie.';
        }
        if (!$scope.hasError) {
          gameService.openGame($scope.selectedGame, $scope.gameName, $scope.roundTime, $scope.authorizedUserIds).then(function (playGameId) {

            $state.go('play', {playGameId: playGameId});
          });
        }
      };

      $scope.myClubs = function(){
        clubService.myClubs().then(function(data){
          $scope.clubList = data;
        });
      };
      $scope.myClubs();

      $scope.authorizeOnlyToMe = function(){
        $scope.authorizedUserIds = [];
        $scope.authorizedUserIds.push($auth.getPayload().userId);
      };

      $scope.authorizeToMyFriends = function(){
        $scope.authorizedUserIds = [];
        userService.getFriends().then(function(userList){
          var i;
          for(i = 0 ; i < userList.length; i++){
            $scope.authorizedUserIds.push(userList[i].id);
          }
        });
      };

      $scope.authorizeToClub = function(clubId){
        $scope.authorizedUserIds = [];
        clubService.getClub(clubId).then(function(club){
          var i;
          for(i = 0 ; i < club.userList.length; i++){
            $scope.authorizedUserIds.push(club.userList[i].id);
          }
        });
      };

      $scope.authorizeAll = function(){
        $scope.authorizedUserIds = [];
      };

      $scope.authorizationChange = function( clubId ){
        if( $scope.authorization === 'me' ){
          $scope.authorizeOnlyToMe();
        }else if( $scope.authorization === 'friends' ){
          $scope.authorizeToMyFriends();
        } else if( $scope.authorization === 'all' ){
          $scope.authorizeAll();
        }else if( clubId ){
          $scope.authorizeToClub(clubId);
        }
      };
    };


    //$scope.$watch(function(userService) { return userService.userList; },
    //  function(newValue, oldValue, $scope) {
    //    $log.debug('watch ' + oldValue + ' -> ' + newValue);
    //    $scope.userList=newValue;
    //  });
  }]);
