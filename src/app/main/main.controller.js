'use strict';

angular.module('lct')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {
        'title': 'Jouer au scrabble duplicate',
        'description': 'Joue au scrabble en mode duplicate!',
        'icon' : 'star',
        'class' : 'blue'
      },
      {
        'title': 'Dictionnaire ODS 7',
        'description': 'Le dictionnaire officile du scrabble en vigueur dans les tournois depuis le 1er Janvier 2016',
        'icon' : 'book',
        'class' : 'yellow'
      },
      {
        'title': 'Règle officielle',
        'description': 'LCT s\'appuie sur les règles du scrabble duplicate appliquées en concours',
        'icon': 'certificate',
        'class': 'red'
      },
      {
        'title': 'Rejouer des parties',
        'description': 'Sur Lettre Compte Triple, on peut rejouer des parties célèbres avec ses amis.<br />Cela permet de vous confronter virtuellement avec les meilleurs dans les tournois.',
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
        'class' : 'black'
      },
      {
        'title': 'En club',
        'description': 'LCT va proposer pour les clubs un mode de création de concours, et d\'arbitrage de partie.<br />Une c&ocirc;tisation est &agrave; pr&eacute;.',
        'icon': 'users',
        'class': 'brown'
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
        'description': 'Nous avons plein d\'id&eacute;es pour am&eacute;liorer le site, mais pas que. Nous avons une vision sur le devenir du Scrabble de comp&eacute;tition, et l\'envie de proposer des projets novateurs comme par exemple un plateau connect&eacute; &agrave; LCT. Nous recherchons un m&eacute;c&egrave;ne pour nous soutenir dans nos ambitions.',
        'icon': 'money',
        'class' : 'yellow'
      }

    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
