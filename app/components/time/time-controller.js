'use strict';

angular.module('classwarApp')
  .controller('TimeCtrl', function ($scope, TickerService) {
    
    TickerService.setup(function() {console.log('tic');});

    $scope.pause = function() {
      TickerService.pause();
    };

    $scope.step = function() {
      TickerService.step();
    };

    $scope.play = function() {
      TickerService.play();
    };

    $scope.fastForward = function() {
      TickerService.fastForward();
    };
});
