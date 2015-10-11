'use strict';

angular.module('lct')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {
        'title': 'Jouer au scrabble duplicate',
        'description': 'Joue au scrabble en mode duplicate!',
        'icon' : 'star'
      },
      {
        'title': 'Dictionnaire ODS 7',
        'url': 'https://angularjs.org/',
        'description': 'Le dictionnaire officile du scrabble en vigueur dans les tournois depuis le 1er Janvier 2016',
        'logo': 'ODS7.png'
      },
      {
        'title': 'Tableaux des scores',
        'url': '/ranking',
        'description': 'Quel est votre place dans le classement?',
        'logo': 'browsersync.png'
      },
      {
        'title': 'Règle officielle',
        'url': 'http://gulpjs.com/',
        'description': 'LCT s\'appuie sur les règles du scrabble duplicate appliquées en concours',
        'logo': 'gulp.png'
      },
      {
        'title': 'Rejouer des parties',
        'url': 'http://jasmine.github.io/',
        'description': 'Sur Lettre Compte Triple, on peut rejouer des parties célèbres avec ses amis',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Tablettes',
        'url': 'http://karma-runner.github.io/',
        'description': 'Jouez au scrabble partout, avec votre tablette, ou même votre smartphone!',
        'logo': 'karma.png'
      },
      {
        'title': 'Pour les arbitres',
        'url': 'https://github.com/angular/protractor',
        'description': 'LCT aide l\'arbitrage des parties.',
        'logo': 'protractor.png'
      },
      {
        'title': 'En club',
        'url': 'http://getbootstrap.com/',
        'description': 'LCT propose pour les clubs un mode de création de concours.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'N.SELEUCIDE',
        'description': 'J\'ai vu l\'annonce de Lettre Compte Triple Deluxe pour le 1/1/2016 sur tablette, bravo !<br />Est-ce qu\'on pourra l\'avoir aussi sur I Phone ?<br />Merci d\'avance et bravo pour votre site qui est GENIAL !<br />&gt; Oui ça marche sur iPhone même si c\'est un peu petit',
        'icon': 'comment'
      }
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
