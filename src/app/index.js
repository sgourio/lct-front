'use strict';

angular.module('lct', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'satellizer', 'gameDrag', 'nsPopover','ngStomp', 'ngTable','ckeditor', 'cropme'])
  .config(function ($stateProvider, $urlRouterProvider, $provide, $httpProvider, $authProvider, $windowProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $stateProvider
      .state('builder', {
        url: '/gameBuilder',
        templateUrl: 'app/components/gamebuilder/game-builder.html',
        controller: 'GameBuilderCtrl',
        authenticate: true
      });

    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/components/user/signin.html',
        controller: 'SignInCtrl'
      });

    $stateProvider
      .state('gameList', {
        url: '/game/list',
        templateUrl: 'app/components/game/list/game-list.html',
        controller: 'GameListCtrl',
        authenticate: true
      });

    $stateProvider
      .state('gameCreate', {
        url: '/game/create',
        templateUrl: 'app/components/game/create/game-create.html',
        controller: 'GameCreateCtrl',
        authenticate: true
      });

    $stateProvider
      .state('admin', {
        url: '/admin',
        template: '<admin></admin>',
        authenticate: true,
        admin: true
      });

    $stateProvider
      .state('play', {
        url: '/play/:playGameId',
        templateUrl: 'app/components/game/play/play-game.html',
        controller: 'PlayGameCtrl',
        authenticate: true
      });

    $stateProvider
      .state('ranking', {
        url: '/ranking',
        template: '<ranking></ranking>',
        authenticate: false
      });

    $stateProvider
      .state('rules', {
        url: '/rules',
        template: '<rules></rules>',
        authenticate: false
      });

    $stateProvider
      .state('account', {
        url: '/account',
        template: '<account></account>',
        authenticate: true
      });

    $stateProvider
      .state('accountPicutre', {
        url: '/account/picture',
        template: '<account-picture></account-picture>',
        authenticate: true
      });

    $stateProvider
      .state('contact', {
        url: '/contact',
        template: '<contact></contact>',
        authenticate: true
      });

    $stateProvider
      .state('club', {
        url: '/club/:clubId',
        template: '<club-home data-club-id="{{clubId}}"></club-home>',
        authenticate: true,
        controller: function($scope, $stateParams) {
          $scope.clubId = $stateParams.clubId;
        }
      });

    $stateProvider
      .state('clubs', {
        url: '/clubs',
        template: '<club-description></club-description>',
        authenticate: false
      });

    $stateProvider
      .state('multiplexCreate', {
        url: '/club/:clubId/multiplex',
        template: '<create-multiplex data-club-id="clubId"></create-multiplex>',
        authenticate: true,
        controller: function($scope, $stateParams) {
          $scope.clubId = $stateParams.clubId;
        }
      });

    $stateProvider
      .state('multiplexControl', {
        url: '/club/:clubId/multiplex/remote/control/:multiplexGameId',
        template: '<multiplex-remote-control data-club-id="clubId" data-game-id="{{multiplexGameId}}"></multiplex-remote-control>',
        authenticate: true,
        controller: function($scope, $stateParams) {
          $scope.clubId = $stateParams.clubId;
          $scope.multiplexGameId = $stateParams.multiplexGameId;
        }
      });

    $stateProvider
      .state('multiplexDisplay', {
        url: '/club/:clubId/multiplex/display/:multiplexGameId',
        views: {
          'global': {
            template: '<display-multiplex data-game-id="{{multiplexGameId}}"></display-multiplex>',
            controller: function ($scope, $stateParams) {
              $scope.clubId = $stateParams.clubId;
              $scope.multiplexGameId = $stateParams.multiplexGameId;
            }
          }
        }
      });


    $urlRouterProvider.otherwise('/');

    var location = $windowProvider.$get().location;
    var apiRoot = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: ''); //angular.element('#apiRoot').attr('href');
    $provide.value('apiRoot', apiRoot);

    $authProvider.facebook({
      clientId: '274714975961675',
      url: apiRoot + '/auth/facebook'
    });

    $authProvider.google({
      clientId: '232967929857-ilihjfcnbr6cnd14mnc1bhff4jlk8ct8.apps.googleusercontent.com',
      url: apiRoot + '/auth/google'
    });

    $authProvider.twitter({
      url: apiRoot + '/auth/twitter'
    });

  }).factory('authHttpResponseInterceptor',['$q','$location', '$log',function($q, $location, $log){
    return {
      response: function(response){
        if (response.status === 401) {
          $log.debug('Response 401');
        }
        return response || $q.when(response);
      },
      responseError: function(rejection) {
        if (rejection.status === 401) {
          $log.debug('Response Error 401',rejection);
        }
        return $q.reject(rejection);
      }
    };
  }]).config(['$httpProvider',function($httpProvider) {
    //Http Interceptor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
  }]).run(function ($rootScope, $state, $auth, $window) {
    $rootScope.$on('$stateChangeStart', function(event, toState){
      if (toState.authenticate && !$auth.isAuthenticated()){
        // User isn’t authenticated and must be
        $window.sessionStorage.toState = toState.name;
        $state.transitionTo('signin');
        event.preventDefault();
      }
      if( toState.admin && !$auth.getPayload().isAdmin){
        $window.sessionStorage.toState = toState.name;
        $auth.logout();
        $state.transitionTo('signin');
        event.preventDefault();
      }
      if( toState.name === 'signin' && !$window.sessionStorage.toState){
        $window.sessionStorage.toState = 'account';
      }
    });
  });


