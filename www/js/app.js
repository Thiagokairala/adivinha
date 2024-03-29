// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('adivinha', [
  'ionic',
  'ngCordova',
  'adivinha.controllers',
  'adivinha.services'
  ]);

var db;

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    db = window.sqlitePlugin.openDatabase(
      {name: "adivinha.db",
      createFromLocation: 1,
      createFromResource: 1});
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  // setup an abstract state for the tabs directive

  $stateProvider

  .state('game', {
    url: "/game",
    abstract: true,
    templateUrl: "templates/game.html"
  })

  .state('game.begin', {
    cache: false,
    url: '/begin',
    views: {
      'begin': {
        templateUrl: 'templates/begin.html',
        controller: 'BeginCtrl'
      }
    }
  })
  .state('game.match', {
    cache: false,
    url: '/match/:fileWithQuestions',
    views: {
      'match': {
        templateUrl: 'templates/match.html',
        controller: 'MatchCtrl'
      }
    }
  })
  .state('game.result', {
    cache: false,
    url: '/result',
    views: {
      'result': {
        templateUrl: 'templates/result.html',
        controller: 'ResultCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/game/begin');
})
