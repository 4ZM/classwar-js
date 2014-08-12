'use strict';

angular.module('game.state', [])
  .factory('GameStateService', function() {

  return {
    state: {
      day:                0,

      activists:          5, // Number of
      recruitable:     0.00, // Number of possible recruits

      money:           1000, // $

      union:           0.00, // % Organized workers

      fascists: {
        morale:        0.20, // %
        conflict:      0.00, // %
        power:         0.05  // %
      },

      capitalists: {
        power:         0.90  // %
      },

      repression:      0.00, // % Police repression

      climate:         0.50, // Political climate, % red (0 = deep blue)

      digest:            [], // Messages for the day

      stagedActions:     [],
      runningActions:    [],

      status:      'running'
    },

    capLevel: function(v) {
        return Math.max(0.0, Math.min(1.0, v));
    },

    fascistActivity: function(g) {
      var FASCIST_CYCLIC_PERIOD = 100;
      var phase = - Math.PI / 2.0; // Start at 0 and rising
      var harmonic = Math.sin((2.0 * Math.PI * g.day) / FASCIST_CYCLIC_PERIOD + phase);
      var cyclic = (harmonic + 1.0) / 2.0;

      var CUTOFF = 0.7;
      var powClimate = Math.pow((CUTOFF - g.climate) / CUTOFF, 2.0);
      var climate = g.climate < CUTOFF ? powClimate : 0.0;

      var conflict = g.fascists.conflict;
      var morale = g.fascists.morale;

      return 0.2 * cyclic + 0.2 * climate + 0.2 * conflict + 0.2 * morale;
    },

    capitalistActivity: function(g) {
      var CUTOFF = 0.3;
      var powClimate = Math.pow((CUTOFF - g.climate) / (1.0 - CUTOFF), 2.0);
      var climate = g.climate > CUTOFF ? powClimate : 0.0;

      var invPower = 1.0 - g.capitalists.power;
      return 0.5 * climate + 0.5 * invPower;
    },


    activistCapacity: function(g) {
      return 10;
    },

  };
});
  