'use strict';

angular
  .module('classwarApp', ['game',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'play/play.tpl.html',
        controller: 'PlayCtrl'
      })
      .when('/action/:actionId', {
        templateUrl: 'action-details/action-details.tpl.html',
        controller: 'ActionDetailsCtrl'
      })
      .when('/gameover/fascists-won', {
        templateUrl: 'gameover/fascists-won.tpl.html'
      })
      .when('/gameover/capitalists-won', {
        templateUrl: 'gameover/capitalists-won.tpl.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
