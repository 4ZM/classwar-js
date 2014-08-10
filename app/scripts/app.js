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
      .otherwise({
        redirectTo: '/'
      });
  });
