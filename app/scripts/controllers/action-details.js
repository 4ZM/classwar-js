'use strict';

angular.module('classwarApp')
  .controller('ActionDetailsCtrl', function ($scope, $routeParams, actionsService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.actionId = $routeParams.actionId;

    var action = actionsService.getAction($routeParams.actionId);
    $scope.name = action.name;
    $scope.effort = action.effort;
    $scope.cost = action.cost;
  });
