'use strict';

angular.module('classwarApp')
  .controller('MainCtrl', function ($scope, $location, stateService, actionsService) {

    $scope.tic = function() {
      stateService.state = stateService.tic(stateService.state);

      switch(stateService.state.status) {
      case 'fascists won':
        $location.path('/gameover/fascists-won');
        break;
      case 'capitalists won':
        $location.path('/gameover/capitalists-won');
        break;
      }

      refreshStaged();
    };

    $scope.stageAction = function(a) {
        stateService.state = actionsService.stageAction(stateService.state, a);
        refreshStaged();
    };

    $scope.unstageAction = function(a) {
        stateService.state = actionsService.unstageAction(stateService.state, a);
        refreshStaged();
    };

    // Private impl
    var refreshStaged = function() {
      $scope.state = stateService.state;
      $scope.digest = $scope.state.digest;
      $scope.stagedActions = actionsService.stagedActions($scope.state);
      $scope.unstagedActions = actionsService.unstagedActions($scope.state);
      $scope.stagedCost = actionsService.stagedCost($scope.state);
      $scope.stagedEffort = actionsService.stagedEffort($scope.state);
      $scope.overstagedEffort = $scope.state.activists < $scope.stagedEffort;
      $scope.overstagedCost = $scope.state.money < $scope.stagedCost;
      $scope.overstaged = $scope.overstagedEffort || $scope.overstagedCost;
    };

    // Controller init
    refreshStaged();
});
