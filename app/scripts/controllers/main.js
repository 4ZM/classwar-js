'use strict';

/**
 * @ngdoc function
 * @name classwarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the classwarApp
 */
angular.module('classwarApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
