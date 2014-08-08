'use strict';

angular.module('classwarApp')
  .controller('ActionsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.allActions = CLASSWAR.ACTIONS.all();
    $scope.unstagedActions = CLASSWAR.ACTIONS.all();
    $scope.stagedActions = [];
    $scope.stagedEffort = 0;
    $scope.stagedCost = 0;

    $scope.stageAction = function(a) {
        var index = $scope.unstagedActions.indexOf(a);
        if (index > -1) {
            $scope.unstagedActions.splice(index, 1);
        }
        $scope.stagedActions.push(a);
        $scope.stagedCost = stagedCost();
        $scope.stagedEffort = stagedEffort();
    };

    $scope.unstageAction = function(a) {
        var index = $scope.stagedActions.indexOf(a);
        if (index > -1) {
            $scope.stagedActions.splice(index, 1);
        }
        $scope.unstagedActions.push(a);
        $scope.stagedCost = stagedCost();
        $scope.stagedEffort = stagedEffort();
    };

    var stagedCost = function() {
        var acc = 0;
        for (var i = 0; i < $scope.stagedActions.length; ++i) {
            acc += $scope.stagedActions[i].cost || 0;
        }
        return acc;
    };
    var stagedEffort = function() {
        var acc = 0;
        for (var i = 0; i < $scope.stagedActions.length; ++i) {
            acc += $scope.stagedActions[i].effort || 0;
        }
        return acc;
    };
});