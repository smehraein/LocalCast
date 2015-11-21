angular.module('localCast', [
  'localCast.services',
  'localCast.leagues',
  'localCast.leaguesService',
  'localCast.teams',
  'localCast.teamsService',
  'localCast.teampage',
  'localCast.games',
  'localCast.members',
  'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/leagues');

  $stateProvider
    .state('leagues', {
      templateUrl: 'app/leagues/leagues.html',
      url: '/leagues',
      controller: 'LeaguesController'
    })
    .state('teams', {
      templateUrl: 'app/teams/teams.html',
      url: '/teams/:leagueId',
      controller: 'TeamsController'
    })
    .state('teampage', {
      url: '/teampage/:leagueId/:teamId',
      views: {
        '' : {
          templateUrl: 'app/teampage/teampage.html',
          controller: 'TeamPageController',
        },
        'games@teampage': {
          templateUrl: 'app/games/games.html',
          controller: 'GamesController'
        },
        'members@teampage': {
          templateUrl: 'app/members/members.html',
          controller: 'MembersController'
        }
      }
    });
});
