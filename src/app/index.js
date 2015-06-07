'use strict';

angular.module('lct', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap','oauth'])
  .config(function ($stateProvider, $urlRouterProvider, $provide, $httpProvider) {
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
      .state('access_token', {
        url:'/access_token=:accessToken',
        template: '',
        controller: function ($location, AccessToken, $window, $state, $http, apiRoot, userService) {
          var hash = $location.path().substr(1);
          AccessToken.setTokenFromString(hash);
          userService.googleInfo(function(displayName){
            userService.authenticate(displayName);
          });
        }
      });

    $urlRouterProvider.otherwise('/');

    $provide.value('apiRoot', angular.element('#apiRoot').attr('href'));

    $httpProvider.interceptors.push(function($q, AccessToken) {
      return {
        'request': function(config) {
          if( AccessToken.get() ) {
            config.headers.Token = AccessToken.get().access_token;
          }
          return config;
        }
      };
    });
  }).run(function ($rootScope, $state, AccessToken, $window) {
    $rootScope.$on('$stateChangeStart', function(event, toState){
      if (toState.authenticate && AccessToken.get() === null){
        // User isn’t authenticated and must be
        $window.sessionStorage.toState = toState.name;
        $state.transitionTo('signin');
        event.preventDefault();
      }
    });
  });


