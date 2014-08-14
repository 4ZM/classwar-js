'use strict';

angular.module('ticker', [])
  .factory('TickerService', function() {
        var timerId;
        var target = function() {};

    return {
        setup: function(newTarget) { 
            clearInterval(timerId);
            target = newTarget; 
        },

        pause: function() { 
            clearInterval(timerId);
        },
        
        step: function() { 
            clearInterval(timerId);
            target();
        },

        play: function() {
            clearInterval(timerId);
            timerId = setInterval(target, 1000);
        },
        
        fastForward: function() { 
            clearInterval(timerId);
            timerId = setInterval(target, 200);
        },
    };

  });