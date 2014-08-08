'use strict';

angular.module('classwarApp')
  .controller('ActionsCtrl', function ($scope) {

    $scope.stageAction = function(a) {
        CLASSWAR.state = CLASSWAR.ACTIONS.stageAction($scope.state, a);
        refreshStaged();
    };

    $scope.unstageAction = function(a) {
        CLASSWAR.state = CLASSWAR.ACTIONS.unstageAction($scope.state, a);
        refreshStaged();
    };

    // Private impl
    var refreshStaged = function() {
        $scope.state = CLASSWAR.state;
        $scope.stagedActions = CLASSWAR.ACTIONS.stagedActions($scope.state);
        $scope.unstagedActions = CLASSWAR.ACTIONS.unstagedActions($scope.state);
        $scope.stagedCost = CLASSWAR.ACTIONS.stagedCost($scope.state);
        $scope.stagedEffort = CLASSWAR.ACTIONS.stagedEffort($scope.state);
    };

    // Controller init
    refreshStaged();
});