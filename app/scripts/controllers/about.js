'use strict';

/**
 * @ngdoc function
 * @name classwarApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the classwarApp
 */
angular.module('classwarApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
