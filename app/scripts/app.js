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
        templateUrl: 'views/overview.html',
        controller: 'OverviewCtrl'
      })
      .when('/actions', {
        templateUrl: 'views/actions.html',
        controller: 'ActionsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
