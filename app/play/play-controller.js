'use strict';

angular.module('classwarApp')
  .controller('PlayCtrl', function ($scope, $location, GameEngineService, GameStateService, ActionService) {
    var cws = GameStateService; // Short alias

    $scope.tic = function() {
      cws.state = GameEngineService.tic(cws.state);

      switch(cws.state.status) {
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
        cws.state = ActionService.stageAction(cws.state, a);
        refreshStaged();
    };

    $scope.unstageAction = function(a) {
        cws.state = ActionService.unstageAction(cws.state, a);
        refreshStaged();
    };

    // Private impl
    var refreshStaged = function() {
      $scope.state = cws.state;
      $scope.digest = $scope.state.digest;
      $scope.stagedActions = ActionService.stagedActions($scope.state);
      $scope.unstagedActions = ActionService.unstagedActions($scope.state);
      $scope.stagedCost = ActionService.stagedCost($scope.state);
      $scope.stagedEffort = ActionService.stagedEffort($scope.state);
      $scope.overstagedEffort = $scope.state.activists < $scope.stagedEffort;
      $scope.overstagedCost = $scope.state.money < $scope.stagedCost;
      $scope.overstaged = $scope.overstagedEffort || $scope.overstagedCost;
    };

    // Controller init
    refreshStaged();
});
