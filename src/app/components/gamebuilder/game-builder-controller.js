'use strict';

/**
 * @ngdoc function
 * @name lctUiApp.controller:GamebuilderCtrl
 * @description
 * # GamebuilderCtrl
 * Controller of the lctUiApp
 */
angular.module('lct')
  .controller('GameBuilderCtrl', ['$scope', '$q', '$http', '$modal', '$log', 'gameBoardService', 'gameService', function ($scope, $q, $http, $modal, $log, gameBoardService, gameService) {

    var squareWitdh = 37;
    var squareHeight = 37;
    var squareOffSetX = 16;
    var squareOffSetY = 14;
    var boardOffset = 0;



    $scope.$on('$viewContentLoaded', function() {
      boardOffset = angular.element('.board').offset();
    });

    $scope.$watch(function(scope) { return $scope.currentTurnNumber },
      function(newValue, oldValue, $scope) {
        if( $scope.game.roundList[newValue-1] ) {
          var activeRound = gameBoardService.getActiveRound($scope.game, newValue);
          $scope.board = JSON.parse(JSON.stringify(activeRound.board));
          $scope.deck = JSON.parse(JSON.stringify(activeRound.deck));
          var draw = JSON.parse(JSON.stringify(activeRound.draw));
          for( var l = 0 ; l < draw.length; l++){
            var droppedTile = {
              tile: draw[l],
              value: draw[l].value
            }
            $scope.draw.push(droppedTile);
          }
          //$scope.findWords();

          //$scope.board = JSON.parse(JSON.stringify($scope.initialBoard));
          //for( var i = 0 ; i < newValue ; i++){
          //  gameBoardService.putWord($scope.board, $scope.game.roundList[i].draw.slice(0), $scope.game.roundList[i].droppedWord);
          //  gameBoardService.validRound($scope.board, $scope.game.roundList[i].draw.slice(0), $scope.game.roundList[i].droppedWord);
          //  $scope.draw = $scope.game.roundList[i].draw;
          //}

        }
      }
    );

    $scope.init = function() {
      return $q(function(resolve, reject) {
        $scope.Math = window.Math;
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

        gameBoardService.init().then( function(){
          $scope.board = JSON.parse(JSON.stringify(gameBoardService.initialBoardGame));
          $scope.deck = JSON.parse(JSON.stringify(gameBoardService.initialFrenchDeck));
          gameBoardService.sortTiles($scope.deck);
          return $scope.randomDraw();
        });

      });


    };

    $scope.squarePosition = function(row, column){
      return gameBoardService.squarePosition(row, column, squareHeight, squareWitdh, squareOffSetY, squareOffSetX);
    };

    $scope.tileImageUrl = function(tile, jokerValue){
      if (tile.tileType !== 'wildcard') {
        return 'assets/images/lettres36/fr/normal/' + tile.value + '.gif';
      } else {
        if( jokerValue && jokerValue !== '?' ){
          return '/assets/images/lettres36/fr/joker/'+ jokerValue +'.gif';
        }else{
          return 'assets/images/lettres36/fr/normal/wildcard.gif';
        }
      }
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

    $scope.startChangeJokerValue = function(droppedTile){
      $scope.currentJoker = droppedTile;
    };

    $scope.changeJokerValue = function(letter){
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
        $scope.game.roundList = $scope.game.roundList.slice(0,$scope.currentTurnNumber-1);
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

    $scope.goToTurn = function(index){
      $scope.currentTurnNumber = index; // there is a watch on this
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

    $scope.openSaveGameModal = function(){
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'saveModal',
          controller: 'ModalSaveGameCtrl',
          resolve: {
            game: $scope.game
          }
      });
      modalInstance.result.then(function (name) {
        $scope.game.name = name;
        $scope.createGame();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  }]);


angular.module('lct').controller('ModalSaveGameCtrl',[ '$scope', '$modalInstance', 'game', function ($scope, $modalInstance, game) {

  $scope.game = game;

  $scope.ok = function () {
    $modalInstance.close($scope.game.name);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);

