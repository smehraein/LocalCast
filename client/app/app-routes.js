(function() {
  // using 'use strict' will prevent variable declaration errors
  'use strict';

  angular.module('localCast')
  .config(config);

  // dependencies are injected here, when placed in array it protects against minification
  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/leagues');

    $stateProvider
    .state('leagues', {
      templateUrl: 'app/leagues/leagues.html',
      url: '/leagues',
      controller: 'LeaguesCtrl'
    })
    .state('teams', {
      templateUrl: 'app/teams/teams.html',
      url: '/teams/:leagueId',
      controller: 'TeamsCtrl'
    })
    .state('teampage', {
      url: '/teampage/:leagueId/:teamId',
      views: {
        '' : {
          templateUrl: 'app/teampage/teampage.html'
        },
        'games@teampage': {
          templateUrl: 'app/games/games.html',
          controller: 'GamesCtrl'
        },
        'members@teampage': {
          templateUrl: 'app/members/members.html',
          controller: 'MembersCtrl'
        }
      }
    });
  }
})();
