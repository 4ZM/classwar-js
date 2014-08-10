'use strict';

angular.module('classwarApp')
  .controller('ActionDetailsCtrl', function ($scope, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.actionId = $routeParams.actionId;

    var action = CLASSWAR.ACTIONS.getAction($routeParams.actionId);
    $scope.name = action.name;
    $scope.effort = action.effort;
    $scope.cost = action.cost;
  });
