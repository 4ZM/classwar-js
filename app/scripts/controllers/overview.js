'use strict';

angular.module('classwarApp')
  .controller('OverviewCtrl', function ($scope) {
    $scope.activists = CLASSWAR.state.activists;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
