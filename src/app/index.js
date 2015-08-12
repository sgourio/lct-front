'use strict';

angular.module('lct', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'satellizer', 'gameDrag', 'nsPopover','ngStomp'])
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
        controller: 'GameListCtrl'
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

  }).run(function ($rootScope, $state, $auth, $window) {
    $rootScope.$on('$stateChangeStart', function(event, toState){
      if (toState.authenticate && !$auth.isAuthenticated()){
        // User isn’t authenticated and must be
        $window.sessionStorage.toState = toState.name;
        $state.transitionTo('signin');
        event.preventDefault();
      }
    });
  });


