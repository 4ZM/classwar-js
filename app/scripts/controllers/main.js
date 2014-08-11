'use strict';

angular.module('classwarApp')
  .controller('MainCtrl', function ($scope, $location, $window) {

    $scope.tic = function() {
      CLASSWAR.state = CLASSWAR.tic(CLASSWAR.state);

      switch(CLASSWAR.state.status) {
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
        CLASSWAR.state = CLASSWAR.ACTIONS.stageAction(CLASSWAR.state, a);
        refreshStaged();
    };

    $scope.unstageAction = function(a) {
        CLASSWAR.state = CLASSWAR.ACTIONS.unstageAction(CLASSWAR.state, a);
        refreshStaged();
    };

    // Private impl
    var refreshStaged = function() {
      $scope.state = CLASSWAR.state;
      $scope.digest = $scope.state.digest;
      $scope.stagedActions = CLASSWAR.ACTIONS.stagedActions($scope.state);
      $scope.unstagedActions = CLASSWAR.ACTIONS.unstagedActions($scope.state);
      $scope.stagedCost = CLASSWAR.ACTIONS.stagedCost($scope.state);
      $scope.stagedEffort = CLASSWAR.ACTIONS.stagedEffort($scope.state);
      $scope.overstagedEffort = $scope.state.activists < $scope.stagedEffort;
      $scope.overstagedCost = $scope.state.money < $scope.stagedCost;
      $scope.overstaged = $scope.overstagedEffort || $scope.overstagedCost;
    };

    // Controller init
    refreshStaged();
});
