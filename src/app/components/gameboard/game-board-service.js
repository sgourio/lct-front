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
  .service('gameBoardService', [ '$http', 'apiRoot', '$log','$q', function ($http, apiRoot, $log, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var gameBoardService = {

      initialFrenchDeck : null,
      initialBoardGame : null,

      getInitialFrenchDeck : function(){
        return $q(function(resolve, reject) {
          $http.get(apiRoot + '/board/fr/deck/init').
            success(function (data) {
              for (var i = data.length - 1; i >= 0; i--) {
                if (data[i].tileType !== 'wildcard') {
                  data[i].imageURL = 'assets/images/lettres36/fr/normal/' + data[i].value + '.gif';
                } else {
                  data[i].imageURL = 'assets/images/lettres36/fr/normal/wildcard.gif';
                }
              }
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service ' + apiRoot + '/board/fr/deck/init' + ' respond ' + status);
              reject();
            });
        });
      },

      getInitialScrabbleBoardGame : function(){
        return $q(function(resolve, reject) {
          $http.get(apiRoot + '/board/fr/empty').
            success(function (data) {
              resolve(data);
            }).
            error(function (data, status) {
              $log.error('Service ' + apiRoot + '/board/fr/empty' + ' respond ' + status);
              reject();
            });
        });
      },

      squarePosition : function (row, column, squareHeight, squareWitdh, squareOffSetY, squareOffSetX) {
        var position = {};
        position.top = (squareOffSetY + (squareHeight * row)) + 'px';
        position.left = ( squareOffSetX + (squareWitdh * column)) + 'px';
        return position;
      },

      findLineColumn : function (posy, posx, squareHeight, squareWitdh) {
        //alert('test ' + angular.element('#apiRoot').attr('href'));
        if (posx < 0) {
          posx = 0;
        }
        if (posy < 0) {
          posy = 0;
        }
        var column = Math.floor(posx / squareWitdh);
        var row = Math.floor(posy / squareHeight);
        if (row > 14) {
          row = 14;
        }
        if (column > 14) {
          column = 14;
        }
        var position = {};
        position.row = row;
        position.column = column;
        return position;
      },


      moveDrawToBoard : function(draw, board, droppedTile, drawIndex, row, column) {
        var targetSquare = board.squares[row][column];
        if (typeof targetSquare.droppedTile === 'undefined' || targetSquare.droppedTile === null){
          targetSquare.droppedTile = droppedTile;

          targetSquare.justDropped = true;
          draw.splice(drawIndex, 1);
          return true;
        }else if(targetSquare.justDropped){
          var switchedTile = targetSquare.droppedTile;
          targetSquare.droppedTile.tile = droppedTile;
          draw.splice(drawIndex, 1, switchedTile);
          return true;
        }
        // cancel
        return false;
      },

      moveDrawToDraw : function(draw, tile, drawIndex, drawDropIndex){
        if( drawDropIndex >= draw.length){
          draw[draw.length] = tile;
          draw.splice(drawIndex, 1);
        }else{
          draw.splice(drawIndex, 1);
          draw.splice(drawDropIndex, 0, tile);
        }
      },

      moveBoardToBoard : function(board, droppedTile, row, column, originLine, originColumn){
        var targetSquare = board.squares[row][column];
        var originSquare = board.squares[originLine][originColumn];
        if (typeof targetSquare.droppedTile === 'undefined' || targetSquare.droppedTile === null){
          targetSquare.droppedTile = droppedTile;
          targetSquare.justDropped = true;
          originSquare.droppedTile = null;
          originSquare.justDropped = false;
          return true;
        }else if(targetSquare.justDropped){
          originSquare.droppedTile = targetSquare.droppedTile;
          targetSquare.droppedTile = droppedTile;
          return true;
        }
        return false;
      },

      moveBoardToDraw : function(board, draw, tile, drawDropIndex, originLine, originColumn){
        var originSquare = board.squares[originLine][originColumn];
        draw.splice(drawDropIndex, 0, tile);
        originSquare.droppedTile = null;
        originSquare.justDropped = false;
      },

      sortTiles : function(tab){
        if( tab.constructor === Array ) {
          tab.sort(function(a,b){
            return a.value.localeCompare(b.value);
          });
        }
      },

      clearDraw : function(draw, deck){
        for( var i = 0 ; i < draw.length; i++){
          deck.push(draw[i].tile);
        }
        this.sortTiles(deck);
        draw.splice(0,draw.length);// empty draw
      },

      clearBoard : function (board, draw){
        for( var i = 0 ; i < board.squares.length; i++){
          for( var j = 0; j < board.squares[i].length; j++){
            if( board.squares[i][j].justDropped ) {
              draw.push(board.squares[i][j].droppedTile);
              board.squares[i][j].droppedTile = null;
              board.squares[i][j].justDropped = false;
            }
          }
        }
      },

      //getTilesFrom : function (board, draw){
      //  var result = [];
      //  for( var i = 0 ; i < board.squares.length; i++){
      //    for( var j = 0; j < board.squares[i].length; j++){
      //      if( board.squares[i][j].justDropped ) {
      //        result.push(board.squares[i][j].droppedTile);
      //      }
      //    }
      //  }
      //  Array.prototype.push.apply(result, draw);
      //  return result;
      //},


      randomDraw : function(board, draw, deck, turnNumber){
        this.clearBoard(board, draw);
        this.clearDraw(draw, deck);
        var limit = Math.min(7, deck.length);
        var correctDraw = false;
        var nbTest = 0;
        while( !correctDraw ) {
          nbTest++;
          var testDeck = deck.slice(0);
          var testBoard = JSON.parse(JSON.stringify(board));
          var deckIndexes = [];
          var testDraw = [];
          for (var i = 0; i < limit; i++) {
            var index = Math.floor(Math.random() * testDeck.length);
            deckIndexes.push(index);
            this.drawTile(testBoard, testDraw, testDeck, index);
          }
          correctDraw = this.checkDraw(testDraw, turnNumber, testDeck) || nbTest > 100;
          if( correctDraw &&  nbTest <= 100){
            for (var j = 0; j < deckIndexes.length; j++) {
              this.drawTile(board, draw, deck, deckIndexes[j]);
            }
          }
        }
      },

      newRoundDraw : function(board, draw, deck, turnNumber){
        this.clearBoard(board, draw);
        var limit = Math.min(7 - draw.length, deck.length);
        var testDeck = deck.slice(0);
        var testBoard = JSON.parse(JSON.stringify(board));
        var testDraw = draw.slice(0);
        var deckIndexes = [];
        for (var i = 0; i < limit; i++) {
          var index = Math.floor(Math.random() * testDeck.length);
          deckIndexes.push(index);
          this.drawTile(testBoard, testDraw, testDeck, index);
        }
        var correctDraw = this.checkDraw(testDraw, turnNumber, testDeck);
        if( correctDraw){
          for (var j = 0; j < deckIndexes.length; j++) {
            this.drawTile(board, draw, deck, deckIndexes[j]);
          }
        }else{
          this.randomDraw(board, draw, deck, turnNumber);
        }
      },

      drawTile : function(board, draw, deck, index){
        var left = 7;

        for( var i = 0 ; i < board.squares.length; i++) {
          for (var j = 0; j < board.squares[i].length; j++) {
            if (board.squares[i][j].justDropped) {
              left--;
            }
          }
        }

        if( draw.length < left) {
          var droppedTile = {
            tile: deck[index],
            value: deck[index].value
          };
          draw.push(droppedTile);
          deck.splice(index, 1);
        }
      },

      undrawTile : function(draw, deck, index){
        deck.push(draw[index].tile);
        draw.splice(index, 1);
        this.sortTiles(deck);
      },

      findWords : function(draw, board, possibleWords){
        return $q(function(resolve, reject) {
          var boadClone = JSON.parse(JSON.stringify(board));
          var drawClone = draw.slice(0);
          gameBoardService.clearBoard(boadClone, drawClone);
          var boardGameQueryBean = {
            tileList: [],
            boardGame: boadClone
          };
          for( var i = 0 ; i < drawClone.length ; i++){
            boardGameQueryBean.tileList.push(drawClone[i].tile);
          }

          if (possibleWords.length > 0) {
            possibleWords.splice(0, possibleWords.length);
          }
          $http.post(apiRoot + '/board/fr/bestword', boardGameQueryBean).
            success(function (data) {
              if (possibleWords.length > 0) {
                possibleWords.splice(0, possibleWords.length);
              }
              Array.prototype.push.apply(possibleWords, data);
              resolve();
            }).
            error(function (data, status) {
              $log.error('Service ' + apiRoot + '/board/fr/bestword' + ' respond ' + status);
              reject();
            });
        });
      },

      putWord : function(board, draw, suggest){
        this.clearBoard(board, draw);

        var i = suggest.row;
        var j = suggest.column;

        for (var k = 0; k < suggest.squareList.length; k++) {
          if( !board.squares[i][j].justDropped) {
            var droppedTile = suggest.squareList[k].droppedTile;
            //if(droppedTile.tile.tileType !== 'wildcard') {
              for (var l = 0; l < draw.length; l++) {
                if (draw[l].tile.value === droppedTile.tile.value) {
                  this.moveDrawToBoard(draw, board, droppedTile, l, i, j);
                  break;
                }
              }
            //}else{
            //  for (var m = 0; m < draw.length; m++) {
            //    if (draw[m].tile.tileType === 'wildcard') {
            //      this.moveDrawToBoard(draw, board, droppedTile, m, i, j);
            //      break;
            //    }
            //  }
            //}
          }
          if( suggest.horizontal){
            j++;
          }else{
            i++;
          }
        }
      },


      validRound : function(board, draw, droppedWord){
        var currentDraw = [];
        Array.prototype.push.apply(currentDraw, draw);
        for( var i = 0 ; i < board.squares.length; i++){
          for( var j = 0; j < board.squares[i].length; j++){
            if(board.squares[i][j].justDropped){
              currentDraw.push(board.squares[i][j].droppedTile.tile);
            }
          }
        }

        var round = {
          draw: currentDraw,
          droppedWord : droppedWord
        };

        for( var l = 0 ; l < board.squares.length; l++){
          for( var m = 0; m < board.squares[l].length; m++){
            board.squares[l][m].justDropped = false;
          }
        }

        return round;
      },

      checkDraw : function(draw, turnNumber, deck){
        if( draw.length < 7 ){
          return true;
        }
        var vowels = 0;
        var consonnants = 0;
        var isVowelLeft = !this.isOnlyConsonnant(deck);
        var isConsonnantLeft = !this.isOnlyVowel(deck);
        for( var i = 0 ; i < draw.length; i++){
          var tile = draw[i].tile;
          if( tile.tileType === 'consonant' || tile.tileType === 'y' || tile.tileType === 'wildcard'){
            consonnants++;
          }
          if( tile.tileType === 'vowel' || tile.tileType === 'y' || tile.tileType === 'wildcard'){
            vowels++;
          }
        }
        return (turnNumber >= 16 && ( (vowels >=1 && consonnants >= 1) || (vowels >=1 && !isConsonnantLeft) || ( !isVowelLeft && consonnants >= 1) )	) ||
          (turnNumber <= 15 && ((vowels >=2 && consonnants >= 2) || (vowels >=2 && !isConsonnantLeft) || ( !isVowelLeft && consonnants >= 2) ));
      },

      isOnlyConsonnant : function( tileList ){
        for( var i = 0 ; i < tileList.length; i++){
          var tile = tileList[i];
          if( tile.tileType === 'vowel' || tile.tileType === 'y' || tile.tileType === 'wildcard'){
            return false;
          }
        }
        return true;
      },

      isOnlyVowel : function( tileList ){
        for( var i = 0 ; i < tileList.length; i++){
          var tile = tileList[i];
          if( tile.tileType === 'consonant' || tile.tileType === 'y' || tile.tileType === 'wildcard'){
            return false;
          }
        }
        return true;
      },

      isFinish : function(deck, draw){
        var allTiles = [];
        Array.prototype.push.apply(allTiles, draw);
        Array.prototype.push.apply(allTiles, deck);
        return allTiles.length <= 1 || this.isOnlyVowel(allTiles) || this.isOnlyConsonnant(allTiles);
      },

      /**
       * Get the current round from game
       * @param game
       * @param roundNumber
       */
      getActiveRound : function(game, roundNumber) {
        var activeRound = {
          deck: JSON.parse(JSON.stringify(gameBoardService.initialFrenchDeck)),
          draw: [],
          board: JSON.parse(JSON.stringify(gameBoardService.initialBoardGame))
        };

        for (var i = 0; i < roundNumber; i++) {
          var round = game.roundList[i];
          if (!round) {
            break;
          }
          if( i !== (roundNumber - 1) ) { // put previous turn word
            var row = round.droppedWord.row;
            var column = round.droppedWord.column;
            for (var k = 0; k < round.droppedWord.squareList.length; k++) {
              activeRound.board.squares[row][column] = round.droppedWord.squareList[k];
              activeRound.board.squares[row][column].justDropped = false;
              if (round.droppedWord.horizontal) {
                column++;
              } else {
                row++;
              }
            }
          }

          for( var l = 0 ; l < round.draw.length; l++){
            var tile = round.draw[l];
            for( var m = 0 ; m < activeRound.deck.length; m++){
              if( tile.value === activeRound.deck[m].value ){
                activeRound.deck.splice(m,1);
                break;
              }
            }
          }

        };
        activeRound.draw = game.roundList[roundNumber-1].draw;
        return activeRound;
      },

      init : function(){
        return $q(function(resolve, reject) {
          gameBoardService.getInitialScrabbleBoardGame().then(function (data) {
            gameBoardService.initialBoardGame = data;
            return data;
          }).then(function() {
            return gameBoardService.getInitialFrenchDeck();
          }).then(function (data){
            gameBoardService.initialFrenchDeck = data;
          }).then( function(){
            resolve();
          }).catch( function(){
            reject();
          });
        });
      }
    };

    gameBoardService.init();



    return gameBoardService;
  }]);
