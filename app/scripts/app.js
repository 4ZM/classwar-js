'use strict';

angular
  .module('classwarApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/action/:actionId', {
        templateUrl: 'views/action-details.html',
        controller: 'ActionDetailsCtrl'
      })
      .when('/gameover/fascists-won', {
        templateUrl: 'views/gameover/fascists-won.html'
      })
      .when('/gameover/capitalists-won', {
        templateUrl: 'views/gameover/capitalists-won.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
