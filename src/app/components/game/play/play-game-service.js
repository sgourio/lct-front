'use strict';

/**
 * @ngdoc service
 * @name lctUiApp.playGameService
 * @description
 * # gameService
 * Service in the lctUiApp.
 */
angular.module('lct')
  .service('playGameService', [ function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var playGameService = {
      isBoardValid: function(board){
        var horizontal;
        var row = -1;
        var column = -1;
        var countDropped = 0;
        var attached = false;
        for( var i = 0 ; i < board.squares.length; i++) {
          for (var j = 0; j < board.squares[i].length; j++) {
            if (board.squares[i][j].justDropped) {
              countDropped++;
              attached = attached || this.isAttached(board, i, j) ;
              if( typeof horizontal === 'undefined'){
                if( row === -1 ) {
                  row = i;
                  column = j;
                }else{
                  horizontal = row === i;
                }
              }else {
                if ((horizontal && i !== row) || (horizontal === false && j !== column)) {
                  return {
                    valid: false,
                    error: 'Les lettres ne sont pas sur la même ligne ou la même colonne'
                  };
                }
              }
            }
          }
        }
        if( row === -1 ){
          return {
            valid : false,
            error : 'Aucune lettre posée sur le plateau'
          };
        }
        if( !attached ){
          return {
            valid : false,
            error : 'Aucune lettre rattachée au reste du jeu'
          };
        }
        if( countDropped === 1 && typeof horizontal === 'undefined' ){
          var next = column + 1;
          var prev = column - 1;
          horizontal = (next  < board.squares[row].length && board.squares[row][next].droppedTile !== null) || (prev > 0 && board.squares[row][prev].droppedTile !== null);
        }

        return{
          valid : true,
          wordReference : this.findWordAt(board, row, column, horizontal)
        };
      },

      isAttached : function(board, row, column){
        if( row === 7 && column === 7){
          return true;
        }
        return ( row > 0 && board.squares[row-1][column].droppedTile !== null && !board.squares[row-1][column].justDropped ) ||
          ( row < board.squares.length - 1 && board.squares[row+1][column].droppedTile !== null && !board.squares[row+1][column].justDropped ) ||
          ( column > 0 && board.squares[row][column - 1].droppedTile !== null && !board.squares[row][column - 1].justDropped ) ||
          ( column < board.squares[row].length - 1 && board.squares[row][column + 1].droppedTile !== null && !board.squares[row][column + 1].justDropped );

      },

      findWordAt : function(board, row, column, horizontal){
        var word = '';
        var square = board.squares[row][column];
        if( horizontal ){
          while( column > 0 && board.squares[row][column - 1].droppedTile !== null){
            column--;
          }
          var j = column;
          while( square.droppedTile !== null && j < board.squares[row].length){
            square = board.squares[row][j];
            if( square.droppedTile !== null ) {
              if( square.droppedTile.tile.tileType === 'wildcard' ){
                word += '(' + square.droppedTile.value + ')';
              }else {
                word += square.droppedTile.value;
              }
            }
            j++;
          }
          var reference = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(row) + '' + (column +1);
          return word + '\t' + reference;
        }else{
          while( row > 0 && board.squares[row-1][column].droppedTile !== null){
            row--;
          }
          var i = row;
          while( square.droppedTile !== null && i < board.squares.length - 1){
            square = board.squares[i][column];
            if( square.droppedTile !== null ) {
              if( square.droppedTile.tile.tileType === 'wildcard' ){
                word += '(' + square.droppedTile.value + ')';
              }else {
                word += square.droppedTile.value;
              }
            }
            i++;
          }
          var ref = (column +1) + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(row);
          return word + '\t' + ref;
        }
      }
    };


    return playGameService;
  }]);
