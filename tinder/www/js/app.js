// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.cards', {
    url: '/cards',
    views: {
      'menuContent': {
        templateUrl: 'templates/cards.html',
        controller : 'CardsCtrl'
      }
    }
  })

  .state('app.card', {
    url: '/cards/:cardId',
    views: {
      'menuContent': {
        templateUrl: 'templates/card.html',
        controller : 'CardCtrl'
      }
    }
  })

  .state('app.liked', {
    url: '/liked',
    views: {
      'menuContent': {
        templateUrl: 'templates/liked.html',
        controller : 'LikedCtrl'
      }
    }
  })

  .state('app.disliked', {
    url: '/disliked',
    views: {
      'menuContent': {
        templateUrl: 'templates/disliked.html',
        controller : 'DislikedCtrl'
      }
    }
  })

  .state('app.wait', {
    url: '/wait',
    views: {
      'menuContent': {
        templateUrl: 'templates/wait.html',
        controller: 'WaitCtrl'
      }
    }
  })

  .state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/cards');
});
