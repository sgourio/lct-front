/*
 * Scrabble Helper Module 2015.
 * Written by Sylvain Gourio
 * sylvain.gourio@gmail.com
 */

'use strict';
angular.module('lct')
  .directive('article', [ '$log', 'articleService', function($log, articleService) {
    return {
      restrict: 'E',
      scope: {
        article : '=',
        admin: '='
      },
      templateUrl: 'app/components/article/article.html',
      controller: function($scope){

        // Editor options.
        $scope.options = {
          language: 'en',
          allowedContent: true,
          entities: false
        };

        // Called when the editor is completely ready.
        $scope.onReady = function () {
          $log.info('ready');
          // ...
        };
        $scope.edit = $scope.admin && $scope.article.content === '';


        $scope.saveArticle = function(){
          $scope.article.$save().then(function(data) {
            $log.info('saved');
            $scope.edit = false;
          });
        };

        $scope.deleteArticle = function(){
          if( confirm('Supprimer l\'article?')) {
            $scope.article.$delete().then(function (data) {
              $log.info('deleted');
              $scope.edit = false;
              $scope.article = null;
            });
          }
        };
      }
    };
  }]);
