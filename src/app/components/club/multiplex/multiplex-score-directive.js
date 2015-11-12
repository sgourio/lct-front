/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

/*
 * LCT
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */
'use strict';

angular.module('lct')
  .directive('multiplexScore', [ '$log', '$filter', 'multiplexService', function($log, $filter, multiplexService) {
    var filterOnName = function(list, name){
      return list.filter(function(element){
        return element.name === name;
      })[0];
    };
    return {
      restrict: 'E',
      scope: {
        'gameId' : '=',
        'round' : '='
      },
      replace: true,
      templateUrl: 'app/components/club/multiplex/multiplex-score.html',
      controller: function($scope) {
        $scope.scoreList = [];
        $scope.$watch('round', function() {
          multiplexService.totalScore($scope.gameId)
            .then(function (result){
              $scope.scoreList = [];
              var i;
              for( i = 0 ; i < result.length ; i++) {
                $scope.scoreList.push({
                  name: result[i].name,
                  reference: '',
                  bonus: 0,
                  score: 0,
                  total: result[i].total
                });
              }
            }).then(function(){
              multiplexService.roundScore($scope.gameId, $scope.round).then(function(result){
                // iterate over score list

                var i;
                for( i = 0 ; i < result.length ; i++){
                  var score = filterOnName($scope.scoreList, result[i].name);
                  score.reference = result[i].word.reference.trim() + ' ' + result[i].word.word;
                  score.bonus = result[i].bonus;
                  score.score = result[i].score;
                  score.id = result[i].id;
                  if( score.reference !== '' && score.score === 0 ){
                    score.error = true;
                  }
                }

                $scope.scoreList.push({
                  name: '',
                  reference: '',
                  bonus: 0,
                  score: 0,
                  total: 0
                });
              });
          });
        });


        $scope.putWord = function(score){
          var search = $scope.scoreList.filter(function(element){
            return element.name === score.name;
          });
          if( search.length === 1 ) {
            if (score.name !== '' && score.reference !== '') {
              if( !score.id  ){ // fill the last input
                $scope.scoreList.push({
                  name: '',
                  reference: '',
                  bonus: 0,
                  score: 0,
                  total: 0
                });
              }
              var oldScore = score.score;
              multiplexService.putWord($scope.gameId, $scope.round, score.name, score.reference.toUpperCase(), score.bonus, score.id)
                .then(function (result) {
                  score.id = result.id;
                  if (result.score > 0) {
                    score.score = result.score;
                    score.error = false;
                  } else {
                    score.score = 0;
                    score.error = true;
                  }
                  score.total = score.total - oldScore + score.score;
              });
            }
          }
        };



      }
    };
  }]);
