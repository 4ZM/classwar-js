'use strict';

angular.module('classwarApp')
  .controller('ActionsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.allActions = CLASSWAR.ACTIONS.all();
  });
