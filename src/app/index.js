'use strict';

angular.module('lct', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'satellizer'])
  .config(function ($stateProvider, $urlRouterProvider, $provide, $httpProvider, $authProvider) {
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

    $urlRouterProvider.otherwise('/');

    var apiRoot = angular.element('#apiRoot').attr('href');
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


