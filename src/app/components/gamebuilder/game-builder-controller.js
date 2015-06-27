'use strict';

/**
 * @ngdoc function
 * @name lctUiApp.controller:GamebuilderCtrl
 * @description
 * # GamebuilderCtrl
 * Controller of the lctUiApp
 */
angular.module('lct')
  .controller('GameBuilderCtrl', ['$scope', '$q', '$http','gameBoardService', 'gameService', function ($scope, $q, $http, gameBoardService, gameService) {

    var squareWitdh = 37;
    var squareHeight = 37;
    var squareOffSetX = 16;
    var squareOffSetY = 14;
    var boardOffset = 0;



    $scope.$on('$viewContentLoaded', function() {
      boardOffset = angular.element('.board').offset();
    });

    $scope.init = function() {
      return $q(function(resolve, reject) {
        $scope.displayPopover = false;
        $scope.displayDeck = false;
        $scope.currentJoker = null;
        $scope.deck = [];
        $scope.suggestions = [];
        $scope.selectedSuggestIndex = -1;
        $scope.showSuccessAlert = false;
        $scope.finished = false;
        $scope.game = {
          lang: 'fr',
          name: '',
          roundList: []
        };
        $scope.draw = [];
        $scope.currentTurnNumber = 1;

        gameBoardService.getInitialScrabbleBoardGame().then(function (data) {
          $scope.board = data;
          for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
              var position = gameBoardService.squarePosition(i, j, squareHeight, squareWitdh, squareOffSetY, squareOffSetX);
              $scope.board.squares[i][j].style = {top: position.top, left: position.left};
            }
          }
          $scope.board.middleSquare = $scope.board.squares[7][7];
          return data;
        }).then(function() {
          return gameBoardService.getInitialFrenchDeck();
        }).then(function (data) {
          $scope.deck = data;
          gameBoardService.sortTiles($scope.deck);
          return $scope.randomDraw();
        }).then( function(){
          resolve();
        }).catch( function(){
          reject();
        });
      });

    };

    $scope.chooseLetter = function(index){
      gameBoardService.drawTile($scope.board, $scope.draw, $scope.deck, index);
      $scope.findWords();
    };

    $scope.unchooseLetter = function(index){
      gameBoardService.undrawTile($scope.draw, $scope.deck, index);
      $scope.findWords();
    };

    $scope.clearDraw = function(){
      gameBoardService.clearBoard($scope.board, $scope.draw);
      gameBoardService.clearDraw($scope.draw, $scope.deck);
      $scope.suggestions = [];
    };

    $scope.randomDraw = function(){
      return $q(function(resolve) {
        gameBoardService.randomDraw($scope.board, $scope.draw, $scope.deck, $scope.currentTurnNumber);
        $scope.findWords().then( function(){
          resolve();
        });
      });
    };

    $scope.startChangeJokerValue = function(tile){
      $scope.currentJoker = tile;
    };

    $scope.changeJokerValue = function(letter){
      $scope.currentJoker.imageURL = '/assets/images/lettres36/fr/joker/'+letter+'.gif';
      $scope.currentJoker.value = letter;
    };

    $scope.findWords = function(){
      return $q(function(resolve, reject) {
        $scope.selectedSuggestIndex = -1;
        $scope.callingFindWords = true;
        gameBoardService.findWords($scope.draw, $scope.board, $scope.suggestions).then(function () {
          $scope.callingFindWords = false;
          resolve();
        }).catch(function(){
          reject();
        });
      });
    };

    $scope.putWord = function($index){
      $scope.selectedSuggestIndex = $index;
      gameBoardService.putWord($scope.board, $scope.draw, $scope.suggestions[$index]);
    };

    $scope.validRound = function(){
      return $q(function(resolve, reject) {
        var droppedWord = $scope.suggestions[$scope.selectedSuggestIndex];
        var round = gameBoardService.validRound($scope.board, $scope.draw, droppedWord);
        $scope.game.roundList.push(round);
        $scope.currentTurnNumber++;
        $scope.suggestions = [];
        $scope.selectedSuggestIndex = -1;
        if (gameBoardService.isFinish($scope.deck, $scope.draw)) {
          $scope.finished = true;
          resolve();
        } else {
          gameBoardService.newRoundDraw($scope.board, $scope.draw, $scope.deck, $scope.currentTurnNumber);
          $scope.findWords().then(function(){
            resolve();
          }).catch(function (){
            reject();
          });
        }
      });
    };

    $scope.createGame = function(){
      if(typeof $scope.game.id === 'undefined' ) {
        gameService.add($scope.game, function(){
          $scope.showSuccessAlert=true;
        });
      }else{
        gameService.save($scope.game, function(){
          $scope.showSuccessAlert=true;
        });
      }
    };

    $scope.totalScore = function(turnIndex){
      if( turnIndex < 0 || turnIndex >= $scope.game.roundList.length  ){
        return 0;
      }else{
        return $scope.game.roundList[turnIndex].droppedWord.points + $scope.totalScore(turnIndex - 1);
      }
    };

    $scope.auto = function(){

      var play = function(){
        return $q(function(resolve, reject) {
          $scope.putWord(0);
          $scope.validRound().then(function(){
            if(!$scope.finished){
              return play();
            }else{
              resolve();
            }
          }).catch(function(){
            reject();
          });
        });
      };

      $scope.init().then(function(){
        play();
      });
    };

  }]);

