'use strict';

angular.module('lct')
  .controller('MainCtrl',['$scope', '$log', 'articleService', '$auth' , function ($scope, $log, articleService, $auth) {
    $scope.awesomeThings = [
      {
        'title': 'Jouer au scrabble duplicate',
        'description': 'Joue au scrabble en mode duplicate, le meilleur moyen d\'apprendre &agrave; jouer et de s\'améliorer.',
        'icon' : 'star',
        'class' : 'blue'
      },
      {
        'title': 'Dictionnaire ODS 7',
        'description': 'Le dictionnaire officiel du scrabble en vigueur dans les tournois depuis le 1er Janvier 2016',
        'icon' : 'book',
        'class' : 'yellow'
      },
      {
        'title': 'Règle officielle',
        'description': 'LCT s\'appuie sur les règles du scrabble duplicate appliquées en concours',
        'icon': 'certificate',
        'class': 'red',
        'url': '#/rules'
      },
      {
        'title': 'Rejouer des parties',
        'description': 'Sur Lettre Compte Triple, on pourra bient&ocirc;t rejouer des parties célèbres avec ses amis.<br />Cela permet de se confronter virtuellement avec les meilleurs joueurs francophones.',
        'icon': 'repeat',
        'class': 'red'
      },
      {
        'title': 'Tablettes',
        'description': 'Jouez au scrabble avec votre tablette, ou même avec votre smartphone!<br/> Pour les afficionados!',
        'icon': 'tablet',
        'class' : 'green'
      },
      {
        'title': 'Pour les arbitres',
        'description': 'LCT aide l\'arbitrage des parties.<br />Avec LCT c\'est l\'assurance de toujours trouver le meilleur mot à chaque coup.<br />Les arbitres peuvent préparer les parties à l\'avance, et prévoir la durée des tournois.',
        'icon': 'gavel',
        'class' : 'brown',
        'url': '#/clubs'
      },
      {
        'title': 'En club',
        'description': 'LCT va proposer pour les clubs un mode de création de concours, et d\'arbitrage de partie.<br />Une c&ocirc;tisation est &agrave; pr&eacute;voir.',
        'icon': 'users',
        'class': 'blue',
        'url': '#/clubs'
      },
      {
        'title': 'Question / Réponse',
        'description': 'J\'ai vu l\'annonce de Lettre Compte Triple Deluxe pour le 1/1/2016 sur tablette, bravo !<br />Est-ce qu\'on pourra l\'avoir aussi sur I Phone ?<br />Merci d\'avance et bravo pour votre site qui est GENIAL !<br /><span class="response">&gt; Oui ça marche sur iPhone même si un écran de portable est un peu petit pour jouer convenablement.</span>',
        'icon': 'comments-o'
      },
      {
        'title': 'Témoignage',
        'description': 'Bonjour à la team,<br />Je tiens à vous faire savoir ma joie rien qu\'à l\'annonce de la prochaine arrivée de l\'appli tablette de LCT.<br />Je suis comme une enfant qui attend son cadeau de No&euml;l.<br />Youpi youp. Merci, Merci, Merci, Merci, Merci....<br /><span class="response">&gt; On adore vos messages.</span>',
        'icon': 'comment',
        'class': 'pink'
      },
      {
        'title': 'Le classement mensuel',
        'description': 'Chaque mois les compteurs sont remis à 0.<br />Serez vous plus performant que vos amis?',
        'icon': 'trophy',
        'class' : 'yellow',
        'url': '#/ranking'
      },
      {
        'title': 'Aider LCT',
        'description': 'Nous avons plein d\'id&eacute;es pour am&eacute;liorer le site, mais pas que. Nous rêvons de proposer des projets novateurs comme par exemple un "plateau connect&eacute;" &agrave; LCT. Nous recherchons un m&eacute;c&egrave;ne pour nous soutenir dans nos ambitions.',
        'icon': 'money',
        'class' : 'yellow',
        'url': '#/contact'
      },
      {
        'title': 'Amis du Plessis',
        'description': 'Les bons sites sur le Scrabble ne sont pas légion, mais celui du <a href="http://www.scrabbleplesseen.fr/" class="deluxe">Scrabble Plesseen</a> se démarque par la qualité des informations qu\'il propose.<br />',
        'icon': 'thumbs-o-up',
        'class' : 'yellow',
        'url': 'http://www.scrabbleplesseen.fr/'
      }


    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });

    $scope.articles = [];
    $scope.admin = $auth.isAuthenticated() && $auth.getPayload().isAdmin;

    if( $scope.admin ) {
      articleService.Article.all().$promise.then(function (data) {
        $scope.articles = data;
      }, function (error) {
        $log.error(error);
      });
    }else{
      articleService.Article.published().$promise.then(function (data) {
        $scope.articles = data;
      }, function (error) {
        $log.error(error);
      });
    }

    $scope.addArticle = function(){
      $scope.articles.unshift(new articleService.Article({
        id: null,
        title: '',
        content: '',
        creationDate: null,
        published: false
      }));
    };



  }]);
