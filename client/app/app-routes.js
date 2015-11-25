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
  }
})();


// angular.module('localCast', [
//   'localCast.leaguesService',
//   'localCast.teams',
//   'localCast.teamsService',
//   'localCast.teampage',
//   'localCast.teampageService',
//   'localCast.games',
//   'localCast.gamesService',
//   'localCast.members',
//   'localCast.membersService',
//   'ui.router', 
//   'ngMaterial'
// ])
// .config(function ($stateProvider, $urlRouterProvider) {
//   $urlRouterProvider.otherwise('/leagues');

//   $stateProvider
//     .state('leagues', {
//       templateUrl: 'app/leagues/leagues.html',
//       url: '/leagues',
//       controller: 'LeaguesController'
//     })
//     .state('teams', {
//       templateUrl: 'app/teams/teams.html',
//       url: '/teams/:leagueId',
//       controller: 'TeamsController'
//     })
//     .state('teampage', {
//       url: '/teampage/:leagueId/:teamId',
//       views: {
//         '' : {
//           templateUrl: 'app/teampage/teampage.html',
//           controller: 'TeamPageController',
//         },
//         'games@teampage': {
//           templateUrl: 'app/games/games.html',
//           controller: 'GamesController'
//         },
//         'members@teampage': {
//           templateUrl: 'app/members/members.html',
//           controller: 'MembersController'
//         }
//       }
//     });
// });
