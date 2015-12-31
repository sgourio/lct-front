'use strict';

/**
 * @ngdoc service
 * @name lctUiApp.articleService
 * @description
 * # articleService
 * Service in the lctUiApp.
 */
angular.module('lct')
  .service('articleService', [ '$http', 'apiRoot', '$log', '$q', '$resource', function ($http, apiRoot, $log, $q, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var articleService = {
      Article : $resource('/article/:articleId', { articleId : '@id' },{
        all:{method:'GET', params:{all:true}, isArray: true},
        published:{method:'GET', isArray: true}
      })
    };

    //{
    //  save: function (article, callbackOk) {
    //    $http.post(apiRoot + '/article', article).
    //      success(function (data) {
    //        $log.info('Adding article end with success, id: ' + data);
    //        article.id = data;
    //        callbackOk();
    //      }).
    //      error(function (data, status) {
    //        $log.error('Service POST ' + apiRoot + '/article' + ' respond ' + status);
    //      });
    //  },
    //
    //  getPublishedArticle: function(){
    //    $http.get(apiRoot + '/article').
    //      success(function (data) {
    //
    //      }).
    //      error(function (data, status) {
    //        $log.error('Service GET ' + apiRoot + '/article' + ' respond ' + status);
    //      });
    //  }
    //};

    return articleService;
  }]);
